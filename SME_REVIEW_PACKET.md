# SME Review Packet: Wording and Technical Adjudication

**Release:** 3.2.0-remediated  
**Prepared:** July 26, 2026  

This packet isolates items that use absolute wording or negative-stem construction. No automatic technical ruling was applied. SMEs should decide whether the wording is essential, defensible under the cited source, or should be revised. The choices below show the original authored wording before the v3.2 length-normalization layer.

## Review instructions

For each item, confirm:
1. The keyed choice is technically best under the stated conditions.
2. Words such as **always** and **never** are justified rather than merely making a distractor easy.
3. Any exception, regional qualification, entity-procedure dependency, or time horizon is stated.
4. The explanation and standard tag support the ruling.
5. Negative stems are necessary and visibly emphasize the negative term.

## Items containing “always” or “never”

### q-f-010 · 5a · recall
**Stem:** The N-1 criterion is best described as the principle that the system should:

**Key:** B
**Standard tag:** None

**Choices:**
- A. Never operate with more than one generator online
- B. Withstand the loss of any single element without violating limits **[KEY]**
- C. Always keep exactly one transmission line out of service for maintenance
- D. Reduce load by one increment whenever frequency drops

**Current explanation:** N-1 means the system is operated so that the loss of any single element — a line, transformer, or generator — does not push it outside its limits. It is the baseline test for secure real-time operation.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-f-026 · 2d · recall
**Stem:** A tie breaker shown as 'normally open' (N.O.) means that:

**Key:** B
**Standard tag:** None

**Choices:**
- A. It is broken and must be repaired
- B. In the normal configuration it sits open until an operator needs to close it **[KEY]**
- C. It can never be closed
- D. It is always carrying load

**Current explanation:** 'Normally open' describes the element's normal operating position — open until switching calls for it to be closed. Knowing the normal configuration is what lets an operator recognize when something is out of place.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-m1-006 · 2d · recall
**Stem:** Which best distinguishes a planned outage from a forced outage?

**Key:** A
**Standard tag:** None

**Choices:**
- A. A planned outage is studied and coordinated in advance; a forced outage is the unplanned loss of an element **[KEY]**
- B. A planned outage is always longer
- C. A forced outage is scheduled weeks ahead
- D. There is no operational difference

**Current explanation:** Planned outages are coordinated ahead so the system stays secure while an element is out; forced outages are unplanned losses — the very contingencies an N-1 posture is meant to survive. Coordinating planned outages so they don't stack into a problem is a real duty.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-m1-009 · 2e · application
**Stem:** Compared with an ordinary thermal SOL, why does an IROL demand faster action?

**Key:** D
**Standard tag:** TOP-001-6

**Choices:**
- A. Because it only matters during maintenance
- B. Because it applies only to generators
- C. Because it is never actually enforced
- D. Because its violation could cause wide-area instability, separation, or cascading, so it carries a tight time limit **[KEY]**

**Current explanation:** IROLs are the highest-consequence limits — exceeding one risks cascading across a wide area — so they must be resolved within a defined, short timeframe rather than tolerated.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-m1-010 · 2e · analysis
**Stem:** Among an operator's options to relieve a limit violation, shedding firm load is best characterized as:

**Key:** A
**Standard tag:** None

**Choices:**
- A. A last resort when reconfiguration, redispatch, and transfer reduction cannot restore limits in time **[KEY]**
- B. The first action to try
- C. Never permitted
- D. Equivalent to opening a disconnect under load

**Current explanation:** Operators exhaust less-drastic measures — reconfigure, redispatch, reduce transfer, use controls — before shedding firm load. But when nothing else restores limits in time, shedding load is both permitted and necessary to protect the system.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-m1-011 · 2e · application
**Stem:** Why do operators typically keep flows some margin below a limit rather than right at it?

**Key:** B
**Standard tag:** None

**Choices:**
- A. Because limits are only suggestions
- B. To leave room to survive the next credible contingency without exceeding the limit **[KEY]**
- C. To reduce electricity prices
- D. Because telemetry is always wrong

