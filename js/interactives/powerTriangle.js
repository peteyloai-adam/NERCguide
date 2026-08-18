/* ============================================================================
   INTERACTIVE: Power Triangle explorer  —  NERC.interactives.powerTriangle
   Holds apparent power S at 100 MVA and lets the learner change lagging power
   factor. The live work panel exposes every calculation behind the diagram.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.powerTriangle = function (mount) {
  var S = 100;              // apparent power, MVA (fixed)
  var Ox = 52, Oy = 188;    // triangle origin in the SVG
  var scale = 2.0;          // px per MVA -> hypotenuse length = 200px

  mount.innerHTML =
    '<div class="c-int c-power-triangle">' +
      '<div class="c-int__title">Interactive · Power triangle — see the calculation</div>' +
      '<p class="p2-intro">This model holds the equipment loading at <strong>100 MVA</strong>. Lowering power factor does not unload the equipment; it replaces useful MW with MVAR while the hypotenuse stays fixed.</p>' +
      '<div class="c-int__row">' +
        '<svg viewBox="0 0 300 220" width="300" role="img" ' +
             'aria-label="Power triangle with horizontal real power P, vertical lagging reactive power Q, and apparent power S as the hypotenuse">' +
          '<line id="pt-p" stroke="#56C2E6" stroke-width="4"/>' +
          '<line id="pt-q" stroke="#E0A83E" stroke-width="4"/>' +
          '<line id="pt-s" stroke="#C9D6E4" stroke-width="4"/>' +
          '<path id="pt-arc" fill="none" stroke="#7E8DA0" stroke-width="1.4"/>' +
          '<text id="pt-lp" fill="#56C2E6" font-family="monospace" font-size="11">P · MW</text>' +
          '<text id="pt-lq" fill="#E0A83E" font-family="monospace" font-size="11">Q · MVAR</text>' +
          '<text id="pt-ls" fill="#C9D6E4" font-family="monospace" font-size="11">S · MVA</text>' +
          '<text id="pt-lt" fill="#7E8DA0" font-family="monospace" font-size="10">θ</text>' +
        '</svg>' +
        '<div class="c-int__readouts c-power-triangle__readouts">' +
          '<div class="c-int__ro">Power factor <b id="pt-pf">1.00</b></div>' +
          '<div class="c-int__ro">Angle θ <b id="pt-th">0°</b></div>' +
          '<div class="c-int__ro">Real power P <b id="pt-mw">100 MW</b></div>' +
          '<div class="c-int__ro">Reactive power Q <b id="pt-mvar">0 MVAR</b></div>' +
          '<div class="c-int__ro">Apparent power S <b id="pt-mva">100 MVA</b></div>' +
          '<div class="c-int__ro">100 MVA rating used <b>100%</b></div>' +
        '</div>' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="pt-slider">Lagging power factor — move from 1.00 toward 0.50</label>' +
        '<input id="pt-slider" type="range" min="50" max="100" value="100" step="1" ' +
               'aria-label="Lagging power factor from 0.50 to 1.00">' +
        '<div class="c-power-triangle__presets">' +
          '<button class="c-btn c-btn--ghost" id="pt-example" type="button">Show 0.80 PF example</button>' +
          '<button class="c-btn c-btn--ghost" id="pt-reset" type="button">Reset to unity PF</button>' +
        '</div>' +
      '</div>' +
      '<div class="c-power-triangle__work" id="pt-work" aria-live="polite"></div>' +
      '<div class="c-note c-note--op c-power-triangle__meaning"><div class="c-note__title">What the motion means</div><span id="pt-meaning"></span></div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };
  var elP = $('pt-p'), elQ = $('pt-q'), elS = $('pt-s'), elArc = $('pt-arc');
  var lP = $('pt-lp'), lQ = $('pt-lq'), lS = $('pt-ls'), lT = $('pt-lt');
  var slider = $('pt-slider');

  function n(v, places) { return Number(v).toFixed(places == null ? 0 : places); }

  function render(pf) {
    var theta = Math.acos(pf);                 // radians
    var degrees = theta * 180 / Math.PI;
    var P = S * pf;
    var Q = Math.sqrt(S * S - P * P);
    var pPx = P * scale, qPx = Q * scale;

    var Cx = Ox + pPx, Cy = Oy;                // corner where P meets Q
    var Tx = Cx, Ty = Oy - qPx;                // top of the triangle

    elP.setAttribute('x1', Ox); elP.setAttribute('y1', Oy);
    elP.setAttribute('x2', Cx); elP.setAttribute('y2', Cy);
    elQ.setAttribute('x1', Cx); elQ.setAttribute('y1', Cy);
    elQ.setAttribute('x2', Tx); elQ.setAttribute('y2', Ty);
    elS.setAttribute('x1', Ox); elS.setAttribute('y1', Oy);
    elS.setAttribute('x2', Tx); elS.setAttribute('y2', Ty);

    var r = 26;
    var ax = Ox + r, ay = Oy;
    var bx = Ox + r * Math.cos(theta), by = Oy - r * Math.sin(theta);
    elArc.setAttribute('d', 'M ' + ax + ' ' + ay + ' A ' + r + ' ' + r +
                            ' 0 0 0 ' + bx.toFixed(1) + ' ' + by.toFixed(1));

    lP.setAttribute('x', Ox + pPx / 2 - 18); lP.setAttribute('y', Oy + 16);
    lQ.setAttribute('x', Cx + 7); lQ.setAttribute('y', Math.max(18, Oy - qPx / 2));
    lS.setAttribute('x', Ox + pPx / 2 - 22); lS.setAttribute('y', Math.max(15, Oy - qPx / 2 - 6));
    lT.setAttribute('x', Ox + 30); lT.setAttribute('y', Oy - 6);

    $('pt-pf').textContent = pf.toFixed(2) + ' lagging';
    $('pt-th').textContent = n(degrees, 1) + '°';
    $('pt-mw').textContent = n(P, 1) + ' MW';
    $('pt-mvar').textContent = n(Q, 1) + ' MVAR';
    $('pt-mva').textContent = n(S, 0) + ' MVA';
    slider.setAttribute('aria-valuetext', pf.toFixed(2) + ' lagging power factor; ' + n(P, 1) + ' megawatts and ' + n(Q, 1) + ' megavars at 100 MVA');

    $('pt-work').innerHTML =
      '<div><span>1 · Real power</span><strong>P = S × PF = 100 × ' + pf.toFixed(2) + ' = ' + n(P, 1) + ' MW</strong></div>' +
      '<div><span>2 · Phase angle</span><strong>θ = cos<sup>−1</sup>(' + pf.toFixed(2) + ') = ' + n(degrees, 1) + '°</strong></div>' +
      '<div><span>3 · Reactive power</span><strong>Q = √(S² − P²) = √(100² − ' + n(P, 1) + '²) = ' + n(Q, 1) + ' MVAR</strong></div>';

    if (pf > 0.995) {
      $('pt-meaning').textContent = 'At unity power factor, all 100 MVA is real power: 100 MW and essentially 0 MVAR. The triangle is flat.';
    } else if (Math.abs(pf - 0.80) < 0.006) {
      $('pt-meaning').textContent = 'At 0.80 PF, the same fully loaded 100 MVA equipment carries only 80 MW plus 60 MVAR. That 60 MVAR is necessary field-supporting flow, but it uses current and thermal capacity.';
    } else {
      $('pt-meaning').textContent = 'As PF falls, the vertical Q leg grows and the horizontal P leg shrinks. S stays at 100 MVA, so the equipment and conductor current remain fully committed even though fewer MW are delivered.';
    }
  }

  slider.addEventListener('input', function () { render(this.value / 100); });
  $('pt-example').addEventListener('click', function () { slider.value = 80; render(0.80); slider.focus(); });
  $('pt-reset').addEventListener('click', function () { slider.value = 100; render(1.00); slider.focus(); });
  render(1.00);
};
