/* Approved-reference coverage added for release 3.4.
   The lessons are original instructional summaries. The cited publications remain
   the controlling sources and are intentionally not reproduced verbatim. */
(function(N){
  'use strict';

  var modules={};
  (N.content||[]).forEach(function(module){ modules[module.id]=module; });

  function findSection(id){
    var found=null;
    (N.content||[]).some(function(module){
      return (module.sections||[]).some(function(section){
        if(section.id===id){ found=section; return true; }
        return false;
      });
    });
    return found;
  }

  function upsertAfter(moduleId,afterId,section){
    var module=modules[moduleId];
    if(!module) return;
    module.sections=(module.sections||[]).filter(function(item){ return item.id!==section.id; });
    var index=module.sections.findIndex(function(item){ return item.id===afterId; });
    module.sections.splice(index<0?module.sections.length:index+1,0,section);
  }

  var additions=[
    { id:'angle-stability', term:'Angle Stability',
      definition:'The ability of interconnected synchronous machines to remain in synchronism after small or large disturbances. Operators preserve it by respecting stability limits, maintaining voltage and reactive reserve, and responding to stressed transfers.',
      seeAlso:['transient-stability','power-oscillation','synchrophasor'], moduleRef:'m1-dynamics-stability' },
    { id:'transient-stability', term:'Transient Stability',
      definition:'Angle stability following a large, sudden disturbance such as a fault, line trip, or generator loss. Fault-clearing time, system strength, loading, and the post-event network determine whether machines remain together.',
      seeAlso:['angle-stability','out-of-step'], moduleRef:'m1-dynamics-stability' },
    { id:'out-of-step', term:'Out-of-Step', acronym:'OOS',
      definition:'A loss-of-synchronism condition in which rotor angles separate and electrical quantities swing. Out-of-step protection may separate the system in a controlled way to protect equipment and limit cascading.',
      seeAlso:['angle-stability','power-oscillation'], moduleRef:'m1-dynamics-stability' },
    { id:'power-oscillation', term:'Power Oscillation',
      definition:'A repeated exchange of power as generator rotors swing relative to one another after a disturbance or control interaction. A decaying oscillation is damped; a sustained or growing one threatens stability.',
      seeAlso:['angle-stability','damping','pss'], moduleRef:'m1-dynamics-stability' },
    { id:'damping', term:'Damping',
      definition:'The tendency of an oscillation to decrease with time. Positive damping makes swings decay; weak or negative damping allows them to persist or grow.',
      seeAlso:['power-oscillation','pss'], moduleRef:'m1-dynamics-stability' },
    { id:'pss', term:'Power System Stabilizer', acronym:'PSS',
      definition:'A supplementary excitation control that adds a damping signal to reduce generator and power-system oscillations while the AVR regulates voltage.',
      seeAlso:['avr','power-oscillation'], moduleRef:'m1-dynamics-stability' },
    { id:'harmonic', term:'Harmonic',
      definition:'A voltage or current component at an integer multiple of the fundamental 60 Hz frequency. Nonlinear devices create harmonics that can heat equipment, distort waveforms, and interact with resonant circuits.',
      seeAlso:['resonance'], moduleRef:'m1-dynamics-stability' },
    { id:'resonance', term:'Electrical Resonance',
      definition:'A condition in which system inductance and capacitance interact near a natural frequency and magnify current or voltage. Series and parallel resonance produce different symptoms and risks.',
      seeAlso:['harmonic','ssr','ferroresonance'], moduleRef:'m1-dynamics-stability' },
    { id:'ssr', term:'Subsynchronous Resonance', acronym:'SSR',
      definition:'An interaction below synchronous frequency between a turbine-generator shaft system and an electrically resonant network, often associated with series-compensated transmission. It can create damaging torsional stress.',
      seeAlso:['resonance'], moduleRef:'m1-dynamics-stability' },
    { id:'ferroresonance', term:'Ferroresonance',
      definition:'A nonlinear resonance involving saturable magnetic equipment and capacitance. Unusual switching configurations can produce sustained overvoltage and distorted waveforms.',
      seeAlso:['resonance','transformer-eq'], moduleRef:'m1-dynamics-stability' },
    { id:'synchrophasor', term:'Synchrophasor',
      definition:'A time-synchronized voltage or current phasor measurement. Measurements from multiple locations can show wide-area angle, frequency, voltage, and oscillation behavior on a common time reference.',
      seeAlso:['angle-stability','power-oscillation'], moduleRef:'m1-dynamics-stability' },
    { id:'system-inertia', term:'Power System Inertia',
      definition:'Stored kinetic energy in synchronously connected rotating machines that initially resists a rapid frequency change after a generation-load imbalance.',
      seeAlso:['frequency','primary-frequency-response','synthetic-inertia'], moduleRef:'m9-wind-active-control' },
    { id:'synthetic-inertia', term:'Synthetic Inertial Response',
      definition:'A controlled, short-duration active-power response from an inverter-coupled resource intended to mimic part of the early frequency support supplied naturally by synchronous rotating mass.',
      seeAlso:['system-inertia','active-power-control'], moduleRef:'m9-wind-active-control' },
    { id:'active-power-control', term:'Active Power Control', acronym:'APC',
      definition:'Controls that deliberately change a resource’s MW output for set-point tracking, ramps, curtailment, regulation, primary frequency response, or other active-power services.',
      seeAlso:['agc','primary-frequency-response','synthetic-inertia'], moduleRef:'m9-wind-active-control' },
    { id:'ver', term:'Variable Energy Resource', acronym:'VER',
      definition:'A resource whose available output varies with an energy source such as wind or sunlight. Variability, forecast uncertainty, location, controls, and headroom determine its operating contribution.',
      seeAlso:['der','active-power-control'], moduleRef:'m9-ver-der-integration' },
    { id:'der', term:'Distributed Energy Resource', acronym:'DER',
      definition:'A generation, storage, or responsive-load resource connected to a distribution system or behind a customer meter. Large aggregations can materially change bulk-system load, ramps, voltage, and disturbance behavior.',
      seeAlso:['ver'], moduleRef:'m9-ver-der-integration' },
    { id:'ride-through', term:'Disturbance Ride-Through',
      definition:'The capability and settings that keep a resource connected through specified voltage and frequency excursions instead of tripping unnecessarily and worsening the disturbance.',
      seeAlso:['ver','frequency','voltage'], moduleRef:'m9-ver-der-integration' },
    { id:'capacity-factor', term:'Capacity Factor',
      definition:'Actual energy produced during a period divided by the energy that would have been produced at continuous nameplate output. It describes utilization, not instantaneous capability or reliability by itself.',
      moduleRef:'m9-generation-sources' },
    { id:'heat-rate', term:'Heat Rate',
      definition:'Fuel energy input divided by electrical energy output, commonly Btu per kWh. A lower heat rate means greater thermal efficiency, but it does not by itself describe ramping or reliability capability.',
      moduleRef:'m9-generation-sources' }
  ];
  var glossaryIds=new Set((N.glossary||[]).map(function(item){ return item.id; }));
  additions.forEach(function(item){ if(!glossaryIds.has(item.id)) N.glossary.push(item); });

  var formula=findSection('f-formula-review');
  if(formula && !formula.body.some(function(block){ return block.referenceExpansion==='epri-network'; })){
    formula.body.push(
      { t:'h', text:'Network laws and transfer relationships', referenceExpansion:'epri-network' },
      { t:'list', items:[
        '<strong>Kirchhoff current law:</strong> the signed currents entering and leaving a bus sum to zero. In operator language, every MW or amp entering a node must leave through another branch, load, storage device, or source after accounting for losses.',
        '<strong>Kirchhoff voltage law:</strong> signed voltage rises and drops around a closed path sum to zero. It is the circuit basis behind voltage-drop and impedance calculations.',
        '<strong>Lossless active-power transfer:</strong> P ≈ (V<sub>1</sub>V<sub>2</sub> ÷ X) sin δ. More angle difference or voltage supports more transfer; more reactance reduces transfer. The theoretical peak occurs near 90 degrees, but operators maintain margin well below that point.',
        '<strong>Distribution factor:</strong> change on a monitored element ÷ change in the transfer or injection that caused it. A factor of 0.30 means a 100 MW transaction changes that element by about 30 MW for the studied topology.'
      ] },
      { t:'p', html:'Example: a studied 200 MW transfer has a 0.25 distribution factor on Line A and a -0.10 factor on Line B. Expect approximately <strong>+50 MW</strong> on Line A and <strong>-20 MW</strong> on Line B. The negative sign means flow changes opposite the monitored reference direction. These are linearized study sensitivities, so topology and the analysis model control their validity.' },
      { t:'note', kind:'op', title:'Do not confuse the two angles', html:'The voltage-current phase angle θ determines power factor. The bus or rotor angle difference δ helps drive real-power transfer and angle stability. They are different quantities even though both are measured in degrees.' }
    );
  }

  var voltageStability=findSection('m2-voltage-collapse');
  if(voltageStability && !voltageStability.body.some(function(block){ return block.referenceExpansion==='epri-voltage-stability'; })){
    voltageStability.body.push(
      { t:'h', text:'P-V and V-Q curves answer different questions', referenceExpansion:'epri-voltage-stability' },
      { t:'p', html:'A <strong>P-V curve</strong> increases real-power transfer or load and shows how bus voltage approaches the nose point. A <strong>V-Q curve</strong> varies bus voltage and shows the reactive-power injection or absorption needed to hold each voltage. The Q = 0 crossing identifies the uncorrected operating voltage, the curve minimum is the critical point, and the vertical MVAR distance between them describes reactive margin. Studies use both because MW transfer stress and local MVAR weakness are related but not identical.' },
      { t:'h', text:'Motor stalling can turn a dip into a collapse' },
      { t:'p', html:'Induction motors slow during depressed voltage. A slowed or stalled motor draws high current and reactive power while producing little useful torque, which depresses voltage further and can stall more motors. Fast voltage recovery, dynamic reactive support, motor protection, and - when required by the plan - load shedding interrupt this feedback loop.' }
    );
  }

  var frequency=findSection('m9-balance-frequency');
  if(frequency && !frequency.body.some(function(block){ return block.referenceExpansion==='epri-frequency-stages'; })){
    frequency.body.push(
      { t:'h', text:'Read a frequency event as a sequence', referenceExpansion:'epri-frequency-stages' },
      { t:'list', items:[
        '<strong>Electromagnetic stage:</strong> electrical output changes essentially at once when the imbalance occurs.',
        '<strong>Inertial stage:</strong> stored rotational energy initially supplies or absorbs the mismatch, setting the early rate of change of frequency.',
        '<strong>Governor or primary stage:</strong> responsive resources change power automatically and arrest the excursion.',
        '<strong>AGC or secondary stage:</strong> Balancing Authorities correct ACE and restore scheduled frequency and interchange.',
        '<strong>Dispatch or tertiary stage:</strong> operators reposition resources, replace deployed reserves, and prepare for the next contingency.'
      ] },
      { t:'p', html:'A frequency disturbance travels across a synchronous Interconnection very quickly but not literally everywhere at the same instant. Location, inertia, electrical distance, measurement rate, and filtering can make local traces differ. Use validated, time-aligned data when reconstructing the event.' },
      { t:'h', text:'Time error is accumulated, not an instantaneous frequency reading' },
      { t:'p', html:'When actual frequency averages above or below scheduled frequency, clocks driven by Interconnection frequency can accumulate <strong>time error</strong>. Correction practices and automatic time-error arrangements are Interconnection- and standard-specific. Do not treat time-error correction as the immediate response to a generation loss; arrest, ACE recovery, and reserve restoration come first.' }
    );
  }

  upsertAfter('transmission-ops','m1-powerflow',{
    id:'m1-dynamics-stability',
    title:'Angle stability, oscillations, and resonance',
    body:[
      { t:'p', html:'A steady-looking MW value can hide motion. Synchronous generator rotors continually adjust their relative electrical angles. {{angle-stability|Angle stability}} means those machines remain in synchronism after load changes, faults, switching, and unit trips.' },
      { t:'h', text:'Power angle and the accelerating machine' },
      { t:'p', html:'For a simplified lossless path, <strong>P ≈ (V<sub>1</sub>V<sub>2</sub> ÷ X) sin δ</strong>. Higher transfer increases angle separation; lower voltage or a weaker, higher-reactance network reduces the power that can be transferred for the same angle. When mechanical input exceeds electrical output, a rotor accelerates and its angle advances. When electrical output exceeds mechanical input, it decelerates. The accumulated imbalance drives the swing.' },
      { t:'list', items:[
        '<strong>Steady-state or small-signal stability</strong> asks whether the system settles after ordinary small changes.',
        '<strong>{{transient-stability|Transient stability}}</strong> asks whether machines remain together after a large disturbance such as a close-in fault and line clearing.',
        '<strong>Oscillatory stability</strong> asks whether repeated rotor and power swings are adequately damped.'
      ] },
      { t:'note', kind:'alert', title:'Why clearing time matters', html:'During a severe fault, electrical power transfer falls while turbine mechanical input cannot change instantly, so generators accelerate. Fast, selective fault clearing reduces the accelerating interval. A slow or failed clearing sequence can push angle separation beyond recovery even after the fault is removed.' },
      { t:'h', text:'Reading an oscillation' },
      { t:'p', html:'A {{power-oscillation|power oscillation}} may be local, involving one plant against the nearby system, or inter-area, involving groups of machines swinging against other groups. Look at the envelope: shrinking peaks mean positive {{damping|damping}}; equal peaks mean nearly zero damping; growing peaks mean instability. MW, angle, frequency, and voltage may all oscillate.' },
      { t:'p', html:'Fast excitation improves voltage and transient performance but can reduce oscillation damping if poorly coordinated. A {{pss|power system stabilizer}} adds a supplementary damping signal through excitation. Other triggers include faults, line trips, cyclic loads, unsuitable governor behavior, HVDC controls, and pole slipping.' },
      { t:'list', items:[
        '<strong>Detect:</strong> compare multiple measurements, alarms, oscillation-monitoring tools, and {{synchrophasor|synchrophasor}} trends rather than reacting to one noisy point.',
        '<strong>Protect margin:</strong> hold transfers within limits, maintain strong voltage and reactive reserve, and avoid switching that further weakens the path.',
        '<strong>Coordinate:</strong> notify the RC and affected operators, follow the applicable oscillation or stability procedure, reduce the stressed transfer or separate only as directed by studies and plans.',
        '<strong>Respect protection:</strong> {{out-of-step|out-of-step}} relaying is intended to prevent equipment damage and uncontrolled separation; do not defeat it to preserve a transfer.'
      ] },
      { t:'h', text:'Harmonics and resonant conditions' },
      { t:'p', html:'{{harmonic|Harmonics}} are integer multiples of 60 Hz created by nonlinear devices such as converters, arc furnaces, and saturated magnetic equipment. They can heat transformers and capacitor banks, interfere with controls, and distort measurements. Filters and properly designed grounding and equipment reduce their impact.' },
      { t:'list', items:[
        '<strong>Series resonance</strong> can make path impedance very low near a natural frequency and magnify current.',
        '<strong>Parallel resonance</strong> can make equivalent impedance high and magnify voltage or circulating current.',
        '<strong>{{ssr|Subsynchronous resonance}}</strong> couples a series-compensated network with turbine-generator torsional modes below synchronous frequency.',
        '<strong>{{ferroresonance|Ferroresonance}}</strong> is a nonlinear interaction among capacitance and saturable magnetic equipment, often following an unusual switching state; sustained overvoltage and distorted waveforms are warning signs.',
        '<strong>GMD</strong> drives quasi-DC geomagnetically induced current that can half-cycle-saturate transformers, increase reactive demand, create harmonics, and stress voltage control.'
      ] },
      { t:'note', kind:'op', title:'Operator boundary', html:'The operator normally recognizes the pattern, protects margin, communicates, and follows the studied mitigation. The operator does not invent a resonance cure in real time; equipment-specific switching restrictions and stability procedures come from engineering studies.' }
    ]
  });

  upsertAfter('restoration','m6-restoration-constraints',{
    id:'m6-restoration-equipment',
    title:'Restoration equipment and hidden dependencies',
    body:[
      { t:'p', html:'A restoration path is only as dependable as its auxiliary systems. Equipment that works normally with the energized grid may fail after hours without AC station service, communications, heat, cooling, lubrication, or compressed air.' },
      { t:'list', items:[
        '<strong>Station batteries and DC systems:</strong> protection, breaker trip/close coils, controls, communications, and emergency lighting depend on finite battery energy. Track voltage, loading, charger status, and expected duration.',
        '<strong>Breakers and stored energy:</strong> spring, hydraulic, pneumatic, and motor-charged mechanisms may have only a limited number of operations without auxiliary power. Confirm readiness before consuming an operation.',
        '<strong>Transformers:</strong> energization can produce high magnetizing inrush, overexcitation, temporary overvoltage, and unexpected sympathetic inrush. Use the planned source, tap, and sequence; monitor voltage and MVAR response.',
        '<strong>Long lines and cables:</strong> unloaded transmission supplies charging MVAR and can drive voltage high. Pipe-type cables and support systems may have time-dependent restoration constraints. Add short sections and load when practical.',
        '<strong>Generators:</strong> a blackstart label does not guarantee a successful start. Starting air, fuel, lubrication, excitation, cooling, and station service must all be available, and the cranking path must remain within voltage and frequency capability.',
        '<strong>Telecommunications, SCADA, and computers:</strong> backup power, links, time synchronization, and control-center interfaces can fail independently. Use the restoration plan’s voice, telemetry, and manual fallbacks.',
        '<strong>Protection:</strong> low fault current, unusual flows, weak sources, open phases, and nonstandard topology can change relay reach and direction. Restoration-specific settings or schemes must be applied exactly as planned.'
      ] },
      { t:'h', text:'Before each energization' },
      { t:'list', items:[
        'Confirm the intended topology, energizing source, equipment availability, and protection status.',
        'Estimate the charging MVAR, transformer inrush, cold load, and expected frequency effect.',
        'Verify station DC, breaker operating energy, communications, and a fallback if telemetry is absent.',
        'State the stop criteria: unacceptable voltage, frequency, current, oscillation, protection response, or equipment alarm.',
        'Make one controlled change, verify the electrical response, and only then continue.'
      ] },
      { t:'note', kind:'emergency', title:'Lesson from actual restorations', html:'Plans can be correct while execution still fails because backup generators do not start, batteries are depleted, breakers lack operating energy, communications are unavailable, relay behavior changes, or operators cannot see the resulting state. Testing these dependencies is part of restoration readiness, not an afterthought.' }
    ]
  });

  var generation=findSection('m9-generation-sources');
  if(generation){
    generation.body=[
      { t:'p', html:'NERC assigns Chapters 5-13 of the 2017 <em>Electricity Generation Baseline Report</em>. Those chapters compare nine generation families. The historical costs, policies, and fleet shares in that report are dated; the enduring exam value is understanding how each technology converts energy, how quickly and dependably it can respond, and what constrains it.' },
      { t:'h', text:'Use one comparison framework' },
      { t:'list', items:[
        '<strong>Availability:</strong> Is the energy source present, stored on site, delivered by pipeline, or weather dependent?',
        '<strong>Commitment and ramp:</strong> How long does start-up take, what is minimum output, and how quickly can MW change?',
        '<strong>Grid services:</strong> Can the resource provide inertia, primary response, regulation, reserves, voltage support, blackstart, or storage?',
        '<strong>Constraints:</strong> Fuel, water, emissions, maintenance, reservoir, weather, equipment rating, state of charge, or transmission deliverability may be binding.',
        '<strong>Metrics:</strong> Nameplate MW, dependable capability, {{capacity-factor|capacity factor}}, availability, ramp rate, minimum run time, and {{heat-rate|heat rate}} answer different questions.'
      ] },
      { t:'h', text:'Chapter 5 - Coal' },
      { t:'p', html:'Pulverized-coal and fluidized-bed units use boilers and steam turbines; IGCC first converts coal to syngas and uses a combined cycle. Large steam units supply synchronous inertia and can provide voltage support and reserves when enabled, but cold starts and ramps are generally slow. Boiler and turbine thermal stress, minimum stable load, coal handling, emissions controls, cooling water, and cycling wear constrain flexibility.' },
      { t:'h', text:'Chapter 6 - Natural gas' },
      { t:'p', html:'Simple-cycle combustion turbines can start and ramp quickly and are often used for peaks and reserves. Combined-cycle plants use combustion-turbine exhaust to raise steam for a second turbine, improving efficiency but adding configuration and start-up constraints. Pipeline pressure, gas scheduling, common-mode fuel loss, extreme-weather deliverability, and dual-fuel readiness are reliability concerns.' },
      { t:'h', text:'Chapter 7 - Nuclear' },
      { t:'p', html:'Pressurized-water and boiling-water reactors use fission heat to drive steam turbines. They are large synchronous sources with high availability and inertia, typically operated near steady output. Some units can load-follow, but reactor limits, fuel condition, thermal margins, licensing, and long refueling outages make capability unit-specific. A large nuclear trip is a major contingency even when the unit normally runs steadily.' },
      { t:'h', text:'Chapter 8 - Water power' },
      { t:'p', html:'Reservoir hydro can start and ramp rapidly, regulate, provide primary response, supply or absorb MVAR, furnish blackstart, and carry reserves. Run-of-river output follows water availability more closely. Pumped storage consumes energy to pump uphill, then generates during higher-value or higher-need periods; its state of charge and water inventory matter. Environmental flows, reservoir elevations, head, cavitation, licenses, drought, and competing water uses limit dispatch.' },
      { t:'h', text:'Chapter 9 - Wind' },
      { t:'p', html:'Wind output depends on wind speed between turbine cut-in and cut-out limits. Modern Type 3 and Type 4 machines use power electronics, so their rotating mass does not inherently couple to grid frequency. Plant controls can curtail output, limit ramps, control voltage or power factor, provide {{ride-through|ride-through}}, and - with appropriate headroom and settings - provide regulation, primary response, or {{synthetic-inertia|synthetic inertial response}}. Forecast error, wake effects, transmission, icing, and high-wind shutdowns affect availability.' },
      { t:'h', text:'Chapter 10 - Biopower' },
      { t:'p', html:'Biomass may be directly fired in a boiler, co-fired with fossil fuel, converted to syngas, or supplied as landfill gas or waste fuel. Many plants are dispatchable synchronous resources capable of regulation and reserves, but fuel collection, storage, moisture, transport, emissions controls, and plant size shape dependable capability.' },
      { t:'h', text:'Chapter 11 - Solar' },
      { t:'p', html:'Photovoltaic systems convert sunlight directly through inverters; concentrating solar power uses collected heat to run a turbine and may include thermal storage. PV availability follows daylight, cloud cover, temperature, and inverter limits. Geographic diversity smooths but does not eliminate variability. Plant controls can limit ramps, curtail output, regulate active and reactive power, and ride through disturbances when capability and settings support it.' },
      { t:'h', text:'Chapter 12 - Geothermal' },
      { t:'p', html:'Dry-steam, flash-steam, and binary-cycle plants use subsurface heat. They are generally firm, dispatchable turbine-generator resources with physical inertia and high availability. Reservoir temperature, pressure, chemistry, scaling, corrosion, cooling, well performance, and long-term resource management are important constraints.' },
      { t:'h', text:'Chapter 13 - Petroleum' },
      { t:'p', html:'Oil can fuel steam turbines, combustion turbines, combined cycles, and reciprocating engines. It is often expensive for routine energy but valuable for peaking, emergency generation, and dual-fuel backup where gas delivery is constrained. On-site inventory, delivery logistics, cold-weather handling, emissions limits, and successful fuel-transfer testing determine whether that backup is dependable.' },
      { t:'note', kind:'op', title:'Resource type is context, not proof', html:'Never answer an operating question from the fuel label alone. Use the actual unit’s synchronized state, headroom, ramp rate, controls, start time, fuel or energy limit, reactive capability, outage status, and transmission deliverability. A curtailed wind or solar plant may be more responsive than an unavailable thermal unit; a hydro plant may be fast but water-limited.' }
    ];
  }

  upsertAfter('balancing','m9-generation-sources',{
    id:'m9-ver-der-integration',
    title:'Variable and distributed resources on the BPS',
    body:[
      { t:'p', html:'The EPRI dynamics supplement extends the original tutorial to {{ver|variable energy resources}} and {{der|distributed energy resources}}. The essential shift is from assuming generation is visible, centralized, synchronous, and fuel-controlled to verifying what the inverters, plant controls, forecasts, telemetry, and aggregations can actually do.' },
      { t:'h', text:'Equipment and controls' },
      { t:'list', items:[
        '<strong>Wind Types 1 and 2</strong> use induction machines with more direct electromechanical coupling; Type 2 adds rotor-resistance control.',
        '<strong>Wind Type 3</strong> is a doubly fed induction generator with a partial converter; <strong>Type 4</strong> uses a full converter that electrically decouples the generator from the grid.',
        '<strong>Solar PV</strong> is inverter-coupled. <strong>Concentrating solar power</strong> is thermal generation and may include a synchronous turbine and thermal storage.',
        '<strong>Plant-level controls</strong> coordinate many devices to meet an active-power, ramp, voltage, reactive-power, or power-factor target at the point of interconnection.',
        '<strong>{{ride-through|Ride-through}}</strong> settings matter because widespread tripping during a voltage or frequency event can turn a disturbance into a much larger loss of supply.'
      ] },
      { t:'h', text:'Variability is not the same as uncertainty' },
      { t:'p', html:'<strong>Variability</strong> is the actual change in available wind or sunlight over time. <strong>Uncertainty</strong> is the forecast error around that change. Operators address both with geographic diversity, improved forecasts, flexible generation and load, storage, reserves, ramp capability, interchange, and operating margin.' },
      { t:'h', text:'Net load and the evening ramp' },
      { t:'p', html:'Net load is demand minus variable generation. High midday solar can lower net load, then produce a steep upward ramp as the sun sets while customer demand remains high. The requirement is not merely enough nameplate MW; resources must be committed, ramp-capable, synchronized or startable, fueled or charged, and deliverable at the right time.' },
      { t:'h', text:'Why DER can become a bulk-system issue' },
      { t:'list', items:[
        'Behind-the-meter output changes the load seen by the BA and can steepen ramps when it falls away.',
        'Limited visibility and telemetry make forecasting and state estimation harder.',
        'Common inverter settings can cause a large aggregate response to the same voltage or frequency event.',
        'Distribution voltage controls, protection, and restoration actions can interact with bulk-system needs.',
        'Aggregated DER can provide useful active and reactive response only when measurement, control, qualification, energy limits, and communications are dependable.'
      ] },
      { t:'note', kind:'op', title:'The operator question', html:'Ask what is visible, forecast, controllable, qualified, and deliverable. Installed capacity is not the same as available power, and an advanced control capability is not an operating service until it is enabled, tested, telemetered, and coordinated.' }
    ]
  });

  upsertAfter('balancing','m9-ver-der-integration',{
    id:'m9-wind-active-control',
    title:'Wind active-power control: inertia, droop, and AGC',
    body:[
      { t:'p', html:'Chapters 3 and 4 of <em>Active Power Controls from Wind Power: Bridging the Gaps</em> separate three services that are often blurred together. Modern wind plants can provide them only through designed, enabled, and tuned {{active-power-control|active-power controls}} and within available energy, headroom, converter, rotor-speed, and equipment limits.' },
      { t:'h', text:'Three control layers and their time scales' },
      { t:'list', items:[
        '<strong>{{synthetic-inertia|Synthetic inertial response}} - first seconds:</strong> temporarily extracts rotor kinetic energy or commands a fast converter response to reduce rate of change or improve the frequency nadir. It is short-duration and must be followed by rotor-speed and energy recovery.',
        '<strong>Primary frequency control - seconds:</strong> a local droop and deadband characteristic changes MW automatically from measured frequency. Sustained upward response normally requires reserved headroom and sufficient available wind.',
        '<strong>AGC or regulation - seconds to minutes:</strong> the plant follows an external active-power command to help correct ACE. It requires telemetry, communications, controllable range, ramp capability, and a command that stays within available power.'
      ] },
      { t:'h', text:'How a wind plant creates headroom' },
      { t:'p', html:'A wind turbine normally seeks maximum available power. To guarantee upward active-power response, the controller deliberately operates below that maximum - called de-rating or curtailment. The reserved amount can be an absolute MW quantity, a percentage of available power, or the difference between an absolute set point and available power. Downward response is usually available by reducing output, but minimum output and plant constraints still apply.' },
      { t:'p', html:'Inside the controller, fast generator-torque action handles rapid commands while slower blade-pitch action establishes the sustained operating point. A plant controller allocates the requested response among many turbines and measures performance at the point of interconnection.' },
      { t:'h', text:'Worked response example' },
      { t:'p', html:'A wind plant has <strong>100 MW available</strong> and is operating at <strong>95 MW</strong>, preserving <strong>5 MW of headroom</strong>. An underfrequency droop response requests +4 MW. The plant can raise to <strong>99 MW</strong> if ramp, converter, rotor-speed, and plant limits permit. If it had been operating at the full 100 MW, it could not sustain that +4 MW from the wind alone; it might provide a brief inertial burst by slowing rotors, but that is not the same as sustained primary reserve.' },
      { t:'h', text:'Why tuning matters' },
      { t:'list', items:[
        '<strong>Droop and deadband:</strong> a more aggressive response can improve the nadir but may increase structural loading or excite an oscillatory recovery.',
        '<strong>Rate of change of frequency:</strong> dynamic controls may change slope or deadband when frequency is moving rapidly, but measurement quality and coordination matter.',
        '<strong>Recovery:</strong> extracting kinetic energy slows the rotor. Re-acceleration must be managed so the recovery dip does not undermine the initial benefit.',
        '<strong>Available power estimate:</strong> wind changes continuously, so a command near the available limit may become undeliverable. Forecast and real-time estimation affect reserve confidence.',
        '<strong>Aggregate response:</strong> an entire plant is smoother than one turbine, but wake effects, turbine availability, common controls, network limits, and point-of-interconnection measurements still govern performance.'
      ] },
      { t:'h', text:'What the 2014 simulations and field tests established' },
      { t:'p', html:'The report demonstrated that appropriately controlled wind turbines could follow power references, provide droop-based primary response, track AGC, and improve simulated frequency performance. It also found tradeoffs among aggressive response, recovery behavior, economics of curtailment, and turbine loading. Treat those results as evidence of feasible capability - not proof that every wind plant provides every service today.' },
      { t:'note', kind:'alert', title:'Exam trap', html:'“Wind cannot respond” and “wind always responds” are both wrong. The correct answer depends on turbine type, plant controls, enabled modes, headroom, available wind, telemetry, qualification, settings, and the time duration of the requested service.' },
      { t:'note', kind:'op', title:'Operator checklist', html:'For a wind response, verify the active-power mode, available MW, current set point, upward and downward headroom, ramp limit, droop/deadband, AGC status, ride-through state, telemetry quality, point-of-interconnection limit, and what happens during recovery.' }
    ]
  });

  upsertAfter('standards','m8-support-families',{
    id:'m8-approved-reference-map',
    title:'Approved-reference reading map',
    body:[
      { t:'p', html:'The January 24, 2025 NERC exam-resource list names the approved references and identifies where primary study interest should be placed. This console teaches those concepts, but it does not replace the assigned publications.' },
      { t:'list', items:[
        '<strong>EPRI Power System Dynamics Tutorial:</strong> Glossary and Chapters 2-9 and 11. Course coverage spans Foundations, Transmission Operations, Voltage & Reactive Control, Protection Systems, Resource & Demand Balancing, and System Restoration.',
        '<strong>EPRI Power System Dynamics Tutorial Supplement:</strong> renewable generation, VER controls and integration, DER effects, forecasting, ride-through, monitoring, and coordinated active/reactive controls are summarized in “Variable and distributed resources on the BPS.”',
        '<strong>Electricity Generation Baseline Report:</strong> Chapters 5-13 - coal, natural gas, nuclear, water power, wind, biopower, solar, geothermal, and petroleum - are covered in “Generation, energy sources, and load.”',
        '<strong>Active Power Controls from Wind Power: Bridging the Gaps:</strong> Chapters 3-4 are covered in “Wind active-power control: inertia, droop, and AGC.”'
      ] },
      { t:'p', html:'Open the source set online: <a href="https://www.nerc.com/globalassets/programs/system-operator-certification--continuing-education/exam_resource_materials.pdf" target="_blank" rel="noopener">NERC Exam Resource Materials</a>; <a href="https://restservice.epri.com/publicdownload/000000000001016042/0/Product" target="_blank" rel="noopener">EPRI Power System Dynamics Tutorial</a>; <a href="https://restservice.epri.com/publicdownload/000000003002010757/0/Product" target="_blank" rel="noopener">EPRI tutorial supplement</a>; <a href="https://docs.nlr.gov/docs/fy17osti/67645.pdf" target="_blank" rel="noopener">Electricity Generation Baseline Report</a>; and <a href="https://www.energy.gov/sites/prod/files/2014/01/f6/Active%20Power%20Controls%20from%20Wind%20Power.pdf" target="_blank" rel="noopener">Active Power Controls from Wind Power</a>.' },
      { t:'note', kind:'normal', title:'How to use the map', html:'Study the console first for operator-focused structure, then use the assigned chapters to deepen diagrams, examples, equipment detail, and source wording. The packaged APPROVED_REFERENCE_COVERAGE.md file maps every assigned chapter to the corresponding lessons.' }
    ]
  });

  N.referenceCoverage={
    examResourceVersion:'January 24, 2025',
    epriTutorial:['Glossary','Chapter 2','Chapter 3','Chapter 4','Chapter 5','Chapter 6','Chapter 7','Chapter 8','Chapter 9','Chapter 11'],
    epriSupplement:['Renewable generation','VER equipment and controls','VER integration','DER impacts and controls'],
    generationBaseline:['Chapter 5 - Coal','Chapter 6 - Natural Gas','Chapter 7 - Nuclear','Chapter 8 - Water Power','Chapter 9 - Wind','Chapter 10 - Biopower','Chapter 11 - Solar','Chapter 12 - Geothermal','Chapter 13 - Petroleum'],
    windActivePower:['Chapter 3 - Dynamic Stability and Reliability Impacts','Chapter 4 - Controller Design, Simulation, and Field Testing']
  };
})(window.NERC=window.NERC||{});