**Current explanation:** Operating with margin is what keeps the system N-1 secure: if you sit right at a limit, the next loss immediately pushes you past it. Margin buys the room (and time) to respond before a contingency causes a violation.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-em-003 · 3a · application
**Stem:** Coordinating planned outages in advance matters mainly because:

**Key:** D
**Standard tag:** None

**Choices:**
- A. It lowers maintenance costs
- B. Outages never affect reliability
- C. It eliminates the need for reserves
- D. Overlapping outages can stack into an insecure (non-N-1) condition if not studied together **[KEY]**

**Current explanation:** Several planned outages happening together can leave the system unable to survive the next contingency. Studying and coordinating them ahead of time keeps the system secure while work proceeds.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-em-005 · 3b · analysis
**Stem:** Why is extreme cold considered an especially dangerous condition for reliability?

**Key:** B
**Standard tag:** EOP-012-3

**Choices:**
- A. It only reduces load
- B. It can knock out generation and fuel supply at the same time demand spikes — stressing supply and demand together **[KEY]**
- C. It has no effect on transmission
- D. It always improves equipment ratings

**Current explanation:** The most dangerous events hit supply and demand simultaneously. Extreme cold spikes heating load while freezing generation and fuel systems offline — the correlated failure behind major cold-weather events, which is why cold-weather preparedness is now its own standard.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-em-020 · 4c · analysis
**Stem:** When supply cannot meet demand and less-drastic measures are exhausted, deliberately shedding a block of firm load is:

**Key:** A
**Standard tag:** EOP-011-4

**Choices:**
- A. A controlled last resort that is far better than letting the imbalance drive an uncontrolled, cascading collapse **[KEY]**
- B. A sign the operator has failed
- C. Never permitted under any circumstances
- D. The very first step to try

**Current explanation:** Timely, controlled load shedding sacrifices a defined block to protect the Interconnection from an uncontrolled collapse that could black out far more. It's a mark of good operation when it's needed, not a failure.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-em-021 · 4c · application
**Stem:** Which ordering of capacity-emergency actions is most appropriate?

**Key:** B
**Standard tag:** None

**Choices:**
- A. Shed firm load first, then look for reserves
- B. Deploy reserves and imports, appeal for conservation and use interruptible loads, and only then shed firm load **[KEY]**
- C. Only issue public appeals, never shed load
- D. Do them in any order

**Current explanation:** Operators escalate through less-drastic steps first — reserves and imports, public appeals, interruptible loads — reserving firm load shedding for when those cannot close the gap in time.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-em-023 · 4d · application
**Stem:** Which practice best supports readiness for loss of control center functionality?

**Key:** D
**Standard tag:** EOP-008-2

**Choices:**
- A. Assuming the primary center never fails
- B. Relying on a neighbor to operate your system
- C. Storing the backup plan without ever testing it
- D. Maintaining a backup center and periodically drilling the transfer to it **[KEY]**

**Current explanation:** A backup center only helps if the cutover works under pressure, so operators maintain it and rehearse the transfer. An untested plan often fails at the moment it's needed.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-m3-005 · 5b · analysis
**Stem:** The state estimator is failing to solve and telemetry is intermittent. How should you regard the contingency analysis results?

**Key:** A
**Standard tag:** None

**Choices:**
- A. Treat them with suspicion and operate more conservatively, since bad input yields unreliable output **[KEY]**
- B. Trust them fully; the tools always self-correct
- C. Ignore limits entirely
- D. Assume the system is secure

**Current explanation:** Contingency analysis is only as good as the state estimate feeding it. When the estimator won't solve or telemetry is bad, the results are unreliable — recognize the degraded state and hold more margin until the tools recover.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-m7-005 · 6c · analysis
**Stem:** The state estimator repeatedly fails to converge for one area. The most likely cause and response is:

**Key:** D
**Standard tag:** None

**Choices:**
- A. The system is definitely faulted; trip the area
- B. Nothing — estimators never depend on data quality
- C. Frequency is too high; shed load
- D. Bad or missing measurements in that area; investigate the data and operate more conservatively there **[KEY]**

