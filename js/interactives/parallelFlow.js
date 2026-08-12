/* ============================================================================
   INTERACTIVE: Parallel-path power flow  —  NERC.interactives.parallelFlow
   Injected power between two buses divides across parallel paths inversely to
   their impedance. Adjust one path's impedance and watch the split move; open a
   path and all the flow reroutes. Teaches why operators can't "route" power by
   preference and why phase shifters / topology are the real controls.
   Illustrative DC-style split: f1 = P * X2/(X1+X2).
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.parallelFlow = function (mount) {
  var P = 600;              // total injection A -> B, MW
  var X2 = 5;               // path 2 impedance (fixed reference)
  var HOT = '#3FB98C', COLD = '#556074', ACC = '#56C2E6';
  var x1 = 5, p2open = false;

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00b7 Parallel-path flow</div>' +
      '<div class="c-int__row">' +
        '<svg viewBox="0 0 320 150" width="320" role="img" aria-label="Two parallel paths between bus A and bus B">' +
          '<line x1="40" y1="30" x2="40" y2="120" stroke="' + HOT + '" stroke-width="4"/>' +
          '<line x1="280" y1="30" x2="280" y2="120" stroke="' + HOT + '" stroke-width="4"/>' +
          '<text x="40" y="20" fill="#7E8DA0" font-family="monospace" font-size="9" text-anchor="middle">BUS A</text>' +
          '<text x="280" y="20" fill="#7E8DA0" font-family="monospace" font-size="9" text-anchor="middle">BUS B</text>' +
          '<polyline id="pf-p1" points="40,55 90,45 230,45 280,55" fill="none" stroke="' + ACC + '" stroke-width="4"/>' +
          '<polyline id="pf-p2" points="40,95 90,105 230,105 280,95" fill="none" stroke="' + ACC + '" stroke-width="4"/>' +
          '<text id="pf-l1" x="160" y="38" fill="#C9D6E4" font-family="monospace" font-size="9" text-anchor="middle">Path 1</text>' +
          '<text id="pf-l2" x="160" y="122" fill="#C9D6E4" font-family="monospace" font-size="9" text-anchor="middle">Path 2</text>' +
        '</svg>' +
        '<div class="c-int__readouts">' +
          '<div class="c-int__ro">Path 1 impedance <b id="pf-x1">5</b></div>' +
          '<div class="c-int__ro">Path 2 impedance <b id="pf-x2">5</b></div>' +
          '<div class="c-int__ro">Path 1 flow <b id="pf-f1">300 MW</b></div>' +
          '<div class="c-int__ro">Path 2 flow <b id="pf-f2">300 MW</b></div>' +
          '<div class="c-int__ro" id="pf-note" style="color:#7E8DA0">Equal impedance \u2192 even split</div>' +
        '</div>' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="pf-slider">Path 1 impedance (relative)</label>' +
        '<input id="pf-slider" type="range" min="1" max="10" value="5" step="1" aria-label="Path 1 impedance">' +
        '<div style="margin-top:12px">' +
          '<button class="c-btn" id="pf-toggle" type="button">Open Path 2</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };

  function render() {
    var f1, f2;
    if (p2open) { f1 = P; f2 = 0; }
    else { f1 = P * X2 / (x1 + X2); f2 = P - f1; }

    $('pf-p1').setAttribute('stroke-width', (2 + f1 / 60).toFixed(1));
    $('pf-p2').setAttribute('stroke-width', f2 === 0 ? 2 : (2 + f2 / 60).toFixed(1));
    $('pf-p2').setAttribute('stroke', p2open ? COLD : ACC);
    $('pf-p2').setAttribute('stroke-dasharray', p2open ? '5 5' : '');

    $('pf-x1').textContent = x1;
    $('pf-x2').textContent = p2open ? '\u2014 (open)' : X2;
    $('pf-f1').textContent = Math.round(f1) + ' MW';
    $('pf-f2').textContent = p2open ? 'OUT' : Math.round(f2) + ' MW';

    var note = $('pf-note');
    if (p2open) { note.textContent = 'Path 2 open \u2192 all ' + P + ' MW on Path 1'; note.style.color = '#E0A83E'; }
    else if (x1 === X2) { note.textContent = 'Equal impedance \u2192 even split'; note.style.color = '#7E8DA0'; }
    else if (x1 < X2) { note.textContent = 'Lower-impedance Path 1 carries more'; note.style.color = '#7E8DA0'; }
    else { note.textContent = 'Higher-impedance Path 1 carries less'; note.style.color = '#7E8DA0'; }

    $('pf-toggle').textContent = p2open ? 'Restore Path 2' : 'Open Path 2';
  }

  $('pf-slider').addEventListener('input', function () { x1 = +this.value; render(); });
  $('pf-toggle').addEventListener('click', function () { p2open = !p2open; render(); });
  render();
};
