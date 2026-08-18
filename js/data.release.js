window.NERC = window.NERC || {};
window.NERC.release = {
  version: "3.4.1-pwa4",
  releaseDate: "2026-08-18",
  reviewDate: "2026-08-18",
  scope: "SME Mode navigation clarification on the approved-reference-complete v3.4 offline PWA baseline",
  officialSources: [
    { id: "exam-materials", title: "Exam Resource Materials for NERC System Operator Certification Examinations", version: "January 24, 2025", url: "https://www.nerc.com/globalassets/programs/system-operator-certification--continuing-education/exam_resource_materials.pdf" },
    { id: "epri-dynamics", title: "EPRI Power System Dynamics Tutorial", version: "1016042, July 2009; Glossary and Chapters 2-9 and 11", url: "https://restservice.epri.com/publicdownload/000000000001016042/0/Product" },
    { id: "epri-dynamics-supplement", title: "Supplement to EPRI Power System Dynamics Tutorial", version: "3002010757, December 2017", url: "https://restservice.epri.com/publicdownload/000000003002010757/0/Product" },
    { id: "generation-baseline", title: "Electricity Generation Baseline Report", version: "NREL/TP-6A20-67645, January 2017; Chapters 5-13", url: "https://docs.nlr.gov/docs/fy17osti/67645.pdf" },
    { id: "wind-apc", title: "Active Power Controls from Wind Power: Bridging the Gaps", version: "NREL/TP-5D00-60574, January 2014; Chapters 3-4", url: "https://www.energy.gov/sites/prod/files/2014/01/f6/Active%20Power%20Controls%20from%20Wind%20Power.pdf" },
    { id: "soc-manual", title: "System Operator Certification Program Manual", version: "4.2, February 2025", url: "https://www.nerc.com/globalassets/programs/system-operator-certification--continuing-education/soc_program_manual_v4.2.pdf" },
    { id: "standards", title: "NERC Reliability Standards One Stop Shop", version: "reviewed August 18, 2026", url: "https://www.nerc.com/standards/reliability-standards" },
    { id: "glossary-terms", title: "NERC Glossary of Terms Used in NERC Reliability Standards", version: "February 2026; reviewed August 18, 2026", url: "https://www.nerc.com/glossary-of-terms" },
    { id: "bal-001-2", title: "BAL-001-2 Real Power Balancing Control Performance", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/bal/bal-001-2.pdf" },
    { id: "bal-002-3", title: "BAL-002-3 Disturbance Control Standard - Contingency Reserve for Recovery from a Balancing Contingency Event", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/bal/bal-002-3.pdf" },
    { id: "com-002-4", title: "COM-002-4 Operating Personnel Communications Protocols", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/com/com-002-4.pdf" },
    { id: "eop-005-3", title: "EOP-005-3 System Restoration from Blackstart Resources", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/eop/eop-005-3.pdf" },
    { id: "eop-008-2", title: "EOP-008-2 Loss of Control Center Functionality", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/eop/eop-008-2.pdf" },
    { id: "eop-011-4", title: "EOP-011-4 Emergency Operations", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/eop/eop-011-4.pdf" },
    { id: "fac-011-4", title: "FAC-011-4 System Operating Limits Methodology for the Operations Horizon", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/fac/fac-011-4.pdf" },
    { id: "iro-008-3", title: "IRO-008-3 Reliability Coordinator Operational Analyses and Real-time Assessments", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/iro/iro-008-3.pdf" },
    { id: "int-006-5", title: "INT-006-5 Evaluation of Interchange Transactions", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/int/int-006-5.pdf" },
    { id: "int-009-3", title: "INT-009-3 Implementation of Interchange", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/int/int-009-3.pdf" },
    { id: "prc-004-6", title: "PRC-004-6 Protection System Misoperation Identification and Correction", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/prc/prc-004-6.pdf" },
    { id: "prc-012-2", title: "PRC-012-2 Remedial Action Schemes", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/prc/prc-012-2.pdf" },
    { id: "prc-027-1", title: "PRC-027-1 Coordination of Protection Systems for Performance During Faults", version: "current reviewed version", url: "https://www.nerc.com/globalassets/standards/reliability-standards/prc/prc-027-1.pdf" }
  ],
  pwa: { edition: "GitHub Pages / iPad offline", cacheVersion: "pwa4", offlineRuntime: true, externalVideoLinksOffline: false },
  limitations: [
    "Original study questions are not NERC examination items.",
    "Mock results are practice benchmarks, not predictions of certification performance.",
    "Phase 2 scenarios and simulations deliberately simplify power-system models so beginners can practice decisions; they are not operating studies.",
    "Test-day mode adds 20 experimental-style items and excludes them from the scored result; the items remain original study questions and do not reproduce the official exam.",
    "Entity procedures, regional rules, tool behavior, ratings, timing requirements, and jurisdictional status require local verification.",
    "No training simulation or study guide replaces current Reliability Standards, approved Operating Plans, or entity-specific procedures.",
    "Accessibility controls and automated QA do not constitute a formal WCAG conformance claim; validate against the organization's supported assistive-technology and device matrix.",
    "Optional analytics are local-only, opt-in, capped, learner-controlled, and never transmitted by this static package.",
    "Answer choices received systematic length-cue normalization. SMEs should review the resulting parallel qualifiers for naturalness while preserving the validated length distribution.",
    "The sitting heuristic is a study-console benchmark, not a prediction of certification performance.",
    "Approved-reference lessons are original operator-focused summaries; they do not reproduce or replace the assigned publications."
  ]
};
