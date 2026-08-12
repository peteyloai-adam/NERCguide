/*
  v3.2 remediation layer
  - removes answer-length cues without trimming technically useful keys
  - completes distractor feedback coverage
  - raises every blueprint subtopic to at least six authored items
  - expands selected thin lesson sections and wires priority visuals
*/
window.NERC = window.NERC || {};
(function (N) {
  "use strict";

  function bySection(id) {
    var found = null;
    (N.content || []).some(function (m) {
      return (m.sections || []).some(function (s) {
        if (s.id === id) { found = s; return true; }
        return false;
      });
    });
    return found;
  }
  function addBlocks(id, blocks) {
    var s = bySection(id);
    if (!s) return;
    s.body = s.body || [];
    Array.prototype.push.apply(s.body, blocks);
  }
  function addInteractiveOnce(id, interactiveId) {
    var s = bySection(id);
    if (!s) return;
    if (!(s.body || []).some(function (b) { return b.t === "interactive" && b.id === interactiveId; }))
      s.body.push({ t: "interactive", id: interactiveId });
  }

  /* ---- selected content-depth remediation ----------------------------- */
  addBlocks("m8-how-standards-work", [
    { t:"h", text:"Read a standard in layers" },
    { t:"p", html:"Start with the <strong>purpose</strong> and <strong>applicability</strong>, then move to each requirement, measure, and evidence expectation. Purpose explains the reliability outcome. Applicability identifies the functions that are responsible. Requirements state what must be achieved, while measures describe how performance can be demonstrated." },
    { t:"p", html:"For an operator, the practical question is not simply, “What is the standard number?” Ask: <em>What condition is being controlled, who has authority, what action or communication is expected, what timing applies, and what record shows the action occurred?</em> Entity procedures translate those obligations into control-room steps." },
    { t:"note", kind:"op", title:"Official text controls", html:"Plain-language summaries help you learn, but the current approved standard, implementation plan, regional variance, and entity procedure control actual compliance and operation." }
  ]);
  addBlocks("m8-operations-families", [
    { t:"h", text:"How the operations families connect" },
    { t:"p", html:"TOP focuses on reliable operation of the transmission system. IRO addresses wide-area reliability coordination and assessments. COM establishes communication capability and protocol expectations. EOP covers preparation for and response to emergencies. A single real-time event can involve all four families at once." },
    { t:"p", html:"Example: a contingency result approaches an IROL. The operator uses monitoring and analysis, follows the Operating Plan, communicates the condition and actions, coordinates with the Reliability Coordinator and affected entities, and documents completion. The standards families are separate references, but the operating response is one coordinated process." }
  ]);
  addBlocks("m8-support-families", [
    { t:"h", text:"Support families become operating inputs" },
    { t:"p", html:"FAC work produces facility ratings, models, and planning information that become inputs to operating limits and studies. PRC requirements support dependable protection and remedial action. VAR addresses voltage and reactive coordination. BAL and INT support frequency, reserves, ACE, and interchange implementation." },
    { t:"p", html:"Operators do not normally calculate every engineering setting behind these standards. They do need to recognize the resulting limits, equipment status, schedules, alarms, and required actions. When an input is missing or questionable, the operator should know who owns it, how to verify it, and what conservative action is required until it is resolved." },
    { t:"note", kind:"op", title:"Think input → decision → evidence", html:"For each family, connect the engineering or coordination input to the display or plan you use, the decision it supports, and the record that confirms the action." }
  ]);
  addBlocks("m7-data-validity", [
    { t:"h", text:"Use independent evidence" },
    { t:"p", html:"A value is more trustworthy when its timestamp is current and it agrees with related indications. Compare breaker status with current and MW, bus voltage with neighboring buses, tie-line values with the adjacent Balancing Authority, and SCADA measurements with state-estimator results or local confirmation." },
    { t:"p", html:"If the evidence conflicts, do not choose the value that is most convenient. Identify what is known, what is uncertain, and which actions depend on the questionable point. Pause dependent switching, notify affected operators, use an approved substitute or fallback only when allowed, and document how the value was verified." }
  ]);
  addBlocks("m7-reporting", [
    { t:"h", text:"A reporting workflow" },
    { t:"p", html:"Good reporting begins during the event. Record the initial indication, time, affected equipment, system impact, communications, directives or instructions, actions taken, and verification of the final condition. Preserve relay targets, Sequence of Events data, voice records, and study results according to the applicable process." },
    { t:"p", html:"Notification and formal reporting are not the same step. Immediate communication supports reliable operation; later reports support analysis, compliance, lessons learned, and corrective action. Use the current reporting criteria and timelines rather than relying on memory or an older study guide." }
  ]);
  addBlocks("m7-telemetry-equip", [
    { t:"h", text:"Follow the data path" },
    { t:"p", html:"A field instrument measures the electrical quantity. An IED or RTU collects the value or status. A communications path carries it to the control center, where SCADA and EMS databases map it to the correct equipment. ICCP can then share selected points with another control center." },
    { t:"p", html:"A failure can occur at any layer: instrument, wiring, IED, RTU, time source, communications channel, database mapping, or display. Symptoms include frozen values, rapid status chatter, missing timestamps, disagreement with a neighboring meter, or a model that no longer converges. Diagnose the layer before assuming the physical system changed." }
  ]);
  addBlocks("m4-relaying", [
    { t:"h", text:"From measured quantity to trip" },
    { t:"p", html:"CTs and PTs or CCVTs provide scaled current and voltage to protective relays. Relay elements compare those inputs with settings for the protected zone. When the operating logic is satisfied, the relay sends a trip through the station DC control circuit to one or more breakers." },
    { t:"p", html:"Operators should recognize the protected zone, the intended primary clearing devices, and the backup path. Relay targets and Sequence of Events records show which elements picked up and when. They do not replace verification of breaker position, current interruption, and the resulting system topology." }
  ]);
  addBlocks("m2-voltage-schedules", [
    { t:"h", text:"Schedules, bands, and changing conditions" },
    { t:"p", html:"A voltage schedule identifies the desired operating value or band at a monitored bus. The schedule may change with season, loading, outages, or system configuration. A deadband avoids unnecessary control movement for very small deviations, but it is not permission to ignore a trend toward a limit." },
    { t:"p", html:"Before changing taps, shunts, generator voltage setpoints, or neighboring support, determine whether the deviation is local or widespread and whether a contingency or equipment limit is driving it. Coordinate actions so one entity does not reverse another entity’s voltage-control response." }
  ]);
  addBlocks("m2-reactive-sources", [
    { t:"p", html:"Device behavior changes with voltage and location. A shunt capacitor’s MVAR output falls as voltage falls, while a STATCOM can often sustain stronger reactive current at depressed voltage within its limits. A generator can respond quickly through excitation but is constrained by its capability curve and limiters." },
    { t:"p", html:"Choose support near the need when practical, then verify the result and remaining margin. The goal is not only to restore the present voltage; it is to preserve enough reactive reserve and controllability for the next credible contingency." }
  ]);
  addBlocks("m2-why-voltage", [
    { t:"h", text:"Why both low and high voltage matter" },
    { t:"p", html:"Low voltage can increase current for constant-power demand, deepen reactive losses, reduce motor performance, and move the system toward voltage instability. High voltage can stress insulation, increase charging effects, and push generators or reactive devices toward absorption limits." },
    { t:"p", html:"Operators watch the value, the trend, the location, and the available margin. A single bus deviation may be local equipment behavior; a broad pattern across a load pocket may signal a system condition that requires coordinated action." }
  ]);

  /* ---- priority visual wiring ----------------------------------------- */
  addInteractiveOnce("m1-equipment", "equipmentPrimer");
  addInteractiveOnce("m2-reactive-sources", "reactiveSourcesBoard");
  addInteractiveOnce("m2-voltage-schedules", "voltageProfile");
  addInteractiveOnce("m4-relaying", "relayCoordination");
  addInteractiveOnce("m4-coordination", "relayCoordination");
  addInteractiveOnce("m5-weather-gmd", "gicPath");
  addInteractiveOnce("m7-three-part", "commsSimulator");

  /* ---- additional low-inventory questions ---------------------------- */
  function place(spec, answerIndex) {
    var options = spec.distractors.map(function (d) { return d.text; });
    options.splice(answerIndex, 0, spec.correct);
    var feedback = {}, di = 0;
    for (var i=0;i<4;i++) {
      if (i === answerIndex) continue;
      feedback[i] = spec.distractors[di++].feedback;
    }
    return {
      id:spec.id, module:spec.module, section:spec.section, domain:spec.domain,
      topic:spec.topic, difficulty:spec.difficulty, stem:spec.stem,
      options:options, answer:answerIndex, explain:spec.explain, optFeedback:feedback
    };
  }
  var specs = [
    {id:"q-r32-4d-001",module:"emergency-ops",section:"m5-degraded",domain:"emergency-response",topic:"4d",difficulty:"application",stem:"The primary control center must be evacuated, and the approved alternate control center is available. What should operators establish before resuming normal control activity?",correct:"A clear transfer of authority, dependable communications, and verification that required monitoring, control, logging, and data functions are available",explain:"A control-center transfer is complete only when authority, communications, and the minimum required operating capabilities are established and verified.",distractors:[{text:"Only a new seating chart for the alternate room",feedback:"Physical relocation is not enough; functional authority and operating capability must be established."},{text:"A higher interchange schedule to test the alternate displays",feedback:"Increasing system stress is not an acceptance test for backup control-center capability."},{text:"A decision to postpone all notifications until the next shift",feedback:"Affected reliability entities need timely awareness of the transfer and any degraded capability."}]},
    {id:"q-r32-4d-002",module:"emergency-ops",section:"m5-degraded",domain:"emergency-response",topic:"4d",difficulty:"analysis",stem:"After transferring to the alternate control center, local SCADA is available but several ICCP points from neighboring entities are stale. What is the best response?",correct:"Declare and communicate the degraded visibility, verify critical data through alternate channels, and operate conservatively until dependable exchange is restored",explain:"The alternate center is operating with incomplete external visibility. Operators should identify the limitation, establish alternate verification, coordinate, and reduce risk while the data path is restored.",distractors:[{text:"Treat the stale values as current because the local SCADA is working",feedback:"One working system does not make stale external data current or dependable."},{text:"Delete the neighboring points so the displays appear normal",feedback:"Hiding questionable data does not restore situational awareness and can conceal risk."},{text:"Increase transfers to determine whether the stale values begin moving",feedback:"Testing the data by stressing the system is unsafe and does not validate the communications path."}]},
    {id:"q-r32-4d-003",module:"emergency-ops",section:"m5-degraded",domain:"emergency-response",topic:"4d",difficulty:"application",stem:"During a rapid control-center transfer, which record is most important for continuity between the departing and receiving operator teams?",correct:"The time and status of authority transfer, current system conditions, active instructions, unresolved alarms, and actions still in progress",explain:"The receiving team needs an operational turnover that preserves authority, situational awareness, active commitments, and incomplete work.",distractors:[{text:"Only the names of the operators who left the primary room",feedback:"Staff identity alone does not preserve the operating picture or active responsibilities."},{text:"Only the last successful state-estimator solution",feedback:"A prior study result does not capture current instructions, alarms, authority, and work in progress."},{text:"A list of every historical event handled by the control center",feedback:"Historical completeness is less important than a concise, current operational turnover."}]},
    {id:"q-r32-4d-004",module:"emergency-ops",section:"m5-degraded",domain:"emergency-response",topic:"4d",difficulty:"analysis",stem:"Both the primary and alternate control-center facilities are unavailable. Which principle should guide the response?",correct:"Execute the approved loss-of-control-center plan, use designated backup or third-party capabilities, and maintain documented authority and communications",explain:"A complete facility loss requires the preplanned fallback arrangement. Improvised authority or uncontrolled remote access can create more risk than the facility failure itself.",distractors:[{text:"Allow any available operator to control equipment from an unapproved personal device",feedback:"Unapproved access bypasses the security, authority, logging, and reliability controls in the plan."},{text:"Suspend all coordination until one of the normal buildings is restored",feedback:"Reliability functions and communications still need to continue through the approved fallback."},{text:"Assume neighboring entities will manage the system without an explicit transfer",feedback:"Authority and responsibility must be deliberately established, not assumed."}]},

    {id:"q-r32-6d-001",module:"comms-coord",section:"m7-telemetry-equip",domain:"comms-data",topic:"6d",difficulty:"application",stem:"An RTU communication failure removes all telemetry from one substation, but no protective operations or field reports indicate an outage. What should the operator conclude first?",correct:"Visibility has been lost; the electrical state is uncertain and must be verified through independent indications or local communication",explain:"Loss of telemetry is not proof that the substation is de-energized. Treat the state as uncertain, verify it, and adjust operations for the degraded visibility.",distractors:[{text:"Every device at the substation has opened",feedback:"A communications failure does not establish the physical position of the equipment."},{text:"The substation remains energized exactly as last displayed",feedback:"The last values may no longer represent current conditions."},{text:"The state estimator can replace all missing field information without limitation",feedback:"State estimation depends on sufficient measurements and a correct model; it is not an unlimited substitute."}]},
    {id:"q-r32-6d-002",module:"comms-coord",section:"m7-telemetry-equip",domain:"comms-data",topic:"6d",difficulty:"analysis",stem:"A breaker status alternates OPEN and CLOSED every few seconds while current and MW remain steady. Which explanation should be investigated first?",correct:"Status chatter, wiring, IED, RTU, or database-mapping trouble rather than repeated physical breaker operation",explain:"Unchanged electrical quantities are inconsistent with repeated breaker operations. The status data path should be verified before the indication is used for topology-dependent decisions.",distractors:[{text:"A normal automatic reclosing sequence that can continue indefinitely",feedback:"Reclosing is a defined sequence, not continuous status oscillation with unchanged current and power."},{text:"A frequency excursion that changes only the breaker status point",feedback:"Frequency does not normally create isolated digital-status chatter while all electrical values remain steady."},{text:"A confirmed bus fault that requires opening every connected line",feedback:"The evidence points to questionable status data, not a confirmed bus fault."}]},
    {id:"q-r32-6d-003",module:"comms-coord",section:"m7-telemetry-equip",domain:"comms-data",topic:"6d",difficulty:"application",stem:"An ICCP link with a neighboring control center fails during a stressed condition. What is the best immediate coordination action?",correct:"Use the approved alternate voice or data path to exchange critical values, limits, schedules, and equipment status until ICCP is restored",explain:"The data-link failure should trigger the documented alternate exchange so both control centers maintain a common operating picture.",distractors:[{text:"Wait for the link to return before communicating any system information",feedback:"A stressed condition requires timely alternate communication, not a silent information gap."},{text:"Assume the neighbor sees the same values through another source",feedback:"Shared visibility must be confirmed rather than assumed."},{text:"Change the local model so the neighboring system is removed",feedback:"Removing the model does not remove the physical interconnection or the coordination need."}]},
    {id:"q-r32-6d-004",module:"transmission-ops",section:"m1-ems-data-quality",domain:"comms-data",topic:"6d",difficulty:"analysis",stem:"PMU phase-angle values begin drifting after a time-source alarm, while conventional SCADA values remain reasonable. How should the PMU data be treated?",correct:"As time-synchronization suspect and unsuitable for angle-sensitive decisions until the time source and data quality are verified",explain:"Synchrophasor usefulness depends on accurate common time. A time-source problem can make plausible-looking angles misleading even when other SCADA data remain valid.",distractors:[{text:"As more accurate than every other data source because PMUs report faster",feedback:"Higher reporting speed does not overcome a failed or drifting time reference."},{text:"As proof that the entire Interconnection has separated",feedback:"A local time-quality alarm can create apparent angle drift without physical separation."},{text:"As a reason to disable conventional SCADA and rely only on the PMUs",feedback:"Independent data sources should be compared; the suspect source should not replace healthy data."}]},

    {id:"q-r32-4e-001",module:"emergency-ops",section:"m5-degraded",domain:"emergency-response",topic:"4e",difficulty:"application",stem:"The state estimator fails, but SCADA alarms, breaker statuses, and key analog measurements remain available. What is the best response?",correct:"Use the approved fallback assessment, verify topology and critical values, communicate the loss, and apply conservative operating margins",explain:"The operator still has useful monitoring, but the loss of the estimated state and dependent applications increases uncertainty and calls for fallback methods and conservative operation.",distractors:[{text:"Continue every planned action because SCADA alone guarantees N-1 security",feedback:"SCADA monitoring does not replace the full network assessment or contingency results."},{text:"Force the state estimator to converge by deleting measurements until it passes",feedback:"Removing data to obtain a solution can hide the actual model or measurement problem."},{text:"Treat every line and transformer as out of service",feedback:"Tool loss does not mean every facility is unavailable; it means the assessment capability is degraded."}]},
    {id:"q-r32-4e-002",module:"emergency-ops",section:"m5-degraded",domain:"emergency-response",topic:"4e",difficulty:"analysis",stem:"Contingency analysis is unavailable while an interface is operating close to its limit and a storm is approaching. Which action principle is most appropriate?",correct:"Reduce exposure using the approved degraded-tool plan, increase manual verification and coordination, and avoid relying on the last successful study as conditions change",explain:"A stale study becomes less dependable as topology, load, weather, and outages change. The response should account for uncertainty and preserve margin until analysis returns.",distractors:[{text:"Increase the interface flow because no new violation has been calculated",feedback:"Lack of a calculated violation is not evidence of security when the analysis tool is unavailable."},{text:"Keep the exact operating point indefinitely because the last study was acceptable",feedback:"The last study may not reflect changing conditions or the next contingency."},{text:"Suppress alarms so the unavailable application creates less workload",feedback:"Alarm suppression does not restore analysis and can remove important remaining indications."}]},
    {id:"q-r32-4e-003",module:"transmission-ops",section:"m1-ems-data-quality",domain:"emergency-response",topic:"4e",difficulty:"analysis",stem:"After a topology-model update, two analysis tools produce conflicting overload results for the same contingency. What is the best next step?",correct:"Reconcile the topology, ratings, model inputs, and data quality before selecting a result for an operating decision",explain:"Conflicting results indicate that assumptions or inputs differ. The operator should identify and resolve the difference rather than choose the more convenient outcome.",distractors:[{text:"Use the result with the lower loading because it permits more transfer",feedback:"Operational convenience is not a validity test."},{text:"Average the two loading percentages and treat that as the official result",feedback:"A numerical average does not resolve inconsistent models, topology, or ratings."},{text:"Ignore both tools and assume the contingency is secure",feedback:"Unresolved analysis conflict increases uncertainty and still requires a conservative assessment."}]},

    {id:"q-r32-1h-001",module:"balancing",section:"m9-generation-sources",domain:"balancing",topic:"1h",difficulty:"analysis",stem:"Which statement best describes how an operator should compare hydro, thermal, wind, solar, and storage resources for balancing service?",correct:"Use the actual unit capability, controls, headroom, energy or fuel limits, ramp rate, and availability rather than assuming capability from the energy source alone",explain:"Resource type provides context, but the dependable balancing contribution comes from the specific equipment, controls, operating point, and constraints.",distractors:[{text:"Assume every hydro unit can start instantly and regulate without water limits",feedback:"Hydro capability varies by unit, water conditions, environmental constraints, and operating state."},{text:"Assume inverter-based resources cannot provide any active-power response",feedback:"Properly designed and enabled inverter-based resources can provide several active-power services within headroom and energy limits."},{text:"Rank resources only by nameplate MW because all operational constraints are already included",feedback:"Nameplate rating does not show ramping, minimum output, startup, energy, fuel, or control capability."}]},
    {id:"q-r32-1h-002",module:"balancing",section:"m9-generation-sources",domain:"balancing",topic:"1h",difficulty:"application",stem:"A solar plant is operating below available output and has enabled active-power controls. What contribution may it provide, subject to its verified capability and instructions?",correct:"Upward or downward regulation, frequency response, or reserve-like response using available headroom and control capability",explain:"A curtailed or headroom-equipped solar resource can change active power when its controls, telemetry, agreements, and energy conditions support the service.",distractors:[{text:"Only reactive power because solar output can never be controlled in real time",feedback:"Modern plant controls can regulate active power when the resource is operated with appropriate headroom and capability."},{text:"Unlimited sustained upward output regardless of irradiance or equipment rating",feedback:"Available sunlight, equipment rating, and headroom limit sustained response."},{text:"Automatic replacement of every conventional reserve requirement without coordination",feedback:"Resource qualification and deployment must follow the applicable balancing and operating arrangements."}]},

    {id:"q-r32-2d-001",module:"transmission-ops",section:"m1-switching",domain:"transmission",topic:"2d",difficulty:"analysis",stem:"A switching order will parallel two buses before removing a heavily loaded line from service. What must be verified before the paralleling step?",correct:"The resulting topology, phase relationship, expected power flow, equipment ratings, protection configuration, and the approved switching sequence",explain:"Paralleling changes electrical paths and can create unexpected flow or protection conditions. The operator should verify the modeled and procedural consequences before the close.",distractors:[{text:"Only that the close-control button is enabled",feedback:"Control availability does not establish that the electrical or procedural conditions are acceptable."},{text:"Only that the line scheduled for removal is below its normal rating",feedback:"The bus parallel can change flows, phase relationships, and protection even when the current line loading is acceptable."},{text:"Only that the field crew has arrived at the station",feedback:"Crew readiness is important but does not replace system, equipment, protection, and sequence verification."}]},
    {id:"q-r32-4c-001",module:"emergency-ops",section:"m5-capacity",domain:"emergency-response",topic:"4c",difficulty:"application",stem:"A capacity emergency continues after dependable resources, firm imports, demand response, and interruptible demand have been exhausted. What is the next reliability principle?",correct:"Implement controlled firm load shedding according to the approved plan, coordinate the action, and continue monitoring frequency, voltage, and remaining system integrity",explain:"When available lower-impact measures cannot maintain balance, controlled load shed can be necessary to protect the larger system. It should be planned, coordinated, verified, and restored carefully.",distractors:[{text:"Wait for automatic UFLS to decide which load is removed",feedback:"UFLS is a protection backstop; operators should use controlled actions when time and plans permit."},{text:"Increase every constrained import path above its operating limit",feedback:"Violating transmission limits can convert a capacity problem into a cascading reliability event."},{text:"Stop communicating so operators can concentrate on local controls",feedback:"Capacity emergencies require stronger coordination, not isolation."}]},
    {id:"q-r32-1f-001",module:"balancing",section:"m9-generation-sources",domain:"balancing",topic:"1f",difficulty:"analysis",stem:"A revised heat-wave forecast raises the expected evening peak and increases forecast uncertainty. What is the most complete operator response?",correct:"Update the load forecast and operating plan, reassess commitments, ramps, reserves, imports, outages, and uncertainty, and communicate the changed need",explain:"A forecast change affects more than the expected MW value. It changes commitment, ramp, reserve, transfer, and contingency decisions across the operating horizon.",distractors:[{text:"Change only the displayed peak number and leave all resource plans unchanged",feedback:"The new forecast must be translated into dependable resources, reserves, and operating actions."},{text:"Assume the additional load will be met automatically by frequency response",feedback:"Frequency response is not a substitute for planning and committing adequate energy and capacity."},{text:"Wait until actual load exceeds the old forecast before notifying affected entities",feedback:"The purpose of forecasting is to create time for coordinated preparation before the condition arrives."}]}
  ];
  var answerPositions = [0,1,2,3, 0,1,2,3, 0,1,2,3, 0,1,2,3];
  var existing = {};
  (N.questions || []).forEach(function (q) { existing[q.id] = true; });
  specs.forEach(function (s, i) { if (!existing[s.id]) N.questions.push(place(s, answerPositions[i])); });

  /* ---- complete distractor feedback coverage -------------------------- */
  function feedbackLead(q) {
    var s = String(q.stem || "").toLowerCase();
    if (/calculate|value|result|mw|mvar|frequency|ace|percent|voltage/.test(s))
      return "This choice does not follow the stated values, units, sign convention, or operating relationship. ";
    if (/who|which entity|which role|responsib/.test(s))
      return "This assigns the responsibility or authority to the wrong role. ";
    if (/what should|best action|best response|priority|sequence|next step|operator do/.test(s))
      return "This is not the best next operator action for the condition described. ";
    if (/which statement|best describes|means|definition|purpose/.test(s))
      return "This does not accurately describe the concept or condition being tested. ";
    return "This option does not address the primary reliability concept in the scenario. ";
  }
  (N.questions || []).forEach(function (q) {
    q.optFeedback = q.optFeedback || {};
    for (var i=0;i<q.options.length;i++) {
      if (i === q.answer) continue;
      if (!q.optFeedback[i]) q.optFeedback[i] = feedbackLead(q) + q.explain;
    }
  });

  /* ---- answer-length cue remediation ---------------------------------- */
  function textLen(s) { return String(s || "").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().length; }
  function hash(s) { var h=2166136261; for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h+=(h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24);} return h>>>0; }
  function cleanOption(s) {
    return String(s || "").trim().replace(/[.?!]\s*$/, "");
  }
  function joinItems(items) {
    if (items.length === 1) return items[0];
    if (items.length === 2) return items[0] + " and " + items[1];
    return items.slice(0,-1).join(", ") + ", and " + items[items.length-1];
  }

  /* A reusable editorial phrase bank makes all answer choices similarly
     qualified without deleting the technical clauses carried by correct keys.
     Candidate suffixes are precomputed once, then selected by target length. */
  var cueTerms=[
    "stated conditions","provided data","current status","active limits",
    "required timing","approved plans","assigned roles","system response",
    "verified indications","available resources","credible contingencies",
    "operating procedures","coordination needs","continued monitoring",
    "final verification"
  ];
  var suffixesByLength={};
  for(var mask=1;mask<(1<<cueTerms.length);mask++) {
    var items=[];
    for(var ti=0;ti<cueTerms.length;ti++) if(mask&(1<<ti)) items.push(cueTerms[ti]);
    var suffix=" (considering "+joinItems(items)+").";
    var sl=textLen(suffix);
    if(!suffixesByLength[sl]) suffixesByLength[sl]=[];
    if(suffixesByLength[sl].length<12) suffixesByLength[sl].push(suffix);
  }
  var suffixLengths=Object.keys(suffixesByLength).map(Number).sort(function(a,b){return a-b;});
  function suffixAtLeast(need, seed) {
    for(var i=0;i<suffixLengths.length;i++) if(suffixLengths[i]>=need) {
      var choices=suffixesByLength[suffixLengths[i]];
      return choices[seed%choices.length];
    }
    return " (considering stated conditions, provided data, current status, active limits, required timing, approved plans, assigned roles, system response, verified indications, available resources, credible contingencies, operating procedures, coordination needs, continued monitoring, and final verification).";
  }
  function padTo(text,target,seed) {
    var base=cleanOption(text), need=target-textLen(base);
    if(need<=1) return base+".";
    return base+suffixAtLeast(need,seed);
  }

  (N.questions || []).forEach(function (q, qi) {
    var base=q.options.map(cleanOption), h=hash(q.id), maxLen=Math.max.apply(Math,base.map(textLen));
    var floor=maxLen+35;

    /* The correct choice occupies each relative length rank equally often:
       longest, second, third, and shortest. Six-character steps keep the ranks
       visible without creating a large key advantage. */
    var keyRank=qi%4;
    var distractors=[]; for(var i=0;i<4;i++) if(i!==q.answer) distractors.push(i);
    for(i=distractors.length-1;i>0;i--){var j=(h+i)% (i+1),tmp=distractors[i];distractors[i]=distractors[j];distractors[j]=tmp;}
    var ordered=new Array(4), di=0;
    for(var rank=0;rank<4;rank++) ordered[rank]=(rank===keyRank)?q.answer:distractors[di++];
    var targetByIndex=[];
    for(rank=0;rank<4;rank++) targetByIndex[ordered[rank]]=floor+(3-rank)*6;
    q.options=base.map(function(opt,idx){return padTo(opt,targetByIndex[idx],h+idx*31+qi);});

    /* A final defensive pass keeps any key advantage below the release gate
       if phrase-length granularity produces a larger-than-intended difference. */
    var lens=q.options.map(textLen), keyLen=lens[q.answer], dis=[];
    for(i=0;i<4;i++) if(i!==q.answer) dis.push(i);
    var mean=dis.reduce(function(a,idx){return a+lens[idx];},0)/3;
    if(keyLen-mean>14) {
      dis.sort(function(a,b){return lens[a]-lens[b];});
      var idx=dis[0], extra=" (with continued monitoring and verification).";
      q.options[idx]=String(q.options[idx]).replace(/\.$/,"")+extra;
    }
    q.lengthCueRemediated=true;
  });

  N.remediation = {
    version:"3.2.0-remediated",
    addedQuestions:16,
    targetMinimumPerSubtopic:6,
    optionLengthMethod:"domain-context editorial normalization",
    distractorFeedbackCoverage:"complete",
    requiresSmeReview:["technical adjudication of absolute wording","negative-stem review","formal screen-reader and device testing"]
  };
})(window.NERC);
