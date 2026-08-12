# Quality Assurance Report

**Release:** 3.2.0-remediated  
**Date:** July 26, 2026

## Result summary

| Suite | Passed | Failed |
|---|---:|---:|
| Content, assessment, linkage, and release validation | 88 | 0 |
| JavaScript, loading, and packaging smoke tests | 19 | 0 |
| Chromium functional and accessibility-signal tests | 47 | 0 |
| **Total** | **154** | **0** |

## Assessment checks

The validation suite confirmed:

- 232 unique four-option questions
- authored answer positions balanced 58 / 58 / 58 / 58
- correct choice longest in 25.0% of items
- maximum correct-choice advantage of +12 characters over the mean distractor
- correct-choice relative length ranks balanced 58 / 58 / 58 / 58
- 100% distractor-feedback coverage and no item with zero feedback
- minimum inventory of six questions in every blueprint subtopic
- exact scored-subtopic draws for TO, RC, BT, and BI
- 20 disjoint experimental-style questions in test-day mode
- 100% resolution of question standard tags to `data.standards.js`

## Browser coverage

Chromium QA covered:

- full runtime inventory and release version
- route-specific document titles
- section-position indicators
- all five new interactive visuals
- every one of the 57 lesson routes for visible SVG descriptions
- parent-page and embedded-frame range-control value text
- global search coverage of glossary and standards
- glossary filtering, A–Z navigation, headings, mobile target size, and reflow
- practice confidence persistence and selected-state semantics
- external video labeling and contrast
- five-minute and one-minute timer announcements
- exact test-day draws for all four credentials
- study-console sitting heuristic and caveat
- keyboard-operable cold-load and synchronization activities
- uncaught JavaScript and browser-console errors

## Known boundaries

This validation is not a formal accessibility-conformance audit. The following remain necessary before making a public WCAG claim:

- NVDA and JAWS on supported Windows browsers
- VoiceOver on supported Apple devices
- voice-control testing
- production iOS and Android device testing
- organizational zoom/reflow and contrast review
- review by the organization's accessibility function

Technical accuracy, item wording, third-party media approval, and local procedure alignment still require qualified SMEs. See `SME_REVIEW_PACKET.md`.
