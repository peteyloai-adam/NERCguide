/* ============================================================================
   QUESTION DATA — window.NERC.questions

   Original practice items for NERC System Operator exam preparation.
   Phase 1 release controls:
   - Every item maps to an official domain and subtopic in data.blueprint.js.
   - Authored answer positions are balanced across A-D.
   - app.js independently randomizes displayed option order while preserving
     answer keys and distractor feedback.
   - Items are not actual NERC examination questions.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.questions = [
  {
    "id": "q-f-001",
    "module": "foundations",
    "section": "f-grid-anatomy",
    "domain": "transmission",
    "topic": "2c",
    "difficulty": "recall",
    "stem": "Which set of facilities is generally covered by NERC's Reliability Standards as part of the Bulk Electric System?",
    "options": [
      "High-voltage transmission facilities and large generators, generally 100 kV and above",
      "Residential distribution wiring inside a neighborhood",
      "The service drop between a utility pole and a house meter",
      "Only the generating plants, but not the lines connecting them"
    ],
    "answer": 0,
    "explain": "The BES is the high-voltage backbone — transmission and large generation generally at 100 kV and above. Local distribution serving end customers is generally excluded, which is why the standards focus operators on the bulk system rather than neighborhood delivery.",
    "optFeedback": {
      "1": "Distribution wiring is generally outside the BES — this is the classic exclusion.",
      "2": "A residential service drop is distribution, not part of the bulk system.",
      "3": "The BES includes both large generation and the transmission network tying it together, not generation alone."
    }
  },
  {
    "id": "q-f-002",
    "module": "foundations",
    "section": "f-grid-anatomy",
    "domain": "transmission",
    "topic": "2f",
    "difficulty": "recall",
    "stem": "On an operator's console, a one-line diagram primarily represents the system by:",
    "options": [
      "Drawing all three phases of every circuit in full detail",
      "Representing buses, breakers, lines, and transformers as single lines",
      "Showing geographic road maps with substations marked",
      "Listing every customer meter connected to each feeder"
    ],
    "answer": 1,
    "explain": "A one-line (single-line) diagram simplifies the three-phase system into single lines so operators can read connectivity and switching status at a glance. It is the operator's working map of the electrical system.",
    "optFeedback": {
      "0": "Showing all three phases would clutter the view — the whole point of a one-line is to collapse them.",
      "3": "Individual customer meters are a distribution/billing concern, not what a transmission one-line shows."
    }
  },
  {
    "id": "q-f-003",
    "module": "foundations",
    "section": "f-ac-basics",
    "domain": "balancing",
    "topic": "1e",
    "std": "BAL-001-2",
    "difficulty": "recall",
    "stem": "System frequency is drifting slightly below 60 Hz across the Interconnection. This most directly indicates that, at this instant:",
    "options": [
      "Reactive power exceeds real power on the system",
      "Generation exceeds load",
      "Load exceeds generation",
      "Voltage is above its normal range"
    ],
    "answer": 2,
    "explain": "Frequency is the live indicator of the generation-load balance. When load exceeds generation, the system slows and frequency falls below 60 Hz; the reverse pushes it above 60. It is a real-power balance signal, not a reactive or voltage indicator.",
    "optFeedback": {
      "0": "Frequency reflects the real-power (MW) balance, not the reactive/real ratio.",
      "1": "Generation exceeding load would push frequency above 60 Hz, not below.",
      "3": "Voltage and frequency are separate quantities; frequency does not tell you voltage is high."
    }
  },
  {
    "id": "q-f-004",
    "module": "foundations",
    "section": "f-ac-basics",
    "domain": "transmission",
    "topic": "2c",
    "difficulty": "application",
    "stem": "Which quantity best represents the total electrical loading a transformer 'sees,' and therefore what its rating is based on?",
    "options": [
      "Real power (MW) only",
      "Reactive power (MVAR) only",
      "Power factor expressed as a percentage",
      "Apparent power (MVA), the vector sum of real and reactive power"
    ],
    "answer": 3,
    "explain": "Equipment carries current driven by both real and reactive power. Apparent power (MVA) is the vector combination S² = P² + Q², so it captures the full loading the transformer must be rated for — not real or reactive power alone.",
    "optFeedback": {
      "0": "Real power alone understates loading when significant reactive flow is present.",
      "1": "Reactive power alone also understates the total — both components heat the equipment.",
      "2": "Power factor is a ratio, not a loading value; it describes the mix, not the magnitude."
    }
  },
  {
    "id": "q-f-005",
    "module": "foundations",
    "section": "f-ac-basics",
    "domain": "transmission",
    "topic": "2b",
    "difficulty": "application",
    "stem": "An operator is told a bus has a 'low power factor.' The best interpretation is that, relative to the real power delivered:",
    "options": [
      "An unusually large share of the current is tied up in reactive flow",
      "Frequency at that bus has dropped below nominal",
      "The bus is carrying almost no current at all",
      "The transmission line is thermally overloaded"
    ],
    "answer": 0,
    "explain": "Power factor is the ratio of real power to apparent power. A low power factor means a larger portion of the apparent power — and the current — is reactive rather than doing useful work, which stresses equipment and can pull voltage down.",
    "optFeedback": {
      "1": "Power factor is unrelated to local frequency; frequency is a system-wide balance quantity.",
      "2": "A low power factor often means more current for the same real power, not less.",
      "3": "Low power factor may contribute to loading, but by itself it doesn't establish a thermal overload."
    }
  },
  {
    "id": "q-f-006",
    "module": "foundations",
    "section": "f-ac-basics",
    "domain": "transmission",
    "topic": "2b",
    "std": "VAR-001-5",
    "difficulty": "analysis",
    "stem": "Voltage on part of your system is sagging below the acceptable range during heavy load. Which resource is most directly suited to correcting the condition?",
    "options": [
      "Increasing real-power (MW) dispatch from distant generation",
      "Adding reactive support locally, such as switching in capacitor banks",
      "Reducing system frequency slightly to compensate",
      "Opening a transmission line to reduce loading"
    ],
    "answer": 1,
    "explain": "Voltage is controlled primarily with reactive power, and reactive support is most effective close to the problem. Switching in capacitors (or raising generator VARs nearby) directly counters a low-voltage condition. Real-power dispatch and frequency are the wrong levers, and opening a line during heavy load can make matters worse.",
    "optFeedback": {
      "0": "Distant MW does little for local voltage; reactive support must generally be local.",
      "2": "Frequency is not a voltage-control tool, and deliberately lowering it is not appropriate.",
      "3": "Removing a line under heavy load can worsen voltage and violate limits."
    }
  },
  {
    "id": "q-f-007",
    "module": "foundations",
    "section": "f-reliability-landscape",
    "domain": "comms-data",
    "topic": "6b",
    "std": "IRO-001-4",
    "difficulty": "recall",
    "stem": "Which entity has the widest-area view and the highest operating authority in real time?",
    "options": [
      "Generator Operator (GOP)",
      "Transmission Operator (TOP)",
      "Reliability Coordinator (RC)",
      "Balancing Authority (BA)"
    ],
    "answer": 2,
    "explain": "The Reliability Coordinator holds the widest-area situational awareness and the highest real-time authority. When a condition threatens multiple systems, the RC can direct BAs and TOPs to act.",
    "optFeedback": {
      "0": "The GOP operates units under direction; it does not hold wide-area authority.",
      "1": "The TOP operates its own transmission facilities but takes wide-area direction from the RC.",
      "3": "The BA balances generation and load in its area but does not hold the RC's wide-area authority."
    }
  },
  {
    "id": "q-f-008",
    "module": "foundations",
    "section": "f-reliability-landscape",
    "domain": "comms-data",
    "topic": "6b",
    "std": "IRO-001-4",
    "difficulty": "application",
    "stem": "A Transmission Operator receives a directive from its Reliability Coordinator to relieve a wide-area reliability concern. The TOP believes its own area is currently secure. The best action is to:",
    "options": [
      "Disregard the directive because the local area appears secure",
      "Forward the directive to the Generator Operator and take no other action",
      "Wait until the next shift to evaluate the request",
      "Carry out the directive, since the RC has wide-area authority and visibility the TOP may lack"
    ],
    "answer": 3,
    "explain": "The RC has the wide-area view and the authority to direct action to protect reliability across systems. A locally secure appearance does not override that — the RC may see a developing problem the TOP cannot. Operators act on RC directives promptly unless doing so would violate safety or equipment limits.",
    "optFeedback": {
      "0": "Local security does not authorize ignoring a valid RC directive addressing a wider concern.",
      "1": "Simply passing it along without acting fails the TOP's own responsibility to respond.",
      "2": "Reliability directives are real-time; deferring to a later shift is not acceptable."
    }
  },
  {
    "id": "q-f-009",
    "module": "foundations",
    "section": "f-reliability-landscape",
    "domain": "contingency",
    "topic": "5e",
    "std": "FAC-011-4",
    "difficulty": "application",
    "stem": "How does an IROL differ from an ordinary SOL?",
    "options": [
      "Exceeding an IROL risks instability, uncontrolled separation, or cascading outages over a wide area",
      "An IROL can be exceeded indefinitely, an SOL cannot be exceeded at all",
      "An IROL applies only to generators, an SOL only to transmission lines",
      "An SOL is set by FERC while an IROL is set by the local utility"
    ],
    "answer": 0,
    "explain": "An IROL is a special, higher-consequence SOL: violating it could trigger instability, uncontrolled separation, or cascading outages across a wide area. That is why IROLs carry the tightest time limits and the highest operating priority.",
    "optFeedback": {
      "1": "The opposite is closer to true: IROLs carry the tightest allowable timeframes, not indefinite ones.",
      "2": "Both apply across the system as flow, voltage, or stability limits — not split by equipment type.",
      "3": "Neither is 'set by FERC' in this way; both come from the system's engineering and operating studies."
    }
  },
  {
    "id": "q-f-010",
    "module": "foundations",
    "section": "f-reliability-landscape",
    "domain": "contingency",
    "topic": "5a",
    "difficulty": "recall",
    "stem": "The N-1 criterion is best described as the principle that the system should:",
    "options": [
      "Never operate with more than one generator online",
      "Withstand the loss of any single element without violating limits",
      "Always keep exactly one transmission line out of service for maintenance",
      "Reduce load by one increment whenever frequency drops"
    ],
    "answer": 1,
    "explain": "N-1 means the system is operated so that the loss of any single element — a line, transformer, or generator — does not push it outside its limits. It is the baseline test for secure real-time operation.",
    "optFeedback": {
      "0": "N-1 has nothing to do with limiting how many generators are online.",
      "2": "It is not about keeping a line out of service; it's about surviving the unexpected loss of any one element.",
      "3": "That describes an emergency load response, not the N-1 planning/operating criterion."
    }
  },
  {
    "id": "q-f-011",
    "module": "foundations",
    "section": "f-reliability-landscape",
    "domain": "comms-data",
    "topic": "6a",
    "difficulty": "recall",
    "stem": "Which statement best captures the relationship between NERC and FERC in the United States?",
    "options": [
      "NERC is a division of FERC that writes voluntary guidelines",
      "FERC operates the grid while NERC markets electricity",
      "NERC develops and enforces the Reliability Standards, which FERC approved to give them the force of law",
      "FERC certifies system operators while NERC sets electricity prices"
    ],
    "answer": 2,
    "explain": "NERC is the Electric Reliability Organization that writes and enforces the mandatory Reliability Standards. Those standards became legally enforceable in the U.S. because FERC approved them. Neither organization operates the grid or sells power.",
    "optFeedback": {
      "0": "NERC is not a division of FERC, and the standards are mandatory, not voluntary.",
      "1": "Neither agency operates the grid or markets electricity — that's the RTOs/ISOs and market participants.",
      "3": "NERC, not FERC, certifies system operators."
    }
  },
  {
    "id": "q-f-012",
    "module": "foundations",
    "section": "f-reliability-landscape",
    "domain": "comms-data",
    "topic": "6b",
    "difficulty": "application",
    "stem": "An RTO/ISO such as SPP or PJM most commonly serves which combination of functional roles for its footprint?",
    "options": [
      "Generator Operator and distribution utility",
      "FERC's regional enforcement office",
      "Only a wholesale billing agent with no operating role",
      "Reliability Coordinator and Balancing Authority"
    ],
    "answer": 3,
    "explain": "RTOs/ISOs typically act as the Reliability Coordinator and Balancing Authority (and often more) for their regions, giving them wide-area visibility and balancing responsibility across many member systems.",
    "optFeedback": {
      "0": "RTOs are independent operators, not the GOP or the local distribution utility.",
      "1": "An RTO is an independent grid/market operator, not a FERC enforcement office.",
      "2": "They have a central real-time operating role, not merely billing."
    }
  },
  {
    "id": "q-f-013",
    "module": "foundations",
    "section": "f-grid-anatomy",
    "domain": "transmission",
    "topic": "2c",
    "difficulty": "recall",
    "stem": "Why are individual utility systems interconnected into a larger network?",
    "options": [
      "To share reserves, ride through equipment losses, and move power to where it's needed",
      "To let each utility operate in complete isolation from its neighbors",
      "Purely to reduce the number of one-line diagrams operators must read",
      "To eliminate the need for any reliability standards"
    ],
    "answer": 0,
    "explain": "Interconnection lets systems support one another — sharing reserves, surviving the loss of equipment, and importing or exporting power. That mutual support is the source of wide-area reliability, and also why coordination and standards matter.",
    "optFeedback": {
      "1": "Interconnection is the opposite of isolation; it deliberately links systems together.",
      "2": "It isn't about reducing paperwork; it's about reliability and economics.",
      "3": "Interconnection increases the need for shared standards, since one system's problem can spread."
    }
  },
  {
    "id": "q-f-014",
    "module": "foundations",
    "section": "f-ac-basics",
    "domain": "transmission",
    "topic": "2b",
    "std": "VAR-001-5",
    "difficulty": "analysis",
    "stem": "A new operator argues that reactive power 'doesn't matter' because it does no real work. The most accurate response is:",
    "options": [
      "Correct — reactive power can be ignored during normal operations",
      "Reactive power sustains voltage; too little in the right places can lead to voltage collapse over a wide area",
      "Reactive power only matters for billing, not reliability",
      "Reactive power is the same thing as frequency and is managed identically"
    ],
    "answer": 1,
    "explain": "Reactive power does no net work, but it holds up voltage. Insufficient reactive support in the right locations can drive a voltage collapse that spreads across a region — often faster than a thermal problem. Managing reactive resources is central to a TO's job.",
    "optFeedback": {
      "0": "Ignoring reactive power invites low-voltage conditions and, in the worst case, voltage collapse.",
      "2": "Its significance is a reliability one — voltage support — not merely a billing matter.",
      "3": "Reactive power and frequency are distinct quantities managed with different tools."
    }
  },
  {
    "id": "q-f-015",
    "module": "foundations",
    "section": "f-units",
    "domain": "transmission",
    "topic": "2c",
    "difficulty": "recall",
    "stem": "A generating unit is rated 800 MW. Expressed in gigawatts, that is:",
    "options": [
      "0.008 GW",
      "8 GW",
      "0.8 GW",
      "80 GW"
    ],
    "answer": 2,
    "explain": "The prefixes step by factors of 1,000: 1 GW = 1,000 MW. So 800 MW = 0.8 GW. Mixing up k (thousand) and M (million) is a classic and dangerous slip in operations.",
    "optFeedback": {
      "0": "That confuses MW with kW; 800 MW is 0.8 GW, not 0.008.",
      "1": "8 GW would be 8,000 MW — ten times too large."
    }
  },
  {
    "id": "q-f-016",
    "module": "foundations",
    "section": "f-units",
    "domain": "transmission",
    "topic": "2c",
    "difficulty": "application",
    "stem": "A transmission line's thermal limit is most fundamentally a limit on:",
    "options": [
      "Real power (MW) only",
      "Power factor",
      "Frequency",
      "Current (amperes), often expressed as an MVA rating"
    ],
    "answer": 3,
    "explain": "Conductors heat from total current, so the thermal limit is fundamentally an ampere (ampacity) limit, commonly expressed as an MVA rating at a given voltage. MW alone understates loading whenever reactive flow is present.",
    "optFeedback": {
      "0": "MW ignores the reactive component of current, so it can hide a thermal overload.",
      "1": "Power factor describes the mix of a load, not the conductor's heating limit."
    }
  },
  {
    "id": "q-f-017",
    "module": "foundations",
    "section": "f-units",
    "domain": "transmission",
    "topic": "2c",
    "difficulty": "recall",
    "stem": "A bus voltage reads 1.02 per-unit (p.u.). This means the voltage is:",
    "options": [
      "About 2% above its nominal value",
      "2% below its nominal value",
      "1.02 volts",
      "Missing telemetry"
    ],
    "answer": 0,
    "explain": "Per-unit expresses a value against a chosen base, so 1.0 p.u. is nominal and 1.02 p.u. is about 2% above nominal. Per-unit lets operators compare different voltage levels on one scale; near 1.0 is normal.",
    "optFeedback": {
      "1": "Above 1.0 means above nominal, not below.",
      "2": "Per-unit is a ratio, not an absolute voltage in volts."
    }
  },
  {
    "id": "q-f-018",
    "module": "foundations",
    "section": "f-power-in-practice",
    "domain": "transmission",
    "topic": "2b",
    "std": "VAR-001-5",
    "difficulty": "application",
    "stem": "Voltage on a heavily loaded portion of your system is sagging below its limit. The most effective corrective resource is to:",
    "options": [
      "Increase real-power dispatch from a distant generator",
      "Switch in a nearby capacitor bank (or raise nearby generator VARs)",
      "Lower system frequency slightly",
      "Open a parallel line to reduce flow"
    ],
    "answer": 1,
    "explain": "Voltage is controlled with reactive power, and reactive support works best close to the problem. Switching in a local capacitor bank (or raising nearby generator VARs) directly counters a low-voltage condition; distant MW and frequency are the wrong levers.",
    "optFeedback": {
      "0": "Distant real power does little for local voltage; reactive support must be local.",
      "3": "Opening a line under heavy load can worsen both voltage and thermal loading."
    }
  },
  {
    "id": "q-f-019",
    "module": "foundations",
    "section": "f-power-in-practice",
    "domain": "transmission",
    "topic": "2b",
    "std": "VAR-001-5",
    "difficulty": "application",
    "stem": "During light load, voltage on a long, lightly loaded line drifts above its limit. An appropriate action is to:",
    "options": [
      "Increase load forecasting accuracy",
      "Switch in a capacitor bank",
      "Switch in a shunt reactor (or lower nearby generator VARs)",
      "Raise generation to add MW"
    ],
    "answer": 2,
    "explain": "High voltage from a lightly loaded line means excess reactive power; the fix is to absorb reactive, by switching in a shunt reactor or lowering generator VARs nearby. A capacitor would supply more reactive and push voltage even higher.",
    "optFeedback": {
      "1": "A capacitor supplies reactive and raises voltage — the wrong direction here.",
      "3": "Adding MW doesn't correct a high-voltage (reactive) condition."
    }
  },
  {
    "id": "q-f-020",
    "module": "foundations",
    "section": "f-power-in-practice",
    "domain": "transmission",
    "topic": "2c",
    "difficulty": "analysis",
    "stem": "Two lines each carry 300 MW. Line A also carries 200 MVAR; Line B carries almost no reactive. Which is closer to its thermal limit, and why?",
    "options": [
      "Line B, because reactive power does no work",
      "Cannot be determined from MW and MVAR",
      "They are identical, since MW is equal",
      "Line A, because its total MVA loading is higher"
    ],
    "answer": 3,
    "explain": "Heating depends on total current, i.e. apparent power (MVA). Line A's MVA is the vector sum of 300 MW and 200 MVAR (~360 MVA) versus ~300 MVA for Line B, so Line A carries more current and sits closer to its thermal limit despite equal MW.",
    "optFeedback": {
      "0": "Reactive power still produces current that heats the conductor.",
      "2": "Equal MW does not mean equal MVA when reactive flows differ."
    }
  },
  {
    "id": "q-f-021",
    "module": "foundations",
    "section": "f-power-in-practice",
    "domain": "transmission",
    "topic": "2b",
    "difficulty": "recall",
    "stem": "Why must reactive support generally be supplied close to a low-voltage problem?",
    "options": [
      "Because reactive power does not travel far across the system",
      "Because capacitors only work at night",
      "Because real power cannot be scheduled",
      "Because frequency is a local quantity"
    ],
    "answer": 0,
    "explain": "Reactive power doesn't transport well over distance — it's consumed by the reactance of the lines it would travel through. So voltage support has to be applied near where it's needed, unlike real power which moves across the network.",
    "optFeedback": {
      "2": "Real power is scheduled routinely; that's unrelated.",
      "3": "Frequency is a system-wide quantity, not local — and it isn't the point here."
    }
  },
  {
    "id": "q-f-022",
    "module": "foundations",
    "section": "f-power-in-practice",
    "domain": "transmission",
    "topic": "2c",
    "difficulty": "application",
    "stem": "A line is well below its MW capability but operators are still concerned about overloading it. The best explanation is that:",
    "options": [
      "MW is the only thing that matters for loading",
      "Reactive flow can push the line's MVA loading to its thermal limit even at modest MW",
      "The line must be de-energized",
      "Frequency is too high"
    ],
    "answer": 1,
    "explain": "Thermal loading is judged against the MVA (or amp) rating, not MW. Significant reactive flow raises MVA for the same MW, so a line can be thermally loaded while its MW figure still looks comfortable.",
    "optFeedback": {
      "0": "MW alone misses the reactive component of the current.",
      "2": "Nothing here calls for de-energizing the line."
    }
  },
  {
    "id": "q-f-023",
    "module": "foundations",
    "section": "f-reading-oneline",
    "domain": "transmission",
    "topic": "2f",
    "difficulty": "recall",
    "stem": "On a one-line diagram, a bus is best described as:",
    "options": [
      "A device that interrupts fault current",
      "A transformer between two voltage levels",
      "A common connection point where lines, transformers, and other elements tie together",
      "A protective relay"
    ],
    "answer": 2,
    "explain": "A bus is the common electrical tie point in a substation, drawn as a heavy bar, where multiple elements connect. Breakers and switches then connect elements to and from the bus.",
    "optFeedback": {
      "0": "That describes a circuit breaker, not a bus.",
      "1": "That describes a transformer."
    }
  },
  {
    "id": "q-f-024",
    "module": "foundations",
    "section": "f-reading-oneline",
    "domain": "transmission",
    "topic": "2f",
    "difficulty": "recall",
    "stem": "Which device is designed to interrupt fault current?",
    "options": [
      "A disconnect switch",
      "A capacitor bank",
      "A bus",
      "A circuit breaker"
    ],
    "answer": 3,
    "explain": "A circuit breaker can interrupt fault current, which is why it's the primary switching point for energizing/de-energizing and for protection. A disconnect switch provides visible isolation but is not built to break load or fault current.",
    "optFeedback": {
      "0": "A disconnect is not designed to interrupt load or fault current.",
      "2": "A bus is a connection point, not a switching device."
    }
  },
  {
    "id": "q-f-025",
    "module": "foundations",
    "section": "f-reading-oneline",
    "domain": "transmission",
    "topic": "2d",
    "difficulty": "application",
    "stem": "To isolate a line for maintenance, the correct general sequence is to:",
    "options": [
      "Open the breaker first, then open the disconnect switch",
      "Open the disconnect switch first, then the breaker",
      "Open only the disconnect switch",
      "Open the breaker and leave the disconnect closed"
    ],
    "answer": 0,
    "explain": "Interrupt current with the breaker first, then open the disconnect to create a visible isolation point. Operating a disconnect under load can draw a dangerous arc, so the breaker always opens first.",
    "optFeedback": {
      "1": "Opening a disconnect under load first risks a dangerous arc.",
      "3": "Leaving the disconnect closed provides no isolation for maintenance."
    }
  },
  {
    "id": "q-f-026",
    "module": "foundations",
    "section": "f-reading-oneline",
    "domain": "transmission",
    "topic": "2d",
    "difficulty": "recall",
    "stem": "A tie breaker shown as 'normally open' (N.O.) means that:",
    "options": [
      "It is broken and must be repaired",
      "In the normal configuration it sits open until an operator needs to close it",
      "It can never be closed",
      "It is always carrying load"
    ],
    "answer": 1,
    "explain": "'Normally open' describes the element's normal operating position — open until switching calls for it to be closed. Knowing the normal configuration is what lets an operator recognize when something is out of place.",
    "optFeedback": {
      "0": "'Normally open' is a defined state, not a fault.",
      "3": "A normally-open device is not carrying load in the normal state."
    }
  },
  {
    "id": "q-f-027",
    "module": "foundations",
    "section": "f-reading-oneline",
    "domain": "transmission",
    "topic": "2d",
    "difficulty": "application",
    "stem": "Switching to move load from one path onto another to relieve a problem is called:",
    "options": [
      "Frequency response",
      "Load forecasting",
      "Reconfiguration (switching)",
      "Interchange scheduling"
    ],
    "answer": 2,
    "explain": "Changing the network's connectivity by opening and closing breakers and switches to redirect flow is reconfiguration, a core real-time tool for relieving overloads or isolating problems.",
    "optFeedback": {
      "0": "Frequency response is about generation-load balance, not switching.",
      "1": "Load forecasting predicts demand; it isn't a switching action."
    }
  },
  {
    "id": "q-f-028",
    "module": "foundations",
    "section": "f-limits",
    "domain": "contingency",
    "topic": "5a",
    "difficulty": "application",
    "stem": "A source feeds a load over two identical parallel lines, each rated 400 MW, carrying 250 MW apiece. Is this arrangement N-1 secure?",
    "options": [
      "Cannot be determined",
      "Yes — each line is below its rating right now",
      "Yes — because there are two lines",
      "No — losing one line puts 500 MW on a 400 MW survivor"
    ],
    "answer": 3,
    "explain": "N-1 asks what happens after the loss of any one element. Losing one line shifts the full 500 MW onto the survivor, exceeding its 400 MW rating. Being within limits pre-contingency isn't enough — the post-contingency state must also be within limits.",
    "optFeedback": {
      "1": "Pre-contingency compliance doesn't establish N-1 security.",
      "2": "Two lines only help if the survivor can carry the load alone."
    }
  },
  {
    "id": "q-f-029",
    "module": "foundations",
    "section": "f-limits",
    "domain": "contingency",
    "topic": "5c",
    "difficulty": "analysis",
    "stem": "Real-time contingency analysis flags that losing Line 2 would overload Line 1, though both are within limits now. The best operator response is to:",
    "options": [
      "Act now to reduce the transfer or reconfigure so the system is secure for the loss of Line 2",
      "Do nothing, since nothing is overloaded yet",
      "Wait for Line 2 to actually trip, then respond",
      "Trip Line 1 pre-emptively"
    ],
    "answer": 0,
    "explain": "A flagged post-contingency violation means the system is not N-1 secure. Operators act before the contingency — reducing transfer, redispatching, or reconfiguring — so that if the element is lost, survivors stay within limits. Waiting for the trip defeats the purpose.",
    "optFeedback": {
      "1": "N-1 security is about the post-contingency state, not just the present one.",
      "2": "Reacting only after the trip may leave no time to prevent cascading."
    }
  },
  {
    "id": "q-f-030",
    "module": "foundations",
    "section": "f-limits",
    "domain": "contingency",
    "topic": "5e",
    "std": "FAC-011-4",
    "difficulty": "application",
    "stem": "Compared with an ordinary SOL, an IROL is distinguished mainly by:",
    "options": [
      "Applying only to generators",
      "The severity of consequences — its violation could cause instability, uncontrolled separation, or cascading over a wide area",
      "Being permanently unenforceable",
      "Being set by the local distribution utility"
    ],
    "answer": 1,
    "explain": "An IROL is a higher-consequence SOL: exceeding it risks instability, uncontrolled separation, or cascading outages across a wide area. That severity is why IROLs carry the tightest allowable timeframes.",
    "optFeedback": {
      "0": "Both apply as flow, voltage, or stability limits, not by equipment type.",
      "3": "These limits come from engineering studies, not the distribution utility."
    }
  },
  {
    "id": "q-f-031",
    "module": "foundations",
    "section": "f-limits",
    "domain": "contingency",
    "topic": "5d",
    "std": "FAC-011-4",
    "difficulty": "recall",
    "stem": "A thermal System Operating Limit ultimately derives from:",
    "options": [
      "The number of operators on shift",
      "The current market price of energy",
      "The facility's rating (ampacity / MVA capability)",
      "The nominal system frequency"
    ],
    "answer": 2,
    "explain": "Thermal SOLs come from equipment ratings — the ampacity or MVA a conductor or device can carry before overheating. Voltage and stability SOLs come from other studies, but the thermal ones trace back to ratings.",
    "optFeedback": {
      "1": "Price is an economic quantity, unrelated to a thermal limit.",
      "3": "Frequency is a balance quantity, not the basis of a thermal rating."
    }
  },
  {
    "id": "q-f-032",
    "module": "foundations",
    "section": "f-limits",
    "domain": "contingency",
    "topic": "5b",
    "difficulty": "application",
    "stem": "The state estimator in an EMS primarily provides:",
    "options": [
      "A weather forecast for the operating area",
      "The billing determinants for interchange",
      "The automatic control of generator governors",
      "A best real-time estimate of system conditions that feeds contingency analysis"
    ],
    "answer": 3,
    "explain": "The state estimator blends telemetry into a coherent, best estimate of the current system state, which the contingency analysis relies on. If it fails, the operator loses the ability to see post-contingency problems and must operate more conservatively.",
    "optFeedback": {
      "1": "Billing determinants are an accounting function, not the state estimator's job.",
      "2": "Governor action is local generator control, not an EMS estimation function."
    }
  },
  {
    "id": "q-f-033",
    "module": "foundations",
    "section": "f-limits",
    "domain": "transmission",
    "topic": "2a",
    "std": "PRC-012-2",
    "difficulty": "recall",
    "stem": "A Remedial Action Scheme (RAS) is best described as:",
    "options": [
      "An automatic scheme that takes pre-planned action (trip generation, shed load, reconfigure) for a defined contingency",
      "A manual checklist operators read during storms",
      "A type of transmission line",
      "A market bidding strategy"
    ],
    "answer": 0,
    "explain": "A RAS (formerly Special Protection System) automatically takes a pre-engineered action for a specific contingency — tripping generation, shedding load, or reconfiguring — to keep the system within limits and prevent cascading.",
    "optFeedback": {
      "1": "A RAS is automatic, not a manual checklist.",
      "3": "A RAS is a reliability scheme, unrelated to market bidding."
    }
  },
  {
    "id": "q-f-034",
    "module": "foundations",
    "section": "f-limits",
    "domain": "contingency",
    "topic": "5c",
    "difficulty": "analysis",
    "stem": "Which sequence best reflects sound real-time reliability practice?",
    "options": [
      "Wait for a violation, then study whether it was N-1 secure",
      "Continuously assess contingencies, and when a post-contingency violation is identified, act to restore N-1 security",
      "Operate to the pre-contingency thermal limit and ignore contingencies",
      "Shed load first, then analyze"
    ],
    "answer": 1,
    "explain": "Sound practice is proactive: run continuous contingency analysis and, when it flags a post-contingency limit violation, take action (redispatch, reconfigure, reduce transfer) to restore N-1 security before the contingency occurs. Load shedding is a later, more drastic step.",
    "optFeedback": {
      "2": "Ignoring contingencies abandons N-1 and invites cascading.",
      "3": "Shedding load first is premature when less drastic actions restore security."
    }
  },
  {
    "id": "q-f-035",
    "module": "foundations",
    "section": "f-limits",
    "domain": "contingency",
    "topic": "5d",
    "difficulty": "recall",
    "stem": "Total Transfer Capability (TTC) refers to:",
    "options": [
      "The load forecast for tomorrow",
      "The total number of transmission lines in a region",
      "The most power that can be reliably moved across an interface under given conditions",
      "The reactive rating of a capacitor bank"
    ],
    "answer": 2,
    "explain": "TTC is the maximum power that can be reliably transferred across an interface or path for a given set of conditions. Operators keep actual transfers within limits derived from it, alongside SOLs and IROLs.",
    "optFeedback": {
      "0": "A load forecast is a demand prediction, not a transfer capability.",
      "1": "TTC is a capability in MW, not a count of lines."
    }
  },
  {
    "id": "q-m1-001",
    "module": "transmission-ops",
    "section": "m1-protection",
    "domain": "transmission",
    "topic": "2a",
    "difficulty": "recall",
    "stem": "The primary purpose of protective relaying on the transmission system is to:",
    "options": [
      "Regulate voltage on long lines",
      "Forecast load for the next day",
      "Schedule interchange between areas",
      "Detect abnormal conditions such as faults and trip breakers to isolate the affected element quickly"
    ],
    "answer": 3,
    "explain": "Relays detect faults and other abnormal conditions and operate breakers within cycles to isolate the faulted element, protecting equipment and preventing a local problem from spreading. They act far faster than any operator could.",
    "optFeedback": {
      "0": "Voltage regulation is done with reactive devices and tap changers, not protective relays.",
      "1": "Load forecasting is a planning function, unrelated to protection."
    }
  },
  {
    "id": "q-m1-002",
    "module": "transmission-ops",
    "section": "m1-protection",
    "domain": "transmission",
    "topic": "2a",
    "std": "PRC-005-6",
    "difficulty": "application",
    "stem": "Automatic reclosing is used on many transmission lines because:",
    "options": [
      "Many line faults are temporary, so re-closing can restore the line quickly — though reclosing into a permanent fault or across an open angle can be damaging",
      "Most line faults are permanent",
      "It eliminates the need for breakers",
      "It increases the line's thermal rating"
    ],
    "answer": 0,
    "explain": "Because many faults (e.g., a momentary flashover) clear themselves, reclosing restores service quickly. But reclosing into a still-faulted line, or out of synchronism, can damage equipment, so schemes are carefully engineered.",
    "optFeedback": {
      "1": "The logic behind reclosing is that many faults are temporary, not permanent.",
      "3": "Reclosing restores a tripped line; it does not change thermal ratings."
    }
  },
  {
    "id": "q-m1-003",
    "module": "transmission-ops",
    "section": "m1-protection",
    "domain": "transmission",
    "topic": "2a",
    "std": "PRC-023-6",
    "difficulty": "analysis",
    "stem": "Relay loadability requirements exist mainly to ensure that:",
    "options": [
      "Relays trip as soon as a line approaches its rating",
      "Line relays do not trip on heavy but safe loading, so operating within ratings doesn't cause a needless misoperation",
      "Operators can override any relay",
      "Reactive power is minimized"
    ],
    "answer": 1,
    "explain": "Loadability standards keep relays from tripping on high-but-acceptable load. That protects the operator's ability to load a line up to its rating without a protection misoperation removing it — a direct link between how the system is loaded and how protection behaves.",
    "optFeedback": {
      "0": "Tripping on approach to a rating is exactly what loadability rules prevent.",
      "2": "Loadability is about relay settings, not operator overrides."
    }
  },
  {
    "id": "q-m1-004",
    "module": "transmission-ops",
    "section": "m1-protection",
    "domain": "transmission",
    "topic": "2a",
    "std": "PRC-012-2",
    "difficulty": "recall",
    "stem": "A Remedial Action Scheme (RAS) differs from ordinary line protection in that it:",
    "options": [
      "Only operates during maintenance",
      "Is operated manually by the RC",
      "Takes automatic, pre-planned system-level action (trip generation, shed load, reconfigure) for a defined contingency",
      "Replaces the need for circuit breakers"
    ],
    "answer": 2,
    "explain": "Ordinary protection isolates a faulted element; a RAS takes a broader, pre-engineered automatic action for a specific contingency to keep the whole system within limits and prevent cascading.",
    "optFeedback": {
      "1": "A RAS acts automatically; it isn't manually operated in real time.",
      "3": "A RAS complements breakers and protection; it doesn't replace them."
    }
  },
  {
    "id": "q-m1-005",
    "module": "transmission-ops",
    "section": "m1-switching",
    "domain": "transmission",
    "topic": "2d",
    "std": "TOP-001-6",
    "difficulty": "application",
    "stem": "Before field crews work on a de-energized line, a clearance (protective hold) is issued primarily to:",
    "options": [
      "Speed up the switching",
      "Avoid notifying the Reliability Coordinator",
      "Increase the line rating during the outage",
      "Guarantee the equipment stays isolated and cannot be re-energized until the clearance is released"
    ],
    "answer": 3,
    "explain": "A clearance formally ties up the isolated equipment so it cannot be re-energized while people are working, and it can only be released through a defined process. It's a core safety discipline around switching.",
    "optFeedback": {
      "0": "A clearance adds procedural rigor; speed is not its purpose.",
      "1": "Coordination and notification still apply; clearances don't bypass them."
    }
  },
  {
    "id": "q-m1-006",
    "module": "transmission-ops",
    "section": "m1-switching",
    "domain": "transmission",
    "topic": "2d",
    "difficulty": "recall",
    "stem": "Which best distinguishes a planned outage from a forced outage?",
    "options": [
      "A planned outage is studied and coordinated in advance; a forced outage is the unplanned loss of an element",
      "A planned outage is always longer",
      "A forced outage is scheduled weeks ahead",
      "There is no operational difference"
    ],
    "answer": 0,
    "explain": "Planned outages are coordinated ahead so the system stays secure while an element is out; forced outages are unplanned losses — the very contingencies an N-1 posture is meant to survive. Coordinating planned outages so they don't stack into a problem is a real duty.",
    "optFeedback": {
      "2": "A forced outage is unplanned by definition, not scheduled.",
      "3": "The difference — planned vs. unplanned — drives how each is managed."
    }
  },
  {
    "id": "q-m1-007",
    "module": "transmission-ops",
    "section": "m1-limits-realtime",
    "domain": "transmission",
    "topic": "2e",
    "std": "FAC-008-5",
    "difficulty": "application",
    "stem": "A transmission element has separate normal and emergency ratings. The emergency rating generally allows:",
    "options": [
      "Unlimited loading indefinitely",
      "Higher loading for a limited time",
      "Lower loading than normal",
      "Loading only during maintenance"
    ],
    "answer": 1,
    "explain": "Equipment can be operated above its normal rating up to an emergency rating for a limited duration. Knowing which rating applies, and for how long, is central to real-time decisions as loading climbs after a contingency.",
    "optFeedback": {
      "0": "Emergency ratings are time-limited, not indefinite.",
      "2": "The emergency rating is higher than normal, not lower."
    }
  },
  {
    "id": "q-m1-008",
    "module": "transmission-ops",
    "section": "m1-limits-realtime",
    "domain": "transmission",
    "topic": "2e",
    "std": "TOP-001-6",
    "difficulty": "analysis",
    "stem": "Real-time analysis shows a transmission line will exceed its rating after the loss of a nearby line. The most appropriate first actions include:",
    "options": [
      "Wait until the line actually overloads",
      "Immediately shed firm load",
      "Reconfigure, redispatch, or reduce the transfer now so the post-contingency loading stays within limits",
      "Raise the line's rating in the model"
    ],
    "answer": 2,
    "explain": "This is a post-contingency (N-1) violation. Operators act before the contingency, using the least-drastic effective measures first — reconfiguring, redispatching, or reducing transfer. Load shedding is a last resort, and you can't just re-rate equipment to make a violation disappear.",
    "optFeedback": {
      "0": "Waiting for the overload abandons N-1 security.",
      "1": "Shedding firm load first is premature when milder actions restore security.",
      "3": "Changing the model's rating doesn't change the equipment's real capability."
    }
  },
  {
    "id": "q-m1-009",
    "module": "transmission-ops",
    "section": "m1-limits-realtime",
    "domain": "transmission",
    "topic": "2e",
    "std": "TOP-001-6",
    "difficulty": "application",
    "stem": "Compared with an ordinary thermal SOL, why does an IROL demand faster action?",
    "options": [
      "Because it only matters during maintenance",
      "Because it applies only to generators",
      "Because it is never actually enforced",
      "Because its violation could cause wide-area instability, separation, or cascading, so it carries a tight time limit"
    ],
    "answer": 3,
    "explain": "IROLs are the highest-consequence limits — exceeding one risks cascading across a wide area — so they must be resolved within a defined, short timeframe rather than tolerated.",
    "optFeedback": {
      "1": "IROLs are system limits, not generator-only.",
      "2": "IROLs are very much enforced and time-critical."
    }
  },
  {
    "id": "q-m1-010",
    "module": "transmission-ops",
    "section": "m1-limits-realtime",
    "domain": "transmission",
    "topic": "2e",
    "difficulty": "analysis",
    "stem": "Among an operator's options to relieve a limit violation, shedding firm load is best characterized as:",
    "options": [
      "A last resort when reconfiguration, redispatch, and transfer reduction cannot restore limits in time",
      "The first action to try",
      "Never permitted",
      "Equivalent to opening a disconnect under load"
    ],
    "answer": 0,
    "explain": "Operators exhaust less-drastic measures — reconfigure, redispatch, reduce transfer, use controls — before shedding firm load. But when nothing else restores limits in time, shedding load is both permitted and necessary to protect the system.",
    "optFeedback": {
      "1": "Load shedding is a last resort, not a first move.",
      "2": "It is permitted, and sometimes required, as a final measure."
    }
  },
  {
    "id": "q-m1-011",
    "module": "transmission-ops",
    "section": "m1-limits-realtime",
    "domain": "transmission",
    "topic": "2e",
    "difficulty": "application",
    "stem": "Why do operators typically keep flows some margin below a limit rather than right at it?",
    "options": [
      "Because limits are only suggestions",
      "To leave room to survive the next credible contingency without exceeding the limit",
      "To reduce electricity prices",
      "Because telemetry is always wrong"
    ],
    "answer": 1,
    "explain": "Operating with margin is what keeps the system N-1 secure: if you sit right at a limit, the next loss immediately pushes you past it. Margin buys the room (and time) to respond before a contingency causes a violation.",
    "optFeedback": {
      "0": "Limits are firm reliability boundaries, not suggestions.",
      "2": "Margin is a reliability practice, not a pricing tool."
    }
  },
  {
    "id": "q-m1-012",
    "module": "transmission-ops",
    "section": "m1-equipment",
    "domain": "transmission",
    "topic": "2f",
    "difficulty": "recall",
    "stem": "A load tap changer (LTC) on a transformer is used to:",
    "options": [
      "Interrupt fault current",
      "Measure line temperature",
      "Regulate voltage by changing the transformer's turns ratio under load",
      "Schedule interchange"
    ],
    "answer": 2,
    "explain": "An LTC adjusts the transformer's taps under load to raise or lower the regulated voltage, holding a target on one side. It's a common, direct voltage-control tool.",
    "optFeedback": {
      "0": "Interrupting fault current is a breaker's job, not an LTC's.",
      "1": "An LTC controls voltage; it doesn't measure temperature."
    }
  },
  {
    "id": "q-m1-013",
    "module": "transmission-ops",
    "section": "m1-powerflow",
    "domain": "transmission",
    "topic": "2f",
    "difficulty": "application",
    "stem": "A phase-shifting transformer is primarily used to:",
    "options": [
      "Change voltage magnitude only",
      "Provide reactive power like a capacitor",
      "Interrupt fault current",
      "Control the amount of real-power flow on a path by shifting the phase angle across it"
    ],
    "answer": 3,
    "explain": "By shifting the phase angle across itself, a phase-shifting transformer pushes real power onto or off a path — one of the few tools that directly controls how MW divides among parallel paths, which impedance otherwise dictates.",
    "optFeedback": {
      "0": "Ordinary tap changers adjust voltage magnitude; a phase shifter targets angle and real-power flow.",
      "1": "Reactive supply is a capacitor's role, not a phase shifter's main purpose."
    }
  },
  {
    "id": "q-m1-014",
    "module": "transmission-ops",
    "section": "m1-equipment",
    "domain": "transmission",
    "topic": "2f",
    "difficulty": "analysis",
    "stem": "Adding series compensation (series capacitors) to a long transmission line tends to:",
    "options": [
      "Lower the line's effective impedance so it carries more flow and improves stability",
      "Increase the line's impedance so it carries less flow",
      "Disconnect the line during faults",
      "Convert real power to reactive power"
    ],
    "answer": 0,
    "explain": "Series capacitors cancel part of a line's inductive reactance, lowering its effective impedance. Since flow divides inversely to impedance, the compensated line carries more, and stability on long lines improves.",
    "optFeedback": {
      "1": "Series compensation lowers impedance, not raises it.",
      "3": "It changes impedance; it doesn't convert real power into reactive power."
    }
  },
  {
    "id": "q-em-001",
    "module": "emergency-ops",
    "section": "m5-prep-planning",
    "domain": "emergency-prep",
    "topic": "3a",
    "difficulty": "recall",
    "stem": "The main purpose of same-day and next-day operational planning is to:",
    "options": [
      "Set electricity prices for tomorrow",
      "Identify constraints and needed actions before real time so the system stays reliable",
      "Replace the need for real-time monitoring",
      "Schedule employee shifts"
    ],
    "answer": 1,
    "explain": "Operational planning studies the coming hours and next day to spot constraints, confirm reserves, and prepare actions in advance. Most emergencies are survived because of preparation done before they occur, not improvisation during.",
    "optFeedback": {
      "0": "Pricing is a market function, separate from reliability planning.",
      "2": "Planning complements real-time monitoring; it doesn't replace it."
    }
  },
  {
    "id": "q-em-002",
    "module": "emergency-ops",
    "section": "m5-prep-planning",
    "domain": "emergency-prep",
    "topic": "3a",
    "difficulty": "application",
    "stem": "Which practice best reflects good emergency preparedness?",
    "options": [
      "Deciding what to do only once an emergency is underway",
      "Assuming credible contingencies won't happen",
      "Establishing operating plans and clear triggers for action ahead of time",
      "Waiting for the RC to tell you everything"
    ],
    "answer": 2,
    "explain": "Preparedness means having a plan and pre-defined triggers so that when conditions cross a threshold, the response is already known. Improvising after a problem is unfolding costs precious time.",
    "optFeedback": {
      "0": "Improvising mid-emergency is exactly what preparedness avoids.",
      "1": "Planning assumes credible contingencies will occur and prepares for them."
    }
  },
  {
    "id": "q-em-003",
    "module": "emergency-ops",
    "section": "m5-prep-planning",
    "domain": "emergency-prep",
    "topic": "3a",
    "difficulty": "application",
    "stem": "Coordinating planned outages in advance matters mainly because:",
    "options": [
      "It lowers maintenance costs",
      "Outages never affect reliability",
      "It eliminates the need for reserves",
      "Overlapping outages can stack into an insecure (non-N-1) condition if not studied together"
    ],
    "answer": 3,
    "explain": "Several planned outages happening together can leave the system unable to survive the next contingency. Studying and coordinating them ahead of time keeps the system secure while work proceeds.",
    "optFeedback": {
      "1": "Outages remove elements and directly affect reliability margins.",
      "2": "Reserves are still required regardless of outage coordination."
    }
  },
  {
    "id": "q-em-004",
    "module": "emergency-ops",
    "section": "m5-prep-planning",
    "domain": "emergency-prep",
    "topic": "3a",
    "difficulty": "recall",
    "stem": "Confirming adequate contingency reserve during planning ensures that:",
    "options": [
      "The system can recover its balance after the loss of a resource",
      "Electricity is cheaper",
      "No generators ever trip",
      "Telemetry is more accurate"
    ],
    "answer": 0,
    "explain": "Contingency reserve is the capacity held ready to replace a lost resource and restore balance. Confirming it in planning means the system can absorb a credible loss without an uncontrolled shortfall.",
    "optFeedback": {
      "1": "Reserve is a reliability provision, not a pricing lever.",
      "2": "Reserve doesn't prevent trips; it lets you recover from them."
    }
  },
  {
    "id": "q-em-005",
    "module": "emergency-ops",
    "section": "m5-weather-gmd",
    "domain": "emergency-prep",
    "topic": "3b",
    "std": "EOP-012-3",
    "difficulty": "analysis",
    "stem": "Why is extreme cold considered an especially dangerous condition for reliability?",
    "options": [
      "It only reduces load",
      "It can knock out generation and fuel supply at the same time demand spikes — stressing supply and demand together",
      "It has no effect on transmission",
      "It always improves equipment ratings"
    ],
    "answer": 1,
    "explain": "The most dangerous events hit supply and demand simultaneously. Extreme cold spikes heating load while freezing generation and fuel systems offline — the correlated failure behind major cold-weather events, which is why cold-weather preparedness is now its own standard.",
    "optFeedback": {
      "0": "Cold raises heating load; it doesn't simply reduce demand.",
      "3": "Cold stresses equipment; it doesn't improve ratings in a way that helps here."
    }
  },
  {
    "id": "q-em-006",
    "module": "emergency-ops",
    "section": "m5-weather-gmd",
    "domain": "emergency-prep",
    "topic": "3b",
    "std": "EOP-010-1",
    "difficulty": "recall",
    "stem": "A geomagnetic disturbance (GMD) primarily threatens the grid by:",
    "options": [
      "Raising system frequency",
      "Improving voltage stability",
      "Inducing quasi-DC currents that heat transformers and distort reactive behavior",
      "Increasing line ratings"
    ],
    "answer": 2,
    "explain": "Solar activity during a GMD induces quasi-DC (geomagnetically induced) currents in the network. These heat transformers and distort their reactive characteristics, which is why operators follow GMD procedures when severe space weather is forecast.",
    "optFeedback": {
      "0": "GMD does not raise frequency; its effect is on transformers and reactive behavior.",
      "1": "GMD degrades, rather than improves, voltage stability."
    }
  },
  {
    "id": "q-em-007",
    "module": "emergency-ops",
    "section": "m5-weather-gmd",
    "domain": "emergency-prep",
    "topic": "3b",
    "std": "EOP-012-3",
    "difficulty": "application",
    "stem": "A key element of cold-weather preparedness is:",
    "options": [
      "Disabling load forecasting",
      "Waiting until units trip to react",
      "Reducing reserves before a cold snap",
      "Winterizing generating resources and readying cold-weather operating plans in advance"
    ],
    "answer": 3,
    "explain": "Cold-weather preparedness means getting generation winterized and operating plans ready before the event, so units stay online and operators have a playbook when demand spikes.",
    "optFeedback": {
      "1": "Reacting only after units trip is the failure mode preparedness prevents.",
      "2": "You want more margin ahead of a cold snap, not less."
    }
  },
  {
    "id": "q-em-008",
    "module": "emergency-ops",
    "section": "m5-weather-gmd",
    "domain": "emergency-prep",
    "topic": "3b",
    "std": "EOP-010-1",
    "difficulty": "application",
    "stem": "When a severe GMD is forecast, an appropriate operating action is to:",
    "options": [
      "Increase reactive margin and reduce loading on vulnerable elements, watching for unusual reactive/voltage readings",
      "Reduce reactive margin to save capacitors",
      "Ignore it unless a transformer fails",
      "Raise all line ratings"
    ],
    "answer": 0,
    "explain": "GMD procedures generally call for building reactive margin, easing loading on susceptible transformers/paths, and monitoring for abnormal reactive and voltage behavior — acting before damage occurs rather than after.",
    "optFeedback": {
      "1": "You want more reactive margin during a GMD, not less.",
      "2": "Waiting for a transformer failure defeats the purpose of GMD procedures."
    }
  },
  {
    "id": "q-em-009",
    "module": "emergency-ops",
    "section": "m5-capacity",
    "domain": "emergency-prep",
    "topic": "3c",
    "difficulty": "recall",
    "stem": "An 'anticipated capacity deficiency' refers to:",
    "options": [
      "A transformer overload",
      "A shortfall of available supply that is forecast before it occurs",
      "A relay misoperation",
      "A scheduled maintenance outage"
    ],
    "answer": 1,
    "explain": "An anticipated capacity deficiency is a foreseen inability of available supply to cover demand — seen in the day-ahead or same-day picture — which lets operators begin escalating actions early.",
    "optFeedback": {
      "0": "That's a thermal issue, not a capacity forecast.",
      "3": "A maintenance outage is planned work, not a capacity deficiency by itself."
    }
  },
  {
    "id": "q-em-010",
    "module": "emergency-ops",
    "section": "m5-capacity",
    "domain": "emergency-prep",
    "topic": "3c",
    "std": "EOP-011-4",
    "difficulty": "recall",
    "stem": "Energy emergencies are formally managed through:",
    "options": [
      "The interchange scheduling process",
      "The vegetation management program",
      "The Energy Emergency Alert (EEA) process, which escalates by level as severity grows",
      "Automatic reclosing"
    ],
    "answer": 2,
    "explain": "The EEA process provides graded levels that signal an escalating inability to meet demand, coordinating actions with neighbors and the RC up to and including load shedding.",
    "optFeedback": {
      "0": "Interchange scheduling is a normal-operations process, not the emergency mechanism.",
      "1": "Vegetation management addresses line clearances, not energy shortfalls."
    }
  },
  {
    "id": "q-em-011",
    "module": "restoration",
    "section": "m6-restoration",
    "domain": "emergency-response",
    "topic": "4a",
    "std": "EOP-005-3",
    "difficulty": "recall",
    "stem": "A blackstart resource is a generating unit that:",
    "options": [
      "Can only run at night",
      "Requires station power from the grid to start",
      "Is the largest unit on the system",
      "Can start without support from the grid and then help energize a path to start other units"
    ],
    "answer": 3,
    "explain": "A blackstart resource self-starts without grid support and provides the seed for restoration — energizing a cranking path to deliver startup power to units that can't start on their own.",
    "optFeedback": {
      "1": "Needing grid station power to start is exactly what a blackstart unit does NOT require.",
      "2": "Blackstart capability is about self-starting, not size."
    }
  },
  {
    "id": "q-em-012",
    "module": "restoration",
    "section": "m6-restoration",
    "domain": "emergency-response",
    "topic": "4a",
    "std": "EOP-005-3",
    "difficulty": "application",
    "stem": "The purpose of a cranking path during restoration is to:",
    "options": [
      "Energize a route from a blackstart unit to deliver startup power to a larger generator",
      "Shed load automatically",
      "Interrupt fault current",
      "Schedule interchange"
    ],
    "answer": 0,
    "explain": "The cranking path is the transmission energized from a blackstart resource to bring station power to larger units that need it to start. It's how restoration expands beyond the first self-starting unit.",
    "optFeedback": {
      "1": "Load shedding is a separate action, not the cranking path's purpose.",
      "2": "Interrupting fault current is a breaker's role."
    }
  },
  {
    "id": "q-em-013",
    "module": "restoration",
    "section": "m6-islanding",
    "domain": "emergency-response",
    "topic": "4a",
    "difficulty": "analysis",
    "stem": "Two energized islands may be synchronized (tied together) only when:",
    "options": [
      "One island has more generation than the other",
      "Their voltage, frequency, and phase angle are matched across the open point",
      "The operator is in a hurry",
      "Both are at emergency ratings"
    ],
    "answer": 1,
    "explain": "Closing across an open breaker requires voltage, frequency, and phase angle to match. Closing out of synchronism electrically slams the machines together, which can damage generators and trip units — undoing restoration progress.",
    "optFeedback": {
      "0": "A generation imbalance is a reason NOT to close, not a green light.",
      "2": "Rushing a synchronization is how equipment gets damaged."
    }
  },
  {
    "id": "q-em-014",
    "module": "restoration",
    "section": "m6-cold-load",
    "domain": "emergency-response",
    "topic": "4a",
    "difficulty": "application",
    "stem": "During restoration, load is picked up in measured blocks rather than all at once mainly because:",
    "options": [
      "It looks better on reports",
      "Breakers can only close slowly",
      "Adding too much load at once (worsened by cold load pickup) can outstrip available generation and pull frequency down",
      "Load shedding requires it"
    ],
    "answer": 2,
    "explain": "Available generation is limited early in a restoration, and cold load pickup can draw more than normal. Adding load gradually keeps generation and load matched and frequency stable between steps.",
    "optFeedback": {
      "0": "The reason is physical stability, not reporting.",
      "1": "Breaker speed isn't the constraint; generation-load balance is."
    }
  },
  {
    "id": "q-em-015",
    "module": "restoration",
    "section": "m6-restoration",
    "domain": "emergency-response",
    "topic": "4a",
    "std": "EOP-006-3",
    "difficulty": "application",
    "stem": "Why must restoration be coordinated with the Reliability Coordinator and neighbors?",
    "options": [
      "To assign blame for the outage",
      "To set energy prices",
      "Because restoration is optional",
      "So independent restoration steps don't conflict — for example, two areas energizing toward each other out of synchronism"
    ],
    "answer": 3,
    "explain": "Restoration spans systems, so uncoordinated steps can collide — areas energizing toward one another, or closing across a large angle. The RC coordinates the wider restoration while each TOP restores its own area.",
    "optFeedback": {
      "0": "Coordination is about safe sequencing, not blame.",
      "2": "Restoration is mandatory and plan-driven, not optional."
    }
  },
  {
    "id": "q-em-016",
    "module": "emergency-ops",
    "section": "m5-disturbances",
    "domain": "emergency-response",
    "topic": "4b",
    "std": "BAL-002-3",
    "difficulty": "analysis",
    "stem": "Immediately after a large generator trips, the sequence that restores frequency is best described as:",
    "options": [
      "Governor (primary) response arrests the decline, then the BA restores frequency and ACE using contingency reserve",
      "Load forecasting, then interchange scheduling",
      "Automatic reclosing, then vegetation management",
      "Nothing happens until the next day"
    ],
    "answer": 0,
    "explain": "Governors arrest the frequency drop within seconds (primary frequency response); then the Balancing Authority deploys contingency reserve to restore frequency and its ACE, as governed by the Disturbance Control Standard.",
    "optFeedback": {
      "1": "Those are normal-operations planning functions, not the disturbance-recovery sequence.",
      "2": "Reclosing and vegetation management are unrelated to frequency recovery."
    }
  },
  {
    "id": "q-em-017",
    "module": "emergency-ops",
    "section": "m5-disturbances",
    "domain": "emergency-response",
    "topic": "4b",
    "std": "PRC-006-5",
    "difficulty": "recall",
    "stem": "Automatic underfrequency load shedding (UFLS) is best described as:",
    "options": [
      "An operator-typed command during every disturbance",
      "An automatic last-ditch scheme that sheds blocks of load at preset low-frequency thresholds to arrest a falling frequency",
      "A tool for raising voltage",
      "A market settlement process"
    ],
    "answer": 1,
    "explain": "UFLS is automatic: at preset frequency thresholds it sheds blocks of load to arrest a decline and prevent total collapse. It's a backstop that operates without operator action when frequency falls far enough.",
    "optFeedback": {
      "0": "UFLS acts automatically, faster than an operator could type a command.",
      "2": "UFLS addresses frequency, not voltage."
    }
  },
  {
    "id": "q-em-018",
    "module": "emergency-ops",
    "section": "m5-disturbances",
    "domain": "emergency-response",
    "topic": "4b",
    "std": "PRC-010-2",
    "difficulty": "application",
    "stem": "A developing voltage collapse is arrested primarily by:",
    "options": [
      "Scheduling more interchange",
      "Raising system frequency",
      "Adding reactive support quickly and, if needed, automatic undervoltage load shedding (UVLS)",
      "Opening additional lines"
    ],
    "answer": 2,
    "explain": "Voltage collapse is a reactive problem: the response is fast reactive support and, as a backstop, UVLS that sheds load at preset low-voltage thresholds. Recognizing decaying voltage early is a core operator skill.",
    "optFeedback": {
      "1": "Frequency is a separate quantity; raising it doesn't fix voltage.",
      "3": "Opening lines during a voltage problem often makes it worse."
    }
  },
  {
    "id": "q-em-019",
    "module": "emergency-ops",
    "section": "m5-disturbances",
    "domain": "emergency-response",
    "topic": "4b",
    "difficulty": "application",
    "stem": "Once automatic schemes have stabilized a disturbance, the operator's next priority is to:",
    "options": [
      "Do nothing further",
      "Disable the state estimator",
      "Immediately shed more load",
      "Rebuild margin — restore reserves, return frequency and voltage to normal, and reassess N-1 security for the next contingency"
    ],
    "answer": 3,
    "explain": "Automatic schemes buy time; the operator then stabilizes and rebuilds: restore reserves, bring frequency and voltage back to normal, and re-establish N-1 security so the system can survive the next event.",
    "optFeedback": {
      "0": "Leaving the system without rebuilt margin invites the next event to cascade.",
      "2": "More load shedding isn't warranted once the system is stabilizing."
    }
  },
  {
    "id": "q-em-020",
    "module": "emergency-ops",
    "section": "m5-capacity",
    "domain": "emergency-response",
    "topic": "4c",
    "std": "EOP-011-4",
    "difficulty": "analysis",
    "stem": "When supply cannot meet demand and less-drastic measures are exhausted, deliberately shedding a block of firm load is:",
    "options": [
      "A controlled last resort that is far better than letting the imbalance drive an uncontrolled, cascading collapse",
      "A sign the operator has failed",
      "Never permitted under any circumstances",
      "The very first step to try"
    ],
    "answer": 0,
    "explain": "Timely, controlled load shedding sacrifices a defined block to protect the Interconnection from an uncontrolled collapse that could black out far more. It's a mark of good operation when it's needed, not a failure.",
    "optFeedback": {
      "2": "Firm load shedding is permitted and sometimes required as a final measure.",
      "3": "It's a last resort, after reserves, appeals, and interruptible loads."
    }
  },
  {
    "id": "q-em-021",
    "module": "emergency-ops",
    "section": "m5-capacity",
    "domain": "emergency-response",
    "topic": "4c",
    "difficulty": "application",
    "stem": "Which ordering of capacity-emergency actions is most appropriate?",
    "options": [
      "Shed firm load first, then look for reserves",
      "Deploy reserves and imports, appeal for conservation and use interruptible loads, and only then shed firm load",
      "Only issue public appeals, never shed load",
      "Do them in any order"
    ],
    "answer": 1,
    "explain": "Operators escalate through less-drastic steps first — reserves and imports, public appeals, interruptible loads — reserving firm load shedding for when those cannot close the gap in time.",
    "optFeedback": {
      "0": "Shedding firm load first skips the milder, preferable measures.",
      "2": "Appeals alone may not be enough; firm shedding must remain available."
    }
  },
  {
    "id": "q-em-022",
    "module": "emergency-ops",
    "section": "m5-degraded",
    "domain": "emergency-response",
    "topic": "4d",
    "std": "EOP-008-2",
    "difficulty": "recall",
    "stem": "If the primary control center is lost, the expected response is to:",
    "options": [
      "Stop operating until it is repaired",
      "Hand the system to the generators",
      "Transfer operations to a backup control center that is maintained and regularly exercised",
      "Ignore the loss if the weather is good"
    ],
    "answer": 2,
    "explain": "Operators must be able to keep functioning if they lose their control center, which means having a backup facility that is maintained and drilled so the cutover actually works when needed.",
    "optFeedback": {
      "0": "Operations can't simply stop; reliability must be maintained from a backup.",
      "1": "Generators can't assume system-operating responsibility."
    }
  },
  {
    "id": "q-em-023",
    "module": "emergency-ops",
    "section": "m5-degraded",
    "domain": "emergency-response",
    "topic": "4d",
    "std": "EOP-008-2",
    "difficulty": "application",
    "stem": "Which practice best supports readiness for loss of control center functionality?",
    "options": [
      "Assuming the primary center never fails",
      "Relying on a neighbor to operate your system",
      "Storing the backup plan without ever testing it",
      "Maintaining a backup center and periodically drilling the transfer to it"
    ],
    "answer": 3,
    "explain": "A backup center only helps if the cutover works under pressure, so operators maintain it and rehearse the transfer. An untested plan often fails at the moment it's needed.",
    "optFeedback": {
      "0": "Planning assumes failures can happen and prepares for them.",
      "2": "An untested backup plan is unreliable exactly when it matters."
    }
  },
  {
    "id": "q-em-024",
    "module": "emergency-ops",
    "section": "m5-degraded",
    "domain": "emergency-response",
    "topic": "4e",
    "difficulty": "application",
    "stem": "The state estimator and contingency analysis fail, leaving you without post-contingency visibility. The best response is to:",
    "options": [
      "Recognize the degraded state, notify as required, use backup data, and operate more conservatively with wider margins",
      "Continue operating exactly as before",
      "Push flows closer to limits to be efficient",
      "Shut down the system"
    ],
    "answer": 0,
    "explain": "Losing analysis tools means you can no longer see what a contingency would do. The disciplined response is to acknowledge the loss, notify, lean on backups and neighbors, and hold extra margin until the tools return.",
    "optFeedback": {
      "1": "Operating as if nothing changed ignores the loss of awareness.",
      "2": "Pushing toward limits blind is exactly the wrong move."
    }
  },
  {
    "id": "q-em-025",
    "module": "emergency-ops",
    "section": "m5-degraded",
    "domain": "emergency-response",
    "topic": "4e",
    "difficulty": "recall",
    "stem": "A block of telemetry is lost from a portion of your system. This most directly means:",
    "options": [
      "The area is definitely faulted",
      "Your view of that area is degraded, so your situational awareness is reduced",
      "Frequency has changed",
      "The market has closed"
    ],
    "answer": 1,
    "explain": "Telemetry is how you see the field. Losing it degrades your picture of that area, and the state estimator may not solve well there. You compensate with backup information and more conservative operation.",
    "optFeedback": {
      "0": "Lost telemetry means lost visibility, not a confirmed fault.",
      "2": "Lost data doesn't itself change frequency."
    }
  },
  {
    "id": "q-em-026",
    "module": "emergency-ops",
    "section": "m5-degraded",
    "domain": "emergency-response",
    "topic": "4e",
    "difficulty": "recall",
    "stem": "Across all degraded-visibility situations, the consistent guiding principle is to:",
    "options": [
      "Operate closer to limits to compensate",
      "Make faster, larger switching moves",
      "Operate more conservatively — widen margins, slow changes, and lean on coordination",
      "Turn off alarms to reduce clutter"
    ],
    "answer": 2,
    "explain": "Whenever awareness is reduced — lost tools, lost telemetry, lost control center — the safe posture is the same: hold more margin, make changes cautiously, and rely on coordination until full awareness returns.",
    "optFeedback": {
      "0": "Reduced visibility calls for more margin, not less.",
      "3": "Silencing alarms discards information you need even more when blind."
    }
  },
  {
    "id": "q-m2-001",
    "module": "voltage-reactive",
    "section": "m2-why-voltage",
    "domain": "transmission",
    "topic": "2b",
    "difficulty": "recall",
    "stem": "How does voltage differ from frequency as a quantity an operator manages?",
    "options": [
      "Voltage is a single value for the whole Interconnection",
      "Voltage and frequency are the same thing",
      "Voltage cannot be measured",
      "Voltage is local — every bus has its own and each must be kept in band"
    ],
    "answer": 3,
    "explain": "Frequency is essentially one number across an Interconnection, but voltage is local: each bus has its own voltage that must stay within limits. That's why voltage control is about managing reactive power in the right places.",
    "optFeedback": {
      "0": "That describes frequency, not voltage.",
      "1": "Voltage and frequency are distinct quantities with different behavior."
    }
  },
  {
    "id": "q-m2-002",
    "module": "voltage-reactive",
    "section": "m2-reactive-sources",
    "domain": "transmission",
    "topic": "2b",
    "std": "VAR-002-4.1",
    "difficulty": "application",
    "stem": "Which reactive resource is generally the fastest and most flexible for regulating voltage?",
    "options": [
      "A generator acting through its automatic voltage regulator (AVR)",
      "A mechanically switched capacitor bank",
      "A shunt reactor",
      "A load tap changer on a distribution transformer"
    ],
    "answer": 0,
    "explain": "Generators, via their AVRs, adjust excitation continuously and quickly, making them the most responsive reactive source. Capacitors and reactors are switched in discrete blocks and are better for coarse, bulk changes.",
    "optFeedback": {
      "1": "Capacitors switch in blocks — coarse and discrete, not continuous.",
      "2": "A reactor absorbs reactive to lower voltage; it isn't the flexible source described."
    }
  },
  {
    "id": "q-m2-003",
    "module": "voltage-reactive",
    "section": "m2-reactive-sources",
    "domain": "transmission",
    "topic": "2b",
    "difficulty": "application",
    "stem": "On a long, lightly loaded line, voltage tends to rise because of line charging. The appropriate reactive action is to:",
    "options": [
      "Switch in a capacitor bank to supply reactive",
      "Switch in a shunt reactor (or reduce generator excitation) to absorb reactive",
      "Increase real-power dispatch",
      "Raise the voltage schedule"
    ],
    "answer": 1,
    "explain": "Line charging supplies excess reactive at light load, pushing voltage up. Absorbing reactive with a shunt reactor (or lowering generator excitation) brings it back down. A capacitor would add reactive and make it worse.",
    "optFeedback": {
      "0": "A capacitor supplies reactive and raises voltage — the wrong direction.",
      "2": "Real-power dispatch doesn't correct a high-voltage reactive condition."
    }
  },
  {
    "id": "q-m2-004",
    "module": "voltage-reactive",
    "section": "m2-voltage-schedules",
    "domain": "transmission",
    "topic": "2b",
    "std": "VAR-001-5",
    "difficulty": "recall",
    "stem": "A voltage schedule provided to a generator operator is best understood as:",
    "options": [
      "An optional target the generator may ignore",
      "A billing rate",
      "A required target voltage (or band) the generator is obligated to help maintain",
      "A maintenance timetable"
    ],
    "answer": 2,
    "explain": "Operators hold voltage schedules at key buses and coordinate reactive resources to meet them. Generators are obligated to follow the voltage schedule the TOP or BA provides.",
    "optFeedback": {
      "0": "The schedule is an obligation, not optional.",
      "1": "A voltage schedule is a reliability target, not a billing construct."
    }
  },
  {
    "id": "q-m2-005",
    "module": "voltage-reactive",
    "section": "m2-voltage-collapse",
    "domain": "transmission",
    "topic": "2b",
    "difficulty": "analysis",
    "stem": "Steadily declining voltages together with generators hitting their reactive limits most likely indicate:",
    "options": [
      "A healthy, well-margined system",
      "That line ratings should be raised",
      "A frequency problem",
      "Approaching voltage collapse — reactive reserve is running out"
    ],
    "answer": 3,
    "explain": "Falling voltages plus exhausted reactive resources mean reactive reserve is gone — the fingerprint of approaching voltage collapse. The response is decisive: add reactive fast, reduce loading/transfers, and shed load if needed.",
    "optFeedback": {
      "0": "Exhausted reactive reserve is the opposite of well-margined.",
      "2": "These are voltage/reactive symptoms, not a frequency issue."
    }
  },
  {
    "id": "q-m3-001",
    "module": "operating-limits",
    "section": "m3-contingency-analysis",
    "domain": "contingency",
    "topic": "5a",
    "difficulty": "recall",
    "stem": "Real-time contingency analysis primarily answers which question?",
    "options": [
      "If we lose any single element now, is the system still within limits?",
      "What will electricity cost tomorrow?",
      "How many operators are on shift?",
      "What is the weather forecast?"
    ],
    "answer": 0,
    "explain": "Contingency analysis repeatedly tests the N-1 question — whether the system would stay within limits after the loss of each credible single element — so operators can act before a contingency causes a violation.",
    "optFeedback": {
      "1": "That's a market question, not a reliability analysis.",
      "2": "Staffing is unrelated to contingency analysis."
    }
  },
  {
    "id": "q-m3-002",
    "module": "operating-limits",
    "section": "m3-contingency-analysis",
    "domain": "contingency",
    "topic": "5a",
    "difficulty": "application",
    "stem": "The system is within all limits right now, but analysis shows a single line loss would overload a transformer. This means the system is:",
    "options": [
      "Fully secure; no action needed",
      "Within limits but not N-1 secure — action is needed before the contingency occurs",
      "Already in a blackout",
      "Operating at its emergency rating"
    ],
    "answer": 1,
    "explain": "Being within limits in the actual state isn't enough; N-1 security requires the post-contingency state to be within limits too. A flagged post-contingency overload calls for action now.",
    "optFeedback": {
      "0": "A post-contingency violation means it is not fully secure.",
      "2": "Nothing here indicates an actual outage yet — that's what you're preventing."
    }
  },
  {
    "id": "q-m3-003",
    "module": "operating-limits",
    "section": "m3-network-tools",
    "domain": "contingency",
    "topic": "5b",
    "difficulty": "recall",
    "stem": "The state estimator's role in the EMS is to:",
    "options": [
      "Set generator schedules",
      "Bill interchange transactions",
      "Blend telemetry into a best estimate of the actual system state, filtering bad data",
      "Operate breakers automatically"
    ],
    "answer": 2,
    "explain": "The state estimator combines redundant telemetry into a coherent, best estimate of the current system state, filling gaps and filtering bad measurements. That estimate is what contingency analysis runs on.",
    "optFeedback": {
      "0": "Scheduling generation is a separate function.",
      "3": "The estimator produces a model; it doesn't switch breakers."
    }
  },
  {
    "id": "q-m3-004",
    "module": "operating-limits",
    "section": "m3-network-tools",
    "domain": "contingency",
    "topic": "5b",
    "difficulty": "recall",
    "stem": "A power flow (load flow) calculation determines:",
    "options": [
      "The number of customers on a feeder",
      "The market clearing price",
      "The maintenance schedule",
      "How real and reactive power, voltages, and angles distribute across the network for a given condition"
    ],
    "answer": 3,
    "explain": "A power flow solves how power, voltages, and angles distribute across the network for a set of conditions. It's the computational engine underneath contingency analysis.",
    "optFeedback": {
      "0": "Customer counts are a distribution/records matter.",
      "1": "Market prices come from the market software, not the power flow."
    }
  },
  {
    "id": "q-m3-005",
    "module": "operating-limits",
    "section": "m3-network-tools",
    "domain": "contingency",
    "topic": "5b",
    "difficulty": "analysis",
    "stem": "The state estimator is failing to solve and telemetry is intermittent. How should you regard the contingency analysis results?",
    "options": [
      "Treat them with suspicion and operate more conservatively, since bad input yields unreliable output",
      "Trust them fully; the tools always self-correct",
      "Ignore limits entirely",
      "Assume the system is secure"
    ],
    "answer": 0,
    "explain": "Contingency analysis is only as good as the state estimate feeding it. When the estimator won't solve or telemetry is bad, the results are unreliable — recognize the degraded state and hold more margin until the tools recover.",
    "optFeedback": {
      "1": "Bad input means the output can't be trusted at face value.",
      "3": "You can't assume security when your analysis is unreliable."
    }
  },
  {
    "id": "q-m3-006",
    "module": "operating-limits",
    "section": "m3-response",
    "domain": "contingency",
    "topic": "5c",
    "std": "TOP-001-6",
    "difficulty": "application",
    "stem": "When relieving a limit violation, which ordering of actions is generally preferred?",
    "options": [
      "Shed firm load first, then try switching",
      "Reconfigure and adjust controls, then redispatch, then reduce transfers, and shed load only as a last resort",
      "Do nothing until an IROL is exceeded",
      "Raise the limit in the model"
    ],
    "answer": 1,
    "explain": "Operators use the least-drastic effective measure first — reconfigure, adjust controls, redispatch, reduce transfers — keeping firm load shedding as the final option when nothing else restores limits in time.",
    "optFeedback": {
      "0": "Firm load shedding is a last resort, not a first move.",
      "3": "Changing the model's number doesn't change the equipment's real capability."
    }
  },
  {
    "id": "q-m3-007",
    "module": "operating-limits",
    "section": "m3-response",
    "domain": "contingency",
    "topic": "5c",
    "std": "IRO-006-5",
    "difficulty": "recall",
    "stem": "Transmission Loading Relief (TLR) in the Eastern Interconnection is used to:",
    "options": [
      "Schedule new generation",
      "Restore a blacked-out system",
      "Relieve overloads by curtailing transactions contributing to a constrained flowgate, coordinated across systems",
      "Set voltage schedules"
    ],
    "answer": 2,
    "explain": "TLR is a coordinated procedure to relieve a constrained element by curtailing the transactions contributing to its loading. Because flow loops across systems, RCs coordinate the relief across the Interconnection.",
    "optFeedback": {
      "1": "Restoration is a separate process (EOP standards).",
      "3": "Voltage schedules are a reactive-control matter, not TLR."
    }
  },
  {
    "id": "q-m3-008",
    "module": "operating-limits",
    "section": "m3-sol-irol",
    "domain": "contingency",
    "topic": "5d",
    "std": "FAC-011-4",
    "difficulty": "recall",
    "stem": "System Operating Limits generally fall into which three categories?",
    "options": [
      "Local, regional, and national",
      "Cheap, moderate, and expensive",
      "Daily, weekly, and monthly",
      "Thermal, voltage, and stability"
    ],
    "answer": 3,
    "explain": "SOLs are thermal (from equipment ratings), voltage (bus voltage bands), and stability (staying in synchronism after a disturbance). Knowing which is binding shapes the right response.",
    "optFeedback": {
      "1": "Cost isn't how SOLs are categorized.",
      "2": "SOLs aren't defined by calendar period."
    }
  },
  {
    "id": "q-m3-009",
    "module": "operating-limits",
    "section": "m3-sol-irol",
    "domain": "contingency",
    "topic": "5d",
    "std": "FAC-014-3",
    "difficulty": "recall",
    "stem": "SOLs and IROLs are established and communicated to operators under which family of standards?",
    "options": [
      "The FAC standards (using an SOL methodology)",
      "The market rules",
      "The CIP standards",
      "The vegetation management program"
    ],
    "answer": 0,
    "explain": "The FAC standards govern facility ratings and the SOL methodology, and the establishment and communication of SOLs (and IROLs) for the operations horizon.",
    "optFeedback": {
      "1": "Market rules don't set reliability operating limits.",
      "2": "CIP standards address cyber/physical security, not operating limits."
    }
  },
  {
    "id": "q-m3-010",
    "module": "operating-limits",
    "section": "m3-sol-irol",
    "domain": "contingency",
    "topic": "5e",
    "difficulty": "application",
    "stem": "Which statement about the SOL/IROL relationship is correct?",
    "options": [
      "Every SOL is an IROL",
      "Every IROL is an SOL, but only some SOLs rise to IROL because their violation could cascade over a wide area",
      "IROLs and SOLs are unrelated",
      "IROLs apply only to generators"
    ],
    "answer": 1,
    "explain": "An IROL is a special, higher-consequence SOL — one whose violation could cause wide-area instability, separation, or cascading. So every IROL is an SOL, but not every SOL is an IROL.",
    "optFeedback": {
      "0": "Most SOLs are not IROLs; only the wide-area-consequence ones are.",
      "3": "IROLs are system limits, not generator-only."
    }
  },
  {
    "id": "q-m3-011",
    "module": "operating-limits",
    "section": "m3-response",
    "domain": "contingency",
    "topic": "5e",
    "std": "TOP-001-6",
    "difficulty": "analysis",
    "stem": "Analysis shows an IROL will be exceeded after a specific contingency. The operator should:",
    "options": [
      "Wait to see whether that contingency actually occurs",
      "Log it for the next shift",
      "Act now to relieve the condition within the IROL's defined time, because the consequence is wide-area cascading",
      "Raise the IROL value"
    ],
    "answer": 2,
    "explain": "IROLs carry tight, defined timeframes because exceeding one risks wide-area cascading. Operators act to relieve the condition promptly rather than waiting for the contingency — the whole point is to be secure before it happens.",
    "optFeedback": {
      "0": "Waiting for the contingency abandons the purpose of N-1 security.",
      "3": "You can't wish away a real limit by changing its number."
    }
  },
  {
    "id": "q-m7-001",
    "module": "comms-coord",
    "section": "m7-three-part",
    "domain": "comms-data",
    "topic": "6b",
    "std": "COM-002-4",
    "difficulty": "application",
    "stem": "An operator issues a reliability directive. Three-part communication is complete only when:",
    "options": [
      "The issuer states the instruction",
      "The RC is notified afterward",
      "The receiver writes it down",
      "The issuer states it, the receiver repeats it back, and the issuer confirms the repeat-back is correct"
    ],
    "answer": 3,
    "explain": "Three-part communication requires all three parts: issue, repeat-back, and confirmation of the repeat-back. The confirmation step is what catches a mishearing before it becomes a wrong action.",
    "optFeedback": {
      "0": "Issuing alone is one part; the protocol requires repeat-back and confirmation.",
      "2": "Writing it down is good practice but isn't the defined three-part exchange."
    }
  },
  {
    "id": "q-m7-002",
    "module": "comms-coord",
    "section": "m7-reporting",
    "domain": "comms-data",
    "topic": "6a",
    "std": "EOP-004-4",
    "difficulty": "recall",
    "stem": "Reporting requirements exist mainly so that:",
    "options": [
      "Disturbances and significant events are communicated within required timeframes so the community can respond and learn",
      "Operators have more paperwork",
      "Electricity prices can be set",
      "Maintenance can be billed"
    ],
    "answer": 0,
    "explain": "Event and disturbance reporting notifies the reliability community within set timeframes, enabling coordinated response and after-the-fact analysis that improves the system.",
    "optFeedback": {
      "1": "The purpose is reliability awareness, not paperwork for its own sake.",
      "2": "Reporting is a reliability function, unrelated to pricing."
    }
  },
  {
    "id": "q-m7-003",
    "module": "comms-coord",
    "section": "m7-reporting",
    "domain": "comms-data",
    "topic": "6a",
    "difficulty": "application",
    "stem": "You observe a developing condition on your system that could affect a neighbor. The best practice is to:",
    "options": [
      "Wait until it becomes a confirmed problem",
      "Notify the RC and affected neighbors promptly, since under-communicating is riskier than over-communicating",
      "Say nothing to avoid alarming anyone",
      "Report it only in the next shift log"
    ],
    "answer": 1,
    "explain": "Timely notification lets neighbors and the RC act before a local issue becomes wide-area. Under-communicating a developing problem is far riskier than over-communicating.",
    "optFeedback": {
      "0": "Waiting removes the chance for others to help early.",
      "2": "Silence denies the RC and neighbors situational awareness they may need."
    }
  },
  {
    "id": "q-m7-004",
    "module": "comms-coord",
    "section": "m7-data-validity",
    "domain": "comms-data",
    "topic": "6c",
    "difficulty": "application",
    "stem": "Which telemetry reading should an operator most suspect as bad data?",
    "options": [
      "A value updating smoothly and consistent with neighbors",
      "A voltage of 1.00 per-unit",
      "A value that is frozen, out of range, or inconsistent with surrounding measurements",
      "A line flow within its rating"
    ],
    "answer": 2,
    "explain": "Frozen, out-of-range, or inconsistent values are classic signs of bad data. They can mislead the operator and corrupt the state estimator, so they warrant a cross-check before being acted on.",
    "optFeedback": {
      "0": "Smooth, consistent values are the signature of good data.",
      "1": "1.00 p.u. is a normal, healthy voltage reading."
    }
  },
  {
    "id": "q-m7-005",
    "module": "comms-coord",
    "section": "m7-data-validity",
    "domain": "comms-data",
    "topic": "6c",
    "difficulty": "analysis",
    "stem": "The state estimator repeatedly fails to converge for one area. The most likely cause and response is:",
    "options": [
      "The system is definitely faulted; trip the area",
      "Nothing — estimators never depend on data quality",
      "Frequency is too high; shed load",
      "Bad or missing measurements in that area; investigate the data and operate more conservatively there"
    ],
    "answer": 3,
    "explain": "A non-converging state estimator usually signals bad or missing measurements. The right response is to investigate the data, treat that area's results with caution, and hold more margin until it's resolved.",
    "optFeedback": {
      "0": "Non-convergence is a data problem, not proof of a fault.",
      "1": "The estimator's quality depends entirely on its input data."
    }
  },
  {
    "id": "q-m7-006",
    "module": "comms-coord",
    "section": "m7-data-validity",
    "domain": "comms-data",
    "topic": "6c",
    "difficulty": "application",
    "stem": "Before taking a significant action based on a single questionable reading near a limit, an operator should:",
    "options": [
      "Verify it against redundant or neighboring sources first",
      "Act immediately on the single reading",
      "Ignore the limit",
      "Disable the alarm"
    ],
    "answer": 0,
    "explain": "When a reading drives a significant action, especially near a limit, verify it against redundant sources. Acting on one unverified bad measurement has caused real events; a quick cross-check is cheap insurance.",
    "optFeedback": {
      "1": "Acting on a single unverified reading is exactly the risk to avoid.",
      "3": "Silencing the alarm discards information rather than verifying it."
    }
  },
  {
    "id": "q-m7-007",
    "module": "comms-coord",
    "section": "m7-data-validity",
    "domain": "comms-data",
    "topic": "6c",
    "difficulty": "recall",
    "stem": "Why does data validity matter so much for contingency analysis?",
    "options": [
      "It doesn't; contingency analysis ignores telemetry",
      "Because the analysis runs on the state estimate, so bad input data yields unreliable post-contingency results",
      "Because it sets the market price",
      "Because it controls generator governors"
    ],
    "answer": 1,
    "explain": "Contingency analysis is built on the state estimate, which is built on telemetry. Bad data propagates through, so validating data protects the reliability of the whole assessment chain.",
    "optFeedback": {
      "0": "Contingency analysis depends directly on telemetry-fed estimates.",
      "2": "Data validity is a reliability concern, not a pricing one."
    }
  },
  {
    "id": "q-m7-008",
    "module": "comms-coord",
    "section": "m7-telemetry-equip",
    "domain": "comms-data",
    "topic": "6d",
    "difficulty": "recall",
    "stem": "SCADA remote terminal units (RTUs) in substations primarily:",
    "options": [
      "Set voltage schedules",
      "Forecast load",
      "Gather field measurements and status and relay them to the control center (and carry control actions back)",
      "Replace protective relays"
    ],
    "answer": 2,
    "explain": "RTUs collect substation measurements and equipment status and communicate them to the control center over SCADA, and carry operator control actions back out. They're the field end of your situational awareness.",
    "optFeedback": {
      "0": "Voltage schedules are set by operators/engineering, not RTUs.",
      "3": "RTUs report data; protective relays are a separate protection function."
    }
  },
  {
    "id": "q-m7-009",
    "module": "comms-coord",
    "section": "m7-telemetry-equip",
    "domain": "comms-data",
    "topic": "6d",
    "difficulty": "application",
    "stem": "Losing telemetry from part of the system most directly means:",
    "options": [
      "That area is de-energized",
      "The market has closed",
      "Frequency has dropped",
      "Reduced visibility of that area, so the state estimator may not solve well there and you should operate more conservatively"
    ],
    "answer": 3,
    "explain": "Lost telemetry means lost visibility, not a confirmed outage. The state estimator may struggle for that area, so you lean on backup information and hold more margin until it's restored — the loss-of-tools discipline.",
    "optFeedback": {
      "0": "Lost data is not the same as a de-energized area.",
      "2": "Losing telemetry doesn't itself change frequency."
    }
  },
  {
    "id": "q-m9-001",
    "module": "balancing",
    "section": "m9-balance-frequency",
    "domain": "balancing",
    "topic": "1e",
    "std": "BAL-003-2",
    "difficulty": "recall",
    "stem": "Primary frequency response is best described as:",
    "options": [
      "The immediate, automatic action of governors to arrest a frequency change within seconds",
      "Operators manually redispatching over the next hour",
      "A market settlement",
      "Load forecasting for the next day"
    ],
    "answer": 0,
    "explain": "Primary frequency response is the automatic governor action that arrests a frequency deviation within seconds — before AGC (secondary) and reserves restore frequency to nominal.",
    "optFeedback": {
      "1": "That describes tertiary/operator action, not primary response.",
      "3": "Load forecasting is planning, not real-time frequency arrest."
    }
  },
  {
    "id": "q-m9-002",
    "module": "balancing",
    "section": "m9-balance-frequency",
    "domain": "balancing",
    "topic": "1e",
    "difficulty": "application",
    "stem": "Order these frequency-control layers from fastest to slowest after a generation loss:",
    "options": [
      "AGC, then governors, then operators",
      "Governors (primary), then AGC (secondary), then operator repositioning (tertiary)",
      "Operators, then governors, then AGC",
      "They all act at exactly the same time"
    ],
    "answer": 1,
    "explain": "Governors act first within seconds (primary), AGC then restores frequency and ACE over the following minutes (secondary), and operators reposition resources and rebuild reserves afterward (tertiary).",
    "optFeedback": {
      "0": "Governors act before AGC, not after.",
      "3": "The layers act on different timescales, not simultaneously."
    }
  },
  {
    "id": "q-m9-003",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1c",
    "std": "BAL-001-2",
    "difficulty": "recall",
    "stem": "Automatic Generation Control (AGC) primarily works to:",
    "options": [
      "Trip breakers on faults",
      "Set transmission ratings",
      "Adjust committed generation automatically to drive the BA's ACE toward zero",
      "Forecast weather"
    ],
    "answer": 2,
    "explain": "AGC is the closed-loop control that continuously trims generation to keep Area Control Error near zero, matching generation to load and interchange in real time.",
    "optFeedback": {
      "0": "Tripping on faults is protection, not AGC.",
      "1": "Ratings come from equipment studies, not AGC."
    }
  },
  {
    "id": "q-m9-004",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1d",
    "std": "BAL-001-2",
    "difficulty": "analysis",
    "stem": "A Balancing Authority's ACE is significantly negative. This indicates the BA is:",
    "options": [
      "Over-generating; it should reduce generation",
      "Experiencing high voltage",
      "Perfectly balanced",
      "Short (under-generating or over-importing); it should raise generation"
    ],
    "answer": 3,
    "explain": "Negative ACE means the BA is not meeting its obligation — under-generating relative to its load and interchange — so it should increase generation to bring ACE back toward zero.",
    "optFeedback": {
      "0": "Over-generating produces positive ACE, not negative.",
      "1": "ACE is about the power balance, not voltage."
    }
  },
  {
    "id": "q-m9-005",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1d",
    "difficulty": "recall",
    "stem": "In the ACE equation, the frequency-bias term ensures that:",
    "options": [
      "Every BA contributes to arresting an Interconnection-wide frequency deviation, not just fixing its own interchange",
      "Only the deficient BA responds to a frequency drop",
      "Frequency is ignored",
      "Interchange is always zero"
    ],
    "answer": 0,
    "explain": "The bias term makes each BA lean in to help correct a system-wide frequency deviation. It's how the whole Interconnection shares the job of holding 60 Hz rather than leaving it to one area.",
    "optFeedback": {
      "1": "The bias term spreads the response across all BAs, not just one.",
      "3": "The term concerns frequency, not zeroing interchange."
    }
  },
  {
    "id": "q-m9-006",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1b",
    "std": "BAL-002-3",
    "difficulty": "recall",
    "stem": "Which best distinguishes spinning from non-spinning reserve?",
    "options": [
      "Spinning reserve is offline; non-spinning is synchronized",
      "Spinning reserve is synchronized and responds immediately; non-spinning is offline capacity that can start within a set time",
      "They are the same thing",
      "Spinning reserve applies only to hydro"
    ],
    "answer": 1,
    "explain": "Spinning reserve is already synchronized to the grid and can respond at once; non-spinning reserve is offline capacity that must start and connect within a required time. Both count toward operating reserve.",
    "optFeedback": {
      "0": "That reverses the definitions.",
      "3": "Reserve categories aren't limited to one resource type."
    }
  },
  {
    "id": "q-m9-007",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1b",
    "std": "BAL-002-3",
    "difficulty": "application",
    "stem": "Contingency reserve is held specifically to:",
    "options": [
      "Lower electricity prices",
      "Increase line ratings",
      "Recover ACE and frequency within a required time after the loss of the largest credible resource",
      "Replace load forecasting"
    ],
    "answer": 2,
    "explain": "Contingency reserve is the capacity set aside to replace the largest credible resource loss and restore ACE and frequency within a required recovery time — turning a big loss into a recoverable event.",
    "optFeedback": {
      "0": "Reserve is a reliability provision, not a pricing tool.",
      "1": "Reserve concerns generation balance, not thermal ratings."
    }
  },
  {
    "id": "q-m9-008",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1a",
    "difficulty": "application",
    "stem": "A Transmission Operator determines that an interchange transaction is adversely affecting reliability. The TO may:",
    "options": [
      "Do nothing; interchange is untouchable",
      "Shed load first",
      "Only raise voltage",
      "Curtail the interchange that adversely impacts reliability"
    ],
    "answer": 3,
    "explain": "Curtailing confirmed interchange that adversely affects reliability is a defined TO task. Interchange is scheduled through set processes, but reliability takes precedence when a transaction threatens it.",
    "optFeedback": {
      "0": "Reliability can override a transaction; interchange isn't untouchable.",
      "1": "Load shedding is a later, more drastic step than curtailing a transaction."
    }
  },
  {
    "id": "q-m9-009",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1f",
    "difficulty": "recall",
    "stem": "Load forecasting supports reliability primarily by:",
    "options": [
      "Anticipating demand so enough of the right resources are committed ahead of time",
      "Setting protective relay targets",
      "Interrupting fault current",
      "Measuring line temperature"
    ],
    "answer": 0,
    "explain": "Load forecasting predicts demand (largely weather-driven) so operators and planners commit adequate, appropriately flexible generation in advance rather than scrambling in real time.",
    "optFeedback": {
      "1": "Relay settings are a protection matter, not load forecasting.",
      "2": "Interrupting current is a breaker's job."
    }
  },
  {
    "id": "q-m9-010",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1g",
    "difficulty": "application",
    "stem": "Which generation characteristic most affects how quickly a balancing shortfall can be corrected?",
    "options": [
      "The color of the plant",
      "Startup time and ramp rate — how fast a resource can come online and change output",
      "The plant's street address",
      "The number of employees"
    ],
    "answer": 1,
    "explain": "Startup times and ramp rates determine how fast generation can respond. Flexible resources (like gas and hydro) can change output quickly; large thermal units are slower, which shapes how balancing is managed.",
    "optFeedback": {
      "0": "Physical response characteristics matter, not superficial ones.",
      "3": "Staffing doesn't determine ramp capability."
    }
  },
  {
    "id": "q-m9-011",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1h",
    "difficulty": "analysis",
    "stem": "Compared with dispatchable thermal units, a high share of wind and solar generation tends to:",
    "options": [
      "Reduce the need for reserves and forecasting",
      "Eliminate frequency concerns",
      "Increase the value of reserves, forecasting, and flexible resources because output is variable and weather-driven",
      "Make load forecasting unnecessary"
    ],
    "answer": 2,
    "explain": "Wind and solar don't dispatch on command and vary with weather, so a grid leaning on them puts a premium on accurate forecasting, flexible resources, and reserves to manage the variability.",
    "optFeedback": {
      "0": "Variable output raises, not lowers, the need for reserves and forecasting.",
      "1": "Variable resources make frequency management more, not less, demanding."
    }
  },
  {
    "id": "q-m9-012",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1h",
    "difficulty": "recall",
    "stem": "Among common resources, which is generally the most flexible for fast output changes where it's available?",
    "options": [
      "A large baseload nuclear unit",
      "A solar farm at night",
      "A coal unit at minimum load",
      "Hydro generation"
    ],
    "answer": 3,
    "explain": "Hydro can change output very quickly where water is available, making it highly flexible for balancing. Baseload nuclear and coal are slower to maneuver, and solar produces nothing at night.",
    "optFeedback": {
      "0": "Baseload nuclear is run steadily, not maneuvered quickly.",
      "1": "Solar produces no output at night, so it can't provide fast changes then."
    }
  },
  {
    "id": "q-m4-001",
    "module": "protection",
    "section": "m4-relaying",
    "domain": "transmission",
    "topic": "2a",
    "std": "PRC-027-1",
    "difficulty": "application",
    "stem": "Protection zones are designed to overlap so that:",
    "options": [
      "No point on the system is left unprotected, and a fault always falls within at least one zone",
      "Faults are never cleared",
      "Relays never need coordination",
      "Breakers can be removed"
    ],
    "answer": 0,
    "explain": "Overlapping zones ensure every point is covered, so a fault always lands inside at least one protection zone. Relays are then coordinated so the closest device clears the fault and removes the smallest piece.",
    "optFeedback": {
      "1": "Overlap ensures faults ARE cleared, everywhere.",
      "2": "Overlap requires careful coordination, not less of it."
    }
  },
  {
    "id": "q-m4-002",
    "module": "protection",
    "section": "m4-coordination",
    "domain": "transmission",
    "topic": "2a",
    "difficulty": "recall",
    "stem": "Primary and backup protection are provided so that:",
    "options": [
      "Two relays always trip together for every fault",
      "If the primary protection fails to operate, backup protection still clears the fault",
      "Backup protection replaces breakers",
      "Faults are cleared more slowly on purpose"
    ],
    "answer": 1,
    "explain": "Every protected element has primary protection that acts first and backup that acts if the primary fails, so a single relay or breaker failure doesn't leave a fault on the system.",
    "optFeedback": {
      "0": "Backup acts when primary fails, not simultaneously for every fault.",
      "3": "Backup adds reliability of clearing; it isn't about slowing things down."
    }
  },
  {
    "id": "q-m4-003",
    "module": "protection",
    "section": "m4-coordination",
    "domain": "transmission",
    "topic": "2a",
    "difficulty": "recall",
    "stem": "Breaker failure protection operates when:",
    "options": [
      "A breaker successfully clears a fault",
      "Voltage is normal",
      "A breaker fails to clear a fault, so surrounding breakers are tripped to remove it",
      "Load is light"
    ],
    "answer": 2,
    "explain": "If a breaker doesn't clear a fault, breaker failure protection trips the surrounding breakers to remove the fault — widening the outage minimally to protect the system.",
    "optFeedback": {
      "0": "If the breaker clears the fault, breaker failure protection isn't needed.",
      "1": "It responds to a failed clearing, not to normal voltage."
    }
  },
  {
    "id": "q-m4-004",
    "module": "protection",
    "section": "m4-ras-misop",
    "domain": "transmission",
    "topic": "2a",
    "std": "PRC-004-6",
    "difficulty": "application",
    "stem": "A protection misoperation is best described as:",
    "options": [
      "Any time a relay operates correctly",
      "A scheduled test",
      "Routine maintenance",
      "A trip that should not have happened, or a failure to trip when it should have"
    ],
    "answer": 3,
    "explain": "A misoperation is protection acting when it shouldn't (an unnecessary trip removing a healthy element) or failing to act when it should (leaving a fault on the system). Either can turn a small event into a large one, so misoperations are reported and corrected.",
    "optFeedback": {
      "0": "Correct operation is not a misoperation.",
      "1": "A scheduled test is planned activity, not a misoperation."
    }
  },
  {
    "id": "q-st-001",
    "module": "standards",
    "section": "m8-how-standards-work",
    "domain": "comms-data",
    "topic": "6a",
    "difficulty": "recall",
    "stem": "NERC Reliability Standards are best described as:",
    "options": [
      "Mandatory, enforceable requirements written by NERC and approved by FERC",
      "Voluntary best-practice guidelines",
      "Market bidding rules",
      "Internal utility procedures with no outside oversight"
    ],
    "answer": 0,
    "explain": "The Reliability Standards are mandatory and enforceable. NERC develops them and FERC approved them, giving them the force of law in the United States.",
    "optFeedback": {
      "1": "They are mandatory, not voluntary.",
      "3": "They are developed and enforced by the ERO with FERC oversight, not purely internal."
    }
  },
  {
    "id": "q-st-002",
    "module": "standards",
    "section": "m8-operations-families",
    "domain": "transmission",
    "topic": "2e",
    "std": "TOP-001-6",
    "difficulty": "recall",
    "stem": "Which standard family most directly defines a Transmission Operator's core obligation to operate within limits?",
    "options": [
      "INT",
      "TOP",
      "BAL",
      "CIP"
    ],
    "answer": 1,
    "explain": "The TOP family (Transmission Operations) sets the TO's central duties — operate within limits, plan operations, and exchange the needed data.",
    "optFeedback": {
      "0": "INT covers interchange, not the core transmission-operations duty.",
      "2": "BAL covers resource and demand balancing."
    }
  },
  {
    "id": "q-st-003",
    "module": "standards",
    "section": "m8-operations-families",
    "domain": "comms-data",
    "topic": "6b",
    "std": "COM-002-4",
    "difficulty": "recall",
    "stem": "Three-part communication protocols for operating instructions are found in which family?",
    "options": [
      "FAC",
      "PRC",
      "COM",
      "VAR"
    ],
    "answer": 2,
    "explain": "The COM family covers communications, including the operating-personnel communication protocols such as three-part communication.",
    "optFeedback": {
      "0": "FAC covers facility ratings and limits.",
      "1": "PRC covers protection and control."
    }
  },
  {
    "id": "q-st-004",
    "module": "standards",
    "section": "m8-operations-families",
    "domain": "emergency-response",
    "topic": "4a",
    "std": "EOP-005-3",
    "difficulty": "application",
    "stem": "Emergency plans, load shedding, and system restoration are addressed primarily by which family?",
    "options": [
      "BAL",
      "INT",
      "VAR",
      "EOP"
    ],
    "answer": 3,
    "explain": "The EOP family (Emergency Operations) covers emergency operating plans, load shedding, restoration from blackstart, loss of control center, and related preparedness topics.",
    "optFeedback": {
      "0": "BAL covers balancing performance and reserves.",
      "2": "VAR covers voltage and reactive control."
    }
  },
  {
    "id": "q-st-005",
    "module": "standards",
    "section": "m8-support-families",
    "domain": "contingency",
    "topic": "5d",
    "std": "FAC-011-4",
    "difficulty": "recall",
    "stem": "Facility ratings and the methodology for determining System Operating Limits live in which family?",
    "options": [
      "FAC",
      "COM",
      "INT",
      "EOP"
    ],
    "answer": 0,
    "explain": "The FAC family covers facility ratings and the SOL methodology for the operations horizon — the source of the limits operators run to.",
    "optFeedback": {
      "1": "COM covers communications.",
      "3": "EOP covers emergency operations."
    }
  },
  {
    "id": "q-b8-b1",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1a",
    "difficulty": "recall",
    "stem": "Before an interchange transaction actually flows, it is generally:",
    "options": [
      "Implemented instantly with no coordination",
      "Arranged, then confirmed, then implemented through defined processes",
      "Only reported after the fact",
      "Set by the Transmission Operator alone"
    ],
    "answer": 1,
    "explain": "Interchange moves through defined steps — arranged, confirmed, and implemented — and the net schedule feeds the ACE equation. A TO may curtail confirmed interchange that adversely affects reliability.",
    "optFeedback": {
      "0": "Interchange follows a coordinated arrange/confirm/implement process.",
      "3": "Interchange involves multiple parties, not the TO alone."
    }
  },
  {
    "id": "q-b8-b2",
    "module": "balancing",
    "section": "m9-balance-frequency",
    "domain": "balancing",
    "topic": "1e",
    "difficulty": "application",
    "stem": "Interconnection frequency is holding slightly above 60 Hz. This indicates that, overall:",
    "options": [
      "Load exceeds generation",
      "Voltage is low",
      "Generation exceeds load",
      "Reactive power is excessive"
    ],
    "answer": 2,
    "explain": "Frequency above 60 Hz means more generation than load at that instant; below 60 means the reverse. It's a real-power balance indicator, not a voltage or reactive signal.",
    "optFeedback": {
      "0": "Load exceeding generation pulls frequency below 60 Hz.",
      "1": "Frequency reflects the MW balance, not voltage."
    }
  },
  {
    "id": "q-b8-b3",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1g",
    "difficulty": "recall",
    "stem": "Which best describes the difference between baseload and peaking generation?",
    "options": [
      "They are the same",
      "Baseload only runs at night",
      "Peaking units never start",
      "Baseload runs steadily at high capacity factor; peaking runs to meet short, high-demand periods"
    ],
    "answer": 3,
    "explain": "Baseload units (often nuclear or coal) run steadily at high capacity factor; peaking units (often gas combustion turbines) start and stop to serve short, high-demand periods and provide flexibility.",
    "optFeedback": {
      "1": "Baseload runs around the clock, not only at night.",
      "2": "Peaking units are specifically designed to start for peaks."
    }
  },
  {
    "id": "q-b8-r1",
    "module": "emergency-ops",
    "section": "m5-disturbances",
    "domain": "emergency-response",
    "topic": "4b",
    "std": "PRC-010-2",
    "difficulty": "analysis",
    "stem": "How do UFLS and UVLS differ?",
    "options": [
      "UFLS sheds load on low frequency; UVLS sheds load on low voltage",
      "They are identical schemes",
      "UFLS sheds load on high voltage; UVLS on high frequency",
      "Both respond only to operator commands"
    ],
    "answer": 0,
    "explain": "Underfrequency load shedding (UFLS) sheds blocks at preset low-frequency thresholds to arrest a falling frequency; undervoltage load shedding (UVLS) sheds at preset low-voltage thresholds to arrest a voltage collapse. Both are automatic backstops.",
    "optFeedback": {
      "1": "They target different quantities — frequency versus voltage.",
      "3": "Both act automatically, not on manual command."
    }
  },
  {
    "id": "q-b8-r2",
    "module": "emergency-ops",
    "section": "m5-capacity",
    "domain": "emergency-response",
    "topic": "4c",
    "std": "EOP-011-4",
    "difficulty": "application",
    "stem": "As a capacity emergency worsens, the Energy Emergency Alert (EEA) process primarily serves to:",
    "options": [
      "Set market prices",
      "Signal escalating severity and coordinate escalating actions with neighbors and the RC",
      "Replace three-part communication",
      "Schedule maintenance"
    ],
    "answer": 1,
    "explain": "The EEA process uses graded levels to signal a worsening inability to meet demand, coordinating progressively stronger actions — reserves, appeals, interruptible loads, and ultimately firm load shedding — across the region.",
    "optFeedback": {
      "0": "EEA is a reliability alerting process, not a pricing mechanism.",
      "3": "It addresses real-time capacity shortfalls, not maintenance scheduling."
    }
  },
  {
    "id": "q-b8-r3",
    "module": "restoration",
    "section": "m6-islanding",
    "domain": "emergency-response",
    "topic": "4a",
    "difficulty": "application",
    "stem": "An operator is about to close a breaker to tie two energized islands. The synchronizing check ensures:",
    "options": [
      "Only that both sides are energized",
      "That load is maximized first",
      "That voltage, frequency, and phase angle are matched across the open point",
      "That the market has cleared"
    ],
    "answer": 2,
    "explain": "Synchronizing requires voltage, frequency, and phase angle to be matched before closing. Closing out of synchronism can damage generators and trip units, setting the restoration back.",
    "optFeedback": {
      "0": "Both sides being energized is not enough — they must be matched in all three.",
      "1": "Maximizing load first is unrelated and risky before synchronizing."
    }
  },
  {
    "id": "q-b8-c1",
    "module": "operating-limits",
    "section": "m3-contingency-analysis",
    "domain": "contingency",
    "topic": "5a",
    "difficulty": "recall",
    "stem": "In real-time operations, a 'credible contingency' typically refers to:",
    "options": [
      "Any imaginable simultaneous failure of everything",
      "A scheduled maintenance outage",
      "Only a complete blackout",
      "The loss of a single element (N-1), and sometimes defined multiple losses"
    ],
    "answer": 3,
    "explain": "Contingency analysis focuses on credible events — typically the loss of any single element (N-1), and sometimes specified multiple-element losses — rather than every conceivable catastrophe. The goal is to stay secure for the next credible loss.",
    "optFeedback": {
      "0": "Planning targets credible events, not every imaginable simultaneous failure.",
      "1": "A planned outage is coordinated work, not the unplanned contingency being analyzed."
    }
  },
  {
    "id": "q-b8-c2",
    "module": "operating-limits",
    "section": "m3-response",
    "domain": "contingency",
    "topic": "5c",
    "std": "TOP-001-6",
    "difficulty": "application",
    "stem": "Redispatching generation is used to relieve a constraint by:",
    "options": [
      "Changing which units are generating so that flow shifts off the overloaded element",
      "Adding reactive power locally",
      "Opening the overloaded line",
      "Raising system frequency"
    ],
    "answer": 0,
    "explain": "Redispatch changes the pattern of generation so power flows differently, moving flow off a constrained element. It's a common, less-drastic relief action ordered before shedding load.",
    "optFeedback": {
      "1": "Adding reactive addresses voltage, not a thermal flow constraint.",
      "2": "Opening the overloaded line removes it entirely, usually worsening the situation."
    }
  },
  {
    "id": "q-b8-p1",
    "module": "emergency-ops",
    "section": "m5-prep-planning",
    "domain": "emergency-prep",
    "topic": "3a",
    "difficulty": "application",
    "stem": "The main value of next-day studies in operations planning is that they:",
    "options": [
      "Guarantee no contingencies will occur",
      "Reveal constraints and required actions in advance, so real-time isn't the first time you see a problem",
      "Set electricity prices",
      "Eliminate the need for reserves"
    ],
    "answer": 1,
    "explain": "Next-day studies surface tomorrow's constraints and the actions needed to stay secure, so operators enter real time with a plan rather than discovering problems live.",
    "optFeedback": {
      "0": "Studies prepare you for contingencies; they don't prevent them.",
      "3": "Reserves are still required regardless of planning."
    }
  },
  {
    "id": "q-b8-p2",
    "module": "emergency-ops",
    "section": "m5-weather-gmd",
    "domain": "emergency-prep",
    "topic": "3b",
    "std": "EOP-010-1",
    "difficulty": "application",
    "stem": "During a forecast severe GMD, which observation would most concern an operator?",
    "options": [
      "Normal, steady transformer temperatures",
      "A slightly high power factor",
      "Unusual reactive power swings and transformer heating consistent with induced currents",
      "Stable, in-band voltages"
    ],
    "answer": 2,
    "explain": "GMD induces quasi-DC currents that heat transformers and distort reactive behavior, so abnormal reactive swings and transformer heating are the warning signs to watch and act on during a severe event.",
    "optFeedback": {
      "0": "Normal temperatures are reassuring, not concerning.",
      "3": "Stable in-band voltages are a good sign, not a GMD warning."
    }
  },
  {
    "id": "q-b8-m1",
    "module": "comms-coord",
    "section": "m7-reporting",
    "domain": "comms-data",
    "topic": "6a",
    "std": "EOP-004-4",
    "difficulty": "recall",
    "stem": "Event and disturbance reporting requirements specify not just what to report but also:",
    "options": [
      "The color of the report",
      "Which vendor to use",
      "The market price",
      "The timeframe within which reports must be made"
    ],
    "answer": 3,
    "explain": "Reporting requirements define both the reportable events and the timeframes for reporting them, so the reliability community gets timely awareness and can respond and analyze.",
    "optFeedback": {
      "0": "Format details aside, the key requirement is timeliness and content.",
      "2": "Reporting is a reliability process, unrelated to pricing."
    }
  },
  {
    "id": "q-b8-m2",
    "module": "comms-coord",
    "section": "m7-data-validity",
    "domain": "comms-data",
    "topic": "6c",
    "difficulty": "analysis",
    "stem": "Two redundant measurements of the same line flow disagree significantly. The best immediate step is to:",
    "options": [
      "Treat the value as suspect and verify against other sources before acting on it, especially near a limit",
      "Trust whichever is higher",
      "Ignore both readings",
      "Assume the line is faulted"
    ],
    "answer": 0,
    "explain": "Disagreeing redundant measurements signal possible bad data. Verify against additional sources before taking significant action, particularly near a limit — acting on unverified bad data has caused real events.",
    "optFeedback": {
      "1": "The higher reading isn't automatically the correct one.",
      "3": "Disagreement points to a data problem, not a confirmed fault."
    }
  },
  {
    "id": "q-m9-013",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1d",
    "std": "BAL-001-2",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 460 150\" role=\"img\" aria-label=\"Balancing Authority tied to the Interconnection with interchange and frequency values\"><rect x=\"14\" y=\"44\" width=\"150\" height=\"60\" rx=\"6\" style=\"fill:var(--console-panel);stroke:var(--phosphor);stroke-width:1.5\"/><text x=\"89\" y=\"70\" text-anchor=\"middle\" style=\"fill:var(--readout);font:bold 13px ui-monospace,monospace\">BA WEST</text><text x=\"89\" y=\"90\" text-anchor=\"middle\" style=\"fill:var(--readout-dim);font:11px ui-monospace,monospace\">regulating area</text><rect x=\"296\" y=\"44\" width=\"150\" height=\"60\" rx=\"6\" style=\"fill:var(--console-panel);stroke:var(--grid-line);stroke-width:1.5\"/><text x=\"371\" y=\"78\" text-anchor=\"middle\" style=\"fill:var(--readout);font:bold 12px ui-monospace,monospace\">INTERCONNECTION</text><line x1=\"164\" y1=\"74\" x2=\"292\" y2=\"74\" style=\"stroke:var(--phosphor);stroke-width:2\"/><polygon points=\"286,69 298,74 286,79\" style=\"fill:var(--phosphor)\"/><text x=\"228\" y=\"64\" text-anchor=\"middle\" style=\"fill:var(--readout-dim);font:11px ui-monospace,monospace\">tie line</text><text x=\"228\" y=\"98\" text-anchor=\"middle\" style=\"fill:var(--alert);font:11px ui-monospace,monospace\">NIa 150   NIs 200 MW</text><text x=\"230\" y=\"132\" text-anchor=\"middle\" style=\"fill:var(--readout);font:12px ui-monospace,monospace\">Fa 59.98  Fs 60.00 Hz   B = -10 MW/0.1Hz</text></svg>",
    "stem": "The one-line shows a Balancing Authority's tie to the Interconnection with the values indicated. Using ACE = (NIa - NIs) - 10B(Fa - Fs), what is the area's ACE and the indicated response?",
    "options": [
      "+52 MW; lower generation",
      "-52 MW; raise generation (or reduce load)",
      "-50 MW; no action, the schedule is met",
      "-2 MW; monitor only"
    ],
    "answer": 1,
    "explain": "ACE = (150 - 200) - 10(-10)(59.98 - 60.00) = -50 - 2 = -52 MW. A negative ACE means the BA is leaning on the Interconnection (under-generating for its obligation), so it raises regulating generation or reduces load to drive ACE back toward zero.",
    "optFeedback": {
      "0": "Right magnitude, wrong sign: a negative ACE calls for more generation, not less.",
      "2": "This keeps only the interchange term and drops the -2 MW frequency-bias term.",
      "3": "This is only the bias term; the -50 MW interchange deviation dominates."
    }
  },
  {
    "id": "q-m9-014",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1d",
    "std": "BAL-005-1",
    "difficulty": "application",
    "diagram": "<svg viewBox=\"0 0 460 120\" role=\"img\" aria-label=\"AGC display showing a positive area control error and slightly high frequency\"><rect x=\"14\" y=\"16\" width=\"432\" height=\"88\" rx=\"6\" style=\"fill:var(--console-void);stroke:var(--grid-line);stroke-width:1.5\"/><text x=\"30\" y=\"40\" style=\"fill:var(--readout-dim);font:11px ui-monospace,monospace\">AGC DISPLAY</text><text x=\"30\" y=\"72\" style=\"fill:var(--alert);font:bold 26px ui-monospace,monospace\">ACE = +45 MW</text><text x=\"30\" y=\"94\" style=\"fill:var(--readout);font:12px ui-monospace,monospace\">FREQ 60.02 Hz   units on AGC: A, B</text></svg>",
    "stem": "An operator's AGC display reads as shown. What does this condition indicate, and what will AGC do?",
    "options": [
      "Interchange is exactly on schedule; AGC holds",
      "The BA is under-generating; AGC raises regulating units",
      "The BA is over-generating relative to its obligation; AGC lowers regulating units",
      "Frequency is low; AGC sheds load"
    ],
    "answer": 2,
    "explain": "A positive ACE with frequency slightly high means the area is generating more than its load-plus-net-interchange obligation. AGC responds by lowering the output of regulating units to bring ACE toward zero.",
    "optFeedback": {
      "1": "Positive ACE is the over-generation case; under-generation shows as a negative ACE.",
      "3": "60.02 Hz is slightly high, not low, and AGC adjusts generation, not load."
    }
  },
  {
    "id": "q-m9-015",
    "module": "balancing",
    "section": "m9-balance-frequency",
    "domain": "balancing",
    "topic": "1e",
    "std": "BAL-003-2",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 460 140\" role=\"img\" aria-label=\"Interconnection frequency dips after a generator trip then recovers\"><line x1=\"30\" y1=\"30\" x2=\"30\" y2=\"118\" style=\"stroke:var(--grid-line)\"/><line x1=\"30\" y1=\"118\" x2=\"446\" y2=\"118\" style=\"stroke:var(--grid-line)\"/><text x=\"8\" y=\"52\" style=\"fill:var(--readout-dim);font:10px ui-monospace,monospace\">Hz</text><line x1=\"30\" y1=\"48\" x2=\"446\" y2=\"48\" style=\"stroke:var(--grid-line);stroke-dasharray:3 4\"/><text x=\"410\" y=\"44\" style=\"fill:var(--readout-dim);font:10px ui-monospace,monospace\">60.00</text><polyline points=\"30,48 150,48 190,86 210,72 300,72 446,50\" style=\"fill:none;stroke:var(--phosphor);stroke-width:2\"/><line x1=\"150\" y1=\"30\" x2=\"150\" y2=\"118\" style=\"stroke:var(--emergency);stroke-dasharray:2 3\"/><text x=\"150\" y=\"26\" text-anchor=\"middle\" style=\"fill:var(--emergency);font:10px ui-monospace,monospace\">unit trip -1000 MW</text><text x=\"205\" y=\"104\" text-anchor=\"middle\" style=\"fill:var(--alert);font:10px ui-monospace,monospace\">settles 59.96</text><text x=\"360\" y=\"40\" text-anchor=\"middle\" style=\"fill:var(--normal);font:10px ui-monospace,monospace\">recover 60.00</text></svg>",
    "stem": "A 1,000 MW generator trips and Interconnection frequency settles at 59.96 Hz as shown before recovering. Which action arrests the initial decline, and which returns frequency to 60.00 Hz?",
    "options": [
      "Under-frequency load shedding arrests it; governors restore 60.00 Hz",
      "AGC arrests it instantly; governors restore 60.00 Hz",
      "Manual operator dispatch arrests it; contingency reserve restores 60.00 Hz",
      "Governor (primary) response across the Interconnection arrests it; AGC (secondary) restores 60.00 Hz"
    ],
    "answer": 3,
    "explain": "Turbine-governor (primary) response acts within seconds on every responsive unit to arrest the decline and settle at a new frequency. AGC (secondary) then re-dispatches regulating units to return frequency to 60.00 Hz and restore interchange. UFLS is a last-resort protection, not the normal arrest for a single unit loss at 59.96 Hz.",
    "optFeedback": {
      "0": "UFLS would not typically operate at 59.96 Hz; primary governor response handles it.",
      "1": "AGC acts on a slower cycle; it is governor response that arrests the initial dip."
    }
  },
  {
    "id": "q-m9-016",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1c",
    "std": "BAL-005-1",
    "difficulty": "application",
    "diagram": "<svg viewBox=\"0 0 460 128\" role=\"img\" aria-label=\"AGC panel with negative ACE and two regulating units with headroom\"><rect x=\"14\" y=\"14\" width=\"432\" height=\"100\" rx=\"6\" style=\"fill:var(--console-void);stroke:var(--grid-line);stroke-width:1.5\"/><text x=\"30\" y=\"40\" style=\"fill:var(--emergency);font:bold 22px ui-monospace,monospace\">ACE = -40 MW</text><text x=\"30\" y=\"70\" style=\"fill:var(--readout);font:12px ui-monospace,monospace\">UNIT A   200 / 300 MW  (headroom 100)</text><text x=\"30\" y=\"94\" style=\"fill:var(--readout);font:12px ui-monospace,monospace\">UNIT B   150 / 250 MW  (headroom 100)</text></svg>",
    "stem": "With the ACE shown and both units on AGC with available headroom, the expected automatic response is to:",
    "options": [
      "Raise the regulating units to increase generation and drive ACE toward zero",
      "Lower the regulating units",
      "Trip a unit to reduce interchange",
      "Do nothing until the operator manually intervenes"
    ],
    "answer": 0,
    "explain": "A negative ACE of -40 MW means generation is short of obligation. AGC automatically raises the output of the units it controls that have headroom, closing the gap without waiting for manual operator action.",
    "optFeedback": {
      "1": "Lowering generation would make a negative ACE worse.",
      "3": "AGC is automatic; it acts continuously without waiting for manual input."
    }
  },
  {
    "id": "q-m3-012",
    "module": "operating-limits",
    "section": "m3-contingency-analysis",
    "domain": "contingency",
    "topic": "5d",
    "std": "TOP-001-6",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 460 130\" role=\"img\" aria-label=\"Two substations tied by two parallel lines, one tripped, the other overloaded\"><rect x=\"20\" y=\"50\" width=\"72\" height=\"44\" rx=\"5\" style=\"fill:var(--console-panel);stroke:var(--readout-dim);stroke-width:1.5\"/><text x=\"56\" y=\"77\" text-anchor=\"middle\" style=\"fill:var(--readout);font:bold 13px ui-monospace,monospace\">SUB A</text><rect x=\"368\" y=\"50\" width=\"72\" height=\"44\" rx=\"5\" style=\"fill:var(--console-panel);stroke:var(--readout-dim);stroke-width:1.5\"/><text x=\"404\" y=\"77\" text-anchor=\"middle\" style=\"fill:var(--readout);font:bold 13px ui-monospace,monospace\">SUB B</text><line x1=\"92\" y1=\"40\" x2=\"368\" y2=\"40\" style=\"stroke:var(--emergency);stroke-width:2;stroke-dasharray:5 4\"/><line x1=\"150\" y1=\"30\" x2=\"176\" y2=\"52\" style=\"stroke:var(--emergency);stroke-width:2\"/><line x1=\"176\" y1=\"30\" x2=\"150\" y2=\"52\" style=\"stroke:var(--emergency);stroke-width:2\"/><text x=\"230\" y=\"30\" text-anchor=\"middle\" style=\"fill:var(--emergency);font:11px ui-monospace,monospace\">LINE 1  TRIPPED</text><line x1=\"92\" y1=\"100\" x2=\"368\" y2=\"100\" style=\"stroke:var(--alert);stroke-width:3\"/><text x=\"230\" y=\"120\" text-anchor=\"middle\" style=\"fill:var(--alert);font:bold 12px ui-monospace,monospace\">LINE 2  loaded 108% of rating</text></svg>",
    "stem": "Substations A and B are tied by two parallel lines. Line 1 has tripped, and Line 2 is now loaded to 108% of its rating as shown. What is the operator's primary obligation?",
    "options": [
      "Wait to see whether load naturally decreases before acting",
      "Act to relieve the overload and return the system to within its SOL inside the time allowed for that limit",
      "Immediately shed all load in the area",
      "Ignore it because one line is still in service"
    ],
    "answer": 1,
    "explain": "Operating a facility above its rating is a System Operating Limit exceedance. The operator must act (redispatch, reconfigure, or as a last resort shed load) to return within the SOL inside the time the limit allows, rather than waiting or over-reacting with wholesale load shedding.",
    "optFeedback": {
      "0": "Hoping load drops is not an acceptable response to an active limit exceedance.",
      "2": "Shedding all load is disproportionate; targeted relief comes first, load shed as a last resort.",
      "3": "The remaining line is over its rating; that is the exceedance, regardless of the other line's status."
    }
  },
  {
    "id": "q-m9-017",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1b",
    "std": "BAL-002-3",
    "difficulty": "application",
    "diagram": "<svg viewBox=\"0 0 460 120\" role=\"img\" aria-label=\"Timeline of a unit trip, reserve deployment, and reserve restoration within about 90 minutes\"><line x1=\"24\" y1=\"70\" x2=\"440\" y2=\"70\" style=\"stroke:var(--grid-line);stroke-width:2\"/><circle cx=\"70\" cy=\"70\" r=\"5\" style=\"fill:var(--emergency)\"/><text x=\"70\" y=\"52\" text-anchor=\"middle\" style=\"fill:var(--emergency);font:10px ui-monospace,monospace\">unit trip</text><text x=\"70\" y=\"92\" text-anchor=\"middle\" style=\"fill:var(--readout-dim);font:10px ui-monospace,monospace\">t = 0</text><circle cx=\"180\" cy=\"70\" r=\"5\" style=\"fill:var(--alert)\"/><text x=\"180\" y=\"52\" text-anchor=\"middle\" style=\"fill:var(--alert);font:10px ui-monospace,monospace\">reserve deployed</text><circle cx=\"390\" cy=\"70\" r=\"5\" style=\"fill:var(--normal)\"/><text x=\"390\" y=\"52\" text-anchor=\"middle\" style=\"fill:var(--normal);font:10px ui-monospace,monospace\">reserve restored</text><text x=\"390\" y=\"92\" text-anchor=\"middle\" style=\"fill:var(--readout-dim);font:10px ui-monospace,monospace\">~90 min</text></svg>",
    "stem": "A 400 MW unit trips and the BA deploys contingency reserve to recover ACE. Under the disturbance-control standard, the BA must then:",
    "options": [
      "Return interchange to pre-event levels within one minute",
      "Hold the deployed reserve indefinitely",
      "Restore its contingency reserve within the required period (about 90 minutes) to be ready for the next event",
      "Declare an Energy Emergency Alert"
    ],
    "answer": 2,
    "explain": "After using contingency reserve to survive a reportable disturbance, the Balancing Authority must replenish that reserve within the standard's recovery window (about 90 minutes) so it can withstand a subsequent contingency. Recovering ACE and restoring reserves are the two obligations.",
    "optFeedback": {
      "1": "Reserve must be restored, not held deployed, or the BA is exposed to the next event.",
      "3": "A single 400 MW unit trip handled by reserve does not by itself trigger an EEA."
    }
  },
  {
    "id": "q-b9-01",
    "module": "comms-coord",
    "section": "m7-three-part",
    "domain": "comms-data",
    "topic": "6b",
    "std": "COM-002-4",
    "difficulty": "application",
    "stem": "A reliability coordinator issues an operating instruction by radio. Three-part communication is complete when:",
    "options": [
      "The instruction is written in the shift log",
      "The issuer states the instruction once and moves on",
      "The receiver acknowledges with 'copy' and hangs up",
      "The receiver repeats the instruction back and the issuer confirms the repeat-back was correct"
    ],
    "answer": 3,
    "explain": "Three-part communication is issue, repeat back, confirm. The loop closes only when the issuer verifies the receiver's repeat-back was correct (or corrects it). A one-way statement or a bare acknowledgment does not confirm mutual understanding.",
    "optFeedback": {
      "0": "Logging is good practice but is separate from closing the three-part loop.",
      "2": "'Copy' is an acknowledgment but not a repeat-back; the content must be echoed and confirmed."
    }
  },
  {
    "id": "q-b9-02",
    "module": "operating-limits",
    "section": "m3-network-tools",
    "domain": "contingency",
    "topic": "5b",
    "std": "IRO-002-7",
    "difficulty": "application",
    "stem": "A state estimator has failed to solve (non-convergence) for the last several runs. Why does this matter to the operator?",
    "options": [
      "Real-time contingency analysis runs on the estimator's solved case, so its results may be stale or unavailable until it converges",
      "The estimator only affects billing, not reliability",
      "It has no operational impact as long as SCADA is up",
      "It automatically sheds load when it fails"
    ],
    "answer": 0,
    "explain": "The state estimator produces the solved, consistent network model that real-time contingency analysis depends on. If it will not converge, downstream contingency results are stale or missing, so the operator loses a key look-ahead tool and should treat the situation as degraded monitoring.",
    "optFeedback": {
      "1": "The estimator is a real-time reliability tool, not a settlement function.",
      "2": "SCADA gives raw telemetry; the estimator turns it into a solved case for analysis, so losing it degrades assessment even with SCADA up."
    }
  },
  {
    "id": "q-b9-03",
    "module": "operating-limits",
    "section": "m3-sol-irol",
    "domain": "transmission",
    "topic": "2e",
    "std": "FAC-011-4",
    "difficulty": "application",
    "stem": "Which statement best distinguishes a facility rating from a System Operating Limit (SOL)?",
    "options": [
      "They are identical terms",
      "A facility rating is one element's capability; an SOL is the value that keeps the system within reliable performance and may be set by a rating or by other limits",
      "An SOL applies only to generators; a facility rating only to lines",
      "A facility rating changes every hour; an SOL never changes"
    ],
    "answer": 1,
    "explain": "A facility rating is the demonstrated capability of one piece of equipment (thermal, for example). An SOL is the system-level limit for a set of conditions and may be governed by a facility rating, or by a voltage or stability limit, so the most binding consideration sets the SOL.",
    "optFeedback": {
      "0": "They are related but not the same; an SOL can be driven by limits other than a single facility's rating.",
      "2": "Both concepts apply across element types."
    }
  },
  {
    "id": "q-b9-04",
    "module": "emergency-ops",
    "section": "m5-capacity",
    "domain": "emergency-response",
    "topic": "4c",
    "std": "EOP-011-4",
    "difficulty": "application",
    "stem": "A Balancing Authority forecasts it cannot meet load plus reserve obligations for the upcoming peak despite all resources. The appropriate escalation is to:",
    "options": [
      "Wait until frequency actually drops before acting",
      "Immediately begin firm load shedding without notice",
      "Declare the appropriate Energy Emergency Alert level to signal the need and request assistance",
      "Reduce voltage schedules across the system permanently"
    ],
    "answer": 2,
    "explain": "The Energy Emergency Alert framework lets a BA communicate a developing capacity or energy shortfall and request help before it becomes a real-time crisis. Escalating the EEA level is the structured way to signal need; firm load shed is a later step within the higher alert levels, not the first move.",
    "optFeedback": {
      "0": "Waiting for a frequency drop forfeits the lead time the EEA process is designed to provide.",
      "1": "Firm load shed is a later, higher-level action; the EEA framework escalates before that."
    }
  },
  {
    "id": "q-b9-05",
    "module": "emergency-ops",
    "section": "m5-weather-gmd",
    "domain": "emergency-prep",
    "topic": "3b",
    "std": "EOP-010-1",
    "difficulty": "application",
    "stem": "A severe geomagnetic disturbance (GMD) is forecast. From an operator's standpoint, a key bulk-system concern is:",
    "options": [
      "GMD is a cyber threat handled by IT",
      "GMD only affects satellite TV and has no grid impact",
      "GMD increases line ratings, so no action is needed",
      "Geomagnetically induced currents can saturate transformers, causing heating and reactive-power/voltage problems"
    ],
    "answer": 3,
    "explain": "GMD drives quasi-DC geomagnetically induced currents into the grid through grounded transformer neutrals. These can half-cycle saturate large transformers, producing heating, harmonics, and heavy reactive absorption that depresses voltage, so operators watch reactive reserves and follow their GMD operating procedure.",
    "optFeedback": {
      "0": "GMD is a physical space-weather phenomenon, not a cyber event.",
      "1": "GMD has well-documented effects on transformers and voltage on the bulk system."
    }
  },
  {
    "id": "q-b9-06",
    "module": "comms-coord",
    "section": "m7-reporting",
    "domain": "comms-data",
    "topic": "6a",
    "std": "EOP-004-4",
    "difficulty": "recall",
    "stem": "Under the event-reporting standard, what most distinguishes a reportable event from a routine one?",
    "options": [
      "It meets defined thresholds (such as loss of firm load, generation, or facilities) that require reporting within set timeframes",
      "It is any event the operator personally finds interesting",
      "Only events that make the news must be reported",
      "Reporting is optional and left to utility discretion"
    ],
    "answer": 0,
    "explain": "The reporting standard lists specific event types and thresholds (losses of load, generation, or facilities, physical or cyber incidents, and so on), each with a required timeframe and recipient, so situational awareness is shared consistently rather than by discretion.",
    "optFeedback": {
      "2": "Media coverage is irrelevant; defined thresholds govern reportability.",
      "3": "Reporting defined events is mandatory, not discretionary."
    }
  },
  {
    "id": "q-b9-07",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1f",
    "difficulty": "application",
    "stem": "A next-day load forecast carries higher-than-usual uncertainty due to an approaching storm front. The prudent operating response is to:",
    "options": [
      "Commit exactly to the point forecast and make no adjustments",
      "Carry additional reserves and flexible resources, and refresh the forecast as conditions clarify",
      "Assume the lowest plausible load to minimize cost",
      "Cancel interchange schedules until the storm passes"
    ],
    "answer": 1,
    "explain": "When forecast uncertainty rises, operators hedge by positioning extra reserves and flexible, fast-ramping capacity and by refreshing the forecast as the weather resolves. Committing rigidly to one number, or betting on the low end, leaves the system exposed if actual load diverges.",
    "optFeedback": {
      "0": "A point forecast under high uncertainty is fragile; hedging is the prudent move.",
      "2": "Planning to the low end risks a capacity shortfall if load comes in high."
    }
  },
  {
    "id": "q-b9-08",
    "module": "voltage-reactive",
    "section": "m2-reactive-sources",
    "domain": "transmission",
    "topic": "2b",
    "std": "VAR-001-5",
    "difficulty": "application",
    "stem": "Voltage is sagging in a load pocket at the far end of a long transmission path. Why is local reactive support usually more effective than importing reactive power from a distant source?",
    "options": [
      "Distant sources always have surplus reactive capability",
      "Reactive power travels farther than real power with no losses",
      "Reactive power does not travel well over distance (the line's reactance consumes it), so support close to the low-voltage area is far more effective",
      "Voltage problems are unrelated to reactive power"
    ],
    "answer": 2,
    "explain": "Reactive power is effectively local: transporting MVAR over a reactive line incurs large reactive losses and voltage drop, so MVAR injected far away arrives greatly diminished. Correcting a voltage sag calls for reactive sources near the affected buses (capacitors, generators, condensers), which is why voltage is managed locally.",
    "optFeedback": {
      "1": "The opposite is true: reactive power suffers heavily over distance.",
      "3": "Voltage magnitude is tightly coupled to reactive power balance."
    }
  },
  {
    "id": "q-m2-006",
    "module": "voltage-reactive",
    "section": "m2-voltage-collapse",
    "domain": "transmission",
    "topic": "2b",
    "std": "VAR-001-5",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 340 150\" role=\"img\" aria-label=\"P-V nose curve with the operating point near the knee\"><line x1=\"40\" y1=\"20\" x2=\"40\" y2=\"124\" stroke=\"#2A3648\"/><line x1=\"40\" y1=\"124\" x2=\"322\" y2=\"124\" stroke=\"#2A3648\"/><text x=\"30\" y=\"30\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"end\">V</text><text x=\"316\" y=\"140\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"end\">P (load / transfer)</text><path d=\"M56,34 Q200,30 300,80 Q250,112 150,120\" fill=\"none\" stroke=\"#56C2E6\" stroke-width=\"2\"/><circle cx=\"291\" cy=\"72\" r=\"5\" fill=\"#E0A83E\"/><text x=\"291\" y=\"60\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">operating point</text><text x=\"305\" y=\"96\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">knee</text></svg>",
    "stem": "The P-V (nose) curve shows the operating point as load increases toward the knee. What does operating near the nose indicate, and what is the priority action?",
    "options": [
      "Nothing can be done; collapse is unavoidable at the knee",
      "There is ample margin; increase transfer to use the remaining capacity",
      "Voltage is fine because the point is still on the upper branch",
      "The system is near the voltage-stability limit; add reactive support or reduce transfer to move back up the curve"
    ],
    "answer": 3,
    "explain": "The nose of the P-V curve is the maximum power the path can deliver before voltage collapses. Operating near it means reactive reserves are nearly exhausted and a small load increase or contingency can push past the knee. The response is to restore margin: switch in reactive support, reduce the transfer, or shed load if needed.",
    "optFeedback": {
      "0": "Margin can be restored with reactive support or reduced transfer; collapse is not inevitable.",
      "1": "Near the knee there is little margin; increasing transfer moves toward collapse.",
      "2": "Sitting on the upper branch near the nose is the low-margin danger zone, not a safe condition."
    }
  },
  {
    "id": "q-m9-018",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1a",
    "std": "INT-009-3",
    "difficulty": "application",
    "diagram": "<svg viewBox=\"0 0 340 140\" role=\"img\" aria-label=\"Two Balancing Authorities with a scheduled interchange ramping from 200 to 300 megawatts\"><rect x=\"14\" y=\"30\" width=\"78\" height=\"42\" rx=\"5\" fill=\"#121821\" stroke=\"#556074\" stroke-width=\"1.5\"/><text x=\"53\" y=\"56\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"13\" text-anchor=\"middle\">BA A</text><rect x=\"248\" y=\"30\" width=\"78\" height=\"42\" rx=\"5\" fill=\"#121821\" stroke=\"#556074\" stroke-width=\"1.5\"/><text x=\"287\" y=\"56\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"13\" text-anchor=\"middle\">BA B</text><line x1=\"92\" y1=\"51\" x2=\"244\" y2=\"51\" stroke=\"#56C2E6\" stroke-width=\"2\"/><polygon points=\"238,46 250,51 238,56\" fill=\"#56C2E6\"/><text x=\"168\" y=\"44\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">interchange</text><polyline points=\"110,120 150,120 190,98 230,98\" fill=\"none\" stroke=\"#E0A83E\" stroke-width=\"2\"/><text x=\"120\" y=\"114\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\">200</text><text x=\"216\" y=\"92\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\">300 MW</text><text x=\"170\" y=\"134\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">10-min ramp @ :00</text></svg>",
    "stem": "A confirmed interchange schedule between BA A and BA B rises from 200 to 300 MW across a 10-minute ramp centered on the top of the hour. To keep ACE from spiking, each BA should:",
    "options": [
      "Ramp its own generation to match the scheduled interchange change over the ramp period, not step it at the hour",
      "Wait until the top of the hour, then step generation by 100 MW instantly",
      "Ignore the ramp; AGC alone will absorb the entire change",
      "Cancel the schedule to avoid the ramp"
    ],
    "answer": 0,
    "explain": "Interchange changes are ramped, and each BA moves its own generation along the same ramp so actual interchange tracks the schedule. Stepping at the hour, or leaning on AGC to catch a 100 MW change, drives large transient ACE and frequency excursions - the top-of-the-hour effect the ramp is designed to prevent.",
    "optFeedback": {
      "1": "A 100 MW instantaneous step is exactly what causes the top-of-hour ACE and frequency spike.",
      "2": "AGC trims the balance; it should not be left to absorb a whole scheduled 100 MW change."
    }
  },
  {
    "id": "q-m3-013",
    "module": "operating-limits",
    "section": "m3-sol-irol",
    "domain": "contingency",
    "topic": "5e",
    "std": "IRO-009-2",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 340 140\" role=\"img\" aria-label=\"An interface where loss of Line X would exceed an Interconnection Reliability Operating Limit\"><rect x=\"14\" y=\"40\" width=\"70\" height=\"52\" rx=\"5\" fill=\"#121821\" stroke=\"#556074\" stroke-width=\"1.5\"/><text x=\"49\" y=\"70\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"12\" text-anchor=\"middle\">AREA 1</text><rect x=\"256\" y=\"40\" width=\"70\" height=\"52\" rx=\"5\" fill=\"#121821\" stroke=\"#556074\" stroke-width=\"1.5\"/><text x=\"291\" y=\"70\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"12\" text-anchor=\"middle\">AREA 2</text><line x1=\"84\" y1=\"52\" x2=\"256\" y2=\"52\" stroke=\"#E0A83E\" stroke-width=\"2.5\"/><text x=\"170\" y=\"46\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">LINE X</text><line x1=\"84\" y1=\"66\" x2=\"256\" y2=\"66\" stroke=\"#7E8DA0\" stroke-width=\"1.5\"/><line x1=\"84\" y1=\"80\" x2=\"256\" y2=\"80\" stroke=\"#7E8DA0\" stroke-width=\"1.5\"/><text x=\"170\" y=\"106\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">loss of Line X would exceed IROL</text><text x=\"170\" y=\"122\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Tv = 30 min</text></svg>",
    "stem": "Contingency analysis shows that for the current flow on this interface, loss of Line X would exceed an Interconnection Reliability Operating Limit (IROL). The system is presently within limits. What must the operator do?",
    "options": [
      "Take no action, because the system is within limits right now",
      "Act now to reduce exposure so the system can survive the loss, and be ready to return within the IROL inside its Tv (generally 30 minutes) if it occurs",
      "Wait for the contingency to actually happen before doing anything",
      "Treat it as a normal SOL with no time limit"
    ],
    "answer": 1,
    "explain": "An IROL carries a maximum time (Tv, generally 30 minutes) the system may remain beyond it after the contingency, because the consequences are wide-area (cascading, instability, uncontrolled separation). Even while currently within limits, a credible contingency that would breach the IROL requires pre-positioning - redispatch or reduced transfer - so the system can ride through, plus prompt action to return within Tv if it occurs.",
    "optFeedback": {
      "0": "Being within limits now is not enough; the operator must prepare for the credible contingency that would breach an IROL.",
      "2": "IROLs are managed proactively; waiting for the event forfeits the ability to survive it.",
      "3": "An IROL is distinguished from an ordinary SOL precisely by its time limit (Tv) and wide-area consequences."
    }
  },
  {
    "id": "q-m1-015",
    "module": "transmission-ops",
    "section": "m1-powerflow",
    "domain": "transmission",
    "topic": "2c",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 340 130\" role=\"img\" aria-label=\"Two parallel lines from Bus A to Bus B with different impedances\"><line x1=\"46\" y1=\"24\" x2=\"46\" y2=\"106\" stroke=\"#C9D6E4\" stroke-width=\"3\"/><text x=\"46\" y=\"120\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">BUS A</text><line x1=\"294\" y1=\"24\" x2=\"294\" y2=\"106\" stroke=\"#C9D6E4\" stroke-width=\"3\"/><text x=\"294\" y=\"120\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">BUS B</text><line x1=\"46\" y1=\"45\" x2=\"294\" y2=\"45\" stroke=\"#56C2E6\" stroke-width=\"3\"/><text x=\"170\" y=\"38\" fill=\"#56C2E6\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">LINE 1   Z</text><line x1=\"46\" y1=\"85\" x2=\"294\" y2=\"85\" stroke=\"#7E8DA0\" stroke-width=\"1.5\"/><text x=\"170\" y=\"100\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">LINE 2   2Z</text><text x=\"18\" y=\"66\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">900</text><text x=\"18\" y=\"77\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">MW</text></svg>",
    "stem": "Two parallel lines connect Bus A to Bus B. Line 1 has half the impedance of Line 2, as shown. Ignoring losses, how does 900 MW of A-to-B flow divide?",
    "options": [
      "About 300 MW on Line 1 and 600 MW on Line 2",
      "450 MW on each line, since they are in parallel",
      "About 600 MW on Line 1 and 300 MW on Line 2 - the lower-impedance path carries proportionally more",
      "All 900 MW on Line 2 because it has higher impedance"
    ],
    "answer": 2,
    "explain": "Power divides between parallel paths in inverse proportion to their impedances. With Line 1 at half the impedance of Line 2, it carries twice the flow - about 600 MW versus 300 MW. Operators cannot steer real power onto a chosen path; it follows the physics, which is why one line can overload while a parallel one sits underused.",
    "optFeedback": {
      "0": "The lower-impedance line carries more, not less - this reverses the ratio.",
      "1": "Equal split assumes equal impedance; here they differ 2 to 1.",
      "3": "Higher impedance carries less flow, and none of it is forced entirely onto one line."
    }
  },
  {
    "id": "q-m4-005",
    "module": "protection",
    "section": "m4-coordination",
    "domain": "transmission",
    "topic": "2a",
    "std": "PRC-004-6",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 340 130\" role=\"img\" aria-label=\"Fault on a line where a breaker fails and backup protection trips surrounding breakers\"><rect x=\"14\" y=\"48\" width=\"52\" height=\"34\" rx=\"4\" fill=\"#121821\" stroke=\"#556074\"/><text x=\"40\" y=\"69\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">STA 1</text><rect x=\"274\" y=\"48\" width=\"52\" height=\"34\" rx=\"4\" fill=\"#121821\" stroke=\"#556074\"/><text x=\"300\" y=\"69\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">STA 2</text><line x1=\"66\" y1=\"65\" x2=\"274\" y2=\"65\" stroke=\"#7E8DA0\" stroke-width=\"1.5\"/><rect x=\"86\" y=\"59\" width=\"12\" height=\"12\" fill=\"#E5484D\"/><text x=\"92\" y=\"50\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">FAILED</text><rect x=\"242\" y=\"59\" width=\"12\" height=\"12\" fill=\"#E0A83E\"/><text x=\"248\" y=\"50\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">backup</text><path d=\"M164,56 l8,9 l-5,0 l7,10 l-11,-8 l5,0 z\" fill=\"#E5484D\"/><text x=\"170\" y=\"92\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">fault</text></svg>",
    "stem": "A fault occurs on the line as shown. The primary relay operates but its breaker fails to open. What clears the fault, and what is the consequence?",
    "options": [
      "The primary relay retries automatically until the breaker opens",
      "The fault clears itself once load drops",
      "Nothing operates, so the fault persists indefinitely",
      "Breaker-failure or remote backup protection trips the surrounding breakers, clearing the fault but removing more elements than a normal trip"
    ],
    "answer": 3,
    "explain": "When a breaker fails to interrupt, breaker-failure protection (or remote backup at adjacent stations) trips the next breakers in to isolate the fault. It works, but it de-energizes a wider zone than a clean primary trip - more lines or a whole bus - which is why breaker-failure events tend to be larger disturbances.",
    "optFeedback": {
      "0": "Protection does not retry a stuck breaker; backup schemes take over.",
      "1": "A short circuit does not clear by itself; protection must interrupt it."
    }
  },
  {
    "id": "q-m4-006",
    "module": "protection",
    "section": "m4-ras-misop",
    "domain": "transmission",
    "topic": "2a",
    "std": "PRC-012-2",
    "difficulty": "application",
    "diagram": "<svg viewBox=\"0 0 340 125\" role=\"img\" aria-label=\"A Remedial Action Scheme armed to trip generation when a key line is lost\"><rect x=\"14\" y=\"50\" width=\"56\" height=\"32\" rx=\"4\" fill=\"#121821\" stroke=\"#556074\"/><text x=\"42\" y=\"70\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">AREA</text><line x1=\"70\" y1=\"66\" x2=\"196\" y2=\"66\" stroke=\"#E0A83E\" stroke-width=\"2.5\"/><text x=\"133\" y=\"58\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">key line</text><rect x=\"150\" y=\"92\" width=\"92\" height=\"22\" rx=\"3\" fill=\"#0B0F14\" stroke=\"#56C2E6\"/><text x=\"196\" y=\"107\" fill=\"#56C2E6\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">RAS ARMED</text><circle cx=\"252\" cy=\"66\" r=\"16\" fill=\"none\" stroke=\"#7E8DA0\" stroke-width=\"1.5\"/><text x=\"252\" y=\"70\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">G</text><line x1=\"200\" y1=\"92\" x2=\"240\" y2=\"78\" stroke=\"#E5484D\" stroke-width=\"1.5\" stroke-dasharray=\"3 3\"/><text x=\"292\" y=\"63\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">trip</text><text x=\"292\" y=\"74\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">gen</text></svg>",
    "stem": "A Remedial Action Scheme (RAS) is armed for the interface shown. When it detects loss of the key line, it automatically:",
    "options": [
      "Takes pre-planned action (such as tripping generation or shedding load) within seconds to keep the remaining system within limits",
      "Sends an alarm and waits for the operator to decide",
      "Increases generation to make up for the lost line",
      "Has no effect until the next contingency-analysis run"
    ],
    "answer": 0,
    "explain": "A RAS/SPS is armed to detect a defined condition and take automatic, pre-engineered action - commonly tripping generation, shedding load, or reconfiguring - fast enough to prevent a limit violation or instability that operators could not catch manually. It acts on its own; it does not wait for a human or the next analysis cycle.",
    "optFeedback": {
      "1": "A RAS acts automatically; alarm-and-wait would be too slow for what it guards against.",
      "2": "A RAS relieves the stressed condition (often by reducing generation or load), not by adding generation into an overload."
    }
  },
  {
    "id": "q-m2-007",
    "module": "voltage-reactive",
    "section": "m2-voltage-schedules",
    "domain": "transmission",
    "topic": "2b",
    "std": "VAR-001-5",
    "difficulty": "application",
    "diagram": "<svg viewBox=\"0 0 340 130\" role=\"img\" aria-label=\"A transformer with an on-load tap changer regulating a low load-side voltage\"><text x=\"60\" y=\"34\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">138 kV</text><line x1=\"60\" y1=\"38\" x2=\"60\" y2=\"62\" stroke=\"#7E8DA0\" stroke-width=\"1.5\"/><circle cx=\"60\" cy=\"74\" r=\"14\" fill=\"none\" stroke=\"#56C2E6\" stroke-width=\"1.5\"/><circle cx=\"60\" cy=\"92\" r=\"14\" fill=\"none\" stroke=\"#56C2E6\" stroke-width=\"1.5\"/><text x=\"92\" y=\"70\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"9\">LTC</text><line x1=\"96\" y1=\"94\" x2=\"120\" y2=\"84\" stroke=\"#E0A83E\" stroke-width=\"1.5\"/><polygon points=\"120,84 112,84 118,90\" fill=\"#E0A83E\"/><text x=\"140\" y=\"82\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"9\">raise tap</text><line x1=\"60\" y1=\"106\" x2=\"60\" y2=\"116\" stroke=\"#7E8DA0\" stroke-width=\"1.5\"/><line x1=\"34\" y1=\"116\" x2=\"86\" y2=\"116\" stroke=\"#C9D6E4\" stroke-width=\"2\"/><text x=\"210\" y=\"112\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"10\">load-bus voltage low</text></svg>",
    "stem": "Secondary voltage at the load bus is low. The transformer has an on-load tap changer (LTC) as shown. Raising the tap will:",
    "options": [
      "Increase the real power the transformer can carry",
      "Adjust the turns ratio to raise the load-side voltage toward its schedule",
      "Lower the load-side voltage further",
      "Change the system frequency"
    ],
    "answer": 1,
    "explain": "An LTC changes the transformer turns ratio in steps under load, trading a little primary-side voltage for a higher regulated secondary voltage. It is a voltage-control tool, not a way to add MW capacity or affect frequency, and it works within a limited tap range before other reactive support is needed.",
    "optFeedback": {
      "0": "Tap changing regulates voltage, not thermal or MW capability.",
      "3": "Frequency is set by the generation-load balance, not by transformer taps."
    }
  },
  {
    "id": "q-m3-014",
    "module": "operating-limits",
    "section": "m3-response",
    "domain": "contingency",
    "topic": "5c",
    "std": "TOP-001-6",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 340 128\" role=\"img\" aria-label=\"One line already out for maintenance where the next single contingency would overload a remaining line\"><line x1=\"40\" y1=\"20\" x2=\"40\" y2=\"108\" stroke=\"#C9D6E4\" stroke-width=\"2\"/><line x1=\"300\" y1=\"20\" x2=\"300\" y2=\"108\" stroke=\"#C9D6E4\" stroke-width=\"2\"/><line x1=\"40\" y1=\"36\" x2=\"300\" y2=\"36\" stroke=\"#7E8DA0\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/><line x1=\"156\" y1=\"28\" x2=\"176\" y2=\"44\" stroke=\"#7E8DA0\"/><line x1=\"176\" y1=\"28\" x2=\"156\" y2=\"44\" stroke=\"#7E8DA0\"/><text x=\"230\" y=\"32\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\">out for maint.</text><line x1=\"40\" y1=\"68\" x2=\"300\" y2=\"68\" stroke=\"#E0A83E\" stroke-width=\"2.5\"/><text x=\"170\" y=\"61\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">would overload if next line is lost</text><line x1=\"40\" y1=\"96\" x2=\"300\" y2=\"96\" stroke=\"#3FB98C\" stroke-width=\"1.5\"/></svg>",
    "stem": "One line is already out of service for maintenance. Contingency analysis shows the next single contingency would now overload a remaining line, as shown. The operator should:",
    "options": [
      "Wait until a second element actually fails",
      "Do nothing, because only one element is currently out",
      "Restore N-1 security - redispatch, reconfigure, or reduce transfer so the system can survive the next single contingency",
      "Force the maintenance line back into service immediately regardless of the work"
    ],
    "answer": 2,
    "explain": "With one element already out, the system must still be secure for the next single contingency (N-1). If analysis shows a post-contingency overload, the operator acts now - redispatch, switching, or reduced transfer - to re-establish that margin, rather than waiting for the second loss or forcing the maintenance line back.",
    "optFeedback": {
      "0": "Waiting for the second loss forfeits the margin the operator is required to maintain.",
      "1": "N-1 security must hold even with an element already out; current single-outage status is not the test."
    }
  },
  {
    "id": "q-m3-015",
    "module": "operating-limits",
    "section": "m3-contingency-analysis",
    "domain": "contingency",
    "topic": "5a",
    "std": "IRO-008-3",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 340 120\" role=\"img\" aria-label=\"A cascade in which Line 1 trips, Line 2 overloads and trips, then Line 3 overloads\"><line x1=\"20\" y1=\"55\" x2=\"90\" y2=\"55\" stroke=\"#E5484D\" stroke-width=\"3\"/><text x=\"55\" y=\"46\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">L1 trips</text><polygon points=\"96,50 108,55 96,60\" fill=\"#7E8DA0\"/><line x1=\"120\" y1=\"55\" x2=\"190\" y2=\"55\" stroke=\"#E0A83E\" stroke-width=\"3\"/><text x=\"155\" y=\"46\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">L2 overloads</text><text x=\"155\" y=\"72\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">then trips</text><polygon points=\"196,50 208,55 196,60\" fill=\"#7E8DA0\"/><line x1=\"220\" y1=\"55\" x2=\"290\" y2=\"55\" stroke=\"#E0A83E\" stroke-width=\"3\"/><text x=\"255\" y=\"46\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">L3 overloads</text><text x=\"170\" y=\"100\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">successive overloads spread outward</text></svg>",
    "stem": "Analysis shows that losing Line 1 overloads Line 2, and if Line 2 then trips, Line 3 overloads - the pattern shown. This sequence is a concern because it could lead to:",
    "options": [
      "A permanent reduction in load-forecast error",
      "An improvement in system reliability",
      "Higher system frequency",
      "Cascading outages - successive overloads and trips spreading beyond the initial contingency"
    ],
    "answer": 3,
    "explain": "A chain in which one element trips, overloading the next, which trips and overloads another, is the signature of a cascade. Preventing cascading outages is a core reliability objective, so operators relieve the first overload promptly rather than letting the sequence propagate.",
    "optFeedback": {
      "1": "Successive overloads degrade reliability toward a cascade, not improve it.",
      "2": "Cascading is a thermal/overload phenomenon, unrelated to raising frequency."
    }
  },
  {
    "id": "q-m9-019",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1d",
    "std": "BAL-005-1",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 340 140\" role=\"img\" aria-label=\"A Balancing Authority with three tie lines showing actual and scheduled flows\"><rect x=\"140\" y=\"54\" width=\"64\" height=\"34\" rx=\"5\" fill=\"#121821\" stroke=\"#56C2E6\" stroke-width=\"1.5\"/><text x=\"172\" y=\"75\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">BA</text><line x1=\"140\" y1=\"60\" x2=\"46\" y2=\"30\" stroke=\"#7E8DA0\"/><text x=\"86\" y=\"24\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">T1 A120 S100</text><line x1=\"140\" y1=\"82\" x2=\"46\" y2=\"112\" stroke=\"#7E8DA0\"/><text x=\"86\" y=\"126\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">T2 A80 S100</text><line x1=\"204\" y1=\"71\" x2=\"300\" y2=\"71\" stroke=\"#7E8DA0\"/><text x=\"300\" y=\"63\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"end\">T3 A-30 S-20</text><text x=\"172\" y=\"108\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">+ = export (MW)</text></svg>",
    "stem": "A BA has three tie lines with the actual and scheduled flows shown (positive = export). Its net actual interchange versus net scheduled is:",
    "options": [
      "Net actual 170 MW vs net scheduled 180 MW - a -10 MW interchange contribution to ACE",
      "Net actual 180 MW vs scheduled 170 MW - a +10 MW contribution",
      "The ties cancel, so interchange contributes 0 to ACE",
      "Only the largest tie counts, so the contribution is +20 MW"
    ],
    "answer": 0,
    "explain": "Net interchange is the algebraic sum across all ties. Actual = 120 + 80 - 30 = 170 MW; scheduled = 100 + 100 - 20 = 180 MW. The interchange term of ACE is (actual - scheduled) = -10 MW, meaning the BA is importing 10 MW more (or exporting 10 less) than scheduled, before the frequency-bias term is applied.",
    "optFeedback": {
      "1": "This swaps actual and scheduled; actual is 170, scheduled 180.",
      "2": "The ties do not cancel; you sum them algebraically to a net, not zero.",
      "3": "All ties count, summed algebraically, not just the largest."
    }
  },
  {
    "id": "q-m9-020",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1b",
    "std": "BAL-002-3",
    "difficulty": "application",
    "diagram": "<svg viewBox=\"0 0 340 140\" role=\"img\" aria-label=\"A reserve-sharing group of three Balancing Authorities drawing on a shared reserve pool\"><rect x=\"120\" y=\"54\" width=\"100\" height=\"30\" rx=\"5\" fill=\"#0B0F14\" stroke=\"#3FB98C\" stroke-width=\"1.5\"/><text x=\"170\" y=\"73\" fill=\"#3FB98C\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">SHARED RESERVE</text><rect x=\"20\" y=\"20\" width=\"54\" height=\"26\" rx=\"4\" fill=\"#121821\" stroke=\"#E5484D\"/><text x=\"47\" y=\"37\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">BA 1</text><text x=\"47\" y=\"14\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">unit lost</text><rect x=\"20\" y=\"98\" width=\"54\" height=\"26\" rx=\"4\" fill=\"#121821\" stroke=\"#556074\"/><text x=\"47\" y=\"115\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">BA 2</text><rect x=\"266\" y=\"58\" width=\"54\" height=\"26\" rx=\"4\" fill=\"#121821\" stroke=\"#556074\"/><text x=\"293\" y=\"75\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">BA 3</text><line x1=\"74\" y1=\"33\" x2=\"140\" y2=\"60\" stroke=\"#7E8DA0\"/><line x1=\"74\" y1=\"111\" x2=\"140\" y2=\"78\" stroke=\"#7E8DA0\"/><line x1=\"220\" y1=\"70\" x2=\"266\" y2=\"71\" stroke=\"#7E8DA0\"/></svg>",
    "stem": "Several BAs belong to a reserve-sharing group as shown. When one member loses a large unit, the arrangement lets it:",
    "options": [
      "Ignore its own reserve obligation permanently",
      "Draw on the group's shared contingency reserve to recover, spreading the burden across members",
      "Force neighboring systems offline",
      "Avoid ever restoring the reserve it used"
    ],
    "answer": 1,
    "explain": "A reserve-sharing group lets members pool contingency reserve so a single large loss can be covered collectively rather than each BA carrying the full amount alone. The affected member still must recover ACE and, with the group, restore the reserve that was deployed for the next event.",
    "optFeedback": {
      "0": "Sharing distributes the obligation; it does not eliminate it.",
      "3": "Deployed reserve must still be restored within the recovery window."
    }
  },
  {
    "id": "q-m9-021",
    "module": "balancing",
    "section": "m9-balance-frequency",
    "domain": "balancing",
    "topic": "1e",
    "std": "BAL-003-2",
    "difficulty": "analysis",
    "diagram": "<svg viewBox=\"0 0 340 130\" role=\"img\" aria-label=\"Interconnection frequency settles at a lower value after loss of 800 megawatts\"><line x1=\"30\" y1=\"24\" x2=\"30\" y2=\"108\" stroke=\"#2A3648\"/><line x1=\"30\" y1=\"108\" x2=\"322\" y2=\"108\" stroke=\"#2A3648\"/><line x1=\"30\" y1=\"40\" x2=\"322\" y2=\"40\" stroke=\"#2A3648\" stroke-dasharray=\"3 4\"/><text x=\"300\" y=\"36\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\">60.000</text><polyline points=\"30,40 130,40 175,82 240,82 320,82\" fill=\"none\" stroke=\"#56C2E6\" stroke-width=\"2\"/><line x1=\"130\" y1=\"24\" x2=\"130\" y2=\"108\" stroke=\"#E5484D\" stroke-dasharray=\"2 3\"/><text x=\"130\" y=\"20\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">loss 800 MW</text><text x=\"250\" y=\"98\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">settles 59.960</text></svg>",
    "stem": "Loss of 800 MW causes Interconnection frequency to settle at 59.960 Hz (from 60.000) after primary response, as shown. The Interconnection frequency response is approximately:",
    "options": [
      "Zero, because frequency recovered",
      "About 800 MW per 0.1 Hz",
      "About 800 MW per 0.04 Hz, or roughly 2,000 MW per 0.1 Hz of decline",
      "Exactly 60 Hz regardless of the loss"
    ],
    "answer": 2,
    "explain": "Frequency response relates the resource loss to the settled deviation: 800 MW over a 0.040 Hz drop is about 20,000 MW/Hz, or roughly 2,000 MW per 0.1 Hz. A stiffer (larger) response means a smaller dip for the same loss, which is why adequate primary frequency response is a reliability concern.",
    "optFeedback": {
      "0": "This is the settled value after primary response, before AGC restores 60 Hz - the response is not zero.",
      "1": "That understates it; 800 MW produced a 0.04 Hz drop, so per 0.1 Hz the response is about 2,000 MW."
    }
  },
  {
    "id": "q-m6-001",
    "module": "restoration",
    "section": "m6-restoration",
    "domain": "emergency-response",
    "topic": "4a",
    "std": "EOP-005-3",
    "difficulty": "recall",
    "diagram": "<svg viewBox=\"0 0 340 120\" role=\"img\" aria-label=\"A blackstart unit energizes a cranking path to start a larger non-blackstart unit\"><circle cx=\"46\" cy=\"58\" r=\"20\" fill=\"none\" stroke=\"#3FB98C\" stroke-width=\"1.5\"/><text x=\"46\" y=\"62\" fill=\"#3FB98C\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">BS</text><text x=\"46\" y=\"92\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">blackstart</text><line x1=\"66\" y1=\"58\" x2=\"248\" y2=\"58\" stroke=\"#56C2E6\" stroke-width=\"2\"/><polygon points=\"242,53 254,58 242,63\" fill=\"#56C2E6\"/><text x=\"158\" y=\"48\" fill=\"#56C2E6\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">cranking path (station power)</text><circle cx=\"286\" cy=\"58\" r=\"24\" fill=\"none\" stroke=\"#7E8DA0\" stroke-width=\"1.5\"/><text x=\"286\" y=\"62\" fill=\"#C9D6E4\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">GEN</text><text x=\"286\" y=\"94\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">next unit</text></svg>",
    "stem": "During restoration, a blackstart unit must energize a path to start a larger non-blackstart unit, as shown. The cranking path is:",
    "options": [
      "A backup communication circuit",
      "The distribution feeder serving the control center",
      "The billing path for interchange energy",
      "The pre-planned transmission route that delivers station power from the blackstart source to the next generating unit"
    ],
    "answer": 3,
    "explain": "A cranking path is the designated transmission route that carries auxiliary (station-service) power from a blackstart resource to a non-blackstart unit so it can start. Restoration plans pre-identify these paths, along with voltage control and load steps, so the grid is rebuilt in a controlled sequence.",
    "optFeedback": {
      "1": "The cranking path is a bulk transmission route for station power, not a distribution feeder.",
      "2": "It is a physical energization route, not a settlement or billing construct."
    }
  },
  {
    "id": "q-m6-002",
    "module": "restoration",
    "section": "m6-islanding",
    "domain": "emergency-response",
    "topic": "4a",
    "std": "EOP-005-3",
    "difficulty": "application",
    "diagram": "<svg viewBox=\"0 0 340 130\" role=\"img\" aria-label=\"An open breaker between two energized sections with a synchroscope\"><line x1=\"30\" y1=\"30\" x2=\"30\" y2=\"100\" stroke=\"#C9D6E4\" stroke-width=\"2\"/><text x=\"30\" y=\"114\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">SIDE A</text><line x1=\"310\" y1=\"30\" x2=\"310\" y2=\"100\" stroke=\"#C9D6E4\" stroke-width=\"2\"/><text x=\"310\" y=\"114\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">SIDE B</text><line x1=\"30\" y1=\"65\" x2=\"120\" y2=\"65\" stroke=\"#7E8DA0\" stroke-width=\"1.5\"/><line x1=\"222\" y1=\"65\" x2=\"310\" y2=\"65\" stroke=\"#7E8DA0\" stroke-width=\"1.5\"/><rect x=\"120\" y=\"59\" width=\"14\" height=\"12\" fill=\"none\" stroke=\"#E0A83E\"/><text x=\"127\" y=\"50\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">open</text><circle cx=\"176\" cy=\"65\" r=\"22\" fill=\"#0B0F14\" stroke=\"#56C2E6\"/><line x1=\"176\" y1=\"65\" x2=\"192\" y2=\"53\" stroke=\"#56C2E6\" stroke-width=\"1.5\"/><text x=\"176\" y=\"100\" fill=\"#56C2E6\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">synchroscope</text><text x=\"176\" y=\"24\" fill=\"#7E8DA0\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">match V, f, angle</text></svg>",
    "stem": "Before closing the open breaker to tie the two energized sections shown, the operator must confirm that across the breaker:",
    "options": [
      "Voltage magnitude, frequency, and phase angle are matched within limits (near in phase) before closing",
      "Only the voltages match; frequency and phase do not matter",
      "The two sides are as far out of phase as possible",
      "Load is zero everywhere on both sides"
    ],
    "answer": 0,
    "explain": "Paralleling two energized systems requires matching voltage magnitude, frequency, and phase angle within permitted windows - closing out of synchronism can damage machines and cause a severe disturbance. The synchroscope or sync-check confirms the sources are close enough (near in phase) before the breaker is closed.",
    "optFeedback": {
      "1": "Frequency and phase alignment matter as much as voltage; closing on a phase difference is damaging.",
      "2": "Closing out of phase is exactly what synchronizing is meant to prevent."
    }
  },
  {
    "id": "q-em-027",
    "module": "emergency-ops",
    "section": "m5-disturbances",
    "domain": "emergency-response",
    "topic": "4b",
    "std": "PRC-006-5",
    "difficulty": "application",
    "diagram": "<svg viewBox=\"0 0 340 130\" role=\"img\" aria-label=\"Frequency declining through under-frequency load-shedding thresholds\"><line x1=\"30\" y1=\"20\" x2=\"30\" y2=\"104\" stroke=\"#2A3648\"/><line x1=\"30\" y1=\"104\" x2=\"322\" y2=\"104\" stroke=\"#2A3648\"/><polyline points=\"30,30 90,34 150,52 210,72 290,92\" fill=\"none\" stroke=\"#56C2E6\" stroke-width=\"2\"/><line x1=\"30\" y1=\"50\" x2=\"322\" y2=\"50\" stroke=\"#E0A83E\" stroke-dasharray=\"3 4\"/><text x=\"320\" y=\"46\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"end\">59.3  shed block 1</text><line x1=\"30\" y1=\"70\" x2=\"322\" y2=\"70\" stroke=\"#E0A83E\" stroke-dasharray=\"3 4\"/><text x=\"320\" y=\"66\" fill=\"#E0A83E\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"end\">59.0  shed block 2</text><line x1=\"30\" y1=\"90\" x2=\"322\" y2=\"90\" stroke=\"#E5484D\" stroke-dasharray=\"3 4\"/><text x=\"320\" y=\"86\" fill=\"#E5484D\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"end\">58.7  shed block 3</text></svg>",
    "stem": "As Interconnection frequency declines past the successive thresholds shown, automatic Under-Frequency Load Shedding (UFLS):",
    "options": [
      "Adds load to raise frequency",
      "Sheds preset blocks of load in stages at each threshold to arrest the decline and protect the system",
      "Trips all generation to protect the units",
      "Waits for the operator to shed load manually"
    ],
    "answer": 1,
    "explain": "UFLS is a last-resort automatic scheme: as frequency falls through defined set points, relays drop preset blocks of load in steps, reducing demand to rebalance against available generation and halt the decline. It acts automatically and in stages, buying time and preventing a wider collapse.",
    "optFeedback": {
      "0": "Shedding load reduces demand to raise frequency; adding load would worsen the decline.",
      "2": "UFLS sheds load, not generation; tripping generation would deepen the imbalance."
    }
  },
  {
    "id": "q-m9-022",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1a",
    "std": "INT-009-3",
    "difficulty": "recall",
    "stem": "In NERC terms, 'interchange' refers to:",
    "options": [
      "The frequency difference between two Interconnections",
      "The reactive power exchanged between generators",
      "Energy scheduled to flow between Balancing Authorities under an agreed transaction",
      "The physical bus where two lines connect"
    ],
    "answer": 2,
    "explain": "Interchange is the scheduled transfer of energy between Balancing Authorities, arranged and confirmed through the interchange process. It is a scheduled MW quantity, not a reactive, frequency, or physical-bus concept.",
    "optFeedback": {
      "1": "That describes reactive exchange, not interchange.",
      "3": "That is a bus — a physical connection point — not a scheduled energy transfer."
    }
  },
  {
    "id": "q-m9-023",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1a",
    "std": "INT-009-3",
    "difficulty": "application",
    "stem": "Which sequence describes the interchange scheduling process?",
    "options": [
      "Schedule, meter, then bill it",
      "Implement, then confirm and arrange it",
      "Confirm, curtail, then request it",
      "Request, arrange, confirm, then implement the interchange"
    ],
    "answer": 3,
    "explain": "Interchange follows request, arrange, confirm, then implement, coordinated among the source and sink BAs and any intermediary, so all parties agree before energy flows. Metering and accounting happen after the fact.",
    "optFeedback": {
      "0": "Those are after-the-fact accounting steps, not the scheduling sequence.",
      "1": "Implementation is last, after the transaction is confirmed."
    }
  },
  {
    "id": "q-m9-024",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1a",
    "std": "INT-009-3",
    "difficulty": "analysis",
    "stem": "A confirmed interchange schedule would push a tie line beyond its limit. The reliability-based action is to:",
    "options": [
      "Curtail (reduce) the interchange so the transfer stays within limits",
      "Increase the schedule to force the flow through",
      "Ignore the limit because the schedule is confirmed",
      "Raise system frequency to create more room"
    ],
    "answer": 0,
    "explain": "A confirmed schedule never overrides a reliability limit. When interchange would cause a limit violation, it is curtailed (for example through transmission-loading-relief procedures) to keep flows within limits — reliability takes precedence over the transaction.",
    "optFeedback": {
      "2": "A confirmed schedule does not override a reliability limit.",
      "3": "Frequency is not a lever for a tie line's thermal limit."
    }
  },
  {
    "id": "q-m9-025",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1b",
    "std": "BAL-002-3",
    "difficulty": "recall",
    "stem": "Spinning reserve differs from non-spinning (supplemental) reserve in that spinning reserve is:",
    "options": [
      "Offline capacity that takes longer to start and synchronize",
      "Already synchronized to the system and able to respond within seconds to minutes",
      "Reactive capability held for voltage support",
      "Energy stored purely for billing reconciliation"
    ],
    "answer": 1,
    "explain": "Spinning reserve is unloaded capacity on units already synchronized and quick to respond; non-spinning (supplemental) reserve is capacity not yet synchronized that can be brought on within a required time. Both are forms of operating (contingency) reserve.",
    "optFeedback": {
      "0": "That describes non-spinning / supplemental reserve.",
      "2": "Reserve here is a real-power (MW) concept, not reactive."
    }
  },
  {
    "id": "q-m9-026",
    "module": "balancing",
    "section": "m9-reserves-interchange",
    "domain": "balancing",
    "topic": "1b",
    "std": "BAL-002-3",
    "difficulty": "application",
    "stem": "Operating (contingency) reserve is carried primarily to:",
    "options": [
      "Reduce the cost of scheduled interchange",
      "Improve the power factor on tie lines",
      "Cover the sudden loss of the largest contingency — a unit or import — and restore balance",
      "Increase nominal system voltage"
    ],
    "answer": 2,
    "explain": "Operating reserve exists so the BA or reserve-sharing group can absorb the largest single contingency, recover ACE, and be ready for the next event. It is a reliability margin, not an economic or voltage tool.",
    "optFeedback": {
      "0": "Reserve is about reliability margin, not transaction cost.",
      "1": "Reserve is a real-power margin, not a power-factor tool."
    }
  },
  {
    "id": "q-m9-027",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1c",
    "std": "BAL-005-1",
    "difficulty": "recall",
    "stem": "Automatic Generation Control (AGC) automatically:",
    "options": [
      "Files interchange schedules with neighbors",
      "Opens breakers to isolate faults",
      "Sets transformer taps for voltage",
      "Adjusts the output of regulating units to hold ACE near zero"
    ],
    "answer": 3,
    "explain": "AGC is the control loop that continuously trims regulating generation to keep ACE near zero — balancing generation against load plus scheduled interchange, adjusted for frequency bias. It does not perform protection, tap control, or scheduling.",
    "optFeedback": {
      "1": "That is protection, not AGC.",
      "2": "Tap control is voltage regulation, separate from AGC."
    }
  },
  {
    "id": "q-m9-028",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1c",
    "std": "BAL-005-1",
    "difficulty": "application",
    "stem": "A unit is described as being 'on AGC.' This means the unit:",
    "options": [
      "Follows automatic raise/lower signals from the BA's control system within its limits",
      "Is offline and unavailable",
      "Ignores dispatch and runs at a fixed output",
      "Is providing only reactive power"
    ],
    "answer": 0,
    "explain": "A unit on AGC accepts automatic regulation signals and moves its MW output up and down, within its regulating range and ramp limits, to help hold ACE. Units not on AGC hold a set point until manually redispatched.",
    "optFeedback": {
      "2": "A unit on AGC does the opposite — it follows automatic signals rather than a fixed output.",
      "3": "AGC regulates real power (MW), not reactive output."
    }
  },
  {
    "id": "q-m9-029",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1c",
    "std": "BAL-005-1",
    "difficulty": "analysis",
    "stem": "AGC keeps raising its regulating units but ACE stays negative and will not recover. The most likely cause is:",
    "options": [
      "Frequency is exactly 60.00 Hz",
      "The regulating units have run out of headroom (reached their upper limits)",
      "The interchange schedule is confirmed",
      "Voltage is slightly high"
    ],
    "answer": 1,
    "explain": "If AGC is calling for more generation but ACE will not recover, the regulating units are likely at their upper limits with no headroom left, so the operator must commit or redispatch additional capacity. Frequency being on schedule or voltage being high would not stall ACE recovery this way.",
    "optFeedback": {
      "0": "On-schedule frequency zeroes the bias term but would not by itself prevent ACE recovery.",
      "3": "Voltage is a reactive-side quantity and does not drive ACE."
    }
  },
  {
    "id": "q-m9-030",
    "module": "balancing",
    "section": "m9-agc-ace",
    "domain": "balancing",
    "topic": "1c",
    "std": "BAL-005-1",
    "difficulty": "application",
    "stem": "Regulating margin (regulation) refers to:",
    "options": [
      "The difference between two Interconnection frequencies",
      "The reactive reserve held at key buses",
      "The range of quick up-and-down movement AGC has available on its regulating units",
      "The billing tolerance for inadvertent energy"
    ],
    "answer": 2,
    "explain": "Regulating margin is the maneuverable MW range AGC can call on quickly to follow second-to-minute load changes and hold ACE. Too little of it lets ACE and frequency wander. It is distinct from contingency reserve, which covers large discrete losses.",
    "optFeedback": {
      "1": "That is reactive reserve, a voltage concept.",
      "3": "Inadvertent energy is an accounting quantity, not regulating margin."
    }
  },
  {
    "id": "q-m9-031",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1f",
    "difficulty": "recall",
    "stem": "A short-term load forecast is used primarily to:",
    "options": [
      "Determine protective relay settings",
      "Set transformer tap positions",
      "Calculate inadvertent-energy paybacks",
      "Commit and position enough generation and reserves to meet upcoming demand"
    ],
    "answer": 3,
    "explain": "Load forecasting drives unit commitment, dispatch, and reserve positioning for the hours and day ahead, so the right amount of capacity is online and ready. It is a planning-for-balance tool, not a protection or accounting function.",
    "optFeedback": {
      "0": "Relay settings are a protection matter, unrelated to load forecasts.",
      "2": "Inadvertent energy is after-the-fact accounting, not forecasting."
    }
  },
  {
    "id": "q-m9-032",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1f",
    "difficulty": "application",
    "stem": "Which factor most directly drives a large day-ahead swing in a system's load forecast?",
    "options": [
      "A significant change in weather, such as a heat wave or a cold snap",
      "A change in transformer tap settings",
      "The color scheme of the EMS display",
      "The number of tie lines in service"
    ],
    "answer": 0,
    "explain": "Weather is the dominant driver of bulk-system load — temperature swings move heating and cooling demand sharply — so forecasts lean heavily on it. Tap settings, displays, and tie counts do not materially move total demand.",
    "optFeedback": {
      "1": "Taps regulate voltage locally; they do not change total demand.",
      "3": "The number of ties affects flows, not the underlying demand."
    }
  },
  {
    "id": "q-m9-033",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1f",
    "difficulty": "analysis",
    "stem": "On a system with heavy midday solar, the steepest challenge the net-load forecast highlights is:",
    "options": [
      "Excess reactive power at midnight",
      "The fast evening ramp as solar falls off while demand stays high",
      "A shortage of tie lines at noon",
      "Transformer overheating caused by low load"
    ],
    "answer": 1,
    "explain": "Net load (demand minus variable generation) on a solar-heavy system dips midday and then ramps up steeply in the evening as solar output falls while demand stays high — the classic 'duck curve' ramp — so operators must have fast-ramping capacity ready for that window.",
    "optFeedback": {
      "0": "Night-time reactive/voltage is a separate issue from the net-load ramp.",
      "3": "Low load does not overheat transformers; overloading does."
    }
  },
  {
    "id": "q-m9-034",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1g",
    "difficulty": "recall",
    "stem": "A synchronous generator's real-power output (MW) is controlled primarily by:",
    "options": [
      "The transformer tap changer",
      "The field excitation",
      "The prime mover and its governor (the mechanical power driving the shaft)",
      "The protective relay settings"
    ],
    "answer": 2,
    "explain": "Real power comes from the mechanical input to the shaft, set by the prime mover through its governor. Field excitation controls reactive output and terminal voltage instead; taps and relays do not set a unit's MW.",
    "optFeedback": {
      "1": "Excitation controls reactive power and voltage, not MW.",
      "3": "Relays protect the unit; they do not set its output."
    }
  },
  {
    "id": "q-m9-035",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1g",
    "difficulty": "recall",
    "stem": "A synchronous generator's reactive-power output and terminal voltage are controlled primarily by:",
    "options": [
      "The tie-line schedule",
      "The governor / prime-mover valve",
      "The number of poles",
      "The field excitation, via the automatic voltage regulator"
    ],
    "answer": 3,
    "explain": "Field excitation, managed by the AVR, sets how much reactive power the machine produces or absorbs and thus supports terminal voltage. The governor sets real power — the same speed-versus-excitation split shown in the generator interactive.",
    "optFeedback": {
      "1": "The governor sets real power (MW), not reactive output or voltage.",
      "2": "Pole count fixes synchronous speed, not reactive output."
    }
  },
  {
    "id": "q-m9-036",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1g",
    "difficulty": "application",
    "stem": "A generator's capability curve (the D-curve) tells the operator:",
    "options": [
      "The combinations of MW and MVAR the unit can produce without exceeding its limits",
      "The unit's fuel cost per hour",
      "The unit's protective relay trip settings",
      "The ratings of the tie lines near the plant"
    ],
    "answer": 0,
    "explain": "The capability curve bounds the machine's simultaneous real and reactive output — limited by stator heating, rotor (field) heating, and stability — so operators know how much MVAR they can ask for at a given MW loading. It is an operating envelope, not a cost or protection document.",
    "optFeedback": {
      "1": "That is economics, not the capability curve.",
      "3": "Tie-line ratings are transmission limits, not the unit's capability."
    }
  },
  {
    "id": "q-m9-037",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1g",
    "difficulty": "application",
    "stem": "Why does a Balancing Authority care about its units' ramp rates?",
    "options": [
      "Ramp rate sets the unit's terminal voltage",
      "Ramp rate limits how fast generation can follow load and interchange changes, shaping how quickly ACE can be corrected",
      "Ramp rate determines the protection-zone boundaries",
      "Ramp rate is purely a maintenance concern"
    ],
    "answer": 1,
    "explain": "A unit's ramp rate (MW per minute) caps how quickly it can move, so a BA needs enough ramping capability to follow load swings and scheduled interchange ramps and to recover ACE promptly. Too little ramp capability leaves ACE and frequency chasing the load.",
    "optFeedback": {
      "0": "Voltage is an excitation matter, not ramp rate.",
      "3": "Ramp rate is a real-time operating capability, not just a maintenance figure."
    }
  },
  {
    "id": "q-m9-038",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1h",
    "difficulty": "analysis",
    "stem": "Compared with conventional synchronous generation, inverter-based resources such as solar PV and most wind:",
    "options": [
      "Cannot be connected to the transmission system",
      "Always provide more inertia than steam units",
      "Do not inherently provide rotating inertia, so frequency can change faster after a disturbance",
      "Produce only reactive power"
    ],
    "answer": 2,
    "explain": "Inverter-based resources connect through power electronics and lack the large spinning mass of synchronous machines, so they do not inherently contribute inertia. As their share grows, system inertia falls and frequency can move faster for a given imbalance — a growing concern addressed with fast frequency response and other measures.",
    "optFeedback": {
      "1": "It is the reverse — they typically provide little or no inherent inertia.",
      "3": "They primarily produce real power and can often provide reactive support too."
    }
  },
  {
    "id": "q-m9-039",
    "module": "balancing",
    "section": "m9-generation-sources",
    "domain": "balancing",
    "topic": "1h",
    "difficulty": "application",
    "stem": "A generation fleet that is heavily reservoir hydro gives an operator which balancing advantage?",
    "options": [
      "Constant output that cannot be adjusted",
      "No need to carry any reserves",
      "Immunity from transmission limits",
      "Fast, flexible output that can be dispatched up and down to follow load and provide reserves"
    ],
    "answer": 3,
    "explain": "Reservoir hydro is highly dispatchable and fast-responding, making it valuable for regulation, load-following, and reserves. It does not eliminate the need for reserves or exempt the system from transmission limits, and its output is very much adjustable.",
    "optFeedback": {
      "0": "Reservoir hydro is among the most adjustable resources, not constant.",
      "1": "Flexibility helps, but reserves are still required."
    }
  },
  {
    "id": "q-p1-3c-001",
    "module": "emergency-ops",
    "section": "m5-capacity",
    "domain": "emergency-prep",
    "topic": "3c",
    "std": "EOP-011-4",
    "difficulty": "application",
    "stem": "Tomorrow's forecast peak is 17,250 MW. Available internal supply is 16,800 MW, and 300 MW of firm imports are confirmed. What anticipated capacity deficiency remains before additional actions?",
    "options": [
      "150 MW",
      "450 MW",
      "750 MW",
      "No deficiency remains"
    ],
    "answer": 0,
    "explain": "Available supply plus confirmed firm imports is 17,100 MW. Compared with the 17,250 MW forecast peak, the remaining anticipated deficiency is 150 MW. Identifying the size early gives operators time to arrange additional resources, demand response, or other coordinated actions.",
    "optFeedback": {
      "1": "450 MW is the shortfall before counting the confirmed 300 MW import.",
      "2": "750 MW adds the import to the shortfall instead of using it as available supply.",
      "3": "The confirmed import reduces the gap, but it does not eliminate it."
    }
  },
  {
    "id": "q-p1-3c-002",
    "module": "emergency-ops",
    "section": "m5-capacity",
    "domain": "emergency-prep",
    "topic": "3c",
    "std": "EOP-011-4",
    "difficulty": "analysis",
    "stem": "A next-day study shows a likely supply shortfall during the evening peak. Which response is the best first step?",
    "options": [
      "Wait until real time so the forecast can be confirmed by an actual frequency decline",
      "Validate the forecast and resource availability, then begin coordinated mitigation and required communications",
      "Immediately shed firm load before attempting lower-impact actions",
      "Ignore the shortfall if current-day operating limits are still within limits"
    ],
    "answer": 1,
    "explain": "An anticipated deficiency is valuable precisely because it is visible before the emergency occurs. The operator should validate the inputs, confirm resource and transfer availability, coordinate mitigation, and communicate through the applicable operating plan rather than waiting for real-time deterioration.",
    "optFeedback": {
      "0": "Waiting removes the time advantage that an anticipated deficiency provides and can turn a manageable forecast problem into an emergency.",
      "2": "Firm load shedding is generally a last-resort action after available lower-impact measures have been evaluated and used.",
      "3": "Capacity adequacy and operating limits are related but different; being within limits now does not erase a forecast supply shortfall."
    }
  },
  {
    "id": "q-p1-3c-003",
    "module": "emergency-ops",
    "section": "m5-capacity",
    "domain": "emergency-prep",
    "topic": "3c",
    "std": "EOP-011-4",
    "difficulty": "application",
    "stem": "A 500 MW generator is scheduled to return from outage before tomorrow's peak, but testing is incomplete and the return time is uncertain. How should it be treated in the capacity assessment?",
    "options": [
      "Count the full 500 MW because it appears on the outage schedule",
      "Count it only as reactive reserve",
      "Exclude or appropriately derate it until its availability is sufficiently confirmed, and prepare a contingency plan",
      "Assume neighboring systems will replace it automatically if it is late"
    ],
    "answer": 2,
    "explain": "A capacity assessment must be based on resources that are reasonably expected to be available and capable. An uncertain return should not erase a forecast deficiency on paper; operators should use a conservative assumption, continue verification, and prepare alternatives.",
    "optFeedback": {
      "0": "A scheduled return is not the same as confirmed capability, especially when testing is incomplete.",
      "1": "The issue is dependable real-power availability for the peak, not reactive reserve classification.",
      "3": "Assistance from neighbors must be evaluated, available, and coordinated; it cannot be assumed."
    }
  },
  {
    "id": "q-p1-3c-004",
    "module": "emergency-ops",
    "section": "m5-capacity",
    "domain": "emergency-prep",
    "topic": "3c",
    "std": "EOP-011-4",
    "difficulty": "analysis",
    "stem": "Which sequence best reflects a disciplined response as a forecast capacity deficiency becomes more severe?",
    "options": [
      "Shed firm load, then check the load forecast, then notify affected entities",
      "Take no action until an automatic underfrequency load-shedding scheme operates",
      "Reduce all interchange first, regardless of whether the area is importing or exporting",
      "Confirm forecasts and outages; secure available resources, transfers, and demand-side actions; communicate and escalate emergency actions as required; use controlled firm load shedding only when necessary"
    ],
    "answer": 3,
    "explain": "The response should move from verification and lower-impact mitigation toward progressively more severe emergency actions. Communication and coordination occur throughout, while controlled firm load shedding remains a deliberate last-resort tool when available supply still cannot meet demand.",
    "optFeedback": {
      "0": "This reverses the normal escalation and delays the analysis and communication needed to make controlled decisions.",
      "1": "Automatic UFLS is a system-protection backstop, not the operating plan for a forecast deficiency.",
      "2": "Interchange action depends on direction, firmness, availability, and reliability impact; a blanket reduction can worsen the shortage."
    }
  }
];
