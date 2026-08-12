/* Phase 3 integrated judgment and personalized practice data. */
window.NERC = window.NERC || {};
window.NERC.misconceptions = {
  "1a": {
    "id": "interchange-lifecycle",
    "label": "Interchange lifecycle and implemented schedules",
    "description": "Confusing a requested or arranged transaction with Implemented Interchange, or overlooking ramps and approvals.",
    "sections": [
      "m9-reserves-interchange",
      "m8-interchange-recovery"
    ]
  },
  "1b": {
    "id": "reserve-purpose",
    "label": "Reserve purpose and deployment",
    "description": "Treating reserves as ordinary energy or choosing a reserve response that is not deliverable for the event.",
    "sections": [
      "m9-reserves-interchange",
      "m5-capacity"
    ]
  },
  "1c": {
    "id": "agc-control-mode",
    "label": "AGC modes and control capability",
    "description": "Using the wrong control mode or assuming AGC can correct a condition when frequency, telemetry, or unit capability is unavailable.",
    "sections": [
      "m9-isochronous-agc",
      "m9-agc-ace"
    ]
  },
  "1d": {
    "id": "ace-sign-components",
    "label": "ACE sign and components",
    "description": "Misreading the relationship among actual interchange, scheduled interchange, frequency bias, and ACE.",
    "sections": [
      "m9-agc-ace",
      "m8-interchange-recovery"
    ]
  },
  "1e": {
    "id": "frequency-response",
    "label": "Frequency response and recovery",
    "description": "Confusing arrest, stabilization, and restoration, or overlooking the generation-load imbalance driving frequency.",
    "sections": [
      "m9-balance-frequency",
      "m9-isochronous-agc"
    ]
  },
  "1f": {
    "id": "forecast-uncertainty",
    "label": "Forecast uncertainty and operating margin",
    "description": "Treating a forecast as a single certain value instead of planning for error, weather, and ramp uncertainty.",
    "sections": [
      "m9-generation-sources",
      "m5-prep-planning"
    ]
  },
  "1g": {
    "id": "unit-capability",
    "label": "Generation capability and constraints",
    "description": "Assuming nameplate MW equals dependable or immediately available capability, or ignoring ramp and reactive limits.",
    "sections": [
      "m9-generation-sources",
      "m2-control-devices"
    ]
  },
  "1h": {
    "id": "resource-characteristics",
    "label": "Energy-source operating characteristics",
    "description": "Overgeneralizing how hydro, thermal, wind, solar, and storage respond to dispatch and system conditions.",
    "sections": [
      "m9-generation-sources"
    ]
  },
  "2a": {
    "id": "protection-sequence",
    "label": "Protection zones, primary and backup clearing",
    "description": "Confusing relay operation, breaker action, breaker failure, reclosing, and RAS consequences.",
    "sections": [
      "m1-protection",
      "m4-event-reconstruction"
    ]
  },
  "2b": {
    "id": "voltage-reactive-locality",
    "label": "Voltage, reactive power, and equipment limits",
    "description": "Treating voltage as a system-wide scalar, overlooking local reactive support, or exhausting generator MVAR reserve.",
    "sections": [
      "m2-why-voltage",
      "m2-control-devices",
      "m2-voltage-collapse"
    ]
  },
  "2c": {
    "id": "electrical-relationships",
    "label": "AC power relationships",
    "description": "Misapplying MW, MVAR, MVA, phase angle, impedance, current, and three-phase relationships.",
    "sections": [
      "f-ac-basics",
      "f-three-phase",
      "f-power-in-practice"
    ]
  },
  "2d": {
    "id": "switching-verification",
    "label": "Switching state and verification",
    "description": "Proceeding from a command or status indication without verifying the expected electrical response and actual equipment state.",
    "sections": [
      "m1-switching",
      "f-human-performance",
      "m1-ems-data-quality"
    ]
  },
  "2e": {
    "id": "limit-response",
    "label": "Operating-limit recognition and response",
    "description": "Confusing ratings, SOLs, IROLs, actual conditions, post-contingency results, and required mitigation timing.",
    "sections": [
      "f-limits",
      "m1-limits-realtime",
      "m3-ratings-to-action"
    ]
  },
  "2f": {
    "id": "equipment-behavior",
    "label": "Transmission-equipment behavior",
    "description": "Misunderstanding how lines, transformers, breakers, capacitors, reactors, and LTCs affect power flow and voltage.",
    "sections": [
      "m1-equipment",
      "m2-reactive-sources",
      "m2-control-devices"
    ]
  },
  "3a": {
    "id": "operations-planning",
    "label": "Same-day and next-day operating plans",
    "description": "Selecting a plan that is not executable, not coordinated, or not robust to the credible conditions identified.",
    "sections": [
      "m5-prep-planning",
      "m5-operating-plan-tabletop"
    ]
  },
  "3b": {
    "id": "weather-preparation",
    "label": "Severe-weather and GMD preparation",
    "description": "Reacting only after conditions arrive instead of translating forecasts into staffing, equipment, reserve, and coordination actions.",
    "sections": [
      "m5-weather-gmd",
      "m5-prep-planning"
    ]
  },
  "3c": {
    "id": "capacity-deficiency",
    "label": "Anticipated capacity deficiency",
    "description": "Confusing energy and capacity, overcounting imports or unavailable resources, or delaying escalation and mitigation.",
    "sections": [
      "m5-capacity",
      "m5-operating-plan-tabletop"
    ]
  },
  "4a": {
    "id": "restoration-sequence",
    "label": "Restoration sequence and electrical constraints",
    "description": "Restoring load or energizing paths without balancing generation, voltage, frequency, cold-load pickup, and synchronization constraints.",
    "sections": [
      "m6-restoration",
      "m6-restoration-constraints",
      "m6-cold-load"
    ]
  },
  "4b": {
    "id": "disturbance-priority",
    "label": "Disturbance recognition and priorities",
    "description": "Focusing on diagnosis detail before stabilizing the system, or choosing actions that do not address the immediate reliability risk.",
    "sections": [
      "m5-disturbances",
      "m9-balance-frequency"
    ]
  },
  "4c": {
    "id": "capacity-emergency",
    "label": "Capacity-emergency escalation and load shed",
    "description": "Delaying firm emergency actions after reserves, imports, and operating-plan measures are exhausted or unavailable.",
    "sections": [
      "m5-capacity",
      "m5-operating-plan-tabletop"
    ]
  },
  "4d": {
    "id": "control-center-loss",
    "label": "Loss of control-center functionality",
    "description": "Treating fallback capability as improvised rather than following a tested plan, transferring authority, and verifying communications and tools.",
    "sections": [
      "m5-degraded",
      "m5-operating-plan-tabletop"
    ]
  },
  "4e": {
    "id": "degraded-tools",
    "label": "Loss of analysis and monitoring tools",
    "description": "Continuing normal operations when situational awareness is degraded instead of increasing margins, verification, and coordination.",
    "sections": [
      "m5-degraded",
      "m1-ems-data-quality"
    ]
  },
  "5a": {
    "id": "contingency-model",
    "label": "Contingency selection and interpretation",
    "description": "Confusing actual and post-contingency states, omitting credible contingencies, or reading a result without its assumptions.",
    "sections": [
      "m3-contingency-analysis",
      "m3-network-tools"
    ]
  },
  "5b": {
    "id": "state-estimator-confidence",
    "label": "State-estimator and model confidence",
    "description": "Assuming convergence proves every input is correct, or using failed or inconsistent model results without independent verification.",
    "sections": [
      "m3-network-tools",
      "m1-ems-data-quality"
    ]
  },
  "5c": {
    "id": "corrective-action-verification",
    "label": "Corrective-action selection and verification",
    "description": "Choosing an action for theoretical relief without checking availability, timing, side effects, coordination, and updated analysis.",
    "sections": [
      "m3-response",
      "m3-ratings-to-action"
    ]
  },
  "5d": {
    "id": "sol-concept",
    "label": "SOL concept and mitigation",
    "description": "Treating an SOL as only a thermal rating or failing to connect the limit to the applicable system condition and operating plan.",
    "sections": [
      "m3-sol-irol",
      "m3-ratings-to-action"
    ]
  },
  "5e": {
    "id": "irol-concept",
    "label": "IROL consequence and time",
    "description": "Treating an IROL like any other SOL, applying a generic time, or relying on mitigation that cannot complete within the established IROL Tv.",
    "sections": [
      "m3-sol-irol",
      "m3-ratings-to-action"
    ]
  },
  "6a": {
    "id": "reporting-trigger",
    "label": "Reporting triggers and content",
    "description": "Missing who must be notified, when reporting is required, or what operational information must be included.",
    "sections": [
      "m7-reporting",
      "m5-disturbances"
    ]
  },
  "6b": {
    "id": "communication-loop",
    "label": "Operating Instructions and repeat-backs",
    "description": "Using incomplete repeat-backs, failing to correct an error, or not communicating inability to comply.",
    "sections": [
      "m7-three-part",
      "m7-directives-fallback"
    ]
  },
  "6c": {
    "id": "data-verification",
    "label": "Data validity and independent verification",
    "description": "Accepting a plausible display value without checking timestamps, quality flags, redundant indications, trends, or local confirmation.",
    "sections": [
      "m7-data-validity",
      "m1-ems-data-quality"
    ]
  },
  "6d": {
    "id": "telemetry-path",
    "label": "Telemetry and communications paths",
    "description": "Confusing field devices, RTUs, communication links, ICCP, SCADA, and EMS functions or failing to use fallback channels.",
    "sections": [
      "m7-telemetry-equip",
      "m7-directives-fallback",
      "m1-ems-data-quality"
    ]
  }
};
window.NERC.moduleDomains = {
  "foundations": [
    "transmission",
    "contingency",
    "comms-data"
  ],
  "transmission-ops": [
    "transmission",
    "contingency",
    "comms-data"
  ],
  "voltage-reactive": [
    "transmission",
    "contingency"
  ],
  "operating-limits": [
    "contingency",
    "transmission"
  ],
  "protection": [
    "transmission",
    "emergency-response"
  ],
  "emergency-ops": [
    "emergency-prep",
    "emergency-response"
  ],
  "restoration": [
    "emergency-response",
    "transmission"
  ],
  "comms-coord": [
    "comms-data",
    "emergency-response"
  ],
  "balancing": [
    "balancing",
    "emergency-response"
  ],
  "standards": [
    "balancing",
    "transmission",
    "emergency-prep",
    "emergency-response",
    "contingency",
    "comms-data"
  ]
};
window.NERC.events = [
  {
    "id": "summer-peak-cascade",
    "title": "Summer peak: storm, topology uncertainty, and an IROL clock",
    "credentialFit": [
      "TO",
      "RC",
      "BT"
    ],
    "duration": "20\u201330 minutes",
    "summary": "A severe thunderstorm trips a major line during peak load. Conflicting telemetry, voltage decline, and a post-contingency IROL require disciplined verification, communication, and time-bounded mitigation.",
    "dimensions": [
      "system",
      "awareness",
      "coordination"
    ],
    "start": {
      "system": 78,
      "awareness": 70,
      "coordination": 72
    },
    "startStep": "verify-trip",
    "steps": [
      {
        "id": "verify-trip",
        "phase": "00:00 \u00b7 Disturbance",
        "prompt": "Line North\u2013Central trips. Breaker status shows OPEN, but one current channel remains high and the state estimator stops converging. What do you do first?",
        "options": [
          {
            "text": "Treat the line as open and immediately redispatch from the contingency result",
            "score": 0,
            "effects": {
              "system": -8,
              "awareness": -18,
              "coordination": -5
            },
            "feedback": "The displayed topology and analog data conflict, so the analysis result is not yet dependable. Acting on it can move the system in the wrong direction.",
            "next": "model-recovery"
          },
          {
            "text": "Hold dependent switching, verify the physical state with independent indications or local confirmation, and notify affected operators of the uncertainty",
            "score": 3,
            "effects": {
              "system": 2,
              "awareness": 15,
              "coordination": 10
            },
            "feedback": "This preserves the system while rebuilding a trustworthy operating picture. You separate the physical event from the data-quality problem.",
            "next": "assess-limit"
          },
          {
            "text": "Repeat the remote open command until the analog value falls",
            "score": -1,
            "effects": {
              "system": -10,
              "awareness": -10,
              "coordination": -4
            },
            "feedback": "Repeated commands do not resolve uncertain equipment state and can add risk. Verification must precede further control action.",
            "next": "model-recovery"
          }
        ]
      },
      {
        "id": "model-recovery",
        "phase": "00:04 \u00b7 Recovery branch",
        "prompt": "The first action did not resolve the mismatch. Which recovery action best limits further risk?",
        "options": [
          {
            "text": "Remove the suspicious analog from the estimator and assume the breaker status is correct",
            "score": 0,
            "effects": {
              "system": -6,
              "awareness": -10,
              "coordination": 0
            },
            "feedback": "Forcing convergence can hide the underlying topology error. A converged model is not useful if its assumed network is wrong.",
            "next": "assess-limit"
          },
          {
            "text": "Declare the model degraded, increase operating margin, obtain local breaker verification, and use independent flow and voltage indications",
            "score": 3,
            "effects": {
              "system": 6,
              "awareness": 16,
              "coordination": 8
            },
            "feedback": "You explicitly manage degraded situational awareness and use conservative, independently verified information until the model is restored.",
            "next": "assess-limit"
          }
        ]
      },
      {
        "id": "assess-limit",
        "phase": "00:07 \u00b7 Real-time assessment",
        "prompt": "The line is confirmed open. Updated analysis shows the next credible outage would exceed an established IROL. The IROL Tv is running. Which plan is best?",
        "options": [
          {
            "text": "Wait for a planned line return that will finish after the IROL Tv",
            "score": 0,
            "effects": {
              "system": -20,
              "awareness": -3,
              "coordination": -2
            },
            "feedback": "A mitigation that completes after the established time cannot be the primary IROL response.",
            "next": "voltage"
          },
          {
            "text": "Implement executable redispatch and transfer curtailment that clear the IROL within its established time, then rerun the assessment",
            "score": 4,
            "effects": {
              "system": 18,
              "awareness": 8,
              "coordination": 8
            },
            "feedback": "The action is available, timely, coordinated, and verifiable. Those are the characteristics of a defensible corrective action.",
            "next": "voltage"
          },
          {
            "text": "Lower the monitored facility rating so the alarm reflects the seriousness of the event",
            "score": -1,
            "effects": {
              "system": -15,
              "awareness": -8,
              "coordination": -3
            },
            "feedback": "Ratings and limits are not operator-adjustable alarm settings. Change the system condition, not the definition of the limit.",
            "next": "voltage"
          }
        ]
      },
      {
        "id": "voltage",
        "phase": "00:15 \u00b7 Voltage decline",
        "prompt": "Redispatch is in progress, but the weak-area bus falls to 0.94 pu and a nearby generator is approaching its MVAR limit. What is the best coordinated action?",
        "options": [
          {
            "text": "Raise the generator voltage setpoint until the bus recovers, regardless of its MVAR output",
            "score": 0,
            "effects": {
              "system": -10,
              "awareness": -4,
              "coordination": -3
            },
            "feedback": "The generator is approaching a reactive limit. Continuing to rely on it can remove remaining dynamic support when it is most needed.",
            "next": "instruction"
          },
          {
            "text": "Use available local shunt or dynamic support, coordinate LTC behavior, preserve generator reactive reserve, and verify the voltage response",
            "score": 4,
            "effects": {
              "system": 15,
              "awareness": 8,
              "coordination": 8
            },
            "feedback": "Local support and coordinated control reduce reactive transport and preserve generator capability for further disturbance response.",
            "next": "instruction"
          },
          {
            "text": "Increase real-power transfer into the area because MW support always raises voltage",
            "score": -1,
            "effects": {
              "system": -18,
              "awareness": -7,
              "coordination": -4
            },
            "feedback": "Additional transfer can increase current and reactive losses, worsening the weak-area voltage condition.",
            "next": "instruction"
          }
        ]
      },
      {
        "id": "instruction",
        "phase": "00:19 \u00b7 Operating Instruction",
        "prompt": "You direct a neighboring operator to curtail 150 MW by 14:25. Their repeat-back says only, \u201cWe will reduce the transfer.\u201d What is your response?",
        "options": [
          {
            "text": "Accept it because the intent is clear",
            "score": 0,
            "effects": {
              "coordination": -18,
              "system": -5
            },
            "feedback": "The amount and completion time are missing. The communication loop is not closed.",
            "next": "final-check"
          },
          {
            "text": "Correct the repeat-back and require the amount, action, and completion time before confirming",
            "score": 3,
            "effects": {
              "coordination": 16,
              "system": 5,
              "awareness": 4
            },
            "feedback": "A complete repeat-back protects the exact action and timing needed for the IROL mitigation.",
            "next": "final-check"
          }
        ]
      },
      {
        "id": "final-check",
        "phase": "00:24 \u00b7 Verification",
        "prompt": "Flows and voltage improve. What closes the event response?",
        "options": [
          {
            "text": "End the event when the alarms clear",
            "score": 0,
            "effects": {
              "awareness": -10,
              "coordination": -4
            },
            "feedback": "Alarm clearance alone does not verify that the limiting contingency, IROL, and all affected conditions are acceptable.",
            "next": "complete"
          },
          {
            "text": "Rerun the assessment, verify the IROL and other limits are secure, confirm actions with affected entities, and document the event",
            "score": 4,
            "effects": {
              "system": 10,
              "awareness": 12,
              "coordination": 10
            },
            "feedback": "Verification connects action to result and confirms that the system, not just the display, is in an acceptable state.",
            "next": "complete"
          }
        ]
      }
    ],
    "debrief": "This event connects data validity, topology processing, real-time assessment, IROL response, voltage control, and operating communications. The recurring operator pattern is verify, prioritize, act within the required time, and independently confirm the result.",
    "reviewSections": [
      "m1-ems-data-quality",
      "m3-ratings-to-action",
      "m2-control-devices",
      "m7-directives-fallback"
    ]
  },
  {
    "id": "winter-capacity-event",
    "title": "Winter morning: generation loss, ACE, reserves, and capacity emergency",
    "credentialFit": [
      "RC",
      "BT",
      "BI",
      "TO"
    ],
    "duration": "20\u201330 minutes",
    "summary": "A cold morning generator trip creates a frequency and ACE excursion while imports are constrained. The learner must distinguish immediate balancing response from longer capacity-emergency actions.",
    "dimensions": [
      "system",
      "awareness",
      "coordination"
    ],
    "start": {
      "system": 74,
      "awareness": 76,
      "coordination": 70
    },
    "startStep": "trip",
    "steps": [
      {
        "id": "trip",
        "phase": "06:41 \u00b7 Unit trip",
        "prompt": "A 650 MW unit trips. Frequency falls, ACE becomes strongly negative, and regulating units begin responding. What is the first priority?",
        "options": [
          {
            "text": "Correct the hourly interchange checkout before deploying reserves",
            "score": -1,
            "effects": {
              "system": -18,
              "awareness": -5
            },
            "feedback": "The immediate reliability need is arresting and recovering from the generation-load imbalance, not accounting cleanup.",
            "next": "reserve"
          },
          {
            "text": "Confirm the disturbance, deploy deliverable contingency reserve according to the plan, and monitor frequency and ACE recovery",
            "score": 4,
            "effects": {
              "system": 18,
              "awareness": 10,
              "coordination": 6
            },
            "feedback": "This addresses the physical imbalance and uses the planned balancing response while preserving situational awareness.",
            "next": "reserve"
          },
          {
            "text": "Place every AGC unit in manual so operators have direct control",
            "score": 0,
            "effects": {
              "system": -10,
              "awareness": -4,
              "coordination": -2
            },
            "feedback": "Removing effective automatic response during a disturbance can slow recovery unless the control mode itself is unavailable or inappropriate.",
            "next": "reserve"
          }
        ]
      },
      {
        "id": "reserve",
        "phase": "06:47 \u00b7 Recovery",
        "prompt": "Frequency has stabilized, but ACE remains negative and reserve is nearly depleted. Imports are at their transfer limits. What condition now deserves escalation?",
        "options": [
          {
            "text": "A continuing capacity deficiency because dependable supply and imports cannot cover load plus required margin",
            "score": 4,
            "effects": {
              "awareness": 14,
              "coordination": 8,
              "system": 5
            },
            "feedback": "The immediate frequency event is transitioning into a sustained capacity problem. The operating plan and emergency escalation process now matter.",
            "next": "forecast"
          },
          {
            "text": "A voltage emergency solely because ACE is negative",
            "score": 0,
            "effects": {
              "awareness": -12,
              "system": -4
            },
            "feedback": "ACE indicates balancing performance, not by itself a voltage emergency.",
            "next": "forecast"
          },
          {
            "text": "An interchange accounting error because actual interchange differs from schedule",
            "score": 0,
            "effects": {
              "awareness": -10,
              "coordination": -3
            },
            "feedback": "The deviation is a physical response to the generation loss, not evidence of a scheduling error.",
            "next": "forecast"
          }
        ]
      },
      {
        "id": "forecast",
        "phase": "06:53 \u00b7 Updated outlook",
        "prompt": "The updated forecast adds 400 MW of load over the next hour, two gas units report fuel limitations, and no additional firm imports are available. What is the best planning action?",
        "options": [
          {
            "text": "Count the gas units at full nameplate until they trip",
            "score": -1,
            "effects": {
              "system": -18,
              "awareness": -12
            },
            "feedback": "Dependable capability must reflect known fuel and operating limitations, not nameplate capacity.",
            "next": "emergency"
          },
          {
            "text": "Recalculate dependable capability and margin, implement the capacity-deficiency plan, coordinate emergency assistance, and prepare staged demand actions",
            "score": 4,
            "effects": {
              "system": 12,
              "awareness": 14,
              "coordination": 12
            },
            "feedback": "You convert forecast and resource uncertainty into an executable operating plan before the shortfall becomes unrecoverable.",
            "next": "emergency"
          },
          {
            "text": "Wait for the load increase to appear in ACE before taking further action",
            "score": 0,
            "effects": {
              "system": -15,
              "awareness": -8,
              "coordination": -5
            },
            "feedback": "Forecast information is valuable precisely because it supports action before the imbalance appears in real time.",
            "next": "emergency"
          }
        ]
      },
      {
        "id": "emergency",
        "phase": "07:10 \u00b7 Emergency state",
        "prompt": "All available reserve and assistance are committed. Frequency is acceptable, but the 15-minute forecast shows a 220 MW deficit. Which action is best?",
        "options": [
          {
            "text": "Continue normal operation because frequency is currently acceptable",
            "score": 0,
            "effects": {
              "system": -22,
              "awareness": -7
            },
            "feedback": "Current frequency does not erase the forecast deficiency. The remaining actions must be implemented before the deficit becomes an uncontrolled event.",
            "next": "communication"
          },
          {
            "text": "Escalate under the operating plan and implement the next controlled demand or load-shed step in time to maintain balance",
            "score": 4,
            "effects": {
              "system": 18,
              "coordination": 10,
              "awareness": 8
            },
            "feedback": "Controlled, planned action is preferable to waiting for uncontrolled frequency decline or automatic shedding.",
            "next": "communication"
          },
          {
            "text": "Schedule non-firm interchange above the transfer limit because the emergency justifies it",
            "score": -1,
            "effects": {
              "system": -20,
              "coordination": -8
            },
            "feedback": "An emergency does not make an unavailable or reliability-limited transfer deliverable.",
            "next": "communication"
          }
        ]
      },
      {
        "id": "communication",
        "phase": "07:14 \u00b7 Coordination",
        "prompt": "A distribution operator responds, \u201cWe probably cannot shed that block remotely.\u201d What is the best reply?",
        "options": [
          {
            "text": "Confirm that they will try and move on",
            "score": 0,
            "effects": {
              "coordination": -16,
              "system": -8
            },
            "feedback": "The response is uncertain and not an executable commitment. You need an explicit capability, alternative, and timing.",
            "next": "complete"
          },
          {
            "text": "Require a clear unable-to-comply statement, identify the available alternative block or local action, confirm timing, and update the plan",
            "score": 4,
            "effects": {
              "coordination": 18,
              "system": 10,
              "awareness": 6
            },
            "feedback": "The plan now uses an action that is understood, available, and time-bounded instead of an assumption.",
            "next": "complete"
          }
        ]
      }
    ],
    "debrief": "The key distinction is between immediate disturbance recovery and the sustained capacity problem that follows. Frequency and ACE guide balancing response; dependable capability, forecasts, transfer limits, and the operating plan guide capacity-emergency decisions.",
    "reviewSections": [
      "m9-balance-frequency",
      "m9-reserves-interchange",
      "m5-capacity",
      "m5-operating-plan-tabletop"
    ]
  },
  {
    "id": "restoration-island",
    "title": "Blackstart island: control-center fallback and staged restoration",
    "credentialFit": [
      "TO",
      "RC",
      "BT"
    ],
    "duration": "25\u201335 minutes",
    "summary": "After a widespread outage and control-center transfer, the operator establishes a blackstart island, energizes a cranking path, manages cold-load pickup, and prepares synchronization.",
    "dimensions": [
      "system",
      "awareness",
      "coordination"
    ],
    "start": {
      "system": 52,
      "awareness": 62,
      "coordination": 58
    },
    "startStep": "fallback",
    "steps": [
      {
        "id": "fallback",
        "phase": "00:00 \u00b7 Control-center transfer",
        "prompt": "The primary control center is unavailable. The backup center has communications but several displays are not yet validated. What is the first operating step?",
        "options": [
          {
            "text": "Begin restoration immediately using whatever displays are available",
            "score": 0,
            "effects": {
              "system": -12,
              "awareness": -18,
              "coordination": -8
            },
            "feedback": "Restoration from an unverified authority and tool state can create conflicting instructions and unsafe assumptions.",
            "next": "blackstart"
          },
          {
            "text": "Activate the loss-of-control-center plan, establish authority, verify critical communications and tools, and communicate the transfer",
            "score": 4,
            "effects": {
              "awareness": 18,
              "coordination": 16,
              "system": 6
            },
            "feedback": "A tested transfer of authority and verified minimum tools create the foundation for coordinated restoration.",
            "next": "blackstart"
          }
        ]
      },
      {
        "id": "blackstart",
        "phase": "00:18 \u00b7 Initial island",
        "prompt": "A blackstart unit is available. Which restoration action should come first?",
        "options": [
          {
            "text": "Pick up the largest load block to stabilize the unit",
            "score": -1,
            "effects": {
              "system": -20,
              "awareness": -6
            },
            "feedback": "Large cold-load pickup can collapse frequency or voltage before the island has sufficient generation and reactive support.",
            "next": "cranking"
          },
          {
            "text": "Establish the planned blackstart island, verify voltage and frequency, and energize the approved cranking path in controlled steps",
            "score": 4,
            "effects": {
              "system": 18,
              "awareness": 10,
              "coordination": 8
            },
            "feedback": "The restoration plan sequences source, path, and load so each energized element remains within electrical constraints.",
            "next": "cranking"
          },
          {
            "text": "Energize several long unloaded lines at once to reach more generators quickly",
            "score": 0,
            "effects": {
              "system": -16,
              "awareness": -5
            },
            "feedback": "Long unloaded lines can create excessive charging MVAR and high voltage. Energization must be staged and monitored.",
            "next": "cranking"
          }
        ]
      },
      {
        "id": "cranking",
        "phase": "00:31 \u00b7 Path energization",
        "prompt": "Voltage rises as a long 345 kV segment is energized with little load. What is the best response?",
        "options": [
          {
            "text": "Continue; unloaded lines cannot threaten equipment",
            "score": -1,
            "effects": {
              "system": -20,
              "awareness": -8
            },
            "feedback": "Line charging and Ferranti rise can produce excessive voltage during restoration.",
            "next": "load"
          },
          {
            "text": "Use the planned reactor or load pickup, adjust the energization sequence, and verify voltage before extending the path",
            "score": 4,
            "effects": {
              "system": 16,
              "awareness": 10,
              "coordination": 6
            },
            "feedback": "Reactive balance is a restoration constraint. The path must be controlled, not merely connected.",
            "next": "load"
          }
        ]
      },
      {
        "id": "load",
        "phase": "00:46 \u00b7 Load pickup",
        "prompt": "The first distribution block is estimated at 35 MW, but cold-load pickup could make the initial demand much larger. How should it be restored?",
        "options": [
          {
            "text": "Restore the entire feeder and use the governor afterward if frequency falls",
            "score": 0,
            "effects": {
              "system": -18,
              "awareness": -5
            },
            "feedback": "Waiting for a large frequency decline sacrifices the margin needed to keep the island stable.",
            "next": "sync"
          },
          {
            "text": "Pick up load in measured blocks, pause for frequency and voltage stabilization, and compare actual pickup with the island capability",
            "score": 4,
            "effects": {
              "system": 18,
              "awareness": 12,
              "coordination": 6
            },
            "feedback": "Staged pickup turns uncertain cold-load behavior into observable steps the island can support.",
            "next": "sync"
          }
        ]
      },
      {
        "id": "sync",
        "phase": "01:12 \u00b7 Synchronization",
        "prompt": "A neighboring island is ready to reconnect. What conditions must be verified before closing the tie?",
        "options": [
          {
            "text": "Only equal voltage magnitude",
            "score": -1,
            "effects": {
              "system": -22,
              "awareness": -10
            },
            "feedback": "Voltage alone is insufficient. Frequency and phase-angle differences determine the mechanical and electrical stress at closure.",
            "next": "complete"
          },
          {
            "text": "Acceptable voltage, frequency, and phase-angle differences; correct phase sequence; communications; and authority to close",
            "score": 4,
            "effects": {
              "system": 20,
              "awareness": 12,
              "coordination": 12
            },
            "feedback": "Synchronization is an electrical and coordination decision. All required conditions must be acceptable at the same moment.",
            "next": "complete"
          }
        ]
      }
    ],
    "debrief": "Restoration is not simply turning equipment back on. It is controlled creation and expansion of stable islands while managing authority, communications, voltage, frequency, cranking power, cold-load pickup, and synchronization.",
    "reviewSections": [
      "m5-degraded",
      "m6-restoration",
      "m6-restoration-constraints",
      "m6-cold-load",
      "m6-islanding"
    ]
  }
];
window.NERC.phase3 = {version:'3.0.0', analytics:'local-only and opt-in', eventCount:3, experimentalCount:20};
