/* ============================================================================
   INTERACTIVE: N-1 contingency  —  NERC.interactives.contingencyFlow
   A source feeds a load over two parallel lines. Raise the transfer, then trip a
   line: all the flow shifts to the survivor, which may exceed its rating. Teaches
   N-1 security, contingency redistribution, and why operators hold margin below
   the limit. Illustrative equal-impedance model (flow splits 50/50 when both up).
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.contingencyFlow = function (mount) {
  var RATING = 400;               // MW rating per line
  var HOT = '#3FB98C', COLD = '#556074', OVER = '#E5484D', WARN = '#E0A83E';
  var load = 500, up1 = true, up2 = true;

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00b7 N-1 contingency</div>' +
      '<div class="c-int__row">' +
        '<svg viewBox="0 0 320 150" width="320" role="img" aria-label="Two parallel lines from source to load">' +
          '<polyline id="cf-l1" points="60,75 110,40 240,40 290,75" fill="none" stroke="' + HOT + '" stroke-width="3"/>' +
          '<polyline id="cf-l2" points="60,75 110,110 240,110 290,75" fill="none" stroke="' + HOT + '" stroke-width="3"/>' +
          '<circle cx="52" cy="75" r="15" fill="#121821" stroke="' + HOT + '" stroke-width="2"/>' +
          '<text x="52" y="79" fill="#C9D6E4" font-family="monospace" font-size="10" text-anchor="middle">SRC</text>' +
          '<rect x="284" y="62" width="26" height="26" rx="3" fill="#121821" stroke="' + HOT + '" stroke-width="2"/>' +
          '<text x="297" y="79" fill="#C9D6E4" font-family="monospace" font-size="8" text-anchor="middle">LOAD</text>' +
          '<text id="cf-t1" x="175" y="32" fill="#7E8DA0" font-family="monospace" font-size="9" text-anchor="middle">LINE 1</text>' +
          '<text id="cf-t2" x="175" y="126" fill="#7E8DA0" font-family="monospace" font-size="9" text-anchor="middle">LINE 2</text>' +
        '</svg>' +
        '<div class="c-int__readouts">' +
          '<div class="c-int__ro">Line 1 <b id="cf-f1">250 / 400 MW</b></div>' +
          '<div class="c-int__ro">Line 2 <b id="cf-f2">250 / 400 MW</b></div>' +
          '<div class="c-int__ro" id="cf-n1" style="color:#3FB98C">N-1 secure</div>' +
          '<div class="c-int__ro" id="cf-status" style="color:#3FB98C">Both lines in service</div>' +
        '</div>' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="cf-load">Total transfer to load (MW)</label>' +
        '<input id="cf-load" type="range" min="100" max="800" value="500" step="20" aria-label="Total transfer in MW">' +
        '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">' +
          '<button class="c-btn" id="cf-trip1" type="button">Trip Line 1</button>' +
          '<button class="c-btn" id="cf-trip2" type="button">Trip Line 2</button>' +
          '<button class="c-btn c-btn--ghost" id="cf-restore" type="button">Restore both</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };

  function lineStyle(el, inService, flow) {
    if (!inService) { el.setAttribute('stroke', COLD); el.setAttribute('stroke-dasharray', '5 5'); return; }
    el.setAttribute('stroke-dasharray', '');
    el.setAttribute('stroke', flow > RATING ? OVER : HOT);
  }

  function render() {
    var n = (up1 ? 1 : 0) + (up2 ? 1 : 0);
    var f1 = up1 ? (n === 2 ? load / 2 : load) : 0;
    var f2 = up2 ? (n === 2 ? load / 2 : load) : 0;

    lineStyle($('cf-l1'), up1, f1);
    lineStyle($('cf-l2'), up2, f2);

    $('cf-f1').textContent = up1 ? Math.round(f1) + ' / ' + RATING + ' MW' : 'OUT';
    $('cf-f2').textContent = up2 ? Math.round(f2) + ' / ' + RATING + ' MW' : 'OUT';
    $('cf-f1').style.color = (up1 && f1 > RATING) ? OVER : '#C9D6E4';
    $('cf-f2').style.color = (up2 && f2 > RATING) ? OVER : '#C9D6E4';

    var n1 = $('cf-n1'), status = $('cf-status');
    if (n === 0) {
      status.textContent = 'Both lines out \u2014 load lost'; status.style.color = OVER;
      n1.textContent = ''; return;
    }
    if (n === 2) {
      // N-1 test: losing either leaves the survivor carrying full load
      var secure = load <= RATING;
      n1.textContent = secure ? 'N-1 secure' : 'Not N-1 secure \u2014 a single trip overloads the survivor';
      n1.style.color = secure ? HOT : WARN;
      status.textContent = 'Both lines in service'; status.style.color = HOT;
    } else {
      var surv = Math.max(f1, f2);
      n1.textContent = 'Post-contingency (N-1)';
      n1.style.color = COLD;
      if (surv > RATING) {
        status.textContent = 'SOL exceeded on survivor \u2014 reduce transfer or reconfigure';
        status.style.color = OVER;
      } else {
        status.textContent = 'Survivor within limit \u2014 system rode through the loss';
        status.style.color = HOT;
      }
    }
  }

  $('cf-load').addEventListener('input', function () { load = +this.value; render(); });
  $('cf-trip1').addEventListener('click', function () { if (up2) { up1 = false; render(); } });
  $('cf-trip2').addEventListener('click', function () { if (up1) { up2 = false; render(); } });
  $('cf-restore').addEventListener('click', function () { up1 = up2 = true; render(); });
  render();
};
