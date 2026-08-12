#!/usr/bin/env python3
"""
build-stdcards.py — regenerate js/data.stdcards.js from the NERC One Stop Shop export.

The standard number, title, purpose, status and dates are copied VERBATIM from the
spreadsheet so there is no transcription risk. Only the plain-language explanation
and the example are authored here, keyed by standard number.

Re-run whenever a fresh One Stop Shop export is uploaded:
    python3 build-stdcards.py <path-to-xlsx>

It reports any standard in the sheet that has no authored explanation yet, and any
authored entry whose standard has dropped out of the sheet, so drift is visible.
"""
import json, sys, os, datetime
import pandas as pd

SRC = sys.argv[1] if len(sys.argv) > 1 else '/mnt/user-data/uploads/nerc_standards.xlsx'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'js', 'data.stdcards.js')

KEEP = ['Mandatory Subject to Enforcement',
        'Subject to Future Enforcement',
        'Filed and Pending Regulatory Approval']
STATUS_KEY = {'Mandatory Subject to Enforcement': 'mandatory',
              'Subject to Future Enforcement': 'future',
              'Filed and Pending Regulatory Approval': 'pending'}

# ---------------------------------------------------------------------------
# Authored explanations: { standard number: (plain english, concrete example) }
# ---------------------------------------------------------------------------
EXPLAIN = {
 # ---- BAL ----
 'BAL-001-2': ("Grades how well a Balancing Authority actually controls its ACE over time, through CPS1 and the Balancing Authority ACE Limit (BAAL). This is what turns \u201Ckeep ACE near zero\u201D from good practice into a measurable, enforceable obligation.",
   "A BA must maintain CPS1 at or above 100 percent and must not remain beyond its applicable BAAL boundary for more than 30 consecutive clock-minutes."),
 'BAL-001-TRE-2': ("The ERCOT-region version of the primary frequency response requirement. ERCOT is its own Interconnection, so Texas RE sets its own rules for how much governor response generators must deliver.",
   "A generator in ERCOT is measured against this regional standard for its response to a frequency dip, not the continent-wide BAL requirements."),
 'BAL-002-3': ("The Disturbance Control Standard. After losing a large resource, the BA (or its Reserve Sharing Group) must deploy Contingency Reserve and bring ACE back to defined values inside the recovery period \u2014 then rebuild the reserve for the next event.",
   "A 250 MW unit trips; the BA has to restore ACE using reserve within the DCS recovery window, commonly 15 minutes."),
 'BAL-003-2': ("Requires each BA to carry enough Frequency Response to help arrest Interconnection frequency deviations, and prescribes the consistent method for calculating the Frequency Bias Setting \u2014 the B in the ACE equation.",
   "The bias value your ACE calculation uses is not chosen freely; it is derived each year by the method this standard sets out."),
 'BAL-004-WECC-4': ("A Western Interconnection rule for correcting accumulated time error and paying back Primary Inadvertent Interchange without hurting reliability in the process.",
   "Clocks driven by grid frequency drift when frequency runs slightly off 60 Hz; the West corrects that drift under this standard."),
 'BAL-005-1': ("Sets what data a BA must acquire to calculate Reporting ACE \u2014 and how often, how accurately, and how reliably that data has to reach the system operator.",
   "If tie-line telemetry updates too slowly or is frequently unavailable, the ACE calculation built on it does not meet this standard."),
 'BAL-007-1.1': ("A newer requirement to look ahead for forecast Energy Emergencies in the near term \u2014 assessing whether there will be enough energy (not just installed capacity) and planning what to do about a shortfall.",
   "A forecast cold snap expected to strain fuel supply would trigger a near-term energy assessment and a plan under this standard."),
 'BAL-502-RF-03': ("A ReliabilityFirst regional standard setting how resource adequacy is analyzed and documented, built on the classic \u201Cone day in ten years\u201D loss-of-load expectation criterion.",
   "An RF entity documents that its planned resources hold expected unserved-load risk to roughly one day in ten years."),
 # ---- CIP (physical security / monitoring only; cyber set trimmed from this export) ----
 'CIP-014-3': ("Requires identifying the transmission stations and substations \u2014 and their primary control centers \u2014 whose loss to a physical attack could cause instability, uncontrolled separation, or Cascading, and then protecting them.",
   "A critical 500 kV substation gets a risk assessment, independent third-party verification, and a physical security plan."),
 'CIP-014-4': ("Same physical security purpose as the currently enforceable version, in a newer revision awaiting regulatory approval.",
   "Watch this one: when it is approved it replaces the version you are complying with today."),
 'CIP-015-1': ("Extends cyber security monitoring to inside the trusted network zone, so activity that already slipped past the perimeter can still be spotted.",
   "Unusual east-west traffic between two control-center servers would be flagged rather than assumed safe because it is already inside."),
 'CIP-015-2': ("The next revision of internal network security monitoring, filed and awaiting approval.",
   "Not yet enforceable \u2014 track it, do not build compliance around it."),
 # ---- COM ----
 'COM-001-3': ("Requires you to have the Interpersonal Communication capability needed to run the system \u2014 including alternates \u2014 and to test that the backup actually works.",
   "If your primary phone path to the RC fails, you must have a tested alternate and know how to use it."),
 'COM-002-4': ("The three-part communication standard. Operating Instructions must use defined protocols \u2014 issue, repeat back, confirm \u2014 so a misheard instruction never reaches a breaker.",
   "The RC directs opening a specific breaker; you repeat it back verbatim and they confirm before you operate anything."),
 # ---- EOP ----
 'EOP-004-4': ("Requires defined events to be reported to NERC and others on a set timeline, so the industry can see and learn from what actually happened.",
   "Shedding firm load in an emergency, or damage from a physical attack, triggers a report under this standard."),
 'EOP-004-5': ("The next revision of event reporting, filed and awaiting approval.",
   "Same idea as the enforceable version; check the effective date before relying on any changes."),
 'EOP-005-3': ("The TOP's restoration standard. Plans, blackstart resources, cranking paths, and trained people must all be in place and tested so the system can be rebuilt from a blackout.",
   "Your restoration plan names its blackstart units and cranking paths, and those units are periodically tested to prove they will actually start."),
 'EOP-006-3': ("The RC's side of restoration: coordinating the restoration process across multiple TOPs and BAs so neighboring areas do not work against each other.",
   "Two TOPs energizing toward one another get sequenced and coordinated by the RC rather than colliding mid-path."),
 'EOP-008-2': ("Requires a plan and a backup capability so operations continue if your control center becomes unusable.",
   "A fire forces evacuation; operators relocate to a backup control center and regain functionality within the required time."),
 'EOP-010-1': ("Requires operating plans, processes, and procedures to ride out geomagnetic disturbance (solar storm) events.",
   "On a severe GMD alert your operating plan may call for reducing transfers and increasing reactive reserves."),
 'EOP-011-4': ("Requires TOPs and BAs to develop, implement, and coordinate emergency operating plans \u2014 including capacity and energy emergencies and, ultimately, load shedding.",
   "A capacity shortfall walks you through the Energy Emergency Alert steps laid out in your plan."),
 'EOP-012-3': ("Requires Generator Owners to have and implement extreme cold weather plans so units do not fail exactly when demand peaks.",
   "Freeze protection on critical instrument sensing lines \u2014 a direct response to the generation losses seen in Winter Storm Uri."),
 # ---- FAC ----
 'FAC-001-4': ("Requires Transmission Owners (and applicable Generator Owners) to publish the technical requirements anyone must meet to interconnect, so developers know the rules up front.",
   "A developer planning a new plant can obtain the interconnection requirements before designing anything."),
 'FAC-002-4': ("Requires studying the reliability impact of new or materially changed facilities before they are connected.",
   "A new 300 MW plant gets an interconnection study looking at flows, voltage, and stability before it is energized."),
 'FAC-003-5': ("The vegetation standard. Requires a defense-in-depth program to manage trees on and adjacent to transmission rights of way, preventing the vegetation contacts that can start a cascade.",
   "This standard exists in large part because vegetation contact with sagging lines helped trigger the 2003 Northeast blackout."),
 'FAC-008-5': ("Requires Facility Ratings to be derived from a documented, technically sound method. Ratings are the foundation every System Operating Limit is built on.",
   "A line's rating is set by its most limiting element \u2014 conductor, terminal equipment, or relay \u2014 and that basis has to be documented."),
 'FAC-011-4': ("Requires the Reliability Coordinator to have a documented methodology for how System Operating Limits are determined for the operations horizon.",
   "How your area arrives at a given path's SOL comes from this written methodology, not from an individual operator's judgment."),
 'FAC-014-3': ("Requires SOLs (and IROLs) to actually be established using that methodology and communicated to the people and systems that need them.",
   "The SOL values your EMS alarms against were established and distributed under this standard."),
 'FAC-501-WECC-4': ("Requires Transmission Owners of major WECC transfer paths to maintain, annually update, and follow a Transmission Maintenance and Inspection Plan for those paths.",
   "A WECC major path owner documents its inspection cycle and then demonstrates it actually followed it."),
 # ---- INT ----
 'INT-006-5': ("Requires a reliability assessment of each Arranged Interchange before it is implemented \u2014 checking the deal before it becomes flow.",
   "A proposed transaction is screened for reliability impact before it is confirmed and ramped."),
 'INT-009-3': ("Requires Balancing Authorities to actually implement Interchange as it was confirmed, so what was agreed is what gets ramped.",
   "Both BAs ramp the same MW over the same window; a mismatch shows up as inadvertent interchange."),
 # ---- IRO ----
 'IRO-001-4': ("Establishes the Reliability Coordinator's authority to act or to direct others to act \u2014 and the obligation of those entities either to comply or to tell the RC immediately that they cannot.",
   "The RC directs a TOP to reduce a transfer; the TOP either does it or informs the RC right away that it is unable."),
 'IRO-002-7': ("Requires the RC to have the monitoring, alarming, and analysis capability \u2014 and the data behind it \u2014 to actually see its wide area.",
   "RC monitoring tools must include alarm capability, with backup so awareness is not lost if the primary fails."),
 'IRO-006-5': ("The continent-level coordination rules for Transmission Loading Relief \u2014 curtailing interchange to relieve an actual or potential SOL or IROL exceedance.",
   "When a flowgate is overloading, TLR is the coordinated procedure that unwinds the transactions contributing to it."),
 'IRO-006-EAST-2': ("The Eastern Interconnection's specific TLR procedure, coordinating action among Eastern RCs.",
   "An Eastern RC calling TLR follows this regional procedure so neighboring RCs respond consistently."),
 'IRO-006-WECC-3': ("The Western equivalent, addressing unscheduled (loop) flow on Qualified Paths in real time.",
   "Unscheduled flow crowding a qualified path gets mitigated under this procedure rather than by ad-hoc action."),
 'IRO-008-3': ("Requires the RC to perform Operational Planning Analyses and Real-time Assessments \u2014 looking ahead and looking now \u2014 to catch instability, uncontrolled separation, or Cascading before it happens.",
   "Real-time Assessments are performed at least every 30 minutes, so a developing problem cannot sit unseen."),
 'IRO-009-2': ("Requires the RC to have pre-planned actions ready and to act to prevent or resolve IROL exceedances within the IROL's time limit.",
   "A projected IROL exceedance has a prepared action set to bring it back inside its Tv, often 30 minutes."),
 'IRO-010-5': ("Requires the RC to specify the data and information it needs, and obligates others to provide it in the required format and timing.",
   "The data your TOP sends the RC is not optional courtesy \u2014 it is specified and mandatory under this standard."),
 'IRO-010-6': ("The next revision of the RC data specification requirement, already approved with a future effective date.",
   "Same purpose; note the later effective date before assuming which version applies."),
 'IRO-014-3': ("Requires Reliability Coordinators to coordinate with one another so one RC's actions do not damage a neighboring RC Area.",
   "Neighboring RCs share plans and agree on actions before making a change with cross-border impact."),
 'IRO-017-1': ("Requires outages to be properly coordinated in the operations planning and near-term planning horizons \u2014 not discovered in real time.",
   "A planned line outage is studied and coordinated with the RC before it is approved and taken."),
 'IRO-018-1(i)': ("Sets requirements for the RC's real-time monitoring and analysis capability, including monitoring the alarm process itself and checking data quality.",
   "If your alarm processor quietly stops updating, this standard is the reason something is watching for that."),
 # ---- MOD ----
 'MOD-025-2': ("Requires verifying and reporting what generators and synchronous condensers can actually produce \u2014 real and reactive \u2014 so planning models reflect the real machines.",
   "A unit's claimed MVAR capability is proven by test rather than carried forward from a nameplate assumption."),
 'MOD-026-2': ("Requires verifying that dynamic models and their parameters match the equipment actually in service, including generators, dynamic reactive resources, and HVDC.",
   "If a model says a unit rides through a dip but the real machine trips, studies built on it are worthless."),
 'MOD-031-3': ("Provides the authority to collect Demand, energy, and related data for reliability studies, and spells out who must ask and who must answer.",
   "A planner requesting load forecast data has a defined right to it and the respondent has a defined obligation."),
 'MOD-032-1': ("Sets consistent modeling data requirements and reporting procedures so planning cases can actually be built for the Interconnection.",
   "Everyone submits data in a common specification, so the regional model is not a patchwork of formats."),
 'MOD-032-2': ("The next revision of the modeling data requirements, approved with a future effective date.",
   "Same purpose; check which version is in force for the period you are working in."),
 'MOD-033-3': ("Establishes a process for validating system models against actual system behavior, so model accuracy is achieved and maintained.",
   "A recorded disturbance is compared against the model's prediction; large mismatches drive model corrections."),
 # ---- NUC ----
 'NUC-001-4': ("Requires coordination between Nuclear Plant Generator Operators and transmission entities so the grid supports safe nuclear operation and shutdown.",
   "Nuclear Plant Interface Requirements tell the TOP exactly what offsite power conditions the plant depends on."),
 # ---- PER ----
 'PER-003-2': ("Requires system operators filling real-time RC, BA, and TOP positions to hold the appropriate NERC certification. This is the standard behind the exam you are studying for.",
   "A real-time TOP desk must be staffed by someone holding a valid NERC certificate at the required level."),
 'PER-005-2': ("Requires a systematic approach to training for personnel who perform or support real-time operations \u2014 including simulation and emergency training.",
   "Operators train on realistic restoration and emergency scenarios, not just classroom material."),
 'PER-006-1': ("Requires specific training on a defined set of reliability-critical topics for personnel supporting real-time operations.",
   "Support staff whose work affects real-time reliability get targeted training, not just the operators themselves."),
 # ---- PRC ----
 'PRC-002-5': ("Requires enough recording capability \u2014 sequence of events, fault recording, dynamic disturbance recording \u2014 that a disturbance can actually be reconstructed afterward.",
   "After a major event, investigators need to know what opened, in what order, and to the millisecond."),
 'PRC-004-6': ("Requires Protection System Misoperations to be identified, analyzed, and corrected \u2014 protection that acts wrongly is itself a reliability risk.",
   "A relay that trips a healthy line must be investigated and put under a corrective action plan."),
 'PRC-005-6': ("Requires documented maintenance programs \u2014 and evidence you followed them \u2014 for Protection Systems, Automatic Reclosing, and Sudden Pressure Relaying.",
   "A relay with a defined maintenance interval must be tested inside that interval and the record kept."),
 'PRC-006-5': ("Sets design and documentation requirements for automatic underfrequency load shedding \u2014 the last-resort scheme that sheds load in blocks to arrest a collapsing frequency.",
   "UFLS relays drop preset blocks of load at defined frequency thresholds, buying the system a chance to survive."),
 'PRC-006-NPCC-2': ("The Northeast Power Coordinating Council's UFLS program requirements, more stringent and more specific than the continent-wide standard.",
   "An NPCC entity designs its UFLS to the regional performance requirements on top of PRC-006."),
 'PRC-006-SERC-03': ("SERC's regional requirements for designing, implementing, and analyzing automatic UFLS programs consistently across the region.",
   "SERC entities coordinate UFLS design so blocks and thresholds line up across neighboring systems."),
 'PRC-008-0': ("Requires implementing and documenting a maintenance program for the UFLS equipment itself \u2014 a last-resort scheme is worthless if its relays have not been maintained.",
   "The UFLS relays that are supposed to save the system are themselves on a tested maintenance cycle."),
 'PRC-010-2': ("Establishes an integrated approach to designing, evaluating, and operating Undervoltage Load Shedding programs \u2014 the voltage-side equivalent of UFLS.",
   "UVLS sheds load when voltage sags persistently, as a backstop against voltage collapse."),
 'PRC-011-0': ("Requires maintenance and testing of UVLS systems so the voltage-collapse backstop actually operates when called.",
   "UVLS relays and their sensing are tested on a defined cycle, not assumed functional."),
 'PRC-012-2': ("Requires Remedial Action Schemes to be reviewed and approved so an automatic scheme does not itself introduce an unacceptable reliability risk.",
   "A RAS that trips generation to solve one problem gets reviewed to be sure it does not create a worse one."),
 'PRC-017-1': ("Requires RAS to be properly designed, coordinated with other protection, maintained and tested, with misoperations analyzed and corrected.",
   "A RAS is periodically tested end to end, and any incorrect operation is investigated."),
 'PRC-019-2': ("Requires a generator's voltage regulating controls, limiters, equipment capability, and protection settings to actually agree with one another.",
   "The under-excitation limiter should act to hold the machine inside its capability before the protective relay trips it offline."),
 'PRC-023-6': ("Requires that protective relay settings not limit transmission loadability \u2014 protection must catch faults without tripping healthy lines on heavy load, when operators need those lines most.",
   "Zone 3 relay settings tripping on heavy load rather than a fault contributed to the 2003 blackout; this standard targets exactly that."),
 'PRC-024-3': ("Requires generating resources to be set so they ride through defined frequency and voltage excursions instead of tripping off precisely when the system needs them.",
   "During a frequency dip, generation that trips on its own protection turns a disturbance into a much larger event."),
 'PRC-024-4': ("The next revision, narrowed to synchronous generators, Type 1 and Type 2 wind, and synchronous condensers, with inverter-based resources moving to their own standards.",
   "Approved with a future effective date \u2014 note which resource types it now covers."),
 'PRC-025-2': ("Requires load-responsive relays at generating facilities to be set so units are not tripped unnecessarily during system disturbances that pose no damage risk.",
   "A generator should not trip on a swing its equipment could comfortably survive."),
 'PRC-026-2': ("Requires load-responsive protective relays not to trip during stable power swings \u2014 the system oscillates and recovers, and protection should not turn that into a loss.",
   "A stable swing following a fault clearance should ride through, not cascade into tripped elements."),
 'PRC-027-1': ("Requires Protection Systems on BES Elements to stay coordinated so they operate in the intended sequence during faults.",
   "The relay closest to the fault should clear it first; backup protection should wait its turn."),
 'PRC-028-1': ("Requires adequate disturbance monitoring data from inverter-based resources, so their ride-through behaviour can be evaluated and their models validated.",
   "After a disturbance, solar and wind plant behaviour can be examined with real recorded data instead of inference."),
 'PRC-029-1': ("New ride-through requirements written specifically for inverter-based resources, after repeated events where large volumes of IBR disconnected for disturbances they should have ridden through.",
   "Approved with a future effective date; a direct response to widespread solar loss during grid faults."),
 'PRC-030-1': ("Requires unexpected changes in inverter-based resource output to be identified, analyzed, and mitigated.",
   "An IBR plant that reduces output unexpectedly during a disturbance gets investigated and corrected."),
 # ---- TOP ----
 'TOP-001-6': ("The core Transmission Operations standard: act \u2014 and have the authority to act \u2014 to prevent instability, uncontrolled separation, and Cascading, including operating within SOLs and IROLs and following RC direction.",
   "Recognizing an IROL exceedance and taking action inside its time limit is this standard in practice."),
 'TOP-002-5': ("Requires TOPs and BAs to have plans for operating within limits \u2014 next-day and current-day planning, studies, and outage coordination.",
   "The day-ahead study that tells you tomorrow's constraints exists because of this standard."),
 'TOP-003-6.1': ("Requires each TOP and BA to specify the data it needs to plan, monitor, and assess its area \u2014 and obligates others to supply it.",
   "Your data specification tells generators and neighbors exactly what to send you and how often."),
 'TOP-003-7': ("The next revision of the TOP/BA data specification requirement, approved with a future effective date.",
   "Same purpose; confirm which version governs the period you are working in."),
 'TOP-003-8': ("A further revision of the same data specification requirement, effective later still.",
   "Two future versions are queued \u2014 worth tracking which applies when."),
 'TOP-010-1(i)': ("Sets requirements for real-time monitoring and analysis capability for TOPs and BAs, including monitoring the alarm process and checking data quality.",
   "Bad telemetry that quietly feeds your state estimator is the risk this standard is written against."),
 # ---- TPL ----
 'TPL-001-5.1': ("Sets the performance requirements the transmission system must meet in planning studies across a broad range of conditions and probable contingencies.",
   "Planners test the future system against defined contingency categories and required performance."),
 'TPL-007-4': ("Sets planning requirements for how the transmission system must perform during geomagnetic disturbance events.",
   "Transformers are assessed for GMD-driven effects so a severe solar storm does not find the system unprepared."),
 'TPL-008-1': ("Sets planning performance requirements for extreme heat and extreme cold temperature events.",
   "A newer standard driven by extreme weather events that stressed systems far beyond historical planning assumptions."),
 # ---- VAR ----
 'VAR-001-5': ("Requires voltage levels, reactive flows, and reactive resources to be monitored, controlled, and kept within limits in real time \u2014 including issuing voltage schedules.",
   "The voltage schedule your TOP issues to a generator comes from this standard."),
 'VAR-002-4.1': ("Requires generators to actually hold the voltage schedule they are given and to run their automatic voltage regulator in automatic voltage control mode.",
   "A GOP must notify the TOP promptly when an AVR is taken out of service, because the voltage schedule can no longer be held."),
 'VAR-501-WECC-4': ("WECC-specific performance criteria for power system stabilizers, which damp the oscillations a large interconnected system can develop.",
   "A Western unit's PSS must meet regional performance criteria so inter-area oscillations stay damped."),
}


