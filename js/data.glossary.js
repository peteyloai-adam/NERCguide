/* ============================================================================
   GLOSSARY DATA  —  window.NERC.glossary
   Schema: { id, term, acronym?, definition, seeAlso?:[ids], moduleRef?:sectionId }
   To extend in later builds: append objects to this array. Keep `id` stable and
   lowercase-hyphenated; content files reference terms by id via data-term="".
   Definitions are written in plain language for a from-scratch learner and are
   original summaries — always confirm against the official NERC Glossary of Terms.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.glossary = [
  { id: "bes", term: "Bulk Electric System", acronym: "BES",
    definition: "The high-voltage backbone of the grid — generally transmission facilities and large generators operated at 100 kV and above — that NERC's Reliability Standards apply to. Local distribution to homes is generally excluded.",
    seeAlso: ["bps","transmission"], moduleRef: "f-grid-anatomy" },

  { id: "bps", term: "Bulk Power System", acronym: "BPS",
    definition: "The large, interconnected network of generation and high-voltage transmission that moves power over long distances. Often used interchangeably with the BES in everyday operator language.",
    seeAlso: ["bes"], moduleRef: "f-grid-anatomy" },

  { id: "transmission", term: "Transmission",
    definition: "The high-voltage lines and substations that carry bulk power from generating plants toward load centers, before voltage is stepped down for distribution.",
    seeAlso: ["bes","one-line"], moduleRef: "f-grid-anatomy" },

  { id: "one-line", term: "One-Line Diagram", acronym: "SLD",
    definition: "A simplified schematic that shows the grid's electrical connections — buses, lines, breakers, transformers — as single lines rather than all three phases. The operator's primary map of the system.",
    moduleRef: "f-grid-anatomy" },

  { id: "real-power", term: "Real Power", acronym: "MW",
    definition: "The power that does actual work — running motors, lighting, heating. Measured in megawatts (MW). It is what generators are dispatched to produce to serve load.",
    seeAlso: ["reactive-power","apparent-power","power-factor"], moduleRef: "f-ac-basics" },

  { id: "reactive-power", term: "Reactive Power", acronym: "MVAR",
    definition: "Power that oscillates between source and load to sustain the magnetic and electric fields in AC equipment. It does no net work but is essential for holding voltage. Measured in megavars (MVAR).",
    seeAlso: ["real-power","apparent-power","voltage"], moduleRef: "f-ac-basics" },

  { id: "apparent-power", term: "Apparent Power", acronym: "MVA",
    definition: "The vector combination of real and reactive power (S² = P² + Q²). It represents the total loading on equipment and is what conductor and transformer ratings are based on. Measured in MVA.",
    seeAlso: ["real-power","reactive-power","power-factor"], moduleRef: "f-ac-basics" },

  { id: "power-factor", term: "Power Factor", acronym: "PF",
    definition: "The ratio of real power to apparent power (cos θ). A high power factor means most of the current is doing useful work; a low one means more current is tied up in reactive flow.",
    seeAlso: ["real-power","reactive-power"], moduleRef: "f-ac-basics" },

  { id: "frequency", term: "Frequency",
    definition: "The rate at which AC alternates, nominally 60 Hz in North America. It reflects the instantaneous balance between generation and load: too much generation pushes it up, too much load pulls it down.",
    seeAlso: ["real-power"], moduleRef: "f-ac-basics" },

  { id: "voltage", term: "Voltage",
    definition: "The electrical 'pressure' that drives current through the system. Operators keep voltage inside limits by managing reactive power sources and sinks across the network.",
    seeAlso: ["reactive-power"], moduleRef: "f-ac-basics" },

  { id: "nerc", term: "North American Electric Reliability Corporation", acronym: "NERC",
    definition: "The Electric Reliability Organization for North America. It writes and enforces the mandatory Reliability Standards and certifies system operators.",
    seeAlso: ["ferc","reliability-standard"], moduleRef: "f-reliability-landscape" },

  { id: "ferc", term: "Federal Energy Regulatory Commission", acronym: "FERC",
    definition: "The U.S. federal regulator that oversees interstate electricity transmission and wholesale markets, and that gave NERC's Reliability Standards the force of law.",
    seeAlso: ["nerc"], moduleRef: "f-reliability-landscape" },

  { id: "rc", term: "Reliability Coordinator", acronym: "RC",
    definition: "The entity with the widest-area view and the highest operating authority in real time. The RC watches for problems spanning multiple systems and can direct other operators to act.",
    seeAlso: ["ba","top"], moduleRef: "f-reliability-landscape" },

  { id: "ba", term: "Balancing Authority", acronym: "BA",
    definition: "The entity responsible for keeping generation and load in balance within its area and for supporting Interconnection frequency, moment to moment.",
    seeAlso: ["rc","top"], moduleRef: "f-reliability-landscape" },

  { id: "top", term: "Transmission Operator", acronym: "TOP",
    definition: "The entity responsible for operating and maintaining the reliability of its transmission facilities in real time — the functional role a NERC-certified Transmission Operator supports.",
    seeAlso: ["rc","ba","gop"], moduleRef: "f-reliability-landscape" },

  { id: "gop", term: "Generator Operator", acronym: "GOP",
    definition: "The entity that operates generating resources and follows dispatch and voltage instructions from the BA, TOP, and RC.",
    seeAlso: ["ba","top"], moduleRef: "f-reliability-landscape" },

  { id: "rto", term: "Regional Transmission Organization / Independent System Operator", acronym: "RTO/ISO",
    definition: "An independent entity that operates the transmission system and wholesale market across a region, often serving as the RC and BA for its footprint (for example, SPP, ERCOT, MISO, PJM).",
    seeAlso: ["rc","ba"], moduleRef: "f-reliability-landscape" },

  { id: "sol", term: "System Operating Limit", acronym: "SOL",
    definition: "The value (a flow, voltage, or stability limit) that a facility or portion of the system must stay within to operate reliably. Exceeding an SOL is not allowed beyond defined timeframes.",
    seeAlso: ["irol"], moduleRef: "f-reliability-landscape" },

  { id: "irol", term: "Interconnection Reliability Operating Limit", acronym: "IROL",
    definition: "An SOL that, if violated, could cause instability, uncontrolled separation, or cascading outages across a wide area. IROLs carry the tightest time limits and highest priority.",
    seeAlso: ["sol"], moduleRef: "f-reliability-landscape" },

  { id: "contingency", term: "Contingency",
    definition: "The unexpected loss of a system element such as a line, transformer, or generator. Operators plan so the system can survive credible single contingencies.",
    seeAlso: ["n-1"], moduleRef: "f-reliability-landscape" },

  { id: "n-1", term: "N-1 Criterion",
    definition: "The reliability principle that the system should withstand the loss of any single element (the 'minus one') without violating limits — the baseline for secure operation.",
    seeAlso: ["contingency","sol"], moduleRef: "f-reliability-landscape" },

  { id: "reliability-standard", term: "Reliability Standard",
    definition: "A mandatory, enforceable requirement developed by NERC (grouped into families like TOP, IRO, EOP, PRC, VAR, COM) that defines how the bulk power system must be planned and operated.",
    seeAlso: ["nerc"], moduleRef: "f-reliability-landscape" },

  { id: "substation", term: "Substation",
    definition: "A facility where voltage is transformed and where lines connect through buses, breakers, and switches. Substations are the nodes an operator switches and monitors.",
    seeAlso: ["bus","circuit-breaker","transformer-eq"], moduleRef: "f-reading-oneline" },

  { id: "bus", term: "Bus",
    definition: "A common electrical connection point in a substation where several lines, transformers, and other elements tie together. On a one-line it's drawn as a heavy bar.",
    seeAlso: ["substation","one-line"], moduleRef: "f-reading-oneline" },

  { id: "circuit-breaker", term: "Circuit Breaker",
    definition: "A switching device that can interrupt fault current. Breakers are how operators energize and de-energize elements and how protection isolates faults automatically.",
    seeAlso: ["disconnect","one-line"], moduleRef: "f-reading-oneline" },

  { id: "disconnect", term: "Disconnect Switch",
    definition: "A switch that provides a visible isolation point. Unlike a breaker, most disconnects are not designed to interrupt load or fault current and are operated only after a breaker has opened.",
    seeAlso: ["circuit-breaker"], moduleRef: "f-reading-oneline" },

  { id: "transformer-eq", term: "Transformer",
    definition: "Equipment that changes voltage from one level to another. Step-up transformers raise generator voltage for transmission; step-down transformers lower it toward load.",
    seeAlso: ["substation","voltage"], moduleRef: "f-grid-anatomy" },

  { id: "capacitor-bank", term: "Capacitor Bank",
    definition: "A device that supplies reactive power to the system to raise voltage. Operators switch capacitors in when voltage is low or reactive demand is high.",
    seeAlso: ["reactive-power","voltage","reactor"], moduleRef: "f-power-in-practice" },

  { id: "reactor", term: "Reactor (Shunt)",
    definition: "A device that absorbs reactive power to lower voltage, often needed on lightly loaded lines where voltage tends to rise. The counterpart to a capacitor bank.",
    seeAlso: ["reactive-power","capacitor-bank"], moduleRef: "f-power-in-practice" },

  { id: "ampacity", term: "Ampacity / Thermal Rating",
    definition: "The current (and, at a given voltage, the MVA) a line or piece of equipment can carry before overheating. Thermal SOLs come from these ratings.",
    seeAlso: ["apparent-power","sol"], moduleRef: "f-limits" },

  { id: "cascading", term: "Cascading",
    definition: "The uncontrolled successive loss of elements triggered by an initial event, spreading outage across a wide area. Preventing cascading is the reason IROLs and N-1 exist.",
    seeAlso: ["irol","n-1","contingency"], moduleRef: "f-limits" },

  { id: "transfer-capability", term: "Total Transfer Capability", acronym: "TTC",
    definition: "The most power that can be reliably moved across an interface or path under a given set of conditions. Operators keep actual transfers within limits derived from it.",
    seeAlso: ["sol","ampacity"], moduleRef: "f-limits" },

  { id: "state-estimator", term: "State Estimator", acronym: "SE",
    definition: "An EMS application that blends telemetry into a best estimate of the real-time system state, feeding the contingency analysis operators rely on. If it fails, situational awareness degrades.",
    seeAlso: ["contingency","n-1"], moduleRef: "f-limits" },

  { id: "ras", term: "Remedial Action Scheme", acronym: "RAS",
    definition: "An automatic scheme (formerly Special Protection System) that takes pre-planned action \u2014 tripping generation, shedding load, or reconfiguring \u2014 to keep the system within limits after a defined contingency.",
    seeAlso: ["contingency","cascading"], moduleRef: "f-limits" },

  { id: "scada", term: "Supervisory Control and Data Acquisition", acronym: "SCADA",
    definition: "The system that brings substation measurements and status back to the control center and lets operators send control actions (like opening a breaker) out to the field.",
    seeAlso: ["ems","telemetry"], moduleRef: "m1-monitoring" },

  { id: "ems", term: "Energy Management System", acronym: "EMS",
    definition: "The operator's control-room software suite built on SCADA \u2014 it hosts the displays, alarms, state estimator, and contingency analysis used to run the system.",
    seeAlso: ["scada","state-estimator","rtca"], moduleRef: "m1-monitoring" },

  { id: "telemetry", term: "Telemetry",
    definition: "The remote measurements (MW, MVAR, voltage, breaker status, etc.) sent from the field to the control center. Bad or missing telemetry degrades the operator's picture of the system.",
    seeAlso: ["scada","state-estimator"], moduleRef: "m1-monitoring" },

  { id: "rtca", term: "Real-Time Contingency Analysis", acronym: "RTCA",
    definition: "The EMS application that repeatedly tests 'what happens if we lose element X?' against the state estimate, flagging post-contingency limit violations so operators can act before the contingency occurs.",
    seeAlso: ["state-estimator","n-1","contingency"], moduleRef: "m1-monitoring" },

  { id: "ltc", term: "Load Tap Changer", acronym: "LTC",
    definition: "A mechanism on a transformer that changes its turns ratio under load to regulate voltage on one side, adjusting taps up or down to hold a target voltage.",
    seeAlso: ["transformer-eq","voltage"], moduleRef: "m1-equipment" },

  { id: "phase-shifter", term: "Phase-Shifting Transformer",
    definition: "A transformer that shifts the phase angle across itself to push or pull real-power flow onto or off of a path \u2014 one of the few tools that directly controls how MW divides among parallel paths.",
    seeAlso: ["loop-flow","transformer-eq"], moduleRef: "m1-powerflow" },

  { id: "series-compensation", term: "Series Compensation",
    definition: "Series capacitors inserted in a line to cancel part of its reactance, effectively lowering its impedance so it carries more flow and improving stability on long lines.",
    seeAlso: ["loop-flow","reactive-power"], moduleRef: "m1-equipment" },

  { id: "loop-flow", term: "Loop Flow (Parallel Flow)",
    definition: "Power flowing on paths other than the contractual one because current follows the physics of impedance, not schedules. A scheduled transfer can loop through neighboring systems.",
    seeAlso: ["phase-shifter","transmission"], moduleRef: "m1-powerflow" },

  { id: "protective-relay", term: "Protective Relay",
    definition: "A device that detects abnormal conditions (like a fault) and trips breakers to isolate the faulted element quickly, protecting equipment and the system. Relays act in cycles, far faster than any operator.",
    seeAlso: ["circuit-breaker","reclosing"], moduleRef: "m1-protection" },

  { id: "reclosing", term: "Automatic Reclosing",
    definition: "Automatically re-closing a breaker shortly after it trips, on the logic that many line faults are temporary. Reclosing into a permanent fault, or out of synchronism, can be damaging, so schemes are carefully engineered.",
    seeAlso: ["protective-relay","circuit-breaker"], moduleRef: "m1-protection" },

  { id: "clearance", term: "Clearance / Protective Hold",
    definition: "A formal authorization and tagging process that ensures equipment is isolated and safe before work begins, and cannot be re-energized until the clearance is released. Central to safe switching.",
    seeAlso: ["circuit-breaker","disconnect"], moduleRef: "m1-switching" },

  { id: "blackstart", term: "Blackstart Resource",
    definition: "A generating unit that can start without support from the grid and then energize a path to help start other units. Blackstart resources are the seed of any system restoration.",
    seeAlso: ["cranking-path","restoration-plan"], moduleRef: "m6-restoration" },

  { id: "cranking-path", term: "Cranking Path",
    definition: "The transmission path energized from a blackstart unit to deliver startup (station) power to a larger generator that can't start on its own.",
    seeAlso: ["blackstart"], moduleRef: "m6-restoration" },

  { id: "islanding", term: "Islanding",
    definition: "Operating a portion of the system as a self-contained island with its own balanced generation and load, and its own frequency and voltage control \u2014 common during restoration and after separation.",
    seeAlso: ["synchronizing","restoration-plan"], moduleRef: "m6-islanding" },

  { id: "synchronizing", term: "Synchronizing",
    definition: "Closing a breaker to connect two energized sections only when their voltage, frequency, and phase angle are matched. Closing out of synchronism can damage generators and trip units.",
    seeAlso: ["islanding","frequency"], moduleRef: "m6-islanding" },

  { id: "cold-load-pickup", term: "Cold Load Pickup", acronym: "CLPU",
    definition: "The higher-than-normal load drawn when service is restored after an extended outage, because diversity is lost (thermostats, motors, and equipment all demand at once). It must be picked up carefully, in blocks.",
    seeAlso: ["load-shedding"], moduleRef: "m6-cold-load" },

  { id: "ufls", term: "Underfrequency Load Shedding", acronym: "UFLS",
    definition: "An automatic scheme that sheds blocks of load at preset low-frequency thresholds to arrest a falling frequency and prevent a total collapse. A last-ditch automatic backstop, not an operator action.",
    seeAlso: ["frequency","load-shedding"], moduleRef: "m5-disturbances" },

  { id: "uvls", term: "Undervoltage Load Shedding", acronym: "UVLS",
    definition: "An automatic scheme that sheds load when voltage falls to preset levels, to arrest a developing voltage collapse.",
    seeAlso: ["voltage","load-shedding"], moduleRef: "m5-disturbances" },

  { id: "load-shedding", term: "Load Shedding",
    definition: "Deliberately dropping load to restore the balance between generation and demand, or to relieve overloads. It can be manual (operator-directed) or automatic (UFLS/UVLS), and is a measure of last resort.",
    seeAlso: ["ufls","uvls"], moduleRef: "m5-capacity" },

  { id: "eea", term: "Energy Emergency Alert", acronym: "EEA",
    definition: "A graded alert (levels reflecting increasing severity) used when a Balancing Authority foresees or is experiencing an inability to meet demand, signaling escalating actions up to and including load shedding.",
    seeAlso: ["load-shedding","energy-emergency"], moduleRef: "m5-capacity" },

  { id: "energy-emergency", term: "Energy Emergency",
    definition: "A condition where a load-serving entity or Balancing Authority may be unable to supply the energy required to meet demand, distinct from a momentary capacity shortfall. Managed through the EEA process.",
    seeAlso: ["eea"], moduleRef: "m5-capacity" },

  { id: "gmd", term: "Geomagnetic Disturbance", acronym: "GMD",
    definition: "A disturbance driven by solar activity that induces quasi-DC currents in the grid, which can heat transformers and distort reactive behavior. Operators follow GMD operating procedures when severe space weather is forecast.",
    seeAlso: ["reactive-power"], moduleRef: "m5-weather-gmd" },

  { id: "restoration-plan", term: "Restoration Plan",
    definition: "The pre-developed plan for bringing the system back after a partial or total shutdown \u2014 blackstart resources, cranking paths, priorities, and coordination \u2014 which operators train on and follow.",
    seeAlso: ["blackstart","cranking-path"], moduleRef: "m6-restoration" },

  { id: "avr", term: "Automatic Voltage Regulator", acronym: "AVR",
    definition: "The control on a generator that automatically adjusts field excitation to hold a target terminal voltage, making generators the fastest, most flexible source of reactive support.",
    seeAlso: ["reactive-power","voltage-schedule"], moduleRef: "m2-reactive-sources" },

  { id: "svc", term: "Static VAR Compensator / STATCOM", acronym: "SVC",
    definition: "Power-electronic devices that supply or absorb reactive power rapidly and continuously to regulate voltage \u2014 faster and smoother than switching mechanical capacitors or reactors.",
    seeAlso: ["reactive-power","capacitor-bank"], moduleRef: "m2-reactive-sources" },

  { id: "line-charging", term: "Line Charging",
    definition: "The reactive power a transmission line generates due to its capacitance. Lightly loaded lines produce excess charging that raises voltage \u2014 which is why reactors are switched in at light load.",
    seeAlso: ["reactor","reactive-power"], moduleRef: "m2-reactive-sources" },

  { id: "voltage-schedule", term: "Voltage Schedule",
    definition: "A target voltage (or band) an operator maintains at a bus, coordinating reactive resources and generator setpoints to hold it. Generators are obligated to follow the schedule they're given.",
    seeAlso: ["avr","voltage"], moduleRef: "m2-voltage-schedules" },

  { id: "reactive-reserve", term: "Reactive Reserve",
    definition: "Reactive supply held in readiness (for example, headroom on generators and unswitched capacitors) so voltage can be supported after a contingency. Running out of reactive reserve is a warning of impending collapse.",
    seeAlso: ["reactive-power","voltage-collapse"], moduleRef: "m2-voltage-collapse" },

  { id: "voltage-collapse", term: "Voltage Collapse",
    definition: "A progressive, uncontrollable fall in voltage when the system can no longer supply the reactive power its load demands \u2014 the point past the 'nose' of the P-V curve, beyond which no stable operating voltage exists.",
    seeAlso: ["reactive-reserve","uvls"], moduleRef: "m2-voltage-collapse" },

  { id: "power-flow-study", term: "Power Flow (Load Flow)",
    definition: "A calculation of how real and reactive power, voltages, and angles distribute across the network for a given condition. It's the engine behind contingency analysis.",
    seeAlso: ["state-estimator","rtca"], moduleRef: "m3-network-tools" },

  { id: "real-time-assessment", term: "Real-Time Assessment", acronym: "RTA",
    definition: "The ongoing evaluation of current and near-term system conditions \u2014 including contingency analysis \u2014 required so operators know whether the system is reliable now and secure for the next loss.",
    seeAlso: ["rtca","state-estimator"], moduleRef: "m3-contingency-analysis" },

  { id: "tlr", term: "Transmission Loading Relief", acronym: "TLR",
    definition: "A procedure used (in the Eastern Interconnection) to relieve overloads by curtailing transactions contributing to a constrained flowgate, coordinated across systems by Reliability Coordinators.",
    seeAlso: ["loop-flow","sol"], moduleRef: "m3-response" },

  { id: "agc", term: "Automatic Generation Control", acronym: "AGC",
    definition: "The closed-loop control that automatically adjusts committed generation to keep a Balancing Authority's ACE near zero \u2014 the mechanism that continuously trims generation to match load and interchange.",
    seeAlso: ["ace","frequency"], moduleRef: "m9-agc-ace" },

  { id: "ace", term: "Area Control Error", acronym: "ACE",
    definition: "A single MW value indicating a Balancing Authority Area's error in scheduled interchange adjusted for Frequency Bias, known meter error, and Inadvertent Interchange Management when applicable. Reporting ACE = (NIA - NIS) - 10B(FA - FS) - IME + IIM. Under the convention used in this console, negative means short and positive means long.",
    seeAlso: ["agc","frequency-bias","interchange"], moduleRef: "m9-agc-ace" },

  { id: "frequency-bias", term: "Frequency Bias", acronym: "B",
    definition: "The factor (MW per 0.1 Hz) that sets how much a Balancing Authority contributes to Interconnection frequency in its ACE calculation, so every BA helps arrest a frequency deviation.",
    seeAlso: ["ace","frequency"], moduleRef: "m9-agc-ace" },

  { id: "interchange", term: "Interchange",
    definition: "Power scheduled to flow between Balancing Authority areas. Net interchange is the sum of a BA's scheduled imports and exports, tracked against actual flow in the ACE equation.",
    seeAlso: ["ace"], moduleRef: "m9-reserves-interchange" },

  { id: "contingency-reserve", term: "Contingency Reserve",
    definition: "Capacity (spinning and non-spinning) held ready to replace the largest credible resource loss and restore ACE and frequency within a required time after a disturbance.",
    seeAlso: ["ace","frequency"], moduleRef: "m9-reserves-interchange" },

  { id: "spinning-reserve", term: "Spinning Reserve",
    definition: "Unloaded, synchronized generating capability that can respond immediately, part of the operating reserve a Balancing Authority carries. Non-spinning reserve is offline capacity that can start within a set time.",
    seeAlso: ["contingency-reserve"], moduleRef: "m9-reserves-interchange" },

  { id: "primary-frequency-response", term: "Primary Frequency Response",
    definition: "The immediate, automatic reaction of governors (and similar controls) to arrest a frequency change within seconds \u2014 before AGC and reserves restore frequency to nominal.",
    seeAlso: ["frequency","agc"], moduleRef: "m9-balance-frequency" },

  { id: "three-part-communication", term: "Three-Part Communication",
    definition: "The required protocol for operating instructions: the issuer states it, the receiver repeats it back, and the issuer confirms the repeat-back is correct. It catches errors before they become actions.",
    seeAlso: ["rcis"], moduleRef: "m7-three-part" },

  { id: "rcis", term: "Reliability Coordinator Information System", acronym: "RCIS",
    definition: "A communication system used among Reliability Coordinators to share situational awareness and alerts across the Interconnection.",
    seeAlso: ["three-part-communication","rc"], moduleRef: "m7-three-part" },

  { id: "protection-zone", term: "Protection Zone",
    definition: "The region of the system a given protection scheme is responsible for. Zones overlap so no point is unprotected, and relays are coordinated so the closest device clears a fault first.",
    seeAlso: ["protective-relay","breaker-failure"], moduleRef: "m4-relaying" },

  { id: "breaker-failure", term: "Breaker Failure Protection",
    definition: "A backup scheme that trips surrounding breakers if a breaker fails to clear a fault, widening the outage minimally to remove the fault and protect the system.",
    seeAlso: ["protective-relay","circuit-breaker"], moduleRef: "m4-coordination" },

  { id: "primary-backup-protection", term: "Primary & Backup Protection",
    definition: "Every protected element has primary protection that acts first and backup protection that acts if the primary fails, so a single relay or breaker failure doesn't leave a fault on the system.",
    seeAlso: ["protection-zone","breaker-failure"], moduleRef: "m4-coordination" },

  { id: "generator", term: "Generator (Generating Station)",
    definition: "A machine \u2014 or the plant housing it \u2014 that converts an energy source (steam, water, wind, gas, sunlight) into electrical power and feeds it onto the grid. On a one-line it is usually drawn as a circle marked G.",
    seeAlso: ["real-power","frequency","transmission-line"], moduleRef: "f-grid-anatomy" },

  { id: "transmission-line", term: "Transmission Line",
    definition: "The high-voltage conductors (the wires) strung between towers that carry bulk power from one substation to another. On a one-line it is drawn as a single line joining two buses, and it has a rating it must not be loaded beyond.",
    seeAlso: ["transmission","bus","substation","ampacity"], moduleRef: "f-grid-anatomy" },

  { id: "load", term: "Load",
    definition: "The electrical demand drawn by everything using power \u2014 homes, businesses, industry. Operators must keep generation matched to load moment by moment; when load exceeds generation, frequency falls.",
    seeAlso: ["real-power","frequency","load-shedding"], moduleRef: "f-grid-anatomy" },

  { id: "distribution", term: "Distribution",
    definition: "The lower-voltage local network that delivers power the final stretch to homes and businesses after it leaves the transmission system. Generally outside the Bulk Electric System and not the Transmission Operator's domain.",
    seeAlso: ["transmission","bes"], moduleRef: "f-grid-anatomy" },

  { id: "energized", term: "Energized / De-energized",
    definition: "Equipment is energized when it is connected to a live source and carrying voltage; de-energized when it has been isolated and is electrically dead. Opening a breaker de-energizes everything downstream of it.",
    seeAlso: ["circuit-breaker","clearance"], moduleRef: "f-grid-anatomy" },

  { id: "operating-reserve", term: "Operating Reserve",
    definition: "Generating capacity (and responsive load) held ready beyond what is serving load at the moment, so the system can recover from the sudden loss of a unit or line. Split into spinning and non-spinning types.",
    seeAlso: ["spinning-reserve","contingency-reserve"], moduleRef: "f-grid-anatomy" },

  { id: "conductor", term: "Conductor",
    definition: "The metal wire that actually carries current \u2014 the lines strung between towers and the bars inside substations. Its temperature limit (ampacity) sets how much current it can carry before it sags too far or is damaged.",
    seeAlso: ["transmission-line","ampacity"], moduleRef: "f-ac-basics" },

  { id: "interface", term: "Interface (Transmission Path)",
    definition: "A defined boundary in the network \u2014 often a group of tie lines or a transmission path \u2014 whose combined flow operators watch and limit. Transfer across an interface is capped by its most binding limit.",
    seeAlso: ["transfer-capability","sol"], moduleRef: "f-units" },

  { id: "dispatch", term: "Dispatch",
    definition: "The instruction that tells generating units how much power to produce, and the act of setting those output levels to match load while honoring limits. Generation is dispatched up or down by the operator or the market.",
    seeAlso: ["real-power","agc","generator"], moduleRef: "f-power-in-practice" },

  { id: "reconfiguration", term: "Reconfiguration",
    definition: "Changing the switching arrangement of the system \u2014 opening and closing breakers to move load between paths, isolate equipment, or restore service \u2014 to relieve a limit or set up for work.",
    seeAlso: ["circuit-breaker","disconnect","one-line"], moduleRef: "f-reading-oneline" },

  { id: "three-phase", term: "Three-Phase Power", acronym: "3\u03C6",
    definition: "The standard form of AC power on the grid: three separate conductors carrying voltages of equal magnitude offset in time by 120 degrees (one-third of a cycle). Together they deliver smooth, constant power and let generators and motors build a rotating magnetic field. Nearly everything on the bulk system is three-phase.",
    seeAlso: ["balanced","neutral","rotating-field","conductor"], moduleRef: "f-three-phase" },

  { id: "balanced", term: "Balanced (Three-Phase)",
    definition: "A three-phase set in which all three phases carry equal magnitudes 120 degrees apart. When balanced, the three currents sum to zero (no net neutral current) and the total power delivered is constant instant to instant. Large imbalance stresses equipment and is something operators watch for.",
    seeAlso: ["three-phase","neutral"], moduleRef: "f-three-phase" },

  { id: "neutral", term: "Neutral / Return Current",
    definition: "The leftover current that flows in the return (neutral) path when the three phases are not balanced. In a perfectly balanced three-phase system the phase currents cancel and neutral current is zero; imbalance, or a lost phase, makes it reappear.",
    seeAlso: ["balanced","three-phase"], moduleRef: "f-three-phase" },

  { id: "rotating-field", term: "Rotating Magnetic Field",
    definition: "The magnetic field that appears to spin around the inside of a machine when three-phase currents 120 degrees apart flow through three sets of windings. It is what turns motors and lets generators convert mechanical rotation into three-phase electricity \u2014 a key reason the grid is three-phase.",
    seeAlso: ["three-phase","generator"], moduleRef: "f-three-phase" },

  { id: "tie-line", term: "Tie Line", acronym: "Tie",
    definition: "A transmission line connecting one Balancing Authority area to a neighbor. Power scheduled between areas flows across the ties, and the difference between actual and scheduled flow on them is the interchange-error half of ACE.",
    seeAlso: ["interchange","ace","ba"], moduleRef: "m9-agc-ace" },

  { id: "cps", term: "Control Performance Standard 1", acronym: "CPS1",
    definition: "The BAL-001-2 measure that evaluates how a Balancing Authority's ACE relates to Interconnection frequency over a rolling 12-month period. CPS1 must be at least 100 percent. Older materials may mention CPS2, but CPS2 is not the current second BAL-001-2 performance requirement; BAAL is.",
    seeAlso: ["ace","baal","agc"], moduleRef: "m9-agc-ace" },

  { id: "baal", term: "Balancing Authority ACE Limit", acronym: "BAAL",
    definition: "A frequency-dependent limit on how far a Balancing Authority's ACE may go and for how long, from BAL-001. It lets ACE vary to support frequency but caps sustained one-way error, so an area cannot lean on the Interconnection indefinitely. BAL-001-2 limits a BA to no more than 30 consecutive clock-minutes beyond the applicable BAAL boundary.",
    seeAlso: ["ace","cps","frequency-bias"], moduleRef: "m9-agc-ace" },

  { id: "functional-model", term: "NERC Functional Model",
    definition: "NERC's framework that defines reliability responsibilities by <em>function</em> (operating, owning, planning, balancing, and so on) rather than by company. A single organization registers for whichever functions it performs \u2014 one utility may be a Generator Owner, Transmission Owner, Transmission Operator, and Distribution Provider all at once.",
    seeAlso: ["nerc","regional-entity","top","gen-owner"], moduleRef: "f-key-players" },

  { id: "regional-entity", term: "Regional Entity", acronym: "RE",
    definition: "One of the regional organizations (for example SERC, WECC, MRO, RF, NPCC, Texas RE) that NERC delegates to monitor and enforce the Reliability Standards, and to register entities, within its geographic footprint. Answers to NERC.",
    seeAlso: ["nerc","ferc","reliability-standard"], moduleRef: "f-key-players" },

  { id: "gen-owner", term: "Generator Owner", acronym: "GO",
    definition: "The entity that <em>owns</em> generating facilities and is responsible for their maintenance, ratings, protection, and data \u2014 but does not run them in real time. That real-time operation is the Generator Operator's job.",
    seeAlso: ["gop","trans-owner","functional-model"], moduleRef: "f-key-players" },

  { id: "trans-owner", term: "Transmission Owner", acronym: "TO",
    definition: "The entity that <em>owns</em> transmission facilities and is responsible for their maintenance, ratings, protection, and construction/retirement \u2014 distinct from the Transmission Operator, who operates those facilities in real time (often on equipment the TO owns).",
    seeAlso: ["top","gen-owner","functional-model"], moduleRef: "f-key-players" },

  { id: "tsp", term: "Transmission Service Provider", acronym: "TSP",
    definition: "The entity that administers the transmission tariff and sells or arranges transmission service \u2014 evaluating requests and posting available capability (often via OASIS). A commercial/service function, not a real-time operating one.",
    seeAlso: ["pse","lse","top"], moduleRef: "f-key-players" },

  { id: "dp", term: "Distribution Provider", acronym: "DP",
    definition: "The entity that operates the lower-voltage distribution system delivering power to end-use customers. In reliability terms it is often the one that carries out load actions \u2014 including automatic (UFLS/UVLS) and manual load shedding \u2014 when instructed.",
    seeAlso: ["lse","load-shedding","top"], moduleRef: "f-key-players" },

  { id: "lse", term: "Load-Serving Entity", acronym: "LSE",
    definition: "The entity responsible for securing the energy, transmission, and related services needed to serve its end-use customers' load. A commercial/service function \u2014 it arranges supply; it doesn't operate the grid.",
    seeAlso: ["pse","dp","tsp"], moduleRef: "f-key-players" },

  { id: "pse", term: "Purchasing-Selling Entity", acronym: "PSE",
    definition: "The commercial counterparty that buys, sells, and arranges energy and transmission. The transactions PSEs create become the interchange schedules that Balancing Authorities must honor in the ACE equation.",
    seeAlso: ["interchange","ba","tsp"], moduleRef: "f-key-players" },

  { id: "pc", term: "Planning Coordinator", acronym: "PC",
    definition: "The entity that coordinates and integrates transmission plans over a wide area and a longer horizon, and sets some system-wide planning requirements. A planning-horizon authority \u2014 it shapes the future system rather than operating today's.",
    seeAlso: ["tp","trans-owner","functional-model"], moduleRef: "f-key-players" },

  { id: "tp", term: "Transmission Planner", acronym: "TP",
    definition: "The entity that develops longer-term plans for its portion of the transmission system \u2014 studies, reinforcements, and expansions to keep the system reliable in the planning horizon. Works under the wider coordination of the Planning Coordinator.",
    seeAlso: ["pc","trans-owner","functional-model"], moduleRef: "f-key-players" },

  { id: "energy-mwh", term: "Energy (Megawatt-hour)", acronym: "MWh",
    definition: "Power delivered over time: one megawatt sustained for one hour is one megawatt-hour. Power (MW) is the rate at an instant; energy (MWh, or kWh for homes) is that rate multiplied by how long it runs \u2014 it's what markets settle and customers are billed for.",
    seeAlso: ["real-power","interchange"], moduleRef: "f-units" },

  { id: "nameplate", term: "Nameplate Rating",
    definition: "The manufacturer's rated capacity of a piece of equipment. Generators and transformers are rated in MVA (total apparent power) because their heating depends on total current regardless of power factor; a line's nameplate limit is fundamentally an ampere (ampacity) value.",
    seeAlso: ["apparent-power","ampacity"], moduleRef: "f-units" },

  { id: "outside-in", term: "Outside In Restoration", acronym: "Top-Down",
    definition: "The restoration approach used when <em>no</em> blackstart generation is available inside the blacked-out area. Transmission is energized first so power flows in from an external or neighboring system, and internal units are cranked once that power arrives. Widely called the \u201CTop-Down\u201D approach.",
    seeAlso: ["inside-out","combination-restoration","blackstart","restoration-plan"], moduleRef: "m6-restoration" },

  { id: "inside-out", term: "Inside Out Restoration", acronym: "Bottom-Up",
    definition: "The restoration approach used when blackstart generation IS available inside the blacked-out area. The internal resource is started first and energizes outward along the cranking path, and the area is then reconnected to the rest of the system. Generally faster when available. Widely called the \u201CBottom-Up\u201D approach.",
    seeAlso: ["outside-in","combination-restoration","blackstart","cranking-path"], moduleRef: "m6-restoration" },

  { id: "combination-restoration", term: "Combination Restoration", acronym: "Hybrid",
    definition: "The restoration approach that uses internal and external generation at the same time. The most common approach in practice: leveraging local blackstart generation alongside external sources decreases restoration time and provides redundancy if one source falters. Widely called the \u201CHybrid\u201D approach.",
    seeAlso: ["outside-in","inside-out","restoration-plan"], moduleRef: "m6-restoration" },

  { id: "sil", term: "Surge Impedance Loading", acronym: "SIL",
    definition: "The MW loading of a transmission line at which a natural reactive power balance occurs \u2014 the line consumes exactly as much reactive power as its charging produces, so its net reactive exchange with the system is zero. Below SIL the line is a net VAR source and voltage tends to rise; above SIL it is a net VAR sink and voltage tends to sag.",
    seeAlso: ["ferranti","line-charging","reactive-power"], moduleRef: "m2-sil-ferranti" },

  { id: "ferranti", term: "Ferranti Rise / Ferranti Effect",
    definition: "An increase in voltage at the receiving end of a long transmission line above the voltage at the sending end, occurring when the line is energized with very light load or the load disconnected. A lightly loaded line behaves as a capacitor, producing VARs and raising voltage. It is a defining hazard of early restoration, when many energized lines sit below SIL.",
    seeAlso: ["sil","line-charging","reactor","capability-curve"], moduleRef: "m2-sil-ferranti" },

  { id: "capability-curve", term: "Generator Capability Curve", acronym: "D-curve",
    definition: "The chart of a generator's allowable real and reactive output, bounded by field heating, armature heating, and under-excitation limits. Its shape gives it the nickname \u201CD-curve.\u201D A generator absorbing heavy VARs runs toward the under-excited edge, where it risks tripping \u2014 a real constraint when holding voltage down during restoration.",
    seeAlso: ["ferranti","avr","reactive-power"], moduleRef: "m2-sil-ferranti" },

  { id: "governor", term: "Governor",
    definition: "The control on a generating unit that regulates the prime mover to hold shaft speed \u2014 and therefore frequency. A comparator continuously measures actual turbine speed against a reference and calls for more or less prime mover accordingly. Governors provide primary frequency response, acting automatically within seconds.",
    seeAlso: ["isochronous","droop","prime-mover","primary-frequency-response"], moduleRef: "m9-isochronous-agc" },

  { id: "isochronous", term: "Isochronous Governor",
    definition: "A governor that maintains the same speed in the mechanism controlled regardless of the load. The frequency generated is flat, or constant, and there is zero droop \u2014 output moves to whatever the load requires while frequency holds at reference. Blackstart resources must operate with an isochronous governor in service, and only one unit on an island may run isochronous.",
    seeAlso: ["governor","droop","blackstart"], moduleRef: "m9-isochronous-agc" },

  { id: "droop", term: "Droop Governor / Droop",
    definition: "A governor that changes the electricity generated proportionally to the change in electrical frequency; the slope of that change is the droop setting. 5% droop means a 100% change in output for a 5% change in frequency \u2014 3 Hz on a 60 Hz system. Droop lets many units share load changes without fighting each other, at the cost of settling frequency off 60 Hz.",
    seeAlso: ["governor","isochronous","primary-frequency-response"], moduleRef: "m9-isochronous-agc" },

  { id: "prime-mover", term: "Prime Mover",
    definition: "The machine that turns the generator \u2014 steam turbine, combustion turbine, hydro turbine, or engine. The governor raises or lowers prime mover input (steam, fuel, water) to control shaft speed and therefore the unit's real power output.",
    seeAlso: ["governor","generator"], moduleRef: "m9-isochronous-agc" },

  { id: "flat-frequency", term: "Flat Frequency Control", acronym: "FF",
    definition: "An AGC mode in which an area controls to frequency alone \u2014 there is no load or interchange component in its ACE calculation. It restores frequency to 60 Hz decisively, but two areas both running Flat Frequency will fight each other, overshoot, and drive a growing oscillation until units trip.",
    seeAlso: ["agc","constant-net-interchange","ace"], moduleRef: "m9-isochronous-agc" },

  { id: "constant-net-interchange", term: "Constant Net Interchange", acronym: "CNI",
    definition: "An AGC mode in which an area controls to hold its scheduled net interchange, with no frequency component in the ACE calculation. The area that gains load picks it up, but because nothing is correcting frequency it is never restored to 60 Hz.",
    seeAlso: ["agc","flat-frequency","interchange"], moduleRef: "m9-isochronous-agc" }
];
