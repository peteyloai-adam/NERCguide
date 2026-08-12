/* ============================================================================
   INTERACTIVE: Units along the grid  —  NERC.interactives.gridUnits

   A left-to-right one-line from generator to house. Voltage steps UP for
   transport then DOWN for use; tapping any stage shows which electrical
   quantities matter there, a typical value, and why. The payoff the section
   needs: MVA rates the iron, amperes limit the lines, kV sets the transport
   level, MW is what's dispatched and flows, and MWh is what's consumed/billed.

   Self-contained SVG (scales with panel), no timers. Hardcoded hex per console.css.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.gridUnits = function (mount) {
  var GREEN = '#3FB98C', AMBER = '#E0A83E', PHOS = '#56C2E6',
      READ = '#C9D6E4', DIM = '#7E8DA0', AXIS = '#2A3648', BG = '#1A2230', SEL = '#212C3D';

  // stage centers across a 700-wide viewBox
  var Y = 82;
  var stages = [
    { id: 'gen',   cx: 58,  color: GREEN, label: 'Generator',
      what: 'Converts mechanical energy into electricity. It produces real power (MW) and reactive power (MVAR) together; its nameplate rates the total, in MVA.',
      units: 'MW \u00B7 MVAR \u00B7 MVA \u00B7 kV (terminal)',
      typical: 'An 800 MVA unit at 0.9 power factor \u2248 720 MW + ~350 MVAR, at ~20 kV terminals.',
      why: 'Rated in MVA because the windings heat with total current, real and reactive alike \u2014 pf doesn\u2019t change the heating.' },
    { id: 'gsu',   cx: 200, color: AMBER, label: 'Step-up xfmr',
      what: 'Raises the voltage for long-distance transport \u2014 for example 20 kV up to 345 kV.',
      units: 'MVA (rating) \u00B7 kV (ratio)',
      typical: 'A generator step-up transformer sized to the unit, e.g. ~850 MVA, 20/345 kV.',
      why: 'Higher voltage means less current for the same MW \u2014 and line loss goes as current squared, so stepping up saves enormous losses.' },
    { id: 'line',  cx: 342, color: PHOS,  label: 'Transmission line',
      what: 'Carries bulk power across distance at high voltage. Its ceiling is an ampere (thermal / ampacity) limit, and often an MW-flow or stability limit too.',
      units: 'kV (level) \u00B7 A (ampacity) \u00B7 MW (flow)',
      typical: 'A 345 kV line might carry on the order of 1,000\u20131,500 MW.',
      why: 'You dispatch and schedule in MW, but what physically limits the conductor is amperes \u2014 which is why ratings appear both ways.' },
    { id: 'sdt',   cx: 484, color: AMBER, label: 'Step-down xfmr',
      what: 'At a substation, lowers voltage toward use \u2014 for example 345 kV down to 12 kV.',
      units: 'MVA (rating) \u00B7 kV (ratio)',
      typical: 'A substation transformer might be 100 MVA, 345/12 kV.',
      why: 'Like every transformer, rated in MVA \u2014 it carries whatever total power flows through it.' },
    { id: 'dist',  cx: 626, color: READ,  label: 'Distribution',
      what: 'Delivers power out to neighborhoods at lower voltage. Feeders are limited by amperes.',
      units: 'kV \u00B7 A \u00B7 kW',
      typical: 'A 12 kV feeder serving a few thousand homes.',
      why: 'Same physics, smaller scale \u2014 now the numbers are in kW rather than MW.' },
    { id: 'house', cx: 768, color: READ,  label: 'Home',
      what: 'End use. A home draws power (kW) at any instant, and is billed for energy (kWh) added up over time.',
      units: 'kW (power now) \u00B7 kWh (energy over time)',
      typical: 'A home pulling 3 kW for 2 hours uses 6 kWh.',
      why: 'This is the power-vs-energy distinction in one place: kW is the rate right now; kWh is the rate multiplied by how long.' }
  ];
  var conns = [ // between stages, voltage label at midpoint
    { a: 0, b: 1, v: '~20 kV' }, { a: 1, b: 2, v: '345 kV \u2191' },
    { a: 2, b: 3, v: '345 kV' }, { a: 3, b: 4, v: '12 kV \u2193' }, { a: 4, b: 5, v: '240 V' }
  ];

  function glyph(s) {
    var x = s.cx, c = s.color;
    if (s.id === 'gen')
      return '<circle cx="' + x + '" cy="' + Y + '" r="18" fill="none" stroke="' + c + '" stroke-width="2"/>' +
             '<path d="M' + (x - 9) + ' ' + Y + ' q4.5 -9 9 0 q4.5 9 9 0" fill="none" stroke="' + c + '" stroke-width="2"/>';
    if (s.id === 'gsu' || s.id === 'sdt') {
      var up = s.id === 'gsu';
      return '<circle cx="' + x + '" cy="' + (Y - 7) + '" r="11" fill="none" stroke="' + c + '" stroke-width="2"/>' +
             '<circle cx="' + x + '" cy="' + (Y + 7) + '" r="11" fill="none" stroke="' + c + '" stroke-width="2"/>' +
             '<path d="M' + (x + 20) + ' ' + Y + ' l7 0 m-3.5 -4 l3.5 4 l-3.5 4" fill="none" stroke="' + c + '" stroke-width="1.5" transform="rotate(' + (up ? -90 : 90) + ' ' + (x + 23) + ' ' + Y + ')"/>';
    }
    if (s.id === 'line') // little pylon
      return '<path d="M' + (x - 12) + ' ' + (Y + 14) + ' L' + x + ' ' + (Y - 16) + ' L' + (x + 12) + ' ' + (Y + 14) + ' M' + (x - 8) + ' ' + (Y + 2) + ' L' + (x + 8) + ' ' + (Y + 2) + ' M' + (x - 5) + ' ' + (Y - 6) + ' L' + (x + 5) + ' ' + (Y - 6) + '" fill="none" stroke="' + c + '" stroke-width="2"/>';
    if (s.id === 'dist') // utility pole
      return '<path d="M' + x + ' ' + (Y - 16) + ' L' + x + ' ' + (Y + 16) + ' M' + (x - 11) + ' ' + (Y - 10) + ' L' + (x + 11) + ' ' + (Y - 10) + ' M' + (x - 7) + ' ' + (Y - 4) + ' L' + (x + 7) + ' ' + (Y - 4) + '" fill="none" stroke="' + c + '" stroke-width="2"/>';
    // house
    return '<path d="M' + (x - 13) + ' ' + (Y + 15) + ' L' + (x - 13) + ' ' + Y + ' L' + x + ' ' + (Y - 13) + ' L' + (x + 13) + ' ' + Y + ' L' + (x + 13) + ' ' + (Y + 15) + ' Z" fill="none" stroke="' + c + '" stroke-width="2"/>';
  }

  var svg = '<svg viewBox="0 0 830 150" style="width:100%;max-width:760px;height:auto" role="img" ' +
    'aria-label="Electricity from generator through transformers and lines to a home, each stage tappable">';
  // connectors + voltage labels
  conns.forEach(function (cn) {
    var xa = stages[cn.a].cx, xb = stages[cn.b].cx, mid = (xa + xb) / 2;
    svg += '<line x1="' + (xa + 20) + '" y1="' + Y + '" x2="' + (xb - 20) + '" y2="' + Y + '" stroke="' + AXIS + '" stroke-width="2"/>' +
           '<text x="' + mid + '" y="' + (Y - 22) + '" fill="' + DIM + '" font-family="monospace" font-size="9" text-anchor="middle">' + cn.v + '</text>';
  });
  // stages: clickable bg rect + glyph + label
  stages.forEach(function (s) {
    svg += '<g class="gu-stage" data-id="' + s.id + '" style="cursor:pointer">' +
      '<rect class="gu-hit" x="' + (s.cx - 26) + '" y="' + (Y - 30) + '" width="52" height="74" rx="6" fill="' + BG + '" stroke="' + AXIS + '"/>' +
      glyph(s) +
      '<text x="' + s.cx + '" y="' + (Y + 38) + '" fill="' + READ + '" font-family="monospace" font-size="8.5" text-anchor="middle">' + s.label + '</text>' +
      '</g>';
  });
  svg += '</svg>';

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00B7 Units along the grid</div>' + svg +
      '<div id="gu-detail" class="c-note c-note--op" style="margin-top:14px">' +
        '<div class="c-note__title">Follow the power \u2014 tap a stage</div>' +
        'Voltage steps <em>up</em> for transport and <em>down</em> for use. Tap any stage to see which units matter there and why.</div>' +
    '</div>';

  var byId = {}; stages.forEach(function (s) { byId[s.id] = s; });
  var detail = mount.querySelector('#gu-detail');
  function line(label, val) {
    return '<div style="margin-top:6px"><span style="font-family:var(--font-mono);font-size:.66rem;letter-spacing:.06em;text-transform:uppercase;color:' + DIM + '">' + label + '</span><br>' + val + '</div>';
  }
  mount.querySelectorAll('.gu-stage').forEach(function (g) {
    g.addEventListener('click', function () {
      mount.querySelectorAll('.gu-hit').forEach(function (r) { r.setAttribute('fill', BG); r.setAttribute('stroke', AXIS); });
      var s = byId[g.getAttribute('data-id')];
      var hit = g.querySelector('.gu-hit'); hit.setAttribute('fill', SEL); hit.setAttribute('stroke', s.color);
      detail.innerHTML =
        '<div class="c-note__title" style="color:' + s.color + '">' + s.label + '</div>' +
        s.what +
        line('Units that matter here', '<b>' + s.units + '</b>') +
        line('Typical', s.typical) +
        line('Why', s.why);
    });
  });
};
