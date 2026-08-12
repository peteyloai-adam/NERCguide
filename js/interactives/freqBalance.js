/* ============================================================================
   INTERACTIVE: Frequency balance  —  NERC.interactives.freqBalance
   Teaches that system frequency is the live scoreboard of the generation-load
   balance. Drag the imbalance; watch frequency deviate from 60 Hz and the
   status flip between over- and under-frequency. Illustrative small-system model.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.freqBalance = function (mount) {
  var X0 = 20, X1 = 300, W = X1 - X0;   // scale spans 59.8 .. 60.2 Hz
  var FMIN = 59.8, FMAX = 60.2;

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00b7 Frequency balance</div>' +
      '<div class="c-int__row">' +
        '<svg viewBox="0 0 320 96" width="320" role="img" aria-label="System frequency meter">' +
          '<rect x="' + X0 + '" y="40" width="' + W + '" height="10" rx="5" fill="#2A3648"/>' +
          // green nominal band 59.98..60.02
          '<rect x="' + (X0 + (59.98 - FMIN) / (FMAX - FMIN) * W) + '" y="40" ' +
                'width="' + (0.04 / (FMAX - FMIN) * W) + '" height="10" fill="#3FB98C" opacity=".55"/>' +
          '<line x1="160" y1="34" x2="160" y2="56" stroke="#556074" stroke-width="1"/>' +
          '<text x="160" y="72" fill="#7E8DA0" font-family="monospace" font-size="9" text-anchor="middle">60.00</text>' +
          '<text x="' + X0 + '" y="72" fill="#556074" font-family="monospace" font-size="9" text-anchor="middle">59.8</text>' +
          '<text x="' + X1 + '" y="72" fill="#556074" font-family="monospace" font-size="9" text-anchor="middle">60.2</text>' +
          '<polygon id="fb-mark" points="160,22 154,34 166,34" fill="#56C2E6"/>' +
        '</svg>' +
        '<div class="c-int__readouts">' +
          '<div class="c-int__ro">Frequency <b id="fb-hz">60.000 Hz</b></div>' +
          '<div class="c-int__ro">Imbalance <b id="fb-imb">0 MW</b></div>' +
          '<div class="c-int__ro" id="fb-status" style="color:#3FB98C">Generation matches load</div>' +
        '</div>' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="fb-slider">Generation minus load (MW): deficit \u2190 0 \u2192 surplus</label>' +
        '<input id="fb-slider" type="range" min="-500" max="500" value="0" step="10" ' +
               'aria-label="Generation minus load in megawatts">' +
      '</div>' +
    '</div>';

  var mark = mount.querySelector('#fb-mark');
  var hz = mount.querySelector('#fb-hz');
  var imbEl = mount.querySelector('#fb-imb');
  var status = mount.querySelector('#fb-status');

  function render(imb) {
    var f = 60 + imb / 2500;                       // illustrative response
    var x = X0 + (f - FMIN) / (FMAX - FMIN) * W;
    x = Math.max(X0, Math.min(X1, x));
    mark.setAttribute('points', x + ',22 ' + (x - 6) + ',34 ' + (x + 6) + ',34');

    var df = Math.abs(f - 60);
    var col = df <= 0.02 ? '#3FB98C' : (df <= 0.10 ? '#E0A83E' : '#E5484D');
    mark.setAttribute('fill', col);
    hz.textContent = f.toFixed(3) + ' Hz';
    hz.style.color = col;
    imbEl.textContent = (imb > 0 ? '+' : '') + imb + ' MW';

    status.style.color = col;
    if (imb > 10)      status.textContent = 'Generation exceeds load \u2192 frequency rising';
    else if (imb < -10) status.textContent = 'Load exceeds generation \u2192 frequency falling';
    else               status.textContent = 'Generation matches load \u2192 holding 60 Hz';
  }

  mount.querySelector('#fb-slider').addEventListener('input', function () { render(+this.value); });
  render(0);
};
