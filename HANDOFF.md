# Technical Handoff: NERC Study Console v3.2

**Release:** 3.2.0-remediated  
**Date:** July 26, 2026  
**Entry point:** `index.html`

## Architecture

The application remains static HTML, CSS, and JavaScript with browser-local
progress. It has no server or external runtime dependency.

The v3.2 delta is intentionally isolated:

- `js/data.remediation.js`: section expansions, question additions, complete
  distractor feedback, and answer-length normalization
- Five new files under `js/interactives/`
- `js/app.js`: confidence, search, glossary, route titles, timer announcements,
  study heuristic, external-video warnings, SVG/range accessibility enhancement
- `css/console.css`: v3.2 presentation and target-size rules
- `scripts/validate.js`: content and assessment gates
- `scripts/browser_v32_qa.py`: route, browser, accessibility-signal, and mock QA

`data.remediation.js` must load after `data.phase3.js` and before all activity
scripts and `app.js`.

## Assessment invariants

- 232 unique questions
- 58 authored keys in each A–D position
- Correct-choice length ranks: 58 longest, 58 second, 58 third, 58 shortest
- Longest-key rate no higher than 35%; current result 25.0%
- Maximum key advantage over mean distractors no higher than +15; current +12
- Every incorrect option has feedback
- Every blueprint subtopic has at least six questions
- Every `q.std` resolves to `data.standards.js`
- Exact credential subtopic mock sampling remains required

Do not remove contextual qualifiers from options in bulk. Replace them with
substantive, parallel distractor language if SMEs prefer more natural wording,
then rerun every length gate.

## Accessibility behavior

`mountView()` updates the document title, assigns labels to unlabeled visible
SVGs, and adds meaningful `aria-valuetext` to range inputs. The same enhancement
is applied to same-origin `srcdoc` activity frames on load. This is a safety net;
new interactives should still author specific names and value text directly.

## Human review boundaries

Use `SME_REVIEW_PACKET.md` for the identified absolutes and negative stems.
Use `assessment-remediation-audit.csv` to review option-length changes. Formal
screen-reader and production-device validation remains required before a public
conformance claim.

## Release commands

```bash
node scripts/validate.js
node scripts/smoke.js
python3 scripts/browser_v32_qa.py
```
