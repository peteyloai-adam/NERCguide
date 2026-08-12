/* ============================================================================
   CONTENT DATA  —  window.NERC.content (modules -> sections -> blocks)

   Module schema:
     { id, code, title, weight, blurb, status:'ready'|'placeholder', sections:[...] }
   Section schema:
     { id, title, body:[ block, ... ] }
   Block types the engine renders:
     { t:"p",    html }                       paragraph (supports {{termId|text}})
     { t:"h",    text }                       sub-heading
     { t:"list", items:[html,...] }           bulleted list
     { t:"note", kind, title, html }          callout: op|normal|alert|emergency
     { t:"interactive", id }                  mounts NERC.interactives[id]

   Glossary shorthand inside html: {{bes|Bulk Electric System}} or {{bes}}.
   To extend: flesh out placeholder modules' `sections` and set status:"ready".
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.content = [

  /* ---- M0 FOUNDATIONS (fully built vertical slice) --------------------- */
  {
    id: "foundations", code: "M0", title: "Foundations", weight: "core",
    status: "ready",
    blurb: "Start here. The vocabulary, physics, and org chart every operator needs before anything else makes sense.",
    sections: [

      /* ---- Section: Anatomy of the grid ---- */
      { id: "f-grid-anatomy", title: "Anatomy of the grid",
        body: [
          { t: "p", html: "Before you can operate the grid, you need a mental picture of it. Power is made at {{generator|generating stations}}, pushed up to high voltage, carried long distances over the {{transmission|transmission}} network, then stepped back down and delivered to homes and businesses through the {{distribution|distribution}} system. Your job as a Transmission Operator lives in the middle of that chain — the high-voltage bulk system." },
          { t: "p", html: "Here's that whole chain in one picture. Tap each part to see what it is — these are the words the rest of the training assumes you know." },
          { t: "interactive", id: "gridMap" },
          { t: "p", html: "NERC's rules apply mainly to the {{bes|Bulk Electric System}} — think transmission facilities and large generators, generally at 100 kV and above. The neighborhood wires that feed your house are usually <em>distribution</em> and generally fall outside the {{bes}}. The whole large, interconnected high-voltage machine is often called the {{bps|Bulk Power System}}." },
          { t: "note", kind: "op", title: "Operator's lens",
            html: "You rarely see the physical grid. You see a {{one-line|one-line diagram}} of it on your console — {{bus|buses}}, {{circuit-breaker|breakers}}, {{transmission-line|lines}}, and {{transformer-eq|transformers}} drawn as single lines. Learning to read a one-line fluently is one of the first real operator skills." },
          { t: "p", html: "Here's a one-line you can operate. The breaker sits between the source and the {{load|load}} \u2014 open it and watch everything downstream {{energized|de-energize}}, the same state change you'll read on a console." },
          { t: "interactive", id: "oneLine" },
          { t: "h", text: "Three scales of 'the grid'" },
          { t: "list", items: [
            "<strong>Generation</strong> — plants that convert some energy source into electrical power and feed it onto the system.",
            "<strong>Transmission</strong> — the high-voltage 'highways' (typically 100 kV to 765 kV) that move bulk power efficiently over distance. This is your domain.",
            "<strong>Distribution</strong> — the lower-voltage local delivery network. Important, but generally not part of the {{bes}}."
          ] },
          { t: "h", text: "Voltage levels and substations" },
          { t: "p", html: "Transmission isn't one voltage \u2014 it's a hierarchy, commonly 115 kV, 138 kV, 230 kV, 345 kV, 500 kV, and 765 kV in North America. Higher voltage moves more power with less loss, which is why bulk power travels at high voltage and is stepped down closer to load. A {{transformer-eq|transformer}} is what moves energy between two voltage levels." },
          { t: "p", html: "The places where lines meet, voltages change, and switching happens are {{substation|substations}}. Inside a substation, elements connect through a {{bus|bus}} and are switched with {{circuit-breaker|breakers}} and {{disconnect|disconnect switches}}. Almost everything you do as an operator happens at substations \u2014 even though you act on them remotely through your console." },
          { t: "note", kind: "normal", title: "Why it stays interconnected",
            html: "Utilities tie their systems together so they can share {{operating-reserve|reserves}}, ride through the loss of equipment, and move power to where it's needed. That interconnection is what makes wide-area reliability both possible and everyone's shared responsibility." }
        ]
      },

      /* ---- Section: Units and quantities ---- */
      { id: "f-units", title: "Units and quantities",
        body: [
          { t: "p", html: "Operators live in a world of specific units. Get these straight now and the rest of the material reads much faster. The trick isn't memorizing them \u2014 it's knowing <em>which one answers which question</em>." },
          { t: "h", text: "The base electrical quantities" },
          { t: "list", items: [
            "<strong>Volts (V)</strong> \u2014 electrical pressure, or {{voltage|voltage}}. On the bulk system we work in <strong>kilovolts (kV)</strong>. <em>Used for:</em> voltage schedules, per-unit, equipment levels (69 / 138 / 230 / 345 / 500 kV).",
            "<strong>Amperes (A)</strong> \u2014 current, the rate of charge flow. <em>Used for:</em> a line's thermal limit is fundamentally an ampere ({{ampacity|ampacity}}) limit, and relay settings are in amps.",
            "<strong>Watts (W)</strong> \u2014 {{real-power|real power}}, the working part that does the actual work. On the grid: <strong>megawatts (MW)</strong>. <em>Used for:</em> generation dispatch, load, flow, interchange, and {{ace|ACE}}.",
            "<strong>VARs</strong> \u2014 {{reactive-power|reactive power}}, in <strong>megavars (MVAR)</strong>: the part that supports voltage but does no net work. <em>Used for:</em> voltage support and reactive reserves.",
            "<strong>VA</strong> \u2014 {{apparent-power|apparent power}}, in <strong>megavolt-amperes (MVA)</strong>: the total the equipment actually carries. <em>Used for:</em> {{nameplate|nameplate}} ratings of generators and transformers."
          ] },
          { t: "note", kind: "op", title: "The prefixes matter",
            html: "k = thousand, M = million, G = billion. 1 GW = 1,000 MW = 1,000,000 kW. A large generating unit might be 800 MW; a big {{interface|interface}} might move several GW. Mixing up k and M is a classic \u2014 and dangerous \u2014 slip." },
          { t: "h", text: "Power vs. energy \u2014 the distinction that trips people up" },
          { t: "p", html: "MW is a <strong>rate</strong> \u2014 how fast work is being done <em>right now</em>. {{energy-mwh|Energy}} is that rate added up over time: one megawatt sustained for one hour is one <strong>megawatt-hour (MWh)</strong>. A 100 MW unit running for three hours delivers 300 MWh. Frequency, ACE, and limits all care about <em>power</em> (the instantaneous rate); markets, fuel, and billing care about <em>energy</em>. In your home it's the same split: your appliances draw <strong>kW</strong> at any instant, but the utility bills you for <strong>kWh</strong> over the month." },
          { t: "h", text: "Which quantity answers which question" },
          { t: "list", items: [
            "<em>How heavily is this line loaded?</em> \u2192 amperes against {{ampacity|ampacity}} (and MW/MVA against the rating).",
            "<em>How much are we generating, flowing, or scheduling?</em> \u2192 <strong>MW</strong>.",
            "<em>Is voltage being supported?</em> \u2192 <strong>MVAR</strong> (and kV / per-unit for the voltage itself).",
            "<em>Can this transformer or generator carry it?</em> \u2192 <strong>MVA</strong> against {{nameplate|nameplate}}.",
            "<em>How much did we produce, consume, or trade?</em> \u2192 <strong>MWh</strong> (energy).",
            "<em>Is the system in balance?</em> \u2192 {{frequency|frequency}} (Hz) plus {{ace|ACE}} (MW)."
          ] },
          { t: "p", html: "It helps to see the quantities laid out along the grid. Voltage steps <em>up</em> to travel efficiently and <em>down</em> to be used \u2014 and the units that matter change as you go. Tap through each stage:" },
          { t: "interactive", id: "gridUnits" },
          { t: "note", kind: "normal", title: "A few relationships worth knowing",
            html: "The three power quantities form a right triangle: <strong>MVA\u00B2 = MW\u00B2 + MVAR\u00B2</strong>, so MVA is always at least as big as MW. {{power-factor|Power factor}} is just <strong>PF = MW \u00F7 MVA</strong> (1.0 means it's all real power). Energy is <strong>MWh = MW \u00D7 hours</strong>. And the reason we transport at high kV: for a given MW, higher voltage means lower amperes \u2014 and loss rises with current squared, so high voltage keeps losses small. You'll meet the power triangle properly in the next section." },
          { t: "note", kind: "alert", title: "Per-unit, in one line",
            html: "You'll also see quantities in <em>per-unit</em> (p.u.) \u2014 a value divided by a chosen base, so 1.02 p.u. voltage means 2% above nominal. It lets operators compare different voltage levels on one scale. You don't need the math yet, just the intuition: near 1.0 is normal." }
        ]
      },

      /* ---- Section: AC power for operators ---- */
      { id: "f-ac-basics", title: "AC power for operators",
        body: [
          { t: "p", html: "The grid runs on <strong>alternating current</strong> — the voltage and current swing back and forth 60 times a second. That rhythm is the system {{frequency|frequency}}, nominally 60 Hz in North America. Frequency is a live scoreboard of the balance between how much is being generated and how much is being consumed: more generation than load nudges it above 60, more load than generation drags it below." },
          { t: "p", html: "Try it \u2014 push generation above or below load and watch frequency leave 60 Hz. Reading this deviation and responding to it is a constant part of the job." },
          { t: "interactive", id: "freqBalance" },
          { t: "h", text: "Real, reactive, and apparent power" },
          { t: "p", html: "Not all power does the same job. {{real-power|Real power}} (MW) does the useful work — spinning motors, making heat and light. {{reactive-power|Reactive power}} (MVAR) does no net work; instead it sustains the magnetic and electric fields that AC equipment needs, and it is the main lever operators use to hold {{voltage|voltage}} where it belongs. Combine the two as vectors and you get {{apparent-power|apparent power}} (MVA), which is what actually loads up your {{conductor|conductors}} and transformers." },
          { t: "note", kind: "alert", title: "Common trap",
            html: "Because reactive power does 'no work,' beginners assume it doesn't matter. It matters enormously: without enough reactive support in the right places, voltage collapses — and {{voltage-collapse|voltage collapse}} can take down a wide area faster than a thermal overload." },
          { t: "p", html: "The relationship between the three is the <strong>power triangle</strong>, and the angle of that triangle is set by the {{power-factor|power factor}}. Drag the slider below to feel how shifting the mix between real and reactive power changes the total apparent loading on your equipment." },
          { t: "interactive", id: "powerTriangle" },
          { t: "note", kind: "op", title: "Why this shows up on the exam",
            html: "A Transmission Operator constantly trades voltage against reactive resources. Every scenario about {{capacitor-bank|capacitor banks}}, {{reactor|reactors}}, generator VARs, or low-voltage conditions traces back to this triangle. Get comfortable here and a whole class of questions gets easier." }
        ]
      },

      /* ---- Section: Three-phase power ---- */
      { id: "f-three-phase", title: "Three-phase power",
        body: [
          { t: "p", html: "The last section said the grid runs on AC. Here's the part that trips up newcomers: it doesn't run on <em>one</em> alternating voltage \u2014 it runs on <strong>three</strong>. Almost every {{transmission-line|line}}, {{generator|generator}}, and large motor on the bulk system is {{three-phase|three-phase}}: three separate {{conductor|conductors}} carrying voltages of the same size, each shifted in time by 120 degrees \u2014 exactly one-third of a cycle apart." },
          { t: "p", html: "That 120-degree spacing isn't an accident, and the payoff is easiest to <em>see</em>. Drag the slider to scrub through one AC cycle. Watch the three phasors rotate together, watch the three waves slide past the cursor \u2014 and keep an eye on the bottom strip, the total power being delivered to the load." },
          { t: "interactive", id: "threePhase" },
          { t: "h", text: "Why three, and why 120 degrees apart" },
          { t: "p", html: "With a {{balanced|balanced}} three-phase load, two things happen that make the whole grid work better. First, the total power delivered is <strong>constant</strong> \u2014 a flat line, not a pulsing one. As one phase falls away from its peak, the other two are rising to cover it, so the load receives smooth power every instant. A single-phase supply, by contrast, drops to zero power twice per cycle (flip the simulator to \u201CSingle-phase\u201D and watch the bottom strip pulse)." },
          { t: "list", items: [
            "<strong>Smooth power</strong> \u2014 constant delivery means less vibration and stress in generators and motors, and steadier operation across the system.",
            "<strong>The three currents cancel</strong> \u2014 when balanced, the phase currents sum to zero, so no bulky {{neutral|return conductor}} is needed to carry them. That moves the same power with less conductor.",
            "<strong>It spins machines</strong> \u2014 three currents 120 degrees apart naturally create a {{rotating-field|rotating magnetic field}}, which is what turns motors and lets {{generator|generators}} make power in the first place."
          ] },
          { t: "note", kind: "op", title: "What 'balanced' means to you",
            html: "Operators care about balance because imbalance has consequences. When the three phases drift apart in magnitude \u2014 unequal loading, or a lost phase \u2014 leftover {{neutral|neutral current}} appears, equipment heats unevenly, and protection can operate. Flip the simulator to \u201CUnbalanced\u201D and notice the A+B+C readout stops sitting at zero: that non-zero sum is current that now has to flow somewhere." },
          { t: "note", kind: "normal", title: "Why your one-line hides all this",
            html: "Your {{one-line|one-line diagram}} draws each circuit as a <em>single</em> line even though it's really three energized {{conductor|conductors}}. That's a deliberate simplification: because balanced three-phase behaves so predictably, operators can reason about one representative phase and let the one-line stand in for all three. When you read \u201C230 kV,\u201D that's the three-phase line-to-line voltage of the whole set." },
          { t: "note", kind: "op", title: "Why this shows up on the exam",
            html: "You won't be asked to derive three-phase math, but the intuition underlies a lot: why balance matters, why a lost phase is a problem, why voltages are quoted the way they are, and how generators and motors relate to the system. Get the picture here and later material on {{voltage|voltage}}, {{real-power|real}} and {{reactive-power|reactive power}} sits on solid ground." }
        ]
      },

      /* ---- Section: MW, MVAR, and MVA in practice ---- */
      { id: "f-power-in-practice", title: "MW, MVAR, and MVA in practice",
        body: [
          { t: "p", html: "The power triangle isn't just theory \u2014 it's the lever an operator pulls all shift. Here's what actually moves each quantity and why you'd want to." },
          { t: "h", text: "What moves real power (MW)" },
          { t: "p", html: "{{real-power|Real power}} follows {{dispatch|generation dispatch}} and load. You don't usually create MW at a substation; it's produced by generators and consumed by load, and it flows across your lines according to the physics of the network. Your job is to keep those flows within limits." },
          { t: "h", text: "What moves reactive power (MVAR) and voltage" },
          { t: "p", html: "{{reactive-power|Reactive power}} is local and it's the operator's voltage tool. To <strong>raise</strong> voltage, add reactive supply: switch in a {{capacitor-bank|capacitor bank}} or raise generator VARs nearby. To <strong>lower</strong> voltage, absorb reactive: switch in a {{reactor|shunt reactor}} or lower generator VARs. Reactive support doesn't travel far, so it has to be applied close to the problem." },
          { t: "note", kind: "op", title: "The everyday trade",
            html: "Heavy load pulls voltage down and eats reactive reserves; light load (especially on long, lightly loaded lines) lets voltage drift up. Much of voltage control is anticipating which way the day is pushing you and staging capacitors and reactors accordingly." },
          { t: "h", text: "Why MVA is the one that trips things" },
          { t: "p", html: "Equipment heats up from total current, so thermal limits are in {{apparent-power|MVA}} (or amps), not MW alone. Two circuits carrying the same 300 MW can load their conductors very differently if one is also pushing a lot of MVAR \u2014 the higher-MVA one is closer to its {{ampacity|thermal limit}}. That's why a low {{power-factor|power factor}} quietly steals capacity." },
          { t: "note", kind: "alert", title: "Watch for",
            html: "A line can be well under its MW capability and still be thermally overloaded because of reactive flow. Always judge loading against the MVA (or amp) rating, not the MW number." }
        ]
      },

      /* ---- Section: Reading a one-line ---- */
      { id: "f-reading-oneline", title: "Reading a one-line",
        body: [
          { t: "p", html: "The {{one-line|one-line diagram}} is your map. Fluency here means seeing, at a glance, what's connected to what, what's energized, and what you can switch." },
          { t: "h", text: "The core symbols" },
          { t: "list", items: [
            "<strong>{{bus|Bus}}</strong> \u2014 a heavy bar; the common tie point where elements connect.",
            "<strong>{{circuit-breaker|Breaker}}</strong> \u2014 usually a square; it can interrupt fault current, so it's your primary switching point.",
            "<strong>{{disconnect|Disconnect switch}}</strong> \u2014 an open-blade symbol; provides visible isolation but is not meant to break load or fault current.",
            "<strong>{{transformer-eq|Transformer}}</strong> \u2014 two linked circles; ties two voltage levels together.",
            "<strong>Line</strong> \u2014 a conductor between substations; <strong>generator</strong> \u2014 a circle, often 'G'; <strong>load</strong> \u2014 an arrow or tap."
          ] },
          { t: "note", kind: "op", title: "Normal state matters",
            html: "Elements have a <em>normal</em> position \u2014 a normally-open (N.O.) tie breaker sits open until you need it; a normally-closed one carries load. Knowing the normal configuration is what lets you spot when something is out of place." },
          { t: "p", html: "Below is a one-line you can operate. Trip the breaker and watch the line and load lose energization \u2014 the same green-to-gray change you read on a console. Switching like this to move load between paths is called <strong>{{reconfiguration|reconfiguration}}</strong>." },
          { t: "interactive", id: "oneLine" },
          { t: "note", kind: "alert", title: "Breaker vs. switch \u2014 don't mix them up",
            html: "You open a breaker to interrupt current, then a disconnect to create isolation. Operating a disconnect under load can draw a dangerous arc. The sequence is a real operating discipline, and the exam tests that you know the difference." }
        ]
      },

      /* ---- Section: The reliability landscape ---- */
      { id: "f-reliability-landscape", title: "Who's who: the reliability landscape",
        body: [
          { t: "p", html: "Reliability is a team sport with a clear chain of authority. At the top of the rulebook sits {{nerc|NERC}}, the organization that writes and enforces the mandatory {{reliability-standard|Reliability Standards}}. Those standards carry the force of law in the U.S. because {{ferc|FERC}} approved them." },
          { t: "h", text: "The functional roles" },
          { t: "list", items: [
            "{{rc|Reliability Coordinator}} — the widest-area view and the highest real-time operating authority. When something threatens multiple systems, the RC can direct action.",
            "{{ba|Balancing Authority}} — keeps generation and load in balance and supports Interconnection {{frequency|frequency}} within its area.",
            "{{top|Transmission Operator}} — operates the transmission facilities reliably in real time. This is the functional role your NERC TO credential maps to.",
            "{{gop|Generator Operator}} — runs the generating units and follows dispatch and voltage instructions.",
            "{{rto|RTO / ISO}} — an independent operator of the grid and market for a region, often acting as RC and BA at once (for example, SPP, MISO, PJM, ERCOT)."
          ] },
          { t: "interactive", id: "authorityMap" },
          { t: "note", kind: "op", title: "Where you sit",
            html: "As a TOP you take direction from your {{rc}} on wide-area issues, coordinate constantly with neighboring {{top|TOPs}} and your {{ba}}, and issue instructions to {{gop|GOPs}} on your system. Knowing who can tell whom to do what — and when you must act on an RC directive — is heavily tested." },
          { t: "h", text: "Operating within limits" },
          { t: "p", html: "The system is operated to stay inside defined limits. A {{sol|System Operating Limit}} is a value — a flow, a voltage, a stability boundary — you must not exceed beyond set timeframes. The most serious of these is an {{irol|Interconnection Reliability Operating Limit}}: exceed it and you risk instability, uncontrolled separation, or cascading outages across a wide area, so IROLs carry the tightest clocks." },
          { t: "p", html: "Underpinning all of it is the {{n-1|N-1 criterion}}: the system should survive the loss of any single element — a {{contingency|contingency}} — without violating limits. Much of real-time transmission operation is making sure that's still true after every change on your system." },
          { t: "note", kind: "emergency", title: "The stakes",
            html: "An unmanaged {{irol}} violation is exactly the kind of condition that has preceded historic wide-area blackouts. This is why NERC certification exists and why the exam takes limits so seriously." }
        ]
      },

      /* ---- Section: The cast in depth ---- */
      { id: "f-key-players", title: "The cast in depth: owners, operators, and authorities",
        body: [
          { t: "p", html: "If the roster of acronyms feels like alphabet soup, that's normal \u2014 and there's a key that unlocks it. {{nerc|NERC}} assigns reliability responsibilities by {{functional-model|<em>function</em>}}, not by company. An entity registers for whichever jobs it actually does, so one organization usually wears several hats at once." },
          { t: "note", kind: "op", title: "One company, many hats",
            html: "Your local utility might be a {{gen-owner|Generator Owner}}, {{trans-owner|Transmission Owner}}, {{top|Transmission Operator}}, and {{dp|Distribution Provider}} all at the same time. An {{rto|RTO/ISO}} like SPP or PJM is often the {{rc|RC}}, {{ba|BA}}, {{top|TOP}}, {{tsp|TSP}}, and {{pc|PC}} for its whole footprint. So when you ask \u201Cwho does that?\u201D the real question is \u201Cwhich <em>hat</em> does that?\u201D" },
          { t: "h", text: "The distinction that unlocks the rest: operate vs. own" },
          { t: "p", html: "The single most common source of confusion is mixing up <strong>operating</strong> and <strong>owning</strong>. An <strong>operator</strong> runs equipment in real time \u2014 the {{gop|GOP}} runs the units, the {{top|TOP}} works the transmission, the {{ba|BA}} balances the area. An <strong>owner</strong> owns and maintains the iron \u2014 the {{gen-owner|Generator Owner}} and {{trans-owner|Transmission Owner}} are responsible for ratings, protection, and upkeep, but don't sit at the console. The same 345 kV substation is typically <em>owned</em> by a Transmission Owner and <em>operated</em> by a Transmission Operator. Your NERC credential is an <strong>operator</strong> credential." },
          { t: "h", text: "Three layers of 'who'" },
          { t: "list", items: [
            "<strong>Authorities & regulators</strong> \u2014 {{ferc|FERC}} approves the standards and gives them force of law; {{nerc|NERC}} writes and enforces them; {{regional-entity|Regional Entities}} enforce them region by region. In real time, the {{rc|RC}} holds the highest operating authority.",
            "<strong>Operators</strong> \u2014 {{ba|BA}}, {{top|TOP}}, {{gop|GOP}}, and {{dp|DP}} run <em>today's</em> system.",
            "<strong>Owners & planners</strong> \u2014 the {{gen-owner|GO}} and {{trans-owner|TO}} own the equipment; the {{pc|Planning Coordinator}} and {{tp|Transmission Planner}} design <em>tomorrow's</em> system.",
            "<strong>Market & service</strong> \u2014 the {{tsp|TSP}} sells transmission, the {{lse|LSE}} arranges to serve load, and the {{pse|PSE}} trades energy; their deals become the {{interchange|interchange}} schedules operators must honor."
          ] },
          { t: "p", html: "Tap through the whole cast below \u2014 each entity shows what it does, who directs it, and who it works with. The colors group the four kinds of role." },
          { t: "interactive", id: "functionalRoles" },
          { t: "h", text: "The two chains that matter" },
          { t: "note", kind: "normal", title: "Real-time chain of command",
            html: "When the system needs action <em>now</em>: the {{rc|RC}} sits at the top, directing {{ba|BAs}} and {{top|TOPs}}; those direct {{gop|GOPs}} on output and switching; and the {{dp|DP}} carries out load actions when instructed. This chain follows the <em>operating</em> function \u2014 it does not matter who owns the equipment." },
          { t: "note", kind: "op", title: "Compliance chain (a different chain)",
            html: "For <em>rules and enforcement</em> \u2014 a separate ladder: {{ferc|FERC}} \u2192 {{nerc|NERC}} \u2192 {{regional-entity|Regional Entities}} \u2192 the registered entities. Don't confuse the two: the RC can direct your switching in real time, but it's your Regional Entity that audits your compliance." },
          { t: "h", text: "How they all interact on a normal day" },
          { t: "p", html: "Follow one transaction and nearly every role appears. A {{pse|PSE}} arranges to buy power from a plant in the next area; that becomes an {{interchange|interchange}} schedule the two {{ba|BAs}} build into their {{ace|ACE}}. A {{tsp|TSP}} confirms transmission service for the deal. The selling {{gop|GOP}} runs the {{gen-owner|Generator Owner's}} units to produce it; the {{top|TOPs}} along the path operate the {{trans-owner|Transmission Owners'}} lines to move it; the {{rc|RC}} watches the whole region for limits; and the {{dp|DP}} finally delivers it to the {{lse|LSE's}} customers. One deal, the entire functional model in motion." },
          { t: "scenario", role: "Transmission Operator", title: "You're the operator: who's responsible?",
            setup: "A 345 kV line on your system is heading toward a post-contingency overload. Relieving it will take a generator near the line to lower its output, plus a switching step at a substation that a neighboring company <em>owns</em> but that you operate under your {{top|TOP}} function.",
            steps: [
              { stem: "You need that generator to reduce its MW output. Who do you direct \u2014 and who actually owns the unit?",
                options: [
                  "Direct the Generator Owner to change output; the Generator Operator just maintains the equipment.",
                  "Direct the Generator Operator to change output; the Generator Owner owns and maintains the unit but doesn't run it in real time.",
                  "Direct the Load-Serving Entity, since it's responsible for the load in the area.",
                  "Direct the Transmission Service Provider, since it sells the transmission the power moves on."
                ],
                answer: 1,
                explain: "Real-time output changes go to the <em>operator</em>: the {{gop|GOP}} runs the units and follows your dispatch and voltage instructions. The {{gen-owner|Generator Owner}} owns the iron and is responsible for its maintenance, ratings, and protection, but does not operate it minute to minute. This operate-vs-own split runs through the entire {{functional-model|functional model}}.",
                optFeedback: { "0": "Reversed: the Generator Owner owns and maintains; the Generator Operator runs the unit in real time and takes your instruction.", "2": "The LSE arranges to serve load commercially; it has no role in a generating unit's real-time MW output.", "3": "The TSP administers transmission service and tariff \u2014 it doesn't operate generation." } },
              { stem: "The switching step is at that neighbor-owned substation, and your {{rc|RC}} is watching the same constraint region-wide. Who has authority to direct the switching, and who could compel action if it became an {{irol|IROL}}?",
                options: [
                  "The Transmission Owner must approve each switch in real time before you may act, since it owns the substation.",
                  "You, as the TOP, direct real-time switching on facilities you operate; and the RC, with the widest-area authority, can direct action if it becomes an IROL concern.",
                  "FERC directs the switching, as the federal authority over reliability.",
                  "The Planning Coordinator directs it, since it coordinates the transmission system."
                ],
                answer: 1,
                explain: "Operating authority follows the operating <em>function</em>, not ownership: the {{top|TOP}} operates the transmission facilities in real time even when another entity owns them. Above you, the {{rc|RC}} holds the highest real-time authority and can direct BAs and TOPs when a wide-area limit \u2014 especially an {{irol|IROL}} \u2014 is at stake. Owners, planners, and regulators shape the system but don't run it in the moment.",
                optFeedback: { "0": "Ownership does not confer real-time control \u2014 the TOP operates the facilities, including ones it doesn't own.", "2": "FERC is the regulator that gives standards force of law; it does not direct real-time switching.", "3": "The Planning Coordinator works the planning horizon, not real-time operations." } }
            ],
            debrief: "The functional model separates three things people constantly conflate: who <em>owns</em> the iron ({{gen-owner|GO}}, {{trans-owner|TO}}), who <em>operates</em> it in real time ({{gop|GOP}}, {{top|TOP}}, {{ba|BA}}, {{dp|DP}} under the {{rc|RC}}), and who <em>regulates or plans</em> it ({{ferc|FERC}}, {{nerc|NERC}}, {{regional-entity|Regional Entities}}, {{pc|PC}}, {{tp|TP}}). Real-time authority flows RC \u2192 BA/TOP \u2192 GOP, no matter who owns the equipment." }
        ]
      },

      /* ---- Section: Operating within limits (SOL, IROL, N-1) ---- */
      { id: "f-limits", title: "Operating within limits: SOL, IROL, N-1",
        body: [
          { t: "p", html: "This is the idea the whole exam orbits, so it earns its own section. The system is operated not just for the way it is right now, but for the way it would be after losing a single element." },
          { t: "h", text: "N-1 in one picture" },
          { t: "p", html: "The {{n-1|N-1 criterion}} says: after the loss of any one element \u2014 a {{contingency|contingency}} \u2014 the survivors must still be within limits. Try it below. Raise the transfer, then trip a line and watch all the flow land on the remaining path. Notice the band where <em>both</em> lines look fine, but a single trip would overload the survivor \u2014 that's a system that is <strong>not N-1 secure</strong>, and an operator must reduce the transfer before the contingency happens, not after." },
          { t: "interactive", id: "contingencyFlow" },
          { t: "h", text: "SOL vs. IROL" },
          { t: "p", html: "A {{sol|System Operating Limit}} is any value \u2014 thermal ({{ampacity|ampacity}}), voltage, or stability \u2014 you must stay within. An {{irol|IROL}} is the subset of SOLs whose violation could cascade across a wide area, so IROLs carry the tightest clocks. Related figures like {{transfer-capability|Total Transfer Capability}} come from the same studies that set these limits." },
          { t: "note", kind: "op", title: "What you actually watch",
            html: "Real-time contingency analysis, fed by the {{state-estimator|state estimator}}, continuously asks 'what breaks a limit if we lose element X?' Green means N-1 secure; a flagged post-contingency violation means act now \u2014 reconfigure, redispatch, or reduce transfer \u2014 before the contingency occurs." },
          { t: "note", kind: "alert", title: "When the tools go dark",
            html: "If the state estimator or contingency analysis fails, you've lost the ability to see post-contingency problems. That is itself an emergency-preparedness topic on the exam: know your backup procedures and operate more conservatively until the tools return." },
          { t: "p", html: "Some contingencies are handled automatically by a {{ras|Remedial Action Scheme}} \u2014 a pre-planned automatic action that trips generation, sheds load, or reconfigures to keep the system inside limits and prevent {{cascading|cascading}}." }
        ]
      }
    ]
  },

  /* ---- PLACEHOLDER MODULES (skeleton for later builds) ----------------- */
  { id: "transmission-ops", code: "M1", title: "Transmission Operations", weight: "core",
    status: "ready",
    blurb: "The heart of the TO exam (29 scored questions). Real-time monitoring, how power actually flows, equipment in operation, switching, operating to limits, and protection awareness.",
    sections: [

      /* ---- Real-time monitoring ---- */
      { id: "m1-monitoring", title: "Real-time monitoring: SCADA and the EMS",
        body: [
          { t: "p", html: "You operate a system you can't see directly. Your window into it is {{scada|SCADA}}, which pulls {{telemetry|telemetry}} \u2014 MW, MVAR, voltage, breaker status \u2014 back from the field and lets you send controls out. Built on top of that is the {{ems|EMS}}, the software suite hosting your displays, alarms, and analysis tools." },
          { t: "h", text: "From raw data to a usable picture" },
          { t: "p", html: "Raw telemetry is noisy and occasionally missing, so the {{state-estimator|state estimator}} blends it into a best estimate of the actual system state. That estimate feeds {{rtca|real-time contingency analysis}}, which continuously asks \u201cwhat breaks a limit if we lose element X?\u201d Together they give you situational awareness: not just what is happening, but what would happen after a credible loss." },
          { t: "note", kind: "op", title: "Alarms are a queue, not a verdict",
            html: "A flood of alarms during an event still has to be triaged \u2014 the most reliability-significant condition first. Good operators keep a mental model of the system so they can tell a symptom from the root cause." },
          { t: "note", kind: "alert", title: "When the picture degrades",
            html: "Loss of telemetry, a failed state estimator, or loss of contingency analysis all shrink your awareness. The correct response is to recognize the degraded state, notify as required, lean on backups, and operate more conservatively \u2014 an explicit exam topic (Response to Loss of Analysis and Monitoring Tools)." }
        ] },

      /* ---- Power flow behavior ---- */
      { id: "m1-powerflow", title: "How power actually flows",
        body: [
          { t: "p", html: "One idea trips up almost every newcomer: you cannot steer power like traffic. Real power divides among available paths <strong>inversely to their impedance</strong> \u2014 the lower-impedance path takes the bigger share \u2014 regardless of who scheduled what." },
          { t: "p", html: "Adjust the impedance below and watch the split move. Then open a path and see all the flow reroute onto the other one \u2014 which is exactly the redistribution that makes a contingency dangerous." },
          { t: "interactive", id: "parallelFlow" },
          { t: "h", text: "Loop flow is normal, not a glitch" },
          { t: "p", html: "Because flow follows physics, a scheduled transfer between two systems can {{loop-flow|loop}} through a third. That parallel flow is why wide-area coordination exists and why relief procedures (like Transmission Loading Relief) act across systems, not just within one." },
          { t: "note", kind: "op", title: "The real controls",
            html: "To actually shift MW between paths you change impedance or topology: a {{phase-shifter|phase-shifting transformer}} nudges flow onto or off a path, {{series-compensation|series compensation}} lowers a line's impedance, and switching removes a path entirely. Wanting flow to move isn't a control; these are." }
        ] },

      /* ---- Equipment in operation ---- */
      { id: "m1-equipment", title: "Transmission equipment in operation",
        body: [
          { t: "p", html: "You don't maintain equipment, but you operate it, so you need to know what each device does and its operating implications." },
          { t: "list", items: [
            "<strong>Lines</strong> carry power and have thermal ({{ampacity|ampacity}}) ratings that vary with ambient conditions \u2014 usually a <em>normal</em> and one or more <em>emergency</em> ratings.",
            "<strong>{{transformer-eq|Transformers}}</strong> tie voltage levels; many have a {{ltc|load tap changer}} that regulates voltage under load by changing taps.",
            "<strong>{{phase-shifter|Phase-shifting transformers}}</strong> control real-power flow across a path.",
            "<strong>{{capacitor-bank|Capacitors}}</strong> and {{reactor|reactors}} manage reactive power and voltage; {{series-compensation|series capacitors}} lower line impedance.",
            "<strong>{{circuit-breaker|Breakers}}</strong> interrupt current (including faults); {{disconnect|disconnect switches}} provide visible isolation."
          ] },
          { t: "note", kind: "op", title: "Normal vs. emergency ratings",
            html: "Equipment can be operated above its normal rating for limited time under an emergency rating. Knowing which rating applies \u2014 and for how long \u2014 is central to real-time decisions when loading climbs." }
        ] },

      /* ---- Switching & reconfiguration ---- */
      { id: "m1-switching", title: "Switching and reconfiguration",
        body: [
          { t: "p", html: "Switching is how you change the network in real time \u2014 to take equipment out for work, restore it, or reconfigure to relieve a problem. It is powerful and, done wrong, dangerous, so it follows disciplined procedure." },
          { t: "h", text: "Order, isolation, and clearances" },
          { t: "p", html: "Interrupt current with a {{circuit-breaker|breaker}} first, then open a {{disconnect|disconnect}} for visible isolation \u2014 never operate a disconnect under load. When people will work on equipment, a formal {{clearance|clearance / protective hold}} guarantees it stays isolated and can't be re-energized until the clearance is released." },
          { t: "p", html: "Below, operate a breaker and watch the downstream de-energize \u2014 the state change you confirm before granting a clearance." },
          { t: "interactive", id: "oneLine" },
          { t: "note", kind: "alert", title: "Planned vs. forced",
            html: "A <em>planned</em> outage is studied and coordinated ahead of time so the system stays secure while it's out. A <em>forced</em> outage is the unplanned loss of an element \u2014 the contingency your N-1 posture is meant to survive. Coordinating planned outages so they don't stack into a reliability problem is a real duty." }
        ] },

      /* ---- Operating to limits in real time ---- */
      { id: "m1-limits-realtime", title: "Operating to limits in real time",
        body: [
          { t: "p", html: "Foundations introduced {{sol|SOLs}}, {{irol|IROLs}}, and {{n-1|N-1}}. In operations, the job is continuous: keep the system within limits now <em>and</em> secure for the next credible loss." },
          { t: "p", html: "Try the contingency picture again with an operator's eye \u2014 the band where both elements look fine but a single trip overloads the survivor is precisely where you must act early." },
          { t: "interactive", id: "contingencyFlow" },
          { t: "h", text: "Your menu of actions" },
          { t: "list", items: [
            "<strong>Reconfigure</strong> \u2014 switch to change how flow distributes.",
            "<strong>Redispatch</strong> \u2014 request generation changes to move flow off a constrained element.",
            "<strong>Reduce transfer</strong> \u2014 curtail interchange or transactions loading the constraint.",
            "<strong>Use controls</strong> \u2014 phase shifters, taps, reactive devices.",
            "<strong>Shed load</strong> \u2014 the last resort when nothing else restores limits in time."
          ] },
          { t: "note", kind: "emergency", title: "IROLs run on a clock",
            html: "An IROL exceedance must be resolved within its defined time (often on the order of minutes) because the consequence is wide-area {{cascading|cascading}}. Act decisively; don't wait for the contingency to occur." },
          { t: "scenario", role: "Transmission Operator", title: "You're the operator: a post-contingency overload",
            setup: "It's a hot afternoon with high transfers across your area. Your real-time {{rtca|contingency analysis}} flags that for the loss of the Oak Ridge\u2013Sumner 345 kV line, the parallel Cedar 345 kV line would load to 118% of its rating \u2014 a post-contingency {{irol|IROL}} exceedance. Both lines are in service and within limits <em>right now</em>.",
            steps: [
              { stem: "What is your first move?",
                options: [
                  "Nothing yet \u2014 both lines are within limits, so wait to see whether the contingency actually happens.",
                  "Reduce the transfer and request redispatch to relieve the projected overload now.",
                  "Pre-emptively open the Cedar line to protect it from the possible overload.",
                  "Shed load in the area immediately."
                ],
                answer: 1,
                explain: "A post-contingency IROL must be resolved within its defined time \u2014 you act on the credible contingency <em>before</em> it occurs, not after. With the system still intact, your lower-impact levers come first: reduce the interchange/transfer loading the constraint and redispatch generation to move flow off the Cedar line, restoring a secure {{n-1|N-1}} state.",
                optFeedback: { "0": "Waiting is the trap: the exceedance is post-contingency and IROLs are resolved proactively, on a clock \u2014 not after the trip.", "2": "Removing an in-service element weakens the network you are relying on; you would shrink capacity and could create an overload rather than prevent one.", "3": "Load shedding is the last resort. Reconfiguration, redispatch, and transfer reduction come first." } },
              { stem: "You've called for redispatch, but the generation will take several minutes to move, and your {{rc|RC}} tells you this exceedance must be cleared inside its 30-minute IROL window. Voltage is fine. What now?",
                options: [
                  "Keep waiting on the redispatch and hope it clears the projected overload in time.",
                  "Curtail the interchange transactions loading the path now, and consider reconfiguration, to buy margin while generation moves.",
                  "Consider the exceedance resolved \u2014 you've issued the redispatch \u2014 and move on.",
                  "Increase the transfer to test how close the limit really is."
                ],
                answer: 1,
                explain: "Redispatch alone can be too slow for the IROL clock. Faster-acting levers \u2014 curtailing the transactions loading the path and {{reconfiguration|reconfiguring}} to redistribute flow \u2014 reduce the projected overload now, keeping you inside the time limit while the slower generation change catches up. Load shedding stays in reserve as the backstop if nothing else restores a secure state in time.",
                optFeedback: { "0": "Hoping is not a plan against an IROL clock; you need faster-acting relief running in parallel with the redispatch.", "2": "It isn't resolved until the projected post-contingency loading is back within limits \u2014 verify the result, don't assume it.", "3": "Increasing transfer loads the constraint further \u2014 the opposite of resolving the exceedance." } }
            ],
            debrief: "The pattern the exam rewards: recognize a post-contingency IROL early, act while the system is still intact, and escalate from lower-impact actions (reconfigure, redispatch, reduce transfer) toward load shedding only as a last resort \u2014 always respecting the IROL clock." }
        ] },

      /* ---- Protection & control awareness ---- */
      { id: "m1-protection", title: "Protection and control for operators",
        body: [
          { t: "p", html: "Protection acts in cycles \u2014 far faster than any human \u2014 so your job isn't to operate relays in real time but to understand what they'll do and to keep the system in a state where they protect rather than surprise you. (Device-level detail comes in the Protection module.)" },
          { t: "list", items: [
            "<strong>{{protective-relay|Protective relays}}</strong> detect faults and trip {{circuit-breaker|breakers}} to isolate the faulted element quickly.",
            "<strong>{{reclosing|Automatic reclosing}}</strong> may re-close a breaker after a trip, since many faults are temporary \u2014 but reclosing into a permanent fault or across an open angle can be damaging.",
            "<strong>Breaker failure</strong> schemes trip surrounding breakers if a breaker doesn't clear a fault, widening the outage to protect the system.",
            "<strong>{{ras|Remedial Action Schemes}}</strong> take automatic pre-planned action for defined contingencies."
          ] },
          { t: "note", kind: "op", title: "Relay loadability",
            html: "Relays must not trip on heavy-but-safe loading. Standards on relay loadability exist so that operating a line hard \u2014 within its rating \u2014 doesn't cause a protection misoperation that removes it needlessly. It's a direct link between how you load the system and how protection behaves." },
          { t: "note", kind: "alert", title: "Misoperations matter",
            html: "A protection misoperation \u2014 a trip that shouldn't have happened, or a failure to trip \u2014 can turn a small event into a large one. Operators report and help investigate them; correcting misoperations is its own standard." }
        ] }
    ] },

  { id: "voltage-reactive", code: "M2", title: "Voltage & Reactive Control", weight: "core",
    status: "ready",
    blurb: "Holding voltage with reactive resources, coordinating voltage schedules, and recognizing and arresting voltage collapse. Depth behind the Voltage & Reactive exam sub-topic.",
    sections: [

      /* ---- Why voltage matters ---- */
      { id: "m2-why-voltage", title: "Why voltage matters",
        body: [
          { t: "p", html: "Unlike {{frequency|frequency}}, which is one number for a whole Interconnection, {{voltage|voltage}} is <em>local</em> \u2014 every bus has its own, and each must stay inside a limit band. Keeping voltage in band, everywhere, all the time, is one of a TO's constant duties." },
          { t: "list", items: [
            "<strong>Too low</strong> \u2014 equipment draws more current for the same power, losses rise, motors stall, and \u2014 if it keeps falling \u2014 it can run away into collapse.",
            "<strong>Too high</strong> \u2014 stresses insulation and can damage equipment; common on lightly loaded lines from {{line-charging|line charging}}."
          ] },
          { t: "note", kind: "op", title: "Voltage is a reactive-power balance",
            html: "Where reactive supply meets reactive demand, voltage holds. Where demand outstrips supply, voltage sags. So 'controlling voltage' really means 'managing reactive power in the right places.'" }
        ] },

      /* ---- Reactive sources and sinks ---- */
      { id: "m2-reactive-sources", title: "Reactive sources and sinks",
        body: [
          { t: "p", html: "Your toolkit for voltage is a set of devices that supply {{reactive-power|reactive power}} (raise voltage) or absorb it (lower voltage)." },
          { t: "h", text: "To raise voltage (supply reactive)" },
          { t: "list", items: [
            "<strong>Generators</strong> via their {{avr|automatic voltage regulators}} \u2014 the fastest, most flexible source, adjustable continuously.",
            "<strong>{{capacitor-bank|Capacitor banks}}</strong> \u2014 switched in blocks; cheap but discrete.",
            "<strong>{{svc|SVCs / STATCOMs}}</strong> \u2014 power-electronic, fast and continuous."
          ] },
          { t: "h", text: "To lower voltage (absorb reactive)" },
          { t: "list", items: [
            "<strong>{{reactor|Shunt reactors}}</strong> \u2014 absorb reactive, countering {{line-charging|line charging}} at light load.",
            "<strong>Generators</strong> \u2014 reducing excitation to absorb reactive (within limits)."
          ] },
          { t: "note", kind: "alert", title: "Reactive doesn't travel",
            html: "Because reactive power is consumed by the reactance it flows through, it must be supplied near where it's needed. A big capacitor bank two areas away does little for a local low-voltage problem." }
        ] },

      /* ---- SIL and Ferranti rise ---- */
      { id: "m2-sil-ferranti", title: "Surge impedance loading and Ferranti rise",
        body: [
          { t: "p", html: "The previous section listed devices that supply or absorb {{reactive-power|reactive power}}. Here's the part that surprises people: <strong>the transmission line itself is both</strong>, and which one it acts like depends entirely on how heavily it's loaded." },
          { t: "list", items: [
            "<strong>It produces reactive power</strong> through {{line-charging|line charging}} \u2014 the capacitance between the conductors and ground. This is roughly constant for a given voltage and line length, whether the line is carrying power or not.",
            "<strong>It consumes reactive power</strong> in its series reactance (I\u00B2X). This depends on current, so it rises with the <em>square</em> of the loading \u2014 near zero on a lightly loaded line, large on a heavily loaded one."
          ] },
          { t: "h", text: "SIL is where the two balance" },
          { t: "p", html: "The {{sil|surge impedance loading}}, or SIL, of a transmission line is the MW loading at which a natural reactive power balance occurs \u2014 the point where what the line consumes exactly equals what it produces, and its net reactive exchange with the system is zero. Move the loading in the chart below and watch the two curves cross:" },
          { t: "interactive", id: "silCurve" },
          { t: "note", kind: "op", title: "Rules of thumb for an unloaded line",
            html: "The reactive power an unloaded line produces scales with voltage and length. Worth carrying in your head: roughly <strong>0.25 MVAR per mile at 230 kV</strong>, <strong>0.75 MVAR per mile at 345 kV</strong>, and <strong>2.0 MVAR per mile at 500 kV</strong>. A 100-mile 345 kV line sitting energized and unloaded is pushing about 75 MVAR into the system." },
          { t: "h", text: "Two worlds: normal operation vs. restoration" },
          { t: "list", items: [
            "<strong>During normal operation, lines run ABOVE SIL.</strong> There is more MW on the line than its charging can support, so the line is inductive: it <em>absorbs</em> VARs and tends to <em>lower</em> system voltage. Generators and {{capacitor-bank|capacitor banks}} supply the difference.",
            "<strong>During early restoration, lines run BELOW SIL.</strong> The system is lightly loaded, so lines produce more VARs than the MW flow consumes. The system is capacitive, voltage tends to <em>rise</em>, and that excess reactive has to be absorbed \u2014 by generators or {{reactor|shunt reactors}}."
          ] },
          { t: "h", text: "Ferranti rise" },
          { t: "p", html: "That second case has a name. {{ferranti|Ferranti rise}} \u2014 the Ferranti effect \u2014 is an increase in voltage at the <em>receiving</em> end of a long transmission line above the voltage at the <em>sending</em> end. It shows up when a line is energized but carries very light load or none at all, because a line without load is essentially a capacitor, and capacitors raise voltage. The longer the line, the larger the rise:" },
          { t: "interactive", id: "ferrantiRise" },
          { t: "note", kind: "alert", title: "Length is the driver",
            html: "Open-end voltage climbs with line length. Energizing at 138 kV, staying inside a 2% rise means a line of roughly 100 miles or less, and a 5% limit stretches that to about 160 miles. At 345 kV the same limits land near 95 and 150 miles. Long radial lines energized at light load are where this bites." },
          { t: "note", kind: "emergency", title: "Why this matters operationally \u2014 watch the machines",
            html: "Ferranti rise needs close monitoring during restoration. As you energize lightly loaded lines, system MVARs climb and your online generation absorbs them, running <em>under-excited</em> (in the lead). That drives the machine toward the under-excitation edge of its {{capability-curve|capability curve}} \u2014 the D-curve \u2014 where it is dangerously close to tripping. Restoring load and adjusting generation are how you keep voltage and the machines inside their limits." },
          { t: "note", kind: "normal", title: "The one-sentence version",
            html: "Below SIL, transmission lines <strong>produce</strong> VARs and tend to <strong>raise</strong> system voltage; above SIL they <strong>consume</strong> VARs and tend to <strong>lower</strong> it. If you remember only one line about Ferranti rise, make it that first half." }
        ] },

      /* ---- Voltage schedules ---- */
      { id: "m2-voltage-schedules", title: "Voltage schedules and coordination",
        body: [
          { t: "p", html: "Operators hold target voltages \u2014 {{voltage-schedule|voltage schedules}} \u2014 at key buses, and coordinate all the reactive resources to meet them. Generators are obligated to follow the voltage schedule the TOP or BA provides (the VAR standards)." },
          { t: "h", text: "Order of use" },
          { t: "p", html: "A common discipline: let continuous, fast resources (generator {{avr|AVRs}}, {{svc|SVCs}}) do the fine regulating, and use switched devices (capacitors, reactors) for coarse, bulk changes \u2014 keeping the continuous resources with headroom so they can respond to the next disturbance." },
          { t: "note", kind: "op", title: "Keep reactive reserve",
            html: "If your generators are already maxed out supplying reactive just to hold voltage now, you have nothing left for the next contingency. Preserving {{reactive-reserve|reactive reserve}} is as important as meeting the schedule this minute." }
        ] },

      /* ---- Voltage collapse ---- */
      { id: "m2-voltage-collapse", title: "Voltage stability and collapse",
        body: [
          { t: "p", html: "Voltage collapse is the failure mode this whole module guards against. As load rises, it demands more reactive power; if the system can't supply it, voltage falls \u2014 and past a certain point, falling voltage makes the shortfall worse, not better, and voltage runs away." },
          { t: "p", html: "The picture below is the classic <strong>P-V (nose) curve</strong>. Raise the load and watch voltage sag down the stable branch toward the nose \u2014 the maximum loadability. Push past it and there's no stable voltage: collapse. Then add reactive support and watch the nose extend, buying loadability and margin." },
          { t: "interactive", id: "pvCurve" },
          { t: "note", kind: "alert", title: "Warning signs",
            html: "Steadily declining voltages, reactive resources running to their limits, and shrinking {{reactive-reserve|reactive reserve}} are the fingerprints of approaching {{voltage-collapse|collapse}}. The response is decisive: add reactive fast, reduce loading/transfers, and if needed shed load ({{uvls|UVLS}} is the automatic backstop)." },
          { t: "note", kind: "emergency", title: "It moves fast",
            html: "Unlike a slow thermal climb, a voltage collapse can develop in seconds to minutes across a wide area. Recognizing the trend early \u2014 before the nose \u2014 is what gives you time to act." },
          { t: "scenario", role: "Transmission Operator", title: "You're the operator: voltage is sagging",
            setup: "It's near peak load on a hot afternoon. Over about twenty minutes you watch bus voltages on your Delta 230 kV system sag from 1.00 to 0.95 p.u. and keep drifting down. Two nearby generators are close to their reactive (MVAR) limits and your {{reactive-reserve|reactive reserve}} is shrinking.",
            steps: [
              { stem: "What are you most likely seeing, and what is your priority?",
                options: [
                  "A slow thermal overload \u2014 keep monitoring the trend for now.",
                  "Approaching voltage instability \u2014 add reactive support fast and reduce loading/transfers in the area.",
                  "Normal daily voltage drift \u2014 nothing to act on.",
                  "Switch in a shunt reactor at the sagging bus to steady it."
                ],
                answer: 1,
                explain: "Declining voltages, generators hitting their reactive limits, and a shrinking reactive reserve are the fingerprints of approaching {{voltage-collapse|voltage collapse}} \u2014 which can run away in seconds to minutes. The response is decisive: add reactive fast (switch in {{capacitor-bank|capacitor banks}}, raise generator VARs where headroom remains) and cut the loading and transfers stressing the area.",
                optFeedback: { "0": "Voltage collapse is not a slow thermal climb; once past the nose it runs away in minutes. Watching alone is not enough.", "2": "Sagging voltage <em>plus</em> generators at their VAR limits <em>plus</em> shrinking reserve is not routine drift \u2014 it is a warning.", "3": "A shunt {{reactor|reactor}} absorbs reactive power and pushes voltage <em>down</em> \u2014 the opposite of what a sagging bus needs. That would accelerate the collapse." } },
              { stem: "You switch in the available capacitor banks and raise generator VARs. Voltage steadies briefly, then resumes sagging \u2014 and you're nearly out of reactive resources, still above the load your {{uvls|UVLS}} scheme protects. What is the correct next action?",
                options: [
                  "Wait for voltage to reach the UVLS set point and let the automatic scheme do the work.",
                  "Manually reduce load in the affected area now to restore a stable voltage, rather than riding voltage down.",
                  "Push more transfer through the area to flush the low voltage out.",
                  "Take no further action \u2014 your reactive resources are spent."
                ],
                answer: 1,
                explain: "When reactive support is exhausted and voltage keeps declining, reducing load restores the balance. Manual load shedding to arrest the decline is preferable to riding voltage down until the automatic UVLS backstop operates (or collapse occurs). Acting before the nose is what turns an uncontrolled event into a controlled one.",
                optFeedback: { "0": "UVLS is a backstop, not a plan. Riding voltage down to the set point cedes control and risks passing the nose first.", "2": "More transfer means more reactive demand \u2014 you would deepen the sag, not flush it.", "3": "Standing pat while voltage runs away is how a local problem becomes a wide-area collapse." } }
            ],
            debrief: "Voltage collapse rewards early recognition and correctly-directed action: add reactive (capacitors and generator VARs \u2014 never a reactor) and cut loading; and if reactive is exhausted, shed load manually rather than riding voltage down to the automatic backstop." }
        ] }
    ] },

  { id: "operating-limits", code: "M3", title: "Operating Limits & Real-Time Assessment", weight: "core",
    status: "ready",
    blurb: "The Contingency Analysis & Reliability domain (20 exam questions): where limits come from, the tools that assess the system, and how operators respond to what those tools find.",
    sections: [

      /* ---- SOL & IROL ---- */
      { id: "m3-sol-irol", title: "Where limits come from: SOL and IROL",
        body: [
          { t: "p", html: "A {{sol|System Operating Limit}} is the value a facility or portion of the system must stay within to operate reliably. SOLs come in three flavors, and knowing which is binding matters." },
          { t: "list", items: [
            "<strong>Thermal</strong> \u2014 from equipment {{ampacity|ratings}}; exceed it and conductors or transformers overheat.",
            "<strong>Voltage</strong> \u2014 keep bus voltages inside their bands; the low end guards against {{voltage-collapse|collapse}}.",
            "<strong>Stability</strong> \u2014 keep the system able to stay in synchronism after a disturbance."
          ] },
          { t: "p", html: "An {{irol|IROL}} is the subset of SOLs whose violation could cause instability, uncontrolled separation, or {{cascading|cascading}} across a wide area. Because the consequence is wide-area, IROLs carry defined, short time limits (often minutes). SOLs and IROLs are established and communicated under the FAC standards, using an SOL methodology for the operations horizon." },
          { t: "note", kind: "op", title: "Same idea, different stakes",
            html: "Every IROL is an SOL; not every SOL is an IROL. The difference is how far the damage spreads if you blow through it \u2014 and therefore how fast you must act." }
        ] },

      /* ---- Network tools ---- */
      { id: "m3-network-tools", title: "Network analysis tools",
        body: [
          { t: "p", html: "You can't hold limits you can't see. A stack of EMS tools turns raw {{telemetry|telemetry}} into a picture you can act on." },
          { t: "list", items: [
            "<strong>{{state-estimator|State estimator}}</strong> \u2014 blends telemetry into a best estimate of the actual system state, filling gaps and filtering bad data.",
            "<strong>{{power-flow-study|Power flow}}</strong> \u2014 computes how power, voltages, and angles distribute for a given condition.",
            "<strong>{{rtca|Real-time contingency analysis}}</strong> \u2014 runs the power flow against a list of contingencies to find post-loss limit violations."
          ] },
          { t: "note", kind: "alert", title: "Garbage in, garbage out",
            html: "Contingency analysis is only as good as the state estimate feeding it. If the estimator won't solve or telemetry is bad, treat its results with suspicion and operate more conservatively \u2014 a tools-loss situation covered in Emergency Operations." },
          { t: "note", kind: "op", title: "Real-time assessment",
            html: "Standards require an ongoing {{real-time-assessment|real-time assessment}} \u2014 at least this analysis, at a required cadence \u2014 so you always know whether the system is reliable now and secure for the next loss." }
        ] },

      /* ---- Contingency analysis ---- */
      { id: "m3-contingency-analysis", title: "Contingency analysis and N-1",
        body: [
          { t: "p", html: "The heart of real-time reliability is the continuous question: <em>if we lose any single element, is everything still within limits?</em> That's the {{n-1|N-1}} test, and {{rtca|contingency analysis}} answers it over and over." },
          { t: "p", html: "Revisit the two-line picture with this lens \u2014 the analysis is flagging exactly the band where a single loss would overload the survivor." },
          { t: "interactive", id: "contingencyFlow" },
          { t: "h", text: "Actual vs. contingency" },
          { t: "p", html: "Operators track two states at once: the <strong>actual</strong> system (are we within limits right now?) and the <strong>contingency</strong> cases (would we be within limits after each credible loss?). Being fine now but insecure for a contingency still requires action." },
          { t: "note", kind: "op", title: "Credible contingencies",
            html: "Analysis focuses on credible events \u2014 typically the loss of any single element (N-1), and sometimes defined multiple losses. The goal isn't to survive every imaginable catastrophe, but to always be secure for the next credible one." }
        ] },

      /* ---- Response to results ---- */
      { id: "m3-response", title: "Responding to the results",
        body: [
          { t: "p", html: "Finding a problem is only useful if you act on it. When analysis flags an actual or post-contingency violation, operators move \u2014 promptly for an SOL, urgently for an {{irol|IROL}}." },
          { t: "h", text: "The action ladder (least to most drastic)" },
          { t: "list", items: [
            "<strong>Reconfigure / switch</strong> to change how flow distributes.",
            "<strong>Adjust controls</strong> \u2014 phase shifters, taps, reactive devices.",
            "<strong>Redispatch</strong> generation to move flow off the constraint.",
            "<strong>Reduce transfers</strong> \u2014 curtail interchange; in the East, {{tlr|Transmission Loading Relief}} coordinates this across systems.",
            "<strong>Shed load</strong> \u2014 the last resort when nothing else restores limits in time."
          ] },
          { t: "note", kind: "emergency", title: "IROLs are on a clock",
            html: "An IROL exceedance must be resolved within its defined time because the consequence is wide-area cascading. You act to relieve it now \u2014 you don't wait to see whether the contingency actually happens." },
          { t: "note", kind: "op", title: "Coordinate the fix",
            html: "Because flow follows physics across systems ({{loop-flow|loop flow}}), relief often needs neighbors and the RC. Your action on your system may need theirs to fully clear a constraint." }
        ] }
    ] },

  { id: "protection", code: "M4", title: "Protection Systems", weight: "support",
    status: "ready",
    blurb: "How relaying protects the system, how protection is coordinated, and the operator's role around it. Depth behind the Protection and Control sub-topic.",
    sections: [

      /* ---- Relaying & zones ---- */
      { id: "m4-relaying", title: "Relaying and protection zones",
        body: [
          { t: "p", html: "Protection exists to remove a faulted element fast \u2014 in cycles \u2014 before a fault damages equipment or destabilizes the system. {{protective-relay|Relays}} sense the fault and trip {{circuit-breaker|breakers}} to isolate it." },
          { t: "h", text: "Zones of protection" },
          { t: "p", html: "The system is divided into overlapping {{protection-zone|protection zones}} \u2014 around each line, bus, transformer, and generator \u2014 so no point is left unprotected. Overlap at the breakers means a fault always falls inside at least one zone." },
          { t: "note", kind: "op", title: "Selectivity",
            html: "Protection is coordinated to be <em>selective</em>: the device closest to the fault trips first and removes the smallest piece of the system. That's what keeps one fault from tripping half the network." }
        ] },

      /* ---- Reclosing, breaker failure, coordination ---- */
      { id: "m4-coordination", title: "Reclosing, backup, and breaker failure",
        body: [
          { t: "p", html: "Because many line faults are temporary, {{reclosing|automatic reclosing}} may re-close a breaker shortly after it trips to restore the line \u2014 but reclosing into a permanent fault, or across a large angle, can damage equipment, so schemes are engineered carefully." },
          { t: "h", text: "When something fails" },
          { t: "p", html: "Protection is layered. Every element has {{primary-backup-protection|primary and backup protection}}, so if the primary relay doesn't operate, backup does. {{breaker-failure|Breaker failure protection}} handles the case where a breaker itself fails to clear a fault \u2014 it trips the surrounding breakers to remove the fault, widening the outage as little as possible." },
          { t: "note", kind: "alert", title: "The operator's stake",
            html: "Relay {{ampacity|loadability}} rules keep protection from tripping on heavy-but-safe load. This is the direct link to your job: load a line within its rating and protection should leave it alone; the coordination is engineered around real operating conditions." }
        ] },

      /* ---- RAS & misoperations ---- */
      { id: "m4-ras-misop", title: "RAS and misoperations",
        body: [
          { t: "p", html: "Some contingencies are handled by a {{ras|Remedial Action Scheme}} \u2014 an automatic, pre-planned action (trip generation, shed load, reconfigure) for a defined event, to keep the system within limits and prevent {{cascading|cascading}}. Operators need to know which RAS are armed and what they'll do." },
          { t: "h", text: "When protection gets it wrong" },
          { t: "p", html: "A <strong>misoperation</strong> is a protection operation that shouldn't have happened, or a failure to operate when it should have. Either can turn a small event into a large one \u2014 an unnecessary trip removes a healthy element; a failure to trip leaves a fault on the system." },
          { t: "note", kind: "op", title: "Report and correct",
            html: "Operators report misoperations and support the investigation; identifying and correcting them is its own standard. A pattern of misoperations is a reliability problem worth chasing down." }
        ] }
    ] },

  { id: "emergency-ops", code: "M5", title: "Emergency Operations", weight: "core",
    status: "ready",
    blurb: "Preparing for and responding to emergencies (26 exam questions across Emergency Preparedness and Response). Planning, extreme weather and GMD, capacity/energy emergencies, disturbances, and operating when the control center or tools are lost.",
    sections: [

      /* ---- Same-day / next-day planning (3a) ---- */
      { id: "m5-prep-planning", title: "Same-day and next-day planning",
        body: [
          { t: "p", html: "Most emergencies are survived because of work done before they happen. Operators and their planning staff assess the coming day and the next day: expected load, generation and transmission availability, reserves, and known risks, then build an operating plan for reliability." },
          { t: "list", items: [
            "<strong>Study the horizon</strong> \u2014 next-day and same-day analyses identify constraints and needed actions before real time.",
            "<strong>Confirm reserves</strong> \u2014 enough {{contingency|contingency}} reserve and reactive margin to survive credible losses.",
            "<strong>Coordinate outages</strong> \u2014 make sure planned work doesn't stack into an insecure condition.",
            "<strong>Set triggers</strong> \u2014 know in advance what conditions call for what actions."
          ] },
          { t: "note", kind: "op", title: "Why it's on the exam",
            html: "Emergency preparedness is its own scored area. The exam rewards operators who think ahead \u2014 having a plan and clear triggers \u2014 rather than improvising once a problem is already unfolding." }
        ] },

      /* ---- Weather, disasters, GMD (3b) ---- */
      { id: "m5-weather-gmd", title: "Weather, natural disasters, and GMD",
        body: [
          { t: "p", html: "External events are a leading cause of emergencies, so preparedness against them is explicitly tested." },
          { t: "h", text: "Extreme weather" },
          { t: "p", html: "Extreme heat drives record load and stresses equipment; extreme cold can knock out generation and fuel supply at the same time demand spikes \u2014 the pattern behind major cold-weather events. Cold-weather preparedness (winterizing generation and readying operating plans) is now its own standard." },
          { t: "h", text: "Geomagnetic disturbances" },
          { t: "p", html: "A {{gmd|geomagnetic disturbance}} from solar activity induces quasi-DC currents that heat transformers and distort reactive behavior. When severe space weather is forecast, operators follow GMD operating procedures \u2014 increasing reactive margin, reducing loading on vulnerable elements, and watching for unusual reactive and voltage readings." },
          { t: "note", kind: "alert", title: "Simultaneous stress",
            html: "The dangerous events are the ones that hit supply and demand together \u2014 a cold snap that spikes load while freezing generation offline. Preparedness plans exist precisely for those correlated failures." }
        ] },

      /* ---- Capacity & energy emergencies (3c + 4c) ---- */
      { id: "m5-capacity", title: "Capacity and energy emergencies",
        body: [
          { t: "p", html: "When available supply may not cover demand, operators escalate through graded steps rather than jumping straight to the worst option." },
          { t: "h", text: "Anticipating the shortfall" },
          { t: "p", html: "An <em>anticipated capacity deficiency</em> is a forecast shortfall \u2014 you see it coming in the day-ahead or same-day picture. An {{energy-emergency|energy emergency}} is a possible inability to supply the energy needed to meet demand. Both are managed through the {{eea|Energy Emergency Alert}} process, which escalates by level as severity grows." },
          { t: "h", text: "The escalation ladder" },
          { t: "list", items: [
            "Deploy reserves and available resources; adjust interchange to import.",
            "Issue public appeals for conservation; interrupt loads that are contracted to be interruptible.",
            "Declare EEA levels as conditions worsen, signaling neighbors and the RC.",
            "As a last resort, shed firm {{load-shedding|load}} to keep the balance and protect the Interconnection."
          ] },
          { t: "note", kind: "emergency", title: "Controlled beats uncontrolled",
            html: "Deliberately shedding a defined block of firm load is far better than letting the imbalance drive an uncontrolled, cascading collapse. Timely, controlled load shedding is a sign of good operation, not failure." }
        ] },

      /* ---- Responding to disturbances (4b) ---- */
      { id: "m5-disturbances", title: "Responding to system disturbances",
        body: [
          { t: "p", html: "A disturbance is a sudden event \u2014 loss of a large unit, a fault, a trip \u2014 that knocks the system off balance. Response is part automatic, part operator." },
          { t: "h", text: "Frequency events" },
          { t: "p", html: "Losing generation drops {{frequency|frequency}}. Governors arrest it (primary response), then the Balancing Authority restores it and its ACE using {{contingency|contingency}} reserve (the Disturbance Control Standard governs recovery). If frequency keeps falling, automatic {{ufls|underfrequency load shedding}} sheds blocks at preset thresholds as a last-ditch backstop." },
          { t: "h", text: "Voltage events" },
          { t: "p", html: "A developing voltage collapse is arrested by adding reactive support fast and, if needed, automatic {{uvls|undervoltage load shedding}}. Recognizing decaying voltage early \u2014 before it runs away \u2014 is a core operator skill." },
          { t: "note", kind: "op", title: "Your job during the event",
            html: "Automatic schemes buy time; you stabilize and then rebuild margin \u2014 restore reserves, return frequency and voltage to normal, reassess N-1 security, and prepare for the next contingency. Report the disturbance as required." }
        ] },

      /* ---- Degraded operations: lost CC / tools (4d + 4e) ---- */
      { id: "m5-degraded", title: "Losing the control center or the tools",
        body: [
          { t: "p", html: "Two specific losses get their own exam topics because they blind or displace the operator: losing your monitoring/analysis tools, and losing the control center itself." },
          { t: "h", text: "Loss of analysis and monitoring tools" },
          { t: "p", html: "If the {{state-estimator|state estimator}} or {{rtca|contingency analysis}} fails, or {{telemetry|telemetry}} is lost, you can no longer see post-contingency problems. The response: recognize the degraded state, notify as required, use backup data and neighboring information, and operate more conservatively \u2014 hold extra margin \u2014 until the tools return." },
          { t: "h", text: "Loss of control center functionality" },
          { t: "p", html: "If the primary control center is lost, operations transfer to a backup facility. Having, maintaining, and being able to actually cut over to that backup is required, and operators drill it." },
          { t: "note", kind: "alert", title: "Conservative operation is the theme",
            html: "Whenever your awareness is reduced, the safe move is the same: widen margins, slow down changes, lean on coordination, and don't push the system near limits you can no longer see." }
        ] }
    ] },

  { id: "restoration", code: "M6", title: "System Restoration", weight: "support",
    status: "ready",
    blurb: "Bringing the system back after a partial or total shutdown (the System Restoration sub-area of Emergency Response). Blackstart and cranking paths, islanding and synchronizing, and cold load pickup.",
    sections: [

      /* ---- Restoration fundamentals (4a) ---- */
      { id: "m6-restoration", title: "System restoration fundamentals",
        body: [
          { t: "p", html: "Restoration is the discipline of rebuilding a system that has partially or fully collapsed. It runs on a pre-developed {{restoration-plan|restoration plan}} and, above all, on <strong>order</strong> \u2014 doing the right things in the right sequence." },
          { t: "h", text: "Blackstart and the cranking path" },
          { t: "p", html: "Most generators need station power to start, which they don't have during a blackout. A {{blackstart|blackstart resource}} can start on its own, and the {{cranking-path|cranking path}} is the transmission you energize from it to deliver startup power to larger units. Everything else grows from there." },
          { t: "p", html: "Walk the sequence below. Notice why each stage depends on the one before it \u2014 you can't pick up load you can't generate for, and you can't tie islands together until they match." },
          { t: "interactive", id: "restorationSeq" },
          { t: "h", text: "Three restoration approaches" },
          { t: "p", html: "There isn't one universal way to rebuild a dark system. There are <strong>three</strong> recognized approaches, and Transmission Operators and Reliability Coordinators are expected to understand all three and address them in their {{restoration-plan|restoration plans}}. Which one you use is decided by a single question: <em>what generation can you actually use?</em>" },
          { t: "list", items: [
            "<strong>{{outside-in|Outside In}}</strong> \u2014 used when the blacked-out portion has <strong>no</strong> {{blackstart|blackstart}} generation available. Transmission must be energized first to bring power <em>into</em> the blacked-out area, flowing in from external or neighboring systems.",
            "<strong>{{inside-out|Inside Out}}</strong> \u2014 used when blackstart generation <strong>is</strong> available inside the blacked-out area. Local generation is started first to energize the area, which then connects to the rest of the system. Faster restoration when it's available.",
            "<strong>{{combination-restoration|Combination}}</strong> \u2014 uses <strong>both</strong> inside and outside generation simultaneously. The most common approach in practice: leveraging local generation alongside external generation decreases restoration time and provides redundancy and optimization."
          ] },
          { t: "note", kind: "alert", title: "Same concepts, different names",
            html: "You will hear all of these called by a second set of names depending on who trained you \u2014 recognize both: <strong>Outside In = Top-Down</strong>, <strong>Inside Out = Bottom-Up</strong>, and <strong>Combination = Hybrid</strong>. They are the same three approaches, not six." },
          { t: "p", html: "Watch each approach energize, then work through the decision yourself \u2014 the interactive moves from a demonstration, to coached situations, to scenarios you call on your own:" },
          { t: "interactive", id: "restorationApproach" },
          { t: "note", kind: "op", title: "Coordinate constantly",
            html: "Restoration is coordinated with the Reliability Coordinator and neighbors (EOP-005 covers a TOP's restoration from blackstart; EOP-006 covers the RC's coordination role). Independent, uncoordinated restoration steps can collide \u2014 two areas energizing toward each other, for instance." },
          { t: "note", kind: "emergency", title: "Plan for more than one",
            html: "Your available resources can change in the middle of an event \u2014 a blackstart unit that fails its start attempt turns an {{inside-out|Inside Out}} restoration into an {{outside-in|Outside In}} one. That is exactly why blackstart resources are tested and why restoration plans document the approaches rather than assuming a single path." }
        ] },

      /* ---- Islanding & synchronizing (4a) ---- */
      { id: "m6-islanding", title: "Islanding and synchronizing",
        body: [
          { t: "p", html: "During restoration \u2014 and after a system separates \u2014 pieces of the grid run as {{islanding|islands}}: self-contained sections each balancing their own generation and load and holding their own frequency and voltage." },
          { t: "h", text: "Growing an island" },
          { t: "p", html: "An island is stable only if generation and load stay matched as it grows. Add load in increments; keep frequency near 60 Hz and voltage in range. An island with too little generation for its load will sag in frequency; too much will run high." },
          { t: "h", text: "Closing islands together" },
          { t: "p", html: "You may only {{synchronizing|synchronize}} two islands \u2014 close the breaker between them \u2014 when voltage, frequency, and phase angle are matched across the open point. Closing out of synchronism slams the machines together electrically and can damage generators and trip units, undoing your progress." },
          { t: "note", kind: "emergency", title: "The three-way match",
            html: "Voltage, frequency, and phase angle all have to line up before you close across an open breaker. Synchronizing equipment checks this, but the operator has to respect it \u2014 forcing a close is how restorations get set back." },
          { t: "p", html: "Try it yourself. In the simulator below, bring the incoming generator's voltage and frequency into the acceptable range and watch the synchroscope: close only when the pointer is at the twelve-o\u2019clock position (zero phase angle) and drifting slowly." },
          { t: "interactive", id: "synchLab" }
        ] },

      /* ---- Cold load pickup (4a) ---- */
      { id: "m6-cold-load", title: "Cold load pickup",
        body: [
          { t: "p", html: "When you restore load that has been out for a while, it comes back hungrier than normal. This is {{cold-load-pickup|cold load pickup}}, and it can surprise an operator who expects pre-outage load levels." },
          { t: "p", html: "The cause is loss of diversity: normally, thermostats, motors, and cycling equipment are spread out in time. After an extended outage they all demand at once \u2014 heaters and air conditioners run continuously, motors draw inrush, and the initial load can run well above the pre-outage value before settling back." },
          { t: "note", kind: "op", title: "Pick it up in blocks",
            html: "Because cold load pickup can exceed available generation and pull frequency down, restore it in measured blocks, letting the system stabilize between steps. This is exactly why the restoration sequence adds load gradually rather than all at once." },
          { t: "p", html: "Walk the curve one phase at a time to see just how much the system draws the instant de-energized load is restored \u2014 and how it decays back toward the real load:" },
          { t: "interactive", id: "coldLoadPickup" }
        ] }
    ] },

  { id: "comms-coord", code: "M7", title: "Communications & Coordination", weight: "support",
    status: "ready",
    blurb: "The Communications and Data domain (12 exam questions): three-part communication and RCIS, reporting requirements, data validity, and telemetry/communications equipment.",
    sections: [

      /* ---- Three-part communication & RCIS (6b) ---- */
      { id: "m7-three-part", title: "Three-part communication and coordination",
        body: [
          { t: "p", html: "Most of what an operator does travels by voice, so how you talk is a reliability control. {{three-part-communication|Three-part communication}} is required for operating instructions: the issuer states the instruction, the receiver repeats it back, and the issuer confirms the repeat-back is correct." },
          { t: "note", kind: "op", title: "Why three parts",
            html: "The repeat-back catches a mishearing <em>before</em> it becomes a wrong breaker operation. It feels slow until the day it saves you from acting on a misheard directive." },
          { t: "h", text: "Coordinating across boundaries" },
          { t: "p", html: "You coordinate constantly \u2014 with your {{rc|RC}}, your {{ba|BA}}, neighboring {{top|TOPs}}, and your {{gop|GOPs}}. Reliability Coordinators share wide-area awareness among themselves through the {{rcis|RCIS}}. Clear, accurate, concise communication with all these parties is itself a tested job task." },
          { t: "scenario", role: "Transmission Operator", title: "You're the operator: a directive you're not sure you heard right",
            setup: "Your {{rc|RC}} calls with a switching directive during a busy period. The line is noisy, and you believe you heard: \u201COpen breaker 3-4-2 at Fairmont.\u201D Your {{one-line|one-line}} shows breaker 3-4-2 at Fairmont carries a heavily loaded 230 kV line \u2014 opening it now would create a problem.",
            steps: [
              { stem: "What do you do?",
                options: [
                  "Open the breaker immediately \u2014 it came from the RC and you act on RC directives.",
                  "Repeat the instruction back exactly as you understood it and wait for the issuer to confirm before acting.",
                  "Decide the RC must have misspoken and open the breaker you think they actually meant.",
                  "Ignore the instruction, since acting on it would clearly cause a problem."
                ],
                answer: 1,
                explain: "{{three-part-communication|Three-part communication}} exists for exactly this moment: the issuer states the instruction, you repeat it back, and the issuer confirms your repeat-back is correct. The repeat-back catches a mishearing <em>before</em> it becomes a wrong breaker operation \u2014 you never operate on an unconfirmed, possibly-misheard directive.",
                optFeedback: { "0": "Acting on an unconfirmed directive is precisely what three-part communication prevents \u2014 close the loop first.", "2": "Substituting your own guess for the directive is more dangerous than the mishearing; never operate on an assumption.", "3": "Silence breaks coordination. Don't drop it \u2014 repeat back and get confirmation." } },
              { stem: "You repeat it back, and the RC corrects you: they said breaker 3-4-2 at <em>Fairview</em> \u2014 a different, lightly loaded station. You now also have an independent concern that even that operation could exceed a limit you're watching. What's the right move?",
                options: [
                  "Execute it now that the wording is confirmed.",
                  "Confirm you have the correct instruction, and because you believe executing it would violate a reliability limit, tell the issuer your concern before acting.",
                  "Refuse to take any further part in the switching.",
                  "Quietly execute a modified version you think is safer."
                ],
                answer: 1,
                explain: "The repeat-back did its job \u2014 it surfaced the Fairmont/Fairview mix-up before any breaker moved. Confirmation resolves the communication error, but coordination doesn't stop there: if you believe carrying out even the correct instruction would cause a reliability problem, you inform the issuer so it can be worked out together. You neither blindly comply nor silently improvise.",
                optFeedback: { "0": "Confirming the words is necessary but not sufficient \u2014 an unspoken reliability concern needs to be raised, not swallowed.", "2": "Refusing without communicating leaves the RC blind. Voice the concern and coordinate a resolution.", "3": "A silent \u2018safer\u2019 improvisation is the same failure mode as acting on a mishearing \u2014 never modify a directive without telling the issuer." } }
            ],
            debrief: "Voice is a reliability control. Three-part communication (state \u2192 repeat back \u2192 confirm) catches errors before they reach a breaker \u2014 and coordination means raising a limit concern with the issuer rather than either blindly complying or silently improvising." }
        ] },

      /* ---- Reporting (6a) ---- */
      { id: "m7-reporting", title: "Reporting requirements",
        body: [
          { t: "p", html: "When certain events happen \u2014 disturbances, losses of major elements, sabotage or unusual conditions \u2014 operators must report them, both up their own chain and to the wider reliability community, within required timeframes." },
          { t: "list", items: [
            "<strong>Reliability reporting</strong> \u2014 events that affect the Bulk Electric System are reported so the community can learn and respond.",
            "<strong>Situational sharing</strong> \u2014 timely notification to the RC and neighbors of conditions that could affect them.",
            "<strong>After-the-fact analysis</strong> \u2014 reporting feeds event and disturbance analysis that improves the system."
          ] },
          { t: "note", kind: "op", title: "When in doubt, notify",
            html: "Under-communicating a developing problem is far riskier than over-communicating. Timely notification gives neighbors and the RC the chance to help before a local issue becomes a wide-area one." }
        ] },

      /* ---- Data validity (6c) ---- */
      { id: "m7-data-validity", title: "Data validity and verification",
        body: [
          { t: "p", html: "Every decision rests on data, so knowing whether the data is trustworthy is part of the job. Bad {{telemetry|telemetry}} can quietly mislead you or corrupt the {{state-estimator|state estimator}} and its {{rtca|contingency analysis}}." },
          { t: "h", text: "Recognizing bad data" },
          { t: "list", items: [
            "Values that are frozen, out of range, or inconsistent with neighbors are suspect.",
            "A state estimator that won't converge often points to bad or missing measurements.",
            "Cross-check questionable readings against redundant sources before acting on them."
          ] },
          { t: "note", kind: "alert", title: "Trust, but verify",
            html: "When a reading drives a significant action \u2014 especially near a limit \u2014 verify it. Acting on a single unverified bad measurement has caused real events; a quick cross-check is cheap insurance." }
        ] },

      /* ---- Telemetry & comms equipment (6d) ---- */
      { id: "m7-telemetry-equip", title: "Telemetry and communications equipment",
        body: [
          { t: "p", html: "The awareness you rely on is delivered by physical infrastructure: {{scada|SCADA}} remote units in substations, the communications links that carry their data, and the {{ems|EMS}} that displays it. When that infrastructure degrades, so does your picture." },
          { t: "p", html: "Losing {{telemetry|telemetry}} from part of the system means losing visibility there \u2014 the {{state-estimator|state estimator}} may not solve well for that area, and contingency analysis suffers. The response mirrors the loss-of-tools discipline: recognize the gap, use backup information, notify as required, and operate more conservatively until it's restored." },
          { t: "note", kind: "op", title: "It ties back together",
            html: "Communications and data aren't a side topic \u2014 they're the nervous system behind every other module. Monitoring, contingency analysis, voltage control, and emergency response all assume the data is flowing and trustworthy." }
        ] }
    ] },

  { id: "balancing", code: "M8", title: "Resource & Demand Balancing", weight: "support",
    status: "ready",
    blurb: "The Resource and Demand Balancing domain (13 exam questions). Balancing is a BA responsibility, but a TO must understand it: frequency and balance, AGC and ACE, reserves and interchange, and generation.",
    sections: [

      /* ---- Frequency & balance (1e) ---- */
      { id: "m9-balance-frequency", title: "Frequency and the generation-load balance",
        body: [
          { t: "p", html: "At every instant, generation must equal load plus losses. When they match, {{frequency|frequency}} holds at 60 Hz; when they don't, frequency moves \u2014 the live scoreboard of the balance. Use the meter below to feel it." },
          { t: "interactive", id: "freqBalance" },
          { t: "p", html: "That balance is set one machine at a time. In a synchronous generator, the prime mover and its governor set shaft speed \u2014 and therefore frequency \u2014 while field excitation sets terminal {{voltage|voltage}}. Move each lever below and watch which output responds." },
          { t: "interactive", id: "generator" },
          { t: "h", text: "Three layers of response" },
          { t: "list", items: [
            "<strong>{{primary-frequency-response|Primary}}</strong> \u2014 governors act automatically within seconds to arrest the change.",
            "<strong>Secondary</strong> \u2014 {{agc|AGC}} adjusts generation to drive {{ace|ACE}} back toward zero and restore 60 Hz.",
            "<strong>Tertiary</strong> \u2014 operators reposition resources and rebuild {{contingency-reserve|reserves}} for the next event."
          ] },
          { t: "note", kind: "op", title: "Why a TO cares",
            html: "You don't run AGC \u2014 your BA does \u2014 but transmission conditions, load, and generation you influence all feed the balance. Understanding it is why frequency and balance appear on the TO exam." }
        ] },

      /* ---- Isochronous governors & AGC modes ---- */
      { id: "m9-isochronous-agc", title: "Governors: isochronous, droop, and AGC modes",
        body: [
          { t: "p", html: "The last section said {{governor|governors}} act automatically within seconds to arrest a frequency change. Here's what's actually happening inside one \u2014 and why the choice of governor mode decides whether a restoration island lives or dies." },
          { t: "h", text: "The control loop" },
          { t: "p", html: "A governor doesn't measure frequency directly. It measures <strong>shaft speed</strong>. A comparator continuously compares the turbine's actual speed against a reference and calls for more or less {{prime-mover|prime mover}} accordingly: <em>increase</em> if the unit is running slow, <em>decrease</em> if it's running fast. On a two-pole machine, 3600 rpm <em>is</em> 60 Hz \u2014 so a unit holding 3600 rpm is holding 60 Hz, and frequency rides along in the feedback loop." },
          { t: "h", text: "Two ways to respond" },
          { t: "list", items: [
            "<strong>{{isochronous|Isochronous}}</strong> \u2014 a governor that maintains the same speed in the mechanism controlled <em>regardless of the load</em>. The frequency generated is flat, or constant, and there is <strong>zero droop</strong>. Load arrives, output rises to meet it, frequency stays put.",
            "<strong>{{droop|Droop}}</strong> \u2014 a governor that changes the electricity generated proportionally to the change in electrical frequency. The slope is the droop setting: <strong>5% droop means a 100% change in output for a 5% change in frequency</strong> \u2014 3 Hz on a 60 Hz system. A 5% droop unit goes from full output to zero across those 3 Hz, up or down."
          ] },
          { t: "p", html: "Put one unit alone on an island and add load. The unit picks it all up either way \u2014 there's nothing else there. What differs is where <em>frequency</em> ends up:" },
          { t: "interactive", id: "governorDroop" },
          { t: "note", kind: "emergency", title: "Blackstart resources must run isochronous",
            html: "This is the rule the whole section is built around: a {{blackstart|blackstart}} resource <strong>must operate with an isochronous governor in service</strong>. It is the only machine on a dead island, so it alone has to hold 60 Hz as each block of load is picked up \u2014 and only isochronous control does that. <em>Exception:</em> some fast-responding hydroelectric units operate at 2\u20133% droop, because their inertia and fast response to load pickup let them hold frequency acceptably without it." },
          { t: "h", text: "Only one isochronous unit per island" },
          { t: "p", html: "Here is where it gets subtle. Once a second machine joins the island, it must go on <strong>droop</strong> \u2014 never isochronous. Two isochronous governors each hold the island to <em>their own</em> reference, and those references are never truly identical. The unit controlling to the higher frequency reads the island as slow and raises output; the unit controlling to the lower frequency reads the same island as fast and backs down. Neither is malfunctioning. Both are doing exactly what they were told." },
          { t: "interactive", id: "isoConflict" },
          { t: "note", kind: "op", title: "Why the references never match",
            html: "No two units carry the same signature, even identical machines built to the same drawing. Small conversion errors creep in at three places: the <strong>resolution of measured turbine speed</strong> (one unit reads 60 Hz at 3601 rpm, another at 3599.6), the <strong>resolution of the reference</strong> \u2014 analog or digital \u2014 and the <strong>tuning of the comparator</strong> itself. Each governor is tuned slightly differently to suit its unit, and it is exactly those slight differences that make the difference." },
          { t: "h", text: "Keeping operating margin" },
          { t: "list", items: [
            "The {{gop|GOP}} should <strong>closely monitor operating margins</strong> on all frequency-control generators \u2014 the machines actually holding 60 Hz.",
            "If up or down margin gets low, <strong>manually adjust the non-frequency-control generators</strong> to give the frequency-control units more room to operate.",
            "When moving that other generation, <strong>consider the ramp rate</strong> of the frequency-control units so you don't create excessive ramping demands.",
            "As a minimum, it's recommended to keep <strong>no less than 20% of each generator's capability available as unloaded capability</strong> to assist the load recovery process."
          ] },
          { t: "h", text: "AGC modes: it takes two to make it work" },
          { t: "p", html: "Zoom out from one island to two interconnected areas, and the same lesson repeats at system scale. An area's {{agc|AGC}} can control to {{flat-frequency|Flat Frequency}} (frequency only, no load or interchange term) or {{constant-net-interchange|Constant Net Interchange}} (interchange only, no frequency term). Add 20 MW of load to Area A and the outcome depends entirely on the pairing:" },
          { t: "interactive", id: "agcModes" },
          { t: "note", kind: "normal", title: "The pattern behind all of it",
            html: "One controller per target. One isochronous unit per island; one frequency-correcting area per pair. Give two controllers the same target with no way to share it \u2014 two isochronous governors, or two areas both on Flat Frequency \u2014 and they will fight, diverge, and trip. Everything else runs on {{droop|droop}} or holds its interchange, which is precisely what lets many machines share a change without arguing about it." },
          { t: "scenario", role: "Restoration Operator", title: "You're the operator: bringing an island up",
            setup: "A blackout has taken your area down. Your {{blackstart|blackstart}} unit \u2014 a combustion turbine \u2014 has started successfully and is ready to begin energizing a cranking path and picking up load. The {{gop|GOP}} is on the line with you.",
            steps: [
              { stem: "The GOP asks which governor mode the blackstart unit should be in before you start picking up load. What do you tell them?",
                options: [
                  "5% droop \u2014 the standard setting for interconnected operation.",
                  "Isochronous \u2014 blackstart resources must operate with an isochronous governor in service.",
                  "Droop now, then switch to isochronous once the first load block is on.",
                  "Whichever the unit was last left in; the governor mode does not matter until the island is larger."
                ],
                answer: 1,
                explain: "A {{blackstart|blackstart}} resource must operate with an {{isochronous|isochronous}} governor in service. It is the only machine on the island, so it alone has to hold 60 Hz as each block of load arrives \u2014 and an isochronous governor holds speed regardless of load, with zero droop. The one recognized exception is certain fast-responding hydro units that run at 2\u20133% droop.",
                optFeedback: { "0": "Droop is right for a unit sharing an interconnected system, but alone on an island it would let frequency settle lower with every block of load you add.", "2": "Frequency has to be held from the very first block \u2014 there is no other machine to hold it while you wait to switch.", "3": "It matters most when the island is smallest. One unit is carrying the entire frequency reference." } },
              { stem: "Load pickup is going well and a second generator has now been synchronized to your island. The GOP suggests putting it on isochronous control too, so both machines help hold 60 Hz. How do you respond?",
                options: [
                  "Agree \u2014 two units holding 60 Hz is better frequency control than one.",
                  "Put the second unit on droop; only one unit on the island may run isochronous.",
                  "Switch the blackstart unit to droop and let the new, larger unit take isochronous.",
                  "Put both units on droop now that there are two machines sharing the island."
                ],
                answer: 1,
                explain: "Two {{isochronous|isochronous}} governors on one island each control to their own slightly different frequency reference. The one with the higher reference ramps up, the one with the lower reference backs down, and the split grows through the feedback loop until a machine trips. The second unit goes on {{droop|droop}}, where it will share load changes without fighting the frequency reference.",
                optFeedback: { "0": "This is the trap. Each governor would hold the island to its own reference, and no two references match \u2014 they would diverge until one tripped.", "2": "Churning the reference mid-restoration buys nothing and risks the frequency control you already have working. Leave it and put the new unit on droop.", "3": "With no isochronous unit at all, nothing is holding the island precisely at 60 Hz \u2014 droop units settle wherever the load leaves them." } },
              { stem: "The island has grown. Your frequency-control unit is now carrying most of it and its up-margin is getting thin, but there is another load block to restore. What is the right move?",
                options: [
                  "Pick up the next block anyway and let the governor sort it out.",
                  "Manually adjust the non-frequency-control generation to give the frequency-control unit more room, watching its ramp rate.",
                  "Switch the frequency-control unit to droop so it has more usable range.",
                  "Stop restoring load until an additional blackstart unit can be started."
                ],
                answer: 1,
                explain: "This is exactly the operating-margin discipline the {{gop|GOP}} is watching for. When up or down margin gets low on a frequency-control generator, you manually move the <em>non</em>-frequency-control generation to give it room back \u2014 taking the frequency-control unit's ramp rate into account so you don't create excessive ramping demands. The recommended minimum is keeping no less than 20% of each generator's capability unloaded to assist load recovery.",
                optFeedback: { "0": "If the unit runs out of up-margin mid-pickup, there is nothing left to arrest the frequency dip \u2014 the margin exists precisely so the next block is survivable.", "2": "Droop would not give you more capacity, and it would surrender the flat 60 Hz reference that is holding the island together.", "3": "Halting restoration is heavier-handed than needed. Repositioning the other generation restores your margin and keeps the recovery moving." } }
            ],
            debrief: "Restoration frequency control comes down to three habits: the blackstart machine runs {{isochronous|isochronous}}, every machine after it runs {{droop|droop}}, and somebody keeps watching the margin on whatever is holding 60 Hz \u2014 repositioning other generation before the controlling unit runs out of room." }
        ] },

      /* ---- AGC & ACE (1c, 1d) ---- */
      { id: "m9-agc-ace", title: "AGC and Area Control Error",
        body: [
          { t: "p", html: "A Balancing Authority keeps its area in balance using {{ace|Area Control Error}} \u2014 a single number, in MW, that folds two things an area could get wrong into one signal: how far its interchange is off schedule, and its share of the Interconnection's frequency error." },
          { t: "p", html: "<strong>ACE = (actual \u2212 scheduled interchange) \u2212 10B(actual \u2212 scheduled frequency)</strong>" },
          { t: "list", items: [
            "<strong>The interchange half</strong> \u2014 actual minus scheduled net interchange on your {{tie-line|tie lines}}. If you're importing more than scheduled, this half is negative.",
            "<strong>The frequency half</strong> \u2014 your {{frequency-bias|frequency bias}} B (a <em>negative</em> number, in MW per 0.1 Hz) times the frequency deviation. The 10 converts Hz to units of 0.1 Hz. Because B is negative, a low frequency makes this half push ACE negative too.",
            "<strong>Sign, in one line</strong> \u2014 negative ACE means the area is <em>short</em> (raise generation); positive means <em>long</em> (lower it); {{agc|AGC}} works continuously to drive it toward zero."
          ] },
          { t: "p", html: "First, get a feel for the arithmetic \u2014 move actual interchange and frequency and watch ACE and the resulting instruction." },
          { t: "interactive", id: "aceCalc" },
          { t: "p", html: "That calculator lets you set the two inputs independently, but in the real world they move <em>together</em>, driven by one thing: whether your generation matches your load plus your scheduled interchange. The next simulator shows that cause and effect. Hold your generation against your load, trip a unit, and drive ACE back to zero \u2014 watching the tie flow return to schedule and frequency return to 60 as you do." },
          { t: "interactive", id: "aceLoop" },
          { t: "note", kind: "op", title: "Why keeping ACE near zero matters",
            html: "A non-zero ACE isn't just a number \u2014 it means your area is <em>leaning on the Interconnection</em>. Run persistently short and you're pulling unscheduled power in over the ties and dragging frequency down; run long and you're pushing power out and forcing everyone else to back down. Each area holding its own ACE near zero is exactly what keeps net interchange honest and frequency at 60 Hz for the whole Interconnection." },
          { t: "note", kind: "normal", title: "The bias term shares the load",
            html: "The frequency-bias term is what makes every BA lean in to help arrest an Interconnection-wide frequency deviation \u2014 not just fix its own interchange. Tie-line bias is also what lets ACE pin responsibility on the area where an imbalance actually happened while other areas read close to zero. It's how the whole Interconnection shares the job of holding 60 Hz." },
          { t: "note", kind: "alert", title: "It's measured: CPS1 and BAAL",
            html: "\u201CKeep ACE near zero\u201D is an enforceable obligation under BAL-001. {{cps|CPS1}} evaluates long-term control performance, and the {{baal|BAAL}} limits how far and how long ACE may remain outside its frequency-dependent boundary. The limits allow ACE to move to <em>support</em> frequency, but stop an area from leaning on the Interconnection indefinitely." },
          { t: "scenario", role: "Balancing Authority Operator", title: "You're the operator: a unit trips",
            setup: "You're balancing your area and everything is on target \u2014 {{ace|ACE}} hovering near zero, frequency 60.00 Hz. Without warning, a 250 MW generating unit in your area trips offline. Within seconds your ACE swings sharply negative and Interconnection frequency dips.",
            steps: [
              { stem: "What is your ACE telling you, and what has already helped?",
                options: [
                  "ACE went positive \u2014 you're long, so back down generation.",
                  "ACE went negative by about 250 MW \u2014 you're short; governors across the Interconnection have already arrested the frequency drop, and the make-up is now yours.",
                  "ACE is negative, but frequency is the Interconnection's problem, not yours to fix.",
                  "Ignore ACE and chase frequency directly by adjusting generation until the meter reads 60.00 Hz."
                ],
                answer: 1,
                explain: "Losing 250 MW of your own generation leaves your area short, so ACE goes negative by roughly that amount \u2014 it tells you exactly how many MW to make up and in which direction. {{primary-frequency-response|Primary frequency response}} (governors, system-wide) arrested the frequency decline within seconds; that bought time but did not fix your interchange. The sustained make-up is your area's responsibility.",
                optFeedback: { "0": "Losing generation makes you short, not long \u2014 ACE goes negative and the fix is to raise generation, not lower it.", "2": "Tie-line bias exists precisely so each area cleans up its own imbalance; a negative ACE says the shortfall is yours.", "3": "You steer ACE, not frequency directly \u2014 ACE already folds in your share of the frequency error. Drive ACE to zero and frequency follows." } },
              { stem: "Frequency has stabilized just below 60 and your ACE is still about \u2212250 MW. What restores the balance, and on roughly what clock?",
                options: [
                  "Wait \u2014 the tripped unit will most likely come back on its own.",
                  "Deploy contingency reserve \u2014 raise other generation to replace the lost 250 MW, driving ACE back to zero \u2014 then rebuild reserve, generally within about 15 minutes.",
                  "Shed 250 MW of firm load immediately to match the loss.",
                  "Increase your scheduled exports so the interchange half of ACE rises back toward zero."
                ],
                answer: 1,
                explain: "This is exactly what {{contingency-reserve|contingency reserve}} is for: replace the largest credible loss and drive ACE and frequency back to target within the required time \u2014 commonly on the order of fifteen minutes \u2014 then rebuild reserve for the next event. Secondary control (AGC and the operator) does the sustained make-up that primary response cannot.",
                optFeedback: { "0": "Hoping the unit returns is not a plan; you carry reserve so a single loss is recoverable on a defined clock.", "2": "Load shedding is a later resort \u2014 you carry contingency reserve so a single unit loss does not require shedding firm load.", "3": "Interchange schedules are commercial arrangements, not generation \u2014 and raising exports increases your deficit rather than filling it." } }
            ],
            debrief: "A generation loss is the textbook ACE event: ACE swings by the size of the loss, primary response arrests frequency in seconds, and secondary control \u2014 deploying {{contingency-reserve|contingency reserve}} to re-zero ACE, then rebuilding it \u2014 restores the area within its required time. Holding ACE near zero is how each area carries its own load instead of leaning on everyone else, and CPS1/BAAL make it measurable." }
        ] },

      /* ---- Reserves & interchange (1a, 1b) ---- */
      { id: "m9-reserves-interchange", title: "Reserves and interchange",
        body: [
          { t: "h", text: "Reserves" },
          { t: "p", html: "A BA carries operating reserve so it can survive the loss of a resource. {{spinning-reserve|Spinning reserve}} is synchronized and responds immediately; non-spinning is offline capacity that can start within a set time. {{contingency-reserve|Contingency reserve}} is the portion held specifically to recover from the largest credible loss and restore ACE and frequency within a required time." },
          { t: "h", text: "Interchange" },
          { t: "p", html: "{{interchange|Interchange}} is power scheduled between areas. It's arranged, confirmed, and implemented through defined processes, and the net schedule feeds the ACE equation. A TO curtails interchange that adversely affects reliability \u2014 one of your defined tasks." },
          { t: "note", kind: "alert", title: "Reserve is not optional",
            html: "Reserve requirements exist so that a single resource loss is a recoverable event, not a shortfall. Eating into required reserve to serve load is borrowing against the next contingency." }
        ] },

      /* ---- Generation & energy sources (1f, 1g, 1h) ---- */
      { id: "m9-generation-sources", title: "Generation, energy sources, and load",
        body: [
          { t: "p", html: "Balancing depends on what's generating and what load will do, so operators need a working feel for both." },
          { t: "list", items: [
            "<strong>Thermal</strong> (coal, gas, nuclear) \u2014 large and controllable, but with startup times and ramp limits; gas is often the flexible workhorse.",
            "<strong>Hydro</strong> \u2014 fast and flexible where water is available.",
            "<strong>Wind and solar</strong> \u2014 variable and weather-driven; they don't dispatch on command, which raises the value of reserves, forecasting, and flexible resources.",
            "<strong>Load forecasting</strong> \u2014 anticipating demand (weather-driven) so enough of the right resources are committed ahead of time."
          ] },
          { t: "note", kind: "op", title: "Why the mix matters to a TO",
            html: "The resource mix shapes your transmission conditions \u2014 where power is injected, how fast it can change, and how much reactive support and reserve are around. A grid leaning on variable resources puts a premium on flexibility and situational awareness." }
        ] }
    ] },

  { id: "standards", code: "M9", title: "Reliability Standards & Mock Exams", weight: "core",
    status: "ready",
    blurb: "A plain-language tour of the standard families the exam draws from, plus how to use the full-length timed mock exam. Pairs with the live Standards reference in the left rail.",
    sections: [

      /* ---- How standards work ---- */
      { id: "m8-how-standards-work", title: "How the standards are built",
        body: [
          { t: "p", html: "The {{reliability-standard|Reliability Standards}} are mandatory, enforceable rules written by {{nerc|NERC}} and approved by {{ferc|FERC}}. They're grouped into <strong>families</strong> by a three-letter prefix (TOP, IRO, EOP, and so on), and within each standard are numbered <strong>requirements</strong> \u2014 the specific things a responsible entity must do." },
          { t: "note", kind: "op", title: "You don't memorize them \u2014 you understand them",
            html: "The exam tests whether you grasp what the standards require you to do as an operator, not whether you can recite requirement numbers. Read for the intent: who must do what, and when." },
          { t: "p", html: "The <a href=\"#/standards\">Standards reference</a> in the left rail lists the current enforceable version of each standard in the exam families \u2014 always study the in-force version, since older revisions are retired." }
        ] },

      /* ---- Operations families ---- */
      { id: "m8-operations-families", title: "The operations families: TOP, IRO, COM, EOP",
        body: [
          { t: "p", html: "These four families are where a Transmission Operator lives day to day." },
          { t: "list", items: [
            "<strong>TOP</strong> \u2014 Transmission Operations: operate within limits, plan operations, and exchange the data to do it. Your central obligations.",
            "<strong>IRO</strong> \u2014 Interconnection Reliability Operations: the {{rc|RC}}'s wide-area role and coordination, including acting within {{irol|IROLs}}.",
            "<strong>COM</strong> \u2014 Communications: reliable communication capability and {{three-part-communication|three-part communication}} protocols.",
            "<strong>EOP</strong> \u2014 Emergency Operations: emergency plans, load shedding, {{restoration-plan|restoration}}, loss of control center, cold weather, and GMD."
          ] },
          { t: "note", kind: "op", title: "Map them to what you do",
            html: "Every module you've studied traces to these: operating to limits (TOP), the RC relationship (IRO), how you talk (COM), and how you respond and restore (EOP)." }
        ] },

      /* ---- Support families ---- */
      { id: "m8-support-families", title: "The rest: FAC, PRC, VAR, BAL, INT",
        body: [
          { t: "list", items: [
            "<strong>FAC</strong> \u2014 Facilities & limits: facility ratings and the {{sol|SOL}}/{{irol|IROL}} methodology \u2014 where your limits come from.",
            "<strong>PRC</strong> \u2014 Protection & Control: relaying, {{ras|RAS}}, relay {{ampacity|loadability}}, and the load-shedding schemes ({{ufls|UFLS}}/{{uvls|UVLS}}).",
            "<strong>VAR</strong> \u2014 Voltage & reactive: {{voltage-schedule|voltage schedules}} and generator reactive obligations.",
            "<strong>BAL</strong> \u2014 Resource & demand balancing: frequency, {{ace|ACE}} performance, and {{contingency-reserve|contingency reserve}}.",
            "<strong>INT</strong> \u2014 Interchange: evaluating and implementing scheduled {{interchange|interchange}}."
          ] },
          { t: "note", kind: "op", title: "Weighting hint",
            html: "For a TO, the heaviest study payoff is TOP, IRO, EOP, FAC, VAR, and COM. BAL and INT matter but are lighter, matching how the exam samples the domains." }
        ] },

      /* ---- Using the mock ---- */
      { id: "m8-using-mock", title: "Using the mock exam",
        body: [
          { t: "p", html: "You've built knowledge module by module with instant feedback. The <a href=\"#/exam\">full mock exam</a> is the opposite: an exact-blueprint, timed, no-feedback simulation that provides a practice benchmark by domain and subtopic." },
          { t: "h", text: "A simple loop" },
          { t: "list", items: [
            "Take a full mock cold, under the clock, without notes.",
            "Read the score report \u2014 note which <strong>domains</strong> fell below the 76% line.",
            "Go back to those modules and drill them in practice mode until they're solid.",
            "Take a fresh mock (questions are drawn anew each time) and confirm the weak domain improved."
          ] },
          { t: "note", kind: "op", title: "Test cold, learn warm",
            html: "Resist the urge to check answers mid-mock. The value is in simulating the real, feedback-free exam \u2014 then doing your learning afterward in practice mode, where every item explains itself and links back to the source." }
        ] }
    ] }
];
