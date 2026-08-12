/* ============================================================================
   INTERACTIVE: Three-phase explorer  —  NERC.interactives.threePhase

   Teaches WHY the grid is three-phase. The learner scrubs a single slider
   through one AC cycle (no timers / no animation loop, per project rules) and
   watches three things move together:
     1. a rotating phasor diagram (three vectors 120 degrees apart),
     2. the three phase-voltage waves with a live cursor, and
     3. the TOTAL instantaneous power delivered to the load.

   The payoff: with a balanced three-phase load the total power is a FLAT line
   (smooth, non-pulsating delivery and the three currents sum to zero), while
   single-phase power pulses to zero twice a cycle and an unbalanced set leaves
   leftover neutral current. Three modes let the learner feel the difference.

   Self-contained SVG. Colors are hardcoded hex matching console.css tokens:
     phase A #56C2E6 (phosphor) · phase B #E0A83E (alert) · phase C #3FB98C
     (normal) · total-power / neutral #C9D6E4 (readout) · axes #2A3648.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.threePhase = function (mount) {
  var CA = '#56C2E6', CB = '#E0A83E', CC = '#3FB98C',
      CTOT = '#C9D6E4', AXIS = '#2A3648', DIM = '#7E8DA0';

  // load presets: per-phase magnitude (p.u.)
  var MODES = {
    balanced:   { a: 1,    b: 1,    c: 1,    label: 'Balanced 3-phase' },
    unbalanced: { a: 1,    b: 1,    c: 0.45, label: 'Unbalanced (phase C light)' },
    single:     { a: 1,    b: 0,    c: 0,    label: 'Single-phase (A only)' }
  };
  var mode = 'balanced';

  // geometry ----------------------------------------------------------------
  var PCX = 95, PCY = 96, PR = 68;                 // phasor circle
  var WX0 = 216, WX1 = 602, WMID = 96, WAMP = 60;  // wave band
  var PBASE = 306, PSCALE = 88, PTOP = 176;        // power band (baseline .. top)
  var OFF = { a: 0, b: -120, c: 120 };             // phase offsets (deg)
  var d2r = function (d) { return d * Math.PI / 180; };
  var xT = function (t) { return WX0 + (t / 360) * (WX1 - WX0); };
  var yV = function (v) { return WMID - v * WAMP; };
  var val = function (ph, t, m) { return m[ph] * Math.cos(d2r(t + OFF[ph])); };
  var pwr = function (t, m) {                       // instantaneous total power (resistive load)
    return ['a', 'b', 'c'].reduce(function (s, ph) {
      var v = val(ph, t, m); return s + v * v; }, 0);
  };

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00B7 Why the grid is three-phase</div>' +
      '<svg viewBox="0 0 620 330" style="width:100%;max-width:620px;height:auto" role="img" ' +
           'aria-label="Rotating three-phase phasors, the three phase-voltage waves, and the total power delivered">' +

        /* --- phasor diagram --- */
        '<text x="95" y="20" fill="' + DIM + '" font-family="monospace" font-size="10" text-anchor="middle">PHASORS (rotating)</text>' +
        '<circle cx="' + PCX + '" cy="' + PCY + '" r="' + PR + '" fill="none" stroke="' + AXIS + '" stroke-width="1"/>' +
        '<line x1="' + (PCX - PR) + '" y1="' + PCY + '" x2="' + (PCX + PR) + '" y2="' + PCY + '" stroke="' + AXIS + '" stroke-width="1"/>' +
        '<line x1="' + PCX + '" y1="' + (PCY - PR) + '" x2="' + PCX + '" y2="' + (PCY + PR) + '" stroke="' + AXIS + '" stroke-width="1"/>' +
        '<line id="tp-pa" stroke="' + CA + '" stroke-width="3"/>' +
        '<line id="tp-pb" stroke="' + CB + '" stroke-width="3"/>' +
        '<line id="tp-pc" stroke="' + CC + '" stroke-width="3"/>' +
        '<circle id="tp-da" r="3.5" fill="' + CA + '"/>' +
        '<circle id="tp-db" r="3.5" fill="' + CB + '"/>' +
        '<circle id="tp-dc" r="3.5" fill="' + CC + '"/>' +

        /* --- wave band --- */
        '<text x="216" y="20" fill="' + DIM + '" font-family="monospace" font-size="10">PHASE VOLTAGES (one cycle)</text>' +
        '<line x1="' + WX0 + '" y1="' + WMID + '" x2="' + WX1 + '" y2="' + WMID + '" stroke="' + AXIS + '" stroke-width="1"/>' +
        '<polyline id="tp-wa" fill="none" stroke="' + CA + '" stroke-width="2"/>' +
        '<polyline id="tp-wb" fill="none" stroke="' + CB + '" stroke-width="2"/>' +
        '<polyline id="tp-wc" fill="none" stroke="' + CC + '" stroke-width="2"/>' +
        '<line id="tp-cur" stroke="' + CTOT + '" stroke-width="1" stroke-dasharray="3 3" opacity="0.8"/>' +
        '<circle id="tp-wda" r="3.5" fill="' + CA + '"/>' +
        '<circle id="tp-wdb" r="3.5" fill="' + CB + '"/>' +
        '<circle id="tp-wdc" r="3.5" fill="' + CC + '"/>' +

        /* --- power band --- */
        '<text x="216" y="168" fill="' + DIM + '" font-family="monospace" font-size="10">TOTAL POWER DELIVERED TO LOAD</text>' +
        '<line x1="' + WX0 + '" y1="' + PBASE + '" x2="' + WX1 + '" y2="' + PBASE + '" stroke="' + AXIS + '" stroke-width="1"/>' +
        '<line id="tp-flat" x1="' + WX0 + '" y1="' + (PBASE - 1.5 * PSCALE) + '" x2="' + WX1 + '" y2="' + (PBASE - 1.5 * PSCALE) + '" stroke="' + DIM + '" stroke-width="1" stroke-dasharray="2 4"/>' +
        '<polyline id="tp-wp" fill="none" stroke="' + CTOT + '" stroke-width="2"/>' +
        '<line id="tp-pcur" stroke="' + CTOT + '" stroke-width="1" stroke-dasharray="3 3" opacity="0.8"/>' +
        '<circle id="tp-pd" r="3.5" fill="' + CTOT + '"/>' +
      '</svg>' +

      '<div class="c-int__readouts" style="min-width:0;grid-template-columns:repeat(2,minmax(150px,1fr));margin-top:12px">' +
        '<div class="c-int__ro"><span style="color:' + CA + '">Phase A</span> <b id="tp-va">+1.00</b></div>' +
        '<div class="c-int__ro"><span style="color:' + CB + '">Phase B</span> <b id="tp-vb">-0.50</b></div>' +
        '<div class="c-int__ro"><span style="color:' + CC + '">Phase C</span> <b id="tp-vc">-0.50</b></div>' +
        '<div class="c-int__ro">A + B + C (neutral) <b id="tp-sum">0.00</b></div>' +
        '<div class="c-int__ro">Total power <b id="tp-p">1.50</b></div>' +
        '<div class="c-int__ro">Delivery <b id="tp-verdict">smooth</b></div>' +
      '</div>' +

      '<div class="c-int__ctrl">' +
        '<label for="tp-slider" id="tp-slabel">Scrub through one AC cycle: 0\u00B0</label>' +
        '<input id="tp-slider" type="range" min="0" max="359" value="30" aria-label="Position within one AC cycle, degrees">' +
      '</div>' +
      '<div class="c-int__ctrl" style="display:flex;gap:8px;flex-wrap:wrap">' +
        '<button class="c-btn c-btn--primary" data-mode="balanced">Balanced</button>' +
        '<button class="c-btn" data-mode="unbalanced">Unbalanced</button>' +
        '<button class="c-btn" data-mode="single">Single-phase</button>' +
      '</div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };
  var slider = $('tp-slider');

  // build the three voltage waves + the power trace for the active mode -------
  function buildWaves() {
    var m = MODES[mode], wa = '', wb = '', wc = '', wp = '';
    for (var t = 0; t <= 360; t += 3) {
      var x = xT(t).toFixed(1);
      wa += x + ',' + yV(val('a', t, m)).toFixed(1) + ' ';
      wb += x + ',' + yV(val('b', t, m)).toFixed(1) + ' ';
      wc += x + ',' + yV(val('c', t, m)).toFixed(1) + ' ';
      wp += x + ',' + (PBASE - pwr(t, m) * PSCALE).toFixed(1) + ' ';
    }
    $('tp-wa').setAttribute('points', wa);
    $('tp-wb').setAttribute('points', wb);
    $('tp-wc').setAttribute('points', wc);
    $('tp-wp').setAttribute('points', wp);
    // the dashed reference (constant 1.5) is only meaningful when balanced
    $('tp-flat').setAttribute('opacity', mode === 'balanced' ? '0.9' : '0.25');
  }

  function phasor(ph, t, m, lineId, dotId) {
    var ang = d2r(t + OFF[ph]), r = PR * m[ph];
    var ex = PCX + r * Math.cos(ang), ey = PCY - r * Math.sin(ang);
    var ln = $(lineId); ln.setAttribute('x1', PCX); ln.setAttribute('y1', PCY);
    ln.setAttribute('x2', ex.toFixed(1)); ln.setAttribute('y2', ey.toFixed(1));
    var dt = $(dotId); dt.setAttribute('cx', ex.toFixed(1)); dt.setAttribute('cy', ey.toFixed(1));
    dt.setAttribute('opacity', m[ph] > 0.02 ? '1' : '0');
    ln.setAttribute('opacity', m[ph] > 0.02 ? '1' : '0');
  }

  function render(t) {
    var m = MODES[mode];
    var va = val('a', t, m), vb = val('b', t, m), vc = val('c', t, m);
    var sum = va + vb + vc, p = pwr(t, m);

    phasor('a', t, m, 'tp-pa', 'tp-da');
    phasor('b', t, m, 'tp-pb', 'tp-db');
    phasor('c', t, m, 'tp-pc', 'tp-dc');

    var cx = xT(t).toFixed(1);
    var cur = $('tp-cur'); cur.setAttribute('x1', cx); cur.setAttribute('x2', cx);
    cur.setAttribute('y1', WMID - WAMP - 6); cur.setAttribute('y2', WMID + WAMP + 6);
    var pcur = $('tp-pcur'); pcur.setAttribute('x1', cx); pcur.setAttribute('x2', cx);
    pcur.setAttribute('y1', PTOP - 4); pcur.setAttribute('y2', PBASE);

    function dot(id, v, on) { var d = $(id); d.setAttribute('cx', cx); d.setAttribute('cy', yV(v).toFixed(1)); d.setAttribute('opacity', on ? '1' : '0'); }
    dot('tp-wda', va, true); dot('tp-wdb', vb, m.b > 0.02); dot('tp-wdc', vc, m.c > 0.02);
    var pd = $('tp-pd'); pd.setAttribute('cx', cx); pd.setAttribute('cy', (PBASE - p * PSCALE).toFixed(1));

    var f = function (n) { return (n >= 0 ? '+' : '') + n.toFixed(2); };
    $('tp-va').textContent = f(va);
    $('tp-vb').textContent = m.b > 0.02 ? f(vb) : '\u2014';
    $('tp-vc').textContent = m.c > 0.02 ? f(vc) : '\u2014';
    $('tp-sum').textContent = f(sum);
    $('tp-p').textContent = p.toFixed(2);
    $('tp-slabel').textContent = 'Scrub through one AC cycle: ' + t + '\u00B0';

    var verdict = $('tp-verdict');
    if (mode === 'balanced') { verdict.textContent = 'smooth \u00B7 constant'; verdict.style.color = CC; }
    else if (mode === 'single') { verdict.textContent = 'pulsing to zero'; verdict.style.color = '#E5484D'; }
    else { verdict.textContent = 'rippling'; verdict.style.color = CB; }
    // color the neutral readout when it is not (near) zero
    $('tp-sum').style.color = Math.abs(sum) > 0.05 ? CB : CTOT;
  }

  slider.addEventListener('input', function () { render(+this.value); });
  mount.querySelectorAll('[data-mode]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      mode = btn.getAttribute('data-mode');
      mount.querySelectorAll('[data-mode]').forEach(function (b) {
        b.classList.toggle('c-btn--primary', b === btn);
      });
      buildWaves();
      render(+slider.value);
    });
  });

  buildWaves();
  render(+slider.value);
};
