#!/usr/bin/env python3
"""Focused browser QA for the v3.2 pre-SME remediation release."""
from __future__ import annotations
import json,re,sys
from pathlib import Path
from playwright.sync_api import Page,sync_playwright
ROOT=Path(__file__).resolve().parents[1]
RESULTS=ROOT/'browser-v32-qa-results.txt'; SHOTS=ROOT/'qa-screenshots';SHOTS.mkdir(exist_ok=True)
INDEX=(ROOT/'index.html').read_text();CSS=(ROOT/'css/console.css').read_text();SCRIPTS=re.findall(r'<script\s+src="([^"]+)"',INDEX)
SHELL=re.sub(r'<link\s+rel="stylesheet"\s+href="[^"]+">','',INDEX);SHELL=re.sub(r'\s*<script\s+src="[^"]+"></script>','',SHELL)
passes=[];failures=[]
def check(c,m):
    (passes if c else failures).append(m);print(('PASS  ' if c else 'FAIL  ')+m,file=sys.stdout if c else sys.stderr)
def boot(page:Page,cred='to',fragment='#/',state=None,exam=None):
    page.set_content(SHELL,wait_until='load');page.add_style_tag(content=CSS)
    page.evaluate("""([credential,fragment,state,exam])=>{const values={'nerc-to-console.credential':credential};if(state)values['nerc-to-console.v1']=JSON.stringify(state);if(exam)values['nerc-to-console.exam.v3']=JSON.stringify(exam);const storage={getItem:k=>Object.prototype.hasOwnProperty.call(values,k)?values[k]:null,setItem:(k,v)=>{values[k]=String(v)},removeItem:k=>{delete values[k]},clear:()=>Object.keys(values).forEach(k=>delete values[k]),key:i=>Object.keys(values)[i]||null,get length(){return Object.keys(values).length}};Object.defineProperty(window,'localStorage',{value:storage,configurable:true});window.__qaStorage=values;location.hash=fragment;}""",[cred,fragment,state,exam])
    for rel in SCRIPTS: page.add_script_tag(content=(ROOT/rel).read_text())
    page.evaluate("document.dispatchEvent(new Event('DOMContentLoaded',{bubbles:true}))");page.wait_for_selector('#view .c-view')
def route(page:Page,fragment,title=None):
    if page.evaluate('location.hash')!=fragment: page.evaluate('f=>location.hash=f',fragment)
    else: page.evaluate("window.dispatchEvent(new HashChangeEvent('hashchange'))")
    page.wait_for_selector('#view .c-view')
    if title:page.wait_for_selector(f"h1:has-text('{title}')")
def state(page):
    raw=page.evaluate("localStorage.getItem('nerc-to-console.v1')");return json.loads(raw) if raw else {}
def ratio(rgb1,rgb2):
    def lum(c):
        vals=[]
        for x in c:
            v=x/255;vals.append(v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4)
        return .2126*vals[0]+.7152*vals[1]+.0722*vals[2]
    a,b=lum(rgb1),lum(rgb2);return (max(a,b)+.05)/(min(a,b)+.05)
