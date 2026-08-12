/* ============================================================================
   INTERACTIVE: SynchLab — generator synchronizing simulator
   Auto-embedded (build-embed.js) from synchlab.html.

   Rendered in an isolated, auto-sizing <iframe srcdoc>. This preserves the
   original single-file interactive exactly — its own styles, scripts, event
   listeners, and animation loop all stay contained inside the frame, so nothing
   collides with the console CSS and no listeners leak across navigation. The
   frame height tracks the inner content via ResizeObserver.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.synchLab = function (mount) {
  var HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SynchLab — Generator Synchronizing Simulator</title>
<style>
  :root{
    --panel:#23272f;
    --panel-2:#1a1d23;
    --panel-edge:#0d0f13;
    --bezel:#3a3f48;
    --face:#f4f1e9;
    --face-line:#c8c2b4;
    --ink:#1c1f24;
    --label:#c9cdd6;
    --label-dim:#7b818c;
    --green:#2fd06a;
    --green-deep:#138a3f;
    --amber:#f5a524;
    --red:#e23b3b;
    --needle:#d6202b;
    --energized:#2fd06a;
    --dead:#4a4f59;
    --digital:#ff4136;
    --accent:#46a0ff;
    --radius:10px;
    --font-label:'Oswald',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    --font-digital:'Share Tech Mono',ui-monospace,'SFMono-Regular',Menlo,monospace;
    --font-body:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  }
  *{box-sizing:border-box}
  html,body{margin:0;padding:0}
  body{
    background:
      radial-gradient(1200px 700px at 50% -10%, #2c313a 0%, #181b21 60%, #121419 100%);
    color:var(--label);
    font-family:var(--font-body);
    min-height:100vh;
    padding:18px;
  }
  .app{
    max-width:1180px;margin:0 auto;
  }
  .titlebar{
    display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;
    margin-bottom:14px;padding:0 4px;
  }
  .titlebar h1{
    font-family:var(--font-label);font-weight:600;letter-spacing:.06em;
    font-size:26px;margin:0;color:#fff;text-transform:uppercase;
  }
  .titlebar h1 .lab{color:var(--green)}
  .titlebar .sub{font-size:13px;color:var(--label-dim);letter-spacing:.02em}
  .grid{
    display:grid;
    grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);
    gap:14px;
    align-items:start;
  }
  .panel{
    background:linear-gradient(180deg,var(--panel) 0%,var(--panel-2) 100%);
    border:1px solid var(--panel-edge);
    border-radius:var(--radius);
    box-shadow:0 1px 0 rgba(255,255,255,.04) inset, 0 10px 24px rgba(0,0,0,.35);
    padding:14px;
  }
  .panel-title{
    font-family:var(--font-label);text-transform:uppercase;letter-spacing:.08em;
    font-size:13px;color:var(--label);margin:0 0 10px;font-weight:500;
    display:flex;align-items:center;justify-content:space-between;gap:8px;
  }
  .panel-title .tag{font-size:11px;color:var(--label-dim);font-weight:400;letter-spacing:.04em}

  /* Intro */
  details.intro{padding:0}
  details.intro .howto-body{padding:0 14px 14px}
  .howto-summary{cursor:pointer;list-style:none;padding:12px 14px;margin:0;user-select:none;
    display:flex;align-items:center;gap:8px;border-radius:var(--radius)}
  .howto-summary::-webkit-details-marker{display:none}
  .howto-summary:hover{background:rgba(255,255,255,.03)}
  details.intro[open] .howto-summary{border-bottom:1px solid var(--panel-edge);border-radius:var(--radius) var(--radius) 0 0}
  .chevron{display:inline-block;transition:transform .15s;color:var(--green);font-size:11px}
  details.intro[open] .chevron{transform:rotate(90deg)}
  .intro p{font-size:13px;line-height:1.5;color:#cfd4dd;margin:0 0 8px}
  .intro .steps{margin:6px 0 0;padding:0;list-style:none;counter-reset:s}
  .intro .steps li{
    font-size:12.5px;line-height:1.45;color:#bcc2cc;padding:3px 0 3px 26px;position:relative;
  }
  .intro .steps li::before{
    counter-increment:s;content:counter(s);
    position:absolute;left:0;top:2px;width:18px;height:18px;border-radius:50%;
    background:var(--green-deep);color:#eafff0;font-family:var(--font-label);
    font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:600;
  }
  .legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;font-size:11px;color:var(--label-dim)}
  .legend span{display:inline-flex;align-items:center;gap:5px}
  .swatch{width:11px;height:11px;border-radius:2px;display:inline-block}

  /* Buttons */
  .btnrow{display:flex;gap:8px}
  button.ctl{
    font-family:var(--font-label);text-transform:uppercase;letter-spacing:.06em;font-size:12px;
    background:linear-gradient(180deg,#454b55,#2b303a);color:#e7eaf0;border:1px solid #11141a;
    border-radius:7px;padding:7px 14px;cursor:pointer;font-weight:500;
    box-shadow:0 1px 0 rgba(255,255,255,.08) inset, 0 2px 4px rgba(0,0,0,.3);
  }
  button.ctl:hover{filter:brightness(1.12)}
  button.ctl:active{transform:translateY(1px)}
  button.ctl[aria-pressed="true"]{background:linear-gradient(180deg,#1f6a37,#0f3d20);color:#dffbe8;border-color:#0a2614}

  /* Generator controls */
  .gc{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
  .control{
    background:linear-gradient(180deg,#2a2e36,#1c2028);border:1px solid #0d0f13;border-radius:9px;
    padding:9px 8px 10px;display:flex;flex-direction:column;align-items:center;gap:8px;
  }
  .control .cname{font-family:var(--font-label);font-size:10.5px;letter-spacing:.06em;color:var(--label);text-transform:uppercase;text-align:center;min-height:24px;display:flex;align-items:center}
  .lights{display:flex;gap:6px}
  .lamp{width:12px;height:12px;border-radius:50%;background:#15171c;box-shadow:0 0 0 1px #000 inset;transition:background .12s, box-shadow .12s}
  .lamp.green.on{background:var(--green);box-shadow:0 0 8px var(--green),0 0 0 1px #0a3f1e inset}
  .lamp.amber.on{background:var(--amber);box-shadow:0 0 8px var(--amber),0 0 0 1px #5a3a06 inset}
  .lamp.red.on{background:var(--red);box-shadow:0 0 8px var(--red),0 0 0 1px #4a0f0f inset}

  /* Jog handle */
  .handle-wrap{position:relative;width:62px;height:108px;border-radius:10px;
    background:radial-gradient(120% 120% at 50% 0,#33373f,#15171c);border:1px solid #0a0c10;
    display:flex;align-items:center;justify-content:center;touch-action:none}
  .handle-wrap .endlabel{position:absolute;left:0;right:0;text-align:center;font-family:var(--font-label);
    font-size:9px;letter-spacing:.06em;color:var(--label-dim)}
  .handle-wrap .endlabel.top{top:5px}
  .handle-wrap .endlabel.bot{bottom:5px}
  .handle-wrap .slot{position:absolute;top:20px;bottom:20px;width:6px;border-radius:4px;
    background:linear-gradient(180deg,#0a0c10,#1b1e24);box-shadow:0 0 0 1px #000 inset}
  .knob{position:absolute;width:34px;height:34px;border-radius:50%;cursor:grab;
    background:radial-gradient(circle at 35% 30%,#e9ecf2,#9aa0ab 55%,#5b606b);
    box-shadow:0 3px 6px rgba(0,0,0,.5),0 0 0 1px #2a2e36;z-index:2}
  .knob:active{cursor:grabbing}
  .handle-wrap:focus{outline:2px solid var(--accent);outline-offset:2px}
  .handle-wrap:focus .knob{box-shadow:0 3px 6px rgba(0,0,0,.5),0 0 0 2px var(--accent)}
  .handle-hint{font-size:11px;color:var(--label-dim);margin-top:10px;text-align:center;line-height:1.4}
  .handle-hint kbd{font-family:var(--font-digital);background:#15171c;border:1px solid #000;border-radius:3px;padding:0 4px;color:var(--label)}
  .knob::after{content:"";position:absolute;left:50%;top:5px;transform:translateX(-50%);
    width:4px;height:10px;border-radius:2px;background:#2a2e36}
  .knob.on::after{background:var(--green)}

  /* Gauges */
  .gauges{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}
  .gauge{background:#0f1115;border:1px solid #000;border-radius:9px;padding:8px;display:flex;justify-content:center}
  .gauge svg{width:100%;height:auto;max-width:150px}

  /* Right column scope */
  .scopehead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}
  .scopetoggle{display:flex;gap:14px;font-size:11.5px;color:var(--label)}
  .scopetoggle label{display:inline-flex;align-items:center;gap:5px;cursor:pointer;font-family:var(--font-label);letter-spacing:.04em}
  .scopetoggle input{accent-color:var(--green)}
  .scope-on{font-family:var(--font-label);font-size:11px;letter-spacing:.08em;padding:3px 9px;border-radius:5px;
    border:1px solid #000;background:#15171c;color:var(--label-dim)}
  .scope-on.live{background:#0f3d20;color:var(--green);border-color:#0a2614;box-shadow:0 0 10px rgba(47,208,106,.3)}

  .syncwrap{display:flex;justify-content:center;align-items:center;background:#0f1115;border:1px solid #000;border-radius:10px;padding:10px;position:relative}
  .syncwrap svg{width:100%;height:auto;max-width:320px}

  .lamps2{display:flex;justify-content:center;gap:60px;margin:10px 0 4px}
  .synclamp{display:flex;flex-direction:column;align-items:center;gap:5px}
  .synclamp .bulb{width:40px;height:40px;border-radius:50%;background:#171a1f;
    box-shadow:0 0 0 1px #000 inset, 0 0 0 4px #0c0e12;transition:background .05s,box-shadow .05s}
  .synclamp .lab{font-family:var(--font-label);font-size:9.5px;letter-spacing:.06em;color:var(--label-dim);text-transform:uppercase}

  .meters2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px}
  .synch-controls{display:flex;gap:8px;justify-content:center;margin:4px 0 2px;flex-wrap:wrap}
  .synch-controls .ctl{font-size:11.5px;padding:8px 12px}
  .synch-arm[aria-pressed="true"]{background:linear-gradient(180deg,#1f6a37,#0f3d20);color:#dffbe8;border-color:#0a2614}
  .synch-arm.permit[aria-pressed="true"]{box-shadow:0 0 10px rgba(47,208,106,.5),0 1px 0 rgba(255,255,255,.08) inset}
  .gen-close{background:linear-gradient(180deg,#3a4550,#232a33)}
  .gen-close.ready{background:linear-gradient(180deg,#1f6a37,#0f3d20);color:#dffbe8;border-color:#0a2614;box-shadow:0 0 12px rgba(47,208,106,.5)}
  .gen-close.online{background:linear-gradient(180deg,#0f3d20,#0a2a16);color:#8fe6ab;border-color:#0a2614}
  .gen-close.blocked{background:linear-gradient(180deg,#5a3410,#3a2208);color:#ffd3a0}
  .phase-readout{display:flex;align-items:center;justify-content:center;gap:10px;margin:8px 0;
    font-family:var(--font-label);font-size:12px;letter-spacing:.06em;color:var(--label);text-transform:uppercase}
  .digital{font-family:var(--font-digital);color:var(--digital);background:#0a0c0e;
    border:1px solid #000;border-radius:5px;padding:2px 9px;min-width:62px;text-align:right;
    text-shadow:0 0 7px rgba(255,65,54,.6);letter-spacing:.04em}
  .wavewrap{background:#0f1115;border:1px solid #000;border-radius:9px;padding:8px;margin-top:8px}
  .wavehead{display:flex;justify-content:space-between;font-family:var(--font-label);font-size:11px;letter-spacing:.05em;color:var(--label);text-transform:uppercase;margin-bottom:4px}
  .wavehead .leg{font-size:10.5px}
  .wavehead .leg b{font-weight:500}
  .wavehead .inc{color:var(--accent)}
  .wavehead .run{color:var(--amber)}
  canvas#wave{width:100%;height:120px;display:block}

  /* One-line */
  .oneline{margin-top:14px}
  .oneline svg{width:100%;height:auto;display:block}
  .ann{margin-top:10px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
  .ann .msg{flex:1;min-width:200px;font-size:12.5px;font-family:var(--font-body);color:#cfd4dd;
    background:#0f1115;border:1px solid #000;border-radius:7px;padding:8px 11px;min-height:36px;display:flex;align-items:center;gap:8px}
  .ann .msg.ok{color:#bdf3cf;border-color:#0a2614;background:#10241a}
  .ann .msg.warn{color:#ffd3a0;border-color:#3a2407;background:#241a0e}
  .ann .msg.err{color:#ffc2c2;border-color:#3a0f0f;background:#241010}
  .ann .dot{width:9px;height:9px;border-radius:50%;background:var(--label-dim);flex:0 0 auto}
  .ann .msg.ok .dot{background:var(--green)}
  .ann .msg.warn .dot{background:var(--amber)}
  .ann .msg.err .dot{background:var(--red)}

  .foot{margin-top:14px;text-align:center;font-size:11px;color:var(--label-dim);letter-spacing:.02em}

  @media (max-width:880px){
    .grid{grid-template-columns:1fr}
  }
  @media (prefers-reduced-motion:reduce){
    *{transition:none!important}
  }
</style>
<style>html,body{background:transparent !important;}.wrap,.app{padding-top:8px !important;}</style>
</head>
<body>
<div class="app">
  <div class="titlebar">
    <h1>Synch<span class="lab">Lab</span></h1>
    <span class="sub">Generator synchronizing simulator · Restoration training</span>
  </div>

  <div class="grid">
    <!-- LEFT COLUMN -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <details class="panel intro" id="howto">
        <summary class="panel-title howto-summary"><span class="chevron">&#9656;</span> How to use it</summary>
        <div class="howto-body">
        <p>Synchronize the generator onto a bus that is tied to a live interconnected system, then close the generator breaker — the way you would during a system restoration.</p>
        <ol class="steps">
          <li>Energize a bus from the Interconnection Tie — close <b>PCB 004</b>, then <b>PCB 002</b>.</li>
          <li>Start the unit: <b>Master</b> to ON — the unit comes up to ~60&nbsp;Hz on its own. Raise <b>Voltage</b> to ~13.8&nbsp;kV.</li>
          <li><b>Trim Speed</b> slightly up so the synchroscope rotates <b>slowly toward FAST</b> and the lamps go dark.</li>
          <li>Arm synch-check, then close <b>PCB 001</b> at 12 o'clock — use the <b>Close Gen Breaker</b> button by the synchroscope, or click PCB 001 on the one-line.</li>
        </ol>
        <div class="legend">
          <span><i class="swatch" style="background:var(--energized)"></i>Energized</span>
          <span><i class="swatch" style="background:var(--dead)"></i>De-energized</span>
          <span><i class="swatch" style="background:transparent;border:1.5px solid var(--label-dim)"></i>Breaker open</span>
          <span><i class="swatch" style="background:var(--label)"></i>Breaker closed</span>
        </div>
        </div>
      </details>

      <div class="panel">
        <h2 class="panel-title">Generator controls
          <span class="btnrow">
            <button class="ctl" id="pauseBtn" aria-pressed="false">Pause</button>
            <button class="ctl" id="resetBtn">Reset</button>
          </span>
        </h2>
        <div class="gc">
          <div class="control">
            <div class="cname">Master<br>Start / Stop</div>
            <div class="lights">
              <span class="lamp green" data-lamp="m-g"></span>
              <span class="lamp amber" data-lamp="m-a"></span>
              <span class="lamp red" data-lamp="m-r"></span>
            </div>
            <div class="handle-wrap" data-handle="master">
              <span class="endlabel top">ON</span><span class="endlabel bot">OFF</span>
              <span class="slot"></span><span class="knob" data-knob="master"></span>
            </div>
          </div>
          <div class="control">
            <div class="cname">Speed<br>Control</div>
            <div class="lights">
              <span class="lamp green" data-lamp="s-g"></span>
              <span class="lamp amber" data-lamp="s-a"></span>
              <span class="lamp red" data-lamp="s-r"></span>
            </div>
            <div class="handle-wrap" data-handle="speed">
              <span class="endlabel top">RAISE</span><span class="endlabel bot">LOWER</span>
              <span class="slot"></span><span class="knob" data-knob="speed"></span>
            </div>
          </div>
          <div class="control">
            <div class="cname">Voltage<br>Control</div>
            <div class="lights">
              <span class="lamp green" data-lamp="v-g"></span>
              <span class="lamp amber" data-lamp="v-a"></span>
              <span class="lamp red" data-lamp="v-r"></span>
            </div>
            <div class="handle-wrap" data-handle="volt">
              <span class="endlabel top">RAISE</span><span class="endlabel bot">LOWER</span>
              <span class="slot"></span><span class="knob" data-knob="volt"></span>
            </div>
          </div>
        </div>

        <div class="handle-hint">Drag a handle, or click it and use <kbd>&uarr;</kbd> <kbd>&darr;</kbd> to fine-tune (hold <kbd>Shift</kbd> for larger steps).</div>

        <div class="gauges">
          <div class="gauge"><div id="g-freq"></div></div>
          <div class="gauge"><div id="g-speed"></div></div>
          <div class="gauge"><div id="g-kv"></div></div>
        </div>
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div class="panel">
      <div class="scopehead">
        <h2 class="panel-title" style="margin:0">Scopes &amp; waveforms</h2>
        <span class="scope-on" id="scopeState">SCOPE OFF</span>
      </div>
      <div class="scopetoggle">
        <label><input type="radio" name="scope" value="synchro" checked> Synchroscope</label>
        <label><input type="radio" name="scope" value="vector"> Vector scope</label>
      </div>

      <div class="syncwrap" style="margin-top:8px"><div id="syncDisplay"></div></div>

      <div class="lamps2">
        <div class="synclamp"><span class="bulb" id="lampL"></span><span class="lab">Synch lamp</span></div>
        <div class="synclamp"><span class="bulb" id="lampR"></span><span class="lab">Synch lamp</span></div>
      </div>

      <div class="phase-readout">Phase angle <span class="digital" id="phaseVal">— °</span></div>

      <div class="synch-controls">
        <button class="ctl synch-arm" id="armBtn" aria-pressed="false">Synch-check: OFF</button>
        <button class="ctl gen-close" id="genCloseBtn">Close Gen Breaker (PCB 001)</button>
      </div>

      <div class="meters2">
        <div class="gauge"><div id="g-inc"></div></div>
        <div class="gauge"><div id="g-run"></div></div>
      </div>

      <div class="wavewrap">
        <div class="wavehead"><span>Composite waveform</span>
          <span class="leg"><b class="inc">Incoming</b> &amp; <b class="run">Running</b></span></div>
        <canvas id="wave" width="520" height="120"></canvas>
      </div>
    </div>
  </div>

  <!-- ONE LINE -->
  <div class="panel oneline">
    <h2 class="panel-title">System one-line diagram &amp; control
      <span class="tag">Click a breaker to open / close · click the radio to arm synch-check</span></h2>
    <div id="oneline"></div>
    <div class="ann"><div class="msg" id="annunciator"><span class="dot"></span><span id="annText">Standby. Energize a bus from the Interconnection Tie to begin.</span></div></div>
  </div>

  <div class="foot">SynchLab training simulator · conceptual model for instruction — not for operational use.</div>
</div>

<script>
(function(){
  "use strict";
  const SYS_FREQ = 60.0;        // system / running frequency (Hz)
  const NOM_KV   = 13.8;        // nominal voltage (kV)
  const KV_MAX   = 16.56;       // gen kV gauge full scale
  const RPM_PER_HZ = 60;        // 2-pole machine: 3600 rpm = 60 Hz
  const METER_NOM = 120;        // voltmeter reading at nominal kV
  const TWO_PI = Math.PI*2;

  // window for a good synchronization
  const W_PHASE = 10;           // deg
  const W_SLIP  = 0.2;          // Hz
  const W_VOLT  = 0.05*NOM_KV;  // kV (5%)

  const state = {
    master:false,
    speedSet:0,          // governor setpoint, Hz
    excSet:0,            // excitation setpoint, kV
    genFreq:0,
    genVolt:0,
    phase: Math.random()*360,  // relative phase incoming vs running, deg
    paralleled:false,
    breakers:{PCB001:false,PCB002:false,PCB003:false,PCB004:false,PCB005:false},
    synch:{PCB001:false,PCB002:false,PCB003:false,PCB004:false,PCB005:false},
    scope:'synchro',
    paused:false,
    jog:{speed:0, volt:0}      // -1..1 jog command from handles
  };

  // ---------- electrical network ----------
  // nodes: TIE(source), ABUS, BBUS, BUSM(transformer/running side), GEN
  // edges keyed by breaker (null = always connected)
  const EDGES = [
    ['TIE','ABUS','PCB004'],
    ['TIE','BBUS','PCB005'],
    ['ABUS','BBUS',null],      // bus coupler (closed)
    ['ABUS','BUSM','PCB002'],
    ['BBUS','BUSM','PCB003'],
    ['BUSM','GEN','PCB001'],
  ];
  function genLive(){ return state.master && state.genVolt > 6; }
  // reachable set from given sources, optionally forcing PCB001 open
  function reachable(sources, forceOpen001){
    const live = new Set(sources);
    let changed=true;
    while(changed){
      changed=false;
      for(const [a,b,k] of EDGES){
        let closed = (k===null) ? true : state.breakers[k];
        if(forceOpen001 && k==='PCB001') closed=false;
        if(!closed) continue;
        if(live.has(a) && !live.has(b)){ live.add(b); changed=true; }
        if(live.has(b) && !live.has(a)){ live.add(a); changed=true; }
      }
    }
    return live;
  }
  function runningLive(){ return reachable(['TIE'], true).has('BUSM'); }
  function busVolt(){ return runningLive() ? NOM_KV : 0; }
  function fullLive(){
    const src=['TIE']; if(genLive()) src.push('GEN');
    return reachable(src, false);
  }

  // ---------- SVG radial gauge ----------
  function makeGauge(host, opts){
    const W=150,H=150,cx=75,cy=80,R=58;
    const A0=-120, A1=120;        // sweep, deg from straight up
    const NS='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(NS,'svg');
    svg.setAttribute('viewBox','0 0 '+W+' '+H);
    function pt(ang,r){const a=(ang-90)*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
    function arc(r,a,b){const[x1,y1]=pt(a,r),[x2,y2]=pt(b,r);const laf=(b-a)>180?1:0;
      return \`M \${x1} \${y1} A \${r} \${r} 0 \${laf} 1 \${x2} \${y2}\`;}
    // face
    const faceC=document.createElementNS(NS,'circle');
    faceC.setAttribute('cx',cx);faceC.setAttribute('cy',cy);faceC.setAttribute('r',R+9);
    faceC.setAttribute('fill','#f4f1e9');faceC.setAttribute('stroke','#3a3f48');faceC.setAttribute('stroke-width','3');
    svg.appendChild(faceC);
    const a=document.createElementNS(NS,'path');
    a.setAttribute('d',arc(R,A0,A1));a.setAttribute('fill','none');a.setAttribute('stroke','#1c1f24');a.setAttribute('stroke-width','2');
    svg.appendChild(a);
    // optional green target band
    if(opts.band){
      const v0=opts.band[0]/opts.max, v1=opts.band[1]/opts.max;
      const ang0=A0+v0*(A1-A0), ang1=A0+v1*(A1-A0);
      const band=document.createElementNS(NS,'path');
      band.setAttribute('d',arc(R-1,ang0,ang1));band.setAttribute('fill','none');
      band.setAttribute('stroke','#2fb45f');band.setAttribute('stroke-width','5');band.setAttribute('opacity','.85');
      svg.appendChild(band);
    }
    // ticks + labels
    const n=opts.ticks;
    for(let i=0;i<=n;i++){
      const frac=i/n, ang=A0+frac*(A1-A0);
      const [x1,y1]=pt(ang,R), [x2,y2]=pt(ang,R-7);
      const t=document.createElementNS(NS,'line');
      t.setAttribute('x1',x1);t.setAttribute('y1',y1);t.setAttribute('x2',x2);t.setAttribute('y2',y2);
      t.setAttribute('stroke','#1c1f24');t.setAttribute('stroke-width','1.6');svg.appendChild(t);
      const [lx,ly]=pt(ang,R-17);
      const lab=document.createElementNS(NS,'text');
      lab.setAttribute('x',lx);lab.setAttribute('y',ly+3);lab.setAttribute('text-anchor','middle');
      lab.setAttribute('font-family',"'Oswald',sans-serif");lab.setAttribute('font-size','8');lab.setAttribute('fill','#5a5448');
      const val=opts.max*frac;
      lab.textContent = opts.fmtTick? opts.fmtTick(val) : Math.round(val);
      svg.appendChild(lab);
    }
    // name
    const nm=document.createElementNS(NS,'text');
    nm.setAttribute('x',cx);nm.setAttribute('y',cy-14);nm.setAttribute('text-anchor','middle');
    nm.setAttribute('font-family',"'Oswald',sans-serif");nm.setAttribute('font-size','8.5');
    nm.setAttribute('letter-spacing','.5');nm.setAttribute('fill','#3a3f48');nm.textContent=opts.name;
    svg.appendChild(nm);
    const unit=document.createElementNS(NS,'text');
    unit.setAttribute('x',cx);unit.setAttribute('y',cy-5);unit.setAttribute('text-anchor','middle');
    unit.setAttribute('font-family',"'Oswald',sans-serif");unit.setAttribute('font-size','7');
    unit.setAttribute('fill','#7a7466');unit.textContent=opts.unit||'';
    svg.appendChild(unit);
    // needle
    const needle=document.createElementNS(NS,'line');
    needle.setAttribute('x1',cx);needle.setAttribute('y1',cy+8);needle.setAttribute('x2',cx);needle.setAttribute('y2',cy-R+8);
    needle.setAttribute('stroke','#d6202b');needle.setAttribute('stroke-width','2.2');needle.setAttribute('stroke-linecap','round');
    svg.appendChild(needle);
    const hub=document.createElementNS(NS,'circle');
    hub.setAttribute('cx',cx);hub.setAttribute('cy',cy);hub.setAttribute('r','4.5');hub.setAttribute('fill','#2a2e36');svg.appendChild(hub);
    // digital readout
    const dboxW=46,dboxH=15;
    const dbg=document.createElementNS(NS,'rect');
    dbg.setAttribute('x',cx-dboxW/2);dbg.setAttribute('y',cy+22);dbg.setAttribute('width',dboxW);dbg.setAttribute('height',dboxH);
    dbg.setAttribute('rx','2');dbg.setAttribute('fill','#0a0c0e');dbg.setAttribute('stroke','#000');svg.appendChild(dbg);
    const dval=document.createElementNS(NS,'text');
    dval.setAttribute('x',cx);dval.setAttribute('y',cy+33);dval.setAttribute('text-anchor','middle');
    dval.setAttribute('font-family',"'Share Tech Mono',monospace");dval.setAttribute('font-size','10');
    dval.setAttribute('fill','#ff4136');dval.textContent='0';svg.appendChild(dval);

    host.appendChild(svg);
    return {
      set(v){
        const cl=Math.max(0,Math.min(opts.max,v));
        const ang=A0+(cl/opts.max)*(A1-A0);
        needle.setAttribute('transform',\`rotate(\${ang} \${cx} \${cy})\`);
        dval.textContent = opts.fmt? opts.fmt(v) : Math.round(v);
      }
    };
  }

  const gFreq = makeGauge(document.getElementById('g-freq'),
    {max:72,ticks:6,name:'FREQUENCY',unit:'Hz',band:[59.8,60.2],fmt:v=>v.toFixed(2)});
  const gSpeed= makeGauge(document.getElementById('g-speed'),
    {max:4320,ticks:6,name:'SPEED',unit:'RPM',fmtTick:v=>Math.round(v),fmt:v=>Math.round(v)});
  const gKv   = makeGauge(document.getElementById('g-kv'),
    {max:KV_MAX,ticks:6,name:'GEN',unit:'kV',band:[13.1,14.5],fmtTick:v=>v.toFixed(1),fmt:v=>v.toFixed(2)});
  const gInc  = makeGauge(document.getElementById('g-inc'),
    {max:KV_MAX*10,ticks:6,name:'INCOMING',unit:'kV',band:[NOM_KV*10*0.95,NOM_KV*10*1.05],fmtTick:v=>Math.round(v),fmt:v=>Math.round(v)});
  const gRun  = makeGauge(document.getElementById('g-run'),
    {max:KV_MAX*10,ticks:6,name:'RUNNING',unit:'kV',band:[NOM_KV*10*0.95,NOM_KV*10*1.05],fmtTick:v=>Math.round(v),fmt:v=>Math.round(v)});

  // ---------- synchroscope / vector display ----------
  const NS='http://www.w3.org/2000/svg';
  const syncHost=document.getElementById('syncDisplay');
  let syncNeedle, vecInc, vecRun, syncFace, vecGroup, synGroup;
  let syncCx=150, syncCy=150;
  (function buildSync(){
    const svg=document.createElementNS(NS,'svg');
    svg.setAttribute('viewBox','0 0 300 300');
    const cx=150,cy=150,R=120;
    const faceC=document.createElementNS(NS,'circle');
    faceC.setAttribute('cx',cx);faceC.setAttribute('cy',cy);faceC.setAttribute('r',R+12);
    faceC.setAttribute('fill','#f4f1e9');faceC.setAttribute('stroke','#3a3f48');faceC.setAttribute('stroke-width','5');svg.appendChild(faceC);
    const ring=document.createElementNS(NS,'circle');
    ring.setAttribute('cx',cx);ring.setAttribute('cy',cy);ring.setAttribute('r',R);
    ring.setAttribute('fill','none');ring.setAttribute('stroke','#1c1f24');ring.setAttribute('stroke-width','2');svg.appendChild(ring);
    // tick marks every 15deg
    for(let d=0;d<360;d+=15){
      const a=(d-90)*Math.PI/180, big=(d%90===0);
      const r1=R, r2=R-(big?14:8);
      const l=document.createElementNS(NS,'line');
      l.setAttribute('x1',cx+r1*Math.cos(a));l.setAttribute('y1',cy+r1*Math.sin(a));
      l.setAttribute('x2',cx+r2*Math.cos(a));l.setAttribute('y2',cy+r2*Math.sin(a));
      l.setAttribute('stroke','#1c1f24');l.setAttribute('stroke-width',big?'2.4':'1.2');svg.appendChild(l);
    }
    // labels
    function txt(x,y,s,sz,col,rot){const t=document.createElementNS(NS,'text');
      t.setAttribute('x',x);t.setAttribute('y',y);t.setAttribute('text-anchor','middle');
      t.setAttribute('font-family',"'Oswald',sans-serif");t.setAttribute('font-size',sz);
      t.setAttribute('fill',col||'#3a3f48');if(rot)t.setAttribute('transform',\`rotate(\${rot} \${x} \${y})\`);
      t.textContent=s;return t;}
    svg.appendChild(txt(cx,cy-R+26,'SYNCH',11,'#138a3f'));
    svg.appendChild(txt(cx-R+34,cy-R+58,'SLOW',12,'#5a5448',-52));
    svg.appendChild(txt(cx+R-34,cy-R+58,'FAST',12,'#5a5448',52));
    // direction arrows
    svg.appendChild(txt(cx-86,cy-78,'\\u2190',16,'#9aa0ab'));
    svg.appendChild(txt(cx+86,cy-78,'\\u2192',16,'#9aa0ab'));
    svg.appendChild(txt(cx,cy+R-30,'SYNCHROSCOPE',9,'#7a7466'));
    // green sweet-spot wedge near top
    const wedge=document.createElementNS(NS,'path');
    function P(ang,r){const a=(ang-90)*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
    const [wx1,wy1]=P(-W_PHASE,R-2),[wx2,wy2]=P(W_PHASE,R-2);
    wedge.setAttribute('d',\`M \${cx} \${cy} L \${wx1} \${wy1} A \${R-2} \${R-2} 0 0 1 \${wx2} \${wy2} Z\`);
    wedge.setAttribute('fill','rgba(47,180,95,.18)');svg.appendChild(wedge);

    // synchro needle group
    synGroup=document.createElementNS(NS,'g');
    syncNeedle=document.createElementNS(NS,'g');
    const nl=document.createElementNS(NS,'line');
    nl.setAttribute('x1',cx);nl.setAttribute('y1',cy+24);nl.setAttribute('x2',cx);nl.setAttribute('y2',cy-R+18);
    nl.setAttribute('stroke','#d6202b');nl.setAttribute('stroke-width','4');nl.setAttribute('stroke-linecap','round');
    const head=document.createElementNS(NS,'path');
    head.setAttribute('d',\`M \${cx-8} \${cy-R+30} L \${cx} \${cy-R+14} L \${cx+8} \${cy-R+30} Z\`);
    head.setAttribute('fill','#d6202b');
    syncNeedle.appendChild(nl);syncNeedle.appendChild(head);
    synGroup.appendChild(syncNeedle);
    svg.appendChild(synGroup);

    // vector group (hidden by default)
    vecGroup=document.createElementNS(NS,'g');vecGroup.setAttribute('opacity','0');
    function vec(col){const g=document.createElementNS(NS,'g');
      const ln=document.createElementNS(NS,'line');
      ln.setAttribute('x1',cx);ln.setAttribute('y1',cy);ln.setAttribute('x2',cx);ln.setAttribute('y2',cy-R+16);
      ln.setAttribute('stroke',col);ln.setAttribute('stroke-width','4');ln.setAttribute('stroke-linecap','round');
      const hd=document.createElementNS(NS,'path');
      hd.setAttribute('d',\`M \${cx-7} \${cy-R+28} L \${cx} \${cy-R+12} L \${cx+7} \${cy-R+28} Z\`);
      hd.setAttribute('fill',col);g.appendChild(ln);g.appendChild(hd);return g;}
    vecRun=vec('#f5a524');   // running fixed up
    vecInc=vec('#46a0ff');   // incoming rotates
    vecGroup.appendChild(vecRun);vecGroup.appendChild(vecInc);
    svg.appendChild(vecGroup);

    const hub=document.createElementNS(NS,'circle');
    hub.setAttribute('cx',cx);hub.setAttribute('cy',cy);hub.setAttribute('r','7');hub.setAttribute('fill','#2a2e36');svg.appendChild(hub);

    syncHost.appendChild(svg);
    syncCx=cx;syncCy=cy;
  })();

  // ---------- one-line ----------
  const olHost=document.getElementById('oneline');
  const breakerEls={}, radioEls={}, condEls=[], genCircle={};
  (function buildOL(){
    const W=900,H=210;
    const svg=document.createElementNS(NS,'svg');
    svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.setAttribute('id','olsvg');
    const yMid=150, yA=92, yB=150;
    function line(x1,y1,x2,y2,nodeA,nodeB){
      const l=document.createElementNS(NS,'line');
      l.setAttribute('x1',x1);l.setAttribute('y1',y1);l.setAttribute('x2',x2);l.setAttribute('y2',y2);
      l.setAttribute('stroke-width','3.4');l.setAttribute('stroke-linecap','round');
      svg.appendChild(l);condEls.push({el:l,a:nodeA,b:nodeB});return l;}
    function label(x,y,s,sz,col,anchor){const t=document.createElementNS(NS,'text');
      t.setAttribute('x',x);t.setAttribute('y',y);t.setAttribute('text-anchor',anchor||'middle');
      t.setAttribute('font-family',"'Oswald',sans-serif");t.setAttribute('font-size',sz||11);
      t.setAttribute('letter-spacing','.04em');t.setAttribute('fill',col||'#c9cdd6');t.textContent=s;svg.appendChild(t);return t;}

    // GEN
    const gc=document.createElementNS(NS,'circle');
    gc.setAttribute('cx',54);gc.setAttribute('cy',yMid);gc.setAttribute('r',26);
    gc.setAttribute('fill','#23272f');gc.setAttribute('stroke','#4a4f59');gc.setAttribute('stroke-width','3');
    svg.appendChild(gc);genCircle.el=gc;
    const gg=document.createElementNS(NS,'text');
    gg.setAttribute('x',54);gg.setAttribute('y',yMid+5);gg.setAttribute('text-anchor','middle');
    gg.setAttribute('font-family',"'Oswald',sans-serif");gg.setAttribute('font-size','15');gg.setAttribute('fill','#e7eaf0');gg.textContent='G';
    svg.appendChild(gg);
    label(54,yMid+44,'GENERATOR',9.5,'#7b818c');

    // GEN -> PCB001
    line(80,yMid,150,yMid,'GEN','GEN');
    mkBreaker(svg,150,yMid,'PCB001','GEN','BUSM',-30); // synch breaker
    line(176,yMid,214,yMid,'GEN','BUSM');

    // transformer (two coils) between PCB001 and bus split
    drawTransformer(svg,232,yMid);
    line(214,yMid,222,yMid,'BUSM','BUSM');
    line(250,yMid,300,yMid,'BUSM','BUSM');
    label(232,yMid+44,'GSU XFMR',9,'#7b818c');

    // BUSM node up to split point
    const xSplit=320;
    line(300,yMid,xSplit,yMid,'BUSM','BUSM');
    // split to A bus (up) and B bus (down)
    line(xSplit,yMid,xSplit,yA,'BUSM','BUSM');
    line(xSplit,yMid,xSplit,yB,'BUSM','BUSM');
    // PCB002 (to A bus), PCB003 (to B bus)
    line(xSplit,yA,xSplit+30,yA,'BUSM','BUSM');
    mkBreaker(svg,xSplit+56,yA,'PCB002','BUSM','ABUS',-26,true);
    line(xSplit+82,yA,xSplit+120,yA,'BUSM','ABUS');
    line(xSplit,yB,xSplit+30,yB,'BUSM','BUSM');
    mkBreaker(svg,xSplit+56,yB,'PCB003','BUSM','BBUS',26,true);
    line(xSplit+82,yB,xSplit+120,yB,'BUSM','BBUS');

    // BUS BARS
    const xBus0=xSplit+120, xBus1=xSplit+300;
    const aBar=line(xBus0,yA,xBus1,yA,'ABUS','ABUS');aBar.setAttribute('stroke-width','6');
    const bBar=line(xBus0,yB,xBus1,yB,'BBUS','BBUS');bBar.setAttribute('stroke-width','6');
    label(xBus0+90,yA-12,'A BUS',12,'#c9cdd6');
    label(xBus0+90,yB+22,'B BUS',12,'#c9cdd6');
    // bus coupler (always closed) - vertical link with marker
    const xc=(xBus0+xBus1)/2;
    line(xc,yA,xc,yB,'ABUS','BBUS');
    const cpl=document.createElementNS(NS,'circle');
    cpl.setAttribute('cx',xc);cpl.setAttribute('cy',(yA+yB)/2);cpl.setAttribute('r',7);
    cpl.setAttribute('fill','#2a2e36');cpl.setAttribute('stroke','#4a4f59');cpl.setAttribute('stroke-width','2');svg.appendChild(cpl);
    label(xc,(yA+yB)/2+26,'COUPLER',7.5,'#7b818c');

    // PCB004 (A bus -> tie), PCB005 (B bus -> tie)
    line(xBus1,yA,xBus1+30,yA,'ABUS','ABUS');
    mkBreaker(svg,xBus1+56,yA,'PCB004','ABUS','TIE',-26,true);
    line(xBus1+82,yA,xBus1+120,yA,'ABUS','TIE');
    line(xBus1,yB,xBus1+30,yB,'BBUS','BBUS');
    mkBreaker(svg,xBus1+56,yB,'PCB005','BBUS','TIE',26,true);
    line(xBus1+82,yB,xBus1+120,yB,'BBUS','TIE');

    // tie collector
    const xTie=xBus1+120;
    line(xTie,yA,xTie,yB,'TIE','TIE');
    line(xTie,yMid,xTie+40,yMid,'TIE','TIE');
    const tieBox=document.createElementNS(NS,'rect');
    tieBox.setAttribute('x',xTie+40);tieBox.setAttribute('y',yMid-22);tieBox.setAttribute('width',44);tieBox.setAttribute('height',44);
    tieBox.setAttribute('rx',6);tieBox.setAttribute('fill','#10241a');tieBox.setAttribute('stroke','#2fd06a');tieBox.setAttribute('stroke-width','2.4');
    svg.appendChild(tieBox);
    label(xTie+62,yMid+5,'~',18,'#2fd06a');
    label(xTie+62,yMid+52,'INTERCONNECTION',8.5,'#c9cdd6');
    label(xTie+62,yMid+62,'TIE (SYSTEM)',8.5,'#7b818c');

    olHost.appendChild(svg);

    function drawTransformer(svg,x,y){
      for(let i=0;i<2;i++){
        const c=document.createElementNS(NS,'circle');
        c.setAttribute('cx',x-9+i*18);c.setAttribute('cy',y);c.setAttribute('r',13);
        c.setAttribute('fill','none');c.setAttribute('stroke','#9aa0ab');c.setAttribute('stroke-width','2.4');svg.appendChild(c);
      }
    }
  })();

  // breaker factory
  function mkBreaker(svg,x,y,key,nodeA,nodeB,radioDy,radioRight){
    const g=document.createElementNS(NS,'g');g.style.cursor='pointer';
    const sq=document.createElementNS(NS,'rect');
    sq.setAttribute('x',x-13);sq.setAttribute('y',y-13);sq.setAttribute('width',26);sq.setAttribute('height',26);
    sq.setAttribute('rx',3);sq.setAttribute('stroke-width','2.6');
    g.appendChild(sq);
    const lab=document.createElementNS(NS,'text');
    // if the radio sits directly above the breaker (PCB 001), put the label BELOW to avoid overlap
    const labY = (!radioRight && radioDy<0) ? (y+30) : (y - (radioDy<0?20:0) + (radioDy<0?-3:34));
    lab.setAttribute('x',x);lab.setAttribute('y',labY);
    lab.setAttribute('text-anchor','middle');lab.setAttribute('font-family',"'Oswald',sans-serif");
    lab.setAttribute('font-size','9');lab.setAttribute('fill','#9aa0ab');lab.textContent=key.replace('PCB','PCB ');
    svg.appendChild(lab);
    g.addEventListener('click',()=>toggleBreaker(key));
    svg.appendChild(g);
    breakerEls[key]={g,sq,nodeA,nodeB};
    // synch-check radio
    const rx = radioRight ? x+24 : x;
    const ry = radioRight ? y : y+radioDy;
    const radio=document.createElementNS(NS,'circle');
    radio.setAttribute('cx',rx);radio.setAttribute('cy',ry);radio.setAttribute('r',6.5);
    radio.setAttribute('fill','#15171c');radio.setAttribute('stroke','#4a4f59');radio.setAttribute('stroke-width','2');
    radio.style.cursor='pointer';
    radio.addEventListener('click',()=>toggleSynch(key));
    svg.appendChild(radio);
    const rdot=document.createElementNS(NS,'circle');
    rdot.setAttribute('cx',rx);rdot.setAttribute('cy',ry);rdot.setAttribute('r',3);rdot.setAttribute('fill','transparent');
    svg.appendChild(rdot);
    radioEls[key]={ring:radio,dot:rdot};
  }

  // ---------- annunciator ----------
  const annEl=document.getElementById('annunciator');
  const annText=document.getElementById('annText');
  function announce(msg,kind){
    annText.textContent=msg;
    annEl.className='msg'+(kind?(' '+kind):'');
  }

  // ---------- interactions ----------
  function permit(key){
    // is it OK to close this breaker right now?
    const b=breakerEls[key];
    const aLive=fullLive().has(b.nodeA), bLive=fullLive().has(b.nodeB);
    if(key==='PCB001'){
      const rL=runningLive(), gL=genLive();
      if(!rL || !gL) return true; // dead-bus / dead-line energization is permitted
      const dphase=Math.min(state.phase,360-state.phase);
      return dphase<=W_PHASE && Math.abs(state.genFreq-SYS_FREQ)<=W_SLIP &&
             Math.abs(state.genVolt-busVolt())<=W_VOLT;
    }
    // other breakers: safe if at least one side dead (no live parallel)
    return !(aLive && bLive);
  }

  function toggleBreaker(key){
    const closed=state.breakers[key];
    if(closed){ state.breakers[key]=false; announce(key.replace('PCB','PCB ')+' opened.',''); refreshStatic(); return; }
    // attempting to close
    if(key==='PCB001'){
      const rL=runningLive(), gL=genLive();
      if(rL && gL){
        const ok=permit('PCB001');
        if(state.synch['PCB001'] && !ok){
          announce('Synch-check block — outside the synchronizing window. Trim speed/voltage and try at 12 o\\u2019clock.','warn');
          flashBreaker(key,'warn'); return;
        }
        if(!ok){
          // manual out-of-phase closure -> trip
          announce('\\u26A0 Out-of-phase closure — generator breaker tripped. Re-synchronize before closing.','err');
          flashBreaker(key,'err'); return;
        }
        // success
        state.breakers['PCB001']=true; state.paralleled=true;
        state.phase=0; state.genFreq=SYS_FREQ; state.speedSet=SYS_FREQ;
        announce('\\u2713 Generator synchronized and on-line. Unit is paralleled with the system.','ok');
        refreshStatic(); return;
      }
      // dead bus or dead gen -> energize
      state.breakers['PCB001']=true;
      announce('PCB 001 closed (dead-line energization).','');
      refreshStatic(); return;
    }
    // path breakers
    if(!permit(key)){
      announce(key.replace('PCB','PCB ')+' would parallel two live sources here — not permitted in this model.','warn');
      flashBreaker(key,'warn'); return;
    }
    state.breakers[key]=true;
    const nowLive=fullLive();
    let m=key.replace('PCB','PCB ')+' closed.';
    if(key==='PCB004') m='PCB 004 closed — A bus energized from the Interconnection Tie.';
    if(key==='PCB005') m='PCB 005 closed — B bus energized from the Interconnection Tie.';
    if(key==='PCB002'||key==='PCB003'){
      if(runningLive()) m=key.replace('PCB','PCB ')+' closed — running voltage now present at the generator breaker.';
    }
    announce(m,'ok');
    refreshStatic();
  }

  let flashTimer=null;
  function flashBreaker(key,kind){
    const sq=breakerEls[key].sq;
    const col=kind==='err'?'#e23b3b':'#f5a524';
    sq.setAttribute('stroke',col);
    clearTimeout(flashTimer);
    flashTimer=setTimeout(refreshStatic,650);
  }

  function toggleSynch(key){
    state.synch[key]=!state.synch[key];
    announce('Synch-check '+(state.synch[key]?'armed':'released')+' on '+key.replace('PCB','PCB ')+
      (state.synch[key]?' — close is now supervised.':' — close is now manual.'), state.synch[key]?'':'');
    refreshStatic();
  }

  // ---------- handles (jog) ----------
  const handles={};        // name -> controller {applyStep,nudge,rest,isMaster}
  let activeHandle=null;   // last handle the user touched (for arrow-key routing)
  function setupHandle(name){
    const wrap=document.querySelector(\`[data-handle="\${name}"]\`);
    const knob=wrap.querySelector('.knob');
    wrap.setAttribute('tabindex','0');
    wrap.setAttribute('role', name==='master'?'switch':'slider');
    wrap.setAttribute('aria-label', name+' control — use arrow keys to adjust');
    const center=()=>wrap.clientHeight/2 - knob.offsetHeight/2;
    const range=()=>wrap.clientHeight/2 - knob.offsetHeight/2 - 6;
    let dragging=false;
    function place(offset){ // offset -1..1 (up positive)
      const c=center(); const y=c - offset*range();
      knob.style.top=y+'px';
    }
    function rest(){
      if(name==='master'){ place(state.master?1:-1); knob.classList.toggle('on',state.master); }
      else { place(0); }
    }
    function fromEvent(e){
      const r=wrap.getBoundingClientRect();
      const cy=r.top+r.height/2;
      const py=(e.touches?e.touches[0].clientY:e.clientY);
      let off=(cy-py)/(r.height/2-6);
      return Math.max(-1,Math.min(1,off));
    }
    let nudgeTimer=null;
    function nudge(dir){ place(dir*0.5); clearTimeout(nudgeTimer); nudgeTimer=setTimeout(rest,140); }
    function applyStep(d){
      if(name==='speed'){ if(state.paralleled)return; state.speedSet=Math.max(0,Math.min(72,state.speedSet+d)); }
      else { state.excSet=Math.max(0,Math.min(KV_MAX,state.excSet+d)); }
    }
    knob.addEventListener('pointerdown',e=>{activeHandle=name;wrap.focus();dragging=true;knob.setPointerCapture(e.pointerId);e.preventDefault();});
    wrap.addEventListener('pointerdown',e=>{ // allow click on track for master
      activeHandle=name; wrap.focus();
      if(name==='master' && e.target!==knob){ state.master=fromEvent(e)>0; onMaster(); rest(); }
    });
    window.addEventListener('pointermove',e=>{
      if(!dragging)return;
      const off=fromEvent(e);
      if(name==='master'){ place(off); }
      else { place(off); state.jog[name]=off; }
    });
    window.addEventListener('pointerup',e=>{
      if(!dragging)return;dragging=false;
      if(name==='master'){
        const off=fromEvent(e); state.master=off>0; onMaster(); rest();
      } else { state.jog[name]=0; place(0); }
    });
    rest();
    setupHandle['rest_'+name]=rest;
    handles[name]={applyStep,nudge,rest,isMaster:name==='master'};
  }
  // single, robust arrow-key router: adjusts whichever handle is focused or last touched
  document.addEventListener('keydown',e=>{
    const up=(e.key==='ArrowUp'||e.key==='ArrowRight');
    const down=(e.key==='ArrowDown'||e.key==='ArrowLeft');
    if(!up && !down) return;
    let name=null;
    const ae=document.activeElement;
    if(ae && ae.getAttribute && ae.getAttribute('data-handle')) name=ae.getAttribute('data-handle');
    else if((!ae || ae===document.body) && activeHandle) name=activeHandle;
    if(!name || !handles[name]) return;
    e.preventDefault();
    const H=handles[name];
    if(H.isMaster){ state.master=up; onMaster(); H.rest(); return; }
    let step=(name==='volt')?0.05:0.02;
    if(e.shiftKey) step=(name==='volt')?0.2:0.1;
    H.applyStep(up?step:-step);
    H.nudge(up?1:-1);
  });
  function onMaster(){
    if(state.master){ if(state.speedSet<1){ state.speedSet=SYS_FREQ; } announce('Master ON — unit accelerating to rated speed.',''); }
    else { state.master=false; state.paralleled=false; if(state.breakers.PCB001) state.breakers.PCB001=false;
      announce('Master OFF — unit shut down.',''); }
  }
  setupHandle('master');setupHandle('speed');setupHandle('volt');

  // scope toggle
  document.querySelectorAll('input[name="scope"]').forEach(r=>{
    r.addEventListener('change',()=>{state.scope=r.value;});
  });
  // pause / reset
  const pauseBtn=document.getElementById('pauseBtn');
  pauseBtn.addEventListener('click',()=>{
    state.paused=!state.paused;pauseBtn.setAttribute('aria-pressed',state.paused);
    pauseBtn.textContent=state.paused?'Resume':'Pause';
  });
  document.getElementById('resetBtn').addEventListener('click',reset);

  // near-scope synchronizing controls (so you can close while watching the scope)
  const armBtn=document.getElementById('armBtn');
  const genCloseBtn=document.getElementById('genCloseBtn');
  armBtn.addEventListener('click',()=>toggleSynch('PCB001'));
  genCloseBtn.addEventListener('click',()=>toggleBreaker('PCB001'));

  function reset(){
    state.master=false;state.speedSet=0;state.excSet=0;state.genFreq=0;state.genVolt=0;
    state.phase=Math.random()*360;state.paralleled=false;state.jog={speed:0,volt:0};
    for(const k in state.breakers)state.breakers[k]=false;
    for(const k in state.synch)state.synch[k]=false;
    setupHandle.rest_master&&setupHandle.rest_master();
    setupHandle.rest_speed&&setupHandle.rest_speed();
    setupHandle.rest_volt&&setupHandle.rest_volt();
    announce('Standby. Energize a bus from the Interconnection Tie to begin.','');
    clearWave();
    refreshStatic();
  }

  // ---------- static refresh (breakers/lines/radios) ----------
  function refreshStatic(){
    const live=fullLive();
    // conductors
    for(const c of condEls){
      const en = live.has(c.a) && live.has(c.b) &&
        ((c.a===c.b) ? live.has(c.a) : true);
      // a segment between two nodes is energized only if both ends live
      const both = live.has(c.a) && live.has(c.b);
      c.el.setAttribute('stroke', both ? 'var(--energized)' : 'var(--dead)');
    }
    // generator circle
    genCircle.el.setAttribute('stroke', genLive() ? 'var(--energized)' : '#4a4f59');
    genCircle.el.setAttribute('fill', genLive() ? '#10241a' : '#23272f');
    // breakers
    for(const key in breakerEls){
      const {sq}=breakerEls[key]; const closed=state.breakers[key];
      const en=live.has(breakerEls[key].nodeA)&&live.has(breakerEls[key].nodeB)&&closed;
      if(closed){ sq.setAttribute('fill', en?'var(--energized)':'#6b7280'); sq.setAttribute('stroke', en?'#0a2614':'#11141a'); }
      else { sq.setAttribute('fill','#15171c'); sq.setAttribute('stroke','var(--label-dim)'); }
    }
    // radios = synch-check permit indicator
    for(const key in radioEls){
      const armed=state.synch[key]; const ok=permit(key);
      const {ring,dot}=radioEls[key];
      ring.setAttribute('stroke', armed? (ok?'var(--green)':'var(--amber)') : '#4a4f59');
      dot.setAttribute('fill', armed? (ok?'var(--green)':'var(--amber)') : 'transparent');
    }
    // near-scope synchronizing buttons
    if(typeof armBtn!=='undefined' && armBtn){
      const armed=state.synch['PCB001'];
      armBtn.setAttribute('aria-pressed',armed?'true':'false');
      armBtn.textContent='Synch-check: '+(armed?'ON':'OFF');
      armBtn.classList.toggle('permit', armed && permit('PCB001'));

      const closed=state.breakers['PCB001'];
      const bothLive = runningLive() && genLive();
      const inWindow = permit('PCB001');
      genCloseBtn.classList.remove('ready','online','blocked');
      if(state.paralleled && closed){
        genCloseBtn.textContent='Open Gen Breaker (PCB 001)';
        genCloseBtn.classList.add('online');
      } else if(closed){
        genCloseBtn.textContent='Open Gen Breaker (PCB 001)';
      } else {
        genCloseBtn.textContent='Close Gen Breaker (PCB 001)';
        if(bothLive && inWindow) genCloseBtn.classList.add('ready');
        else if(bothLive && state.synch['PCB001'] && !inWindow) genCloseBtn.classList.add('blocked');
      }
    }
  }

  // ---------- main loop ----------
  let last=performance.now();
  function loop(now){
    const dt=Math.min(0.05,(now-last)/1000); last=now;
    if(!state.paused) step(dt);
    render();
    requestAnimationFrame(loop);
  }
  function step(dt){
    // jog -> setpoints
    if(!state.paralleled){
      state.speedSet += state.jog.speed * 4.0 * dt;   // Hz/s at full jog
      state.speedSet = Math.max(0,Math.min(72,state.speedSet));
    }
    state.excSet += state.jog.volt * 7.0 * dt;        // kV/s at full jog
    state.excSet = Math.max(0,Math.min(KV_MAX,state.excSet));

    // dynamics
    const kUp=1.4, kDown=0.6;
    if(state.master){
      state.genFreq += (state.speedSet-state.genFreq)*Math.min(1,dt*kUp);
      state.genVolt += (state.excSet-state.genVolt)*Math.min(1,dt*kUp);
    } else {
      state.genFreq += (0-state.genFreq)*Math.min(1,dt*kDown);
      state.genVolt += (0-state.genVolt)*Math.min(1,dt*kDown);
    }

    // phase
    if(state.paralleled){
      state.phase=0; state.genFreq=SYS_FREQ;
    } else if(genLive() && runningLive()){
      const slip=state.genFreq-SYS_FREQ;
      state.phase=(state.phase + 360*slip*dt)%360;
      if(state.phase<0)state.phase+=360;
    }
    // refresh permit indicators continuously (window changes with speed/volt)
    refreshStatic();
    advanceWave(dt);
  }

  // waveform canvas — continuous scroll: new samples enter at the right and flow left,
  // so time reads left-to-right (conventional scope) and the trace is perpetually "being built"
  const wave=document.getElementById('wave');
  const wctx=wave.getContext('2d');
  const WW=wave.width;
  const wbuf={inc:new Float32Array(WW),run:new Float32Array(WW),pos:0,head:0,carrier:0};
  wbuf.inc.fill(NaN);wbuf.run.fill(NaN);
  const SCROLL_PX_S=120;  // scroll speed (lower = calmer flow)
  const WAVE_CYCLES=3;    // cycles shown across the full width
  function clearWave(){wbuf.inc.fill(NaN);wbuf.run.fill(NaN);wbuf.pos=0;wbuf.head=0;wbuf.carrier=0;}
  function advanceWave(dt){
    const cpc=TWO_PI*WAVE_CYCLES/WW;
    wbuf.pos += SCROLL_PX_S*dt;
    let guard=0;
    while(wbuf.pos>=1 && guard++<3000){
      wbuf.pos-=1;
      wbuf.carrier=(wbuf.carrier+cpc)%TWO_PI;
      const ampR = runningLive()? busVolt()/NOM_KV : NaN;
      const ampI = genLive()? state.genVolt/NOM_KV : NaN;
      const phaseRad = state.phase*Math.PI/180;
      wbuf.run[wbuf.head] = isNaN(ampR)? NaN : ampR*Math.sin(wbuf.carrier);
      wbuf.inc[wbuf.head] = isNaN(ampI)? NaN : ampI*Math.sin(wbuf.carrier+phaseRad);
      wbuf.head=(wbuf.head+1)%WW;
    }
  }
  function drawWave(){
    const w=wave.width,h=wave.height,mid=h/2;
    wctx.clearRect(0,0,w,h);
    wctx.strokeStyle='rgba(255,255,255,.06)';wctx.lineWidth=1;
    wctx.beginPath();wctx.moveTo(0,mid);wctx.lineTo(w,mid);wctx.stroke();
    function paint(buf,col){
      wctx.strokeStyle=col;wctx.lineWidth=2;wctx.beginPath();
      let pen=false;
      for(let x=0;x<WW;x++){
        const idx=(wbuf.head + x)%WW;  // oldest at left, newest at right (time flows left->right)
        const v=buf[idx];
        if(isNaN(v)){pen=false;continue;}
        const y=mid - v*(h*0.40);
        if(!pen){wctx.moveTo(x,y);pen=true;} else wctx.lineTo(x,y);
      }
      wctx.stroke();
    }
    paint(wbuf.run,'#f5a524');
    paint(wbuf.inc,'#46a0ff');
  }

  function render(){
    // gauges
    gFreq.set(state.genFreq);
    gSpeed.set(state.genFreq*RPM_PER_HZ);
    gKv.set(state.genVolt);
    gInc.set(genLive()? state.genVolt*10 : 0);
    gRun.set(runningLive()? busVolt()*10 : 0);

    const cx=syncCx, cy=syncCy;
    const scopeLive = genLive() && runningLive() && !state.paralleled;
    // scope state badge
    const badge=document.getElementById('scopeState');
    if(state.paralleled){ badge.textContent='SYNCHRONIZED'; badge.className='scope-on live'; }
    else if(scopeLive){ badge.textContent='SCOPE ON'; badge.className='scope-on live'; }
    else { badge.textContent='SCOPE OFF'; badge.className='scope-on'; }

    // synchro vs vector visibility
    const showVec = state.scope==='vector';
    vecGroup.setAttribute('opacity', showVec?'1':'0');
    synGroup.setAttribute('opacity', showVec?'0':'1');

    if(scopeLive){
      syncNeedle.setAttribute('transform',\`rotate(\${state.phase} \${cx} \${cy})\`);
      vecInc.setAttribute('transform',\`rotate(\${state.phase} \${cx} \${cy})\`);
      vecRun.setAttribute('transform',\`rotate(0 \${cx} \${cy})\`);
    } else if(state.paralleled){
      syncNeedle.setAttribute('transform',\`rotate(0 \${cx} \${cy})\`);
      vecInc.setAttribute('transform',\`rotate(0 \${cx} \${cy})\`);
    } else {
      // park needle at bottom (rest) when no comparison possible
      syncNeedle.setAttribute('transform',\`rotate(180 \${cx} \${cy})\`);
    }

    // phase readout
    const pv=document.getElementById('phaseVal');
    if(scopeLive){
      let p=state.phase; if(p>180)p-=360;
      pv.textContent=(p>=0?'+':'')+p.toFixed(0)+' \\u00B0';
    } else if(state.paralleled){ pv.textContent='0 \\u00B0'; }
    else { pv.textContent='— \\u00B0'; }

    // synch lamps (dark-lamp method): bright when out of phase, dark at synch
    const lampL=document.getElementById('lampL'), lampR=document.getElementById('lampR');
    if(scopeLive){
      const vi=state.genVolt, vr=busVolt(), ph=state.phase*Math.PI/180;
      const across=Math.sqrt(vi*vi+vr*vr-2*vi*vr*Math.cos(ph)); // kV across open breaker
      const b=Math.min(1, across/(2*NOM_KV)); // 0 dark .. 1 bright
      const glow=Math.round(b*255);
      const col=\`rgb(\${Math.round(40+glow*0.95)},\${Math.round(30+glow*0.62)},\${Math.round(12+glow*0.05)})\`;
      const sh=b>0.05?\`0 0 \${6+b*16}px rgba(245,165,36,\${b})\`:'none';
      lampL.style.background=col;lampR.style.background=col;
      lampL.style.boxShadow=\`0 0 0 1px #000 inset, 0 0 0 4px #0c0e12, \${sh}\`;
      lampR.style.boxShadow=\`0 0 0 1px #000 inset, 0 0 0 4px #0c0e12, \${sh}\`;
    } else {
      lampL.style.background='#171a1f';lampR.style.background='#171a1f';
      lampL.style.boxShadow='0 0 0 1px #000 inset, 0 0 0 4px #0c0e12';
      lampR.style.boxShadow='0 0 0 1px #000 inset, 0 0 0 4px #0c0e12';
    }

    // control lamps
    setLamp('m-g',state.master); setLamp('m-r',!state.master); setLamp('m-a',state.master&&Math.abs(state.genFreq-state.speedSet)>0.5);
    setLamp('s-g',state.jog.speed>0.05); setLamp('s-r',state.jog.speed<-0.05); setLamp('s-a',state.master&&Math.abs(state.jog.speed)<=0.05);
    setLamp('v-g',state.jog.volt>0.05); setLamp('v-r',state.jog.volt<-0.05); setLamp('v-a',state.master&&Math.abs(state.jog.volt)<=0.05);

    // waveform (advanced in step() so it tracks sim time and pauses correctly)
    drawWave();
  }
  function setLamp(id,on){
    const el=document.querySelector(\`[data-lamp="\${id}"]\`);
    if(el)el.classList.toggle('on',!!on);
  }

  refreshStatic();
  requestAnimationFrame(loop);
})();
</script>
</body>
</html>
`;
  var f = document.createElement('iframe');
  f.title = "SynchLab — generator synchronizing simulator";
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
