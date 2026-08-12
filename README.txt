NERC SYSTEM OPERATOR STUDY CONSOLE — GITHUB PAGES / IPAD PWA EDITION
Version 3.2.0-remediated-pwa1

This edition adds an installable offline web-app layer to the v3.2 remediated study console. For GitHub Pages publishing and iPad installation steps, read GITHUB_PAGES_PWA_SETUP.md.

NERC SYSTEM OPERATOR STUDY CONSOLE
PRE-SME REMEDIATION RELEASE
Version 3.2.0-remediated | July 26, 2026

OVERVIEW
This static browser-based resource supports new bulk-power-system learners who
are preparing for the TO, RC, BT, or BI System Operator Certification exam.
Version 3.2 addresses an independent pre-SME punch list while retaining the
Phase 3 adaptive practice, events, study plans, test-day mode, portability,
and accessibility preferences.

OPENING THE RESOURCE
1. Extract the ZIP package.
2. Open index.html in a current desktop browser.
3. Select the intended credential.
4. Use lessons, interactives, adaptive practice, events, and mock exams.

CURRENT INVENTORY
- 10 modules / 57 lesson sections
- 232 original study questions
- 185 glossary terms
- 35 lesson interactives
- 3 integrated operating events
- Four exact credential blueprints: TO, RC, BT, and BI

KEY v3.2 CHANGES
- Removed the answer-length cue and added permanent release gates
- Completed distractor feedback for every incorrect choice
- Raised every blueprint subtopic to at least six questions
- Added five operator-centered visuals and expanded ten thin sections
- Added confidence ratings and confidence-adjusted adaptive mastery
- Added section-position indicators
- Expanded global search and rebuilt glossary navigation
- Added route-specific document titles and exam timer announcements
- Enforced SVG descriptions and meaningful range-control value text
- Labeled YouTube references external, optional, and uncontrolled
- Added a clearly caveated study-console sitting heuristic

IMPORTANT LIMITATIONS
- Questions are original study items, not NERC examination items.
- Mock and heuristic results do not predict official examination performance.
- Current standards, regional requirements, entity plans, procedures, ratings,
  studies, and tool behavior control actual operations.
- The automated answer-length remediation is statistically validated, but SMEs
  should review the parallel contextual qualifiers for naturalness.
- External video links require internet access and are not controlled content.
- Automated checks are not a formal WCAG conformance claim.

REVIEW FILES
- V3.2_REMEDIATION_REPORT.md
- PUNCH_LIST_DISPOSITION.md
- SME_REVIEW_PACKET.md
- assessment-remediation-audit.csv
- standards-question-coverage.csv
- QA_REPORT.md

VALIDATION
Run from the extracted folder:
  node scripts/validate.js
  node scripts/smoke.js
  python3 scripts/browser_v32_qa.py
