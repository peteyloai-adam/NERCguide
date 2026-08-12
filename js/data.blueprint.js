/* ============================================================================
   BLUEPRINT DATA  —  window.NERC.blueprint

   The official NERC Transmission Operator (TO) exam content outline
   (Effective June 1, 2023): six knowledge-area domains, their sub-topics, and
   the number of SCORED questions each carries. Totals sum to 100 scored items
   (cut score 76); an additional ~20 unscored experimental items are also given.

   This is the backbone for: practice-by-domain, coverage tracking (how many
   questions we've written vs. the exam's target weighting), and later, assembling
   balanced full-length mock exams. Question `domain`/`topic` ids map to this file.

   Schema: { id, num, name, short, target, topics:[ {id, name, target} ] }
   ========================================================================== */
window.NERC = window.NERC || {};

/* Per-credential exam facts. Authoritative source: NERC "Exam Resource Materials
   for NERC System Operator Certification Examinations" (Jan 24, 2025) and the
   "System Operator Certification Program Manual" v4.2 (Feb 2025), Table 1.1.
     scored = scored items the content outline sums to
     total  = scored + 20 unscored experimental items administered
     cut    = scored items required to pass;  pct = cut / scored              */
window.NERC.credentials = {
  to:  { id: "to",  designation: "TO", name: "Transmission Operator",                           scored: 100, total: 120, cut: 76, pct: 0.76 },
  rc:  { id: "rc",  designation: "RC", name: "Reliability Coordinator Operator",                 scored: 120, total: 140, cut: 92, pct: 0.7667 },
  bit: { id: "bit", designation: "BT", name: "Balancing, Interchange, and Transmission Operator", scored: 120, total: 140, cut: 92, pct: 0.7667 },
  bi:  { id: "bi",  designation: "BI", name: "Balancing and Interchange Operator",               scored: 100, total: 120, cut: 76, pct: 0.76 }
};

window.NERC.blueprintTO = [

  { id: "balancing", num: 1, name: "Resource and Demand Balancing", short: "Balancing", target: 13,
    topics: [
      { id: "1a", name: "Interchange Scheduling and Coordination", target: 1 },
      { id: "1b", name: "Reserves (Spinning and Non-Spinning)", target: 1 },
      { id: "1c", name: "Automatic Generation Control (AGC)", target: 1 },
      { id: "1d", name: "Area Control Error (ACE)", target: 1 },
      { id: "1e", name: "Frequency", target: 3 },
      { id: "1f", name: "Load Forecasting", target: 2 },
      { id: "1g", name: "Generation Equipment", target: 2 },
      { id: "1h", name: "Energy Sources (hydro, solar, thermal)", target: 2 }
    ] },

  { id: "transmission", num: 2, name: "Transmission", short: "Transmission", target: 29,
    topics: [
      { id: "2a", name: "Protection and Control", target: 5 },
      { id: "2b", name: "Voltage and Reactive", target: 5 },
      { id: "2c", name: "Electrical Fundamentals", target: 4 },
      { id: "2d", name: "Reconfiguration and Switching", target: 5 },
      { id: "2e", name: "Operating Limits", target: 5 },
      { id: "2f", name: "Transmission Equipment", target: 5 }
    ] },

  { id: "emergency-prep", num: 3, name: "Emergency Preparedness", short: "Emerg Prep", target: 10,
    topics: [
      { id: "3a", name: "Same-Day and Next-Day Planning", target: 4 },
      { id: "3b", name: "Weather, Natural Disasters, and Geomagnetic Disturbances", target: 4 },
      { id: "3c", name: "Anticipated Capacity Deficiency", target: 2 }
    ] },

  { id: "emergency-response", num: 4, name: "Emergency Response", short: "Emerg Resp", target: 16,
    topics: [
      { id: "4a", name: "System Restoration", target: 5 },
      { id: "4b", name: "Response to System Disturbances", target: 4 },
      { id: "4c", name: "Response to Capacity Emergencies", target: 2 },
      { id: "4d", name: "Response to Loss of Control Center", target: 2 },
      { id: "4e", name: "Response to Loss of Analysis and Monitoring Tools", target: 3 }
    ] },

  { id: "contingency", num: 5, name: "Contingency Analysis and Reliability", short: "Contingency", target: 20,
    topics: [
      { id: "5a", name: "Contingency Analysis", target: 4 },
      { id: "5b", name: "Network Analysis Tools (State Estimators)", target: 4 },
      { id: "5c", name: "Response to Results of Contingency Analysis", target: 4 },
      { id: "5d", name: "System Operating Limits (SOL)", target: 4 },
      { id: "5e", name: "Interconnection Reliability Operating Limits (IROL)", target: 4 }
    ] },

  { id: "comms-data", num: 6, name: "Communications and Data", short: "Comms & Data", target: 12,
    topics: [
      { id: "6a", name: "Reporting Requirements", target: 3 },
      { id: "6b", name: "Communication Methods (Three-Part Communication, RCIS)", target: 3 },
      { id: "6c", name: "Data Validity and Verification", target: 4 },
      { id: "6d", name: "Telemetry and Communications Equipment", target: 2 }
    ] }
];

