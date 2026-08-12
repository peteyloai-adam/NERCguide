(function(){
  window.NERC = window.NERC || {}; NERC.interactives = NERC.interactives || {};
  NERC.interactives.commsSimulator = function(root){
    var cases=[
      {label:'Instruction 1',instruction:'Open breaker 342 at Fairmont 230 kV Substation and report when complete.',prompt:'Choose the best repeat-back.',options:['Open 342 at Fairview and report.','Opening breaker 342 at Fairmont 230 kV Substation; I will report when complete.','Breaker 342 is open.','I understand.'],answer:1,explain:'The repeat-back includes action, equipment, station, voltage level, and completion reporting. The issuer must confirm or correct it before action.'},
      {label:'Instruction 2',instruction:'Open breaker 118 at North River immediately.',prompt:'Remote control has failed. Choose the best response.',options:['Say nothing and keep trying.','Open a nearby breaker instead.','Unable to comply remotely: breaker 118 control is unavailable. Local operator ETA is 12 minutes. Request alternate direction.','Report it open so the RC can continue.'],answer:2,explain:'State the inability, reason, useful timing or system information, and request an alternative. Do not silently substitute another action.'}
    ],idx=0;
    root.innerHTML='<div class="c-int p2-lab"><div class="c-int__title">Communications simulator</div><div class="p2-radio"><span class="p2-radio-light"></span><strong>RC CHANNEL</strong><p></p></div><div class="p2-panel"></div></div>';
    var radio=root.querySelector('.p2-radio p'), p=root.querySelector('.p2-panel');
    function render(){var c=cases[idx];radio.textContent='“'+c.instruction+'”';p.innerHTML='<div class="p2-time">'+c.label+'</div><p class="p2-prompt">'+c.prompt+'</p><div class="p2-options"></div><div class="p2-feedback" aria-live="polite"></div>';var o=p.querySelector('.p2-options');c.options.forEach(function(t,i){var b=document.createElement('button');b.className='c-btn p2-choice';b.type='button';b.textContent=t;b.onclick=function(){pick(i,b);};o.appendChild(b);});}
    function pick(i,b){var c=cases[idx],bs=p.querySelectorAll('.p2-choice');bs.forEach(function(x){x.disabled=true;});bs[c.answer].classList.add('is-correct');if(i!==c.answer)b.classList.add('is-wrong');var f=p.querySelector('.p2-feedback');f.innerHTML='<strong>'+(i===c.answer?'Communication loop protected.':'The loop is incomplete or unsafe.')+'</strong><p>'+c.explain+'</p>';var n=document.createElement('button');n.className='c-btn c-btn--primary';n.textContent=idx<cases.length-1?'Next instruction →':'Restart';n.type='button';n.onclick=function(){idx=idx<cases.length-1?idx+1:0;render();};f.appendChild(n);}
    render();
  };
})();
