# Phase 2 Release Notes

**Product:** NERC System Operator Study Console  
**Version:** 2.0.0-phase2  
**Release date:** July 25, 2026

## Purpose

Phase 2 moves the study console beyond a primarily conceptual review by adding
operator-centered instruction and decisions in the content areas identified as
underdeveloped during the comprehensive review.

## New lessons

| Module | New section | Main learning contribution |
|---|---|---|
| Foundations | Human performance in the control room | Self-checks, peer checks, placekeeping, procedure use, conservative decision-making |
| Transmission Operations | SCADA, EMS, and data quality | Telemetry, timestamps, quality, topology processing, state estimation, observability, verification |
| Voltage & Reactive Power | Voltage-control equipment and generator limits | Capacitors, reactors, SVC/STATCOM, LTCs, AVR, limiters, reactive reserve |
| Operating Limits | From Facility Ratings to real-time action | Rating inputs, SOL/IROL distinction, RTAs, IROL Tv, executable corrective actions |
| Protection | Protection schemes and event reconstruction | Zones, relay targets, breaker failure, reclosing, RAS, sequence-of-events reasoning |
| Emergency Operations | Operating Plans, EEA, and degraded tools | Capacity deficiency, EEA, load shed, degraded analysis, fallback operations |
| Restoration | Restoration plans and electrical constraints | Blackstart, cranking paths, island balance, cold-load pickup, reactive control, synchronization |
| Communications & Data | Directives, failed channels, and data verification | Three-part communication, repeat-backs, inability to comply, alternate channels, verification |
| Balancing & Frequency | Interchange lifecycle and disturbance recovery | Arranged/confirmed/implemented interchange, ramps, ACE, reserve recovery, accounting |

## New operational labs

1. Bad-data and topology lab
2. Voltage-control dispatch simulator
3. SOL / IROL real-time assessment lab
4. Protection sequence-of-events lab
5. Emergency operations tabletop
6. Communications simulator
7. Interchange lifecycle lab

## Assessment additions

- Added 32 questions across transmission, balancing, communications, emergency,
  restoration, and data-quality topics.
- The Phase 2 block contains 23 application or analysis questions and 9 focused
  recall questions.
- The complete bank now contains 216 questions.
- Authored answer positions remain exactly balanced at 54 each for A, B, C, and D.
- Exact credential subtopic mock sampling and option randomization remain intact.

## Glossary additions

Phase 2 supplied 76 glossary records. Sixty-six are net-new terms and ten replace
shorter existing definitions with stronger operational explanations and links,
resulting in 185 unique terms.

## Content governance

Instruction was reviewed against current official NERC materials represented in
`js/data.release.js`, including relevant BAL, COM, EOP, FAC, INT, IRO, and PRC
standards. Simulations explicitly remain simplified study experiences and do not
replace approved entity procedures, operating studies, or current standards.

## Deferred to Phase 3

- Multi-module branching events
- Adaptive remediation and misconception tracking
- Full administration mode with experimental-style items
- Progress portability
- Formal screen-reader and device-matrix accessibility testing
- Learning analytics