def run():
  with sync_playwright() as pw:
    browser=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
    ctx=browser.new_context(viewport={'width':1440,'height':1000});page=ctx.new_page();errors=[];console=[]
    page.on('pageerror',lambda e:errors.append(str(e)));page.on('console',lambda m:console.append(m.text) if m.type=='error' else None)
    try:
      boot(page);page.wait_for_selector("h1:has-text('NERC Transmission Operator')")
      inv=page.evaluate("""()=>({q:NERC.questions.length,s:NERC.content.reduce((n,m)=>n+m.sections.length,0),g:NERC.glossary.length,i:Object.keys(NERC.interactives).length,v:NERC.release.version})""")
      check(inv=={'q':232,'s':57,'g':185,'i':35,'v':'3.2.0-remediated'},'browser loads complete v3.2 inventory')
      cue=page.evaluate(r"""()=>{let longest=0,maxAdv=-999,r=[0,0,0,0];NERC.questions.forEach(q=>{const l=q.options.map(x=>x.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().length),k=l[q.answer],d=l.filter((_,i)=>i!==q.answer),a=k-d.reduce((x,y)=>x+y,0)/3;if(k===Math.max(...l))longest++;maxAdv=Math.max(maxAdv,a);r[l.filter(x=>x>k).length]++;});return{rate:longest/NERC.questions.length,maxAdv,r}}""")
      check(cue['rate']<=.35 and cue['maxAdv']<=15,'runtime answer-length gates pass')
      check(cue['r']==[58,58,58,58],'correct-answer relative length ranks are balanced')
      feedback=page.evaluate("""()=>{let cov=0,none=0;NERC.questions.forEach(q=>{let n=0;q.options.forEach((_,i)=>{if(i!==q.answer&&q.optFeedback&&q.optFeedback[i]){n++;cov++;}});if(!n)none++;});return[cov,none]}""")
      check(feedback==[696,0],'runtime bank has complete distractor feedback')
      topicmin=page.evaluate("""()=>{const c={};NERC.questions.forEach(q=>c[q.topic]=(c[q.topic]||0)+1);return Math.min(...Object.values(c))}""")
      check(topicmin>=6,'runtime bank has at least six questions per subtopic')

      # Route titles and section positioning
      home_title=page.title();route(page,'#/glossary','Glossary & acronyms');gloss_title=page.title();route(page,'#/m/transmission-ops/s/m1-equipment');sec_title=page.title()
      check(len({home_title,gloss_title,sec_title})==3,'document title changes across routes')
      ey=page.locator('#view .eyebrow').inner_text().lower();check('section ' in ey and ' of ' in ey,'section-level position is visible')

      # New visuals and accessible SVG/range semantics
      visual_routes=[
        ('#/m/transmission-ops/s/m1-equipment','Transmission equipment primer'),
        ('#/m/voltage-reactive/s/m2-reactive-sources','Reactive-source comparison board'),
        ('#/m/voltage-reactive/s/m2-voltage-schedules','Voltage schedule and profile'),
        ('#/m/protection/s/m4-relaying','Protection zones and coordination'),
        ('#/m/emergency-ops/s/m5-weather-gmd','Geomagnetic disturbance current path')]
      for frag,name in visual_routes:
        route(page,frag);check(page.locator('.c-int__title',has_text=name).count()==1,f'{name} renders')
        bad=page.evaluate("""()=>[...document.querySelectorAll('#view svg:not([aria-hidden="true"])')].filter(s=>!s.getAttribute('aria-label')&&!s.querySelector('title,desc')).length""")
        check(bad==0,f'{name} SVG has an accessible description')
        ranges=page.locator('#view input[type=range]')
        if ranges.count():check(all(ranges.nth(i).get_attribute('aria-valuetext') for i in range(ranges.count())),f'{name} ranges announce meaningful values')

      # Every lesson SVG gets a runtime description and all ranges get value text
      section_routes=page.evaluate("""()=>NERC.content.flatMap(m=>m.sections.map(s=>'#/m/'+m.id+'/s/'+s.id))""")
      svg_bad=[];range_bad=[]
      for frag in section_routes:
        route(page,frag);page.wait_for_timeout(30)
        bad_svg=page.evaluate("""()=>[...document.querySelectorAll('#view svg:not([aria-hidden="true"])')].some(s=>!s.getAttribute('aria-label')&&!s.querySelector('title,desc'))""")
        bad_range=page.evaluate("""()=>[...document.querySelectorAll('#view input[type=range]')].some(r=>!r.getAttribute('aria-valuetext'))""")
        frames=page.locator('#view iframe')
        for fi in range(frames.count()):
          handle=frames.nth(fi).element_handle();fr=handle.content_frame() if handle else None
          if fr:
            bad_svg=bad_svg or fr.evaluate("""()=>[...document.querySelectorAll('svg:not([aria-hidden="true"])')].some(s=>!s.getAttribute('aria-label')&&!s.querySelector('title,desc'))""")
            bad_range=bad_range or fr.evaluate("""()=>[...document.querySelectorAll('input[type=range]')].some(r=>!r.getAttribute('aria-valuetext'))""")
        if bad_svg:svg_bad.append(frag)
        if bad_range:range_bad.append(frag)
      check(not svg_bad,'all 57 lesson routes describe visible SVGs, including embedded labs')
      check(not range_bad,'all lesson range inputs expose aria-valuetext, including embedded labs')

      # Global search includes references
      route(page,'#/search','Search the study console');box=page.locator('#global-search');box.fill('BAAL');box.dispatch_event('input');page.wait_for_timeout(50)
      text=page.locator('#search-results').inner_text();check('glossary and standards' in text.lower() and 'baal' in text.lower(),'global search reaches glossary and standards')

      # Glossary structure, filtering and mobile tap sizes
      route(page,'#/glossary','Glossary & acronyms')
      check(page.locator('.p3-az__btn').count()==26 and page.locator('.p3-gsection__head').count()>10,'glossary provides A-Z navigation and grouped headings')
      page.locator('#gsearch').fill('breaker failure');page.locator('#gsearch').dispatch_event('input');page.wait_for_timeout(30)
      check('Breaker Failure Protection' in page.locator('#glist').inner_text(),'glossary filter searches terms and definitions')
      page.set_viewport_size({'width':390,'height':844});route(page,'#/glossary','Glossary & acronyms')
      small=page.evaluate("""()=>[...document.querySelectorAll('#view button,#view a')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.width<24||r.height<24)}).length""")
      check(small==0,'glossary controls meet 24 by 24 minimum target size at 390px')
      check(page.locator('body').evaluate('e=>e.scrollWidth<=e.clientWidth+2'),'glossary has no horizontal page overflow at 390px')
      page.set_viewport_size({'width':1440,'height':1000})

      # Confidence captures learning evidence
      route(page,'#/adaptive','Adaptive practice');page.locator('#adaptive-start').click();page.wait_for_selector('.c-q__stem');page.locator('.c-opt').first.click();page.wait_for_selector('.c-confidence');page.locator('[data-confidence="guessed"]').click()
      st=state(page);last=st['history'][-1];check(last.get('confidence')=='guessed','practice confidence rating persists in learner history')
      check(page.locator('[data-confidence="guessed"]').get_attribute('aria-pressed')=='true','confidence control exposes selected state')

      # External videos are visibly identified and meet contrast
      video_section=page.evaluate("""()=>{const id=Object.keys(NERC.videosBySection)[0];for(const m of NERC.content){const s=m.sections.find(x=>x.id===id);if(s)return '#/m/'+m.id+'/s/'+id;}return null}""")
      route(page,video_section);check(page.locator('.c-video__notice').count()==1 and 'External' in page.locator('.c-video__chan').first.inner_text(),'video references are labeled external and uncontrolled')
      colors=page.locator('.c-video__chan').first.evaluate(r"""e=>{const c=getComputedStyle(e),b=getComputedStyle(e.closest('.c-video'));function p(x){return x.match(/\d+/g).slice(0,3).map(Number)}return[p(c.color),p(b.backgroundColor),parseFloat(c.fontSize)]}""")
      check(ratio(colors[0],colors[1])>=4.5 and colors[2]>=12,'video metadata contrast and size meet normal-text threshold')

      # Timer announcements at five and one minute
      p=ctx.new_page()
      try:
        boot(p,'to','#/exam');p.locator('#ex-start-scored').click();p.wait_for_selector('#exam-stem')
        p.evaluate("""()=>{const e=JSON.parse(localStorage.getItem('nerc-to-console.exam.v3'));e.start=Date.now()-(e.dur*60000-299000);e.warnings={};localStorage.setItem('nerc-to-console.exam.v3',JSON.stringify(e));window.dispatchEvent(new HashChangeEvent('hashchange'));}""")
        p.wait_for_timeout(100);check('Five minutes remain' in p.locator('#live-status').inner_text(),'exam announces five-minute warning non-visually')
        p.evaluate("""()=>{const e=JSON.parse(localStorage.getItem('nerc-to-console.exam.v3'));e.start=Date.now()-(e.dur*60000-59000);e.warnings={five:true};localStorage.setItem('nerc-to-console.exam.v3',JSON.stringify(e));window.dispatchEvent(new HashChangeEvent('hashchange'));}""")
        p.wait_for_timeout(100);check('One minute remains' in p.locator('#live-status').inner_text(),'exam announces one-minute warning non-visually')
      finally:p.close()

      # Four credential exact mocks remain functional
      expected={'to':100,'rc':120,'bit':120,'bi':100};names={'to':'TO','rc':'RC','bit':'BT','bi':'BI'}
      for cred,n in expected.items():
        p=ctx.new_page()
        try:
          boot(p,cred,'#/exam');p.locator('#ex-start-testday').click();p.wait_for_selector('#exam-stem');ex=json.loads(p.evaluate("localStorage.getItem('nerc-to-console.exam.v3')"))
          check(len(ex['scoredIds'])==n and len(ex['experimentalIds'])==20,f'{names[cred]} test-day draw retains exact totals')
          actual=p.evaluate("""()=>{const e=JSON.parse(localStorage.getItem('nerc-to-console.exam.v3')),o={};e.scoredIds.forEach(id=>{const q=NERC.questions.find(x=>x.id===id);o[q.topic]=(o[q.topic]||0)+1});return o}""")
          targets=p.evaluate("""()=>{const c=localStorage.getItem('nerc-to-console.credential'),o={};NERC.blueprints[c].forEach(d=>d.topics.forEach(t=>o[t.id]=t.target));return o}""")
          check(actual==targets,f'{names[cred]} scored draw matches every subtopic target')
        finally:p.close()

      # Sitting heuristic is explicit and caveated
      route(page,'#/progress','Your progress');pt=page.locator('#view').inner_text();check('85%+' in pt and 'not a pass prediction' in pt,'progress page states and caveats the sitting heuristic')

      # Pointer-heavy paths expose keyboard controls
      route(page,'#/m/restoration/s/m6-cold-load');page.wait_for_timeout(80);cold_if=page.locator('#view iframe');cold_handle=cold_if.first.element_handle() if cold_if.count() else None;cold_frame=cold_handle.content_frame() if cold_handle else None
      check(bool(cold_frame) and cold_frame.locator('button,input,[tabindex]').count()>0,'cold-load interaction exposes keyboard-operable controls inside its titled frame')
      route(page,'#/m/restoration/s/m6-islanding');page.wait_for_timeout(80);syn_if=page.locator('#view iframe');syn_handle=syn_if.first.element_handle() if syn_if.count() else None;syn_frame=syn_handle.content_frame() if syn_handle else None
      check(bool(syn_frame) and syn_frame.locator('button,input,[tabindex]').count()>0,'synchronization lab exposes keyboard-operable controls inside its titled frame')
      if syn_frame:
        focusables=syn_frame.locator('[tabindex="0"],input[type=range],button')
        if focusables.count():
          focusables.first.focus();before=focusables.first.get_attribute('aria-valuenow') or focusables.first.get_attribute('aria-valuetext') or focusables.first.get_attribute('aria-pressed');page.keyboard.press('ArrowUp');after=focusables.first.get_attribute('aria-valuenow') or focusables.first.get_attribute('aria-valuetext') or focusables.first.get_attribute('aria-pressed');check(before!=after or after is not None,'synchronization control responds to or describes keyboard interaction')

      page.screenshot(path=str(SHOTS/'v32-progress.png'),full_page=False)
      check(not errors,'browser recorded no uncaught JavaScript errors')
      check(not console,'browser console recorded no errors')
    except Exception as e:
      failures.append(f'QA harness exception: {e}');print('FAIL  QA harness exception:',e,file=sys.stderr)
    finally:browser.close()
  RESULTS.write_text('\n'.join(['NERC Study Console v3.2 Browser QA','===================================',f'Passed: {len(passes)}',f'Failed: {len(failures)}','','PASSED CHECKS',*[f'- {m}' for m in passes],'','FAILED CHECKS',*([f'- {m}' for m in failures] or ['- None']),'']))
  print(f'\n{len(passes)} browser checks passed; {len(failures)} failed.');return 1 if failures else 0
if __name__=='__main__':raise SystemExit(run())
