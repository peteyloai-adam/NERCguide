(function(){
  window.NERC = window.NERC || {}; NERC.interactives = NERC.interactives || {};
  NERC.interactives.voltageDispatch = function(root){
    var state;
    root.innerHTML='<div class="c-int p2-lab"><div class="c-int__title">Voltage-control dispatch simulator</div><p class="p2-intro">Restore the transmission bus to 0.95–1.05 pu while keeping at least 20 MVAR of generator reactive reserve.</p><div class="p2-kpis"></div><div class="p2-actions"></div><div class="p2-feedback" aria-live="polite"></div></div>';
    var kpis=root.querySelector('.p2-kpis'), actions=root.querySelector('.p2-actions'), feedback=root.querySelector('.p2-feedback');
    var defs=[
      {id:'cap',label:'Switch in local capacitor bank',dv:.020,dq:0,detail:'Adds nearby reactive support.'},
      {id:'svc',label:'Raise SVC output',dv:.016,dq:0,detail:'Fast local dynamic support.'},
      {id:'gen',label:'Raise generator MVAR by 15',dv:.010,dq:15,detail:'Improves voltage but uses generator margin.'},
      {id:'ltc',label:'Block upward LTC movement',dv:.009,dq:0,detail:'Prevents added transmission-side burden.'},
      {id:'reactor',label:'Switch in shunt reactor',dv:-.018,dq:0,detail:'Absorbs MVAR and lowers voltage.'}
    ];
    function reset(){state={v:.920,q:225,max:250,used:{},moves:0};feedback.innerHTML='';render();}
    function render(){
      var reserve=state.max-state.q, ok=state.v>=.95 && state.v<=1.05 && reserve>=20;
      kpis.innerHTML='<div class="p2-kpi"><span>Transmission voltage</span><strong class="'+(state.v<.95?'is-bad':state.v>1.05?'is-alert':'is-good')+'">'+state.v.toFixed(3)+' pu</strong></div><div class="p2-kpi"><span>Generator output</span><strong>'+state.q+' MVAR</strong></div><div class="p2-kpi"><span>Reactive reserve</span><strong class="'+(reserve<20?'is-bad':'is-good')+'">'+reserve+' MVAR</strong></div><div class="p2-kpi"><span>Actions used</span><strong>'+state.moves+'</strong></div>';
      actions.innerHTML='';
      defs.forEach(function(d){var b=document.createElement('button');b.className='c-btn p2-action';b.type='button';b.disabled=!!state.used[d.id];b.innerHTML='<strong>'+d.label+'</strong><small>'+d.detail+'</small>';b.onclick=function(){apply(d);};actions.appendChild(b);});
      var rb=document.createElement('button');rb.className='c-btn';rb.type='button';rb.textContent='Reset case';rb.onclick=reset;actions.appendChild(rb);
      if(ok) feedback.innerHTML='<strong>Stable operating point reached.</strong><p>You restored voltage without exhausting the generator. In practice, continue to coordinate schedules, verify limits, and review the next contingency.</p>';
      else if(state.v>1.05) feedback.innerHTML='<strong>Voltage is now high.</strong><p>More support is not always better. Reassess device choice and the operating target.</p>';
      else if(reserve<20) feedback.innerHTML='<strong>Generator margin is too thin.</strong><p>The present voltage may look acceptable, but the next contingency could leave the unit at a limiter with little response capability.</p>';
    }
    function apply(d){state.used[d.id]=true;state.moves++;state.v=Math.max(.88,Math.min(1.08,state.v+d.dv));state.q=Math.min(state.max,state.q+d.dq);render();}
    reset();
  };
})();
