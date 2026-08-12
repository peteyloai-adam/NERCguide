/* ============================================================================
   INTERACTIVE: Functional model explorer  —  NERC.interactives.functionalRoles

   The full cast, grouped by what kind of job each entity does:
     - Oversight & authority (regulate / enforce / hold real-time authority)
     - Real-time operating (run the system right now)
     - Owners & planners (own the iron / plan the future system)
     - Market & service (arrange energy and transmission)

   Tapping any entity reveals a detail panel: what it does, who directs it (or
   who it answers to), and who it works with. Complements authorityMap, which
   focuses only on the real-time RC -> BA/TOP -> GOP chain of command.

   Self-contained, no timers. Colors are hardcoded hex matching console.css.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.functionalRoles = function (mount) {
  var PHOS = '#56C2E6', AMBER = '#E0A83E', GREEN = '#3FB98C',
      READ = '#C9D6E4', DIM = '#7E8DA0', AXIS = '#2A3648', VIOLET = '#8FA0FF';

  // tag = one-word kind; color groups the four categories
  var groups = [
    { key: 'auth', title: 'Oversight & authority', color: AMBER, roles: [
      { id: 'ferc', acr: 'FERC', name: 'Federal Energy Regulatory Commission', tag: 'Regulator',
        does: 'The U.S. regulator that approves NERC\u2019s Reliability Standards and gives them the force of law, and oversees NERC.',
        answers: 'U.S. federal law. (In Canada, provincial/federal regulators play the parallel role.)',
        works: 'NERC; state and provincial regulators.' },
      { id: 'nerc', acr: 'NERC', name: 'North American Electric Reliability Corporation', tag: 'ERO',
        does: 'The Electric Reliability Organization: writes and enforces the mandatory Reliability Standards across North America.',
        answers: 'FERC (and Canadian regulators).',
        works: 'Regional Entities (it delegates enforcement to them) and every registered entity.' },
      { id: 're', acr: 'RE', name: 'Regional Entity', tag: 'Enforcement',
        does: 'Monitors and enforces the standards, and registers entities, within a geographic footprint (e.g. SERC, WECC, MRO, RF, NPCC, Texas RE).',
        answers: 'NERC.',
        works: 'All registered entities in its region.' },
      { id: 'rc', acr: 'RC', name: 'Reliability Coordinator', tag: 'Real-time authority',
        does: 'Holds the widest-area view and the highest real-time operating authority. Watches for IROLs and can direct BAs and TOPs to preserve reliability.',
        answers: 'No one, operationally \u2014 the buck stops here in real time.',
        works: 'Neighboring RCs (shared awareness via RCIS); its BAs and TOPs.' }
    ] },
    { key: 'ops', title: 'Real-time operating', color: PHOS, roles: [
      { id: 'ba', acr: 'BA', name: 'Balancing Authority', tag: 'Operator',
        does: 'Matches generation to load plus interchange in its area, controls ACE, and supports Interconnection frequency.',
        answers: 'The RC on wide-area issues.',
        works: 'Neighboring BAs (interchange); GOPs (it directs their output); its TOP.' },
      { id: 'top', acr: 'TOP', name: 'Transmission Operator', tag: 'Operator',
        does: 'Operates the transmission facilities in real time \u2014 switching, holding limits, managing voltage. This is the role the NERC TO credential maps to.',
        answers: 'The RC.',
        works: 'Neighboring TOPs; its BA; GOPs on its system; the DP for load actions. Often operates facilities a Transmission Owner owns.' },
      { id: 'gop', acr: 'GOP', name: 'Generator Operator', tag: 'Operator',
        does: 'Runs the generating units in real time and follows dispatch and voltage instructions.',
        answers: 'The BA, TOP, and RC.',
        works: 'Its Generator Owner (which owns and maintains the units).' },
      { id: 'dp', acr: 'DP', name: 'Distribution Provider', tag: 'Operator',
        does: 'Operates the distribution system delivering power to end users, and carries out load actions \u2014 automatic (UFLS/UVLS) and manual shedding \u2014 when instructed.',
        answers: 'The TOP/BA for reliability load actions.',
        works: 'LSEs and end-use customers.' }
    ] },
    { key: 'own', title: 'Owners & planners', color: GREEN, roles: [
      { id: 'go', acr: 'GO', name: 'Generator Owner', tag: 'Owner',
        does: 'Owns generating facilities and is responsible for their maintenance, ratings, protection, and data \u2014 but does not run them minute to minute.',
        answers: 'Compliance-wise to NERC/Regional Entity; not directed in real time.',
        works: 'Its GOP (which operates the units); planners.' },
      { id: 'to', acr: 'TO', name: 'Transmission Owner', tag: 'Owner',
        does: 'Owns transmission facilities and is responsible for their maintenance, ratings, protection, and construction/retirement.',
        answers: 'Compliance-wise to NERC/Regional Entity; not directed in real time.',
        works: 'The TOP (which operates its facilities); the Transmission Planner.' },
      { id: 'tp', acr: 'TP', name: 'Transmission Planner', tag: 'Planner',
        does: 'Develops longer-term plans \u2014 studies, reinforcements, expansions \u2014 to keep its portion of the system reliable in the planning horizon.',
        answers: 'Coordinated by the Planning Coordinator.',
        works: 'The PC; Transmission Owners; TOPs (for as-operated data).' },
      { id: 'pc', acr: 'PC', name: 'Planning Coordinator', tag: 'Planner',
        does: 'Coordinates and integrates transmission plans over a wide area and long horizon, and sets some system-wide planning requirements.',
        answers: 'Compliance-wise to NERC/Regional Entity.',
        works: 'Transmission Planners and Owners; the RC for operations/planning hand-off.' }
    ] },
    { key: 'mkt', title: 'Market & service', color: VIOLET, roles: [
      { id: 'tsp', acr: 'TSP', name: 'Transmission Service Provider', tag: 'Service',
        does: 'Administers the transmission tariff and sells or arranges transmission service, evaluating requests and posting capability (often via OASIS).',
        answers: 'Commercial function \u2014 not directed in real-time operations.',
        works: 'PSEs and LSEs (buyers of service); the TOP.' },
      { id: 'lse', acr: 'LSE', name: 'Load-Serving Entity', tag: 'Service',
        does: 'Secures the energy, transmission, and related services needed to serve its end-use customers\u2019 load.',
        answers: 'Commercial function.',
        works: 'PSEs; TSPs; the DP that delivers to its customers.' },
      { id: 'pse', acr: 'PSE', name: 'Purchasing-Selling Entity', tag: 'Market',
        does: 'Buys, sells, and arranges energy and transmission. The transactions it creates become the interchange schedules BAs must honor.',
        answers: 'Commercial function.',
        works: 'BAs (interchange); TSPs; LSEs.' },
      { id: 'rto', acr: 'RTO/ISO', name: 'Regional Transmission Org. / Independent System Operator', tag: 'Wears many hats',
        does: 'An independent operator of the grid and wholesale market for a region \u2014 typically registered as RC, BA, TOP, TSP, and PC all at once (e.g. SPP, MISO, PJM, ERCOT, CAISO).',
        answers: 'NERC/FERC for compliance; operationally it IS the RC/BA/TOP for its footprint.',
        works: 'Member utilities, GOPs, LSEs, and neighboring ISOs/RCs.' }
    ] }
  ];

  var byId = {};
  groups.forEach(function (g) { g.roles.forEach(function (r) { r._color = g.color; byId[r.id] = r; }); });

  var html = '<div class="c-int"><div class="c-int__title">Interactive \u00B7 The functional model: who\u2019s who</div>';
  groups.forEach(function (g) {
    html += '<div style="margin-top:12px"><div style="font-family:var(--font-mono);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:' + g.color + ';margin-bottom:6px">' + g.title + '</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">';
    g.roles.forEach(function (r) {
      html += '<button class="c-btn fr-box" data-id="' + r.id + '" type="button" style="min-width:64px">' +
        '<span style="font-family:var(--font-mono);font-size:.82rem;color:' + g.color + '">' + r.acr + '</span></button>';
    });
    html += '</div></div>';
  });
  html += '<div id="fr-detail" class="c-note c-note--op" style="margin-top:16px">' +
    '<div class="c-note__title">Tap any entity</div>' +
    'Pick one above to see what it does, who directs it, and who it works with. The colors group the four kinds of role.</div>';
  html += '</div>';
  mount.innerHTML = html;

  var detail = mount.querySelector('#fr-detail');
  function line(label, val) {
    return '<div style="margin-top:6px"><span style="font-family:var(--font-mono);font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:' + DIM + '">' + label + '</span><br>' + val + '</div>';
  }
  mount.querySelectorAll('.fr-box').forEach(function (b) {
    b.addEventListener('click', function () {
      mount.querySelectorAll('.fr-box').forEach(function (x) { x.style.borderColor = AXIS; x.style.background = '#1A2230'; });
      var r = byId[b.getAttribute('data-id')];
      b.style.borderColor = r._color; b.style.background = '#212C3D';
      detail.innerHTML =
        '<div class="c-note__title" style="color:' + r._color + '">' + r.name + ' (' + r.acr + ') \u00B7 ' + r.tag + '</div>' +
        line('Does', r.does) + line('Answers to / directed by', r.answers) + line('Works with', r.works);
    });
  });
};