**Current explanation:** A non-converging state estimator usually signals bad or missing measurements. The right response is to investigate the data, treat that area's results with caution, and hold more margin until it's resolved.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-m9-005 · 1d · recall
**Stem:** In the ACE equation, the frequency-bias term ensures that:

**Key:** A
**Standard tag:** None

**Choices:**
- A. Every BA contributes to arresting an Interconnection-wide frequency deviation, not just fixing its own interchange **[KEY]**
- B. Only the deficient BA responds to a frequency drop
- C. Frequency is ignored
- D. Interchange is always zero

**Current explanation:** The bias term makes each BA lean in to help correct a system-wide frequency deviation. It's how the whole Interconnection shares the job of holding 60 Hz rather than leaving it to one area.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-m4-001 · 2a · application
**Stem:** Protection zones are designed to overlap so that:

**Key:** A
**Standard tag:** PRC-027-1

**Choices:**
- A. No point on the system is left unprotected, and a fault always falls within at least one zone **[KEY]**
- B. Faults are never cleared
- C. Relays never need coordination
- D. Breakers can be removed

**Current explanation:** Overlapping zones ensure every point is covered, so a fault always lands inside at least one protection zone. Relays are then coordinated so the closest device clears the fault and removes the smallest piece.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-m4-002 · 2a · recall
**Stem:** Primary and backup protection are provided so that:

**Key:** B
**Standard tag:** None

**Choices:**
- A. Two relays always trip together for every fault
- B. If the primary protection fails to operate, backup protection still clears the fault **[KEY]**
- C. Backup protection replaces breakers
- D. Faults are cleared more slowly on purpose

**Current explanation:** Every protected element has primary protection that acts first and backup that acts if the primary fails, so a single relay or breaker failure doesn't leave a fault on the system.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-b8-b3 · 1g · recall
**Stem:** Which best describes the difference between baseload and peaking generation?

**Key:** D
**Standard tag:** None

**Choices:**
- A. They are the same
- B. Baseload only runs at night
- C. Peaking units never start
- D. Baseload runs steadily at high capacity factor; peaking runs to meet short, high-demand periods **[KEY]**

**Current explanation:** Baseload units (often nuclear or coal) run steadily at high capacity factor; peaking units (often gas combustion turbines) start and stop to serve short, high-demand periods and provide flexibility.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-b9-03 · 2e · application
**Stem:** Which statement best distinguishes a facility rating from a System Operating Limit (SOL)?

**Key:** B
**Standard tag:** FAC-011-4

**Choices:**
- A. They are identical terms
- B. A facility rating is one element's capability; an SOL is the value that keeps the system within reliable performance and may be set by a rating or by other limits **[KEY]**
- C. An SOL applies only to generators; a facility rating only to lines
- D. A facility rating changes every hour; an SOL never changes

**Current explanation:** A facility rating is the demonstrated capability of one piece of equipment (thermal, for example). An SOL is the system-level limit for a set of conditions and may be governed by a facility rating, or by a voltage or stability limit, so the most binding consideration sets the SOL.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-b9-08 · 2b · application
**Stem:** Voltage is sagging in a load pocket at the far end of a long transmission path. Why is local reactive support usually more effective than importing reactive power from a distant source?

**Key:** C
**Standard tag:** VAR-001-5

