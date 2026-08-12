#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');let failures=0,passes=0;
function pass(m){passes++;console.log('PASS  '+m)}function fail(m){failures++;console.error('FAIL  '+m)}function check(c,m){c?pass(m):fail(m)}function read(r){return fs.readFileSync(path.join(root,r),'utf8')}
const context={window:{NERC:{}}};context.window.window=context.window;vm.createContext(context);
const dataFiles=['js/data.glossary.js','js/data.content.js','js/data.questions.js','js/data.standards.js','js/data.stdcards.js','js/data.blueprint.js','js/data.videos.js','js/data.release.js','js/data.phase2.js','js/data.phase3.js','js/data.remediation.js'];
for(const rel of dataFiles){try{vm.runInContext(read(rel),context,{filename:rel});pass(rel+' loads')}catch(e){fail(rel+' loads: '+e.message)}}
const N=context.window.NERC,Q=N.questions||[],C=N.content||[],G=N.glossary||[],M=JSON.parse(read('release-manifest.json'));
const sections=C.flatMap(m=>(m.sections||[]).map(s=>({...s,moduleId:m.id}))),sectionIds=new Set(sections.map(s=>s.id)),moduleIds=new Set(C.map(m=>m.id));
check(Q.length===M.questionCount,`question count is ${M.questionCount}`);check(C.length===M.moduleCount,`module count is ${M.moduleCount}`);check(sections.length===M.sectionCount,`section count is ${M.sectionCount}`);check(G.length===M.glossaryCount,`glossary count is ${M.glossaryCount}`);
function dups(a){const s=new Set(),d=new Set();a.forEach(x=>s.has(x)?d.add(x):s.add(x));return [...d]}
check(!dups(C.map(x=>x.id)).length,'module IDs are unique');check(!dups(sections.map(x=>x.id)).length,'section IDs are unique');check(!dups(Q.map(x=>x.id)).length,'question IDs are unique');check(!dups(G.map(x=>x.id)).length,'glossary IDs are unique');
const topicDomain=new Map();for(const d of N.blueprintTO||[])for(const t of d.topics||[])topicDomain.set(t.id,d.id);
let shape=true;for(const q of Q){if(!q.id||!moduleIds.has(q.module)||!sectionIds.has(q.section)||topicDomain.get(q.topic)!==q.domain||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||!q.stem||!q.explain||!['recall','application','analysis'].includes(q.difficulty)){shape=false;console.error('      Invalid question:',q.id)}}check(shape,'every question has valid structure and internal links');
const pos=[0,0,0,0];Q.forEach(q=>pos[q.answer]++);check(pos.every(n=>n===Q.length/4),`authored answers are balanced A-D (${pos.join('/')})`);

/* Assessment-cue and feedback gates. */
const visible=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
let keyLongest=0,maxAdv=-Infinity,feedbackCovered=0,feedbackNone=0;const keyRanks=[0,0,0,0];
for(const q of Q){const lens=q.options.map(x=>visible(x).length),key=lens[q.answer],d=lens.filter((_,i)=>i!==q.answer),mean=d.reduce((a,b)=>a+b,0)/3,adv=key-mean,max=Math.max(...lens);if(key===max)keyLongest++;maxAdv=Math.max(maxAdv,adv);keyRanks[lens.filter(x=>x>key).length]++;let n=0;for(let i=0;i<4;i++)if(i!==q.answer&&q.optFeedback&&String(q.optFeedback[i]??q.optFeedback[String(i)]??'').trim()){feedbackCovered++;n++;}if(!n)feedbackNone++;}
const longestRate=keyLongest/Q.length,feedbackRate=feedbackCovered/(Q.length*3);
check(longestRate<=.35,`correct choice is longest in ${(longestRate*100).toFixed(1)}% of items (gate ≤35%)`);
check(maxAdv<=15,`maximum key advantage is ${maxAdv.toFixed(1)} characters (gate ≤15)`);
check(Math.max(...keyRanks)-Math.min(...keyRanks)<=1,`correct-choice length ranks are balanced (${keyRanks.join('/')})`);
check(feedbackRate>=.90,`distractor feedback coverage is ${(feedbackRate*100).toFixed(1)}% (gate ≥90%)`);
check(feedbackNone===0,'zero questions lack all distractor feedback');

