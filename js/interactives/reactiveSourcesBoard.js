window.NERC = window.NERC || {}; NERC.interactives = NERC.interactives || {};
NERC.interactives.reactiveSourcesBoard = function (root) {
  root.innerHTML='<div class="c-int"><div class="c-int__title">Reactive-source comparison board</div><p class="p2-intro">Lower the bus voltage and compare how the available support changes. Values are simplified for learning.</p><label class="p3-range-label" for="rs-voltage">Bus voltage <strong id="rs-read">1.00 pu</strong></label><input id="rs-voltage" type="range" min="70" max="110" value="100" step="1" aria-label="Bus voltage"><div class="p3-source-grid" id="rs-grid"></div><div class="c-note c-note--op"><div class="c-note__title">Operator takeaway</div><span id="rs-note"></span></div></div>';
  var devices=[
    {name:'Shunt capacitor',speed:'switched',base:100,fn:function(v){return 100*v*v;},note:'Output falls with voltage squared.'},
    {name:'Shunt reactor',speed:'switched',base:-80,fn:function(v){return -80*v*v;},note:'Absorption also falls as voltage falls.'},
    {name:'Generator AVR',speed:'fast',base:120,fn:function(v){return Math.min(120,55+(1-v)*260);},note:'Fast response, limited by capability and excitation limiters.'},
    {name:'SVC',speed:'fast',base:100,fn:function(v){return Math.min(100,100*v*v);},note:'Fast susceptance-based support; output weakens at low voltage.'},
    {name:'STATCOM',speed:'fast',base:100,fn:function(v){return Math.min(100,100*v);},note:'Can sustain stronger reactive current at depressed voltage.'}
  ];
  var slider=root.querySelector('#rs-voltage'),grid=root.querySelector('#rs-grid');
  function paint(){var v=Number(slider.value)/100;root.querySelector('#rs-read').textContent=v.toFixed(2)+' pu';slider.setAttribute('aria-valuetext',v.toFixed(2)+' per unit bus voltage');grid.innerHTML='';devices.forEach(function(d){var q=d.fn(v),card=document.createElement('div');card.className='c-card p3-source-card';card.innerHTML='<span class="c-pill">'+d.speed+'</span><h3>'+d.name+'</h3><div class="p3-source-value">'+(q>=0?'+':'')+Math.round(q)+' MVAR</div><p>'+d.note+'</p>';grid.appendChild(card);});root.querySelector('#rs-note').textContent=v<.9?'At depressed voltage, compare actual device capability rather than assuming nameplate MVAR is still available.':'Preserve reactive margin and coordinate devices so one control does not oppose another.';}
  slider.addEventListener('input',paint);paint();
};
