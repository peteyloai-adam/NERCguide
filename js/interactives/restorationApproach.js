/* ============================================================================
   INTERACTIVE: Three restoration approaches
                NERC.interactives.restorationApproach

   Gradual release across three phases (Show Me / Guide Me / Let Me Try):

     SHOW ME   - an animated one-line of the same system under each approach.
                 Outside In energizes inward from the external system; Inside
                 Out radiates outward from an internal blackstart unit; the
                 Combination does both at once.
     GUIDE ME  - three coached scenarios; the learner picks and gets the
                 reasoning, including the resource question that decides it.
     LET ME TRY- three assessment items, one at a time, with feedback and the
                 governing NERC standard, then a score summary.

   Animation is pure declarative CSS keyframes (path draw via pathLength +
   stroke-dashoffset). No timers, no rAF loop - per project convention - so
   nothing hangs the jsdom smoke harness. A prefers-reduced-motion block pins
   every animated element to its finished state so the diagram is still
   complete and readable with motion disabled.

   Colors are hardcoded hex matching console.css tokens.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.restorationApproach = function (mount) {
  var PHOS = '#56C2E6', AMBER = '#E0A83E', GREEN = '#3FB98C', RED = '#E5484D',
      READ = '#C9D6E4', DIM = '#7E8DA0', AXIS = '#2A3648', OFF = '#4A5768';

  /* ---- one-time style injection (animations) --------------------------- */
  if (!document.getElementById('rs-appr-style')) {
    var st = document.createElement('style');
    st.id = 'rs-appr-style';
    st.textContent =
      '.rs-draw{stroke-dasharray:100;stroke-dashoffset:100;animation:rs-draw 1s ease forwards}' +
      '@keyframes rs-draw{to{stroke-dashoffset:0}}' +
      '.rs-fade{opacity:0;animation:rs-fade .45s ease forwards}' +
      '@keyframes rs-fade{to{opacity:1}}' +
      '.rs-d1{animation-delay:.05s}.rs-d2{animation-delay:.8s}' +
      '.rs-d3{animation-delay:1.5s}.rs-d4{animation-delay:2s}' +
      '@media (prefers-reduced-motion: reduce){' +
        '.rs-draw{stroke-dashoffset:0}.rs-fade{opacity:1}}';
    document.head.appendChild(st);
  }

  /* ---- approach copy ---------------------------------------------------- */
  var APPR = {
    outside: {
      name: 'Outside In', alt: 'Top-Down', color: PHOS,
      when: 'No blackstart generation is available inside the blacked-out area.',
      how: 'Transmission is energized first to carry power <em>into</em> the dark area from an external neighboring system. Internal units stay offline until delivered power can crank them.',
      cap: 'Power flows inward from the intact external system. With no blackstart resource inside, transmission must be energized first \u2014 the area is restored from the outside in.'
    },
    inside: {
      name: 'Inside Out', alt: 'Bottom-Up', color: GREEN,
      when: 'Blackstart generation IS available inside the blacked-out area.',
      how: 'The internal blackstart unit is started first and energizes outward along the cranking path, growing the island. The area then reconnects to the rest of the system.',
      cap: 'The internal blackstart unit starts on its own and energizes outward in both directions, growing an island. Connection back to the external system comes last.'
    },
    combo: {
      name: 'Combination', alt: 'Hybrid', color: AMBER,
      when: 'Both internal blackstart generation and external sources are usable.',
      how: 'Internal and external generation are used at the same time, decreasing total restoration time and adding redundancy if one source falters. This is the most common approach in practice.',
      cap: 'Both sources work at once \u2014 external power flows in while the internal blackstart unit energizes outward. Restoration time drops and each source backs up the other.'
    }
  };

  /* ---- SVG scene builder ------------------------------------------------ */
  function scene(mode) {
    var a = APPR[mode], lit = a.color;
    var extOn = mode !== 'inside';           // external system feeding at the start
    var bsOn  = mode !== 'outside';          // internal blackstart unit in use
    var s = '';

    s += '<svg viewBox="0 0 660 212" style="width:100%;max-width:660px;height:auto" role="img" ' +
         'aria-label="One-line diagram animating the ' + a.name + ' restoration approach">';

    // blacked-out area boundary
    s += '<rect x="246" y="26" width="396" height="172" rx="10" fill="#141B26" stroke="' + AXIS + '" stroke-width="1.5" stroke-dasharray="6 5"/>';
    s += '<text x="262" y="46" fill="' + DIM + '" font-family="monospace" font-size="9.5" letter-spacing="1">BLACKED-OUT AREA</text>';

    // external system box
    s += '<rect x="18" y="76" width="118" height="56" rx="6" fill="#1A2230" stroke="' + (extOn ? GREEN : OFF) + '" stroke-width="1.5"/>';
    s += '<text x="77" y="100" fill="' + (extOn ? READ : OFF) + '" font-family="monospace" font-size="9.5" text-anchor="middle">EXTERNAL</text>';
    s += '<text x="77" y="114" fill="' + (extOn ? READ : OFF) + '" font-family="monospace" font-size="9.5" text-anchor="middle">SYSTEM</text>';
    s += '<text x="77" y="146" fill="' + (extOn ? GREEN : OFF) + '" font-family="monospace" font-size="8.5" text-anchor="middle">' + (extOn ? 'intact' : 'not used first') + '</text>';

    // ---- energization paths (direction encoded in the path itself) ----
    if (mode === 'outside') {
      s += '<path d="M136 104 L278 104" pathLength="100" class="rs-draw rs-d1" fill="none" stroke="' + lit + '" stroke-width="3"/>';
      s += '<path d="M278 104 L616 104" pathLength="100" class="rs-draw rs-d2" fill="none" stroke="' + lit + '" stroke-width="3"/>';
      s += arrow(206, 104, 1, lit, 'rs-fade rs-d1');
      s += arrow(430, 104, 1, lit, 'rs-fade rs-d2');
    } else if (mode === 'inside') {
      s += '<path d="M330 142 L330 104" pathLength="100" class="rs-draw rs-d1" fill="none" stroke="' + lit + '" stroke-width="3"/>';
      s += '<path d="M330 104 L278 104" pathLength="100" class="rs-draw rs-d2" fill="none" stroke="' + lit + '" stroke-width="3"/>';
      s += '<path d="M330 104 L616 104" pathLength="100" class="rs-draw rs-d2" fill="none" stroke="' + lit + '" stroke-width="3"/>';
      s += '<path d="M278 104 L136 104" pathLength="100" class="rs-draw rs-d4" fill="none" stroke="' + lit + '" stroke-width="3"/>';
      s += arrow(300, 104, -1, lit, 'rs-fade rs-d2');
      s += arrow(470, 104, 1, lit, 'rs-fade rs-d2');
      s += arrow(200, 104, -1, lit, 'rs-fade rs-d4');
      s += '<text x="200" y="92" fill="' + DIM + '" font-family="monospace" font-size="8.5" text-anchor="middle" class="rs-fade rs-d4">reconnect last</text>';
    } else {
      s += '<path d="M136 104 L278 104" pathLength="100" class="rs-draw rs-d1" fill="none" stroke="' + PHOS + '" stroke-width="3"/>';
      s += '<path d="M330 142 L330 104" pathLength="100" class="rs-draw rs-d1" fill="none" stroke="' + GREEN + '" stroke-width="3"/>';
      s += '<path d="M278 104 L330 104" pathLength="100" class="rs-draw rs-d2" fill="none" stroke="' + PHOS + '" stroke-width="3"/>';
      s += '<path d="M330 104 L616 104" pathLength="100" class="rs-draw rs-d2" fill="none" stroke="' + GREEN + '" stroke-width="3"/>';
      s += arrow(206, 104, 1, PHOS, 'rs-fade rs-d1');
      s += arrow(470, 104, 1, GREEN, 'rs-fade rs-d2');
    }

    // ---- blackstart unit ----
    var bsCol = bsOn ? GREEN : OFF;
    if (!bsOn) s += '<path d="M330 142 L330 104" fill="none" stroke="' + OFF + '" stroke-width="2" stroke-dasharray="4 4"/>';
    s += '<circle cx="330" cy="158" r="16" fill="#1A2230" stroke="' + bsCol + '" stroke-width="2"' +
         (bsOn ? ' class="rs-fade rs-d1"' : '') + '/>';
    s += '<text x="330" y="163" fill="' + bsCol + '" font-family="monospace" font-size="11" text-anchor="middle"' +
         (bsOn ? ' class="rs-fade rs-d1"' : '') + '>BS</text>';
    s += '<text x="330" y="190" fill="' + (bsOn ? READ : OFF) + '" font-family="monospace" font-size="8.5" text-anchor="middle">' +
         (bsOn ? 'BLACKSTART' : 'NO BLACKSTART') + '</text>';

    // ---- large unit (cranked by delivered power in every approach) ----
    s += '<path d="M458 142 L458 104" pathLength="100" class="rs-draw rs-d3" fill="none" stroke="' + lit + '" stroke-width="2.5"/>';
    s += '<circle cx="458" cy="158" r="16" fill="#1A2230" stroke="' + lit + '" stroke-width="2" class="rs-fade rs-d3"/>';
    s += '<text x="458" y="163" fill="' + lit + '" font-family="monospace" font-size="11" text-anchor="middle" class="rs-fade rs-d3">G</text>';
    s += '<text x="458" y="190" fill="' + READ + '" font-family="monospace" font-size="8.5" text-anchor="middle">LARGE UNIT</text>';

    // ---- load (restored last, in blocks) ----
    s += '<path d="M578 142 L578 104" pathLength="100" class="rs-draw rs-d4" fill="none" stroke="' + lit + '" stroke-width="2.5"/>';
    s += '<polygon points="578,146 566,170 590,170" fill="none" stroke="' + lit + '" stroke-width="2" class="rs-fade rs-d4"/>';
    s += '<text x="578" y="190" fill="' + READ + '" font-family="monospace" font-size="8.5" text-anchor="middle">LOAD</text>';

    s += '</svg>';
    return s;
  }

  function arrow(x, y, dir, color, cls) {
    var d = dir > 0 ? 1 : -1;
    return '<polygon points="' + (x + 7 * d) + ',' + y + ' ' + (x - 4 * d) + ',' + (y - 6) + ' ' +
           (x - 4 * d) + ',' + (y + 6) + '" fill="' + color + '"' + (cls ? ' class="' + cls + '"' : '') + '/>';
  }

  /* ---- guide-me + let-me-try data --------------------------------------- */
  var GUIDE = [
    { id: 'g1',
      text: 'A large portion of your area is blacked out. The first question your restoration plan makes you answer: <strong>are blackstart resources available inside the blacked-out area?</strong>',
      opts: [ { label: 'YES \u2014 blackstart available', pick: 'inside' },
              { label: 'NO \u2014 none available', pick: 'outside' } ],
      fb: {
        inside: '<strong>Then you can restore Inside Out (Bottom-Up).</strong> Start the internal blackstart unit, energize outward along the cranking path to crank larger units, and reconnect to the rest of the system once the island is stable. This is generally the faster path when it is available, because you are not waiting on an external source.',
        outside: '<strong>Then you must restore Outside In (Top-Down).</strong> With nothing inside able to start itself, transmission has to be energized first to carry power in from a neighboring system. Only once that power arrives can internal units be cranked.'
      } },
    { id: 'g2',
      text: 'Your area is blacked out. One blackstart unit inside the area is available, <em>and</em> a neighboring system is intact with capacity to spare. Your RC wants the fastest safe restoration. Which approach fits?',
      opts: [ { label: 'Outside In (Top-Down)', pick: 'outside' },
              { label: 'Inside Out (Bottom-Up)', pick: 'inside' },
              { label: 'Combination (Hybrid)', pick: 'combo' } ],
      answer: 'combo',
      fb: {
        combo: '<strong>Correct \u2014 Combination (Hybrid).</strong> When both internal and external generation are usable, working from both at once decreases total restoration time and gives you redundancy: if one source falters you are not starting over. This is the most common approach in practice.',
        outside: 'Workable, but you would be leaving your blackstart unit idle and restoring more slowly than you need to. With <em>both</em> sources available, the Combination approach is the better answer.',
        inside: 'Workable, but it ignores the intact neighbor offering capacity. Using both sources at once is faster and gives you a fallback \u2014 that is the Combination approach.'
      } },
    { id: 'g3',
      text: 'Your plan calls for an Inside Out restoration using your one blackstart unit. During the restoration <strong>that unit fails to start</strong>. Your ties to a neighboring system are intact and their system is stable. What now?',
      opts: [ { label: 'Outside In (Top-Down)', pick: 'outside' },
              { label: 'Inside Out (Bottom-Up)', pick: 'inside' },
              { label: 'Combination (Hybrid)', pick: 'combo' } ],
      answer: 'outside',
      fb: {
        outside: '<strong>Correct \u2014 Outside In (Top-Down).</strong> The moment your only internal source is unavailable, you are functionally in the no-blackstart case: energize transmission to bring power in from the neighbor. This is exactly why restoration plans document more than one approach and why blackstart resources are tested.',
        inside: 'Inside Out needs a working internal blackstart resource \u2014 and yours just failed. With nothing inside able to start itself, you have to bring power in from outside.',
        combo: 'The Combination approach needs <em>both</em> sources. With the blackstart unit failed, the internal half is gone and you are left restoring from the outside in.'
      } }
  ];

  var TRY = [
    { text: 'Your area is completely blacked out. No blackstart units are available. A neighboring system is stable with available capacity. What restoration approach do you recommend?',
      answer: 'outside',
      ok: 'With no internal generation able to start itself, you must energize transmission first to carry power into the area \u2014 the Outside In, or Top-Down, approach.',
      why: {
        inside: 'Inside Out requires a blackstart resource inside the blacked-out area, and you have none.',
        combo: 'A Combination needs a usable internal source as well as an external one. With no blackstart unit, only the external half is available to you.'
      },
      std: 'EOP-005-3 (System Restoration from Blackstart Resources)' },
    { text: 'A severe disturbance separates your area from the Interconnection. All ties are de-energized, but a blackstart unit inside your area is available and its cranking path is intact. What approach do you use?',
      answer: 'inside',
      ok: 'Start the internal blackstart unit and energize outward along the cranking path, growing the island until you can resynchronize with the rest of the system \u2014 the Inside Out, or Bottom-Up, approach.',
      why: {
        outside: 'Outside In depends on an external source you can energize inward from, and your ties are all de-energized. Your usable resource is the blackstart unit inside the area.',
        combo: 'A Combination needs a usable external source too. With every tie de-energized, you are working from the inside out.'
      },
      std: 'EOP-005-3 (System Restoration from Blackstart Resources)' },
    { text: 'Your blacked-out area has one available blackstart unit, and a neighboring TOP has offered capacity through an intact tie. Your RC is coordinating restoration across both areas and wants to minimize total restoration time. What approach do you recommend?',
      answer: 'combo',
      ok: 'Use both sources at once. Leveraging internal blackstart generation together with external generation decreases restoration time and provides redundancy \u2014 the Combination, or Hybrid, approach, and the most common one in practice.',
      why: {
        outside: 'Restoring only from outside leaves your available blackstart unit idle and takes longer than it needs to.',
        inside: 'Restoring only from inside ignores the capacity your neighbor is offering through an intact tie \u2014 and the RC asked you to minimize restoration time.'
      },
      std: 'EOP-006-3 (System Restoration Coordination) \u2014 with EOP-005-3 governing your own restoration' }
  ];

  var LABEL = { outside: 'Outside In (Top-Down)', inside: 'Inside Out (Bottom-Up)', combo: 'Combination (Hybrid)' };

  /* ---- shell ------------------------------------------------------------ */
  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00B7 The three restoration approaches</div>' +
      '<div class="c-seg" id="rs-phase" role="tablist" aria-label="Learning phase">' +
        '<button class="c-seg__btn is-on" data-phase="show" role="tab">Show me</button>' +
        '<button class="c-seg__btn" data-phase="guide" role="tab">Guide me</button>' +
        '<button class="c-seg__btn" data-phase="try" role="tab">Let me try</button>' +
      '</div>' +
      '<div id="rs-body"></div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };
  var body = $('rs-body');
  var phase = 'show', current = 'outside';

  mount.querySelectorAll('[data-phase]').forEach(function (b) {
    b.addEventListener('click', function () { setPhase(b.getAttribute('data-phase')); });
  });
  function setPhase(p) {
    phase = p;
    mount.querySelectorAll('[data-phase]').forEach(function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-phase') === p);
    });
    if (p === 'show') renderShow();
    else if (p === 'guide') renderGuide();
    else renderTry();
  }

  /* ---- SHOW ME ---------------------------------------------------------- */
  function renderShow() {
    var html = '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0">';
    ['outside', 'inside', 'combo'].forEach(function (k) {
      html += '<button class="c-btn' + (k === current ? ' c-btn--primary' : '') + '" data-appr="' + k + '">' +
        APPR[k].name + '</button>';
    });
    html += '</div><div id="rs-stage"></div>' +
      '<div class="c-note c-note--op" id="rs-cap" style="margin-top:12px"></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">' +
        '<button class="c-btn" id="rs-replay">Replay animation</button>' +
        '<button class="c-btn c-btn--ghost" id="rs-next">Continue to Guide me \u2192</button>' +
      '</div>';
    body.innerHTML = html;
    paintStage();
    body.querySelectorAll('[data-appr]').forEach(function (b) {
      b.addEventListener('click', function () {
        current = b.getAttribute('data-appr');
        body.querySelectorAll('[data-appr]').forEach(function (x) {
          x.classList.toggle('c-btn--primary', x === b);
        });
        paintStage();
      });
    });
    $('rs-replay').addEventListener('click', paintStage);
    $('rs-next').addEventListener('click', function () { setPhase('guide'); });
  }
  function paintStage() {
    var a = APPR[current];
    $('rs-stage').innerHTML = scene(current);   // rebuilding restarts the CSS animations
    $('rs-cap').innerHTML =
      '<div class="c-note__title" style="color:' + a.color + '">' + a.name + ' \u00B7 also called ' + a.alt + '</div>' +
      '<div><strong>When you use it:</strong> ' + a.when + '</div>' +
      '<div style="margin-top:6px">' + a.how + '</div>' +
      '<div style="margin-top:6px;color:' + DIM + '">' + a.cap + '</div>';
  }

  /* ---- GUIDE ME --------------------------------------------------------- */
  function renderGuide() {
    var html = '<p class="c-fineprint" style="margin:12px 0">Work through each situation and choose the approach you would use. You will get the reasoning either way.</p>';
    GUIDE.forEach(function (g, i) {
      html += '<div class="c-scenario__step" id="' + g.id + '" style="margin-top:' + (i ? '18px' : '4px') + '">' +
        '<div class="c-scenario__steplabel">Situation ' + (i + 1) + ' of ' + GUIDE.length + '</div>' +
        '<div class="c-q__stem">' + g.text + '</div>' +
        '<div class="c-opts" data-opts="' + g.id + '"></div>' +
        '<div data-fb="' + g.id + '"></div></div>';
    });
    html += '<div style="margin-top:16px"><button class="c-btn c-btn--ghost" id="rs-next2">Continue to Let me try \u2192</button></div>';
    body.innerHTML = html;

    GUIDE.forEach(function (g) {
      var wrap = body.querySelector('[data-opts="' + g.id + '"]');
      g.opts.forEach(function (o, oi) {
        var btn = document.createElement('button');
        btn.className = 'c-opt';
        btn.innerHTML = '<span class="c-opt__key">' + 'ABCD'.charAt(oi) + '</span><span>' + o.label + '</span>';
        btn.addEventListener('click', function () {
          var kids = wrap.children;
          for (var i = 0; i < kids.length; i++) kids[i].setAttribute('disabled', 'true');
          var correct = !g.answer || o.pick === g.answer;
          btn.classList.add(correct ? 'is-correct' : 'is-wrong');
          if (g.answer && !correct) {
            for (var j = 0; j < g.opts.length; j++)
              if (g.opts[j].pick === g.answer) kids[j].classList.add('is-correct');
          }
          var fb = body.querySelector('[data-fb="' + g.id + '"]');
          fb.innerHTML = '<div class="c-explain"><div class="c-explain__head ' +
            (correct ? 'is-correct">Reasoning' : 'is-wrong">Not the best fit') + '</div><div>' +
            g.fb[o.pick] + '</div></div>';
        });
        wrap.appendChild(btn);
      });
    });
    $('rs-next2').addEventListener('click', function () { setPhase('try'); });
  }

  /* ---- LET ME TRY ------------------------------------------------------- */
  var tryIdx = 0, tryScore = 0;
  function renderTry() {
    tryIdx = 0; tryScore = 0;
    body.innerHTML = '<div id="rs-try" style="margin-top:12px"></div>';
    paintTry();
  }
  function paintTry() {
    var host = $('rs-try');
    if (tryIdx >= TRY.length) {
      host.innerHTML =
        '<div class="c-scenario__debrief"><strong>Score.</strong> ' + tryScore + ' of ' + TRY.length +
        ' correct. The deciding question is always the same one: <em>what generation can you actually use?</em> ' +
        'Nothing inside \u2192 Outside In. A usable blackstart unit inside \u2192 Inside Out. Both \u2192 Combination, ' +
        'which is the most common approach in practice.</div>' +
        '<div style="margin-top:12px"><button class="c-btn" id="rs-again">Try again</button></div>';
      $('rs-again').addEventListener('click', renderTry);
      return;
    }
    var t = TRY[tryIdx];
    host.innerHTML =
      '<div class="c-scenario__steplabel">Scenario ' + (tryIdx + 1) + ' of ' + TRY.length + '</div>' +
      '<div class="c-q__stem">' + t.text + '</div>' +
      '<div class="c-opts" id="rs-topts"></div><div id="rs-tfb"></div>';
    var wrap = $('rs-topts');
    ['outside', 'inside', 'combo'].forEach(function (k, oi) {
      var btn = document.createElement('button');
      btn.className = 'c-opt';
      btn.innerHTML = '<span class="c-opt__key">' + 'ABC'.charAt(oi) + '</span><span>' + LABEL[k] + '</span>';
      btn.addEventListener('click', function () { answerTry(k, wrap, t); });
      wrap.appendChild(btn);
    });
  }
  function answerTry(pick, wrap, t) {
    var keys = ['outside', 'inside', 'combo'], kids = wrap.children;
    for (var i = 0; i < kids.length; i++) {
      kids[i].setAttribute('disabled', 'true');
      if (keys[i] === t.answer) kids[i].classList.add('is-correct');
      else if (keys[i] === pick) kids[i].classList.add('is-wrong');
    }
    var correct = pick === t.answer;
    if (correct) tryScore++;
    $('rs-tfb').innerHTML =
      '<div class="c-explain">' +
        '<div class="c-explain__head ' + (correct ? 'is-correct">Correct \u2014 ' : 'is-wrong">Not quite \u2014 ') +
          LABEL[t.answer] + '</div>' +
        '<div>' + (correct ? '' : t.why[pick] + ' ') + t.ok + '</div>' +
        '<div style="margin-top:8px;font-family:var(--font-mono);font-size:.74rem;color:' + PHOS + '">Reference \u00B7 ' + t.std + '</div>' +
        '<div class="c-explain__actions"><button class="c-btn c-btn--primary" id="rs-tnext">' +
          (tryIdx === TRY.length - 1 ? 'See score \u2192' : 'Next scenario \u2192') + '</button></div>' +
      '</div>';
    $('rs-tnext').addEventListener('click', function () { tryIdx++; paintTry(); });
  }

  renderShow();
};
