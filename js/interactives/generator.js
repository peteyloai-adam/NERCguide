/* ============================================================================
   INTERACTIVE: Synchronous generator  —  NERC.interactives.generator
   Two levers, two effects: prime-mover / governor SPEED sets FREQUENCY, and
   field EXCITATION sets TERMINAL VOLTAGE. Drag each and watch the output wave
   (cycles track frequency, height tracks voltage) and the readouts respond.
   Illustrative small-machine model; wave cycle count is exaggerated so the
   frequency change is visible over the narrow operating band.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.generator = function (mount) {
  var C = { void: "#0B0F14", grid: "#2A3648", read: "#C9D6E4", dim: "#7E8DA0",
            phos: "#56C2E6", normal: "#3FB98C", alert: "#E0A83E", emerg: "#E5484D" };

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00b7 Synchronous generator</div>' +
      '<div class="c-int__row">' +
        '<svg viewBox="0 0 340 150" width="340" role="img" aria-label="Synchronous generator with rotor, output waveform, and readouts">' +
          // stator ring + rotor (fixed representative angle)
          '<circle cx="66" cy="70" r="44" fill="none" stroke="' + C.grid + '" stroke-width="6"/>' +
          '<circle cx="66" cy="70" r="30" fill="none" stroke="#1B2431" stroke-width="1"/>' +
          '<g transform="rotate(-32 66 70)">' +
            '<rect x="61" y="40" width="10" height="30" fill="' + C.emerg + '"/>' +
            '<rect x="61" y="70" width="10" height="30" fill="' + C.phos + '"/>' +
            '<text x="66" y="52" fill="#fff" font-family="monospace" font-size="9" text-anchor="middle">N</text>' +
            '<text x="66" y="92" fill="#0B0F14" font-family="monospace" font-size="9" text-anchor="middle">S</text>' +
          '</g>' +
          '<text x="66" y="130" fill="' + C.dim + '" font-family="monospace" font-size="8" text-anchor="middle">rotor</text>' +
          // leads to the scope
          '<line x1="110" y1="60" x2="150" y2="60" stroke="' + C.dim + '" stroke-width="1"/>' +
          '<line x1="110" y1="80" x2="150" y2="80" stroke="' + C.dim + '" stroke-width="1"/>' +
          // scope box
          '<rect x="150" y="24" width="182" height="92" rx="4" fill="' + C.void + '" stroke="' + C.grid + '"/>' +
          '<line x1="150" y1="70" x2="332" y2="70" stroke="#1B2431" stroke-width="1"/>' +
          '<polyline id="gn-wave" points="" fill="none" stroke="' + C.phos + '" stroke-width="2"/>' +
          '<text x="241" y="18" fill="' + C.dim + '" font-family="monospace" font-size="8" text-anchor="middle">terminal output (AC)</text>' +
        '</svg>' +
        '<div class="c-int__readouts">' +
          '<div class="c-int__ro">Shaft speed <b id="gn-rpm">3600 rpm</b></div>' +
          '<div class="c-int__ro">Frequency <b id="gn-hz">60.00 Hz</b></div>' +
          '<div class="c-int__ro">Excitation <b id="gn-exc">100%</b></div>' +
          '<div class="c-int__ro">Terminal V <b id="gn-v">1.00 pu</b></div>' +
        '</div>' +
      '</div>' +
      '<div id="gn-status" style="font-family:monospace;font-size:.82rem;margin-top:10px;min-height:1.25em;color:' + C.normal + '">On schedule</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="gn-speed">Prime-mover / governor \u2014 shaft speed \u2192 frequency</label>' +
        '<input id="gn-speed" type="range" min="5990" max="6010" value="6000" step="1" aria-label="Shaft speed setting">' +
      '</div>' +
      '<div class="c-int__ctrl">' +
        '<label for="gn-field">Field excitation (AVR) \u2192 terminal voltage</label>' +
        '<input id="gn-field" type="range" min="80" max="120" value="100" step="1" aria-label="Field excitation percent">' +
      '</div>' +
    '</div>';

  var wave = mount.querySelector('#gn-wave');
  var rpmEl = mount.querySelector('#gn-rpm'), hzEl = mount.querySelector('#gn-hz');
  var excEl = mount.querySelector('#gn-exc'), vEl = mount.querySelector('#gn-v');
  var status = mount.querySelector('#gn-status');
  var speed = mount.querySelector('#gn-speed'), field = mount.querySelector('#gn-field');

  function render() {
    var f = (+speed.value) / 100;                 // Hz  (5990..6010 -> 59.90..60.10)
    var rpm = f * 60;                             // 2-pole synchronous
    var vpu = 0.90 + ((+field.value) - 80) / 40 * 0.20;  // 0.90..1.10

    // wave: cycles track frequency (exaggerated), amplitude tracks voltage
    var cycles = 2.2 + (f - 59.90) / (60.10 - 59.90) * (3.8 - 2.2);
    var amp = Math.max(6, Math.min(32, 26 * vpu));
    var x0 = 152, x1 = 330, mid = 70, n = 64, pts = [];
    for (var i = 0; i <= n; i++) {
      var x = x0 + (x1 - x0) * i / n;
      var th = cycles * 2 * Math.PI * i / n;
      pts.push(x.toFixed(1) + ',' + (mid - amp * Math.sin(th)).toFixed(1));
    }
    wave.setAttribute('points', pts.join(' '));

    var dF = Math.abs(f - 60);
    var fCol = dF <= 0.02 ? C.normal : (dF <= 0.05 ? C.alert : C.emerg);
    var vCol = (vpu >= 0.95 && vpu <= 1.05) ? C.normal : C.alert;
    wave.setAttribute('stroke', fCol === C.normal ? C.phos : fCol);

    rpmEl.textContent = rpm.toFixed(0) + ' rpm';
    hzEl.textContent = f.toFixed(2) + ' Hz'; hzEl.style.color = fCol;
    excEl.textContent = (+field.value) + '%';
    vEl.textContent = vpu.toFixed(2) + ' pu'; vEl.style.color = vCol;

    var msg, col;
    if (dF > 0.02 && Math.abs(vpu - 1.0) > 0.05) { col = C.emerg; msg = 'Speed and excitation both off schedule'; }
    else if (dF > 0.02) { col = fCol; msg = f > 60 ? 'Overspeed \u2192 frequency high' : 'Underspeed \u2192 frequency low'; }
    else if (vpu > 1.05) { col = vCol; msg = 'Overexcited \u2192 high voltage, exporting MVAR'; }
    else if (vpu < 0.95) { col = vCol; msg = 'Underexcited \u2192 low voltage, absorbing MVAR'; }
    else { col = C.normal; msg = 'On schedule \u2014 60 Hz, ~1.0 pu'; }
    status.textContent = msg; status.style.color = col;
  }

  speed.addEventListener('input', render);
  field.addEventListener('input', render);
  render();
};
