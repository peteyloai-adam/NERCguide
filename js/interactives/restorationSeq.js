/* ============================================================================
   INTERACTIVE: System restoration sequence  —  NERC.interactives.restorationSeq
   Step through the logic of restoring a system after a shutdown. Restoration is
   all about ORDER: you can't pick up load you can't generate for, and you can't
   tie islands together until voltage, frequency, and angle match. Next/Prev walk
   the stages; each explains why it comes where it does.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.restorationSeq = function (mount) {
  var steps = [
    { t: "Assess & stabilize", d: "Determine the extent of the outage, confirm what's still energized, and identify available blackstart resources. You act from facts, not assumptions \u2014 telemetry may be spotty." },
    { t: "Establish a cranking path", d: "Energize a path from a blackstart (self-starting) unit to a larger generator that needs station power to start. This cranking path is what gets non-blackstart generation online." },
    { t: "Energize the transmission backbone", d: "Extend energization along key transmission, watching voltage carefully \u2014 lightly loaded lines can push voltage high, so switch reactors and manage reactive as you go." },
    { t: "Pick up load in blocks", d: "Add load in measured increments matched to available generation. Too much load at once pulls frequency down; cold load pickup can draw more than normal, so blocks stay conservative." },
    { t: "Build stable islands", d: "Grow one or more islands, each with generation and load balanced and its own frequency and voltage under control before you attempt to connect it to anything else." },
    { t: "Synchronize islands", d: "Close ties between islands only when voltage, frequency, and phase angle are matched across the open point. Closing out of synchronism can damage equipment and trip generation." },
    { t: "Reintegrate & normalize", d: "Restore remaining load, return to normal configuration, and coordinate throughout with the Reliability Coordinator and neighbors so restoration steps don't conflict." }
  ];
  var i = 0;

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00b7 Restoration sequence</div>' +
      '<div id="rs-dots" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px"></div>' +
      '<div style="min-height:120px">' +
        '<div style="font-family:monospace;font-size:.72rem;color:#7E8DA0;letter-spacing:.1em" id="rs-num"></div>' +
        '<div style="font-size:1.05rem;color:#C9D6E4;margin:4px 0 8px" id="rs-title"></div>' +
        '<div style="font-size:.92rem;color:#C9D6E4;max-width:60ch" id="rs-desc"></div>' +
      '</div>' +
      '<div style="display:flex;gap:8px;margin-top:12px">' +
        '<button class="c-btn" id="rs-prev" type="button">&larr; Prev</button>' +
        '<button class="c-btn c-btn--primary" id="rs-next" type="button">Next step &rarr;</button>' +
      '</div>' +
    '</div>';

  var dots = mount.querySelector('#rs-dots');
  steps.forEach(function (_, k) {
    var d = document.createElement('span');
    d.style.cssText = 'width:22px;height:6px;border-radius:3px;background:#2A3648';
    dots.appendChild(d);
  });

  function render() {
    Array.prototype.forEach.call(dots.children, function (d, k) {
      d.style.background = k < i ? '#3FB98C' : (k === i ? '#56C2E6' : '#2A3648');
    });
    mount.querySelector('#rs-num').textContent = 'STAGE ' + (i + 1) + ' OF ' + steps.length;
    mount.querySelector('#rs-title').textContent = steps[i].t;
    mount.querySelector('#rs-desc').textContent = steps[i].d;
    mount.querySelector('#rs-prev').disabled = i === 0;
    mount.querySelector('#rs-next').textContent = i === steps.length - 1 ? 'Restart' : 'Next step \u2192';
  }
  mount.querySelector('#rs-prev').addEventListener('click', function () { if (i > 0) { i--; render(); } });
  mount.querySelector('#rs-next').addEventListener('click', function () { i = (i + 1) % steps.length; render(); });
  render();
};