const topicCounts={};Q.forEach(q=>topicCounts[q.topic]=(topicCounts[q.topic]||0)+1);
check([...topicDomain.keys()].every(id=>(topicCounts[id]||0)>=6),'every blueprint subtopic has at least six questions');
for(const [cred,bp] of Object.entries(N.blueprints||{})){let enough=true,total=0;for(const d of bp)for(const t of d.topics){total+=t.target;if((topicCounts[t.id]||0)<t.target){enough=false;console.error(`      ${cred} shortage ${t.id}`)}}check(enough,`${N.credentials[cred].designation} has sufficient inventory for every subtopic`);check(total===N.credentials[cred].scored,`${N.credentials[cred].designation} blueprint totals ${total}`);check(Q.length-total>=20,`${N.credentials[cred].designation} has at least 20 disjoint experimental-style items available`)}

const standards=new Set();for(const f of N.standards||[])for(const s of f.standards||[])standards.add(s.num);
const usedStandards=new Set(Q.filter(q=>q.std).map(q=>q.std));
check(!Q.some(q=>q.std&&!standards.has(q.std)),'100% of question standard references resolve');
pass(`${[...standards].filter(x=>!usedStandards.has(x)).length} reference standards currently carry zero questions (reported, not failed)`);
const glossaryIds=new Set(G.map(g=>g.id)),contentText=JSON.stringify(C),tokens=[...contentText.matchAll(/\{\{([a-z0-9-]+)(?:\|[^}]*)?\}\}/g)].map(m=>m[1]);check(!tokens.some(id=>!glossaryIds.has(id)),'all lesson glossary tokens resolve');check(!G.some(g=>g.moduleRef&&!sectionIds.has(g.moduleRef)),'glossary lesson links resolve');
check(N.credentials.bit.designation==='BT','official BT designation is used');check(Object.values(N.blueprints).every(Boolean),'all four credential blueprints are active');check(N.release&&N.release.version===M.version,'release metadata matches manifest version');check(N.remediation&&N.remediation.addedQuestions===16,'v3.2 remediation metadata and 16-question expansion are present');

const phase2Sections=['f-human-performance','m1-ems-data-quality','m2-control-devices','m3-ratings-to-action','m4-event-reconstruction','m5-operating-plan-tabletop','m6-restoration-constraints','m7-directives-fallback','m8-interchange-recovery'];check(phase2Sections.every(id=>sectionIds.has(id)),'all Phase 2 operational sections remain present');check(Q.filter(q=>/^q-p2-/.test(q.id)).length===32,'Phase 2 question expansion remains intact');check(Q.filter(q=>/^q-r32-/.test(q.id)).length===16,'all 16 v3.2 subtopic-floor questions are present');
const topics=[...topicDomain.keys()],mis=N.misconceptions||{};check(topics.length===31,'official blueprint contains 31 subtopics');check(topics.every(id=>mis[id]&&mis[id].id&&mis[id].label&&Array.isArray(mis[id].sections)),'misconception catalogue covers all 31 subtopics');check(topics.every(id=>mis[id].sections.every(s=>sectionIds.has(s))),'all misconception lesson links resolve');
const events=N.events||[];check(events.length===3,'three integrated operating events are present');check(!dups(events.map(e=>e.id)).length,'integrated event IDs are unique');let eventShape=true;for(const e of events){const stepIds=new Set((e.steps||[]).map(s=>s.id));if(!stepIds.has(e.startStep)||!e.steps.length||!e.reviewSections.every(s=>sectionIds.has(s)))eventShape=false;for(const s of e.steps||[]){if(!s.prompt||!Array.isArray(s.options)||s.options.length<2)eventShape=false;for(const o of s.options){if(!o.text||!o.feedback||(!stepIds.has(o.next)&&o.next!=='complete'))eventShape=false}}}check(eventShape,'integrated events have valid branches, feedback, and lesson links');

