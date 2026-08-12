/* ============================================================================
   VIDEO DATA  —  window.NERC.videos  +  window.NERC.videosBySection

   Curated YouTube link-outs that reinforce specific lessons. Videos open in a
   new tab (the console stays fully offline; nothing is embedded/streamed here).

   videos:            id -> { url, title, duration, channel?, why }
   videosBySection:   sectionId -> [ videoId, ... ]   (engine renders a
                      "Related videos" group at the end of that section)

   To add/replace: add the video object here and list its id under the right
   section. `why` is an original one-line note on how the video helps.

   NOTE: links and their accuracy are curated by the user; they can't be verified
   from inside the app. If a video is pulled from YouTube it will simply 404 on
   click \u2014 swap the url here to fix.
   ========================================================================== */
window.NERC = window.NERC || {};

window.NERC.videos = {
  "v-transmission-examprep": {
    url: "https://www.youtube.com/watch?v=k_GYi3O1YWU",
    title: "NERC Test Prep \u2014 Transmission", duration: "16:24", channel: "Perspectives on Energy",
    why: "A walkthrough of sample Transmission Operator exam questions \u2014 a preview of the question style and difficulty, tied to real transmission-operations topics." },

  "v-grid101": {
    url: "https://www.youtube.com/watch?v=nbPmsBmo03Y",
    title: "Electrical Grid 101 (with quiz)", duration: "3:46",
    why: "A fast visual tour of generation, transmission, and distribution \u2014 reinforces the anatomy of the grid, with a short built-in quiz." },

  "v-electricity-delivery": {
    url: "https://www.youtube.com/watch?v=xhxo2oXRiio",
    title: "How Electricity Gets to You", duration: "17:28",
    why: "Follows power from the plant to your home, step-up through step-down \u2014 a longer companion to the grid-anatomy overview." },

  "v-volts-ohms-amps": {
    url: "https://www.youtube.com/watch?v=zYS9kdS56l8",
    title: "What are Volts, Ohms & Amps?", duration: "8:43",
    why: "A plain-language explainer of the base electrical quantities that underpin every unit introduced in this section." },

  "v-electricity-visual": {
    url: "https://www.youtube.com/watch?v=3KePcASD0NQ",
    title: "How Electricity Works \u2014 for visual learners", duration: "18:34",
    why: "A visual deep-dive into what electricity really is \u2014 current, voltage, and fields \u2014 solid grounding before the operator-level material." },

  "v-threephase": {
    url: "https://www.youtube.com/watch?v=iMn7dq7B1oo",
    title: "Three-Phase Power Explained", duration: "9:57",
    why: "How three-phase AC actually works \u2014 the form of power the grid runs on \u2014 giving physical intuition behind the AC fundamentals here." },

  "v-power-factor": {
    url: "https://www.youtube.com/watch?v=NIrKOVZrqnU",
    title: "Power Factor Explained (Reactive Power)", duration: "16:18",
    why: "A thorough explainer of power factor and reactive vs. real vs. apparent power \u2014 directly reinforces the power-triangle thinking in this section." },

  "v-ac-generator-basics": {
    url: "https://www.youtube.com/watch?v=WhATjUHgzxQ",
    title: "AC Electrical Generator Basics", duration: "5:55",
    why: "Shows how magnets and coils generate AC (and three-phase) power \u2014 connects the generation side to the balance you're studying." },

  "v-generator-acdc": {
    url: "https://www.youtube.com/watch?v=AWpOdWROBuI",
    title: "How a Generator Works \u2014 AC and DC", duration: "5:39",
    why: "A model-and-animation look at how generators produce AC and DC \u2014 reinforces what's actually behind 'generation' in the balance equation." },

  "v-motor-generator-compare": {
    url: "https://www.youtube.com/watch?v=dlkiHJW73dI",
    title: "Motors vs Generators \u2014 compared", duration: "\u2014",
    why: "Contrasts the motor effect with induction \u2014 the same machine run two ways \u2014 reinforcing what actually makes a generator produce power. Curated from the Physics High generators lesson. (Verify the exact title/length before relying on it.)" },

  "v-bal-standards": {
    url: "https://www.youtube.com/watch?v=DqxtgBLhn2w",
    title: "Explaining NERC | The BAL Standards", duration: "2:34", channel: "Certrec",
    why: "A short tour of the BAL standards governing balance, frequency response, and control performance \u2014 the rules behind ACE and AGC." },

  "v-com-standards": {
    url: "https://www.youtube.com/watch?v=SmsBpmjaryA",
    title: "Explaining NERC | The COM Standards", duration: "1:05", channel: "Certrec",
    why: "A one-minute overview of the COM standards (COM-001/002) behind three-part communication and reliable operator comms." },

  "v-top-standards": {
    url: "https://www.youtube.com/watch?v=Iel5hWQjS5Y",
    title: "Explaining NERC | The TOP Standards", duration: "2:12", channel: "Certrec",
    why: "Breaks down the TOP standards (TOP-001/002/003/010) that define your core transmission-operations obligations." },

  "v-fac-standards": {
    url: "https://www.youtube.com/watch?v=b58_8fqrFB8",
    title: "Explaining NERC | The FAC Standards", duration: "2:51", channel: "Certrec",
    why: "Explains the FAC standards behind facility ratings and the SOL methodology \u2014 where your operating limits come from." },

  "v-prc-standards": {
    url: "https://www.youtube.com/watch?v=M0HG1Evqpnw",
    title: "Explaining NERC | The PRC Standards", duration: "5:01", channel: "Certrec",
    why: "A tour of the PRC protection-and-control standards \u2014 disturbance monitoring, misoperations, maintenance, and load shedding covered in this module." },

  "v-per-standards": {
    url: "https://www.youtube.com/watch?v=v-PyJG2z9jg",
    title: "Explaining NERC | The PER Standards", duration: "1:16", channel: "Certrec",
    why: "Covers the PER standards on operator credentials and training \u2014 context on the certification you're working toward. (Not itself a TO exam family.)" },

  "v-cip-standards": {
    url: "https://www.youtube.com/watch?v=OECHUpEYceo",
    title: "Understanding NERC's CIP Standards", duration: "6:06", channel: "Certrec",
    why: "An overview of the CIP (cyber security) standards \u2014 broader NERC context. Note: CIP is not part of the TO exam content, but useful awareness." },

  "v-distribution-system": {
    url: "https://www.youtube.com/watch?v=Fqk0G1yDjeY",
    title: "The Electrical Distribution System", duration: "12:34",
    why: "Focuses on the distribution system that carries power the last stretch to customers \u2014 the step-down end of the grid-anatomy picture." },

  "v-power-grid-work": {
    url: "https://www.youtube.com/watch?v=v1BMWczn7JM",
    title: "How Does the Power Grid Work?", duration: "10:24",
    why: "A concise overview of how generation, transmission, and distribution fit together \u2014 a big-picture companion to the grid-anatomy walkthrough." },

  "v-nerc-101": {
    url: "https://www.youtube.com/watch?v=9-eOaCZ-39Q",
    title: "NERC 101", duration: "5:11",
    why: "A short primer on what NERC is and does \u2014 orients you to the reliability organization behind every standard in this course." },

  "v-what-is-cip": {
    url: "https://www.youtube.com/watch?v=m1EQ0Ei8mF0",
    title: "What is NERC CIP?", duration: "3:15",
    why: "A quick plain-language answer to 'what is CIP?' \u2014 cyber-security context alongside the standards overview. (CIP is not part of the TO exam.)" },

  "v-markets-basics": {
    url: "https://www.youtube.com/watch?v=iiEEJKHkhUU",
    title: "Mastering Electricity Markets Basics", duration: "16:53",
    why: "Walks through demand, supply, and pricing in electricity markets \u2014 the economics behind the interchange schedules operators must honor." },

  "v-markets-101": {
    url: "https://www.youtube.com/watch?v=PSbbsZnxWEQ",
    title: "Electricity Markets 101 \u2014 Energy Basics", duration: "15:06",
    why: "An energy-market primer covering supply, demand, and renewables \u2014 reinforces what the market and service entities (PSE, LSE, TSP) actually do." },

  "v-scada": {
    url: "https://www.youtube.com/watch?v=WQWJzgbdq1E",
    title: "SCADA Systems for the Electric Power Industry", duration: "4:43",
    why: "Explains SCADA in the power industry \u2014 the telemetry-and-control backbone that feeds operators their real-time data." }
};

window.NERC.videosBySection = {
  "f-grid-anatomy":        ["v-grid101", "v-electricity-delivery", "v-power-grid-work", "v-distribution-system"],
  "f-units":               ["v-volts-ohms-amps", "v-electricity-visual"],
  "f-ac-basics":           ["v-threephase"],
  "f-power-in-practice":   ["v-power-factor"],
  "f-reliability-landscape":["v-nerc-101"],
  "f-key-players":         ["v-markets-101"],
  "m1-monitoring":         ["v-transmission-examprep"],
  "m3-sol-irol":           ["v-fac-standards"],
  "m4-relaying":           ["v-prc-standards"],
  "m7-three-part":         ["v-com-standards"],
  "m7-telemetry-equip":    ["v-scada"],
  "m8-how-standards-work": ["v-per-standards", "v-cip-standards", "v-what-is-cip"],
  "m8-operations-families":["v-top-standards"],
  "m9-generation-sources": ["v-ac-generator-basics", "v-generator-acdc", "v-motor-generator-compare"],
  "m9-agc-ace":            ["v-bal-standards"],
  "m9-reserves-interchange":["v-markets-basics"]
};
