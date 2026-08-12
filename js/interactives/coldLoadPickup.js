/* ============================================================================
   INTERACTIVE: Cold Load Pickup — guided walkthrough
   Auto-embedded (build-embed.js) from cold-load-pickup.html.

   Rendered in an isolated, auto-sizing <iframe srcdoc>. This preserves the
   original single-file interactive exactly — its own styles, scripts, event
   listeners, and animation loop all stay contained inside the frame, so nothing
   collides with the console CSS and no listeners leak across navigation. The
   frame height tracks the inner content via ResizeObserver.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.coldLoadPickup = function (mount) {
  var HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cold Load Pickup — Guided Walkthrough</title>
<style>
  :root{
    --bg:#0e151b;
    --panel:#16212b;
    --panel-2:#1b2833;
    --edge:#2a3b48;
    --grid:#243440;
    --ink:#eaf3f9;
    --ink-dim:#93a9ba;
    --ink-faint:#5f7688;
    /* color-temperature scale: hot inrush -> cool steady state */
    --hot:#ff6b35;
    --warm:#ff9f1c;
    --gold:#f4bf4a;
    --cool:#3fd8c4;
    --ok:#5ee6a8;
    --bad:#ff6b6b;
    --font-ui:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    --font-mono:ui-monospace,"SF Mono","Cascadia Code","Roboto Mono",Consolas,monospace;
  }
  *{box-sizing:border-box}
  html,body{margin:0}
  body{
    background:var(--bg);
    color:var(--ink);
    font-family:var(--font-ui);
    -webkit-font-smoothing:antialiased;
    line-height:1.5;
  }
  .wrap{
    max-width:1320px;
    margin:0 auto;
    padding:22px clamp(14px,3vw,28px) 40px;
  }

  /* ---------- header ---------- */
  header.app{
    display:flex;align-items:baseline;justify-content:space-between;
    gap:16px;flex-wrap:wrap;
    padding-bottom:16px;margin-bottom:18px;
    border-bottom:1px solid var(--edge);
  }
  .eyebrow{
    font-family:var(--font-mono);
    font-size:11px;letter-spacing:.22em;text-transform:uppercase;
    color:var(--ink-faint);margin:0 0 6px;
  }
  h1{font-size:clamp(24px,3.4vw,34px);margin:0;font-weight:700;letter-spacing:-.01em}
  .app .sub{color:var(--ink-dim);font-size:13px;max-width:46ch;text-align:right}

  /* ---------- main grid ---------- */
  .stage{
    display:grid;
    grid-template-columns:minmax(0,2fr) minmax(250px,0.92fr);
    gap:18px;
    align-items:stretch;
  }
  @media (max-width:820px){ .stage{grid-template-columns:1fr} }

  .card{
    background:var(--panel);
    border:1px solid var(--edge);
    border-radius:14px;
  }
  .chart-card{padding:10px 8px 4px;position:relative;overflow:hidden}
  svg.chart{display:block;width:100%;height:auto}

  /* ---------- telemetry panel ---------- */
  .telem{padding:18px 18px 20px;display:flex;flex-direction:column;gap:14px}
  .telem .phase-tag{
    font-family:var(--font-mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;
    color:var(--ink-faint);
  }
  .telem h2{margin:0;font-size:19px;font-weight:700;letter-spacing:-.01em}
  .readout{
    display:flex;align-items:flex-end;gap:14px;flex-wrap:wrap;
    padding:12px 0 12px;border-top:1px solid var(--edge);border-bottom:1px solid var(--edge);
  }
  .load-num{font-family:var(--font-mono);font-size:44px;font-weight:600;line-height:.9;letter-spacing:-.02em}
  .load-num .unit{font-size:16px;color:var(--ink-dim);margin-left:4px;font-weight:500}
  .chips{display:flex;gap:8px;flex-wrap:wrap;margin-left:auto}
  .chip{
    font-family:var(--font-mono);font-size:12px;padding:5px 9px;border-radius:999px;
    border:1px solid var(--edge);color:var(--ink-dim);white-space:nowrap;
  }
  .chip.mult{color:#0e151b;font-weight:700;border:none}
  .telem p.explain{margin:2px 0 0;color:var(--ink-dim);font-size:14px}
  .telem p.explain b{color:var(--ink)}

  .why{
    margin-top:auto;background:var(--panel-2);border:1px solid var(--edge);
    border-radius:10px;padding:12px 14px;
  }
  .why summary{
    cursor:pointer;font-family:var(--font-mono);font-size:11px;letter-spacing:.14em;
    text-transform:uppercase;color:var(--ink-faint);list-style:none;
  }
  .why summary::-webkit-details-marker{display:none}
  .why summary::before{content:"\\25B8 ";color:var(--cool)}
  .why[open] summary::before{content:"\\25BE "}
  .why p{margin:10px 0 0;font-size:13px;color:var(--ink-dim)}

  /* ---------- controls ---------- */
  .controls{
    display:flex;align-items:center;gap:12px;flex-wrap:wrap;
    margin-top:16px;
  }
  .dots{display:flex;gap:8px;margin-right:auto}
  .dot{
    width:34px;height:6px;border-radius:99px;background:var(--edge);border:none;padding:0;cursor:pointer;
    transition:background .3s;
  }
  .dot[aria-current="true"]{background:var(--warm)}
  .dot.done{background:var(--ink-faint)}
  button.btn{
    font-family:var(--font-ui);font-size:14px;font-weight:600;
    padding:10px 18px;border-radius:10px;cursor:pointer;border:1px solid var(--edge);
    background:var(--panel-2);color:var(--ink);transition:transform .08s,background .2s,opacity .2s;
  }
  button.btn:hover{background:#22323f}
  button.btn:active{transform:translateY(1px)}
  button.btn.primary{background:var(--warm);color:#1a1206;border-color:transparent}
  button.btn.primary:hover{background:#ffb03d}
  button.btn.cool{background:var(--cool);color:#052723;border-color:transparent}
  button.btn.cool:hover{background:#54e6d3}
  button.btn:disabled{opacity:.4;cursor:not-allowed}
  button.btn:focus-visible,.dot:focus-visible,summary:focus-visible{outline:2px solid var(--cool);outline-offset:2px}

  /* ---------- intro overlay ---------- */
  .intro{
    position:absolute;inset:0;background:rgba(14,21,27,.9);backdrop-filter:blur(2px);
    display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
    padding:24px;gap:14px;z-index:5;
  }
  .intro h3{margin:0;font-size:22px}
  .intro p{margin:0;max-width:44ch;color:var(--ink-dim);font-size:14px}
  .intro.hidden{display:none}
  .setup-eq{font-family:var(--font-mono);font-size:13px;color:var(--gold);letter-spacing:.04em}

  /* ---------- quiz ---------- */
  .quiz{margin-top:26px}
  .quiz.hidden{display:none}
  .quiz h2{font-size:20px;margin:0 0 4px}
  .quiz .lead{color:var(--ink-dim);font-size:14px;margin:0 0 18px;max-width:64ch}
  .q{background:var(--panel);border:1px solid var(--edge);border-radius:14px;padding:18px 20px;margin-bottom:14px}
  .q .qnum{font-family:var(--font-mono);font-size:11px;letter-spacing:.16em;color:var(--ink-faint);text-transform:uppercase}
  .q .qtext{font-weight:600;margin:6px 0 14px;font-size:16px}
  .opts{display:grid;gap:9px}
  .opt{
    text-align:left;font-family:var(--font-ui);font-size:14px;color:var(--ink);
    background:var(--panel-2);border:1px solid var(--edge);border-radius:10px;
    padding:11px 14px;cursor:pointer;transition:border-color .15s,background .15s;
    display:flex;gap:10px;align-items:center;
  }
  .opt:hover:not(:disabled){border-color:var(--ink-faint)}
  .opt .key{font-family:var(--font-mono);font-size:12px;color:var(--ink-faint);width:16px;flex:none}
  .opt:disabled{cursor:default}
  .opt.correct{border-color:var(--ok);background:rgba(94,230,168,.1)}
  .opt.correct .key{color:var(--ok)}
  .opt.wrong{border-color:var(--bad);background:rgba(255,107,107,.1)}
  .opt.wrong .key{color:var(--bad)}
  .fb{margin-top:12px;font-size:13.5px;display:none;color:var(--ink-dim)}
  .fb.show{display:block}
  .fb b{color:var(--ink)}

  .summary{
    margin-top:16px;background:linear-gradient(180deg,var(--panel),var(--panel-2));
    border:1px solid var(--edge);border-radius:14px;padding:20px 22px;display:none;
  }
  .summary.show{display:block}
  .summary h3{margin:0 0 8px;font-size:17px}
  .summary p{margin:0 0 10px;color:var(--ink-dim);font-size:14px}
  .summary .rule{
    font-family:var(--font-mono);font-size:13px;color:var(--gold);
    border-left:2px solid var(--gold);padding-left:12px;margin:12px 0 0;
  }

  /* ---------- annotation pop-up ---------- */
  .tip{
    position:absolute;z-index:6;pointer-events:none;display:none;
    max-width:290px;background:#0b1116;border:1px solid var(--edge);border-radius:10px;
    padding:12px 14px;box-shadow:0 12px 34px rgba(0,0,0,.55);
  }
  .tip.show{display:block}
  .tip .tip-eyebrow{
    display:block;font-family:var(--font-mono);font-size:11px;letter-spacing:.14em;
    text-transform:uppercase;margin-bottom:7px;
  }
  .tip .tip-line{display:block;font-size:16px;line-height:1.4;color:var(--ink)}
  .note-hit{cursor:pointer}
  .note-hit:focus-visible{outline:2px solid var(--cool);outline-offset:2px}

  @media (prefers-reduced-motion:reduce){
    *{transition:none!important;animation:none!important}
  }
</style>
<style>html,body{background:transparent !important;}.wrap,.app{padding-top:8px !important;}</style>
</head>
<body>
<div class="wrap">

  <header class="app">
    <div>
      <p class="eyebrow">Load Variation Following Cold Load Pick-Up</p>
      <h1>Cold Load Pickup</h1>
    </div>
    <p class="sub">Walk the curve one phase at a time to see what the system actually draws when de-energized load is restored.</p>
  </header>

  <div class="stage">
    <!-- ============ CHART ============ -->
    <div class="card chart-card">
      <svg class="chart" viewBox="0 0 1000 560" role="img" aria-label="Cold load pickup curve: load in MVA versus time after pickup">
        <defs>
          <!-- color-temperature gradient along the trace: hot inrush -> cool steady -->
          <linearGradient id="traceGrad" gradientUnits="userSpaceOnUse" x1="175" y1="0" x2="820" y2="0">
            <stop offset="0"   stop-color="#ff6b35"/>
            <stop offset="0.22" stop-color="#ff9f1c"/>
            <stop offset="0.5" stop-color="#f4bf4a"/>
            <stop offset="1"   stop-color="#3fd8c4"/>
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- axes -->
        <line x1="118" y1="60" x2="118" y2="470" stroke="#3a4d5c" stroke-width="2"/>
        <line x1="118" y1="470" x2="942" y2="470" stroke="#3a4d5c" stroke-width="2"/>

        <!-- axis titles -->
        <text x="48" y="270" fill="#93a9ba" font-family="ui-monospace,monospace" font-size="15" letter-spacing="2" transform="rotate(-90 48 270)" text-anchor="middle">LOAD (MVA)</text>
        <text x="530" y="542" fill="#93a9ba" font-family="ui-monospace,monospace" font-size="15" letter-spacing="2" text-anchor="middle">TIME AFTER PICKUP</text>

        <!-- axis break squiggle between 3 SEC and 30 MIN -->
        <path d="M 590 470 q 8 -9 16 0 q 8 9 16 0" fill="none" stroke="#0e151b" stroke-width="8"/>
        <path d="M 590 470 q 8 -9 16 0 q 8 9 16 0" fill="none" stroke="#3a4d5c" stroke-width="2"/>

        <!-- Y grid + value labels (populated) -->
        <g id="yguides"></g>
        <!-- X ticks + labels (populated) -->
        <g id="xguides"></g>

        <!-- per-phase dashed guides -->
        <g id="guides"></g>
        <!-- trace segments -->
        <g id="trace" fill="none" stroke="url(#traceGrad)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></g>
        <!-- annotation callouts -->
        <g id="notes"></g>
        <!-- moving marker -->
        <g id="marker" opacity="0">
          <circle id="markerGlow" r="11" fill="#ff6b35" opacity="0.35" filter="url(#glow)"/>
          <circle id="markerDot" r="6.5" fill="#ff6b35" stroke="#0e151b" stroke-width="2"/>
        </g>
      </svg>

      <!-- enlarged annotation pop-up -->
      <div class="tip" id="tip" role="tooltip"></div>

      <!-- intro overlay -->
      <div class="intro" id="intro">
        <h3>Before pickup</h3>
        <p>A generator sits at steady state. Then a block of previously de-energized load is switched back on.</p>
        <p class="setup-eq">+10 MVA load added &nbsp;&rarr;&nbsp; watch what the system actually sees</p>
        <button class="btn primary" id="beginBtn">Begin cold load pickup</button>
      </div>
    </div>

    <!-- ============ TELEMETRY ============ -->
    <div class="card telem">
      <div>
        <div class="phase-tag" id="phaseTag">Standing by</div>
        <h2 id="phaseTitle">Ready when you are</h2>
      </div>
      <div class="readout">
        <div class="load-num" id="loadNum">&mdash;<span class="unit">MVA</span></div>
        <div class="chips">
          <span class="chip mult" id="multChip" style="display:none"></span>
          <span class="chip" id="timeChip">t = &mdash;</span>
        </div>
      </div>
      <p class="explain" id="explain">Press <b>Begin cold load pickup</b> to trace the load curve one phase at a time.</p>

      <details class="why">
        <summary>Behind the curve &mdash; the turbine</summary>
        <p>The instant that 95 MVA hits, the turbine slows. Its governor swings the control valves open to admit more energy and recover 3600&nbsp;rpm. As the load falls back over the next seconds, the valves close again to hold speed. Rule of thumb: don't pick up more than about <b style="color:var(--gold)">5% of a generator's capability</b> at any one time.</p>
      </details>
    </div>
  </div>

  <!-- ============ CONTROLS ============ -->
  <div class="controls">
    <div class="dots" id="dots" role="group" aria-label="Phase navigation"></div>
    <button class="btn" id="backBtn" disabled>Back</button>
    <button class="btn primary" id="nextBtn" disabled>Next phase</button>
    <button class="btn" id="replayBtn" style="display:none">Replay</button>
    <button class="btn cool" id="quizBtn" style="display:none">Check your understanding</button>
  </div>

  <!-- ============ QUIZ (Let Me Try) ============ -->
  <section class="quiz hidden" id="quiz" aria-label="Check your understanding">
    <h2>Check your understanding</h2>
    <p class="lead">Three quick questions on what the cold load curve told you.</p>
    <div id="quizList"></div>

    <div class="summary" id="finalSummary">
      <h3>Cold load pickup, in one breath</h3>
      <p>Restoring de-energized load draws a huge <b>inrush of roughly 10&times;</b> the actual load for about half a second, then decays as filaments heat and motors reach speed: <b>~3&times; at 0.5&nbsp;s</b>, <b>~2&times; at 3&nbsp;s</b>, settling to the real load once <b>load diversity</b> begins around <b>30&nbsp;minutes</b>.</p>
      <p class="rule">OPERATING GUIDELINE&nbsp;&middot;&nbsp;pick up &le; 5% of a generator's capability at any one time.</p>
    </div>
  </section>

</div>

<script>
(function(){
  "use strict";

  /* ---------- geometry helpers ---------- */
  var PLOT = { left:118, right:942, top:60, bottom:470 };
  function yFor(v){ return PLOT.bottom - (v/100)*(PLOT.bottom - PLOT.top); } // 0..100 MVA

  /* time-axis anchor x positions (non-linear, with a break before 30 min) */
  var X = { t0:175, t05:290, t3:470, t30:800, end:910 };

  function svgEl(tag,attrs){
    var e = document.createElementNS("http://www.w3.org/2000/svg",tag);
    for(var k in attrs){ if(attrs.hasOwnProperty(k)) e.setAttribute(k,attrs[k]); }
    return e;
  }

  /* ---------- phase data (from the SME walkthrough) ---------- */
  var PHASES = [
    {
      tag:"Phase 1 \\u00B7 t = 0",
      title:"Initial inrush",
      load:95, mult:"\\u00D710", time:"t = 0",
      color:"#ff6b35",
      x:X.t0, y:yFor(95),
      note:"INITIAL INRUSH",
      explain:"The instant cold load is energized, current surges to roughly <b>ten times</b> the load added. Transformer magnetizing inrush, locked-rotor current from every idle motor, and cold lamp filaments (very low resistance when cold) all draw at once."
    },
    {
      tag:"Phase 2 \\u00B7 t \\u2248 0.5 s",
      title:"Filaments heat, small motors spin up",
      load:33, mult:"\\u00D73", time:"t \\u2248 0.5 s",
      color:"#ff9f1c",
      x:X.t05, y:yFor(33),
      note:"Incandescent filaments reach\\noperating temperature \\u00B7\\nsmall motors up to speed",
      explain:"Within about half a second the inrush collapses. Incandescent filaments reach operating temperature so their resistance climbs and current drops, and small motors come up to speed. Load falls to about <b>three times</b> the load added."
    },
    {
      tag:"Phase 3 \\u00B7 t \\u2248 3 s",
      title:"Large motors up to speed",
      load:18, mult:"\\u00D72", time:"t \\u2248 3 s",
      color:"#f4bf4a",
      x:X.t3, y:yFor(18),
      note:"Large motors\\nup to speed",
      explain:"A few seconds later the large motors finish accelerating and stop drawing starting current. Load eases to roughly <b>double</b> the load added."
    },
    {
      tag:"Phase 4 \\u00B7 t \\u2248 30 min",
      title:"Load diversity begins",
      load:10, mult:"\\u00D71", time:"t \\u2248 30 min",
      color:"#3fd8c4",
      x:X.t30, y:yFor(10),
      note:"Diversity in load\\ncycling begins",
      explain:"Over the next half hour devices fall out of sync \\u2014 thermostats and cycling loads no longer switch on all together. Load <b>diversity</b> returns and the demand settles to the real <b>~10 MVA</b> that was added."
    }
  ];

  /* ---------- build static Y guides + labels ---------- */
  var yg = document.getElementById("yguides");
  [0,10,18,33,95].forEach(function(v){
    var y = yFor(v);
    var t = svgEl("text",{x:PLOT.left-12,y:y+5,fill:"#a8bccb","font-family":"ui-monospace,monospace","font-size":16,"text-anchor":"end"});
    t.textContent = v;
    yg.appendChild(t);
  });

  /* ---------- build X ticks + labels ---------- */
  var xg = document.getElementById("xguides");
  [[X.t0,"0"],[X.t05,"0.5 SEC"],[X.t3,"3 SEC"],[X.t30,"30 MIN"]].forEach(function(p){
    var tick = svgEl("line",{x1:p[0],y1:PLOT.bottom,x2:p[0],y2:PLOT.bottom+7,stroke:"#3a4d5c","stroke-width":2});
    var t = svgEl("text",{x:p[0],y:PLOT.bottom+26,fill:"#a8bccb","font-family":"ui-monospace,monospace","font-size":15,"text-anchor":"middle"});
    t.textContent = p[1];
    xg.appendChild(tick); xg.appendChild(t);
  });

  /* ---------- trace segment path definitions ---------- */
  var P = PHASES;
  var SEGMENTS = [
    // phase 1: inrush spike rising to the peak
    "M "+P[0].x+" "+PLOT.bottom+" L "+P[0].x+" "+P[0].y,
    // phase 2: steep decay 95 -> 33
    "M "+P[0].x+" "+P[0].y+" C 205 300 250 "+(P[1].y-6)+" "+P[1].x+" "+P[1].y,
    // phase 3: gentler decay 33 -> 18
    "M "+P[1].x+" "+P[1].y+" C 360 375 415 "+(P[2].y-3)+" "+P[2].x+" "+P[2].y,
    // phase 4: near-flat slope across the break 18 -> 10, then a small diversity ripple
    "M "+P[2].x+" "+P[2].y+" C 560 405 640 "+P[3].y+" "+P[3].x+" "+P[3].y+
      " q 22 -7 44 0 q 22 7 44 0 q 12 4 22 1"
  ];

  var traceG = document.getElementById("trace");
  var segEls = SEGMENTS.map(function(d){
    var path = svgEl("path",{d:d});
    traceG.appendChild(path);
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.transition = "stroke-dashoffset .75s ease";
    path._len = len;
    return path;
  });

  /* ---------- per-phase dashed guides ---------- */
  var guidesG = document.getElementById("guides");
  var guideEls = PHASES.map(function(ph){
    var g = svgEl("g",{opacity:0});
    var h = svgEl("line",{x1:PLOT.left,y1:ph.y,x2:ph.x,y2:ph.y,stroke:ph.color,"stroke-width":1,"stroke-dasharray":"4 4",opacity:.55});
    var v = svgEl("line",{x1:ph.x,y1:ph.y,x2:ph.x,y2:PLOT.bottom,stroke:ph.color,"stroke-width":1,"stroke-dasharray":"4 4",opacity:.55});
    g.appendChild(h); g.appendChild(v);
    g.style.transition="opacity .5s ease";
    guidesG.appendChild(g);
    return g;
  });

  /* ---------- annotation callouts ---------- */
  var notesG = document.getElementById("notes");
  var NOTE_POS = [
    {lx:258, ly:118, ax:P[0].x, ay:P[0].y, align:"start"},
    {lx:336, ly:214, ax:P[1].x, ay:P[1].y, align:"start"},
    {lx:512, ly:346, ax:P[2].x, ay:P[2].y, align:"start"},
    {lx:706, ly:384, ax:P[3].x, ay:P[3].y, align:"start"}
  ];
  var noteEls = PHASES.map(function(ph,i){
    var pos = NOTE_POS[i];
    var g = svgEl("g",{opacity:0});
    g.style.transition="opacity .5s ease";
    var leader = svgEl("line",{x1:pos.lx-4,y1:pos.ly+4,x2:pos.ax,y2:pos.ay,stroke:ph.color,"stroke-width":1.25,opacity:.7});
    g.appendChild(leader);
    var lines = ph.note.split("\\n");
    var txt = svgEl("text",{x:pos.lx,y:pos.ly,fill:"#e6eef5","font-family":"ui-monospace,monospace","font-size":16.5,"text-anchor":pos.align});
    lines.forEach(function(ln,k){
      var ts = svgEl("tspan",{x:pos.lx,dy:k===0?0:21});
      ts.textContent = ln;
      txt.appendChild(ts);
    });
    g.appendChild(txt);
    notesG.appendChild(g);
    return g;
  });

  /* ---------- enlarged annotation pop-up (hover / tap) ---------- */
  var chartCard = document.querySelector(".chart-card");
  var tip = document.getElementById("tip");

  function escapeHtml(s){
    return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  // add a padded transparent hit area over each label so the whole region is hoverable
  var hitEls = PHASES.map(function(ph,i){
    var g = noteEls[i];
    var txt = g.querySelector("text");
    var leader = g.querySelector("line");
    txt.setAttribute("pointer-events","none");
    if(leader) leader.setAttribute("pointer-events","none");
    var bb = txt.getBBox();
    var pad = 14;
    var hit = svgEl("rect",{
      x:bb.x-pad, y:bb.y-pad, width:bb.width+2*pad, height:bb.height+2*pad,
      rx:6, fill:"transparent"
    });
    hit.setAttribute("class","note-hit");
    hit.setAttribute("pointer-events","all");
    hit.setAttribute("tabindex","0");
    hit.setAttribute("role","button");
    hit.setAttribute("aria-label","Enlarge annotation: "+ph.note.replace(/\\n/g," "));
    g.appendChild(hit); // sits on top of the text, spans the full padded box
    hit.addEventListener("mouseenter", function(){ showTip(i); });
    hit.addEventListener("mouseleave", hideTip);
    hit.addEventListener("focus", function(){ showTip(i); });
    hit.addEventListener("blur", hideTip);
    hit.addEventListener("click", function(e){ e.stopPropagation(); showTip(i); });
    return hit;
  });

  function showTip(i){
    if(i>state) return;                 // only reveal labels already shown
    var d = PHASES[i];
    tip.innerHTML =
      '<span class="tip-eyebrow" style="color:'+d.color+'">'+escapeHtml(d.tag)+'</span>'+
      d.note.split("\\n").map(function(l){ return '<span class="tip-line">'+escapeHtml(l)+'</span>'; }).join("");
    tip.classList.add("show");
    positionTip(hitEls[i]);
  }
  function hideTip(){ tip.classList.remove("show"); }

  function positionTip(target){
    var card = chartCard.getBoundingClientRect();
    var r = target.getBoundingClientRect();
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var cx = (r.left + r.width/2) - card.left;
    var minX = tw/2 + 8, maxX = card.width - tw/2 - 8;
    if(maxX < minX){ maxX = minX = card.width/2; }
    cx = Math.max(minX, Math.min(maxX, cx));
    tip.style.left = cx + "px";
    if((r.top - card.top) - th - 12 >= 4){         // room above the label
      tip.style.top = ((r.top - card.top) - 10) + "px";
      tip.style.transform = "translate(-50%,-100%)";
    } else {                                        // otherwise drop below
      tip.style.top = ((r.bottom - card.top) + 10) + "px";
      tip.style.transform = "translate(-50%,0)";
    }
  }

  // dismiss on outside tap (touch) or Escape
  document.addEventListener("pointerdown", function(e){
    if(!e.target.closest || !e.target.closest(".note-hit")) hideTip();
  });
  document.addEventListener("keydown", function(e){ if(e.key==="Escape") hideTip(); });

  /* ---------- marker ---------- */
  var marker = document.getElementById("marker");
  var mGlow = document.getElementById("markerGlow");
  var mDot = document.getElementById("markerDot");
  marker.style.transition = "transform .75s ease";

  /* ---------- state + wiring ---------- */
  var state = -1; // -1 = intro, 0..3 = phases
  var maxReached = -1;
  var intro = document.getElementById("intro");
  var beginBtn = document.getElementById("beginBtn");
  var backBtn = document.getElementById("backBtn");
  var nextBtn = document.getElementById("nextBtn");
  var replayBtn = document.getElementById("replayBtn");
  var quizBtn = document.getElementById("quizBtn");

  var dotsWrap = document.getElementById("dots");
  var dotEls = PHASES.map(function(ph,i){
    var b = document.createElement("button");
    b.className="dot"; b.type="button";
    b.setAttribute("aria-label","Go to phase "+(i+1)+": "+ph.title);
    b.addEventListener("click",function(){ if(i<=maxReached) goTo(i); });
    dotsWrap.appendChild(b);
    return b;
  });

  function setTelem(tag,title,load,time,mult,explain){
    document.getElementById("phaseTag").textContent = tag;
    document.getElementById("phaseTitle").textContent = title;
    document.getElementById("loadNum").innerHTML = load + '<span class="unit">MVA</span>';
    document.getElementById("timeChip").textContent = time;
    var mc = document.getElementById("multChip");
    if(mult){ mc.style.display="inline-block"; mc.textContent=mult.mult; mc.style.background=mult.color; }
    else mc.style.display="none";
    document.getElementById("explain").innerHTML = explain;
  }

  function render(){
    hideTip();
    segEls.forEach(function(p,i){
      p.style.strokeDashoffset = (i<=state) ? 0 : p._len;
    });
    PHASES.forEach(function(ph,i){
      var on = i<=state;
      guideEls[i].setAttribute("opacity", on?1:0);
      noteEls[i].setAttribute("opacity", on ? (i===state?1:0.5) : 0);
      noteEls[i].style.pointerEvents = on ? "auto" : "none";
    });

    if(state<0){
      marker.setAttribute("opacity",0);
      setTelem("Standing by","Ready when you are","\\u2014","t = \\u2014",null,
        "Press <b>Begin cold load pickup</b> to trace the load curve one phase at a time.");
    } else {
      var ph = PHASES[state];
      marker.setAttribute("opacity",1);
      marker.style.transform = "translate("+ph.x+"px,"+ph.y+"px)";
      mGlow.setAttribute("fill",ph.color);
      mDot.setAttribute("fill",ph.color);
      setTelem(ph.tag, ph.title, ph.load, ph.time, {mult:ph.mult,color:ph.color}, ph.explain);
    }

    dotEls.forEach(function(d,i){
      d.classList.toggle("done", i<maxReached && i!==state);
      if(i===state) d.setAttribute("aria-current","true"); else d.removeAttribute("aria-current");
    });

    backBtn.disabled = state<0;
    var atEnd = state>=PHASES.length-1;
    nextBtn.disabled = atEnd;
    nextBtn.style.display = atEnd ? "none":"inline-block";
    replayBtn.style.display = state>=0 ? "inline-block":"none";
    quizBtn.style.display = maxReached>=PHASES.length-1 ? "inline-block":"none";
  }

  function goTo(i){
    state = Math.max(-1, Math.min(PHASES.length-1, i));
    if(state>maxReached) maxReached = state;
    render();
  }
  function begin(){ intro.classList.add("hidden"); goTo(0); }

  beginBtn.addEventListener("click", begin);
  nextBtn.addEventListener("click", function(){ goTo(state+1); });
  backBtn.addEventListener("click", function(){
    if(state===0){ state=-1; intro.classList.remove("hidden"); render(); }
    else goTo(state-1);
  });
  replayBtn.addEventListener("click", function(){
    state=-1; render();
    setTimeout(function(){ intro.classList.remove("hidden"); },80);
  });

  document.addEventListener("keydown", function(e){
    if(e.target.tagName==="BUTTON"||e.target.tagName==="SUMMARY") return;
    if(e.key==="ArrowRight" && state>=0 && state<PHASES.length-1) goTo(state+1);
    if(e.key==="ArrowLeft" && state>0) goTo(state-1);
  });

  /* ---------- quiz (Let Me Try) ---------- */
  var QUIZ = [
    {
      q:"What is the maximum inrush current expected with cold load?",
      opts:["About 2\\u00D7 the load added","About 5\\u00D7 the load added","About 10\\u00D7 the load added","About 20\\u00D7 the load added"],
      answer:2,
      fb:"The initial inrush peaks at roughly <b>ten times</b> the load added \\u2014 magnetizing inrush, motor locked-rotor current, and cold filaments all drawing at once."
    },
    {
      q:"When the initial inrush ends (~0.5 s), the load drops to about\\u2026",
      opts:["The exact load added (1\\u00D7)","About 3\\u00D7 the load added","About 5\\u00D7 the load added","It stays near 10\\u00D7"],
      answer:1,
      fb:"At ~0.5 s it falls to about <b>3\\u00D7</b> as filaments heat and small motors reach speed, then to about <b>2\\u00D7</b> by ~3 s as large motors finish spinning up."
    },
    {
      q:"About how long until the load stabilizes to the load added (load diversity begins)?",
      opts:["About 0.5 seconds","About 3 seconds","About 30 seconds","About 30 minutes"],
      answer:3,
      fb:"It takes about <b>30 minutes</b> for cycling loads to fall out of sync so demand settles to the real load added."
    }
  ];

  var quizSection = document.getElementById("quiz");
  var quizList = document.getElementById("quizList");
  var answered = 0;

  QUIZ.forEach(function(item,qi){
    var card = document.createElement("div"); card.className="q";
    var num = document.createElement("div"); num.className="qnum"; num.textContent="Question "+(qi+1)+" of "+QUIZ.length;
    var qt = document.createElement("div"); qt.className="qtext"; qt.textContent=item.q;
    var opts = document.createElement("div"); opts.className="opts";
    var fb = document.createElement("div"); fb.className="fb";
    var locked=false;
    item.opts.forEach(function(text,oi){
      var b=document.createElement("button"); b.className="opt"; b.type="button";
      var key=document.createElement("span"); key.className="key"; key.textContent=String.fromCharCode(65+oi);
      var label=document.createElement("span"); label.textContent=text;
      b.appendChild(key); b.appendChild(label);
      b.addEventListener("click",function(){
        if(locked) return; locked=true;
        var buttons=opts.querySelectorAll(".opt");
        for(var j=0;j<buttons.length;j++){ buttons[j].disabled=true; }
        buttons[item.answer].classList.add("correct");
        if(oi!==item.answer) b.classList.add("wrong");
        fb.innerHTML = (oi===item.answer?"<b>Correct. </b>":"<b>Not quite. </b>")+item.fb;
        fb.classList.add("show");
        answered++;
        if(answered===QUIZ.length){
          document.getElementById("finalSummary").classList.add("show");
          signalComplete();
        }
      });
      opts.appendChild(b);
    });
    card.appendChild(num); card.appendChild(qt); card.appendChild(opts); card.appendChild(fb);
    quizList.appendChild(card);
  });

  quizBtn.addEventListener("click",function(){
    quizSection.classList.remove("hidden");
    quizSection.scrollIntoView({behavior:"smooth",block:"start"});
  });

  /* ---------- Rise 360 / Storyline completion signal (optional) ----------
     Fires once all questions are answered. Safe no-op outside an LMS frame. */
  function signalComplete(){
    try{
      if(window.parent && window.parent!==window){
        window.parent.postMessage({type:"cold-load-pickup",status:"complete"},"*");
      }
    }catch(e){/* sandboxed frame - ignore */}
  }

  render();
})();
</script>
</body>
</html>
`;
  var f = document.createElement('iframe');
  f.title = "Cold Load Pickup — guided walkthrough";
  f.setAttribute('scrolling', 'no');
  f.loading = 'lazy';
  f.style.cssText = 'width:100%;border:0;display:block;background:transparent;min-height:340px';
  f.srcdoc = HTML;
  mount.appendChild(f);

  function size() {
    try {
      var d = f.contentDocument || (f.contentWindow && f.contentWindow.document);
      if (!d) return;
      var h = Math.max(
        d.documentElement ? d.documentElement.scrollHeight : 0,
        d.body ? d.body.scrollHeight : 0);
      if (h) f.style.height = h + 'px';
    } catch (e) { /* cross-frame guard */ }
  }
  f.addEventListener('load', function () {
    size();
    try {
      var d = f.contentDocument;
      if (window.ResizeObserver && d && d.body) { new ResizeObserver(size).observe(d.body); }
    } catch (e) {}
    setTimeout(size, 250); setTimeout(size, 800);
  });
};
