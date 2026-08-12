/* ============================================================================
   INTERACTIVE: Authority map  —  NERC.interactives.authorityMap
   Click a functional role to see its real-time authority: who it directs and
   whose direction it takes. Reinforces the RC -> BA/TOP -> GOP chain that the
   exam leans on heavily.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.authorityMap = function (mount) {
  var roles = {
    rc:  { name: "Reliability Coordinator (RC)",
           d: "Widest-area view and the highest real-time operating authority. Directs BAs and TOPs to preserve reliability. Operationally, it takes direction from no one \u2014 the buck stops here." },
    ba:  { name: "Balancing Authority (BA)",
           d: "Keeps generation and load in balance and supports Interconnection frequency. Directs GOPs on output; takes wide-area direction from the RC." },
    top: { name: "Transmission Operator (TOP)",
           d: "Operates its transmission facilities reliably. Directs GOPs on its system and coordinates with neighboring TOPs; acts on RC directives. This is the role your NERC TO credential maps to." },
    gop: { name: "Generator Operator (GOP)",
           d: "Runs the generating units. Follows dispatch and voltage instructions from the BA, TOP, and RC." }
  };

  function box(id, label, sub) {
    return '<button class="c-btn am-box" data-role="' + id + '" type="button" ' +
           'style="flex-direction:column;align-items:flex-start;gap:2px;min-width:150px">' +
           '<span class="mono" style="font-size:.82rem;color:#C9D6E4">' + label + '</span>' +
           '<span class="mono" style="font-size:.62rem;color:#7E8DA0">' + sub + '</span></button>';
  }
  var arrow = '<div class="mono" style="text-align:center;color:#56C2E6;font-size:.7rem;margin:2px 0">\u2193 directs \u2193</div>';

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00b7 Who directs whom</div>' +
      '<div style="display:flex;justify-content:center">' + box("rc", "RC", "highest authority") + '</div>' +
      arrow +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        box("ba", "BA", "balances gen/load") + box("top", "TOP", "operates transmission") +
      '</div>' +
      arrow +
      '<div style="display:flex;justify-content:center">' + box("gop", "GOP", "runs the units") + '</div>' +
      '<div id="am-detail" class="c-note c-note--op" style="margin-top:16px">' +
        '<div class="c-note__title">Tap a role</div>Select any role above to see its real-time authority.</div>' +
    '</div>';

  var detail = mount.querySelector('#am-detail');
  mount.querySelectorAll('.am-box').forEach(function (b) {
    b.addEventListener('click', function () {
      mount.querySelectorAll('.am-box').forEach(function (x) {
        x.style.borderColor = '#2A3648'; x.style.background = '#1A2230';
      });
      b.style.borderColor = '#56C2E6'; b.style.background = '#212C3D';
      var r = roles[b.getAttribute('data-role')];
      detail.innerHTML = '<div class="c-note__title">' + r.name + '</div>' + r.d;
    });
  });
};
