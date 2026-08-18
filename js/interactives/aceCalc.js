/* ============================================================================
   INTERACTIVE: Area Control Error  —  NERC.interactives.aceCalc
   ACE tells a Balancing Authority whether it's meeting its obligation to the
   Interconnection. Training form: ACE = (NIA - NIS) - 10B(FA - FS), with
   IME and IIM held at zero so the two primary terms remain visible.
   Move actual interchange and frequency; watch ACE and what it tells the operator
   to do. (Illustrative: scheduled NI = 100 MW, F_s = 60.00 Hz, bias B = -50 MW/0.1Hz.)
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.aceCalc = function (mount) {
  var NIs = 100, Fs = 60.00, B = -50;   // scheduled interchange, sched freq, bias (MW/0.1Hz)
  var NIa = 100, Fa = 60.00;

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00b7 Area Control Error (ACE)</div>' +
      '<div class="c-int__row">' +
        '<div class="c-int__readouts" style="min-width:210px">' +
          '<div class="c-int__ro">Actual interchange <b id="ac-nia">100 MW</b></div>' +
          '<div class="c-int__ro">Scheduled interchange <b>100 MW</b></div>' +
          '<div class="c-int__ro">Actual frequency <b id="ac-fa">60.00 Hz</b></div>' +
          '<div class="c-int__ro">Scheduled frequency <b>60.00 Hz</b></div>' +
          '<div class="c-int__ro">Bias B <b>-50 MW/0.1Hz</b></div>' +
        '</div>' +
        '<div class="c-int__readouts" style="min-width:180px">' +
          '<div class="c-int__ro" style="font-size:1rem">ACE <b id="ac-ace" style="font-size:1.2rem">0 MW</b></div>' +
          '<div class="c-int__ro" id="ac-msg" style="color:#3FB98C">On target</div>' +
        '</div>' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="ac-ni">Actual net interchange (MW)</label>' +
        '<input id="ac-ni" type="range" min="-50" max="250" value="100" step="5" aria-label="Actual net interchange">' +
        '<label for="ac-f" style="margin-top:10px">Actual frequency (Hz)</label>' +
        '<input id="ac-f" type="range" min="5980" max="6020" value="6000" step="1" aria-label="Actual frequency">' +
      '</div>' +
      '<p class="c-fineprint" style="margin-bottom:0">Training calculation: Reporting ACE = (NIA − NIS) − 10B(FA − FS) − IME + IIM, with IME = 0 and IIM = 0 here.</p>' +
    '</div>';

  var $ = function (id) { return mount.querySelector('#' + id); };

  function render() {
    var ace = (NIa - NIs) - 10 * B * (Fa - Fs);
    $('ac-nia').textContent = NIa + ' MW';
    $('ac-fa').textContent = Fa.toFixed(2) + ' Hz';
    $('ac-ace').textContent = (ace > 0 ? '+' : '') + Math.round(ace) + ' MW';
    var msg = $('ac-msg'), a = $('ac-ace');
    if (Math.abs(ace) < 5) {
      a.style.color = '#3FB98C'; msg.style.color = '#3FB98C';
      msg.textContent = 'On target \u2014 hold';
    } else if (ace < 0) {
      a.style.color = '#E0A83E'; msg.style.color = '#E0A83E';
      msg.textContent = 'Negative \u2192 BA is short; raise generation';
    } else {
      a.style.color = '#E0A83E'; msg.style.color = '#E0A83E';
      msg.textContent = 'Positive \u2192 BA is long; lower generation';
    }
  }

  $('ac-ni').addEventListener('input', function () { NIa = +this.value; render(); });
  $('ac-f').addEventListener('input', function () { Fa = +this.value / 100; render(); });
  render();
};
