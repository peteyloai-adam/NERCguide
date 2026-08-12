/* ============================================================================
   INTERACTIVE: Surge impedance loading  —  NERC.interactives.silCurve

   Rebuilds the SIL chart from the SME deck: the MVAR a line PRODUCES (its
   charging, roughly constant for a given voltage and length) against the MVAR
   it CONSUMES (rises with the square of loading). Where the two cross is
   Surge Impedance Loading - the natural reactive balance point.

     below SIL -> line is a net SOURCE of VARs -> voltage tends to RISE (Ferranti)
     at SIL    -> produced == consumed, net zero
     above SIL -> line is a net SINK of VARs   -> voltage tends to SAG

   Charging rates are the deck's rules of thumb (0.25 / 0.75 / 2.0 MVAR per mile
   for 230 / 345 / 500 kV). SIL figures are typical for each class; the 345 kV
   value reproduces the deck's worked example (100 mi -> 75 MVAR charging,
   balance at 450 MW).

   Consumed = charging * (P / SIL)^2, which is exact at both anchor points
   (0 MW -> 0 MVAR; SIL -> charging) and is the correct I^2X relationship.

   No timers or animation loop, per project convention. Hardcoded hex matches
   console.css tokens.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.silCurve = function (mount) {
  var GREEN = '#3FB98C', AMBER = '#E0A83E', PHOS = '#56C2E6',
      READ = '#C9D6E4', DIM = '#7E8DA0', AXIS = '#2A3648', RED = '#E5484D';

  var LEVELS = {
    '230': { charge: 0.25, sil: 140 },
    '345': { charge: 0.75, sil: 450 },
    '500': { charge: 2.0,  sil: 1000 }
  };
  var kv = '345', miles = 100, load = 0;

  // plot geometry
  var X0 = 64, X1 = 592, YT = 28, YB = 236;

  function model() {
    var L = LEVELS[kv];
    var charging = L.charge * miles;              // MVAR produced
    var sil = L.sil;
    var consumed = charging * Math.pow(load / sil, 2);
    return { charging: charging, sil: sil, consumed: consumed, net: charging - consumed,
             pmax: sil * 1.5, qmax: charging * 2.3 };
  }
  function xP(p, m) { return X0 + (p / m.pmax) * (X1 - X0); }
  function yQ(q, m) { return YB - (q / m.qmax) * (YB - YT); }

  function chart() {
    var m = model(), s = '';
    var silX = xP(m.sil, m), curX = xP(load, m);

    s += '<svg viewBox="0 0 620 286" style="width:100%;max-width:620px;height:auto" role="img" ' +
         'aria-label="MVAR produced versus MVAR consumed against line loading, crossing at surge impedance loading">';

    // grid + axes
    for (var g = 0; g <= 4; g++) {
      var gy = YT + (YB - YT) * g / 4;
      s += '<line x1="' + X0 + '" y1="' + gy.toFixed(1) + '" x2="' + X1 + '" y2="' + gy.toFixed(1) +
           '" stroke="' + AXIS + '" stroke-width="1"/>';
      var gv = (m.qmax * (4 - g) / 4);
      s += '<text x="' + (X0 - 8) + '" y="' + (gy + 3.5).toFixed(1) + '" fill="' + DIM +
           '" font-family="monospace" font-size="9" text-anchor="end">' + Math.round(gv) + '</text>';
    }
    s += '<text x="14" y="' + ((YT + YB) / 2) + '" fill="' + DIM + '" font-family="monospace" font-size="9.5" ' +
         'text-anchor="middle" transform="rotate(-90 14 ' + ((YT + YB) / 2) + ')">MVAR</text>';
    // x ticks
    for (var t = 0; t <= 3; t++) {
      var pv = m.pmax * t / 3, tx = xP(pv, m);
      s += '<line x1="' + tx.toFixed(1) + '" y1="' + YB + '" x2="' + tx.toFixed(1) + '" y2="' + (YB + 5) + '" stroke="' + AXIS + '" stroke-width="1"/>';
      s += '<text x="' + tx.toFixed(1) + '" y="' + (YB + 17) + '" fill="' + DIM + '" font-family="monospace" font-size="9" text-anchor="middle">' + Math.round(pv) + '</text>';
    }
    s += '<text x="' + ((X0 + X1) / 2) + '" y="' + (YB + 32) + '" fill="' + DIM + '" font-family="monospace" font-size="9.5" text-anchor="middle">LINE LOADING (MW)</text>';

    // shaded regions between the curves
    var below = '', above = '';
    var step = m.pmax / 60, p;
    for (p = 0; p <= m.sil + 0.001; p += step) {
      below += xP(Math.min(p, m.sil), m).toFixed(1) + ',' + yQ(m.charging, m).toFixed(1) + ' ';
    }
    for (p = m.sil; p >= 0; p -= step) {
      below += xP(p, m).toFixed(1) + ',' + yQ(m.charging * Math.pow(p / m.sil, 2), m).toFixed(1) + ' ';
    }
    for (p = m.sil; p <= m.pmax; p += step) {
      above += xP(p, m).toFixed(1) + ',' + yQ(Math.min(m.charging * Math.pow(p / m.sil, 2), m.qmax), m).toFixed(1) + ' ';
    }
    for (p = m.pmax; p >= m.sil; p -= step) {
      above += xP(p, m).toFixed(1) + ',' + yQ(m.charging, m).toFixed(1) + ' ';
    }
    s += '<polygon points="' + below + '" fill="' + GREEN + '" opacity="0.13"/>';
    s += '<polygon points="' + above + '" fill="' + AMBER + '" opacity="0.13"/>';

    // consumed curve
    var cons = '';
    for (p = 0; p <= m.pmax; p += step) {
      var q = m.charging * Math.pow(p / m.sil, 2);
      if (q > m.qmax) break;
      cons += xP(p, m).toFixed(1) + ',' + yQ(q, m).toFixed(1) + ' ';
    }
    s += '<polyline points="' + cons + '" fill="none" stroke="' + AMBER + '" stroke-width="2.5"/>';
    // produced (charging) line
    s += '<line x1="' + X0 + '" y1="' + yQ(m.charging, m).toFixed(1) + '" x2="' + X1 + '" y2="' +
         yQ(m.charging, m).toFixed(1) + '" stroke="' + GREEN + '" stroke-width="2.5"/>';

    // SIL marker
    s += '<line x1="' + silX.toFixed(1) + '" y1="' + YT + '" x2="' + silX.toFixed(1) + '" y2="' + YB +
         '" stroke="' + PHOS + '" stroke-width="1" stroke-dasharray="4 4" opacity="0.85"/>';
    s += '<circle cx="' + silX.toFixed(1) + '" cy="' + yQ(m.charging, m).toFixed(1) + '" r="4.5" fill="' + PHOS + '"/>';
    s += '<text x="' + silX.toFixed(1) + '" y="' + (YT - 10) + '" fill="' + PHOS +
         '" font-family="monospace" font-size="10" text-anchor="middle">SIL ' + Math.round(m.sil) + ' MW</text>';

    // cursor
    s += '<line x1="' + curX.toFixed(1) + '" y1="' + YT + '" x2="' + curX.toFixed(1) + '" y2="' + YB +
         '" stroke="' + READ + '" stroke-width="1" stroke-dasharray="2 3" opacity="0.9"/>';
    s += '<circle cx="' + curX.toFixed(1) + '" cy="' + yQ(m.charging, m).toFixed(1) + '" r="3.5" fill="' + GREEN + '"/>';
    s += '<circle cx="' + curX.toFixed(1) + '" cy="' + yQ(Math.min(m.consumed, m.qmax), m).toFixed(1) + '" r="3.5" fill="' + AMBER + '"/>';

    // legend
    s += '<line x1="' + (X0 + 6) + '" y1="' + (YT + 10) + '" x2="' + (X0 + 26) + '" y2="' + (YT + 10) + '" stroke="' + GREEN + '" stroke-width="2.5"/>';
    s += '<text x="' + (X0 + 32) + '" y="' + (YT + 13.5) + '" fill="' + DIM + '" font-family="monospace" font-size="9">MVAR produced (charging)</text>';
    s += '<line x1="' + (X0 + 6) + '" y1="' + (YT + 26) + '" x2="' + (X0 + 26) + '" y2="' + (YT + 26) + '" stroke="' + AMBER + '" stroke-width="2.5"/>';
    s += '<text x="' + (X0 + 32) + '" y="' + (YT + 29.5) + '" fill="' + DIM + '" font-family="monospace" font-size="9">MVAR consumed (I\u00B2X)</text>';

    s += '</svg>';
    return s;
  }

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00B7 Surge impedance loading</div>' +
      '<div id="sil-chart"></div>' +
      '<div class="c-int__readouts" style="min-width:0;grid-template-columns:repeat(2,minmax(160px,1fr));margin-top:12px">' +
        '<div class="c-int__ro">Charging (produced) <b id="sil-prod">75</b></div>' +
        '<div class="c-int__ro">Consumed (I\u00B2X) <b id="sil-cons">0</b></div>' +
        '<div class="c-int__ro">Net to the system <b id="sil-net">+75</b></div>' +
        '<div class="c-int__ro">Line behaves as <b id="sil-mode">capacitive</b></div>' +
      '</div>' +
      '<div class="c-int__ctrl" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px">' +
        '<span style="font-family:var(--font-mono);font-size:.72rem;color:' + DIM + '">Voltage class:</span>' +
        '<button class="c-btn" data-kv="230">230 kV</button>' +
        '<button class="c-btn c-btn--primary" data-kv="345">345 kV</button>' +
        '<button class="c-btn" data-kv="500">500 kV</button>' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="sil-miles" id="sil-mileslab">Line length: 100 miles</label>' +
        '<input id="sil-miles" type="range" min="25" max="400" step="5" value="100" aria-label="Line length in miles">' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="sil-load" id="sil-loadlab">Line loading: 0 MW</label>' +
        '<input id="sil-load" type="range" min="0" max="675" step="5" value="0" aria-label="Line loading in MW">' +
      '</div>' +
      '<div class="c-note c-note--op" id="sil-verdict" style="margin-top:12px"></div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };

  function paint() {
    var m = model();
    $('sil-chart').innerHTML = chart();
    $('sil-prod').textContent = m.charging.toFixed(1) + ' MVAR';
    $('sil-cons').textContent = m.consumed.toFixed(1) + ' MVAR';
    var net = m.net;
    $('sil-net').textContent = (net >= 0 ? '+' : '') + net.toFixed(1) + ' MVAR';
    $('sil-net').style.color = Math.abs(net) < 0.5 ? PHOS : (net > 0 ? GREEN : AMBER);
    $('sil-mileslab').textContent = 'Line length: ' + miles + ' miles';
    $('sil-loadlab').textContent = 'Line loading: ' + load + ' MW';

    var mode = $('sil-mode'), verdict = $('sil-verdict');
    if (Math.abs(net) < 0.5) {
      mode.textContent = 'balanced \u2014 at SIL'; mode.style.color = PHOS;
      verdict.innerHTML = '<div class="c-note__title" style="color:' + PHOS + '">At surge impedance loading</div>' +
        'The line is consuming exactly the reactive power it produces. Net reactive exchange with the system is zero \u2014 this is the natural balance point, and it is what SIL means.';
    } else if (net > 0) {
      mode.textContent = 'capacitive \u2014 supplying VARs'; mode.style.color = GREEN;
      verdict.innerHTML = '<div class="c-note__title" style="color:' + GREEN + '">Below SIL \u2014 the line is a VAR source</div>' +
        'Lightly loaded, the line produces more reactive power than it consumes and pushes <strong>' + net.toFixed(0) +
        ' MVAR</strong> into the system, so <strong>voltage tends to rise</strong>. This is the condition behind Ferranti rise, and it is exactly what you face in the early stages of a restoration. Generators absorbing VARs (running under-excited) or shunt reactors are what bring it back down.';
    } else {
      mode.textContent = 'inductive \u2014 absorbing VARs'; mode.style.color = AMBER;
      verdict.innerHTML = '<div class="c-note__title" style="color:' + AMBER + '">Above SIL \u2014 the line is a VAR sink</div>' +
        'Loaded past SIL, the line consumes more reactive power than it produces, drawing <strong>' + Math.abs(net).toFixed(0) +
        ' MVAR</strong> from the system, so <strong>voltage tends to sag</strong>. This is normal operation: generators and capacitors supply the difference.';
    }
  }

  mount.querySelectorAll('[data-kv]').forEach(function (b) {
    b.addEventListener('click', function () {
      kv = b.getAttribute('data-kv');
      mount.querySelectorAll('[data-kv]').forEach(function (x) { x.classList.toggle('c-btn--primary', x === b); });
      var pmax = Math.round(LEVELS[kv].sil * 1.5 / 5) * 5;
      var ls = $('sil-load');
      ls.max = pmax;
      if (load > pmax) { load = pmax; }
      ls.value = load;
      paint();
    });
  });
  $('sil-miles').addEventListener('input', function () { miles = +this.value; paint(); });
  $('sil-load').addEventListener('input', function () { load = +this.value; paint(); });

  paint();
};
