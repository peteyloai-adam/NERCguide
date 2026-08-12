/* ============================================================================
   INTERACTIVE: Ferranti Rise — open-end line voltage vs. length
   Auto-embedded (build-embed.js) from ferranti-rise-interactive.html.

   Rendered in an isolated, auto-sizing <iframe srcdoc>. This preserves the
   original single-file interactive exactly — its own styles, scripts, event
   listeners, and animation loop all stay contained inside the frame, so nothing
   collides with the console CSS and no listeners leak across navigation. The
   frame height tracks the inner content via ResizeObserver.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.ferrantiRise = function (mount) {
  var HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Ferranti Rise — Open-End Line Voltage vs. Length</title>
<style>
  :root{
    --ink:#16202B;          /* axes, primary text */
    --muted:#5B6672;        /* secondary text */
    --hair:#E6EAEF;         /* gridlines */
    --panel:#FFFFFF;        /* card surface */
    --field:#F4F6F9;        /* inset surfaces */
    --line345:#E8743B;      /* 345 kV curve (amber) */
    --line138:#1F6FA8;      /* 138 kV curve (steel blue) */
    --warn:#C8870B;         /* +2% threshold */
    --alert:#C0392B;        /* +5% threshold */
    --ok:#2E7D55;
    --shadow:0 1px 2px rgba(16,32,43,.06),0 8px 28px rgba(16,32,43,.10);
    --mono:ui-monospace,"SF Mono",SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;
    --sans:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }
  *{box-sizing:border-box}
  html,body{margin:0;height:100%;background:transparent}
  body{
    font-family:var(--sans);color:var(--ink);
    display:flex;align-items:center;justify-content:center;
    padding:14px;-webkit-font-smoothing:antialiased;
  }
  .card{
    width:100%;max-width:980px;background:var(--panel);
    border:1px solid var(--hair);border-radius:16px;box-shadow:var(--shadow);
    overflow:hidden;
  }
  /* header */
  .head{padding:18px 22px 12px;border-bottom:1px solid var(--hair)}
  .eyebrow{
    font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
    color:var(--line345);margin:0 0 4px;
  }
  .title{font-size:21px;font-weight:650;letter-spacing:-.01em;margin:0;line-height:1.15}
  .sub{margin:5px 0 0;font-size:13px;color:var(--muted);line-height:1.45;max-width:64ch}

  /* body grid */
  .body{display:grid;grid-template-columns:1.55fr 1fr;gap:0}
  .plotwrap{padding:14px 8px 6px 14px;min-width:0}
  svg{display:block;width:100%;height:auto}

  .panel{
    border-left:1px solid var(--hair);padding:18px 20px 16px;
    display:flex;flex-direction:column;gap:14px;
  }
  /* gauge readout */
  .gauge{background:var(--field);border-radius:12px;padding:14px 16px}
  .gauge .lab{font-size:10.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)}
  .gauge .kv{font-family:var(--mono);font-size:38px;font-weight:600;line-height:1;letter-spacing:-.02em;margin:6px 0 2px}
  .gauge .kv span{font-size:16px;color:var(--muted);font-weight:500;margin-left:4px}
  .gauge .rise{font-family:var(--mono);font-size:15px;font-weight:600}
  .pill{
    display:inline-flex;align-items:center;gap:6px;margin-top:10px;
    font-size:12px;font-weight:650;padding:4px 10px;border-radius:999px;
    background:#EAF3EE;color:var(--ok);
  }
  .pill .dot{width:7px;height:7px;border-radius:50%;background:currentColor}

  /* class toggle */
  .group-lab{font-size:10.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin-bottom:7px}
  .seg{display:flex;background:var(--field);border-radius:10px;padding:3px;gap:3px}
  .seg button{
    flex:1;border:0;background:transparent;cursor:pointer;
    font-family:var(--sans);font-size:13px;font-weight:650;color:var(--muted);
    padding:8px 6px;border-radius:8px;transition:background .15s,color .15s,box-shadow .15s;
  }
  .seg button[aria-pressed="true"]{background:#fff;color:var(--ink);box-shadow:0 1px 2px rgba(16,32,43,.12)}
  .seg button:focus-visible{outline:2px solid var(--line138);outline-offset:2px}

  /* thresholds */
  .thresholds{display:flex;flex-direction:column;gap:8px}
  .chip{
    display:flex;align-items:center;justify-content:space-between;gap:8px;
    border:1px solid var(--hair);background:#fff;border-radius:10px;
    padding:9px 12px;cursor:pointer;text-align:left;font-family:var(--sans);
    transition:border-color .15s,background .15s;
  }
  .chip:hover{background:var(--field)}
  .chip:focus-visible{outline:2px solid var(--line138);outline-offset:2px}
  .chip .name{font-size:12.5px;font-weight:650}
  .chip .meta{font-family:var(--mono);font-size:11.5px;color:var(--muted)}
  .chip .swatch{width:9px;height:9px;border-radius:2px;flex:0 0 auto}
  .chip.lit{border-color:currentColor;background:rgba(0,0,0,.015)}
  .chip.warn{color:var(--warn)} .chip.alert{color:var(--alert)}
  .chip .name,.chip .meta{color:var(--ink)}
  .chip.lit .name{color:currentColor}

  /* guided walkthrough bar */
  .guide{
    display:flex;align-items:center;gap:14px;justify-content:space-between;
    padding:13px 22px;border-top:1px solid var(--hair);background:var(--field);
  }
  .cap{margin:0;font-size:13px;line-height:1.5;color:var(--ink);max-width:62ch;min-height:1.5em}
  .cap b{font-weight:650}
  .cap.s2{color:var(--warn)} .cap.s3{color:var(--alert)}
  .gctl{display:flex;gap:8px;flex:0 0 auto}
  .gbtn{
    border:1px solid var(--hair);background:#fff;border-radius:9px;cursor:pointer;
    font-family:var(--sans);font-size:12.5px;font-weight:650;color:var(--ink);
    padding:9px 14px;white-space:nowrap;display:inline-flex;align-items:center;gap:7px;
    transition:background .15s,border-color .15s,opacity .15s;
  }
  .gbtn:hover{background:var(--field)}
  .gbtn.primary{background:var(--ink);color:#fff;border-color:var(--ink)}
  .gbtn.primary:hover{background:#0d1620}
  .gbtn.ghost{color:var(--muted)}
  .gbtn:focus-visible{outline:2px solid var(--line138);outline-offset:2px}
  .scrub.locked{opacity:.45;pointer-events:none}

  /* slider */
  .scrub{padding:6px 22px 18px}
  .scrub .row{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px}
  .scrub .row .l{font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)}
  .scrub .row .v{font-family:var(--mono);font-size:14px;font-weight:600}
  input[type=range]{
    -webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:999px;
    background:linear-gradient(var(--hair),var(--hair));outline:none;margin:4px 0;
  }
  input[type=range]::-webkit-slider-thumb{
    -webkit-appearance:none;width:22px;height:22px;border-radius:50%;
    background:#fff;border:2px solid var(--ink);box-shadow:0 1px 3px rgba(16,32,43,.3);cursor:pointer;
  }
  input[type=range]::-moz-range-thumb{
    width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid var(--ink);
    box-shadow:0 1px 3px rgba(16,32,43,.3);cursor:pointer;
  }
  input[type=range]:focus-visible{box-shadow:0 0 0 3px rgba(31,111,168,.35)}
  .ticks{display:flex;justify-content:space-between;font-family:var(--mono);font-size:10px;color:var(--muted);margin-top:2px}

  /* footer */
  .foot{display:flex;align-items:center;justify-content:space-between;gap:12px;
    padding:12px 22px 16px;border-top:1px solid var(--hair)}
  .note{font-size:12px;color:var(--muted);line-height:1.5;max-width:60ch}
  .note b{color:var(--ink);font-weight:650}

  /* svg element styling */
  .grid{stroke:var(--hair);stroke-width:1}
  .axis{stroke:var(--ink);stroke-width:1.4}
  .axtxt{fill:var(--muted);font-family:var(--mono);font-size:11px}
  .axttl{fill:var(--ink);font-family:var(--sans);font-size:11px;font-weight:700;letter-spacing:.04em}
  .thr{stroke-width:1.5;stroke-dasharray:2 4;fill:none}
  .thrlbl{font-family:var(--mono);font-size:11px;font-weight:600}
  .curve{fill:none;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round}
  .cross{stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3;opacity:.85}
  .dot{stroke:#fff;stroke-width:2.5}
  .pin{fill:var(--ink)}

  @media (max-width:680px){
    .body{grid-template-columns:1fr}
    .panel{border-left:0;border-top:1px solid var(--hair)}
    .title{font-size:19px}
    .foot{flex-direction:column;align-items:flex-start}
    .guide{flex-direction:column;align-items:flex-start}
    .gctl{width:100%}
  }
  @media (prefers-reduced-motion:reduce){
    .curve{transition:none !important}
  }
</style>
<style>html,body{background:transparent !important;}.wrap,.app{padding-top:8px !important;}:root{--ink:#C9D6E4;--muted:#7E8DA0;--hair:#2A3648;--panel:#121821;--field:#1A2230;--line345:#E0A83E;--line138:#56C2E6;--warn:#E0A83E;--alert:#E5484D;--ok:#3FB98C;--shadow:0 1px 2px rgba(0,0,0,.45),0 8px 28px rgba(0,0,0,.55);}body{background:transparent;color:#C9D6E4;}.seg button[aria-pressed="true"]{background:#212C3D;color:#C9D6E4;box-shadow:none;}.chip{background:#1A2230;}.chip.lit{background:#212C3D;}.pill{background:#16281F;}.gbtn{background:#1A2230;color:#C9D6E4;}.gbtn.primary{background:#56C2E6;color:#0B0F14;border-color:#56C2E6;}.gbtn.primary:hover{background:#2E6E85;color:#C9D6E4;}input[type=range]::-webkit-slider-thumb{background:#C9D6E4;border-color:#56C2E6;}input[type=range]::-moz-range-thumb{background:#C9D6E4;border-color:#56C2E6;}input[type=range]:focus-visible{box-shadow:0 0 0 3px rgba(86,194,230,.35);}.dot{stroke:#0B0F14;}</style>
</head>
<body>
<div class="card" role="group" aria-label="Interactive Ferranti rise graph">
  <div class="head">
    <p class="eyebrow">Ferranti Effect</p>
    <h1 class="title">Open-End Line Voltage vs. Length</h1>
    <p class="sub">On a long, lightly-loaded line with the far end open, charging current through the line's inductance pushes the receiving-end voltage <em>above</em> the sending end. The rise grows with line length — drag the scrubber to see where the +2% and +5% limits are reached.</p>
  </div>

  <div class="body">
    <div class="plotwrap">
      <svg id="chart" viewBox="0 0 720 470" role="img"
           aria-label="Graph of open-end voltage rise versus line length in miles, with 345 kV scale on the left and 138 kV scale on the right.">
        <!-- built by JS -->
      </svg>
    </div>

    <div class="panel">
      <div class="gauge">
        <div class="lab">Open-end voltage</div>
        <div class="kv"><span id="g-class" style="color:var(--line345)">345&nbsp;kV&nbsp;·&nbsp;</span><span id="g-kv" style="color:var(--ink);font-size:38px;margin:0">352</span><span>kV</span></div>
        <div class="rise" id="g-rise" style="color:var(--warn)">+2.1% rise · +7 kV</div>
        <span class="pill" id="g-pill"><span class="dot"></span><span id="g-status">Normal</span></span>
      </div>

      <div>
        <div class="group-lab">Voltage class</div>
        <div class="seg" role="group" aria-label="Select voltage class">
          <button id="b345" aria-pressed="true">345 kV</button>
          <button id="b138" aria-pressed="false">138 kV</button>
        </div>
      </div>

      <div>
        <div class="group-lab">Voltage limits · max line length</div>
        <div class="thresholds">
          <button class="chip warn" id="chip2">
            <span style="display:flex;align-items:center;gap:8px">
              <span class="swatch" style="background:var(--warn)"></span>
              <span class="name">+2% of scheduled voltage</span>
            </span>
            <span class="meta" id="m2">≤ 98 mi</span>
          </button>
          <button class="chip alert" id="chip5">
            <span style="display:flex;align-items:center;gap:8px">
              <span class="swatch" style="background:var(--alert)"></span>
              <span class="name">+5% voltage limit</span>
            </span>
            <span class="meta" id="m5">≤ 153 mi</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="guide" id="guide">
    <p class="cap" id="cap"><b>Drag the scrubber</b> to set line length, or press <b>Show me</b> for a guided walkthrough.</p>
    <div class="gctl">
      <button class="gbtn primary" id="gstart">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        Show me
      </button>
      <button class="gbtn" id="gnext" hidden>Next →</button>
      <button class="gbtn ghost" id="gfree" hidden>Free explore</button>
    </div>
  </div>

  <div class="scrub">
    <div class="row">
      <span class="l">Miles of line</span>
      <span class="v"><span id="s-miles">100</span> mi</span>
    </div>
    <input id="slider" type="range" min="0" max="200" step="1" value="100"
           aria-label="Line length in miles" aria-valuetext="100 miles">
    <div class="ticks"><span>0</span><span>50</span><span>100</span><span>150</span><span>200</span></div>
  </div>

  <div class="foot">
    <p class="note"><b>Why operators care:</b> an unloaded line acts like a capacitor, so energizing a long line with the far end open can push that end past voltage-schedule limits before any load is picked up. Length sets how far it climbs.</p>
  </div>
</div>

<script>
(function(){
  "use strict";

  // ---- Physics: lossless open-ended line, Ferranti relation V_r/V_s = 1/cos(beta*L) ----
  // beta = 2*pi*f / v ; overhead line propagation ~ speed of light (186,000 mi/s)
  var f = 60, v = 186000;
  var beta = (2*Math.PI*f)/v;                  // rad per mile
  function riseFactor(mi){ return 1/Math.cos(beta*mi); }      // V_open / V_nominal
  function risePct(mi){ return (riseFactor(mi)-1)*100; }
  // length (miles) at which a given % rise occurs
  function milesForPct(p){ return Math.acos(1/(1+p/100))/beta; }

  // ---- Geometry ----
  var W=720, H=470, mL=58, mR=58, mT=24, mB=58;
  var x0=mL, x1=W-mR, y0=mT, y1=H-mB;          // plot rectangle
  var MILES_MAX=200, PCT_MAX=10;               // axis ranges
  function px(mi){ return x0 + (mi/MILES_MAX)*(x1-x0); }
  function py(p){ return y1 - (p/PCT_MAX)*(y1-y0); }

  var classes = {
    "345": { nom:345, color:"var(--line345)", varname:"--line345" },
    "138": { nom:138, color:"var(--line138)", varname:"--line138" }
  };

  var state = { miles:100, cls:"345", mode:"explore", step:0 };
  var thrEls = {};
  // completion tracking (signals Rise when the interaction is done)
  var completed=false, crossed5=false, seenClasses={"345":true};
  var svg = document.getElementById("chart");
  var SVGNS="http://www.w3.org/2000/svg";
  function el(name,attrs){ var e=document.createElementNS(SVGNS,name); for(var k in attrs) e.setAttribute(k,attrs[k]); return e; }
  function reduceMotion(){ return window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches; }

  // ---- Build static chart scaffold once ----
  var curvePath, marker={};
  function buildChart(){
    while(svg.firstChild) svg.removeChild(svg.firstChild);

    // horizontal gridlines + dual y-axis labels at 0,2,4,6,8,10 %
    for(var p=0;p<=PCT_MAX;p+=2){
      var y=py(p);
      svg.appendChild(el("line",{class:"grid",x1:x0,y1:y,x2:x1,y2:y}));
      var kvL=Math.round(classes["345"].nom*(1+p/100));
      var kvR=Math.round(classes["138"].nom*(1+p/100));
      var tl=el("text",{class:"axtxt",x:x0-8,y:y+3.5,"text-anchor":"end"}); tl.textContent=kvL; svg.appendChild(tl);
      var tr=el("text",{class:"axtxt",x:x1+8,y:y+3.5,"text-anchor":"start"}); tr.textContent=kvR; svg.appendChild(tr);
    }
    // vertical gridlines + x labels every 25 mi (label every 50)
    for(var mi=0;mi<=MILES_MAX;mi+=25){
      var x=px(mi);
      svg.appendChild(el("line",{class:"grid",x1:x,y1:y0,x2:x,y2:y1}));
      if(mi%50===0){ var tx=el("text",{class:"axtxt",x:x,y:y1+18,"text-anchor":"middle"}); tx.textContent=mi; svg.appendChild(tx); }
    }
    // axes
    svg.appendChild(el("line",{class:"axis",x1:x0,y1:y0,x2:x0,y2:y1}));
    svg.appendChild(el("line",{class:"axis",x1:x1,y1:y0,x2:x1,y2:y1}));
    svg.appendChild(el("line",{class:"axis",x1:x0,y1:y1,x2:x1,y2:y1}));

    // axis titles
    var t1=el("text",{class:"axttl",x:x0,y:y0-9,"text-anchor":"start"}); t1.textContent="345 kV"; svg.appendChild(t1);
    var t2=el("text",{class:"axttl",x:x1,y:y0-9,"text-anchor":"end"}); t2.textContent="138 kV"; svg.appendChild(t2);
    var tx2=el("text",{class:"axttl",x:(x0+x1)/2,y:H-12,"text-anchor":"middle"}); tx2.textContent="MILES OF LINE"; svg.appendChild(tx2);

    // threshold lines: +2% and +5%
    thrEls[2]=addThreshold(2,"var(--warn)","+2%");
    thrEls[5]=addThreshold(5,"var(--alert)","+5%");

    // curve
    var d="M";
    for(var s=0;s<=MILES_MAX;s+=2){ d+=" "+px(s).toFixed(1)+" "+py(risePct(s)).toFixed(1); }
    curvePath=el("path",{class:"curve",d:d,stroke:classes[state.cls].color});
    svg.appendChild(curvePath);

    // marker group (crosshair + dot + x pin)
    marker.vline=el("line",{class:"cross"});
    marker.hline=el("line",{class:"cross"});
    marker.pin=el("path",{class:"pin",d:"M0,0 l-5,-9 l10,0 z"});      // little triangle on x-axis
    marker.dot=el("circle",{class:"dot",r:6,fill:classes[state.cls].color});
    marker.group=el("g",{});
    marker.group.appendChild(marker.vline); marker.group.appendChild(marker.hline);
    marker.group.appendChild(marker.pin);   marker.group.appendChild(marker.dot);
    svg.appendChild(marker.group);

    animateCurve();
    updateMarker();
  }

  function addThreshold(p,color,label){
    var y=py(p);
    var g=el("g",{});
    g.appendChild(el("line",{class:"thr",x1:x0,y1:y,x2:x1,y2:y,stroke:color}));
    var t=el("text",{class:"thrlbl",x:x0+6,y:y-5,fill:color}); t.textContent=label; g.appendChild(t);
    svg.appendChild(g);
    return g;
  }

  function animateCurve(){
    if(reduceMotion()){ curvePath.style.strokeDasharray="none"; return; }
    var len=curvePath.getTotalLength();
    curvePath.style.transition="none";
    curvePath.style.strokeDasharray=len+" "+len;
    curvePath.style.strokeDashoffset=len;
    // force reflow then animate
    curvePath.getBoundingClientRect();
    curvePath.style.transition="stroke-dashoffset 1100ms cubic-bezier(.22,.61,.36,1)";
    curvePath.style.strokeDashoffset="0";
  }

  function updateMarker(){
    var mi=state.miles, p=risePct(mi);
    var x=px(mi), y=py(Math.min(p,PCT_MAX));
    marker.dot.setAttribute("cx",x); marker.dot.setAttribute("cy",y);
    marker.dot.setAttribute("fill",classes[state.cls].color);
    marker.vline.setAttribute("x1",x); marker.vline.setAttribute("x2",x);
    marker.vline.setAttribute("y1",y); marker.vline.setAttribute("y2",y1);
    // horizontal crosshair toward the ACTIVE class's axis
    var toRight = state.cls==="138";
    marker.hline.setAttribute("x1",x); marker.hline.setAttribute("y1",y);
    marker.hline.setAttribute("x2", toRight ? x1 : x0); marker.hline.setAttribute("y2",y);
    marker.pin.setAttribute("transform","translate("+x+","+y1+")");
    curvePath.setAttribute("stroke",classes[state.cls].color);
  }

  // ---- Readout panel ----
  var g_class=document.getElementById("g-class"), g_kv=document.getElementById("g-kv"),
      g_rise=document.getElementById("g-rise"), g_pill=document.getElementById("g-pill"),
      g_status=document.getElementById("g-status"),
      s_miles=document.getElementById("s-miles"), slider=document.getElementById("slider"),
      chip2=document.getElementById("chip2"), chip5=document.getElementById("chip5");

  function setStatus(p){
    var bg,fg,txt;
    if(p<2){ txt="Within limits"; fg="var(--ok)"; bg="#EAF3EE"; }
    else if(p<5){ txt="Elevated — watch"; fg="var(--warn)"; bg="#FBF1DD"; }
    else { txt="High — take action"; fg="var(--alert)"; bg="#F8E4E1"; }
    g_status.textContent=txt; g_pill.style.color=fg; g_pill.style.background=bg;
  }

  function render(){
    var mi=state.miles, c=classes[state.cls], nom=c.nom;
    var p=risePct(mi), kv=nom*riseFactor(mi), dkv=kv-nom;
    s_miles.textContent=mi;
    g_class.textContent=state.cls+" kV · "; g_class.style.color=c.color;
    g_kv.textContent=Math.round(kv);
    g_rise.textContent="+"+p.toFixed(1)+"% rise · +"+dkv.toFixed(0)+" kV";
    g_rise.style.color = p<2 ? "var(--muted)" : (p<5 ? "var(--warn)" : "var(--alert)");
    setStatus(p);
    chip2.classList.toggle("lit", p>=2);
    chip5.classList.toggle("lit", p>=5);
    slider.setAttribute("aria-valuetext", mi+" miles, "+p.toFixed(1)+" percent rise");
    updateMarker();

    // free-explore completion: viewed both classes and pushed past the +5% limit
    if(p>=5) crossed5=true;
    if(crossed5 && seenClasses["345"] && seenClasses["138"]) markComplete();
  }

  // Tell Rise (the parent window) the interaction is finished — fires once.
  function markComplete(){
    if(completed) return;
    completed=true;
    try{ window.parent.postMessage({ type:"complete" }, "*"); }catch(e){}
  }

  // ---- Stage visibility (drives both explore + guided modes) ----
  function setVis(node,on){ if(node) node.setAttribute("opacity", on?"1":"0"); }
  function applyStage(){
    if(state.mode==="explore"){
      setVis(thrEls[2],true); setVis(thrEls[5],true); setVis(marker.group,true);
    } else { // guided
      setVis(marker.group, state.step>=1);
      setVis(thrEls[2], state.step>=1);
      setVis(thrEls[5], state.step>=2);
    }
  }

  // ---- Interactions ----
  slider.addEventListener("input",function(){ state.miles=+slider.value; render(); });

  function pickClass(cls){
    state.cls=cls; seenClasses[cls]=true;
    document.getElementById("b345").setAttribute("aria-pressed", String(cls==="345"));
    document.getElementById("b138").setAttribute("aria-pressed", String(cls==="138"));
    if(state.mode==="guided") setCaption();   // refresh narration for the new class
    render();
  }
  document.getElementById("b345").addEventListener("click",function(){ pickClass("345"); });
  document.getElementById("b138").addEventListener("click",function(){ pickClass("138"); });

  function snapTo(mi){ state.miles=Math.round(mi); slider.value=state.miles; render(); }
  chip2.addEventListener("click",function(){ if(state.mode==="explore") snapTo(milesForPct(2)); });
  chip5.addEventListener("click",function(){ if(state.mode==="explore") snapTo(milesForPct(5)); });

  // ---- Guided walkthrough (mirrors the instructor's click-by-click build) ----
  // Narration paraphrased from the deck's speaker notes.
  var script = {
    "138": [
      "A line with no load behaves like a capacitor — and capacitors raise voltage. Energize a 138 kV line with the far end open and the voltage climbs along the line (read it on the right-hand scale).",
      "To stay within +2% of the scheduled voltage at a generation bus, the line can be no longer than about 100 miles — the open end can reach about 141 kV.",
      "To stay within the +5% limit, keep the line under about 150 miles."
    ],
    "345": [
      "Energize a 345 kV line with the far end open and the profile climbs the same way (read it on the left-hand scale).",
      "To stay within +2% of scheduled voltage, the line can be no longer than about 100 miles.",
      "To stay within the +5% limit, keep the line under about 150 miles."
    ]
  };
  var cap=document.getElementById("cap"),
      gstart=document.getElementById("gstart"), gnext=document.getElementById("gnext"),
      gfree=document.getElementById("gfree"), scrub=document.querySelector(".scrub");

  function setCaption(){
    cap.className="cap";
    if(state.mode==="explore"){
      cap.innerHTML="<b>Drag the scrubber</b> to set line length, or press <b>Show me</b> for a guided walkthrough.";
      return;
    }
    if(state.step===0){ cap.innerHTML=script[state.cls][0]; }
    else if(state.step===1){ cap.className="cap s2"; cap.innerHTML=script[state.cls][1]; }
    else if(state.step===2){ cap.className="cap s3"; cap.innerHTML=script[state.cls][2]; }
    else { cap.innerHTML="<b>Now you try.</b> Drag the scrubber and watch where the open-end voltage crosses each limit."; }
  }

  function enterGuided(){
    state.mode="guided"; state.step=0;
    scrub.classList.add("locked"); slider.disabled=true;
    gstart.hidden=true; gnext.hidden=false; gfree.hidden=false; gnext.textContent="Next →";
    applyStage(); setCaption(); animateCurve();
  }
  function guidedNext(){
    state.step++;
    if(state.step===1){ snapTo(milesForPct(2)); gnext.textContent="Next →"; }
    else if(state.step===2){ snapTo(milesForPct(5)); gnext.textContent="Finish"; }
    else { exitGuided(); return; }
    applyStage(); setCaption();
  }
  function exitGuided(){
    state.mode="explore"; state.step=3;
    scrub.classList.remove("locked"); slider.disabled=false;
    gstart.hidden=false; gnext.hidden=true; gfree.hidden=true;
    gstart.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg> Replay walkthrough';
    applyStage();
    cap.className="cap"; cap.innerHTML="<b>Now you try.</b> Drag the scrubber and watch where the open-end voltage crosses each limit.";
    render();
    markComplete();   // finishing the guided walkthrough completes the interaction
  }
  gstart.addEventListener("click",enterGuided);
  gnext.addEventListener("click",guidedNext);
  gfree.addEventListener("click",exitGuided);

  // threshold meta labels (max line length to stay within each limit)
  document.getElementById("m2").textContent="≤ "+Math.round(milesForPct(2))+" mi";
  document.getElementById("m5").textContent="≤ "+Math.round(milesForPct(5))+" mi";

  // init
  buildChart();
  applyStage();
  render();
})();
</script>
</body>
</html>
`;
  var f = document.createElement('iframe');
  f.title = "Ferranti Rise — open-end line voltage vs. length";
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
