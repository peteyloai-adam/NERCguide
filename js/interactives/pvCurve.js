/* ============================================================================
   INTERACTIVE: P-V (nose) curve  —  NERC.interactives.pvCurve
   Receiving-end voltage vs. load for a simple two-bus system. As load climbs,
   voltage sags down the upper (stable) branch to the "nose" \u2014 the maximum
   loadability. Past it there is no solution: voltage collapses. Adding reactive
   support pushes the nose out, buying more loadability and margin.
   Model: V^2 = [b \u00b1 sqrt(b^2 - 4X^2(P^2+Q^2))]/2, b = 1 - 2QX, Q = P*(0.30 - comp).
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.pvCurve = function (mount) {
  var X = 0.5, PAXIS = 1.15;
  var X0 = 42, X1 = 300, Y0 = 172, Y1 = 22, VLO = 0.3, VHI = 1.1;
  var comp = 0, loadP = 0.3;

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00b7 P-V (voltage stability) curve</div>' +
      '<div class="c-int__row">' +
        '<svg viewBox="0 0 320 200" width="320" role="img" aria-label="Voltage versus load nose curve">' +
          '<line x1="42" y1="172" x2="300" y2="172" stroke="#2A3648" stroke-width="1"/>' +
          '<line x1="42" y1="22" x2="42" y2="172" stroke="#2A3648" stroke-width="1"/>' +
          '<text x="170" y="194" fill="#7E8DA0" font-family="monospace" font-size="9" text-anchor="middle">Load (P) \u2192</text>' +
          '<text x="14" y="98" fill="#7E8DA0" font-family="monospace" font-size="9" text-anchor="middle" transform="rotate(-90 14 98)">Voltage</text>' +
          '<path id="pv-lower" fill="none" stroke="#556074" stroke-width="1.5" stroke-dasharray="4 4"/>' +
          '<path id="pv-upper" fill="none" stroke="#3FB98C" stroke-width="2.5"/>' +
          '<circle id="pv-nose" r="3.5" fill="#E0A83E"/>' +
          '<circle id="pv-op" r="5" fill="#56C2E6" stroke="#0B0F14" stroke-width="1.5"/>' +
        '</svg>' +
        '<div class="c-int__readouts">' +
          '<div class="c-int__ro">Voltage <b id="pv-v">1.00 p.u.</b></div>' +
          '<div class="c-int__ro">Load <b id="pv-p">0.30 p.u.</b></div>' +
          '<div class="c-int__ro">Max loadability <b id="pv-max">\u2014</b></div>' +
          '<div class="c-int__ro" id="pv-status" style="color:#3FB98C">Stable</div>' +
        '</div>' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="pv-load">Load level</label>' +
        '<input id="pv-load" type="range" min="0" max="100" value="26" aria-label="Load level">' +
        '<div style="margin-top:12px"><button class="c-btn" id="pv-comp" type="button">Add reactive support</button></div>' +
      '</div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };
  var xp = function (P) { return X0 + (P / PAXIS) * (X1 - X0); };
  var yp = function (V) { return Y0 - ((V - VLO) / (VHI - VLO)) * (Y0 - Y1); };

  function solve(P) {
    var Q = P * (0.30 - comp);
    var b = 1 - 2 * Q * X;
    var disc = b * b - 4 * X * X * (P * P + Q * Q);
    if (disc < 0) return null;
    var r = Math.sqrt(disc);
    return { up: Math.sqrt(Math.max(0, (b + r) / 2)), lo: Math.sqrt(Math.max(0, (b - r) / 2)) };
  }

  function buildCurve() {
    var up = [], lo = [], pmax = 0, vnose = 0;
    for (var P = 0; P <= PAXIS; P += 0.01) {
      var s = solve(P);
      if (!s) break;
      up.push(xp(P) + ',' + yp(s.up));
      lo.unshift(xp(P) + ',' + yp(s.lo));
      pmax = P; vnose = (s.up + s.lo) / 2;
    }
    $('pv-upper').setAttribute('d', 'M ' + up.join(' L '));
    $('pv-lower').setAttribute('d', 'M ' + lo.join(' L '));
    $('pv-nose').setAttribute('cx', xp(pmax)); $('pv-nose').setAttribute('cy', yp(vnose));
    $('pv-max').textContent = pmax.toFixed(2) + ' p.u.';
    return pmax;
  }

  function render() {
    var pmax = buildCurve();
    var P = loadP;
    var s = solve(P);
    var op = $('pv-op'), status = $('pv-status');
    $('pv-p').textContent = P.toFixed(2) + ' p.u.';
    if (!s || P > pmax) {
      op.setAttribute('cx', xp(pmax)); op.setAttribute('cy', yp(0.55)); op.setAttribute('fill', '#E5484D');
      $('pv-v').textContent = 'no solution'; $('pv-v').style.color = '#E5484D';
      status.textContent = 'Past the nose \u2014 voltage collapse'; status.style.color = '#E5484D';
      return;
    }
    op.setAttribute('cx', xp(P)); op.setAttribute('cy', yp(s.up)); op.setAttribute('fill', '#56C2E6');
    $('pv-v').textContent = s.up.toFixed(3) + ' p.u.';
    var near = P > 0.9 * pmax;
    $('pv-v').style.color = near ? '#E0A83E' : '#C9D6E4';
    status.textContent = near ? 'Approaching the nose \u2014 low margin' : 'Stable';
    status.style.color = near ? '#E0A83E' : '#3FB98C';
  }

  $('pv-load').addEventListener('input', function () { loadP = (+this.value / 100) * PAXIS; render(); });
  $('pv-comp').addEventListener('click', function () {
    comp = comp ? 0 : 0.18;
    this.textContent = comp ? 'Remove reactive support' : 'Add reactive support';
    render();
  });
  render();
};
