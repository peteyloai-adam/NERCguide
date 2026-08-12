/* ============================================================================
   INTERACTIVE: One-line diagram  —  NERC.interactives.oneLine
   A minimal one-line (generator -> step-up -> bus -> breaker -> line -> bus ->
   step-down -> load). Operate the breaker and watch everything downstream
   energize or de-energize, the way it reads on a real console. Teaches one-line
   symbols + breaker operation + energization state.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.oneLine = function (mount) {
  var HOT = '#3FB98C', COLD = '#556074';

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00b7 One-line diagram</div>' +
      '<svg viewBox="0 0 340 120" width="100%" style="max-width:520px" role="img" ' +
           'aria-label="One-line diagram from generator to load with an operable breaker">' +
        // upstream conductor (always hot)
        '<line x1="30" y1="60" x2="150" y2="60" stroke="' + HOT + '" stroke-width="2"/>' +
        // generator
        '<circle cx="30" cy="60" r="13" fill="#121821" stroke="' + HOT + '" stroke-width="2"/>' +
        '<text x="30" y="64" fill="#C9D6E4" font-family="monospace" font-size="11" text-anchor="middle">G</text>' +
        // step-up transformer (two circles)
        '<circle cx="74" cy="60" r="8" fill="none" stroke="' + HOT + '" stroke-width="2"/>' +
        '<circle cx="84" cy="60" r="8" fill="none" stroke="' + HOT + '" stroke-width="2"/>' +
        // bus A
        '<line x1="118" y1="42" x2="118" y2="78" stroke="' + HOT + '" stroke-width="4"/>' +
        // breaker (clickable)
        '<rect id="ol-brk" x="143" y="53" width="14" height="14" rx="2" ' +
              'fill="' + HOT + '" stroke="' + HOT + '" stroke-width="2" style="cursor:pointer"/>' +
        // downstream conductor + elements (state-dependent)
        '<line id="ol-line" x1="157" y1="60" x2="250" y2="60" stroke="' + HOT + '" stroke-width="2"/>' +
        '<line id="ol-busB" x1="222" y1="42" x2="222" y2="78" stroke="' + HOT + '" stroke-width="4"/>' +
        '<circle id="ol-tx1" cx="262" cy="60" r="8" fill="none" stroke="' + HOT + '" stroke-width="2"/>' +
        '<circle id="ol-tx2" cx="272" cy="60" r="8" fill="none" stroke="' + HOT + '" stroke-width="2"/>' +
        '<line id="ol-drop" x1="290" y1="60" x2="312" y2="60" stroke="' + HOT + '" stroke-width="2"/>' +
        '<polygon id="ol-load" points="312,52 312,68 324,60" fill="' + HOT + '"/>' +
        // labels
        '<text x="30" y="90" fill="#7E8DA0" font-family="monospace" font-size="8" text-anchor="middle">GEN</text>' +
        '<text x="79" y="90" fill="#7E8DA0" font-family="monospace" font-size="8" text-anchor="middle">STEP-UP</text>' +
        '<text x="118" y="34" fill="#7E8DA0" font-family="monospace" font-size="8" text-anchor="middle">BUS A</text>' +
        '<text x="150" y="90" fill="#7E8DA0" font-family="monospace" font-size="8" text-anchor="middle">BRKR</text>' +
        '<text x="222" y="34" fill="#7E8DA0" font-family="monospace" font-size="8" text-anchor="middle">BUS B</text>' +
        '<text x="318" y="90" fill="#7E8DA0" font-family="monospace" font-size="8" text-anchor="middle">LOAD</text>' +
      '</svg>' +
      '<div class="c-int__ctrl" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">' +
        '<button class="c-btn" id="ol-toggle" type="button">Open breaker</button>' +
        '<span id="ol-status" class="mono" style="font-size:.82rem;color:' + HOT + '">Breaker CLOSED \u2014 load energized</span>' +
      '</div>' +
    '</div>';

  var closed = true;
  var brk = mount.querySelector('#ol-brk');
  var down = ['ol-line', 'ol-busB', 'ol-tx1', 'ol-tx2', 'ol-drop', 'ol-load']
             .map(function (id) { return mount.querySelector('#' + id); });
  var toggleBtn = mount.querySelector('#ol-toggle');
  var status = mount.querySelector('#ol-status');

  function paint() {
    var col = closed ? HOT : COLD;
    down.forEach(function (el) {
      if (el.tagName === 'polygon') el.setAttribute('fill', col);
      else el.setAttribute('stroke', col);
    });
    // breaker: closed = filled hot; open = hollow with red outline + gap look
    brk.setAttribute('fill', closed ? HOT : 'none');
    brk.setAttribute('stroke', closed ? HOT : '#E5484D');
    toggleBtn.textContent = closed ? 'Open breaker' : 'Close breaker';
    status.textContent = closed ? 'Breaker CLOSED \u2014 load energized'
                                : 'Breaker OPEN \u2014 line and load de-energized';
    status.style.color = closed ? HOT : '#E5484D';
  }
  function toggle() { closed = !closed; paint(); }

  brk.addEventListener('click', toggle);
  toggleBtn.addEventListener('click', toggle);
  paint();
};