**Choices:**
- A. Distant sources always have surplus reactive capability
- B. Reactive power travels farther than real power with no losses
- C. Reactive power does not travel well over distance (the line's reactance consumes it), so support close to the low-voltage area is far more effective **[KEY]**
- D. Voltage problems are unrelated to reactive power

**Current explanation:** Reactive power is effectively local: transporting MVAR over a reactive line incurs large reactive losses and voltage drop, so MVAR injected far away arrives greatly diminished. Correcting a voltage sag calls for reactive sources near the affected buses (capacitors, generators, condensers), which is why voltage is managed locally.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-m9-038 · 1h · analysis
**Stem:** Compared with conventional synchronous generation, inverter-based resources such as solar PV and most wind:

**Key:** C
**Standard tag:** None

**Choices:**
- A. Cannot be connected to the transmission system
- B. Always provide more inertia than steam units
- C. Do not inherently provide rotating inertia, so frequency can change faster after a disturbance **[KEY]**
- D. Produce only reactive power

**Current explanation:** Inverter-based resources connect through power electronics and lack the large spinning mass of synchronous machines, so they do not inherently contribute inertia. As their share grows, system inertia falls and frequency can move faster for a given imbalance — a growing concern addressed with fast frequency response and other measures.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-p2-007 · 2b · analysis
**Stem:** Why can aggressive LTC action be harmful during transmission voltage weakness?

**Key:** C
**Standard tag:** VAR-001-5

**Choices:**
- A. It always trips the transformer differential relay
- B. It directly lowers frequency bias
- C. It can restore distribution voltage while increasing load and reactive burden on the weak transmission source **[KEY]**
- D. It removes all capacitor banks

**Current explanation:** LTC action can make the local load draw more power or MVAR, deepening the burden upstream even while customer voltage initially improves.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-p2-008 · 2e · recall
**Stem:** Which statement best distinguishes a Facility Rating from an SOL?

**Key:** D
**Standard tag:** FAC-011-4

**Choices:**
- A. They are always identical
- B. An SOL applies only to generation
- C. A Facility Rating is calculated by the state estimator every minute
- D. A Facility Rating is equipment capability information; an SOL is a system operating limit for specified conditions **[KEY]**

**Current explanation:** Ratings describe equipment capability; SOLs are system limits established using applicable methodologies, configurations, and conditions.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

### q-p2-022 · 5e · recall
**Stem:** What makes an IROL different from other SOLs?

**Key:** B
**Standard tag:** IRO-009-2

**Choices:**
- A. It is always a generator nameplate rating
- B. Its exceedance could lead to instability, uncontrolled separation, or cascading **[KEY]**
- C. It applies only to distribution voltage
- D. It has no corrective-action time

**Current explanation:** IROLs are the subset of SOLs associated with severe wide-area reliability consequences.

**SME ruling:** ☐ Keep ☐ Revise ☐ Retire  
**Notes:**

## Negative-stem items

### q-b8-m1 · 6a · recall
**Stem:** Event and disturbance reporting requirements specify not just what to report but also:

**Key:** D
**Standard tag:** EOP-004-4

**Choices:**
- A. The color of the report
- B. Which vendor to use
- C. The market price
- D. The timeframe within which reports must be made **[KEY]**

**Current explanation:** Reporting requirements define both the reportable events and the timeframes for reporting them, so the reliability community gets timely awareness and can respond and analyze.

**SME ruling:** ☐ Keep ☐ Rewrite positively ☐ Retire  
**Notes:**

### q-m9-029 · 1c · analysis
**Stem:** AGC keeps raising its regulating units but ACE stays negative and will not recover. The most likely cause is:

**Key:** B
**Standard tag:** BAL-005-1

**Choices:**
- A. Frequency is exactly 60.00 Hz
- B. The regulating units have run out of headroom (reached their upper limits) **[KEY]**
- C. The interchange schedule is confirmed
- D. Voltage is slightly high

**Current explanation:** If AGC is calling for more generation but ACE will not recover, the regulating units are likely at their upper limits with no headroom left, so the operator must commit or redispatch additional capacity. Frequency being on schedule or voltage being high would not stall ACE recovery this way.

**SME ruling:** ☐ Keep ☐ Rewrite positively ☐ Retire  
**Notes:**

### q-p2-024 · 6c · analysis
**Stem:** A voltage point is marked good, but it has not changed for 20 minutes while neighboring values move. What is the best conclusion?

**Key:** D
**Standard tag:** TOP-010-1(i)

**Choices:**
- A. The quality flag proves it is current
- B. The bus voltage is perfectly regulated
- C. The state estimator should be disabled
- D. It may be stale or frozen and should be verified using timestamps and independent indications **[KEY]**

**Current explanation:** A quality label is one clue. Trend continuity, timestamp, and independent evidence are needed to verify freshness.

**SME ruling:** ☐ Keep ☐ Rewrite positively ☐ Retire  
**Notes:**
