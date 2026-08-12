/* ============================================================================
   STANDARDS DATA  —  window.NERC.standards

   Current, enforceable ("Mandatory Subject to Enforcement") NERC Reliability
   Standards in the families the TO exam draws from, taken from NERC's One-Stop
   Shop registry. Version numbers are the ones IN FORCE — study these, not older
   revisions. Titles are the official standard titles; the "note" is an original,
   plain-language summary of why a Transmission Operator cares (not the official
   Purpose text). Re-pull the One-Stop Shop periodically; versions change.

   Schema:
     family: { code, name, blurb, toCore:bool, standards:[ {num, title, note?} ] }
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.standards = [

  { code: "TOP", name: "Transmission Operations", toCore: true,
    blurb: "The core of the TO's rulebook: operate the transmission system reliably, plan operations, exchange the data to do it, and keep real-time monitoring alive.",
    standards: [
      { num: "TOP-001-6",   title: "Transmission Operations",
        note: "Your central obligation: operate within limits, act on directives, and take action to address problems in real time." },
      { num: "TOP-002-5",   title: "Operations Planning",
        note: "Plan the next-day and current-day operation so the system will stay reliable." },
      { num: "TOP-003-6.1", title: "Transmission Operator and Balancing Authority Data and Information Specification",
        note: "Specify and obtain the data you need from others to run the system." },
      { num: "TOP-010-1(i)",title: "Real-time Reliability Monitoring and Analysis Capabilities",
        note: "Keep your monitoring and analysis tools (state estimator, alarms) working and know what to do when they don't." }
    ] },

  { code: "IRO", name: "Interconnection Reliability Operations & Coordination", toCore: true,
    blurb: "Mostly RC-facing, but the IROL-facing ones shape what a TO must do. Know how RCs coordinate and act to stay within IROLs.",
    standards: [
      { num: "IRO-001-4",  title: "Reliability Coordination – Responsibilities",
        note: "Establishes RC authority and that others act on RC directives — including you." },
      { num: "IRO-002-7",  title: "Reliability Coordination – Monitoring and Analysis" },
      { num: "IRO-006-5",  title: "Reliability Coordination – Transmission Loading Relief (TLR)",
        note: "The procedure for relieving overloads across the Eastern Interconnection." },
      { num: "IRO-006-EAST-2", title: "Transmission Loading Relief Procedure for the Eastern Interconnection" },
      { num: "IRO-006-WECC-3", title: "Qualified Path Unscheduled Flow (USF) Relief" },
      { num: "IRO-008-3",  title: "Reliability Coordinator Operational Analyses and Real-time Assessments" },
      { num: "IRO-009-2",  title: "Reliability Coordinator Actions to Operate Within IROLs",
        note: "How the RC prevents and mitigates IROL exceedances — the wide-area safety net above your SOLs." },
      { num: "IRO-010-5",  title: "Reliability Coordinator Data and Information Specification and Collection" },
      { num: "IRO-014-3",  title: "Coordination Among Reliability Coordinators" },
      { num: "IRO-017-1",  title: "Outage Coordination",
        note: "Coordinating planned outages so they don't create real-time reliability problems." },
      { num: "IRO-018-1(i)", title: "Reliability Coordinator Real-time Reliability Monitoring and Analysis Capabilities" }
    ] },

  { code: "VAR", name: "Voltage & Reactive", toCore: true,
    blurb: "Voltage control and reactive resources — a TO's daily lever for holding the system in its voltage limits.",
    standards: [
      { num: "VAR-001-5",   title: "Voltage and Reactive Control",
        note: "Sets voltage schedules and how the TOP directs reactive resources to hold them." },
      { num: "VAR-002-4.1", title: "Generator Operation for Maintaining Network Voltage Schedules",
        note: "Obligates generators to follow the voltage schedule you give them." },
      { num: "VAR-501-WECC-4", title: "Power System Stabilizer (PSS)" }
    ] },

  { code: "FAC", name: "Facilities & Operating Limits", toCore: true,
    blurb: "Where SOLs come from: ratings, the SOL methodology, and how limits get established and communicated.",
    standards: [
      { num: "FAC-001-4", title: "Facility Interconnection Requirements" },
      { num: "FAC-002-4", title: "Facility Interconnection Studies" },
      { num: "FAC-003-5", title: "Transmission Vegetation Management",
        note: "Keeping vegetation clear of lines — a common cause of faults and cascading events." },
      { num: "FAC-008-5", title: "Facility Ratings",
        note: "How equipment ratings are set — the raw material of thermal SOLs." },
      { num: "FAC-011-4", title: "System Operating Limits Methodology for the Operations Horizon",
        note: "The method for determining SOLs you operate to in real time." },
      { num: "FAC-014-3", title: "Establish and Communicate System Operating Limits",
        note: "How SOLs (and IROLs) are established and shared among operators." },
      { num: "FAC-501-WECC-4", title: "Transmission Maintenance" }
    ] },

  { code: "EOP", name: "Emergency Operations & Restoration", toCore: true,
    blurb: "Preparing for and responding to emergencies, plus restoring the system after an outage — including the cold-weather and GMD rules added after real events.",
    standards: [
      { num: "EOP-004-4", title: "Event Reporting" },
      { num: "EOP-005-3", title: "System Restoration from Blackstart Resources",
        note: "How the TOP restores its system using blackstart resources after a shutdown." },
      { num: "EOP-006-3", title: "System Restoration Coordination",
        note: "The RC's role coordinating restoration across systems." },
      { num: "EOP-008-2", title: "Loss of Control Center Functionality",
        note: "Having a plan to keep operating if you lose your control center." },
      { num: "EOP-010-1", title: "Geomagnetic Disturbance Operations" },
      { num: "EOP-011-4", title: "Emergency Operations",
        note: "Your emergency operating plans, including when and how to shed load." },
      { num: "EOP-012-3", title: "Extreme Cold Weather Preparedness and Operations",
        note: "Added after cold-weather events like Uri — preparing generation and operations for extreme cold." }
    ] },

  { code: "COM", name: "Communications", toCore: true,
    blurb: "The rules for how operators talk to each other — capability and, critically, three-part communication.",
    standards: [
      { num: "COM-001-3", title: "Communications",
        note: "Requires reliable communication capability between operating entities." },
      { num: "COM-002-4", title: "Operating Personnel Communications Protocols",
        note: "Three-part communication and use of proper protocols on operating instructions — heavily tested." }
    ] },

  { code: "PRC", name: "Protection & Control", toCore: false,
    blurb: "Mostly owner/operator maintenance, but the load-shedding schemes and relay-loadability rules matter for TO operations.",
    standards: [
      { num: "PRC-002-5",  title: "Disturbance Monitoring and Reporting Requirements" },
      { num: "PRC-004-6",  title: "Protection System Misoperation Identification and Correction" },
      { num: "PRC-005-6",  title: "Protection System, Automatic Reclosing, and Sudden Pressure Relaying Maintenance" },
      { num: "PRC-006-5",  title: "Automatic Underfrequency Load Shedding",
        note: "The automatic UFLS scheme that sheds load to arrest a falling frequency." },
      { num: "PRC-006-NPCC-2", title: "Automatic Underfrequency Load Shedding (NPCC)" },
      { num: "PRC-006-SERC-03", title: "Automatic Underfrequency Load Shedding Requirements (SERC)" },
      { num: "PRC-008-0",  title: "Underfrequency Load Shedding Equipment Maintenance and Documentation" },
      { num: "PRC-010-2",  title: "Undervoltage Load Shedding",
        note: "The UVLS scheme that sheds load to arrest a voltage collapse." },
      { num: "PRC-011-0",  title: "Undervoltage Load Shedding System Maintenance and Testing" },
      { num: "PRC-012-2",  title: "Remedial Action Schemes" },
      { num: "PRC-017-1",  title: "Remedial Action Scheme Maintenance and Testing" },
      { num: "PRC-019-2",  title: "Coordination of Generating Unit or Plant Capabilities, Voltage Regulating Controls, and Protection" },
      { num: "PRC-023-6",  title: "Transmission Relay Loadability",
        note: "Ensures line relays don't trip on heavy-but-safe loading — directly relevant to operating near limits." },
      { num: "PRC-024-3",  title: "Frequency and Voltage Protection Settings for Generating Resources",
        note: "Keeps generators connected through frequency/voltage excursions instead of tripping early." },
      { num: "PRC-025-2",  title: "Generator Relay Loadability" },
      { num: "PRC-026-2",  title: "Relay Performance During Stable Power Swings" },
      { num: "PRC-027-1",  title: "Coordination of Protection Systems for Performance During Faults" },
      { num: "PRC-028-1",  title: "Disturbance Monitoring and Reporting Requirements for Inverter-Based Resources" }
    ] },

  { code: "BAL", name: "Resource & Demand Balancing", toCore: false,
    blurb: "Primarily BA-facing (frequency, ACE, reserves), but a TO should understand the balancing picture around them.",
    standards: [
      { num: "BAL-001-2",     title: "Real Power Balancing Control Performance",
        note: "How a BA's control performance is measured (CPS metrics)." },
      { num: "BAL-001-TRE-2", title: "Primary Frequency Response in the ERCOT Region" },
      { num: "BAL-002-3",     title: "Disturbance Control Standard – Contingency Reserve for Recovery from a Balancing Contingency Event",
        note: "Recovering ACE with contingency reserve after losing a resource." },
      { num: "BAL-003-2",     title: "Frequency Response and Frequency Bias Setting" },
      { num: "BAL-004-WECC-4",title: "Automatic Time Error Correction" },
      { num: "BAL-005-1",     title: "Balancing Authority Control",
        note: "Data and metering needed to calculate Reporting ACE." },
      { num: "BAL-502-RF-03", title: "Planning Resource Adequacy Analysis, Assessment and Documentation" }
    ] },

  { code: "INT", name: "Interchange", toCore: false,
    blurb: "Scheduling and implementing interchange between areas — lighter for a pure TO, heavier for BT operators.",
    standards: [
      { num: "INT-006-5", title: "Evaluation of Interchange Transactions" },
      { num: "INT-009-3", title: "Implementation of Interchange" }
    ] }
];
