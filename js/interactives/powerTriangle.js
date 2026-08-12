/* ============================================================================
   INTERACTIVE: Power Triangle explorer  —  NERC.interactives.powerTriangle
   Fixes apparent power S = 100 MVA and lets the learner drag power factor to
   see how real (P) and reactive (Q) power trade off. Self-contained SVG.

   Registry pattern: every interactive is a function(mountEl) that renders into
   the element it's given. Content blocks reference it with { t:"interactive", id }.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.powerTriangle = function (mount) {
  var S = 100;              // apparent power, MVA (fixed)
  var Ox = 52, Oy = 188;    // triangle origin in the SVG
  var scale = 2.0;          // px per MVA -> hypotenuse length = 200px

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive · Power triangle</div>' +
      '<div class="c-int__row">' +
        '<svg viewBox="0 0 300 220" width="300" role="img" ' +
             'aria-label="Power triangle showing real, reactive, and apparent power">' +
          '<line id="pt-p"  stroke="#56C2E6" stroke-width="3"/>' +
          '<line id="pt-q"  stroke="#E0A83E" stroke-width="3"/>' +
          '<line id="pt-s"  stroke="#C9D6E4" stroke-width="3"/>' +
          '<path  id="pt-arc" fill="none" stroke="#7E8DA0" stroke-width="1.4"/>' +
          '<text id="pt-lp" fill="#56C2E6" font-family="monospace" font-size="11">P</text>' +
          '<text id="pt-lq" fill="#E0A83E" font-family="monospace" font-size="11">Q</text>' +
          '<text id="pt-ls" fill="#C9D6E4" font-family="monospace" font-size="11">S</text>' +
          '<text id="pt-lt" fill="#7E8DA0" font-family="monospace" font-size="10">\u03B8</text>' +
        '</svg>' +
        '<div class="c-int__readouts">' +
          '<div class="c-int__ro">Power factor <b id="pt-pf">1.00</b></div>' +
          '<div class="c-int__ro">Angle \u03B8 <b id="pt-th">0\u00B0</b></div>' +
          '<div class="c-int__ro">Real power P <b id="pt-mw">100 MW</b></div>' +
          '<div class="c-int__ro">Reactive Q <b id="pt-mvar">0 MVAR</b></div>' +
          '<div class="c-int__ro">Apparent S <b id="pt-mva">100 MVA</b></div>' +
        '</div>' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="pt-slider">Drag power factor (lagging): 0.50 \u2192 1.00</label>' +
        '<input id="pt-slider" type="range" min="50" max="100" value="100" ' +
               'aria-label="Power factor from 0.50 to 1.00">' +
      '</div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };
  var elP = $('pt-p'), elQ = $('pt-q'), elS = $('pt-s'), elArc = $('pt-arc');
  var lP = $('pt-lp'), lQ = $('pt-lq'), lS = $('pt-ls'), lT = $('pt-lt');
  var slider = $('pt-slider');

  function render(pf) {
    var theta = Math.acos(pf);                 // radians
    var P = S * pf;
    var Q = S * Math.sin(theta);
    var pPx = P * scale, qPx = Q * scale;

    var Cx = Ox + pPx, Cy = Oy;                // corner where P meets Q
    var Tx = Cx,        Ty = Oy - qPx;         // top of the triangle

    elP.setAttribute('x1', Ox); elP.setAttribute('y1', Oy);
    elP.setAttribute('x2', Cx); elP.setAttribute('y2', Cy);
    elQ.setAttribute('x1', Cx); elQ.setAttribute('y1', Cy);
    elQ.setAttribute('x2', Tx); elQ.setAttribute('y2', Ty);
    elS.setAttribute('x1', Ox); elS.setAttribute('y1', Oy);
    elS.setAttribute('x2', Tx); elS.setAttribute('y2', Ty);

    // small angle arc at the origin
    var r = 26;
    var ax = Ox + r, ay = Oy;
    var bx = Ox + r * Math.cos(theta), by = Oy - r * Math.sin(theta);
    elArc.setAttribute('d', 'M ' + ax + ' ' + ay + ' A ' + r + ' ' + r +
                            ' 0 0 0 ' + bx.toFixed(1) + ' ' + by.toFixed(1));

    lP.setAttribute('x', Ox + pPx / 2 - 4); lP.setAttribute('y', Oy + 14);
    lQ.setAttribute('x', Cx + 6);           lQ.setAttribute('y', Oy - qPx / 2);
    lS.setAttribute('x', Ox + pPx / 2 - 12); lS.setAttribute('y', Oy - qPx / 2 - 4);
    lT.setAttribute('x', Ox + 30);          lT.setAttribute('y', Oy - 6);

    mount.querySelector('#pt-pf').textContent   = pf.toFixed(2);
    mount.querySelector('#pt-th').textContent   = (theta * 180 / Math.PI).toFixed(0) + '\u00B0';
    mount.querySelector('#pt-mw').textContent   = P.toFixed(0) + ' MW';
    mount.querySelector('#pt-mvar').textContent = Q.toFixed(0) + ' MVAR';
    mount.querySelector('#pt-mva').textContent  = S.toFixed(0) + ' MVA';
  }

  slider.addEventListener('input', function () { render(this.value / 100); });
  render(1.00);
};
