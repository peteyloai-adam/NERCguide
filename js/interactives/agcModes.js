/* ============================================================================
   INTERACTIVE: AGC control modes, paired
                NERC.interactives.agcModes

   Two interconnected areas, 20 MW of load added to Area A. What happens to
   frequency depends entirely on which control mode each area is running -
   the three cases straight out of the SME deck:

     FF + 5% droop  the working arrangement. Governors arrest the dip; the
                    Flat Frequency area then picks up all 20 MW (133 -> 153)
                    and frequency is restored to 60.00. The droop unit's
                    transient contribution (to ~149 MW) washes back out.
     CNI + CNI      each area holds its own interchange. The area that gained
                    the load picks it up - but Constant Net Interchange has NO
                    frequency component, so frequency is never restored and
                    parks at 59.88.
     FF + FF        must never happen. Both areas chase 60 Hz with no load or
                    interchange term, overshoot each other, and the excursion
                    grows every cycle until both trip on over/under frequency.

   Frequency traces are computed analytically and drawn as polylines - no
   timers, no animation loop. Hardcoded hex matches console.css tokens.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.agcModes = function (mount) {
  var GREEN = '#3FB98C', AMBER = '#E0A83E', PHOS = '#56C2E6',
      READ = '#C9D6E4', DIM = '#7E8DA0', AXIS = '#2A3648', RED = '#E5484D';

  var CASES = {
    'ff-droop': {
      a: 'AGC \u00B7 Flat Frequency', b: '5% droop governor',
      aFrom: 133, aTo: 153, bFrom: 133, bTo: 133, bPeak: 149,
      settle: 60.00, ok: true,
      title: 'Flat Frequency + droop \u2014 this is the working arrangement',
      body: 'Both areas see the frequency drop and both respond. The droop unit contributes immediately (out to about 149 MW) as primary response, but the area on <strong>AGC Flat Frequency</strong> responds much more strongly and picks up <strong>all 20 MW</strong>, moving 133 \u2192 153 MW. With the load covered, frequency is driven back to <strong>60.00 Hz</strong> and the droop unit washes back to where it started.'
    },
    'cni-cni': {
      a: 'AGC \u00B7 Constant Net Interchange', b: 'AGC \u00B7 Constant Net Interchange',
      aFrom: 133, aTo: 153, bFrom: 133, bTo: 133, bPeak: 149,
      settle: 59.88, ok: false,
      title: 'CNI + CNI \u2014 load is covered, frequency is not',
      body: 'Constant Net Interchange holds each area to its scheduled interchange, so the area that gained the load ends up carrying it (133 \u2192 153 MW) and the neighbor returns to schedule. But <strong>CNI has no frequency component in its ACE calculation</strong> \u2014 nothing in either area is trying to correct 60 Hz. Frequency simply parks at <strong>59.88 Hz</strong> and stays there.'
    },
    'ff-ff': {
      a: 'AGC \u00B7 Flat Frequency', b: 'AGC \u00B7 Flat Frequency',
      aFrom: 133, aTo: null, bFrom: 133, bTo: null, bPeak: null,
      settle: null, ok: false,
      title: 'Flat Frequency + Flat Frequency \u2014 this should never happen',
      body: 'In Flat Frequency there is no load or interchange term \u2014 only frequency. So <strong>both</strong> areas drive to return frequency to 60 Hz, and together they overshoot it. Both then push the other way and undershoot further. With every cycle the excursion grows until <strong>both units trip on over- or under-frequency</strong>. Two controllers, one target, no way to share it.'
    }
  };
  var mode = 'ff-droop';

  // plot box
  var X0 = 58, X1 = 578, YT = 24, YB = 206;
  var TMAX = 60, FLO = 57.5, FHI = 62.5, TSTEP = 6;   // load added at t = 6 s
  var TRIP_HI = 61.5, TRIP_LO = 58.5;

  function freq(t) {
    if (t < TSTEP) return 60;
    var d = t - TSTEP;
    if (mode === 'ff-droop') return 60 - 0.12 * Math.exp(-d / 9);
    if (mode === 'cni-cni')  return 59.88;
    return 60 - 0.12 * Math.cos(2 * Math.PI * d / 14) * Math.exp(d / 16);   // ff-ff: growing hunt
  }
  function xT(t) { return X0 + (t / TMAX) * (X1 - X0); }
  function yF(f) { return YB - ((f - FLO) / (FHI - FLO)) * (YB - YT); }

  function chart() {
    var c = CASES[mode], s = '';
    s += '<svg viewBox="0 0 600 250" style="width:100%;max-width:600px;height:auto" role="img" ' +
         'aria-label="Frequency against time after 20 MW of load is added, for the selected pair of control modes">';

    // trip bands
    s += '<rect x="' + X0 + '" y="' + YT + '" width="' + (X1 - X0) + '" height="' + (yF(TRIP_HI) - YT).toFixed(1) +
         '" fill="' + RED + '" opacity="0.10"/>';
    s += '<rect x="' + X0 + '" y="' + yF(TRIP_LO).toFixed(1) + '" width="' + (X1 - X0) + '" height="' + (YB - yF(TRIP_LO)).toFixed(1) +
         '" fill="' + RED + '" opacity="0.10"/>';

    // gridlines
    for (var fv = 58; fv <= 62; fv += 1) {
      var gy = yF(fv);
      s += '<line x1="' + X0 + '" y1="' + gy.toFixed(1) + '" x2="' + X1 + '" y2="' + gy.toFixed(1) +
           '" stroke="' + (fv === 60 ? '#3A4A60' : AXIS) + '" stroke-width="1" opacity="' + (fv === 60 ? 1 : 0.65) + '"/>';
      s += '<text x="' + (X0 - 8) + '" y="' + (gy + 3.5).toFixed(1) + '" fill="' + (fv === 60 ? READ : DIM) +
           '" font-family="monospace" font-size="9" text-anchor="end">' + fv.toFixed(0) + '</text>';
    }
    s += '<text x="16" y="' + ((YT + YB) / 2) + '" fill="' + DIM + '" font-family="monospace" font-size="9.5" ' +
         'text-anchor="middle" transform="rotate(-90 16 ' + ((YT + YB) / 2) + ')">FREQUENCY (Hz)</text>';

    // load-step marker
    s += '<line x1="' + xT(TSTEP).toFixed(1) + '" y1="' + YT + '" x2="' + xT(TSTEP).toFixed(1) + '" y2="' + YB +
         '" stroke="' + PHOS + '" stroke-width="1" stroke-dasharray="3 3" opacity="0.8"/>';
    s += '<text x="' + (xT(TSTEP) + 5).toFixed(1) + '" y="' + (YT + 11) + '" fill="' + PHOS +
         '" font-family="monospace" font-size="9">+20 MW load</text>';

    // trace (stop at trip)
    var pts = '', tripT = null;
    for (var t = 0; t <= TMAX; t += 0.4) {
      var f = freq(t);
      if (f >= TRIP_HI || f <= TRIP_LO) { tripT = t; break; }
      pts += xT(t).toFixed(1) + ',' + yF(f).toFixed(1) + ' ';
    }
    var col = c.ok ? GREEN : (mode === 'ff-ff' ? RED : AMBER);
    s += '<polyline points="' + pts + '" fill="none" stroke="' + col + '" stroke-width="2.5"/>';

    if (tripT !== null) {
      var tx = xT(tripT), ty = yF(freq(tripT) >= TRIP_HI ? TRIP_HI : TRIP_LO);
      s += '<circle cx="' + tx.toFixed(1) + '" cy="' + ty.toFixed(1) + '" r="5" fill="' + RED + '"/>';
      s += '<text x="' + (tx - 6).toFixed(1) + '" y="' + (ty - 9).toFixed(1) + '" fill="' + RED +
           '" font-family="monospace" font-size="9.5" text-anchor="end">UNITS TRIP</text>';
    } else if (mode === 'cni-cni') {
      s += '<text x="' + (X1 - 6) + '" y="' + (yF(59.88) - 8).toFixed(1) + '" fill="' + AMBER +
           '" font-family="monospace" font-size="9.5" text-anchor="end">parks at 59.88 \u2014 never restored</text>';
    } else {
      s += '<text x="' + (X1 - 6) + '" y="' + (yF(60) - 8).toFixed(1) + '" fill="' + GREEN +
           '" font-family="monospace" font-size="9.5" text-anchor="end">restored to 60.00</text>';
    }

    // time axis
    for (var tv = 0; tv <= TMAX; tv += 15) {
      s += '<text x="' + xT(tv).toFixed(1) + '" y="' + (YB + 17) + '" fill="' + DIM +
           '" font-family="monospace" font-size="9" text-anchor="middle">' + tv + '</text>';
    }
    s += '<text x="' + ((X0 + X1) / 2) + '" y="' + (YB + 32) + '" fill="' + DIM +
         '" font-family="monospace" font-size="9.5" text-anchor="middle">TIME (seconds)</text>';
    s += '</svg>';
    return s;
  }

  function mw(from, to, peak) {
    if (to === null) return '<span style="color:' + RED + '">hunting \u2014 trips</span>';
    var txt = from + ' \u2192 <b>' + to + ' MW</b>';
    if (peak && peak !== to) txt += ' <span style="color:' + DIM + '">(peaks ~' + peak + ')</span>';
    return txt;
  }

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00B7 AGC control modes, paired</div>' +
      '<div class="c-int__ctrl" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">' +
        '<button class="c-btn c-btn--primary" data-case="ff-droop">Flat Frequency + droop</button>' +
        '<button class="c-btn" data-case="cni-cni">CNI + CNI</button>' +
        '<button class="c-btn" data-case="ff-ff">Flat Frequency + Flat Frequency</button>' +
      '</div>' +
      '<div id="am-chart"></div>' +
      '<div class="c-int__readouts" style="min-width:0;grid-template-columns:repeat(2,minmax(190px,1fr));margin-top:12px">' +
        '<div class="c-int__ro">Area A <span id="am-amode" style="color:' + DIM + '"></span><br><span id="am-amw"></span></div>' +
        '<div class="c-int__ro">Area B <span id="am-bmode" style="color:' + DIM + '"></span><br><span id="am-bmw"></span></div>' +
      '</div>' +
      '<div class="c-note" id="am-verdict" style="margin-top:12px"></div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };

  function paint() {
    var c = CASES[mode];
    $('am-chart').innerHTML = chart();
    $('am-amode').textContent = '\u00B7 ' + c.a;
    $('am-bmode').textContent = '\u00B7 ' + c.b;
    $('am-amw').innerHTML = mw(c.aFrom, c.aTo, null);
    $('am-bmw').innerHTML = mw(c.bFrom, c.bTo, c.bPeak);
    var v = $('am-verdict');
    v.className = 'c-note ' + (c.ok ? 'c-note--normal' : (mode === 'ff-ff' ? 'c-note--emergency' : 'c-note--alert'));
    v.innerHTML = '<div class="c-note__title">' + c.title + '</div>' + c.body;
  }

  mount.querySelectorAll('[data-case]').forEach(function (b) {
    b.addEventListener('click', function () {
      mode = b.getAttribute('data-case');
      mount.querySelectorAll('[data-case]').forEach(function (x) { x.classList.toggle('c-btn--primary', x === b); });
      paint();
    });
  });

  paint();
};