const app=read('js/app.js');
check(/q\.topic\s*===\s*topic\.id/.test(app),'mock engine samples scored items by exact subtopic');check(app.includes('drawExperimental(scored,EXPERIMENTAL_COUNT)'),'test-day mode draws experimental-style items outside the scored draw');check(app.includes('scoreExam(ex,scored)')&&app.includes('experimentalIds'),'scored and experimental-style results are separated');check(app.includes('adaptiveRecommendations')&&app.includes('adaptiveQuestionSet'),'adaptive remediation engine is present');check(app.includes("schema:'nerc-study-console-progress'")&&app.includes('importBundle'),'progress export/import uses a versioned schema');check(app.includes('analyticsEnabled')&&app.includes('if (!st.analyticsEnabled) return'),'local analytics are opt-in');check(app.includes('applyPreferences')&&app.includes('data-contrast'),'accessibility preferences are applied');check(app.includes('examKeyHandler'),'exam keyboard shortcuts are present');
check(app.includes('confidenceWeight')&&app.includes('data-confidence="guessed"'),'confidence rating influences adaptive mastery');
check(app.includes('Section " + (idx + 1) + " of " + m.sections.length'),'section-level position is shown');
check(app.includes('GLOSSARY.forEach')&&app.includes('NERC.standards || []')&&app.includes('Glossary and standards'),'global search indexes glossary and standards');
check(app.includes('ensureSvgDescriptions')&&app.includes('enhanceRangeAccessibility'),'runtime SVG descriptions and meaningful range values are enforced');
check(app.includes('document.title=(pageHeading'),'route-specific document titles are assigned');
check(app.includes('warnings.five')&&app.includes('warnings.one')&&app.includes('Five minutes remain')&&app.includes('One minute remains'),'exam timer has non-color five-minute and one-minute announcements');
check(app.includes('sittingHeuristic')&&app.includes('85%+ on two consecutive full mocks'),'stated study-console sitting heuristic is present and caveated');

const idx=read('index.html');check(idx.includes('class="c-skip"')&&idx.includes('id="live-status"')&&idx.includes('id="main-content"'),'skip link, live region, and focus target are present');check(idx.includes('js/data.remediation.js'),'v3.2 remediation data extension is loaded');check(!idx.includes('data.comics.js')&&!fs.existsSync(path.join(root,'js/data.comics.js'))&&!fs.existsSync(path.join(root,'assets/comics')),'comic data and image assets are absent');check(!app.includes('renderComic')&&!app.includes('b.t === "comic"')&&!read('css/console.css').includes('.c-comic'),'comic renderer, content branch, and styles are absent');check(!sections.some(s=>/comic-recap/.test(s.id)),'module structure contains no comic recap sections');
const interactiveScripts=[...idx.matchAll(/js\/interactives\/([^\"]+)\.js/g)].map(m=>m[1]);check(interactiveScripts.length===M.interactiveCount,`lesson interactive count is ${M.interactiveCount}`);for(const n of ['equipmentPrimer','reactiveSourcesBoard','voltageProfile','relayCoordination','gicPath'])check(interactiveScripts.includes(n),`${n} visual is loaded`);

const css=read('css/console.css');check(/\.c-video__chan\s*\{[^}]*color:\s*var\(--readout-dim\)/s.test(css),'external-video metadata uses readable contrast');check(css.includes('.p3-az__btn')&&css.includes('.c-gitem__link'),'glossary A-Z and touch-target styles are present');
const docs=['README.txt','HANDOFF.md','PHASES_AND_RELEASE_NOTES.md','PHASE3_RELEASE_NOTES.md','PHASE3_IMPLEMENTATION_SUMMARY.md','V3.2_REMEDIATION_REPORT.md','SME_REVIEW_PACKET.md'].filter(f=>fs.existsSync(path.join(root,f))).map(read).join('\n');check(!/\bBIT\b/.test(docs),'documentation uses BT rather than BIT');check(docs.includes(String(M.questionCount)),'documentation includes current question count');check(docs.includes('experimental-style'),'documentation distinguishes experimental-style study items');check(docs.includes('length cue')||docs.includes('answer-length'),'documentation records answer-length remediation');
console.log(`\n${passes} checks passed; ${failures} failed.`);process.exit(failures?1:0);
