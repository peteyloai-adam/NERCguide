(function(){
  window.NERC = window.NERC || {}; NERC.interactives = NERC.interactives || {};
  NERC.interactives.solIrolLab = function(root){
    var actions=[
      {id:'redispatch',label:'Redispatch generation',x:-130,y:-60,time:12,valid:true},
      {id:'curtail',label:'Curtail 100 MW transfer',x:-90,y:-40,time:8,valid:true},
      {id:'line',label:'Return planned line',x:-180,y:-100,time:45,valid:false},
      {id:'capacitor',label:'Switch capacitor bank',x:0,y:0,time:3,valid:true}
    ], selected={};
    root.innerHTML='<div class="c-int p2-lab"><div class="c-int__title">SOL / IROL real-time assessment lab</div><p class="p2-intro">The established IROL Tv for this case is 30 minutes. Select an executable action plan, then evaluate it.</p><div class="p2-rta"></div><div class="p2-actions"></div><div class="p2-feedback" aria-live="polite"></div></div>';
    var table=root.querySelector('.p2-rta'), aw=root.querySelector('.p2-actions'), fb=root.querySelector('.p2-feedback');
    function totals(){var x=1160,y=1040,t=0,badTime=false;actions.forEach(function(a){if(selected[a.id]){x+=a.x;y+=a.y;t=Math.max(t,a.time);if(!a.valid||a.time>30)badTime=true;}});return{x:x,y:y,t:t,badTime:badTime};}
    function render(){var z=totals();table.innerHTML='<div class="p2-table"><div class="p2-tr p2-th"><span>Condition</span><span>Result</span><span>Limit</span></div><div class="p2-tr"><span>Actual state</span><strong>920 MW</strong><span>1000 MW</span></div><div class="p2-tr"><span>Loss of Line X · IROL</span><strong class="'+(z.x>1000?'is-bad':'is-good')+'">'+z.x+' MW</strong><span>1000 MW</span></div><div class="p2-tr"><span>Loss of Line Y · SOL</span><strong class="'+(z.y>1000?'is-alert':'is-good')+'">'+z.y+' MW</strong><span>1000 MW</span></div><div class="p2-tr"><span>Plan completion</span><strong class="'+(z.t>30?'is-bad':'')+'">'+z.t+' min</strong><span>IROL Tv 30 min</span></div></div>';
      aw.innerHTML='';actions.forEach(function(a){var b=document.createElement('button');b.className='c-btn p2-toggle'+(selected[a.id]?' is-selected':'');b.type='button';b.innerHTML='<strong>'+a.label+'</strong><small>Line X '+(a.x||0)+' MW · '+a.time+' min</small>';b.onclick=function(){selected[a.id]=!selected[a.id];fb.innerHTML='';render();};aw.appendChild(b);});var ev=document.createElement('button');ev.className='c-btn c-btn--primary';ev.textContent='Evaluate plan';ev.type='button';ev.onclick=evaluate;aw.appendChild(ev);var rs=document.createElement('button');rs.className='c-btn';rs.textContent='Reset';rs.type='button';rs.onclick=function(){selected={};fb.innerHTML='';render();};aw.appendChild(rs);
    }
    function evaluate(){var z=totals(), has=Object.keys(selected).some(function(k){return selected[k];});if(!has){fb.innerHTML='<strong>Select at least one action.</strong>';return;}if(z.badTime){fb.innerHTML='<strong>The plan relies on an action outside the IROL Tv.</strong><p>The planned line return may be useful later, but it cannot be the action that satisfies this 30-minute requirement.</p>';return;}if(z.x<=1000&&z.y<=1000){fb.innerHTML='<strong>Plan clears both results within the clock.</strong><p>Next, coordinate execution and verify the updated assessment after each meaningful action.</p>';}else if(z.x>1000){fb.innerHTML='<strong>The IROL exceedance remains.</strong><p>Add executable relief that can be completed within the established time.</p>';}else{fb.innerHTML='<strong>The IROL is cleared, but a remaining SOL result needs attention.</strong><p>Continue evaluating corrective actions and verify the full contingency set.</p>';}}
    render();
  };
})();
