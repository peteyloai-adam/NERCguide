/* ============================================================================
   INTERACTIVE: ACE closed loop  —  NERC.interactives.aceLoop

   Where aceCalc lets you dial ACE's inputs directly, this shows the CAUSE. You
   hold one lever (your generation) against your load. A single imbalance drives
   BOTH halves of ACE at once: the extra/short power shows up on the tie line
   AND nudges Interconnection frequency. The learner drives ACE back to zero and
   watches the tie return to schedule and frequency return to 60 Hz \u2014 the whole
   point of AGC secondary control.

   A "trip a unit" button injects a sudden generation loss so the learner sees
   ACE swing, then restores it by raising other generation (deploying reserve).

   Model (illustrative, scaled for visibility; not a real interconnection):
     surplus  S   = Geff - (Load + NIscheduled)
     ACE          = S                       (frequency bias set so ACE tracks S)
     freq term    = h * S                   (minority of ACE, as for a local event)
     tie term     = (1-h) * S               (majority shows on the tie)
     dF           = freqTerm / (-10*B)      (from ACE = tie - 10B*dF)
   Colors are hardcoded hex matching console.css tokens.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.aceLoop = function (mount) {
  var GREEN = '#3FB98C', AMBER = '#E0A83E', RED = '#E5484D',
      PHOS = '#56C2E6', READ = '#C9D6E4', DIM = '#7E8DA0', AXIS = '#2A3648';

  var L = 1000, NIs = 0, Fs = 60.00, B = -50;   // load, scheduled interchange, sched freq, bias
  var h = 0.15;                                  // frequency-bias share of ACE
  var G = 1000, trip = 0;                        // commanded generation, tripped MW

  function calc() {
    var Geff = G - trip;
    var S = Geff - (L + NIs);
    var ace = S, Fterm = h * S, Tterm = ace - Fterm;
    var dF = Fterm / (-10 * B);
    return { Geff: Geff, S: S, ace: ace, Fterm: Fterm, Tterm: Tterm, dF: dF, Fa: Fs + dF, NIa: NIs + Tterm };
  }

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00B7 Close the loop: drive ACE to zero</div>' +
      '<svg viewBox="0 0 520 176" style="width:100%;max-width:560px;height:auto" role="img" ' +
           'aria-label="Your Balancing Authority connected to the Interconnection by a tie line, with a frequency gauge">' +
        /* BA box */
        '<rect x="24" y="40" width="150" height="70" rx="6" fill="#1A2230" stroke="' + AXIS + '"/>' +
        '<text x="99" y="60" fill="' + READ + '" font-family="monospace" font-size="11" text-anchor="middle">YOUR BA</text>' +
        '<text x="99" y="80" fill="' + DIM + '" font-family="monospace" font-size="10" text-anchor="middle" id="al-gl">G 1000 / L 1000</text>' +
        '<text x="99" y="98" fill="' + DIM + '" font-family="monospace" font-size="10" text-anchor="middle" id="al-bal">balanced</text>' +
        /* interconnection box */
        '<rect x="346" y="40" width="150" height="70" rx="6" fill="#1A2230" stroke="' + AXIS + '"/>' +
        '<text x="421" y="70" fill="' + READ + '" font-family="monospace" font-size="11" text-anchor="middle">INTERCONNECTION</text>' +
        '<text x="421" y="88" fill="' + DIM + '" font-family="monospace" font-size="10" text-anchor="middle">the rest of the grid</text>' +
        /* tie line + flow arrow */
        '<line x1="174" y1="75" x2="346" y2="75" stroke="' + AXIS + '" stroke-width="2"/>' +
        '<text x="260" y="66" fill="' + DIM + '" font-family="monospace" font-size="9" text-anchor="middle">TIE</text>' +
        '<line id="al-arrow" x1="260" y1="75" x2="300" y2="75" stroke="' + GREEN + '" stroke-width="3"/>' +
        '<polygon id="al-arrowhead" points="300,70 312,75 300,80" fill="' + GREEN + '"/>' +
        '<text id="al-tie" x="260" y="92" fill="' + DIM + '" font-family="monospace" font-size="9" text-anchor="middle">at schedule</text>' +
        /* frequency gauge */
        '<text x="24" y="134" fill="' + DIM + '" font-family="monospace" font-size="9">59.85</text>' +
        '<text x="256" y="134" fill="' + DIM + '" font-family="monospace" font-size="9" text-anchor="middle">60.00 Hz</text>' +
        '<text x="470" y="134" fill="' + DIM + '" font-family="monospace" font-size="9">60.15</text>' +
        '<line x1="24" y1="150" x2="496" y2="150" stroke="' + AXIS + '" stroke-width="2"/>' +
        '<line x1="260" y1="144" x2="260" y2="156" stroke="' + DIM + '" stroke-width="1"/>' +
        '<circle id="al-needle" cx="260" cy="150" r="5" fill="' + GREEN + '"/>' +
      '</svg>' +

      '<div class="c-int__readouts" style="min-width:0;grid-template-columns:repeat(2,minmax(160px,1fr));margin-top:12px">' +
        '<div class="c-int__ro">Surplus / deficit <b id="al-s">0 MW</b></div>' +
        '<div class="c-int__ro">Frequency <b id="al-f">60.00 Hz</b></div>' +
        '<div class="c-int__ro">Tie term (interchange) <b id="al-tt">0 MW</b></div>' +
        '<div class="c-int__ro">Bias term (frequency) <b id="al-ft">0 MW</b></div>' +
        '<div class="c-int__ro" style="font-size:1rem">ACE <b id="al-ace" style="font-size:1.15rem">0 MW</b></div>' +
        '<div class="c-int__ro" id="al-msg" style="color:' + GREEN + '">balanced</div>' +
      '</div>' +

      '<div class="c-int__ctrl">' +
        '<label for="al-gen" id="al-genlabel">Your generation (AGC lever): 1000 MW</label>' +
        '<input id="al-gen" type="range" min="600" max="1400" value="1000" step="5" aria-label="Your generation in MW">' +
      '</div>' +
      '<div class="c-int__ctrl" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
        '<button class="c-btn" id="al-trip">Trip a 200 MW unit</button>' +
        '<button class="c-btn c-btn--ghost" id="al-reset">Reset</button>' +
        '<span id="al-tripnote" style="color:' + DIM + ';font-family:var(--font-mono);font-size:.72rem"></span>' +
      '</div>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };
  var gaugeX0 = 24, gaugeX1 = 496, fLo = 59.85, fHi = 60.15;

  function fx(f) {
    var t = (f - fLo) / (fHi - fLo); t = Math.max(0, Math.min(1, t));
    return gaugeX0 + t * (gaugeX1 - gaugeX0);
  }
  function sgn(n) { return (n > 0 ? '+' : '') + Math.round(n); }

  function render() {
    var s = calc();
    var near = Math.abs(s.ace) < 5;
    var col = near ? GREEN : (Math.abs(s.ace) > 150 ? RED : AMBER);

    // BA box text
    $('al-gl').textContent = 'G ' + s.Geff + ' / L ' + L;
    $('al-bal').textContent = near ? 'balanced' : (s.S < 0 ? 'short ' + sgn(s.S) : 'long ' + sgn(s.S));
    $('al-bal').setAttribute('fill', near ? GREEN : AMBER);

    // tie arrow: surplus => export (points right, out of BA); deficit => import (points left)
    var mag = Math.min(60, Math.abs(s.Tterm) / 4);
    var head = $('al-arrowhead'), arr = $('al-arrow'), tieCol = near ? GREEN : AMBER;
    arr.setAttribute('stroke', tieCol); head.setAttribute('fill', tieCol);
    if (s.Tterm >= 0) { // export outward (toward interconnection, right)
      arr.setAttribute('x1', 260); arr.setAttribute('x2', 260 + mag);
      head.setAttribute('points', (260 + mag) + ',70 ' + (272 + mag) + ',75 ' + (260 + mag) + ',80');
    } else {            // import inward (toward BA, left)
      arr.setAttribute('x1', 260); arr.setAttribute('x2', 260 - mag);
      head.setAttribute('points', (260 - mag) + ',70 ' + (248 - mag) + ',75 ' + (260 - mag) + ',80');
    }
    $('al-tie').textContent = near ? 'at schedule'
      : (s.Tterm > 0 ? 'exporting ' + sgn(s.Tterm) : 'importing ' + Math.abs(Math.round(s.Tterm)));
    $('al-tie').setAttribute('fill', tieCol);

    // frequency needle
    var nd = $('al-needle');
    nd.setAttribute('cx', fx(s.Fa).toFixed(1));
    nd.setAttribute('fill', Math.abs(s.dF) < 0.01 ? GREEN : AMBER);

    // readouts
    $('al-s').textContent = sgn(s.S) + ' MW';
    $('al-f').textContent = s.Fa.toFixed(2) + ' Hz';
    $('al-tt').textContent = sgn(s.Tterm) + ' MW';
    $('al-ft').textContent = sgn(s.Fterm) + ' MW';
    var ace = $('al-ace'); ace.textContent = sgn(s.ace) + ' MW'; ace.style.color = col;
    $('al-genlabel').textContent = 'Your generation (AGC lever): ' + G + ' MW' + (trip ? ' \u2014 ' + trip + ' MW tripped' : '');

    var msg = $('al-msg');
    if (near) { msg.style.color = GREEN; msg.textContent = 'ACE \u2248 0 \u2014 carrying your own load'; }
    else if (s.ace < 0) { msg.style.color = AMBER; msg.textContent = 'Short \u2014 leaning on the grid; raise generation'; }
    else { msg.style.color = AMBER; msg.textContent = 'Long \u2014 pushing power out; lower generation'; }
  }

  $('al-gen').addEventListener('input', function () { G = +this.value; render(); });
  $('al-trip').addEventListener('click', function () {
    trip = trip ? 0 : 200;
    this.textContent = trip ? 'Unit restored' : 'Trip a 200 MW unit';
    $('al-tripnote').textContent = trip ? 'A unit just tripped \u2014 raise generation to re-zero ACE.' : '';
    render();
  });
  $('al-reset').addEventListener('click', function () {
    G = 1000; trip = 0; $('al-gen').value = 1000;
    $('al-trip').textContent = 'Trip a 200 MW unit'; $('al-tripnote').textContent = '';
    render();
  });

  render();
};
