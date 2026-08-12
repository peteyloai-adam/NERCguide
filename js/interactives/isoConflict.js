/* ============================================================================
   INTERACTIVE: Two isochronous governors on one island
                NERC.interactives.isoConflict

   The failure mode from the SME deck. Put two units on isochronous control in
   the same island and each one holds the island to its OWN frequency
   reference. Those references are never truly identical - the deck lists why:
   resolution of measured turbine speed, resolution of the reference signal
   (analog vs digital), and the tuning of the comparator itself. One unit may
   read 60 Hz at 3601 rpm and another at 3599.6 rpm.

   Whichever unit is controlling to the HIGHER frequency sees the island as too
   slow and raises output; the unit controlling to the LOWER frequency sees it
   as too fast and backs down. Neither is wrong by its own measurement, so the
   split never resolves: it creeps, then accelerates, until one machine is at
   its limit and trips. The deck's worked case is Gen A at 60.008 Hz / 20 MW
   against Gen B at 60.002 Hz / 15 MW.

   Divergence is modelled as exponential growth with a time constant inversely
   proportional to the reference gap - slow at first, then fast, as described.
   Curves are computed and drawn as polylines: no timers, no animation loop.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.isoConflict = function (mount) {
  var GREEN = '#3FB98C', AMBER = '#E0A83E', PHOS = '#56C2E6',
      READ = '#C9D6E4', DIM = '#7E8DA0', AXIS = '#2A3648', RED = '#E5484D';

  var A0 = 20, B0 = 15, AMAX = 60;          // MW: starting outputs, A's ceiling
  var fA = 60.008, fB = 60.002;             // the deck's worked example
  var TMAX = 30;                            // minutes shown

  var X0 = 56, X1 = 578, YT = 24, YB = 200;
  var QMAX = 45;                            // MW axis top

  function gap() { return Math.abs(fA - fB); }
  function tau() {                          // minutes; smaller gap -> slower creep
    var g = gap() * 1000;                   // in mHz
    return g < 0.0005 ? Infinity : 12 / g;
  }
  function spread(t) {                      // MW of divergence at time t
    var T = tau();
    if (!isFinite(T)) return 0;
    return 0.1 * (Math.exp(t / T) - 1);
  }
  function tripTime() {                     // when the backing-down unit hits zero
    var T = tau();
    if (!isFinite(T)) return null;
    var t = T * Math.log(B0 / 0.1 + 1);
    return t;
  }
  function xT(t) { return X0 + (t / TMAX) * (X1 - X0); }
  function yQ(q) { return YB - (q / QMAX) * (YB - YT); }

  function chart() {
    var s = '', up = fA >= fB;              // whichever reference is higher rises
    var upStart = up ? A0 : B0, dnStart = up ? B0 : A0;
    var tTrip = tripTime();

    s += '<svg viewBox="0 0 600 244" style="width:100%;max-width:600px;height:auto" role="img" ' +
         'aria-label="Output of two isochronous units over time, diverging until one trips">';

    // grid
    for (var q = 0; q <= QMAX; q += 15) {
      var gy = yQ(q);
      s += '<line x1="' + X0 + '" y1="' + gy.toFixed(1) + '" x2="' + X1 + '" y2="' + gy.toFixed(1) +
           '" stroke="' + AXIS + '" stroke-width="1" opacity="0.7"/>';
      s += '<text x="' + (X0 - 8) + '" y="' + (gy + 3.5).toFixed(1) + '" fill="' + DIM +
           '" font-family="monospace" font-size="9" text-anchor="end">' + q + '</text>';
    }
    s += '<text x="14" y="' + ((YT + YB) / 2) + '" fill="' + DIM + '" font-family="monospace" font-size="9.5" ' +
         'text-anchor="middle" transform="rotate(-90 14 ' + ((YT + YB) / 2) + ')">OUTPUT (MW)</text>';

    // traces
    var upPts = '', dnPts = '', tEnd = tTrip === null ? TMAX : Math.min(tTrip, TMAX);
    for (var t = 0; t <= tEnd + 0.001; t += 0.25) {
      var d = spread(t);
      var uq = Math.min(upStart + d, QMAX), dq = Math.max(dnStart - d, 0);
      upPts += xT(t).toFixed(1) + ',' + yQ(uq).toFixed(1) + ' ';
      dnPts += xT(t).toFixed(1) + ',' + yQ(dq).toFixed(1) + ' ';
    }
    s += '<polyline points="' + upPts + '" fill="none" stroke="' + AMBER + '" stroke-width="2.5"/>';
    s += '<polyline points="' + dnPts + '" fill="none" stroke="' + PHOS + '" stroke-width="2.5"/>';

    // labels
    s += '<text x="' + (X0 + 8) + '" y="' + (yQ(upStart) - 8).toFixed(1) + '" fill="' + AMBER +
         '" font-family="monospace" font-size="9.5">Gen ' + (up ? 'A' : 'B') + ' \u00B7 higher reference \u2192 ramps UP</text>';
    s += '<text x="' + (X0 + 8) + '" y="' + (yQ(dnStart) + 16).toFixed(1) + '" fill="' + PHOS +
         '" font-family="monospace" font-size="9.5">Gen ' + (up ? 'B' : 'A') + ' \u00B7 lower reference \u2192 backs DOWN</text>';

    // trip marker
    if (tTrip !== null && tTrip <= TMAX) {
      s += '<line x1="' + xT(tTrip).toFixed(1) + '" y1="' + YT + '" x2="' + xT(tTrip).toFixed(1) + '" y2="' + YB +
           '" stroke="' + RED + '" stroke-width="1" stroke-dasharray="3 3"/>';
      s += '<circle cx="' + xT(tTrip).toFixed(1) + '" cy="' + yQ(0).toFixed(1) + '" r="5" fill="' + RED + '"/>';
      s += '<text x="' + (xT(tTrip) - 6).toFixed(1) + '" y="' + (YT + 12) + '" fill="' + RED +
           '" font-family="monospace" font-size="9.5" text-anchor="end">TRIPS at ' + tTrip.toFixed(1) + ' min</text>';
    }

    // time axis
    for (var tv = 0; tv <= TMAX; tv += 10) {
      s += '<text x="' + xT(tv).toFixed(1) + '" y="' + (YB + 17) + '" fill="' + DIM +
           '" font-family="monospace" font-size="9" text-anchor="middle">' + tv + '</text>';
    }
    s += '<text x="' + ((X0 + X1) / 2) + '" y="' + (YB + 32) + '" fill="' + DIM +
         '" font-family="monospace" font-size="9.5" text-anchor="middle">TIME (minutes)</text>';
    s += '</svg>';
    return s;
  }

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00B7 Two isochronous governors, one island</div>' +
      '<div id="ic-chart"></div>' +
      '<div class="c-int__readouts" style="min-width:0;grid-template-columns:repeat(2,minmax(160px,1fr));margin-top:12px">' +
        '<div class="c-int__ro">Reference gap <b id="ic-gap"></b></div>' +
        '<div class="c-int__ro">Time to trip <b id="ic-trip"></b></div>' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="ic-fa" id="ic-falab">Gen A controls to 60.008 Hz</label>' +
        '<input id="ic-fa" type="range" min="60000" max="60012" step="1" value="60008" aria-label="Generator A frequency reference">' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="ic-fb" id="ic-fblab">Gen B controls to 60.002 Hz</label>' +
        '<input id="ic-fb" type="range" min="60000" max="60012" step="1" value="60002" aria-label="Generator B frequency reference">' +
      '</div>' +
      '<div class="c-int__ctrl" style="display:flex;gap:8px;flex-wrap:wrap">' +
        '<button class="c-btn" id="ic-same">Set both identical</button>' +
        '<button class="c-btn c-btn--ghost" id="ic-reset">Back to the worked example</button>' +
      '</div>' +
      '<div class="c-note" id="ic-verdict" style="margin-top:12px"></div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };

  function paint() {
    $('ic-chart').innerHTML = chart();
    $('ic-falab').textContent = 'Gen A controls to ' + fA.toFixed(3) + ' Hz';
    $('ic-fblab').textContent = 'Gen B controls to ' + fB.toFixed(3) + ' Hz';
    var g = gap(), t = tripTime();
    $('ic-gap').textContent = (g * 1000).toFixed(0) + ' mHz';
    $('ic-gap').style.color = g < 0.0005 ? GREEN : AMBER;
    $('ic-trip').textContent = t === null ? 'never (in theory)' :
      (t <= TMAX ? t.toFixed(1) + ' min' : Math.round(t) + ' min \u2014 beyond chart');
    $('ic-trip').style.color = t === null ? GREEN : RED;

    var v = $('ic-verdict');
    if (g < 0.0005) {
      v.className = 'c-note c-note--alert';
      v.innerHTML = '<div class="c-note__title">Identical references \u2014 which never actually happens</div>' +
        'On paper, two perfectly matched references sit still. In practice they cannot be matched. Every unit has its own signature: the resolution of measured turbine speed (one machine reads 60 Hz at 3601 rpm, another at 3599.6), whether the reference is analog or digital, and how the comparator is tuned. Nudge either slider by a single millihertz and the divergence starts.';
    } else {
      var hi = fA >= fB ? 'A' : 'B', lo = fA >= fB ? 'B' : 'A';
      v.className = 'c-note c-note--emergency';
      v.innerHTML = '<div class="c-note__title">Both units are \u201Ccorrect\u201D \u2014 and that is the problem</div>' +
        'Gen ' + hi + ' holds the higher reference, so it reads the island as running slow and <strong>raises output</strong>. Gen ' + lo +
        ' holds the lower reference, reads the same island as running fast, and <strong>backs down</strong>. Neither is malfunctioning \u2014 each is doing exactly what an isochronous governor does, against a target only it believes in. ' +
        'The split creeps at first, then accelerates through the feedback loop, until Gen ' + lo +
        ' is pushed to zero and trips, dropping the island onto whatever is left. <strong>Only one unit on an island may run isochronous;</strong> everything else goes on droop.';
    }
  }

  $('ic-fa').addEventListener('input', function () { fA = +this.value / 1000; paint(); });
  $('ic-fb').addEventListener('input', function () { fB = +this.value / 1000; paint(); });
  $('ic-same').addEventListener('click', function () {
    fB = fA; $('ic-fb').value = String(Math.round(fA * 1000)); paint();
  });
  $('ic-reset').addEventListener('click', function () {
    fA = 60.008; fB = 60.002; $('ic-fa').value = '60008'; $('ic-fb').value = '60002'; paint();
  });

  paint();
};