/* Per-credential content-outline blueprints. TO, RC, BT, and BI are populated from their official NERC content outlines. */
window.NERC.blueprints = { to: window.NERC.blueprintTO, rc: null, bit: null, bi: null };

/* Back-compat: existing engine reads NERC.blueprint; defaults to the TO outline. */
window.NERC.blueprint = window.NERC.blueprintTO;

/* RC and BT share TO's six domains and sub-topic ids/names; only the
   per-sub-topic SCORED-question targets differ. Targets below are transcribed
   from each credential's official NERC Content Outline, Effective June 1, 2023.
   Domain totals are computed from the sub-topic targets (no separate entry to
   drift). RC sums to 120, BT to 120, BI to 100. All four credentials populated. */
(function () {
  function build(targets) {
    return window.NERC.blueprintTO.map(function (d) {
      var topics = d.topics.map(function (t) { return { id: t.id, name: t.name, target: targets[t.id] }; });
      var sum = topics.reduce(function (n, t) { return n + t.target; }, 0);
      return { id: d.id, num: d.num, name: d.name, short: d.short, target: sum, topics: topics };
    });
  }
  var RC = {
    "1a": 3, "1b": 4, "1c": 3, "1d": 4, "1e": 4, "1f": 3, "1g": 3, "1h": 2,
    "2a": 4, "2b": 5, "2c": 4, "2d": 4, "2e": 5, "2f": 5,
    "3a": 4, "3b": 4, "3c": 4,
    "4a": 5, "4b": 4, "4c": 4, "4d": 2, "4e": 3,
    "5a": 5, "5b": 5, "5c": 5, "5d": 5, "5e": 5,
    "6a": 3, "6b": 3, "6c": 4, "6d": 2
  };
  var BT = {
    "1a": 4, "1b": 4, "1c": 4, "1d": 4, "1e": 5, "1f": 3, "1g": 4, "1h": 3,
    "2a": 4, "2b": 5, "2c": 4, "2d": 5, "2e": 5, "2f": 5,
    "3a": 4, "3b": 4, "3c": 4,
    "4a": 4, "4b": 4, "4c": 4, "4d": 2, "4e": 3,
    "5a": 4, "5b": 4, "5c": 4, "5d": 4, "5e": 4,
    "6a": 3, "6b": 3, "6c": 4, "6d": 2
  };
  var BI = {
    "1a": 5, "1b": 5, "1c": 5, "1d": 4, "1e": 5, "1f": 4, "1g": 5, "1h": 3,
    "2a": 2, "2b": 2, "2c": 3, "2d": 1, "2e": 3, "2f": 1,
    "3a": 4, "3b": 4, "3c": 4,
    "4a": 4, "4b": 3, "4c": 4, "4d": 2, "4e": 3,
    "5a": 2, "5b": 2, "5c": 2, "5d": 3, "5e": 3,
    "6a": 3, "6b": 3, "6c": 4, "6d": 2
  };
  window.NERC.blueprints.rc = build(RC);
  window.NERC.blueprints.bit = build(BT);
  window.NERC.blueprints.bi = build(BI);
})();
