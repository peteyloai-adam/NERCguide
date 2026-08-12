/* ============================================================================
   NERC SYSTEM OPERATOR STUDY CONSOLE — app.js  (engine)
   Vanilla JS, no dependencies. Reads window.NERC.{glossary,content,questions,
   interactives} and renders the whole experience. Future builds should mostly
   touch the DATA files, not this engine.
   ========================================================================== */
(function () {
  "use strict";

  var NERC = window.NERC || {};
  var GLOSSARY  = NERC.glossary  || [];
  var CONTENT   = NERC.content   || [];
  var QUESTIONS = NERC.questions || [];
  var INTERACT  = NERC.interactives || {};
  var STANDARDS = NERC.standards || [];
  var EVENTS = NERC.events || [];
  var MISCONCEPTIONS = NERC.misconceptions || {};
  var MODULE_DOMAINS = NERC.moduleDomains || {};
  var CRED_KEY = "nerc-to-console.credential";
  function credMeta(id) { return (NERC.credentials || {})[id] || null; }
  function credHasBlueprint(id) { return !!(NERC.blueprints && NERC.blueprints[id]); }
  function storedCred() { try { return window.localStorage.getItem(CRED_KEY) || "to"; } catch (e) { return "to"; } }
  // The active credential is the stored one only if its blueprint exists; otherwise TO.
  function activeCred() { var c = storedCred(); return credHasBlueprint(c) ? c : "to"; }
  function setCred(id) { if (credHasBlueprint(id)) { try { window.localStorage.setItem(CRED_KEY, id); } catch (e) {} } }
  function cutPct() { var m = credMeta(activeCred()); return m ? m.pct : 0.76; }
  // Cut score for a drawn set: scale the credential's absolute cut (e.g. 76/100)
  // by the drawn total, so it stays exact for each credential and any partial bank.
  function cutFor(total) { var m = credMeta(activeCred()); return (m && m.scored) ? Math.round(m.cut * total / m.scored) : Math.ceil(total * cutPct()); }
  var BLUEPRINT = (NERC.blueprints && NERC.blueprints[activeCred()]) || NERC.blueprint || [];

  /* ---- indexes ---------------------------------------------------------- */
  var gById = {}, sectionById = {}, moduleById = {}, domainById = {}, topicById = {};
  GLOSSARY.forEach(function (t) { gById[t.id] = t; });
  CONTENT.forEach(function (m) {
    moduleById[m.id] = m;
    (m.sections || []).forEach(function (s) { sectionById[s.id] = { section: s, module: m }; });
  });
  BLUEPRINT.forEach(function (d) {
    domainById[d.id] = d;
    (d.topics || []).forEach(function (t) { topicById[t.id] = { topic: t, domain: d }; });
  });
  var qById = {};
  QUESTIONS.forEach(function (q) { qById[q.id] = q; });

  /* ---- state (localStorage with in-memory fallback) --------------------- */
  var KEY = "nerc-to-console.v1";
  var mem = null;
  function normalizeState(s) {
    s = s || {};
    s.reviewed = s.reviewed || {};
    s.answered = s.answered || {};
    s.history = Array.isArray(s.history) ? s.history : [];
    s.examHistory = Array.isArray(s.examHistory) ? s.examHistory : [];
    s.misconceptions = s.misconceptions || {};
    s.events = s.events || {};
    s.activity = Array.isArray(s.activity) ? s.activity : [];
    s.analyticsEnabled = !!s.analyticsEnabled;
    s.planStart = s.planStart || null;
    s.planWeeks = [8,12,26].indexOf(Number(s.planWeeks)) >= 0 ? Number(s.planWeeks) : 12;
    s.prefs = Object.assign({ contrast: "default", textScale: "100", motion: "system" }, s.prefs || {});
    return s;
  }
  function loadState() {
    if (mem) return normalizeState(mem);
    try {
      var raw = window.localStorage.getItem(KEY);
      mem = normalizeState(raw ? JSON.parse(raw) : {});
    } catch (e) { mem = normalizeState({}); }
    return mem;
  }
  function saveState() {
    mem = normalizeState(mem);
    try { window.localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {}
  }
  function announce(message) {
    var live = document.getElementById("live-status");
    if (!live) return;
    live.textContent = "";
    window.setTimeout(function () { live.textContent = message; }, 10);
  }
  function applyPreferences() {
    var p = loadState().prefs;
    document.documentElement.setAttribute("data-contrast", p.contrast || "default");
    document.documentElement.setAttribute("data-text-scale", p.textScale || "100");
    document.documentElement.setAttribute("data-motion", p.motion || "system");
  }
  function recordActivity(type, detail) {
    var st = loadState();
    if (!st.analyticsEnabled) return;
    st.activity.push({ type: type, at: Date.now(), detail: detail || {} });
    if (st.activity.length > 500) st.activity = st.activity.slice(-500);
    saveState();
  }
  // Clears learning progress and the in-progress mock. Preference and review
  // settings remain so accessibility choices are not lost.
  function resetProgress() {
    var old = loadState();
    mem = normalizeState({ prefs: old.prefs, analyticsEnabled: old.analyticsEnabled, planWeeks: old.planWeeks });
    try { window.localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {}
    try { window.localStorage.removeItem(EXAM_KEY); } catch (e) {}
    examMem = null;
    location.hash = "#/";
    route();
  }

  function misconceptionFor(q) { return q && MISCONCEPTIONS[q.topic] ? MISCONCEPTIONS[q.topic] : null; }
  function confidenceWeight(entry) {
    if (!entry || !entry.correct) return 0;
    if (entry.confidence === "guessed") return 0.5;
    if (entry.confidence === "unsure") return 0.75;
    return 1;
  }
  function topicStats() {
    var stats = {};
    BLUEPRINT.forEach(function (d) { (d.topics || []).forEach(function (t) {
      stats[t.id] = { id:t.id, name:t.name, domain:d.id, domainName:d.short, target:t.target, attempted:0, correct:0, weightedCorrect:0, total:QUESTIONS.filter(function(q){return q.topic===t.id;}).length };
    }); });
    var a = loadState().answered;
    Object.keys(a).forEach(function (qid) { var q=qById[qid], s=q&&stats[q.topic]; if(!s)return; s.attempted++; if(a[qid].correct)s.correct++; s.weightedCorrect += confidenceWeight(a[qid]); });
    Object.keys(stats).forEach(function(id){ var s=stats[id]; s.accuracy=s.attempted?Math.round(100*s.correct/s.attempted):null; s.masteryAccuracy=s.attempted?Math.round(100*s.weightedCorrect/s.attempted):null; s.weight=s.target/examTotal(); });
    return stats;
  }
  function adaptiveRecommendations(limit) {
    var stats=topicStats(), recs=[];
    Object.keys(stats).forEach(function(id){ var s=stats[id], m=MISCONCEPTIONS[id]; if(!m)return;
      var accuracy=s.masteryAccuracy==null?0:s.masteryAccuracy;
      var confidence=Math.min(1,s.attempted/Math.max(3,s.target));
      var need=(100-accuracy)*(0.45+0.55*confidence)+(s.target/examTotal())*1200+(s.attempted===0?20:0);
      recs.push({topic:id, stat:s, meta:m, need:need});
    });
    recs.sort(function(a,b){return b.need-a.need;});
    return recs.slice(0,limit||5);
  }
  function adaptiveQuestionSet(limit) {
    var recs=adaptiveRecommendations(8), priority={}; recs.forEach(function(r,i){priority[r.topic]=recs.length-i;});
    var ans=loadState().answered;
    var ranked=QUESTIONS.map(function(q){ var latest=ans[q.id], p=priority[q.topic]||0, score=p*10;
      if(latest&&latest.correct===false)score+=40; else if(!latest)score+=12; else {
        score-=8;
        if(latest.confidence==="guessed")score+=28;
        else if(latest.confidence==="unsure")score+=14;
        else if(latest.confidence==="knew")score-=4;
      }
      if(q.difficulty==='analysis')score+=4; else if(q.difficulty==='application')score+=2;
      return {q:q,score:score+Math.random()*2};
    }).sort(function(a,b){return b.score-a.score;});
    var out=[], perTopic={};
    ranked.forEach(function(r){ if(out.length>=limit)return; var t=r.q.topic; if((perTopic[t]||0)>=4)return; out.push(r.q); perTopic[t]=(perTopic[t]||0)+1; });
    return out;
  }

  /* ---- transparent progress measures ----------------------------------- */
  function readySections() {
    var total = 0, done = 0;
    CONTENT.forEach(function (m) {
      if (m.status !== "ready") return;
      (m.sections || []).forEach(function (section) {
        total++; if (loadState().reviewed[section.id]) done++;
      });
    });
    return { total: total, done: done };
  }
  function questionStats() {
    var answered = loadState().answered, correct = 0, weightedCorrect = 0, attempted = 0;
    Object.keys(answered).forEach(function (id) { attempted++; if (answered[id].correct) correct++; weightedCorrect += confidenceWeight(answered[id]); });
    return { total: QUESTIONS.length, correct: correct, weightedCorrect: weightedCorrect, attempted: attempted };
  }
  function progressMetrics() {
    var sections = readySections(), questions = questionStats();
    return {
      completion: sections.total ? Math.round(100 * sections.done / sections.total) : 0,
      practiceCoverage: questions.total ? Math.round(100 * questions.attempted / questions.total) : 0,
      practiceAccuracy: questions.attempted ? Math.round(100 * questions.correct / questions.attempted) : 0,
      bankMastery: questions.total ? Math.round(100 * questions.weightedCorrect / questions.total) : 0,
      sections: sections,
      questions: questions
    };
  }
  function completionPct() { return progressMetrics().completion; }

  /* ---- tiny DOM helpers ------------------------------------------------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // Optional schematic for a question. q.diagram is TRUSTED authored SVG/HTML
  // (from data.questions.js), rendered above the stem. Empty when absent.
  function qDiagram(q) { return q.diagram ? '<div class="c-q__diagram">' + q.diagram + '</div>' : ''; }

  /* ---- glossary shorthand: {{id|text}} / {{id}} ------------------------- */
  function expandTerms(html) {
    return String(html).replace(/\{\{([a-z0-9-]+)(?:\|([^}]+))?\}\}/g,
      function (_, id, text) {
        var t = gById[id];
        var label = text || (t ? t.term : id);
        if (!t) return label;
        return '<button class="c-term" type="button" data-term="' + id +
               '" aria-label="' + esc(t.term) + ' — definition">' + label + '</button>';
      });
  }

  /* ---- glossary tooltip (single floating inspector) --------------------- */
  var tip = el("div", "c-tooltip");
  tip.setAttribute("role", "tooltip");
  document.body.appendChild(tip);
  var tipTimer = null;

  function showTip(target) {
    var id = target.getAttribute("data-term");
    var t = gById[id];
    if (!t) return;
    tip.innerHTML =
      '<span class="c-tooltip__term">' + esc(t.term) + '</span>' +
      (t.acronym ? '<span class="c-tooltip__acr">' + esc(t.acronym) + '</span>' : '') +
      '<p class="c-tooltip__def">' + esc(t.definition) + '</p>' +
      '<a class="c-tooltip__link" href="#/glossary">Open in glossary \u2192</a>';
    var r = target.getBoundingClientRect();
    tip.style.left = "0px"; tip.style.top = "0px";
    tip.classList.add("is-open");
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var left = r.left + window.scrollX;
    left = Math.min(left, window.scrollX + document.documentElement.clientWidth - tw - 12);
    left = Math.max(window.scrollX + 8, left);
    var top = r.bottom + window.scrollY + 8;
    if (r.bottom + th + 16 > document.documentElement.clientHeight)
      top = r.top + window.scrollY - th - 8;
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }
  function hideTip() { tip.classList.remove("is-open"); }

  document.addEventListener("mouseover", function (e) {
    var t = e.target.closest(".c-term");
    if (t) { clearTimeout(tipTimer); showTip(t); }
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target.closest(".c-term")) { tipTimer = setTimeout(hideTip, 120); }
  });
  document.addEventListener("focusin", function (e) {
    if (e.target.closest && e.target.closest(".c-term")) showTip(e.target.closest(".c-term"));
  });
  document.addEventListener("focusout", function (e) {
    if (e.target.closest && e.target.closest(".c-term")) hideTip();
  });
  tip.addEventListener("mouseenter", function () { clearTimeout(tipTimer); });
  tip.addEventListener("mouseleave", hideTip);
  window.addEventListener("scroll", hideTip, true);

  /* ---- block renderer --------------------------------------------------- */
  /* ---- related videos (link-out cards, data from data.videos.js) -------- */
  function renderVideos(sectionId, container) {
    var map = NERC.videosBySection || {}, ids = map[sectionId];
    if (!ids || !ids.length) return;
    var grp = el("div", "c-videos");
    grp.appendChild(el("div", "c-videos__label", "Related external videos"));
    ids.forEach(function (vid) {
      var v = (NERC.videos || {})[vid];
      if (!v) return;
      var a = document.createElement("a");
      a.className = "c-video"; a.href = v.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", "External YouTube reference, not included in the offline course: " + v.title + " (" + v.duration + ")");
      a.innerHTML =
        '<span class="c-video__thumb" aria-hidden="true"><span class="c-video__play"></span></span>' +
        '<span class="c-video__body">' +
          '<span class="c-video__title">' + esc(v.title) + '</span>' +
          '<span class="c-video__meta"><span class="c-video__dur">' + esc(v.duration) + '</span>' +
            '<span class="c-video__chan">External · YouTube' + (v.channel ? ' \u00b7 ' + esc(v.channel) : '') + '</span></span>' +
          '<span class="c-video__why">' + esc(v.why) + '</span>' +
        '</span>' +
        '<span class="c-video__ext" aria-hidden="true"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M17 7H9M17 7v8"/></svg></span>';
      grp.appendChild(a);
    });
    grp.appendChild(el("div", "c-note c-note--op c-video__notice", '<div class="c-note__title">External, optional reference</div>These links require internet access, may be blocked on corporate networks, and are not part of the controlled course content. Verify technical claims against the lesson, current standards, and SME-approved material.'));
    container.appendChild(grp);
  }

  function renderBlocks(blocks, container) {
    (blocks || []).forEach(function (b) {
      if (b.t === "p")    container.appendChild(el("p", null, expandTerms(b.html)));
      else if (b.t === "h") container.appendChild(el("h3", null, esc(b.text)));
      else if (b.t === "list") {
        var ul = el("ul");
        b.items.forEach(function (i) { ul.appendChild(el("li", null, expandTerms(i))); });
        container.appendChild(ul);
      } else if (b.t === "note") {
        var n = el("div", "c-note c-note--" + (b.kind || "op"));
        if (b.title) n.appendChild(el("div", "c-note__title", esc(b.title)));
        n.appendChild(el("div", null, expandTerms(b.html)));
        container.appendChild(n);
      } else if (b.t === "interactive") {
        var mount = el("div");
        container.appendChild(mount);
        if (INTERACT[b.id]) INTERACT[b.id](mount);
        else mount.appendChild(el("div", "c-note c-note--alert", "Interactive '" + esc(b.id) + "' not loaded."));
      } else if (b.t === "scenario") {
        renderScenario(b, container);
      }
    });
  }

  /* ---- operator scenario walkthrough ------------------------------------ */
  /* Content block: { t:"scenario", title, role?, setup, steps:[
       { stem, options:[...], answer:<idx>, explain, optFeedback?:{idx:"..."} } ], debrief? }
     Puts the learner in the operator's chair: read the situation, choose an
     action, get an exam-style best-answer debrief, then the next decision
     unlocks (progressive reveal, so later steps do not spoil earlier ones). */
  function renderScenario(b, container) {
    var sc = el("div", "c-scenario");
    var n = (b.steps || []).length;
    sc.appendChild(el("div", "c-scenario__eyebrow",
      "\u25B8 Scenario" + (b.role ? " \u00B7 " + esc(b.role) : "")));
    if (b.title) sc.appendChild(el("div", "c-scenario__title", esc(b.title)));
    if (b.setup) sc.appendChild(el("div", "c-scenario__setup", expandTerms(b.setup)));
    var stepsWrap = el("div", "c-scenario__steps");
    sc.appendChild(stepsWrap);
    container.appendChild(sc);

    function renderStep(i) {
      var st = b.steps[i];
      var step = el("div", "c-scenario__step");
      step.appendChild(el("div", "c-scenario__steplabel",
        "Decision " + (i + 1) + " of " + n));
      step.appendChild(el("div", "c-q__stem", expandTerms(st.stem)));
      var opts = el("div", "c-opts");
      var letters = ["A", "B", "C", "D", "E", "F"];
      st.options.forEach(function (opt, oi) {
        var btn = el("button", "c-opt");
        btn.innerHTML = '<span class="c-opt__key">' + letters[oi] + '</span><span>' + esc(opt) + '</span>';
        btn.addEventListener("click", function () { pick(st, oi, opts, step, i); });
        opts.appendChild(btn);
      });
      step.appendChild(opts);
      stepsWrap.appendChild(step);
    }

    function pick(st, chosen, optsEl, step, i) {
      var correct = chosen === st.answer;
      Array.prototype.forEach.call(optsEl.children, function (btn, oi) {
        btn.setAttribute("disabled", "true");
        if (oi === st.answer) btn.classList.add("is-correct");
        else if (oi === chosen) btn.classList.add("is-wrong");
      });
      var ex = el("div", "c-explain");
      var head = correct ? "Good call \u2014 best action" : "A better action exists";
      var detail = "";
      if (!correct && st.optFeedback && st.optFeedback[chosen])
        detail = '<p style="margin:.4em 0 0;color:#7E8DA0">Your pick: ' + esc(st.optFeedback[chosen]) + '</p>';
      ex.innerHTML =
        '<div class="c-explain__head ' + (correct ? "is-correct" : "is-wrong") + '">' + head + '</div>' +
        '<div>' + expandTerms(st.explain) + '</div>' + detail;
      var acts = el("div", "c-explain__actions");
      if (i < n - 1) {
        var next = el("button", "c-btn c-btn--primary", "Continue \u2192");
        next.addEventListener("click", function () {
          next.setAttribute("disabled", "true");
          renderStep(i + 1);
          var steps = stepsWrap.querySelectorAll(".c-scenario__step");
          var last = steps[steps.length - 1];
          if (last && last.scrollIntoView) last.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
        acts.appendChild(next);
      } else if (b.debrief) {
        ex.appendChild(acts); // keep structure; debrief added below
      }
      if (acts.children.length) ex.appendChild(acts);
      step.appendChild(ex);
      if (i === n - 1 && b.debrief) {
        var db = el("div", "c-scenario__debrief");
        db.innerHTML = "<strong>Debrief.</strong> " + expandTerms(b.debrief);
        stepsWrap.appendChild(db);
      }
    }

    renderStep(0);
  }

  /* ---- chrome: strip + rail -------------------------------------------- */
  var app, view;
  function moduleLed(m) {
    if (m.status !== "ready") return "is-locked";
    var secs = m.sections || [], done = 0;
    secs.forEach(function (s) { if (loadState().reviewed[s.id]) done++; });
    if (secs.length && done === secs.length) return "is-normal";
    if (done > 0) return "is-partial";
    return "";
  }
  function renderChrome(crumb) {
    var pct = completionPct();
    var cred = credMeta(activeCred());
    document.getElementById("strip-crumb").innerHTML = crumb || "System overview";
    document.getElementById("strip-ready").innerHTML = "Completion <b>" + pct + "%</b>";
    var brandMark = document.getElementById("brand-mark");
    var brandCredential = document.getElementById("brand-credential");
    if (cred) {
      if (brandMark) brandMark.textContent = cred.designation;
      if (brandCredential) brandCredential.textContent = "NERC · " + cred.name.toUpperCase();
      document.title = "NERC " + cred.designation + " Study Console";
    }

    var rail = document.getElementById("rail-modules");
    rail.innerHTML = "";
    CONTENT.forEach(function (m) {
      var a = el("button", "c-nav-item");
      a.dataset.href = "#/m/" + m.id;
      a.innerHTML =
        '<span class="c-nav-item__code">' + m.code + '</span>' +
        '<span class="c-nav-item__label">' + esc(m.title) +
          (m.status !== "ready" ? '<small>Coming in a later build</small>' : '') +
        '</span>' +
        '<span class="c-led ' + moduleLed(m) + '"></span>';
      rail.appendChild(a);
    });
    markActiveNav();
  }
  function markActiveNav() {
    var h = location.hash || "#/";
    document.querySelectorAll(".c-nav-item").forEach(function (n) {
      var href = n.dataset.href;
      var active = href === h || (href !== "#/" && h.indexOf(href) === 0);
      n.classList.toggle("is-active", active);
      if (active) n.setAttribute("aria-current", "page"); else n.removeAttribute("aria-current");
    });
  }

  /* ---- views ------------------------------------------------------------ */
  function gauge(pct, label) {
    var rot = -90 + 180 * (pct / 100);
    label = label || "Course completion";
    return '<div class="c-gauge">' +
      '<svg viewBox="0 0 200 110" width="180" aria-hidden="true">' +
        '<path d="M 20 92 A 80 80 0 0 1 180 92" fill="none" stroke="#2A3648" stroke-width="8" stroke-linecap="round"/>' +
        '<path d="M 128 30 A 80 80 0 0 1 180 92" fill="none" stroke="#3FB98C" stroke-width="8" stroke-linecap="round" opacity=".8"/>' +
        '<g class="c-gauge__needle" style="transform:rotate(' + rot.toFixed(1) + 'deg)">' +
          '<line x1="100" y1="92" x2="100" y2="30" stroke="#56C2E6" stroke-width="3"/>' +
        '</g>' +
        '<circle cx="100" cy="92" r="6" fill="#1A2230" stroke="#56C2E6" stroke-width="2"/>' +
      '</svg>' +
      '<div class="c-gauge__read"><b>' + pct + '%</b><span>' + esc(label) + '</span></div>' +
    '</div>';
  }

  function viewDashboard() {
    renderChrome("System overview");
    var metrics = progressMetrics(), q = metrics.questions, sections = metrics.sections;
    var cred = credMeta(activeCred()) || { designation: "TO", name: "Transmission Operator" };
    var v = el("div", "c-view");
    v.innerHTML =
      '<div class="eyebrow">Operator training console · ' + esc(cred.designation) + '</div>' +
      '<h1 class="c-h1">NERC ' + esc(cred.name) + ' &mdash; 6-Month Study Console</h1>' +
      '<p class="c-lead">A ground-up path for the NERC ' + esc(cred.designation) + ' certification exam: read the concepts, inspect highlighted terms, work the interactives, and drill original exam-style questions linked to the material.</p>' +
      '<div class="c-card" style="margin-top:24px;display:flex;gap:32px;flex-wrap:wrap;align-items:center;justify-content:space-between">' +
        gauge(metrics.completion, "Course completion") +
        '<a class="c-btn c-btn--primary" href="#/m/foundations/s/f-grid-anatomy">Resume &rarr; Foundations</a>' +
      '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">' +
        '<a class="c-btn c-btn--ghost" href="#/credential">Choose credential</a>' +
        '<button class="c-btn c-btn--ghost" id="dash-reset" type="button">Reset progress</button>' +
      '</div>' +
      '<div class="c-tiles">' +
        tile(sections.done + '<small>/' + sections.total + '</small>', "Sections reviewed") +
        tile(metrics.practiceCoverage + '<small>%</small>', "Practice coverage") +
        tile(metrics.practiceAccuracy + '<small>%</small>', "Practice accuracy") +
        tile(metrics.bankMastery + '<small>%</small>', "Question-bank mastery") +
      '</div>' +
      '<h2 class="c-h2">Where to start</h2>' +
      '<div class="c-seclist">' +
        secLink("#/m/foundations", "Work Module M0 &mdash; Foundations", "Grid anatomy, AC power, the reliability landscape") +
        secLink("#/adaptive", "Build an adaptive practice set", "Prioritizes missed items, weak subtopics, and credential weight") +
        secLink("#/events", "Run an integrated operating event", EVENTS.length + " cross-module scenarios with persistent consequences") +
        secLink("#/practice/foundations", "Drill Foundations questions", QUESTIONS.length + " original exam-style items in the bank") +
        secLink("#/plan", "Open your credential study plan", "Choose an 8-, 12-, or 26-week schedule weighted to the selected blueprint") +
        secLink("#/credential", "Choose your credential", "TO, RC, BT, and BI use their official scored-question blueprints") +
        secLink("#/glossary", "Browse the glossary", GLOSSARY.length + " terms, always a hover away in the text") +
      '</div>' +
      '<p class="c-fineprint">Progress labels describe activity inside this resource, not a prediction of exam performance. Every practice question is <strong>original</strong>; none are confidential NERC exam items. Treat the official content outline, Glossary of Terms, and Reliability Standards as primary sources.</p>';
    mountView(v);
    var rb = document.getElementById("dash-reset");
    if (rb) rb.addEventListener("click", function () {
      if (window.confirm("Reset learning progress? This clears answers, reviewed sections, events, and any in-progress exam. Credential, accessibility, and review settings are kept. This cannot be undone.")) resetProgress();
    });
  }
  function tile(num, lbl) {
    return '<div class="c-tile"><div class="c-tile__num">' + num + '</div><div class="c-tile__lbl">' + lbl + '</div></div>';
  }
  function secLink(href, title, sub) {
    return '<a class="c-secrow" href="' + href + '"><span class="c-secrow__t">' + title +
           '<br><span class="c-secrow__n">' + sub + '</span></span><span class="c-secrow__n">&rarr;</span></a>';
  }
  function countReady() { var n = 0; CONTENT.forEach(function (m) { if (m.status === "ready") n++; }); return n; }

  function viewCredential() {
    renderChrome("Credential");
    var act = activeCred();
    var order = ["to", "rc", "bit", "bi"];
    var cards = order.map(function (id) {
      var m = credMeta(id); if (!m) return "";
      var built = credHasBlueprint(id), isActive = id === act;
      var edge = isActive ? "var(--phosphor)" : (built ? "var(--grid-line)" : "var(--readout-dim)");
      return '<div class="c-card" style="margin-bottom:12px;border-left:3px solid ' + edge + '">' +
        '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
          '<span class="c-pill">' + esc(m.designation) + '</span>' +
          '<b style="color:var(--readout)">' + esc(m.name) + '</b>' +
          (isActive ? '<span class="c-pill" style="color:var(--normal);border-color:var(--normal)">active</span>' : '') +
          (built ? '' : '<span class="c-pill" style="color:var(--alert);border-color:var(--alert)">content outline unavailable</span>') +
        '</div>' +
        '<div class="c-secrow__n" style="margin-top:6px;font-family:var(--font-mono)">' + m.total + ' items \u00b7 ' + m.scored + ' scored \u00b7 pass ' + m.cut + '/' + m.scored + ' (' + Math.round(m.pct * 100) + '%)</div>' +
        '<div style="margin-top:10px">' +
          (built
            ? (isActive
                ? '<span class="c-secrow__n">Selected \u2014 practice and the mock exam use this credential\u2019s blueprint.</span>'
                : '<button class="c-btn c-btn--primary" data-cred="' + id + '">Use ' + esc(m.designation) + '</button>')
            : '<span class="c-secrow__n">This credential cannot be selected because its blueprint is unavailable.</span>') +
        '</div>' +
      '</div>';
    }).join("");
    var v = el("div", "c-view");
    v.innerHTML =
      '<div class="eyebrow">System Operator certification</div>' +
      '<h1 class="c-h1">Choose your credential</h1>' +
      '<p class="c-lead">All four NERC System Operator credentials draw on the same six knowledge domains and differ in their scored-question weighting. The console includes official blueprint targets for <strong>TO, RC, BT, and BI</strong>; your selection controls practice coverage and exact mock-exam sampling.</p>' +
      cards +
      '<p class="c-fineprint">Exam facts from NERC Exam Resource Materials (Jan 2025) and the SOC Program Manual v4.2. Per-domain weightings come from each exam\u2019s official Content Outline on NERC\u2019s One-Stop Shop.</p>';
    mountView(v);
    v.querySelectorAll("button[data-cred]").forEach(function (b) {
      b.addEventListener("click", function () {
        setCred(this.getAttribute("data-cred"));
        try { window.location.reload(); } catch (e) { location.hash = "#/"; route(); }
      });
    });
  }


  function viewModule(moduleId) {
    var m = moduleById[moduleId];
    if (!m) return viewDashboard();
    renderChrome('<b>' + esc(m.code) + '</b> &nbsp;' + esc(m.title));
    var v = el("div", "c-view");

    if (m.status !== "ready") {
      v.innerHTML =
        '<div class="c-locked">' +
          '<span class="c-locked__badge">Placeholder &mdash; scheduled build</span>' +
          '<h1 class="c-h1">' + esc(m.code) + ' &middot; ' + esc(m.title) + '</h1>' +
          '<p class="c-lead">' + esc(m.blurb) + '</p>' +
          '<div class="c-note c-note--op" style="margin-top:24px"><div class="c-note__title">What lands here</div>' +
          'Full written content, glossary expansion, interactives, and a block of exam-style questions for this module. ' +
          'The architecture, navigation slot, and progress tracking are already wired &mdash; this build just adds the data.</div>' +
          '<a class="c-btn" href="#/" style="margin-top:20px">&larr; Back to overview</a>' +
        '</div>';
      return mountView(v);
    }

    var html =
      '<div class="eyebrow">Module ' + esc(m.code) + '</div>' +
      '<h1 class="c-h1">' + esc(m.title) + '</h1>' +
      '<p class="c-lead">' + esc(m.blurb) + '</p>' +
      '<div class="c-seclist">';
    (m.sections || []).forEach(function (s, i) {
      var done = loadState().reviewed[s.id];
      html += '<a class="c-secrow" href="#/m/' + m.id + '/s/' + s.id + '">' +
              '<span class="c-led ' + (done ? "is-normal" : "") + '"></span>' +
              '<span class="c-secrow__t">' + esc(s.title) + '</span>' +
              '<span class="c-secrow__n">' + (i + 1) + '/' + m.sections.length + '</span></a>';
    });
    html += '</div>' +
      '<a class="c-btn c-btn--primary" style="margin-top:20px" href="#/practice/' + m.id + '">Drill this module &rarr;</a>';
    v.innerHTML = html;
    mountView(v);
  }

  function viewSection(moduleId, sectionId) {
    var rec = sectionById[sectionId];
    if (!rec) return viewModule(moduleId);
    var m = rec.module, s = rec.section;
    renderChrome('<b>' + esc(m.code) + '</b> &nbsp;' + esc(m.title) + ' &nbsp;&rsaquo;&nbsp; ' + esc(s.title));

    var idx = m.sections.indexOf(s);
    var v = el("div", "c-view");
    v.appendChild(el("div", "eyebrow", esc(m.title) + " &middot; Section " + (idx + 1) + " of " + m.sections.length));
    v.appendChild(el("h1", "c-h1", esc(s.title)));
    var prose = el("div", "c-prose");
    renderBlocks(s.body, prose);
    v.appendChild(prose);
    renderVideos(s.id, v);

    // controls: mark reviewed + prev/next
    var bar = el("div");
    bar.style.cssText = "display:flex;gap:12px;flex-wrap:wrap;margin-top:32px;align-items:center";
    var reviewed = !!loadState().reviewed[s.id];
    var btn = el("button", "c-btn " + (reviewed ? "c-btn--primary" : ""),
      (reviewed ? "\u2713 Reviewed" : "Mark reviewed"));
    btn.addEventListener("click", function () {
      var st = loadState();
      if (st.reviewed[s.id]) delete st.reviewed[s.id]; else st.reviewed[s.id] = Date.now();
      saveState();
      route(); // re-render to update LEDs + gauge
    });
    bar.appendChild(btn);

    if (idx > 0) bar.appendChild(link("c-btn c-btn--ghost", "#/m/" + m.id + "/s/" + m.sections[idx - 1].id, "&larr; Previous"));
    if (idx < m.sections.length - 1) bar.appendChild(link("c-btn", "#/m/" + m.id + "/s/" + m.sections[idx + 1].id, "Next &rarr;"));
    else bar.appendChild(link("c-btn", "#/practice/" + m.id, "Drill this module &rarr;"));
    v.appendChild(bar);
    if (reviewOn()) v.appendChild(reviewSectionControls(s, m.id));
    mountView(v);
  }
  function link(cls, href, html) {
    var a = el("a", cls, html); a.href = href; return a;
  }

  /* ---- question engine -------------------------------------------------- */
  var quizState = { list: [], i: 0, key: "", orders: {} };
  function questionsForDomain(id) { return QUESTIONS.filter(function (q) { return q.domain === id; }); }

  function practiceLanding() {
    renderChrome("Practice");
    var v = el("div", "c-view");
    var total = QUESTIONS.length;
    var html =
      '<div class="eyebrow">Question bank \u00b7 ' + total + ' items</div>' +
      '<h1 class="c-h1">Practice by domain</h1>' +
      '<p class="c-lead">Questions are tagged to the six official ' + esc((credMeta(activeCred()) || {}).designation || "selected") + ' exam domains and subtopics. Each bar compares the bank with that credential\u2019s scored-question target.</p>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:4px 0 20px">' +
        '<a class="c-btn c-btn--primary" href="#/adaptive">Build adaptive set &rarr;</a>' +
        '<a class="c-btn" href="#/practice/all">Practice all ' + total + ' &rarr;</a>' +
      '</div>' +
      '<div class="c-seclist">';
    BLUEPRINT.forEach(function (d) {
      var have = questionsForDomain(d.id).length;
      var pct = Math.min(100, Math.round(have / d.target * 100));
      html +=
        '<a class="c-secrow" href="#/practice/d/' + d.id + '">' +
          '<span class="c-secrow__t">' + esc(d.name) +
            '<br><span class="c-secrow__n">' + have + ' written \u00b7 ' + d.target + ' on the exam</span>' +
            '<span style="display:block;height:5px;background:var(--grid-line);border-radius:3px;margin-top:6px;max-width:280px">' +
              '<span style="display:block;height:5px;background:var(--phosphor);border-radius:3px;width:' + pct + '%"></span></span>' +
          '</span>' +
          '<span class="c-secrow__n">&rarr;</span>' +
        '</a>';
    });
    html += '</div>';
    v.innerHTML = html;
    mountView(v);
  }

  function runQuiz(pool, label, key, reasons) {
    renderChrome("Practice" + (label ? " &middot; " + esc(label) : ""));
    if (!pool.length) {
      var vEmpty = el("div", "c-view");
      vEmpty.innerHTML = '<h1 class="c-h1">No questions yet</h1><p class="c-lead">Items for this selection arrive in a later build.</p><a class="c-btn" href="#/practice">&larr; Practice</a>';
      return mountView(vEmpty);
    }
    if (quizState.key !== key) quizState = { list: pool, i: 0, key: key, orders: {}, reasons: reasons || {} };
    renderQuestion();
  }

  function renderQuestion() {
    var q = quizState.list[quizState.i];
    var v = el("div", "c-view");
    var wrap = el("div", "c-q");
    var diffCls = "c-pill--" + q.difficulty;
    var dom = domainById[q.domain];
    var domName = dom ? dom.short : (q.domain || "");
    wrap.innerHTML =
      '<div class="c-q__meta">' +
        '<span class="c-pill ' + diffCls + '">' + q.difficulty + '</span>' +
        '<span class="c-pill">' + esc(domName) + '</span>' +
        '<span class="c-q__counter">Item ' + (quizState.i + 1) + ' of ' + quizState.list.length + '</span>' +
        (quizState.reasons && quizState.reasons[q.id] ? '<span class="c-pill c-pill--focus">' + esc(quizState.reasons[q.id]) + '</span>' : '') +
      '</div>' +
      qDiagram(q) +
      '<div class="c-q__stem">' + esc(q.stem) + '</div>';
    var opts = el("div", "c-opts");
    var letters = ["A", "B", "C", "D", "E", "F"];
    if (!quizState.orders[q.id]) quizState.orders[q.id] = shuffle(q.options.map(function (_, i) { return i; }));
    quizState.orders[q.id].forEach(function (canonicalIndex, displayIndex) {
      var b = el("button", "c-opt");
      b.dataset.canonical = canonicalIndex;
      b.innerHTML = '<span class="c-opt__key">' + letters[displayIndex] + '</span><span>' + esc(q.options[canonicalIndex]) + '</span>';
      b.addEventListener("click", function () { answer(q, canonicalIndex, opts, wrap); });
      opts.appendChild(b);
    });
    wrap.appendChild(opts);
    v.appendChild(wrap);
    if (reviewOn()) v.appendChild(reviewQuestionControls(q));
    mountView(v);
  }

  function answer(q, chosen, optsEl, wrap) {
    var correct = chosen === q.answer;
    var st = loadState();
    var now = Date.now(), mc = misconceptionFor(q);
    var previous = st.answered[q.id] || {};
    st.answered[q.id] = { chosen: chosen, correct: correct, at: now, confidence: previous.confidence || null };
    st.history.push({ qid:q.id, topic:q.topic, chosen:chosen, correct:correct, confidence:null, at:now, mode:(quizState.key || "practice") });
    if (st.history.length > 2000) st.history = st.history.slice(-2000);
    if (mc) {
      var mcs = st.misconceptions[mc.id] || { wrong:0, correct:0, last:0 };
      if (correct) mcs.correct++; else mcs.wrong++;
      mcs.last = now; st.misconceptions[mc.id] = mcs;
    }
    saveState();
    recordActivity("practice-answer", { qid:q.id, topic:q.topic, correct:correct });

    Array.prototype.forEach.call(optsEl.children, function (b) {
      var canonicalIndex = Number(b.dataset.canonical);
      b.setAttribute("disabled", "true");
      if (canonicalIndex === q.answer) b.classList.add("is-correct");
      else if (canonicalIndex === chosen) b.classList.add("is-wrong");
    });

    var ex = el("div", "c-explain");
    var head = correct ? "Correct &mdash; best answer" : "Not the best answer";
    announce(correct ? "Correct answer." : "Incorrect answer. Review the explanation.");
    var detail = "";
    if (!correct && q.optFeedback && q.optFeedback[chosen])
      detail = '<p style="margin:.4em 0 0;color:#7E8DA0">Your pick: ' + esc(q.optFeedback[chosen]) + '</p>';
    ex.innerHTML =
      '<div class="c-explain__head ' + (correct ? "is-correct" : "is-wrong") + '">' + head + '</div>' +
      '<div>' + esc(q.explain) + '</div>' + detail +
      '<div class="c-confidence" role="group" aria-label="Confidence in this answer"><span>How confident were you?</span><button type="button" data-confidence="guessed">Guessed</button><button type="button" data-confidence="unsure">Unsure</button><button type="button" data-confidence="knew">Knew it</button></div>' +
      '<div class="c-explain__actions">' +
        '<a class="c-btn" href="#/m/' + q.module + '/s/' + q.section + '">Review this topic &rarr;</a>' +
        (q.std ? '<a class="c-btn" href="#/standards/' + encodeURIComponent(q.std) + '">Standard: ' + esc(q.std) + ' &rarr;</a>' : '') +
        (quizState.i < quizState.list.length - 1
          ? '<button class="c-btn c-btn--primary" id="q-next">Next item &rarr;</button>'
          : '<a class="c-btn c-btn--primary" href="#/">Finish set &rarr;</a>') +
      '</div>';
    wrap.appendChild(ex);
    renderChrome(document.getElementById("strip-crumb").innerHTML); // refresh completion
    Array.prototype.forEach.call(ex.querySelectorAll("[data-confidence]"), function (cb) {
      cb.addEventListener("click", function () {
        var level = cb.getAttribute("data-confidence"), state = loadState();
        if (state.answered[q.id]) state.answered[q.id].confidence = level;
        for (var hi=state.history.length-1;hi>=0;hi--) { if (state.history[hi].qid===q.id && state.history[hi].at===now) { state.history[hi].confidence=level; break; } }
        saveState();
        Array.prototype.forEach.call(ex.querySelectorAll("[data-confidence]"), function (x) { x.classList.toggle("is-on", x===cb); x.setAttribute("aria-pressed", x===cb?"true":"false"); });
        announce("Confidence recorded as " + level + ".");
      });
    });
    var nx = document.getElementById("q-next");
    if (nx) nx.addEventListener("click", function () { quizState.i++; renderQuestion(); });
  }

  /* ---- mock and test-day exam engine ----------------------------------- */
  var EXAM_KEY = "nerc-to-console.exam.v3";
  var EXAM_DUR_MIN = 180;
  var EXPERIMENTAL_COUNT = 20;
  var examTimer = null, examKeyHandler = null;

  function clearExamTimer() { if (examTimer) { clearInterval(examTimer); examTimer = null; } if (examKeyHandler) { document.removeEventListener("keydown", examKeyHandler); examKeyHandler = null; } }
  function loadExam() {
    try {
      var r=window.localStorage.getItem(EXAM_KEY), ex=r?JSON.parse(r):null;
      if (!ex) return examMem || null;
      if (!ex.scoredIds) ex.scoredIds=(ex.qids||[]).slice();
      if (!ex.experimentalIds) ex.experimentalIds=[];
      if (!ex.mode) ex.mode=ex.experimentalIds.length?"testday":"scored";
      ex.warnings=ex.warnings||{};
      return ex;
    } catch(e) { return examMem || null; }
  }
  var examMem = null;
  function saveExam(o) { examMem=o; try { window.localStorage.setItem(EXAM_KEY,JSON.stringify(o)); } catch(e){} }
  function clearExam() { examMem=null; try { window.localStorage.removeItem(EXAM_KEY); } catch(e){} }

  function shuffle(a) { a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function drawScoredExam() {
    var picked=[];
    BLUEPRINT.forEach(function(domain){(domain.topics||[]).forEach(function(topic){
      var pool=shuffle(QUESTIONS.filter(function(q){return q.topic===topic.id;}));
      if(pool.length<topic.target)throw new Error("Question shortage for topic "+topic.id+": need "+topic.target+", have "+pool.length);
      picked=picked.concat(pool.slice(0,topic.target));
    });});
    return shuffle(picked).map(function(q){return q.id;});
  }
  function drawExperimental(excluded,count) {
    var used={}; excluded.forEach(function(id){used[id]=true;});
    var pools={}; BLUEPRINT.forEach(function(d){pools[d.id]=shuffle(QUESTIONS.filter(function(q){return q.domain===d.id&&!used[q.id];}));});
    var result=[], domains=BLUEPRINT.slice().sort(function(a,b){return b.target-a.target;}), cursor=0;
    while(result.length<count && cursor<count*10){
      var d=domains[cursor%domains.length], pool=pools[d.id]||[], q=pool.shift();
      if(q && !used[q.id]){used[q.id]=true;result.push(q.id);} cursor++;
    }
    if(result.length<count){shuffle(QUESTIONS).forEach(function(q){if(result.length<count&&!used[q.id]){used[q.id]=true;result.push(q.id);}});}
    if(result.length<count)throw new Error("Question shortage for experimental-style draw");
    return result;
  }
  function examTotal(){return BLUEPRINT.reduce(function(n,d){return n+d.topics.reduce(function(s,t){return s+t.target;},0);},0);}
  function makeOptionOrder(q){return shuffle(q.options.map(function(_,i){return i;}));}
  function examOptionOrder(ex,q){ex.orders=ex.orders||{};if(!ex.orders[q.id]){ex.orders[q.id]=makeOptionOrder(q);saveExam(ex);}return ex.orders[q.id];}
  function startExam(mode){
    mode=mode||"scored";
    var scored=drawScoredExam(), experimental=mode==="testday"?drawExperimental(scored,EXPERIMENTAL_COUNT):[], qids=shuffle(scored.concat(experimental)), orders={};
    qids.forEach(function(id){orders[id]=makeOptionOrder(qById[id]);});
    saveExam({version:3,mode:mode,qids:qids,scoredIds:scored,experimentalIds:experimental,orders:orders,answers:{},flags:{},warnings:{},i:0,start:Date.now(),dur:EXAM_DUR_MIN,done:false});
    recordActivity("exam-start",{mode:mode,scored:scored.length,experimental:experimental.length});
    location.hash="#/exam/run";
  }
  function msLeft(ex){return ex.dur*60000-(Date.now()-ex.start);}
  function fmtClock(ms){if(ms<0)ms=0;var s=Math.floor(ms/1000),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),ss=s%60;return h+":"+("0"+m).slice(-2)+":"+("0"+ss).slice(-2);}
  function scoredIds(ex){return ex.scoredIds&&ex.scoredIds.length?ex.scoredIds:ex.qids;}
  function scoreExam(ex,ids){var correct=0;(ids||scoredIds(ex)).forEach(function(id){var q=qById[id];if(q&&ex.answers[id]===q.answer)correct++;});return correct;}

  function viewExamLanding(){
    clearExamTimer();renderChrome("Mock and test-day exams");
    var ex=loadExam(),total=examTotal(),cut=cutFor(total),cred=credMeta(activeCred());
    var v=el("div","c-view"),html='<div class="eyebrow">Timed simulations</div><h1 class="c-h1">Mock and test-day exams</h1>'+
      '<p class="c-lead">Both modes draw the exact scored subtopic blueprint for <strong>'+esc(cred.designation)+'</strong>. The test-day mode adds 20 experimental-style items that are indistinguishable during the run and excluded from the scored result.</p>'+
      '<div class="p3-exam-modes">'+
        '<section class="c-card"><span class="c-pill">Scored blueprint</span><h2 class="c-h2">'+total+' scored items</h2><p>Focused practice under a three-hour study-console clock. No feedback appears until submission.</p><button class="c-btn c-btn--primary" id="ex-start-scored" type="button">Start scored mock</button></section>'+
        '<section class="c-card"><span class="c-pill c-pill--analysis">Test-day mode</span><h2 class="c-h2">'+(total+EXPERIMENTAL_COUNT)+' total items</h2><p>'+total+' scored-style items plus 20 unscored experimental-style items. Only the scored blueprint is compared with '+cut+'/'+total+'.</p><button class="c-btn c-btn--primary" id="ex-start-testday" type="button">Start test-day mode</button></section>'+
      '</div>';
    if(ex&&!ex.done){var left=msLeft(ex);html+='<div class="c-note c-note--alert"><div class="c-note__title">Exam in progress</div>You have <b>'+fmtClock(left)+'</b> remaining and '+Object.keys(ex.answers||{}).length+' of '+ex.qids.length+' answered.</div><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="c-btn c-btn--primary" href="#/exam/run">Resume</a><button class="c-btn c-btn--ghost" id="ex-discard" type="button">Discard</button></div>';}
    else if(ex&&ex.done){html+='<div class="c-note c-note--normal"><div class="c-note__title">Completed result available</div><a href="#/exam/result">Open the latest score report →</a></div>';}
    html+='<p class="c-fineprint">NERC reports that 20 additional experimental questions are administered and do not contribute to the score. This resource uses original study questions, not confidential exam items. The three-hour clock is a study-console setting and should not be treated as an official appointment rule.</p>';
    v.innerHTML=html;mountView(v);
    document.getElementById("ex-start-scored").addEventListener("click",function(){if(ex&&!ex.done&&!window.confirm("Discard the in-progress exam and start a scored mock?"))return;clearExam();startExam("scored");});
    document.getElementById("ex-start-testday").addEventListener("click",function(){if(ex&&!ex.done&&!window.confirm("Discard the in-progress exam and start test-day mode?"))return;clearExam();startExam("testday");});
    var db=document.getElementById("ex-discard");if(db)db.addEventListener("click",function(){clearExam();route();});
  }

  function viewExamRun(){
    var ex=loadExam();if(!ex||ex.done){location.hash=ex&&ex.done?"#/exam/result":"#/exam";return;} if(msLeft(ex)<=0){submitExam();return;}
    var q=qById[ex.qids[ex.i]];if(!q){clearExam();location.hash="#/exam";return;} renderChrome("Exam · in progress");
    var v=el("div","c-view"),answered=Object.keys(ex.answers||{}).length,left=msLeft(ex),chosen=ex.answers[q.id];
    var top=el("div","p3-exam-top");top.innerHTML='<div><div class="eyebrow">'+(ex.mode==='testday'?'Test-day mode':'Scored mock')+'</div><div class="mono" id="ex-clock" role="timer" aria-label="Time remaining">'+fmtClock(left)+'</div></div><div class="p3-exam-progress"><span>'+answered+'/'+ex.qids.length+' answered</span><button class="c-btn c-btn--primary" id="ex-submit" type="button">Submit exam</button></div>';v.appendChild(top);
    var wrap=el("div","c-q");wrap.innerHTML='<div class="c-q__meta"><span class="c-pill">Item '+(ex.i+1)+' of '+ex.qids.length+'</span><span class="c-pill c-pill--'+q.difficulty+'">'+q.difficulty+'</span></div>'+qDiagram(q)+'<div class="c-q__stem" id="exam-stem">'+esc(q.stem)+'</div>';
    var opts=el("div","c-opts");opts.setAttribute("role","radiogroup");opts.setAttribute("aria-labelledby","exam-stem");var letters=["A","B","C","D","E","F"];
    examOptionOrder(ex,q).forEach(function(canonicalIndex,displayIndex){var b=el("button","c-opt"+(chosen===canonicalIndex?" is-selected":""));b.setAttribute("role","radio");b.setAttribute("aria-checked",chosen===canonicalIndex?"true":"false");b.dataset.canonical=canonicalIndex;b.innerHTML='<span class="c-opt__key">'+letters[displayIndex]+'</span><span>'+esc(q.options[canonicalIndex])+'</span>';b.addEventListener("click",function(){ex.answers[q.id]=canonicalIndex;saveExam(ex);viewExamRun();});opts.appendChild(b);});wrap.appendChild(opts);v.appendChild(wrap);
    var bar=el("div");bar.className="p3-exam-controls";bar.innerHTML='<button class="c-btn" id="ex-prev" type="button"'+(ex.i===0?' disabled':'')+'>← Prev</button><button class="c-btn" id="ex-flag" type="button">'+(ex.flags[q.id]?'⚑ Unflag':'⚐ Flag for review')+'</button><button class="c-btn" id="ex-clear" type="button"'+(chosen==null?' disabled':'')+'>Clear answer</button><button class="c-btn c-btn--primary" id="ex-next" type="button"'+(ex.i===ex.qids.length-1?' disabled':'')+'>Next →</button>';v.appendChild(bar);
    var navWrap=el("div","p3-exam-nav");navWrap.innerHTML='<div class="eyebrow">Navigator — item status</div>';var grid=el("div","p3-exam-grid");ex.qids.forEach(function(qid,k){var cell=el("button","p3-exam-cell"+(k===ex.i?' is-current':'')+(ex.answers[qid]!=null?' is-answered':'')+(ex.flags[qid]?' is-flagged':''),String(k+1));cell.setAttribute("aria-label","Item "+(k+1)+(ex.answers[qid]!=null?", answered":", unanswered")+(ex.flags[qid]?", flagged":""));cell.addEventListener("click",function(){ex.i=k;saveExam(ex);viewExamRun();});grid.appendChild(cell);});navWrap.appendChild(grid);v.appendChild(navWrap);mountView(v);
    document.getElementById("ex-prev").addEventListener("click",function(){if(ex.i>0){ex.i--;saveExam(ex);viewExamRun();}});document.getElementById("ex-next").addEventListener("click",function(){if(ex.i<ex.qids.length-1){ex.i++;saveExam(ex);viewExamRun();}});document.getElementById("ex-flag").addEventListener("click",function(){if(ex.flags[q.id])delete ex.flags[q.id];else ex.flags[q.id]=true;saveExam(ex);viewExamRun();});document.getElementById("ex-clear").addEventListener("click",function(){delete ex.answers[q.id];saveExam(ex);viewExamRun();});document.getElementById("ex-submit").addEventListener("click",function(){var un=ex.qids.length-Object.keys(ex.answers).length;if(un>0&&!window.confirm(un+" item(s) are unanswered and will be scored as incorrect. Submit anyway?"))return;submitExam();});
    examKeyHandler=function(e){if(e.target&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;var n=Number(e.key);if(n>=1&&n<=q.options.length){var order=examOptionOrder(ex,q),ci=order[n-1];if(ci!=null){ex.answers[q.id]=ci;saveExam(ex);viewExamRun();e.preventDefault();}}else if(e.key==="ArrowRight"&&ex.i<ex.qids.length-1){ex.i++;saveExam(ex);viewExamRun();e.preventDefault();}else if(e.key==="ArrowLeft"&&ex.i>0){ex.i--;saveExam(ex);viewExamRun();e.preventDefault();}else if(e.key.toLowerCase()==="f"){if(ex.flags[q.id])delete ex.flags[q.id];else ex.flags[q.id]=true;saveExam(ex);viewExamRun();e.preventDefault();}};document.addEventListener("keydown",examKeyHandler);
    function warnAt(key, threshold, message) { if (left<=threshold && !ex.warnings[key]) { ex.warnings[key]=true; saveExam(ex); announce(message); } }
    warnAt("five",300000,"Five minutes remain in the exam simulation."); warnAt("one",60000,"One minute remains in the exam simulation.");
    clearInterval(examTimer);examTimer=setInterval(function(){var l=msLeft(ex),c=document.getElementById("ex-clock");if(!c){clearExamTimer();return;}c.textContent=fmtClock(l);if(l<=300000&&!ex.warnings.five){ex.warnings.five=true;saveExam(ex);announce("Five minutes remain in the exam simulation.");}if(l<=60000){c.style.color="var(--emergency)";if(!ex.warnings.one){ex.warnings.one=true;saveExam(ex);announce("One minute remains in the exam simulation.");}}if(l<=0){clearExamTimer();submitExam();}},1000);
  }

  function examHistorySummary(ex) {
    var ids=scoredIds(ex), topics={};
    ids.forEach(function(id){var q=qById[id];if(!q)return;var t=topics[q.topic]||(topics[q.topic]={correct:0,total:0});t.total++;if(ex.answers[id]===q.answer)t.correct++;});
    var correct=scoreExam(ex,ids);return {at:ex.submittedAt||Date.now(),mode:ex.mode,total:ids.length,correct:correct,pct:Math.round(100*correct/ids.length),topics:topics};
  }
  function recordExamHistory(ex) {
    var st=loadState(), summary=examHistorySummary(ex);st.examHistory.push(summary);if(st.examHistory.length>20)st.examHistory=st.examHistory.slice(-20);saveState();
  }
  function sittingHeuristic() {
    var all=(loadState().examHistory||[]).filter(function(h){return h.total===examTotal();}), last=all.slice(-2);
    if(last.length<2)return {met:false,stage:"needs-mocks",message:"Complete two full, independently drawn mock exams."};
    var overall=last.every(function(h){return h.pct>=85;}), combined={};
    last.forEach(function(h){Object.keys(h.topics||{}).forEach(function(id){var a=combined[id]||(combined[id]={correct:0,total:0});a.correct+=h.topics[id].correct;a.total+=h.topics[id].total;});});
    var low=[];Object.keys(topicById).forEach(function(id){var a=combined[id];var pct=a&&a.total?Math.round(100*a.correct/a.total):0;if(pct<70)low.push({id:id,pct:pct});});
    return {met:overall&&!low.length,stage:overall?(low.length?"subtopics":"met"):"overall",scores:last.map(function(h){return h.pct;}),low:low,message:overall?(low.length?low.length+" subtopic(s) remain below 70% across the two mocks.":"Heuristic met: two mocks at 85% or higher with no combined subtopic below 70%."):"Both of the two most recent full mocks must be 85% or higher."};
  }
  function submitExam(){clearExamTimer();var ex=loadExam();if(!ex){location.hash="#/exam";return;}ex.done=true;ex.submittedAt=Date.now();if(!ex.historyRecorded){recordExamHistory(ex);ex.historyRecorded=true;}saveExam(ex);recordActivity("exam-complete",{mode:ex.mode,score:scoreExam(ex),scored:scoredIds(ex).length,experimental:ex.experimentalIds.length});location.hash="#/exam/result";}

  function viewExamResult(){
    clearExamTimer();var ex=loadExam();if(!ex||!ex.done){location.hash="#/exam";return;}var scored=scoredIds(ex),total=scored.length,correct=scoreExam(ex,scored),cut=cutFor(total),pass=correct>=cut,pct=Math.round(correct/total*100),byDom={};BLUEPRINT.forEach(function(d){byDom[d.id]={name:d.short,correct:0,total:0};});scored.forEach(function(id){var q=qById[id],ok=ex.answers[id]===q.answer;if(q&&byDom[q.domain]){byDom[q.domain].total++;if(ok)byDom[q.domain].correct++;}});
    var expTotal=(ex.experimentalIds||[]).length,expCorrect=scoreExam(ex,ex.experimentalIds||[]),v=el("div","c-view"),col=pass?"var(--normal)":"var(--emergency)";
    var html='<div class="eyebrow">Scored-result report</div><h1 class="c-h1" style="color:'+col+'">'+(pass?'MEETS PRACTICE CUT':'BELOW PRACTICE CUT')+'</h1><div class="c-card p3-score-card"><div><div class="p3-score" style="color:'+col+'">'+correct+'<span>/'+total+'</span></div><div class="c-tile__lbl">scored result · '+pct+'%</div></div><div><div class="p3-cut">'+cut+'</div><div class="c-tile__lbl">published scored-item cut</div></div></div>';
    if(expTotal)html+='<div class="c-note c-note--op"><div class="c-note__title">Experimental-style items are separate</div>You answered <strong>'+expCorrect+'/'+expTotal+'</strong> correctly on the 20 experimental-style items. This result is shown for learning only and did not affect the scored benchmark.</div>';
    html+='<h2 class="c-h2">Scored items by domain</h2><div class="c-seclist">';BLUEPRINT.forEach(function(d){var b=byDom[d.id],p=b.total?Math.round(100*b.correct/b.total):0,benchmark=Math.round(cutPct()*100),dcol=p>=benchmark?'var(--normal)':(p>=60?'var(--alert)':'var(--emergency)');html+='<div class="c-secrow"><span class="c-secrow__t">'+esc(d.name)+'<span class="p3-meter"><span style="width:'+p+'%;background:'+dcol+'"></span></span></span><span class="mono" style="color:'+dcol+'">'+b.correct+'/'+b.total+'</span></div>';});html+='</div><div style="display:flex;gap:8px;margin-top:20px;flex-wrap:wrap"><button class="c-btn" id="ex-review" type="button">Review scored misses</button><button class="c-btn c-btn--primary" id="ex-new" type="button">Start another exam</button><a class="c-btn" href="#/adaptive">Build remediation set</a></div><div id="ex-reviewbox"></div><p class="c-fineprint">The cut comparison uses only the credential blueprint items. Results remain practice benchmarks and do not predict an official examination outcome.</p>';
    v.innerHTML=html;mountView(v);document.getElementById("ex-new").addEventListener("click",function(){clearExam();location.hash="#/exam";});document.getElementById("ex-review").addEventListener("click",function(){var box=document.getElementById("ex-reviewbox");if(box.children.length){box.innerHTML="";this.textContent="Review scored misses";return;}this.textContent="Hide review";renderReview(box,ex,false,scored);});
  }

  function renderReview(box,ex,all,ids){box.innerHTML="";ids=ids||scoredIds(ex);var head=el("div");head.style.cssText="display:flex;gap:8px;align-items:center;margin:20px 0 8px";head.innerHTML='<span class="eyebrow" style="flex:1">'+(all?'All scored items':'Scored items you missed')+'</span>';var tog=el("button","c-btn c-btn--ghost",all?'Show only missed':'Show all scored');tog.addEventListener("click",function(){renderReview(box,ex,!all,ids);});head.appendChild(tog);box.appendChild(head);var letters=["A","B","C","D","E","F"],shown=0;ids.forEach(function(qid){var k=ex.qids.indexOf(qid),q=qById[qid],chosen=ex.answers[qid],ok=chosen===q.answer;if(!all&&ok)return;shown++;var card=el("div","c-card");card.style.marginBottom="10px";var h='<div class="c-q__counter">Item '+(k+1)+' · '+(domainById[q.domain]?domainById[q.domain].short:q.domain)+' · <span style="color:'+(ok?'var(--normal)':'var(--emergency)')+'">'+(ok?'correct':(chosen==null?'unanswered':'incorrect'))+'</span></div>'+qDiagram(q)+'<div style="margin:6px 0 8px">'+esc(q.stem)+'</div>';examOptionOrder(ex,q).forEach(function(ci,di){var mark=ci===q.answer?'✓ ':(ci===chosen?'✗ ':''),c=ci===q.answer?'var(--normal)':(ci===chosen?'var(--emergency)':'var(--readout-dim)');h+='<div style="font-size:.9rem;color:'+c+'">'+mark+letters[di]+'. '+esc(q.options[ci])+'</div>';});h+='<div class="c-secrow__n" style="margin-top:8px">'+esc(q.explain)+'</div><div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><a class="c-tooltip__link" href="#/m/'+q.module+'/s/'+q.section+'">Review topic →</a>'+(q.std?'<a class="c-tooltip__link" href="#/standards/'+encodeURIComponent(q.std)+'">'+esc(q.std)+' →</a>':'')+'</div>';card.innerHTML=h;box.appendChild(card);});if(!shown)box.appendChild(el("p","c-secrow__n",all?'No items.':'Nothing missed — perfect score on the scored items.'));}

  /* ---- credential-specific study plan ----------------------------------- */
  var DOMAIN_MODULES = {
    "balancing":["balancing"], "transmission":["foundations","transmission-ops","voltage-reactive","protection"],
    "emergency-prep":["emergency-ops"], "emergency-response":["emergency-ops","restoration"],
    "contingency":["operating-limits","transmission-ops"], "comms-data":["comms-coord","transmission-ops"]
  };
  function addDays(d,n){var x=new Date(d);x.setDate(x.getDate()+n);return x;}
  function fmtDate(d){return(d.getMonth()+1)+"/"+d.getDate();}
  function allocateWeeks(total){
    var learning=Math.max(6,total-2),raw=BLUEPRINT.map(function(d){return{id:d.id,val:learning*d.target/examTotal(),base:1};}),left=learning-raw.length;
    raw.forEach(function(r){var extra=Math.floor(Math.max(0,r.val-1));r.base+=extra;left-=extra;r.frac=r.val-Math.floor(r.val);});
    raw.sort(function(a,b){return b.frac-a.frac;});for(var i=0;i<left;i++)raw[i%raw.length].base++;
    var out={};raw.forEach(function(r){out[r.id]=r.base;});return out;
  }
  function buildPlan(weeks){
    var alloc=allocateWeeks(weeks),recs=adaptiveRecommendations(8),weak={};recs.forEach(function(r,i){weak[r.stat.domain]=Math.max(weak[r.stat.domain]||0,8-i);});
    var domains=BLUEPRINT.slice().sort(function(a,b){var wa=(weak[a.id]||0)*2+a.target/examTotal()*10,wb=(weak[b.id]||0)*2+b.target/examTotal()*10;return wb-wa;}),entries=[],wk=1;
    domains.forEach(function(d){var n=alloc[d.id]||1,mods=DOMAIN_MODULES[d.id]||[];for(var i=0;i<n;i++){var topics=d.topics.slice().sort(function(a,b){var sa=topicStats()[a.id],sb=topicStats()[b.id],aa=sa&&sa.accuracy!=null?sa.accuracy:0,ab=sb&&sb.accuracy!=null?sb.accuracy:0;return aa-ab||b.target-a.target;});var topic=topics[i%topics.length];entries.push({week:wk++,domain:d,topic:topic,module:mods[i%Math.max(1,mods.length)],tag:i===0?"Learn + worked examples":"Practice + retrieval"});}});
    entries.push({week:wk++,special:"events",title:"Integrated event simulations",tag:"Cross-module judgment"});
    entries.push({week:wk++,special:"exam",title:"Test-day mode and targeted remediation",tag:"Assemble + verify"});
    return entries.slice(0,weeks);
  }
  function viewPlan(){
    renderChrome("Credential study plan");var st=loadState(),weeks=st.planWeeks||12,start=st.planStart?new Date(st.planStart+"T00:00:00"):null,plan=buildPlan(weeks),cred=credMeta(activeCred()),v=el("div","c-view"),curWeek=null;if(start){var days=Math.floor((Date.now()-start.getTime())/86400000);curWeek=Math.floor(days/7)+1;}
    var html='<div class="eyebrow">'+weeks+'-week · '+esc(cred.designation)+' blueprint</div><h1 class="c-h1">Your credential-specific study plan</h1><p class="c-lead">The schedule allocates learning time by the selected credential’s scored-domain weight, then puts your weakest measured topics first. It updates as your practice results change.</p><div class="p3-plan-controls"><label for="plan-weeks">Plan length</label><select id="plan-weeks"><option value="8"'+(weeks===8?' selected':'')+'>8 weeks</option><option value="12"'+(weeks===12?' selected':'')+'>12 weeks</option><option value="26"'+(weeks===26?' selected':'')+'>26 weeks</option></select><label for="plan-start">Start date</label><input id="plan-start" type="date" value="'+(st.planStart||'')+'">'+(st.planStart?'<button class="c-btn c-btn--ghost" id="plan-clear" type="button">Clear date</button>':'')+'</div><div class="c-plan-grid">';
    plan.forEach(function(p){var isCur=curWeek===p.week,dateStr="";if(start){var d0=addDays(start,(p.week-1)*7),d1=addDays(d0,6);dateStr='<div class="c-week__no" style="color:var(--phosphor-dim)">'+fmtDate(d0)+' – '+fmtDate(d1)+'</div>';}if(p.special){var href=p.special==='events'?'#/events':'#/exam',title=p.title;html+='<a class="c-week '+(p.special==='exam'?'is-exam':'')+'" href="'+href+'"'+(isCur?' style="border-color:var(--phosphor)"':'')+'><div class="c-week__no">WEEK '+p.week+(isCur?' • NOW':'')+'</div>'+dateStr+'<div class="c-week__mod">'+esc(title)+'</div><div class="c-week__tag">'+esc(p.tag)+'</div></a>';}else{var m=moduleById[p.module],href=m?'#/m/'+m.id:'#/practice/d/'+p.domain.id;html+='<a class="c-week" href="'+href+'"'+(isCur?' style="border-color:var(--phosphor)"':'')+'><div class="c-week__no">WEEK '+p.week+(isCur?' • NOW':'')+'</div>'+dateStr+'<div class="c-week__mod">'+esc(p.domain.short)+' · '+esc(p.topic.name)+'</div><div class="c-week__tag">'+esc(p.tag)+' · '+p.domain.target+'/'+examTotal()+' scored</div></a>';}});html+='</div><p class="c-fineprint">This is a pacing scaffold, not an official NERC study prescription. Rebuild it after several practice sessions so the adaptive ordering reflects current evidence.</p>';
    v.innerHTML=html;mountView(v);document.getElementById("plan-weeks").addEventListener("change",function(){var s=loadState();s.planWeeks=Number(this.value);saveState();route();});document.getElementById("plan-start").addEventListener("change",function(){var s=loadState();s.planStart=this.value||null;saveState();route();});var pc=document.getElementById("plan-clear");if(pc)pc.addEventListener("click",function(){var s=loadState();s.planStart=null;saveState();route();});
  }

  /* ---- standards reference (from the One-Stop Shop registry) ------------ */
  function viewStandards(prefill) {
    renderChrome("Standards reference");
    var count = STANDARDS.reduce(function (n, f) { return n + f.standards.length; }, 0);
    var v = el("div", "c-view");
    v.innerHTML =
      '<div class="eyebrow">' + count + ' current standards \u00b7 ' + STANDARDS.length + ' families</div>' +
      '<h1 class="c-h1">Reliability Standards reference</h1>' +
      '<p class="c-lead">The <strong>currently enforceable</strong> versions of the standards the TO exam draws from, pulled ' +
      'from NERC\u2019s One-Stop Shop registry. Study these version numbers \u2014 older revisions are retired. Families marked ' +
      '<span class="c-pill c-pill--core">TO core</span> carry the most weight for this credential.</p>' +
      '<input class="c-glossary-search" id="sfilter" type="search" placeholder="Filter by number, title, or family\u2026" aria-label="Filter standards">' +
      '<div id="slist"></div>' +
      '<p class="c-fineprint">Notes are original plain-language summaries of why each standard matters to a Transmission ' +
      'Operator, not the official Purpose text. Always read the actual standard on nerc.com, and re-pull the One-Stop Shop ' +
      'periodically \u2014 versions change.</p>';
    mountView(v);

    var list = document.getElementById("slist");
    function paint(filter) {
      list.innerHTML = "";
      var f = (filter || "").toLowerCase();
      STANDARDS.forEach(function (fam) {
        var hits = fam.standards.filter(function (s) {
          return !f || s.num.toLowerCase().indexOf(f) >= 0 ||
                 s.title.toLowerCase().indexOf(f) >= 0 ||
                 fam.code.toLowerCase().indexOf(f) >= 0 ||
                 fam.name.toLowerCase().indexOf(f) >= 0 ||
                 (s.note && s.note.toLowerCase().indexOf(f) >= 0);
        });
        if (!hits.length) return;
        var card = el("div", "c-card");
        card.style.marginBottom = "16px";
        var rows = hits.map(function (s) {
          return '<div style="padding:8px 0;border-top:1px solid var(--grid-line-soft)">' +
            '<span class="mono" style="color:var(--phosphor);font-size:.82rem">' + esc(s.num) + '</span> ' +
            '<span style="font-size:.92rem">' + esc(s.title) + '</span>' +
            (s.note ? '<div class="c-secrow__n" style="margin-top:2px">' + esc(s.note) + '</div>' : '') +
          '</div>';
        }).join("");
        card.innerHTML =
          '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
            '<span class="mono" style="font-size:1.1rem;color:var(--readout)">' + esc(fam.code) + '</span>' +
            '<span style="font-size:1rem">' + esc(fam.name) + '</span>' +
            (fam.toCore ? '<span class="c-pill c-pill--core">TO core</span>' : '') +
          '</div>' +
          '<p style="font-size:.88rem;color:var(--readout-dim);margin:8px 0 4px;max-width:68ch">' + esc(fam.blurb) + '</p>' +
          rows;
        list.appendChild(card);
      });
      if (!list.children.length) list.appendChild(el("p", "c-secrow__n", "No standards match that filter."));
    }
    var input = document.getElementById("sfilter");
    input.addEventListener("input", function () { paint(this.value); });
    if (prefill) input.value = prefill;
    paint(prefill || "");
  }

  /* ---- glossary index --------------------------------------------------- */
  /* ---- global search (content + quizzes) -------------------------------- */
  var searchState = { q: "", scope: "all" }, searchIndex = null, searchRerender = null;

  function stripText(s) {
    return String(s || "")
      .replace(/\{\{([a-z0-9\-]+)\|([^}]*)\}\}/gi, "$2")  // {{id|text}} -> text
      .replace(/\{\{([a-z0-9\-]+)\}\}/gi, "$1")           // {{id}} -> id
      .replace(/<[^>]+>/g, " ")                            // strip tags
      .replace(/\s+/g, " ").trim();
  }
  function blockText(b) {
    if (!b || !b.t) return "";
    if (b.t === "p") return stripText(b.html);
    if (b.t === "h") return stripText(b.text);
    if (b.t === "note") return stripText(b.title) + " " + stripText(b.html);
    if (b.t === "list") return (b.items || []).map(stripText).join(" ");
    if (b.t === "scenario") {
      var parts = [stripText(b.title), stripText(b.setup), stripText(b.debrief)];
      (b.steps || []).forEach(function (st) {
        parts.push(stripText(st.stem), (st.options || []).map(stripText).join(" "), stripText(st.explain));
      });
      return parts.join(" ");
    }
    if (b.t === "table") {
      var rows = (b.rows || []).map(function (r) { return (r || []).map(stripText).join(" "); });
      return (b.head ? b.head.map(stripText).join(" ") + " " : "") + rows.join(" ");
    }
    return "";
  }
  function buildSearchIndex() {
    if (searchIndex) return searchIndex;
    var lessons = [], questions = [], references = [];
    CONTENT.forEach(function (m) {
      (m.sections || []).forEach(function (sec) {
        var text = (sec.body || []).map(blockText).filter(Boolean).join("  ");
        lessons.push({ href:"#/m/"+m.id+"/s/"+sec.id, crumb:m.title+" › "+sec.title,
          text:text, lc:(sec.title+"  "+text).toLowerCase() });
      });
    });
    QUESTIONS.forEach(function (q) {
      var blob = [q.stem].concat(q.options || [], [q.explain || ""]).join("  ");
      questions.push({ id:q.id, domain:q.domain, difficulty:q.difficulty, stem:q.stem,
        options:q.options, answer:q.answer, explain:q.explain, lc:blob.toLowerCase() });
    });
    GLOSSARY.forEach(function (g) {
      var text=(g.term+(g.acronym?" ("+g.acronym+")":"")+" "+g.definition).trim();
      references.push({href:"#/glossary?term="+encodeURIComponent(g.id),crumb:"Glossary › "+g.term,text:text,lc:text.toLowerCase()});
    });
    (NERC.standards || []).forEach(function (fam) {
      (fam.standards || []).forEach(function (st) {
        var text=[st.num,st.title,st.note||"",fam.code,fam.name,fam.blurb||""].join(" ");
        references.push({href:"#/standards/"+encodeURIComponent(st.num),crumb:"Standards › "+st.num+" · "+st.title,text:text,lc:text.toLowerCase()});
      });
    });
    searchIndex = { lessons:lessons, questions:questions, references:references };
    return searchIndex;
  }
  /* Tokenize a query into search terms.
     A run inside double quotes becomes ONE phrase term matched as an exact
     contiguous string ("load shed" only matches those words together), while
     bare words remain independent terms combined with AND. The closing quote is
     optional so results stay sensible while the user is still typing the phrase. */
  function searchTerms(q) {
    var out = [], re = /"([^"]*)"?|(\S+)/g, m, t;
    while ((m = re.exec(String(q || ""))) !== null) {
      if (m[0] === "") { re.lastIndex++; continue; }
      if (m[1] !== undefined) {                       // quoted phrase
        t = m[1].toLowerCase().replace(/\s+/g, " ").trim();
        if (t) out.push(t);                           // honor short phrases: explicit intent
      } else {                                        // bare word
        t = m[2].toLowerCase().replace(/"/g, "").trim();
        if (t.length >= 2) out.push(t);
      }
    }
    return out;
  }
  function matchesAll(lc, terms) {
    for (var i = 0; i < terms.length; i++) if (lc.indexOf(terms[i]) < 0) return false;
    return true;
  }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function highlight(raw, terms) {   // escapes match + non-match parts separately (entity-safe)
    if (!terms.length) return esc(raw);
    // longest first so a phrase wins over its own constituent words
    var ordered = terms.slice().sort(function (a, b) { return b.length - a.length; });
    var re = new RegExp("(" + ordered.map(escRe).join("|") + ")", "gi");
    var out = "", last = 0, m;
    while ((m = re.exec(raw)) !== null) {
      out += esc(raw.slice(last, m.index)) + '<span class="c-hit">' + esc(m[0]) + '</span>';
      last = m.index + m[0].length;
      if (m.index === re.lastIndex) re.lastIndex++;
    }
    return out + esc(raw.slice(last));
  }
  function snippet(text, terms) {
    var lc = text.toLowerCase(), pos = -1;
    for (var i = 0; i < terms.length; i++) { var p = lc.indexOf(terms[i]); if (p >= 0 && (pos < 0 || p < pos)) pos = p; }
    if (pos < 0) pos = 0;
    var start = Math.max(0, pos - 60), end = Math.min(text.length, pos + 130);
    var s = (start > 0 ? "\u2026" : "") + text.slice(start, end).trim() + (end < text.length ? "\u2026" : "");
    return highlight(s, terms);
  }

  function viewSearch() {
    renderChrome("Search");
    function seg(id, label) { return '<button class="c-seg__btn" data-scope="' + id + '" role="tab">' + label + '</button>'; }
    var v = el("div", "c-view");
    v.innerHTML =
      '<div class="eyebrow">Search</div>' +
      '<h1 class="c-h1">Search the study console</h1>' +
      '<p class="c-lead">Search lessons, practice questions, glossary definitions, and the standards reference. Separate words use AND logic; quotation marks match an exact phrase.</p>' +
      '<div class="c-seg" id="search-scope" role="tablist" aria-label="Search scope">' +
        seg("all", "All") + seg("lessons", "Lessons") + seg("questions", "Questions") + seg("references", "Glossary & standards") +
      '</div>' +
      '<div id="search-results"></div>';
    mountView(v);

    var scopeWrap = document.getElementById("search-scope");
    function paintScope() {
      scopeWrap.querySelectorAll(".c-seg__btn").forEach(function (b) {
        var on=b.getAttribute("data-scope")===searchState.scope;b.classList.toggle("is-on",on);b.setAttribute("aria-selected",on?"true":"false");b.tabIndex=on?0:-1;
      });
    }
    scopeWrap.querySelectorAll(".c-seg__btn").forEach(function (b) {
      b.addEventListener("click", function () { searchState.scope = b.getAttribute("data-scope"); paintScope(); doResults(); });
    });
    var box = document.getElementById("global-search"); if (box) box.value = searchState.q;
    var results = document.getElementById("search-results");
    function renderLinks(title, records, terms) {
      if(!records.length)return "";var out='<div class="c-sr__head">'+title+' · '+records.length+'</div>';
      records.slice(0,50).forEach(function(r){out+='<a class="c-sr" href="'+r.href+'"><div class="c-sr__crumb">'+esc(r.crumb)+'</div><div class="c-sr__snip">'+snippet(r.text,terms)+'</div></a>';});return out;
    }
    function doResults() {
      var terms = searchTerms(searchState.q);
      if (!terms.length) { results.innerHTML = '<p class="c-fineprint">Type at least two characters to search.</p>'; return; }
      var idx=buildSearchIndex(),html="",total=0;
      if(searchState.scope==="all"||searchState.scope==="lessons"){var a=idx.lessons.filter(function(r){return matchesAll(r.lc,terms);});total+=a.length;html+=renderLinks("Lessons",a,terms);}
      if(searchState.scope==="all"||searchState.scope==="questions"){
        var qr=idx.questions.filter(function(q){return matchesAll(q.lc,terms);});total+=qr.length;
        if(qr.length){html+='<div class="c-sr__head">Practice questions · '+qr.length+'</div>';qr.slice(0,50).forEach(function(q){var opts=(q.options||[]).map(function(o,i){return '<li'+(i===q.answer?' class="is-correct"':'')+'>'+esc(o)+(i===q.answer?' ✓':'')+'</li>';}).join("");var dm=domainById[q.domain];html+='<div class="c-sr c-sr--q"><div class="c-sr__qtop"><span class="c-sr__badge">Q</span><span class="c-sr__meta">'+esc(q.difficulty)+(dm?' · '+esc(dm.short||dm.name):'')+'</span></div><div class="c-sr__stem">'+highlight(q.stem,terms)+'</div><details class="c-sr__ans"><summary>Show answer</summary><ol class="c-sr__opts">'+opts+'</ol><div class="c-sr__explain">'+highlight(q.explain||"",terms)+'</div>'+(q.domain?'<a class="c-tooltip__link" href="#/practice/d/'+q.domain+'">Practice this domain →</a>':'')+'</details></div>';});}
      }
      if(searchState.scope==="all"||searchState.scope==="references"){var r=idx.references.filter(function(x){return matchesAll(x.lc,terms);});total+=r.length;html+=renderLinks("Glossary and standards",r,terms);}
      if(!total)html='<p class="c-fineprint">No matches for “'+esc(searchState.q)+'”.</p>';results.innerHTML=html;
    }
    searchRerender=doResults;paintScope();doResults();if(box){try{box.focus();}catch(e){}}
  }

  /* ---- standard flashcards ---------------------------------------------- */
  var CARD_KEY = "nerc-to-console.cards.v1";
  var cardState = { scope: "mandatory", fam: "all", i: 0, flipped: false, order: null };

  function cardKnown() {
    try { return JSON.parse(localStorage.getItem(CARD_KEY)) || {}; } catch (e) { return {}; }
  }
  function cardMark(num, on) {
    var k = cardKnown();
    if (on) k[num] = 1; else delete k[num];
    try { localStorage.setItem(CARD_KEY, JSON.stringify(k)); } catch (e) {}
  }

  function viewCards() {
    renderChrome("Standard flashcards");
    var SC = (NERC.stdCards || { meta: {}, cards: [] });
    var v = el("div", "c-view");
    var fams = [];
    SC.cards.forEach(function (c) { if (fams.indexOf(c.fam) < 0) fams.push(c.fam); });
    fams.sort();

    var m = SC.meta || {};
    v.innerHTML =
      '<div class="eyebrow">Standards</div>' +
      '<h1 class="c-h1">Standard flashcards</h1>' +
      '<p class="c-lead">Every NERC Reliability Standard that is currently mandatory, one card at a time: the standard number and title on the front, and on the back NERC\u2019s own purpose statement plus a plain-language explanation and an example.</p>' +
      '<div class="c-note c-note--op" style="max-width:860px">' +
        '<div class="c-note__title">Data currency \u2014 check this before you trust the deck</div>' +
        'Built from the NERC <em>One Stop Shop</em> export <b>' + esc(m.sourceFile || "\u2014") + '</b>, saved <b>' + esc(m.exportSaved || "\u2014") + '</b>. ' +
        'The most recent regulatory action appearing in that data is <b>' + esc(m.latestAction || "\u2014") + '</b>. ' +
        'Standards change: re-export the One Stop Shop and rebuild this deck when the data gets stale. ' +
        '<span style="color:var(--readout-dim)">Deck contains ' + ((m.counts && m.counts.mandatory) || 0) + ' mandatory, ' +
        ((m.counts && m.counts.future) || 0) + ' subject to future enforcement, ' +
        ((m.counts && m.counts.pending) || 0) + ' filed and pending.</span>' +
      '</div>' +
      '<div class="c-seg" id="cd-scope" role="tablist" aria-label="Which standards to include" style="margin-top:var(--sp-5)">' +
        '<button class="c-seg__btn" data-scope="mandatory" role="tab">Mandatory only</button>' +
        '<button class="c-seg__btn" data-scope="future" role="tab">+ Future enforcement</button>' +
        '<button class="c-seg__btn" data-scope="all" role="tab">All</button>' +
      '</div>' +
      '<div id="cd-fams" class="c-chips"></div>' +
      '<div id="cd-stage"></div>';
    mountView(v);

    // family chips
    var chips = document.getElementById("cd-fams");
    function chip(id, label) {
      var b = el("button", "c-chip", label);
      b.setAttribute("data-fam", id);
      b.addEventListener("click", function () { cardState.fam = id; cardState.i = 0; cardState.order = null; paintCards(); });
      chips.appendChild(b);
    }
    chip("all", "All families");
    fams.forEach(function (f) { chip(f, f); });

    document.getElementById("cd-scope").querySelectorAll(".c-seg__btn").forEach(function (b) {
      b.addEventListener("click", function () {
        cardState.scope = b.getAttribute("data-scope");
        cardState.i = 0; cardState.order = null; paintCards();
      });
    });
    paintCards();
  }

  function cardDeck() {
    var SC = (NERC.stdCards || { cards: [] });
    var okStatus = cardState.scope === "mandatory" ? ["mandatory"]
      : (cardState.scope === "future" ? ["mandatory", "future"] : ["mandatory", "future", "pending"]);
    var d = SC.cards.filter(function (c) {
      return okStatus.indexOf(c.status) >= 0 && (cardState.fam === "all" || c.fam === cardState.fam);
    });
    if (cardState.order) {
      var byNum = {}; d.forEach(function (c) { byNum[c.num] = c; });
      var out = [];
      cardState.order.forEach(function (n) { if (byNum[n]) out.push(byNum[n]); });
      d.forEach(function (c) { if (cardState.order.indexOf(c.num) < 0) out.push(c); });
      d = out;
    }
    return d;
  }

  function paintCards() {
    var deck = cardDeck(), stage = document.getElementById("cd-stage");
    if (!stage) return;
    document.getElementById("cd-scope").querySelectorAll(".c-seg__btn").forEach(function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-scope") === cardState.scope);
    });
    document.getElementById("cd-fams").querySelectorAll(".c-chip").forEach(function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-fam") === cardState.fam);
    });

    if (!deck.length) { stage.innerHTML = '<p class="c-fineprint">No standards match that filter.</p>'; return; }
    if (cardState.i >= deck.length) cardState.i = 0;
    if (cardState.i < 0) cardState.i = deck.length - 1;

    var c = deck[cardState.i], known = cardKnown(), isKnown = !!known[c.num];
    var STATUS = { mandatory: ["Mandatory", "var(--normal)"],
                   future: ["Subject to future enforcement", "var(--alert)"],
                   pending: ["Filed and pending approval", "var(--readout-dim)"] };
    var st = STATUS[c.status] || STATUS.mandatory;
    var knownCount = deck.filter(function (x) { return known[x.num]; }).length;

    stage.innerHTML =
      '<div class="c-cardbar">' +
        '<span>' + (cardState.i + 1) + ' of ' + deck.length + '</span>' +
        '<span>' + knownCount + ' marked known</span>' +
      '</div>' +
      '<div class="c-card' + (cardState.flipped ? ' is-flipped' : '') + '" id="cd-card" tabindex="0" role="button" ' +
           'aria-label="Flashcard. Activate to ' + (cardState.flipped ? 'hide' : 'reveal') + ' the explanation.">' +
        '<div class="c-card__meta"><span class="c-card__fam">' + esc(c.fam) + '</span>' +
          '<span style="color:' + st[1] + '">' + st[0] + '</span>' +
          (c.effective ? '<span style="color:var(--readout-faint)">eff. ' + esc(c.effective) + '</span>' : '') +
        '</div>' +
        '<div class="c-card__num">' + esc(c.num) + '</div>' +
        '<div class="c-card__title">' + esc(c.title) + '</div>' +
        (cardState.flipped
          ? '<div class="c-card__back">' +
              '<div class="c-card__lab">NERC purpose</div><p>' + esc(c.purpose) + '</p>' +
              '<div class="c-card__lab">In plain terms</div><p>' + esc(c.plain) + '</p>' +
              '<div class="c-card__lab">For example</div><p>' + esc(c.example) + '</p>' +
            '</div>'
          : '<div class="c-card__hint">Click, tap, or press Enter to reveal</div>') +
      '</div>' +
      '<div class="c-cardctl">' +
        '<button class="c-btn" id="cd-prev">&larr; Previous</button>' +
        '<button class="c-btn c-btn--primary" id="cd-flip">' + (cardState.flipped ? "Hide" : "Reveal") + '</button>' +
        '<button class="c-btn" id="cd-next">Next &rarr;</button>' +
        '<button class="c-btn c-btn--ghost" id="cd-shuffle">Shuffle</button>' +
        '<button class="c-btn' + (isKnown ? ' c-btn--primary' : '') + '" id="cd-known">' +
          (isKnown ? "\u2713 Known" : "Mark known") + '</button>' +
      '</div>';

    function go(n) { cardState.i = n; cardState.flipped = false; paintCards(); }
    var card = document.getElementById("cd-card");
    function flip() { cardState.flipped = !cardState.flipped; paintCards(); }
    card.addEventListener("click", flip);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
    });
    document.getElementById("cd-flip").addEventListener("click", function (e) { e.stopPropagation(); flip(); });
    document.getElementById("cd-prev").addEventListener("click", function () { go(cardState.i - 1); });
    document.getElementById("cd-next").addEventListener("click", function () { go(cardState.i + 1); });
    document.getElementById("cd-shuffle").addEventListener("click", function () {
      var d = cardDeck().map(function (x) { return x.num; });
      for (var i = d.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = d[i]; d[i] = d[j]; d[j] = t; }
      cardState.order = d; go(0);
    });
    document.getElementById("cd-known").addEventListener("click", function () {
      cardMark(c.num, !isKnown); paintCards();
    });
  }

  function viewGlossary() {
    renderChrome("Glossary");
    var v=el("div","c-view");
    var letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    v.innerHTML='<div class="eyebrow">'+GLOSSARY.length+' terms</div><h1 class="c-h1">Glossary & acronyms</h1><p class="c-lead">Search definitions or jump to a letter. Entries are grouped for faster scanning and every lesson link meets the minimum touch-target size.</p><div class="p3-glossary-tools"><input class="c-glossary-search" id="gsearch" type="search" placeholder="Filter terms, acronyms, or definitions…" aria-label="Filter glossary"><div class="p3-az" id="gletters" aria-label="Glossary letter navigation"></div></div><div class="c-secrow__n" id="gcount" aria-live="polite"></div><div id="glist"></div>';
    mountView(v);
    var jump=document.getElementById("gletters");letters.forEach(function(letter){var b=document.createElement("button");b.type="button";b.className="p3-az__btn";b.textContent=letter;b.setAttribute("aria-label","Jump to glossary terms beginning with "+letter);b.addEventListener("click",function(){var h=document.getElementById("g-"+letter);if(h){h.scrollIntoView({behavior:document.documentElement.getAttribute("data-motion")==="reduce"?"auto":"smooth",block:"start"});h.focus();}});jump.appendChild(b);});
    var list=document.getElementById("glist"),count=document.getElementById("gcount");
    function paint(filter){list.innerHTML="";var f=(filter||"").toLowerCase(),shown=GLOSSARY.slice().sort(function(a,b){return a.term.localeCompare(b.term);}).filter(function(t){return !f||t.term.toLowerCase().indexOf(f)>=0||(t.acronym&&t.acronym.toLowerCase().indexOf(f)>=0)||t.definition.toLowerCase().indexOf(f)>=0;});count.textContent=shown.length+" term"+(shown.length===1?"":"s")+" shown";var groups={};shown.forEach(function(t){var l=(t.term.charAt(0)||"#").toUpperCase();if(!/[A-Z]/.test(l))l="#";(groups[l]||(groups[l]=[])).push(t);});Object.keys(groups).sort().forEach(function(letter){var sec=document.createElement("section");sec.className="p3-gsection";var h=document.createElement("h2");h.className="p3-gsection__head";h.id="g-"+letter;h.tabIndex=-1;h.textContent=letter;sec.appendChild(h);groups[letter].forEach(function(t){var row=el("article","c-gitem");row.innerHTML='<div><span class="c-gitem__term">'+esc(t.term)+'</span>'+(t.acronym?'<span class="c-gitem__acr">'+esc(t.acronym)+'</span>':'')+'</div><div class="c-gitem__def">'+esc(t.definition)+'</div>'+(t.moduleRef&&sectionById[t.moduleRef]?'<a class="c-gitem__link" href="#/m/'+sectionById[t.moduleRef].module.id+'/s/'+t.moduleRef+'">Where this is taught →</a>':'');sec.appendChild(row);});list.appendChild(sec);});if(!shown.length)list.appendChild(el("p","c-secrow__n","No terms match that filter."));}
    document.getElementById("gsearch").addEventListener("input",function(){paint(this.value);});
    var query=location.hash.split("?")[1]||"",match=query.match(/(?:^|&)term=([^&]+)/);if(match){var id=decodeURIComponent(match[1]),term=gById[id];if(term){document.getElementById("gsearch").value=term.term;paint(term.term);return;}}
    paint("");
  }

  /* ---- review mode (SME flagging + simple question edits) -------------- */
  var REVIEW_KEY = "nerc-to-console.review.v1", reviewMem = null;
  function loadReview() { if (reviewMem) return reviewMem; try { var r = window.localStorage.getItem(REVIEW_KEY); reviewMem = r ? JSON.parse(r) : { enabled: false, entries: {} }; } catch (e) { reviewMem = { enabled: false, entries: {} }; } return reviewMem; }
  function saveReview(o) { reviewMem = o; try { window.localStorage.setItem(REVIEW_KEY, JSON.stringify(o)); } catch (e) {} }
  function reviewOn() { return !!loadReview().enabled; }

  function rvField(label, val, rows) {
    var wrap = el("div"); wrap.style.marginBottom = "8px";
    wrap.appendChild(el("div", "c-secrow__n", label));
    var input = rows ? document.createElement("textarea") : document.createElement("input");
    if (rows) input.rows = rows; else input.type = "text";
    input.value = val == null ? "" : val;
    input.style.cssText = "width:100%;max-width:640px;font-family:var(--font-sans);font-size:.9rem;background:var(--console-panel);color:var(--readout);border:1px solid var(--grid-line);border-radius:6px;padding:6px 8px";
    wrap.appendChild(input);
    return { wrap: wrap, input: input };
  }

  function reviewQuestionControls(q) {
    var rv = loadReview(), entry = rv.entries[q.id] || {}, ed = entry.edits || {};
    var box = el("div"); box.style.cssText = "margin-top:16px;border:1px dashed var(--phosphor-dim);border-radius:8px;padding:12px 14px;background:rgba(86,194,230,.04)";
    var head = el("div"); head.style.cssText = "display:flex;align-items:center;gap:10px;flex-wrap:wrap";
    head.innerHTML = '<span class="mono" style="font-size:.72rem;color:var(--phosphor)">\u2691 REVIEW</span>' + (rv.entries[q.id] ? '<span class="c-pill" style="color:var(--alert);border-color:var(--alert)">' + ((entry.edits && Object.keys(entry.edits).length) ? 'edited' : 'flagged') + '</span>' : '');
    var toggle = el("button", "c-btn c-btn--ghost", rv.entries[q.id] ? "Edit flag" : "Flag / edit"); toggle.style.marginLeft = "auto"; head.appendChild(toggle);
    box.appendChild(head);
    var panel = el("div"); panel.style.cssText = "display:none;margin-top:12px";
    toggle.addEventListener("click", function () { panel.style.display = (panel.style.display === "none") ? "block" : "none"; });

    var comment = rvField("Issue / comment (note anything, simple or complex):", entry.comment || "", 2);
    panel.appendChild(comment.wrap);

    var ansWrap = el("div"); ansWrap.style.marginBottom = "8px";
    ansWrap.appendChild(el("div", "c-secrow__n", "Correct answer:"));
    var letters = ["A", "B", "C", "D", "E", "F"], radios = [], curAns = (ed.answer != null) ? ed.answer : q.answer;
    q.options.forEach(function (_, oi) {
      var lbl = document.createElement("label"); lbl.style.cssText = "margin-right:12px;font-family:var(--font-mono);font-size:.8rem;color:var(--readout)";
      var r = document.createElement("input"); r.type = "radio"; r.name = "rv-ans-" + q.id; r.value = oi; if (oi === curAns) r.checked = true;
      radios.push(r); lbl.appendChild(r); lbl.appendChild(document.createTextNode(" " + letters[oi])); ansWrap.appendChild(lbl);
    });
    panel.appendChild(ansWrap);

    var stem = rvField("Stem:", ed.stem != null ? ed.stem : q.stem, 2); panel.appendChild(stem.wrap);
    var optInputs = [];
    q.options.forEach(function (opt, oi) { var f = rvField("Option " + letters[oi] + ":", (ed.options && ed.options[oi] != null) ? ed.options[oi] : opt, 1); optInputs.push(f.input); panel.appendChild(f.wrap); });
    var expl = rvField("Explanation:", ed.explain != null ? ed.explain : q.explain, 3); panel.appendChild(expl.wrap);

    var status = el("div", "c-secrow__n"); status.style.marginTop = "4px";
    var actions = el("div"); actions.style.cssText = "display:flex;gap:8px;margin-top:8px;flex-wrap:wrap";
    var saveBtn = el("button", "c-btn c-btn--primary", "Save to review inbox");
    var rmBtn = el("button", "c-btn c-btn--ghost", "Remove flag");
    actions.appendChild(saveBtn); actions.appendChild(rmBtn); panel.appendChild(actions); panel.appendChild(status);

    saveBtn.addEventListener("click", function () {
      var edits = {}, chosen = Number(radios.filter(function (r) { return r.checked; })[0].value);
      if (chosen !== q.answer) edits.answer = chosen;
      if (stem.input.value.trim() !== q.stem) edits.stem = stem.input.value.trim();
      var newOpts = optInputs.map(function (i) { return i.value; }), optChanged = false;
      newOpts.forEach(function (v, oi) { if (v !== q.options[oi]) optChanged = true; });
      if (optChanged) edits.options = newOpts;
      if (expl.input.value.trim() !== q.explain) edits.explain = expl.input.value.trim();
      var c = comment.input.value.trim(), rv2 = loadReview();
      if (!c && Object.keys(edits).length === 0) { delete rv2.entries[q.id]; saveReview(rv2); status.textContent = "Nothing to save (no comment or edits)."; return; }
      rv2.entries[q.id] = { type: "q", comment: c, edits: edits, ref: { module: q.module, section: q.section, domain: q.domain, topic: q.topic } };
      saveReview(rv2); status.textContent = "Saved \u2713  (see it in Review mode \u2192 inbox)";
    });
    rmBtn.addEventListener("click", function () { var rv2 = loadReview(); delete rv2.entries[q.id]; saveReview(rv2); status.textContent = "Removed."; });
    box.appendChild(panel);
    return box;
  }

  function reviewSectionControls(section, moduleId) {
    var rv = loadReview(), entry = rv.entries[section.id] || {};
    var box = el("div"); box.style.cssText = "margin-top:20px;border:1px dashed var(--phosphor-dim);border-radius:8px;padding:12px 14px;background:rgba(86,194,230,.04);max-width:var(--measure)";
    box.appendChild(el("div", null, '<span class="mono" style="font-size:.72rem;color:var(--phosphor)">\u2691 REVIEW SECTION</span>' + (rv.entries[section.id] ? ' <span class="c-pill" style="color:var(--alert);border-color:var(--alert)">flagged</span>' : '')));
    var c = rvField("Flag this section for rework (rich content \u2014 handed back for editing):", entry.comment || "", 2);
    box.appendChild(c.wrap);
    var status = el("div", "c-secrow__n");
    var actions = el("div"); actions.style.cssText = "display:flex;gap:8px;margin-top:4px";
    var save = el("button", "c-btn c-btn--primary", "Save flag"), rm = el("button", "c-btn c-btn--ghost", "Remove");
    actions.appendChild(save); actions.appendChild(rm); box.appendChild(actions); box.appendChild(status);
    save.addEventListener("click", function () { var rv2 = loadReview(), v = c.input.value.trim(); if (!v) { delete rv2.entries[section.id]; saveReview(rv2); status.textContent = "Nothing to save."; return; } rv2.entries[section.id] = { type: "s", comment: v, ref: { module: moduleId, section: section.id, title: section.title } }; saveReview(rv2); status.textContent = "Saved to Review inbox."; });
    rm.addEventListener("click", function () { var rv2 = loadReview(); delete rv2.entries[section.id]; saveReview(rv2); status.textContent = "Removed."; });
    return box;
  }

  function reviewEntriesList() { var rv = loadReview(); return Object.keys(rv.entries).map(function (id) { var e = rv.entries[id]; e._id = id; return e; }); }

  function buildPunchList() {
    var list = reviewEntriesList(), lines = [];
    lines.push("NERC System Operator Study Console \u2014 Review punch-list");
    lines.push("Exported " + new Date().toLocaleString() + " \u00b7 " + list.length + " item(s)");
    lines.push("");
    list.forEach(function (e, n) {
      if (e.type === "q") {
        var q = qById[e._id] || {};
        lines.push("[" + (n + 1) + "] QUESTION " + e._id + "  (domain " + (e.ref && e.ref.domain) + "/" + (e.ref && e.ref.topic) + ", module " + (e.ref && e.ref.module) + " \u2192 " + (e.ref && e.ref.section) + ")");
        if (e.comment) lines.push('     comment: "' + e.comment + '"');
        if (e.edits && Object.keys(e.edits).length) {
          lines.push("     proposed edits:");
          if (e.edits.answer != null) lines.push("       - answer index: " + q.answer + " -> " + e.edits.answer);
          if (e.edits.stem != null) lines.push("       - stem -> " + e.edits.stem);
          if (e.edits.options) e.edits.options.forEach(function (o, oi) { if (q.options && o !== q.options[oi]) lines.push("       - option[" + oi + "] -> " + o); });
          if (e.edits.explain != null) lines.push("       - explanation -> " + e.edits.explain);
        }
      } else {
        lines.push("[" + (n + 1) + "] SECTION " + e._id + "  (" + ((e.ref && e.ref.title) || "") + ", module " + (e.ref && e.ref.module) + ")");
        if (e.comment) lines.push('     comment: "' + e.comment + '"');
      }
      lines.push("");
    });
    lines.push("--- machine-readable (JSON, for reapplying) ---");
    lines.push(JSON.stringify(loadReview().entries, null, 2));
    return lines.join("\n");
  }

  function buildCorrectedQuestions() {
    var rv = loadReview();
    var arr = QUESTIONS.map(function (q) {
      var e = rv.entries[q.id];
      if (!e || e.type !== "q" || !e.edits) return q;
      var c = {}; for (var k in q) c[k] = q[k];
      if (e.edits.answer != null) c.answer = e.edits.answer;
      if (e.edits.stem != null) c.stem = e.edits.stem;
      if (e.edits.options) c.options = e.edits.options;
      if (e.edits.explain != null) c.explain = e.edits.explain;
      return c;
    });
    return "/* data.questions.js \u2014 regenerated by Review mode " + new Date().toISOString() + " */\n" +
      "window.NERC = window.NERC || {};\nwindow.NERC.questions = " + JSON.stringify(arr, null, 2) + ";\n";
  }

  function downloadText(name, text) {
    try { var b = new Blob([text], { type: "text/plain" }), u = URL.createObjectURL(b), a = document.createElement("a"); a.href = u; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(u); }, 1000); } catch (e) {}
  }

  function viewReview() {
    renderChrome("Review mode");
    var rv = loadReview(), list = reviewEntriesList();
    var qEdits = list.filter(function (e) { return e.type === "q" && e.edits && Object.keys(e.edits).length; }).length;
    var v = el("div", "c-view");
    var html =
      '<div class="eyebrow">SME review</div>' +
      '<h1 class="c-h1">Review mode</h1>' +
      '<p class="c-lead">Turn this on, then walk the material. Every practice question and lesson section grows a flag panel: fix simple question fields inline, or leave a comment on anything that needs rework. Nothing here changes the live content \u2014 it collects notes you export below.</p>' +
      '<div class="c-card" style="margin:16px 0;display:flex;align-items:center;gap:14px;flex-wrap:wrap">' +
        '<button class="c-btn ' + (rv.enabled ? "c-btn--primary" : "") + '" id="rv-toggle" type="button">' + (rv.enabled ? "\u2713 Review mode ON" : "Turn review mode ON") + '</button>' +
        '<span class="c-secrow__n">' + (rv.enabled ? "Flag panels are showing in practice questions and lesson sections." : "Flag panels stay hidden until you turn this on.") + '</span>' +
      '</div>' +
      '<h2 class="c-h2">Review inbox (' + list.length + ')</h2>';
    if (!list.length) { html += '<p class="c-secrow__n">No flags yet. Turn on review mode, then flag questions in Practice and sections in the lessons.</p>'; }
    else {
      html += '<div class="c-seclist">';
      list.forEach(function (e) {
        var label = e.type === "q" ? ("Question " + e._id) : ("Section " + e._id);
        var sub = e.type === "q" ? ((e.edits && Object.keys(e.edits).length ? ("edits: " + Object.keys(e.edits).join(", ") + "   ") : "") + (e.comment ? ('\u201c' + e.comment + '\u201d') : "")) : (e.comment ? ('\u201c' + e.comment + '\u201d') : "");
        var href = (e.ref && e.ref.module) ? ("#/m/" + e.ref.module + "/s/" + (e.ref.section || e._id)) : "#/";
        html += '<a class="c-secrow" href="' + href + '"><span class="c-secrow__t">' + esc(label) + '<br><span class="c-secrow__n">' + esc(sub) + '</span></span><span class="c-secrow__n">open \u2192</span></a>';
      });
      html += '</div>';
    }
    html += '<h2 class="c-h2">Export</h2>' +
      '<p class="c-lead" style="font-size:1rem">Send the <strong>punch-list</strong> back for anything complex. For simple question fixes you made inline, download the <strong>corrected questions file</strong> and drop it into <span class="mono">js/</span>, replacing the old one.</p>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 14px">' +
        '<button class="c-btn c-btn--primary" id="rv-dl-punch" type="button">Download punch-list (.txt)</button>' +
        '<button class="c-btn" id="rv-copy-punch" type="button">Show punch-list to copy</button>' +
        (qEdits ? '<button class="c-btn" id="rv-dl-q" type="button">Download corrected data.questions.js (' + qEdits + ' edited)</button>' : '') +
        '<button class="c-btn c-btn--ghost" id="rv-clear" type="button">Clear all flags</button>' +
      '</div>' +
      '<textarea id="rv-out" readonly style="display:none;width:100%;max-width:760px;height:220px;font-family:var(--font-mono);font-size:.72rem;background:var(--console-panel);color:var(--readout);border:1px solid var(--grid-line);border-radius:6px;padding:8px"></textarea>' +
      '<p class="c-fineprint">The regenerated questions file is valid but reformatted (standard JSON layout, hand-comments dropped) \u2014 it runs identically. For structural changes, new interactives, or section content, use the punch-list so those come back to me and stay covered by the smoke tests.</p>';
    v.innerHTML = html; mountView(v);

    document.getElementById("rv-toggle").addEventListener("click", function () { var r = loadReview(); r.enabled = !r.enabled; saveReview(r); route(); });
    var out = document.getElementById("rv-out");
    var dp = document.getElementById("rv-dl-punch"); if (dp) dp.addEventListener("click", function () { downloadText("nerc-review-punchlist.txt", buildPunchList()); });
    var cp = document.getElementById("rv-copy-punch"); if (cp) cp.addEventListener("click", function () { out.style.display = "block"; out.value = buildPunchList(); out.focus(); out.select(); });
    var dq = document.getElementById("rv-dl-q"); if (dq) dq.addEventListener("click", function () { downloadText("data.questions.js", buildCorrectedQuestions()); });
    document.getElementById("rv-clear").addEventListener("click", function () { if (window.confirm("Clear all review flags and edits? This cannot be undone.")) { saveReview({ enabled: loadReview().enabled, entries: {} }); route(); } });
  }

  /* ---- Phase 3 adaptive practice ---------------------------------------- */
  function viewAdaptive(){
    renderChrome("Adaptive practice");var recs=adaptiveRecommendations(6),set=adaptiveQuestionSet(20),v=el("div","c-view"),reasons={};set.forEach(function(q){var m=misconceptionFor(q);reasons[q.id]=m?m.label:"Credential priority";});
    var html='<div class="eyebrow">Personalized remediation · '+esc((credMeta(activeCred())||{}).designation)+'</div><h1 class="c-h1">Adaptive practice</h1><p class="c-lead">This local recommendation engine prioritizes your most recent misses, low-accuracy subtopics, unattempted high-weight areas, and application or analysis questions. It changes as you answer.</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin:14px 0"><button class="c-btn c-btn--primary" id="adaptive-start" type="button">Start '+set.length+'-item adaptive set</button><a class="c-btn" href="#/plan">Update study plan</a></div><h2 class="c-h2">Highest-priority concepts</h2><div class="c-seclist">';
    recs.forEach(function(r){var a=r.stat.accuracy,sub=a==null?'not attempted':r.stat.correct+'/'+r.stat.attempted+' correct · '+a+'%';html+='<div class="c-secrow"><span class="c-secrow__t">'+esc(r.meta.label)+'<br><span class="c-secrow__n">'+esc(r.meta.description)+' · '+sub+'</span></span><a class="c-btn c-btn--ghost" href="#/practice/t/'+r.topic+'">Drill</a></div>';});html+='</div><p class="c-fineprint">Recommendations are rule-based and transparent. They are not psychometric estimates and stay in this browser unless you export them.</p>';
    v.innerHTML=html;mountView(v);document.getElementById("adaptive-start").addEventListener("click",function(){quizState={list:set,i:0,key:"adaptive:"+Date.now(),orders:{},reasons:reasons};location.hash="#/practice/adaptive-run";renderQuestion();});
  }

  function eventById(id){for(var i=0;i<EVENTS.length;i++)if(EVENTS[i].id===id)return EVENTS[i];return null;}
  function newEventState(ev){var s={step:ev.startStep,metrics:Object.assign({},ev.start),answers:[],score:0,done:false,startedAt:Date.now()};var st=loadState();st.events[ev.id]=s;saveState();recordActivity("event-start",{event:ev.id});return s;}
  function eventMetricLabel(k){return k==="system"?"System security":(k==="awareness"?"Situational awareness":"Coordination");}
  function clamp(v){return Math.max(0,Math.min(100,v));}
  function viewEvents(){renderChrome("Integrated events");var st=loadState(),v=el("div","c-view"),html='<div class="eyebrow">Cross-module operator judgment</div><h1 class="c-h1">Integrated operating events</h1><p class="c-lead">Each event carries your decisions forward. Strong choices preserve system security, situational awareness, and coordination; weak choices create recovery branches and reduce the margin available later.</p><div class="p3-event-list">';EVENTS.forEach(function(ev){var p=st.events[ev.id],status=p?(p.done?'completed':'in progress'):'not started';html+='<article class="c-card p3-event-card"><div><span class="c-pill">'+esc(ev.duration)+'</span> <span class="c-pill c-pill--analysis">'+esc(ev.credentialFit.join(' · '))+'</span></div><h2 class="c-h2">'+esc(ev.title)+'</h2><p>'+esc(ev.summary)+'</p><div class="c-secrow__n">Status: '+status+(p&&p.done?' · score '+p.score:'')+'</div><a class="c-btn c-btn--primary" href="#/events/'+ev.id+'">'+(p&&!p.done?'Resume event':(p&&p.done?'Review / restart':'Begin event'))+' →</a></article>';});html+='</div><p class="c-fineprint">The events are simplified learning models. Entity procedures, operating authority, ratings, timing, and tool behavior must be verified locally.</p>';v.innerHTML=html;mountView(v);}
  function viewEvent(id){
    var ev=eventById(id);if(!ev)return viewEvents();renderChrome("Integrated event · "+esc(ev.title));var st=loadState(),es=st.events[id];if(!es)es=newEventState(ev);var v=el("div","c-view");
    if(es.done){var avg=Math.round((es.metrics.system+es.metrics.awareness+es.metrics.coordination)/3),html='<div class="eyebrow">Event debrief</div><h1 class="c-h1">'+esc(ev.title)+'</h1><div class="c-card p3-event-result"><div class="p3-score" style="color:'+(avg>=75?'var(--normal)':avg>=60?'var(--alert)':'var(--emergency)')+'">'+avg+'<span>/100</span></div><div><strong>Integrated judgment index</strong><p>'+esc(ev.debrief)+'</p></div></div><div class="p3-metrics">';Object.keys(es.metrics).forEach(function(k){html+='<div><span>'+eventMetricLabel(k)+'</span><strong>'+Math.round(es.metrics[k])+'</strong><span class="p3-meter"><span style="width:'+es.metrics[k]+'%"></span></span></div>';});html+='</div><h2 class="c-h2">Review links</h2><div class="c-seclist">';ev.reviewSections.forEach(function(sid){var rec=sectionById[sid];if(rec)html+=secLink('#/m/'+rec.module.id+'/s/'+sid,rec.section.title,rec.module.title);});html+='</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px"><button class="c-btn c-btn--primary" id="event-restart" type="button">Restart event</button><a class="c-btn" href="#/events">All events</a></div>';v.innerHTML=html;mountView(v);document.getElementById("event-restart").addEventListener("click",function(){var s=loadState();delete s.events[id];saveState();route();});return;}
    var step=null;for(var i=0;i<ev.steps.length;i++)if(ev.steps[i].id===es.step)step=ev.steps[i];if(!step){es.done=true;saveState();return route();}
    var html='<div class="eyebrow">'+esc(step.phase)+'</div><h1 class="c-h1">'+esc(ev.title)+'</h1><div class="p3-metrics">';Object.keys(es.metrics).forEach(function(k){html+='<div><span>'+eventMetricLabel(k)+'</span><strong>'+Math.round(es.metrics[k])+'</strong><span class="p3-meter"><span style="width:'+es.metrics[k]+'%"></span></span></div>';});html+='</div><div class="c-scenario"><div class="c-scenario__steplabel">Decision '+(es.answers.length+1)+'</div><div class="c-q__stem" id="event-prompt">'+esc(step.prompt)+'</div><div class="c-opts" role="radiogroup" aria-labelledby="event-prompt">';step.options.forEach(function(o,oi){html+='<button class="c-opt" type="button" data-event-option="'+oi+'"><span class="c-opt__key">'+String.fromCharCode(65+oi)+'</span><span>'+esc(o.text)+'</span></button>';});html+='</div><div id="event-feedback"></div></div><div style="margin-top:16px"><button class="c-btn c-btn--ghost" id="event-reset" type="button">Restart event</button></div>';v.innerHTML=html;mountView(v);
    v.querySelectorAll('[data-event-option]').forEach(function(b){b.addEventListener('click',function(){var oi=Number(this.getAttribute('data-event-option')),opt=step.options[oi];v.querySelectorAll('[data-event-option]').forEach(function(x){x.disabled=true;});Object.keys(opt.effects||{}).forEach(function(k){es.metrics[k]=clamp((es.metrics[k]||0)+opt.effects[k]);});es.score+=(opt.score||0);es.answers.push({step:step.id,choice:oi,at:Date.now()});var next=opt.next||'complete';if(next==='complete'){es.done=true;es.completedAt=Date.now();}else es.step=next;saveState();recordActivity('event-decision',{event:id,step:step.id,score:opt.score||0});var fb=document.getElementById('event-feedback');fb.className='c-explain';fb.innerHTML='<div class="c-explain__head '+((opt.score||0)>=3?'is-correct':'is-wrong')+'">'+((opt.score||0)>=3?'Strong operator action':'Consequence recorded')+'</div><p>'+esc(opt.feedback)+'</p><button class="c-btn c-btn--primary" id="event-next" type="button">'+(es.done?'Open debrief':'Continue event')+' →</button>';announce(opt.feedback);document.getElementById('event-next').addEventListener('click',route);});});document.getElementById('event-reset').addEventListener('click',function(){if(window.confirm('Restart this event and clear its current decisions?')){var s=loadState();delete s.events[id];saveState();route();}});
  }

  function exportBundle(){var ex=loadExam(),rv=loadReview();return {schema:'nerc-study-console-progress',schemaVersion:1,exportedAt:new Date().toISOString(),release:(NERC.release||{}).version||null,credential:activeCred(),state:loadState(),exam:ex,review:rv};}
  function downloadJson(name,obj){var b=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u);},1000);}
  function importBundle(obj){if(!obj||obj.schema!=='nerc-study-console-progress'||!obj.state)throw new Error('This is not a recognized study-console progress file.');mem=normalizeState(obj.state);saveState();if(obj.credential&&credHasBlueprint(obj.credential))setCred(obj.credential);if(obj.exam)saveExam(obj.exam);else clearExam();if(obj.review&&obj.review.entries)saveReview(obj.review);applyPreferences();}
  function viewData(){
    renderChrome("Data & accessibility");var st=loadState(),p=st.prefs,v=el("div","c-view"),html='<div class="eyebrow">Learner-controlled settings</div><h1 class="c-h1">Data and accessibility</h1><p class="c-lead">Progress is stored locally in this browser. No learning activity is transmitted by this package. Export a portable JSON file before changing browsers or clearing site data.</p><h2 class="c-h2">Progress portability</h2><div class="c-card"><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="c-btn c-btn--primary" id="data-export" type="button">Export progress JSON</button><label class="c-btn" for="data-import">Import progress JSON</label><input class="c-sr-only" id="data-import" type="file" accept="application/json,.json"><button class="c-btn c-btn--ghost" id="data-reset" type="button">Reset learning progress</button></div><div class="c-secrow__n" id="data-status" style="margin-top:10px"></div></div><h2 class="c-h2">Accessibility preferences</h2><div class="c-card p3-settings"><label for="pref-contrast">Contrast</label><select id="pref-contrast"><option value="default"'+(p.contrast==='default'?' selected':'')+'>Default</option><option value="high"'+(p.contrast==='high'?' selected':'')+'>High contrast</option></select><label for="pref-text">Text size</label><select id="pref-text"><option value="100"'+(p.textScale==='100'?' selected':'')+'>100%</option><option value="115"'+(p.textScale==='115'?' selected':'')+'>115%</option><option value="130"'+(p.textScale==='130'?' selected':'')+'>130%</option></select><label for="pref-motion">Motion</label><select id="pref-motion"><option value="system"'+(p.motion==='system'?' selected':'')+'>Follow system</option><option value="reduce"'+(p.motion==='reduce'?' selected':'')+'>Reduce motion</option></select></div><h2 class="c-h2">Optional local analytics</h2><div class="c-card"><label class="p3-check"><input id="analytics-toggle" type="checkbox"'+(st.analyticsEnabled?' checked':'')+'> Keep a local activity timeline for progress charts</label><p class="c-secrow__n">Opt-in only. The log stays in localStorage, is included in your export, and is capped at 500 events. Turning it off stops new logging; use the button below to erase the existing timeline.</p><button class="c-btn c-btn--ghost" id="analytics-clear" type="button">Clear local activity timeline</button></div><h2 class="c-h2">Offline iPad app</h2><div class="c-card pwa-settings"><div class="pwa-state-row"><span class="pwa-dot" id="pwa-detail-dot" aria-hidden="true"></span><strong id="pwa-detail-status">Checking offline cache…</strong></div><p class="c-secrow__n" id="pwa-detail-text">This GitHub Pages edition can cache the complete study console for offline use. External video links still require internet access.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="c-btn" id="pwa-check-update" type="button">Check for updates</button><button class="c-btn c-btn--primary" id="pwa-apply-update" type="button" hidden>Install available update</button></div><p class="c-fineprint">On iPad, open the published site in Safari, wait until the status says <strong>Offline ready</strong>, then use Share → Add to Home Screen and turn on Open as Web App. Test once in Airplane Mode before relying on it away from Wi‑Fi.</p></div><h2 class="c-h2">Keyboard help</h2><div class="c-note c-note--op"><div class="c-note__title">Exam shortcuts</div>Use number keys 1–4 to choose a displayed option, Left and Right Arrow to move between items, and F to flag the current item. All functions remain available as labeled buttons.</div><p class="c-fineprint">Formal conformance still requires testing with the organization’s supported browser, screen reader, zoom, and device matrix. These controls are usability aids, not a certification claim.</p>';
    v.innerHTML=html;mountView(v);document.getElementById('data-export').addEventListener('click',function(){downloadJson('nerc-study-console-progress-'+new Date().toISOString().slice(0,10)+'.json',exportBundle());document.getElementById('data-status').textContent='Export created.';});document.getElementById('data-import').addEventListener('change',function(){var f=this.files&&this.files[0];if(!f)return;var reader=new FileReader();reader.onload=function(){try{importBundle(JSON.parse(reader.result));document.getElementById('data-status').textContent='Import complete. Opening progress…';announce('Progress import complete.');window.setTimeout(function(){location.hash='#/progress';if(location.hash==='#/progress')route();},120);}catch(e){document.getElementById('data-status').textContent=e.message;}};reader.readAsText(f);});document.getElementById('data-reset').addEventListener('click',function(){if(window.confirm('Reset all learning progress? Accessibility preferences and review flags will remain.'))resetProgress();});function pref(id,key){document.getElementById(id).addEventListener('change',function(){var s=loadState();s.prefs[key]=this.value;saveState();applyPreferences();announce('Accessibility preference updated.');});}pref('pref-contrast','contrast');pref('pref-text','textScale');pref('pref-motion','motion');document.getElementById('analytics-toggle').addEventListener('change',function(){var s=loadState();s.analyticsEnabled=this.checked;saveState();announce(this.checked?'Local analytics enabled.':'Local analytics disabled.');});document.getElementById('analytics-clear').addEventListener('click',function(){var s=loadState();s.activity=[];saveState();announce('Local activity timeline cleared.');route();});
  }

  /* ---- progress / analytics -------------------------------------------- */
  function missedQuestions() {
    var a = loadState().answered, out = [];
    Object.keys(a).forEach(function (qid) { if (a[qid].correct === false && qById[qid]) out.push(qById[qid]); });
    return out;
  }
  function domainStats() {
    var a = loadState().answered, dom = {};
    BLUEPRINT.forEach(function (d) {
      dom[d.id] = { name: d.short, id: d.id, attempted: 0, correct: 0, total: QUESTIONS.filter(function (q) { return q.domain === d.id; }).length };
    });
    Object.keys(a).forEach(function (qid) {
      var q = qById[qid]; if (!q || !dom[q.domain]) return;
      dom[q.domain].attempted++; if (a[qid].correct) dom[q.domain].correct++;
    });
    return dom;
  }

  function viewProgress() {
    renderChrome("Progress");var metrics=progressMetrics(),missed=missedQuestions().length,dom=domainStats(),ex=loadExam(),recs=adaptiveRecommendations(4),st=loadState(),v=el("div","c-view");
    var heuristic=sittingHeuristic();var html='<div class="eyebrow">Transparent learning analytics</div><h1 class="c-h1">Your progress</h1><p class="c-lead">Completion, coverage, accuracy, event performance, and mock results are reported separately. None is presented as a prediction of certification success.</p><div class="c-card p3-progress-head">'+gauge(metrics.completion,"Course completion")+(missed?'<a class="c-btn c-btn--primary" href="#/practice/missed">Review '+missed+' missed →</a>':'<span class="c-secrow__n">No current missed questions</span>')+'</div><div class="c-tiles">'+tile(metrics.completion+'<small>%</small>',"Course completion")+tile(metrics.practiceCoverage+'<small>%</small>',"Practice coverage")+tile(metrics.practiceAccuracy+'<small>%</small>',"Practice accuracy")+tile(metrics.bankMastery+'<small>%</small>',"Confidence-adjusted mastery")+'</div><div class="c-note '+(heuristic.met?'c-note--normal':'c-note--op')+'"><div class="c-note__title">Study-console sitting heuristic</div>'+esc(heuristic.message)+'<br><span class="c-secrow__n">Target: 85%+ on two consecutive full mocks, with no combined subtopic below 70%. This is a study heuristic, not a pass prediction.</span></div>';
    if(ex&&ex.done){var scored=scoredIds(ex),corr=scoreExam(ex,scored),pass=corr>=cutFor(scored.length);html+='<h2 class="c-h2">Last exam simulation</h2><a class="c-secrow" href="#/exam/result"><span class="c-secrow__t">'+(ex.mode==='testday'?'Test-day mode':'Scored mock')+' · '+corr+'/'+scored.length+' <span style="color:'+(pass?'var(--normal)':'var(--emergency)')+'">'+(pass?'met practice cut':'below practice cut')+'</span><br><span class="c-secrow__n">'+(ex.experimentalIds.length?ex.experimentalIds.length+' experimental-style items excluded from score':'scored blueprint only')+'</span></span><span class="c-secrow__n">report →</span></a>';}
    html+='<h2 class="c-h2">Adaptive priorities</h2><div class="c-seclist">';recs.forEach(function(r){var a=r.stat.accuracy;html+='<a class="c-secrow" href="#/practice/t/'+r.topic+'"><span class="c-secrow__t">'+esc(r.meta.label)+'<br><span class="c-secrow__n">'+(a==null?'not attempted':r.stat.correct+'/'+r.stat.attempted+' correct · '+a+'%')+' · credential target '+r.stat.target+'</span></span><span class="c-secrow__n">drill →</span></a>';});html+='</div><h2 class="c-h2">By domain</h2><div class="c-seclist">';BLUEPRINT.forEach(function(d){var b=dom[d.id],a=b.attempted?Math.round(b.correct/b.attempted*100):0,weak=b.attempted>=3&&a<Math.round(cutPct()*100),col=!b.attempted?'var(--grid-line)':(a>=Math.round(cutPct()*100)?'var(--normal)':(a>=60?'var(--alert)':'var(--emergency)'));html+='<a class="c-secrow" href="#/practice/d/'+d.id+'"><span class="c-secrow__t">'+esc(b.name)+(weak?' <span class="c-pill c-pill--focus">focus</span>':'')+'<br><span class="c-secrow__n">'+(b.attempted?b.correct+'/'+b.attempted+' correct · '+a+'%':'not attempted yet')+'</span><span class="p3-meter"><span style="width:'+a+'%;background:'+col+'"></span></span></span><span class="c-secrow__n">drill →</span></a>';});html+='</div><h2 class="c-h2">Integrated events</h2><div class="c-seclist">';EVENTS.forEach(function(ev){var e=st.events[ev.id],sub=!e?'not started':(e.done?'completed · decision score '+e.score:'in progress · '+e.answers.length+' decisions');html+=secLink('#/events/'+ev.id,ev.title,sub);});html+='</div>';
    if(st.analyticsEnabled){var days={};st.activity.forEach(function(a){var d=new Date(a.at).toISOString().slice(0,10);days[d]=(days[d]||0)+1;});var keys=Object.keys(days).sort().slice(-14),max=1;keys.forEach(function(k){max=Math.max(max,days[k]);});html+='<h2 class="c-h2">Local activity timeline</h2><div class="p3-activity" aria-label="Local learning activity by day">';keys.forEach(function(k){html+='<div title="'+k+': '+days[k]+' activities"><span style="height:'+Math.max(4,Math.round(days[k]/max*90))+'px"></span><small>'+k.slice(5)+'</small></div>';});html+=(keys.length?'':'<p class="c-secrow__n">No logged activity yet.</p>')+'</div>';}else html+='<div class="c-note c-note--op"><div class="c-note__title">Local analytics are off</div>Enable the optional local activity timeline under <a href="#/data">Data & accessibility</a>. No activity leaves this browser.</div>';
    html+='<p class="c-fineprint">Repeated practice updates the latest result for each question while attempt history supports misconception counts. Export your progress before clearing browser data or moving devices.</p>';v.innerHTML=html;mountView(v);
  }

  /* ---- mount + router --------------------------------------------------- */
  function describeSvgsIn(root, fallbackLabel) {
    if(!root||!root.querySelectorAll)return;
    Array.prototype.forEach.call(root.querySelectorAll("svg"),function(svg){
      if(svg.getAttribute("aria-hidden")==="true")return;
      if(svg.getAttribute("aria-label")||svg.querySelector("title,desc"))return;
      var card=svg.closest&&svg.closest(".c-int"),label=card&&card.querySelector(".c-int__title");
      var heading=root.querySelector&&root.querySelector("h1");svg.setAttribute("role","img");svg.setAttribute("aria-label",(label?label.textContent:(heading?heading.textContent:fallbackLabel||"Study console"))+" interactive diagram");
    });
  }
  function rangeValueText(input) {
    var label=(input.getAttribute("aria-label")||"").toLowerCase(),v=Number(input.value),raw=input.value;
    if(/frequency|shaft speed/.test(label)&&Math.abs(v)>=1000)return (v/100).toFixed(2)+" hertz";
    if(/droop|percent|power factor|load level/.test(label))return raw+" percent";
    if(/megawatt|\bmw\b/.test(label))return raw+" megawatts";
    if(/mvar|reactive/.test(label))return raw+" megavars";
    if(/mile/.test(label))return raw+" miles";
    if(/degree|angle|cycle/.test(label))return raw+" degrees";
    if(/impedance/.test(label))return "relative impedance "+raw;
    return raw;
  }
  function enhanceRangesIn(root) {
    if(!root||!root.querySelectorAll)return;
    Array.prototype.forEach.call(root.querySelectorAll('input[type="range"]'),function(input){
      function update(){if(!input.hasAttribute("aria-valuetext")||input.dataset.autoValueText==="1"){input.setAttribute("aria-valuetext",rangeValueText(input));input.dataset.autoValueText="1";}}
      update();if(input.dataset.valueTextBound!=="1"){input.addEventListener("input",update);input.addEventListener("change",update);input.dataset.valueTextBound="1";}
    });
  }
  function enhanceEmbeddedFrame(frame, fallbackLabel) {
    try {
      var doc=frame.contentDocument;
      if(!doc)return;
      var label=frame.getAttribute("title")||fallbackLabel||"Study console activity";
      describeSvgsIn(doc,label);enhanceRangesIn(doc);
    } catch(e) { /* srcdoc is same-origin; ignore a browser that blocks inspection */ }
  }
  function ensureSvgDescriptions(node) {
    var heading=node.querySelector("h1"),fallback=heading?heading.textContent:"Study console";
    describeSvgsIn(node,fallback);
    Array.prototype.forEach.call(node.querySelectorAll("iframe"),function(frame){
      frame.addEventListener("load",function(){enhanceEmbeddedFrame(frame,fallback);});
      window.setTimeout(function(){enhanceEmbeddedFrame(frame,fallback);},0);
    });
  }
  function enhanceRangeAccessibility(node) {
    var heading=node.querySelector("h1"),fallback=heading?heading.textContent:"Study console";
    enhanceRangesIn(node);
    Array.prototype.forEach.call(node.querySelectorAll("iframe"),function(frame){
      frame.addEventListener("load",function(){enhanceEmbeddedFrame(frame,fallback);});
      window.setTimeout(function(){enhanceEmbeddedFrame(frame,fallback);},0);
    });
  }

  function mountView(node) {
    view.innerHTML = "";
    view.appendChild(node);
    ensureSvgDescriptions(node);
    enhanceRangeAccessibility(node);
    var pageHeading=node.querySelector("h1");var cm=credMeta(activeCred());
    document.title=(pageHeading?pageHeading.textContent.trim():"Overview")+" | NERC "+(cm?cm.designation:"System Operator")+" Study Console";
    markActiveNav();
    window.scrollTo(0, 0);
    closeRail();
    var main = document.getElementById("main-content");
    if (main && !(location.hash.indexOf("#/exam/run") === 0)) {
      window.setTimeout(function () { try { main.focus({ preventScroll: true }); } catch (e) { main.focus(); } }, 0);
    }
  }
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var p = h.split("/").filter(Boolean);
    hideTip();
    if (!(p[0] === "exam" && p[1] === "run")) clearExamTimer();
    if (!p.length || p[0] === "home") return viewDashboard();
    if (p[0] === "m" && p[1] && p[2] === "s" && p[3]) return viewSection(p[1], p[3]);
    if (p[0] === "m" && p[1]) return viewModule(p[1]);
    if (p[0] === "practice") {
      if (!p[1]) return practiceLanding();
      if (p[1] === "all") return runQuiz(QUESTIONS.slice(), null, "all");
      if (p[1] === "missed") return runQuiz(missedQuestions(), "Review your misses", "missed:" + Date.now());
      if (p[1] === "adaptive-run") { if (quizState.list && quizState.list.length) return renderQuestion(); location.hash="#/adaptive"; return; }
      if (p[1] === "t" && p[2]) { var tr = topicById[p[2]], tm = MISCONCEPTIONS[p[2]]; return runQuiz(QUESTIONS.filter(function(q){return q.topic===p[2];}), tm?tm.label:(tr?tr.topic.name:p[2]), "t:"+p[2]); }
      if (p[1] === "d" && p[2]) { var d = domainById[p[2]]; return runQuiz(questionsForDomain(p[2]), d ? d.name : p[2], "d:" + p[2]); }
      var pm = moduleById[p[1]];
      return runQuiz(QUESTIONS.filter(function (q) { return q.module === p[1]; }), pm ? pm.title : p[1], "m:" + p[1]);
    }
    if (p[0] === "exam") {
      if (p[1] === "run") return viewExamRun();
      if (p[1] === "result") return viewExamResult();
      return viewExamLanding();
    }
    if (p[0] === "adaptive") return viewAdaptive();
    if (p[0] === "events") { if (p[1]) return viewEvent(p[1]); return viewEvents(); }
    if (p[0] === "data") return viewData();
    if (p[0] === "plan") return viewPlan();
    if (p[0] === "credential") return viewCredential();
    if (p[0] === "cards") return viewCards();
    if (p[0] === "search") return viewSearch();
    if (p[0] === "glossary") return viewGlossary();
    if (p[0] === "progress") return viewProgress();
    if (p[0] === "review") return viewReview();
    if (p[0] === "standards") return viewStandards(p[1] ? decodeURIComponent(p[1]) : "");
    return viewDashboard();
  }

  /* ---- rail (mobile) ---------------------------------------------------- */
  function closeRail() { var r = document.getElementById("rail"), t=document.getElementById("rail-toggle"); if (r) r.classList.remove("is-open"); if(t)t.setAttribute("aria-expanded","false"); }

  /* ---- boot ------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    app = document.getElementById("app");
    view = document.getElementById("view");

    applyPreferences();
    var skipLink=document.querySelector(".c-skip");
    if(skipLink) skipLink.addEventListener("click",function(e){
      e.preventDefault();
      var main=document.getElementById("main-content");
      if(main){ try{ main.focus({preventScroll:false}); }catch(err){ main.focus(); } }
    });
    var railToggle=document.getElementById("rail-toggle");railToggle.setAttribute("aria-expanded","false");
    railToggle.addEventListener("click", function () {
      var rail=document.getElementById("rail"),open=rail.classList.toggle("is-open");this.setAttribute("aria-expanded",open?"true":"false");
    });
    // nav via delegation (module buttons carry data-href)
    document.getElementById("rail").addEventListener("click", function (e) {
      var item = e.target.closest(".c-nav-item");
      if (item && item.dataset.href) location.hash = item.dataset.href;
    });

    // persistent global search box (top strip, on every page)
    var gs = document.getElementById("global-search");
    var gsForm = document.getElementById("global-search-form");
    function onSearchPage() { return location.hash.replace(/^#\/?/, "").split("/")[0] === "search"; }
    if (gs) {
      gs.addEventListener("input", function () {
        searchState.q = this.value;
        if (onSearchPage() && searchRerender) searchRerender();
      });
    }
    if (gsForm) {
      gsForm.addEventListener("submit", function (e) {
        e.preventDefault();
        searchState.q = gs ? gs.value : "";
        if (!onSearchPage()) location.hash = "#/search";
        else if (searchRerender) searchRerender();
      });
    }

    window.addEventListener("hashchange", route);
    if (!location.hash) location.hash = "#/";
    else route();
  });
})();
