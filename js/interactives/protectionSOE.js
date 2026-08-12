(function(){
  window.NERC = window.NERC || {}; NERC.interactives = NERC.interactives || {};
  NERC.interactives.protectionSOE = function(root){
    var events=[
      {id:'fault',time:'10:14:22.118',text:'Line A Zone 1 distance element picks up'},
      {id:'trip',time:'10:14:22.151',text:'Breaker A trip coil energizes'},
      {id:'bf',time:'10:14:22.301',text:'Breaker-failure timer expires; adjacent breakers receive trip'},
      {id:'clear',time:'10:14:22.389',text:'Line current falls to zero; fault cleared'},
      {id:'block',time:'10:14:22.420',text:'Automatic reclose blocked by lockout logic'}
    ], shuffled=[events[2],events[0],events[4],events[1],events[3]], picks=[];
    root.innerHTML='<div class="c-int p2-lab"><div class="c-int__title">Protection sequence-of-events lab</div><p class="p2-intro">Select the records in the order they occurred. Use the timestamps and the protection logic, not the order shown.</p><div class="p2-soe-source"></div><div class="p2-soe-order" aria-live="polite"></div><div class="p2-feedback"></div></div>';
    var src=root.querySelector('.p2-soe-source'), out=root.querySelector('.p2-soe-order'), fb=root.querySelector('.p2-feedback');
    function render(){src.innerHTML='';shuffled.forEach(function(e){var b=document.createElement('button');b.className='c-btn p2-soe-card';b.type='button';b.disabled=picks.indexOf(e.id)>=0;b.innerHTML='<span>'+e.time+'</span><strong>'+e.text+'</strong>';b.onclick=function(){pick(e);};src.appendChild(b);});out.innerHTML='<div class="p2-order-title">Your reconstruction</div>'+(picks.length?picks.map(function(id,i){var e=events.find(function(x){return x.id===id;});return '<div class="p2-order-row"><span>'+(i+1)+'</span><code>'+e.time+'</code><span>'+e.text+'</span></div>';}).join(''):'<p>No events selected yet.</p>');}
    function pick(e){var expected=events[picks.length];if(e.id!==expected.id){fb.innerHTML='<strong>That event happened later.</strong><p>Look for the earliest remaining timestamp and check what must occur before backup protection can act.</p>';return;}picks.push(e.id);fb.innerHTML='<strong>Correct.</strong>';if(picks.length===events.length){fb.innerHTML='<strong>Event reconstructed.</strong><p>The primary relay detected the line fault and issued a trip. Because the breaker did not clear current, breaker-failure backup removed adjacent elements. Reclosing was blocked, leaving a wider outage that the operator must assess and communicate.</p><button class="c-btn" type="button">Restart</button>';fb.querySelector('button').onclick=function(){picks=[];fb.innerHTML='';render();};}render();}
    render();
  };
})();
