(function(){
  window.NERC = window.NERC || {}; NERC.interactives = NERC.interactives || {};
  NERC.interactives.interchangeLifecycle = function(root){
    var stages=[
      ['request','Request and transaction profile prepared'],
      ['arranged','Arranged Interchange distributed for reliability evaluation'],
      ['confirmed','Approvals complete; Confirmed Interchange created'],
      ['ramp','Balancing Authorities implement the agreed ramp'],
      ['implemented','Implemented Interchange is reflected in schedules and ACE']
    ], shuffled=[stages[2],stages[0],stages[4],stages[1],stages[3]], chosen=[];
    root.innerHTML='<div class="c-int p2-lab"><div class="c-int__title">Interchange lifecycle lab</div><p class="p2-intro">Select the transaction stages in operational order.</p><div class="p2-stage-bank"></div><div class="p2-stage-flow" aria-live="polite"></div><div class="p2-feedback"></div><div class="p2-ramp" hidden><h4>Ramp check</h4><p>A 300 MW import ramps from 0 to 300 MW over 10 minutes. At minute 4, what scheduled import should the ACE calculation use?</p><div class="p2-options"></div><div class="p2-ramp-feedback"></div></div></div>';
    var bank=root.querySelector('.p2-stage-bank'), flow=root.querySelector('.p2-stage-flow'), fb=root.querySelector('.p2-feedback'), ramp=root.querySelector('.p2-ramp');
    function render(){bank.innerHTML='';shuffled.forEach(function(s){var b=document.createElement('button');b.className='c-btn p2-stage';b.type='button';b.disabled=chosen.indexOf(s[0])>=0;b.textContent=s[1];b.onclick=function(){pick(s);};bank.appendChild(b);});flow.innerHTML=chosen.length?chosen.map(function(id,i){var s=stages.find(function(x){return x[0]===id;});return '<div class="p2-stage-step"><span>'+(i+1)+'</span><strong>'+s[1]+'</strong></div>';}).join(''):'<p>No stages selected.</p>';}
    function pick(s){var expected=stages[chosen.length];if(s[0]!==expected[0]){fb.innerHTML='<strong>That stage comes later.</strong><p>Start with the transaction request, then follow the approval and implementation process.</p>';return;}chosen.push(s[0]);fb.innerHTML='<strong>Correct sequence.</strong>';if(chosen.length===stages.length){fb.innerHTML='<strong>Lifecycle complete.</strong><p>Now apply the schedule ramp to ACE.</p>';ramp.hidden=false;renderRamp();}render();}
    function renderRamp(){var opts=ramp.querySelector('.p2-options'), rf=ramp.querySelector('.p2-ramp-feedback');opts.innerHTML='';['0 MW','120 MW','200 MW','300 MW'].forEach(function(t,i){var b=document.createElement('button');b.className='c-btn p2-choice';b.type='button';b.textContent=t;b.onclick=function(){opts.querySelectorAll('button').forEach(function(x){x.disabled=true;});rf.innerHTML='<strong>'+(i===1?'Correct.':'Recalculate the linear ramp.')+'</strong><p>'+(i===1?'Four minutes is 40% of the 10-minute ramp, so the implemented schedule is 120 MW.':'The schedule changes continuously through the agreed ramp profile; 40% of 300 MW is 120 MW.')+'</p>';};opts.appendChild(b);});}
    render();
  };
})();
