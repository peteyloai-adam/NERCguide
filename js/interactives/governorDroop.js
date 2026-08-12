/* ============================================================================
   INTERACTIVE: Droop vs isochronous governor
                NERC.interactives.governorDroop

   A single unit carrying an island. Load is added; the unit must pick all of it
   up because nothing else is there to. What differs is where FREQUENCY ends up:

     droop d%      -> frequency settles low, by d% of 60 Hz per 100% of rating
     isochronous   -> frequency returns to 60.00 Hz regardless of load

   That is the definition from the SME deck made visible: an isochronous
   governor "maintains the same speed in the mechanism controlled regardless of
   the load," giving flat frequency and zero droop. It is also why blackstart
   resources must run isochronous - a droop unit alone on a dead island would
   let frequency sag further with every block of load picked up.

   Droop math: 5% droop = 100% output change for a 5% (3 Hz) frequency change,
   so  f = 60 - (d/100) * 60 * dP / Prated.

   No timers. Hardcoded hex matches console.css tokens.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.governorDroop = function (mount) {
  var GREEN = '#3FB98C', AMBER = '#E0A83E', PHOS = '#56C2E6',
      READ = '#C9D6E4', DIM = '#7E8DA0', AXIS = '#2A3648', RED = '#E5484D';

  var PRATED = 100, P0 = 20;      // MW rating, initial output
  var droop = 0, added = 0;       // % droop (0 = isochronous), MW of load added

  // plot box
  var X0 = 60, X1 = 566, YT = 26, YB = 214;
  var FLO = 57, FHI = 63;

  function freqAt(p) {            // characteristic: frequency for a given output
    if (droop === 0) return 60;
    return 60 - (droop / 100) * 60 * (p - P0) / PRATED;
  }
  function xP(p) { return X0 + (p / PRATED) * (X1 - X0); }
  function yF(f) { return YB - ((f - FLO) / (FHI - FLO)) * (YB - YT); }

  function chart() {
    var out = P0 + added, f = freqAt(out), s = '';
    s += '<svg viewBox="0 0 600 260" style="width:100%;max-width:600px;height:auto" role="img" ' +
         'aria-label="Governor characteristic: frequency against unit output, for droop and isochronous control">';

    // gridlines / freq labels
    for (var fv = FLO; fv <= FHI; fv += 1) {
      var gy = yF(fv);
      s += '<line x1="' + X0 + '" y1="' + gy.toFixed(1) + '" x2="' + X1 + '" y2="' + gy.toFixed(1) +
           '" stroke="' + (fv === 60 ? '#3A4A60' : AXIS) + '" stroke-width="1"' +
           (fv === 60 ? '' : ' opacity="0.7"') + '/>';
      s += '<text x="' + (X0 - 8) + '" y="' + (gy + 3.5).toFixed(1) + '" fill="' + (fv === 60 ? READ : DIM) +
           '" font-family="monospace" font-size="9" text-anchor="end">' + fv.toFixed(0) + '</text>';
    }
    s += '<text x="16" y="' + ((YT + YB) / 2) + '" fill="' + DIM + '" font-family="monospace" font-size="9.5" ' +
         'text-anchor="middle" transform="rotate(-90 16 ' + ((YT + YB) / 2) + ')">FREQUENCY (Hz)</text>';
    // MW ticks
    for (var mv = 0; mv <= PRATED; mv += 25) {
      var tx = xP(mv);
      s += '<line x1="' + tx.toFixed(1) + '" y1="' + YB + '" x2="' + tx.toFixed(1) + '" y2="' + (YB + 5) + '" stroke="' + AXIS + '" stroke-width="1"/>';
      s += '<text x="' + tx.toFixed(1) + '" y="' + (YB + 17) + '" fill="' + DIM + '" font-family="monospace" font-size="9" text-anchor="middle">' + mv + '</text>';
    }
    s += '<text x="' + ((X0 + X1) / 2) + '" y="' + (YB + 32) + '" fill="' + DIM + '" font-family="monospace" font-size="9.5" text-anchor="middle">UNIT OUTPUT (MW)</text>';

    // characteristic line
    var col = droop === 0 ? PHOS : AMBER;
    var f0 = freqAt(0), f1 = freqAt(PRATED);
    var yA = Math.max(YT, Math.min(YB, yF(f0))), yB2 = Math.max(YT, Math.min(YB, yF(f1)));
    s += '<line x1="' + X0 + '" y1="' + yA.toFixed(1) + '" x2="' + X1 + '" y2="' + yB2.toFixed(1) +
         '" stroke="' + col + '" stroke-width="2.5"/>';
    s += '<text x="' + (X1 - 6) + '" y="' + (yB2 - 8).toFixed(1) + '" fill="' + col +
         '" font-family="monospace" font-size="9.5" text-anchor="end">' +
         (droop === 0 ? 'ISOCHRONOUS \u00B7 zero droop' : droop + '% DROOP') + '</text>';

    // starting point + operating point
    s += '<circle cx="' + xP(P0).toFixed(1) + '" cy="' + yF(60).toFixed(1) + '" r="3.5" fill="' + DIM + '"/>';
    var oy = Math.max(YT, Math.min(YB, yF(f)));
    s += '<line x1="' + xP(out).toFixed(1) + '" y1="' + oy.toFixed(1) + '" x2="' + xP(out).toFixed(1) +
         '" y2="' + YB + '" stroke="' + READ + '" stroke-width="1" stroke-dasharray="2 3" opacity="0.75"/>';
    s += '<line x1="' + X0 + '" y1="' + oy.toFixed(1) + '" x2="' + xP(out).toFixed(1) + '" y2="' + oy.toFixed(1) +
         '" stroke="' + READ + '" stroke-width="1" stroke-dasharray="2 3" opacity="0.75"/>';
    s += '<circle cx="' + xP(out).toFixed(1) + '" cy="' + oy.toFixed(1) + '" r="5" fill="' + (Math.abs(f - 60) < 0.005 ? GREEN : (f < 59.5 ? RED : AMBER)) + '"/>';
    s += '</svg>';
    return s;
  }

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00B7 Droop vs isochronous on an island</div>' +
      '<div id="gd-chart"></div>' +
      '<div class="c-int__readouts" style="min-width:0;grid-template-columns:repeat(2,minmax(150px,1fr));margin-top:12px">' +
        '<div class="c-int__ro">Unit output <b id="gd-out">20 MW</b></div>' +
        '<div class="c-int__ro">Island frequency <b id="gd-f">60.00 Hz</b></div>' +
        '<div class="c-int__ro">Governor mode <b id="gd-mode">isochronous</b></div>' +
        '<div class="c-int__ro">Deviation from 60 <b id="gd-dev">0.00 Hz</b></div>' +
      '</div>' +
      '<div class="c-int__ctrl" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px">' +
        '<span style="font-family:var(--font-mono);font-size:.72rem;color:' + DIM + '">Governor:</span>' +
        '<button class="c-btn c-btn--primary" data-droop="0">Isochronous</button>' +
        '<button class="c-btn" data-droop="3">3% droop</button>' +
        '<button class="c-btn" data-droop="5">5% droop</button>' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="gd-load" id="gd-loadlab">Load picked up: 0 MW</label>' +
        '<input id="gd-load" type="range" min="0" max="70" step="1" value="0" aria-label="Load added to the island in MW">' +
      '</div>' +
      '<div class="c-note c-note--op" id="gd-verdict" style="margin-top:12px"></div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };

  function paint() {
    var out = P0 + added, f = freqAt(out), dev = f - 60;
    $('gd-chart').innerHTML = chart();
    $('gd-out').textContent = out + ' MW';
    $('gd-f').textContent = f.toFixed(2) + ' Hz';
    $('gd-f').style.color = Math.abs(dev) < 0.005 ? GREEN : (f < 59.5 ? RED : AMBER);
    $('gd-dev').textContent = (dev >= 0 ? '+' : '') + dev.toFixed(2) + ' Hz';
    $('gd-mode').textContent = droop === 0 ? 'isochronous' : droop + '% droop';
    $('gd-mode').style.color = droop === 0 ? PHOS : AMBER;
    $('gd-loadlab').textContent = 'Load picked up: ' + added + ' MW';

    var v = $('gd-verdict');
    if (droop === 0) {
      v.innerHTML = '<div class="c-note__title" style="color:' + PHOS + '">Isochronous \u2014 flat frequency</div>' +
        'The governor holds turbine speed to its reference no matter how much load arrives, so frequency stays at <strong>60.00 Hz</strong> while output rises to meet demand. There is <strong>zero droop</strong>. This is why a {{blackstart}} resource must run isochronous: it is the only machine on the island, and it alone has to hold 60 Hz as each block of load comes on.'
          .replace('{{blackstart}}', 'blackstart');
    } else if (added === 0) {
      v.innerHTML = '<div class="c-note__title" style="color:' + AMBER + '">' + droop + '% droop \u2014 add some load</div>' +
        'At its setpoint the unit sits at 60 Hz. Move the load slider and watch frequency walk down the sloped characteristic: with ' +
        droop + '% droop, taking the unit from zero to full output costs ' + (droop * 0.6).toFixed(1) + ' Hz.';
    } else {
      var sag = Math.abs(dev);
      v.innerHTML = '<div class="c-note__title" style="color:' + (f < 59.5 ? RED : AMBER) + '">' + droop + '% droop \u2014 frequency settles low</div>' +
        'The unit picked up all ' + added + ' MW because nothing else is on the island \u2014 but a droop governor trades frequency for load. Frequency has settled <strong>' +
        sag.toFixed(2) + ' Hz low, at ' + f.toFixed(2) + ' Hz</strong>, and it stays there until something resets the setpoint.' +
        (f < 59.5 ? ' That is deep enough to threaten underfrequency tripping \u2014 on a real restoration you would be losing the island.' : '') +
        ' Switch to isochronous and watch the same load land at exactly 60.00 Hz.';
    }
  }

  mount.querySelectorAll('[data-droop]').forEach(function (b) {
    b.addEventListener('click', function () {
      droop = +b.getAttribute('data-droop');
      mount.querySelectorAll('[data-droop]').forEach(function (x) { x.classList.toggle('c-btn--primary', x === b); });
      paint();
    });
  });
  $('gd-load').addEventListener('input', function () { added = +this.value; paint(); });

  paint();
};