def clean(s):
    if s is None:
        return ''
    s = str(s).replace('_x000D_', ' ').replace('\u00a0', ' ')
    return ' '.join(s.split()).strip()


def datestr(v):
    if pd.isna(v):
        return None
    try:
        return pd.Timestamp(v).strftime('%Y-%m-%d')
    except Exception:
        return None


def main():
    df = pd.read_excel(SRC)
    df = df[df['Status'].isin(KEEP)].copy()

    cards, missing = [], []
    for _, r in df.iterrows():
        num = clean(r['Standard Number'])
        fam = num.split('-')[0]
        ex = EXPLAIN.get(num)
        if not ex:
            missing.append(num)
            continue
        cards.append({
            'num': num,
            'fam': fam,
            'title': clean(r['Standard Title']),
            'purpose': clean(r['Purpose']),
            'status': STATUS_KEY[r['Status']],
            'effective': datestr(r['Effective Date of Standard']),
            'plain': ex[0],
            'example': ex[1],
        })

    stale = [k for k in EXPLAIN if k not in set(df['Standard Number'].map(clean))]

    # provenance: newest regulatory action in the sheet + when the file was saved
    latest = max([d for d in [df['Filing Date of Standard'].max(),
                              df['Board Adopted Date'].max(),
                              df['Regulatory Order Effective Date'].max()] if not pd.isna(d)])
    meta = {
        'sourceFile': os.path.basename(SRC),
        'exportSaved': datetime.date.fromtimestamp(os.path.getmtime(SRC)).isoformat(),
        'latestAction': pd.Timestamp(latest).strftime('%Y-%m-%d'),
        'generated': datetime.date.today().isoformat(),
        'counts': {k: sum(1 for c in cards if c['status'] == k)
                   for k in ['mandatory', 'future', 'pending']},
    }

    payload = {'meta': meta, 'cards': cards}
    body = json.dumps(payload, ensure_ascii=False, indent=1)
    js = ('/* data.stdcards.js — GENERATED by build-stdcards.py. Do not hand-edit.\n'
          '   Standard number, title, purpose, status and dates are verbatim from the\n'
          '   NERC One Stop Shop export; plain-language text and examples are authored\n'
          '   in the generator. Re-run the generator against a fresh export to update. */\n'
          'window.NERC = window.NERC || {};\n'
          'window.NERC.stdCards = ' + body + ';\n')
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(js)

    print('wrote', OUT)
    print('cards:', len(cards), meta['counts'])
    print('export saved:', meta['exportSaved'], '| latest action in data:', meta['latestAction'])
    if missing:
        print('!! NO EXPLANATION AUTHORED for', len(missing), 'standard(s):', ', '.join(missing))
    if stale:
        print('!! authored but no longer in the sheet:', ', '.join(stale))
    if not missing and not stale:
        print('coverage: every standard in the sheet has an authored explanation')


if __name__ == '__main__':
    main()
