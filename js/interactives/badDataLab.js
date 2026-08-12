(function(){
  window.NERC = window.NERC || {}; NERC.interactives = NERC.interactives || {};
  NERC.interactives.badDataLab = function(root){
    var cases = [
      {
        title:'Case 1 · Status and analog mismatch',
        rows:[['Breaker 52-4 status','OPEN','Good · 2 s old'],['Line MW','168 MW','Good · 2 s old'],['Line current','412 A','Good · 2 s old'],['State estimator','NOT CONVERGED','After bus split']],
        prompt:'What should you treat as the leading problem?',
        options:['Normal analog lag after switching','Unknown actual topology or incorrect status/model mapping','A low-frequency event','A routine alarm flood'],
        answer:1,
        explain:'The breaker status conflicts with live electrical quantities and the estimator failed after a topology change. Hold dependent switching, verify the field state, and reconcile the model and telemetry.'
      },
      {
        title:'Case 2 · A plausible value that stopped moving',
        rows:[['Bus A voltage','229.8 kV','Good · 21 min old'],['Bus B voltage','221.4 kV','Good · 3 s old'],['Line MVAR','+74 MVAR','Good · 3 s old'],['Local operator','Reports 221 kV','Voice confirmation']],
        prompt:'Which conclusion is best?',
        options:['Bus A is perfectly regulated','The Bus A point may be stale or frozen despite the good flag','The local operator must be wrong','Voltage cannot change that quickly'],
        answer:1,
        explain:'Quality flags are only one clue. Timestamp, neighboring values, trend behavior, and local confirmation all point to stale or frozen telemetry.'
      },
      {
        title:'Case 3 · Model versus measurement',
        rows:[['Breaker 52-7 status','CLOSED','Good'],['Local breaker indication','OPEN','Confirmed by station'],['Topology processor','Branch in service','Based on SCADA status'],['State estimator','CONVERGED','Large residual at terminal']],
        prompt:'What is the safest interpretation?',
        options:['A converged estimator proves the branch is closed','The topology model is wrong and must be corrected and revalidated','The local indication should be ignored','The branch is carrying invisible power'],
        answer:1,
        explain:'A converged solution can still contain a topology error. Correct the status or model, rerun the analysis, and verify the resulting network before relying on downstream studies.'
      }
    ];
    var idx=0, score=0;
    root.innerHTML='<div class="c-int p2-lab"><div class="c-int__title">Bad-data and topology lab</div><div class="p2-progress" aria-live="polite"></div><div class="p2-panel"></div></div>';
    var panel=root.querySelector('.p2-panel'), progress=root.querySelector('.p2-progress');
    function render(){
      var c=cases[idx];
      progress.textContent='Case '+(idx+1)+' of '+cases.length+' · '+score+' correct';
      panel.innerHTML='<h4 class="p2-case-title">'+c.title+'</h4><div class="p2-table" role="table"><div class="p2-tr p2-th" role="row"><span>Point</span><span>Value</span><span>Quality / evidence</span></div>'+c.rows.map(function(r){return '<div class="p2-tr" role="row"><span>'+r[0]+'</span><strong>'+r[1]+'</strong><span>'+r[2]+'</span></div>';}).join('')+'</div><p class="p2-prompt">'+c.prompt+'</p><div class="p2-options"></div><div class="p2-feedback" aria-live="polite"></div>';
      var opts=panel.querySelector('.p2-options');
      c.options.forEach(function(text,i){var b=document.createElement('button');b.className='c-btn p2-choice';b.type='button';b.textContent=text;b.onclick=function(){pick(i,b);};opts.appendChild(b);});
    }
    function pick(choice,btn){
      var c=cases[idx], buttons=panel.querySelectorAll('.p2-choice');
      buttons.forEach(function(b){b.disabled=true;});
      buttons[c.answer].classList.add('is-correct');
      if(choice!==c.answer) btn.classList.add('is-wrong'); else score++;
      var f=panel.querySelector('.p2-feedback');
      f.innerHTML='<strong>'+(choice===c.answer?'Good diagnosis.':'Recheck the evidence.')+'</strong><p>'+c.explain+'</p>';
      var next=document.createElement('button');next.className='c-btn c-btn--primary';next.type='button';next.textContent=idx<cases.length-1?'Next case →':'Restart lab';
      next.onclick=function(){if(idx<cases.length-1){idx++;}else{idx=0;score=0;}render();};f.appendChild(next);
    }
    render();
  };
})();
