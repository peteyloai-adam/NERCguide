# Comic Rollback Release Notes

**Release:** 3.1.1-no-comics  
**Date:** July 26, 2026

## Reason for the change

Several generated comic pages contained speech bubbles layered over other speech bubbles or text obscured by characters and visual elements. Because those defects reduced readability and could create accessibility and comprehension problems, the comic recap feature has been removed from the study guide.

## Removed

- Ten end-of-module comic sections
- Ten comic PNG assets
- Eight-panel text transcripts
- Full-size comic links
- Comic rendering logic
- Comic-specific CSS
- Comic transcript search indexing
- Comic validation and browser routes
- Comic-specific screenshots and release documentation

## Retained

All Phase 1, Phase 2, and Phase 3 features remain intact, including lessons, questions, glossary entries, interactives, integrated operating events, adaptive practice, credential-specific study plans, mock and test-day modes, progress portability, local-only analytics, and accessibility preferences.

## Progress compatibility

No learner action is required. Existing progress data remains compatible. Completion records for removed comic section IDs may remain in older exports or browser storage, but they are ignored by the current module structure and do not affect scoring or current completion totals.

## Future consideration

A comic feature should only return after each image is manually reviewed at full size and at in-course display size for text collisions, reading order, color contrast, dialogue accuracy, and mobile legibility. A panel-by-panel HTML or SVG approach would provide stronger control than text embedded in a single generated image.
