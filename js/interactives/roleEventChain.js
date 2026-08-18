/* A single operating event that connects the functional-model roles in time. */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.roleEventChain = function (mount) {
  var stages = [
    {
      short: 'Plan the transfer', hats: 'PSE · LSE · TSP · BA',
      title: 'Before real time: the transaction becomes an operating schedule',
      event: 'A Purchasing-Selling Entity arranges a 500 MW sale to serve an LSE\'s customers. The Transmission Service Provider confirms transmission service, and the sending and receiving Balancing Authorities place the implemented schedule into their operating plans and ACE calculations.',
      handoff: 'Commercial arrangements do not steer electrons. They create schedules that operators must balance while TOPs and the RC keep the physical paths reliable.'
    },
    {
      short: 'Make assets ready', hats: 'GO · TO → GOP · TOP',
      title: 'Owners supply the capability; operators use it',
      event: 'The Generator Owner and Transmission Owner maintain the unit, line, protection, and ratings. The Generator Operator runs the unit, while the Transmission Operator operates the transmission facilities—even if a different company owns them.',
      handoff: 'Ownership answers “whose equipment and data?” Operating registration answers “who acts on it now?” A single company may wear both hats, but the responsibilities remain distinct.'
    },
    {
      short: 'The line trips', hats: 'TO asset · TOP action',
      title: 'Protection clears a fault and the TOP rebuilds the system picture',
      event: 'A fault occurs on the 345 kV line. Protection associated with the TO-owned asset trips the breaker. The TOP receives alarms, verifies breaker state and telemetry, updates topology, and checks actual and post-contingency loading on the surviving paths.',
      handoff: 'The owner is involved in equipment condition and repair. The TOP does not wait for the owner to run the real-time system; it follows its operating authority, plans, and communications protocols.'
    },
    {
      short: 'Balance the area', hats: 'BA → GOP',
      title: 'The BA sees ACE move and obtains a generation response',
      event: 'The changed transfer and system response move actual interchange away from schedule and may depress frequency. The BA deploys available regulating or contingency resources. The GOP changes unit output within capability and operating instructions.',
      handoff: 'The BA controls the area balance; the GOP controls the generating unit. The GO provides the maintained capability, but it is not the real-time dispatch desk.'
    },
    {
      short: 'Protect the wide area', hats: 'RC → BA · TOP',
      title: 'The RC connects local actions to the Interconnection-wide risk',
      event: 'The Reliability Coordinator sees that the remaining path is also critical to a neighboring system. It coordinates the affected BAs and TOPs, evaluates the wide-area limit, and may issue a Reliability Directive when action is required.',
      handoff: 'The RC has the widest real-time view and authority. It does not replace each TOP or BA; it aligns their actions so one area\'s relief does not create another area\'s emergency.'
    },
    {
      short: 'Carry out relief', hats: 'TOP · BA · GOP · DP',
      title: 'Operators execute, communicate, and verify the coordinated plan',
      event: 'The TOP reconfigures or reduces transfer, the BA adjusts generation and interchange, and the GOP follows the unit instruction. If the approved emergency plan calls for demand action, the Distribution Provider carries it out. Each instruction uses three-part communication and the result is independently verified.',
      handoff: 'This is the real-time chain in motion: RC coordinates BA/TOP; BA and TOP direct the needed operating response; GOP and DP act at the resource or load edge.'
    },
    {
      short: 'Recover and learn', hats: 'Operators · Owners · RE · NERC · FERC',
      title: 'Real-time authority ends where repair, review, and governance begin',
      event: 'Operators restore a secure configuration. The TO repairs the line and its protection as needed; the GO addresses generating equipment. Required reports and evidence support event review. The Regional Entity monitors compliance, NERC maintains and enforces the standards framework, and FERC approves mandatory U.S. Reliability Standards.',
      handoff: 'The compliance chain is not the switching chain. Regulators and enforcement organizations set and oversee the rules; they do not sit in the control room directing each breaker operation.'
    }
  ];
  var current = 0;

  mount.innerHTML =
    '<div class="c-int c-role-chain">' +
      '<div class="c-int__title">Interactive · One event, the full functional chain</div>' +
      '<p class="p2-intro"><strong>Scenario:</strong> a scheduled 500 MW transfer is in progress when a 345 kV line trips. Step through the timeline to see which hat owns, operates, coordinates, or oversees each part.</p>' +
      '<div class="c-role-chain__steps" role="group" aria-label="Event stages"></div>' +
      '<section class="c-role-chain__panel" aria-live="polite" aria-labelledby="role-chain-title">' +
        '<div class="c-role-chain__progress" id="role-chain-progress"></div>' +
        '<div class="c-role-chain__hats" id="role-chain-hats"></div>' +
        '<h4 id="role-chain-title"></h4>' +
        '<p id="role-chain-event"></p>' +
        '<div class="c-note c-note--op"><div class="c-note__title">Why this handoff matters</div><span id="role-chain-handoff"></span></div>' +
      '</section>' +
      '<div class="c-role-chain__controls">' +
        '<button class="c-btn c-btn--ghost" id="role-chain-prev" type="button">← Previous</button>' +
        '<button class="c-btn c-btn--primary" id="role-chain-next" type="button">Next handoff →</button>' +
      '</div>' +
    '</div>';

  var steps = mount.querySelector('.c-role-chain__steps');
  stages.forEach(function (stage, index) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'c-role-chain__step';
    b.innerHTML = '<span>' + (index + 1) + '</span><strong>' + stage.short + '</strong>';
    b.addEventListener('click', function () { current = index; render(); });
    steps.appendChild(b);
  });

  function render() {
    var stage = stages[current];
    Array.prototype.forEach.call(steps.children, function (b, index) {
      b.classList.toggle('is-current', index === current);
      b.classList.toggle('is-complete', index < current);
      if (index === current) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
    mount.querySelector('#role-chain-progress').textContent = 'Stage ' + (current + 1) + ' of ' + stages.length;
    mount.querySelector('#role-chain-hats').textContent = stage.hats;
    mount.querySelector('#role-chain-title').textContent = stage.title;
    mount.querySelector('#role-chain-event').textContent = stage.event;
    mount.querySelector('#role-chain-handoff').textContent = stage.handoff;
    mount.querySelector('#role-chain-prev').disabled = current === 0;
    var next = mount.querySelector('#role-chain-next');
    next.disabled = current === stages.length - 1;
    next.textContent = current === stages.length - 2 ? 'Finish chain →' : 'Next handoff →';
  }

  mount.querySelector('#role-chain-prev').addEventListener('click', function () { if (current > 0) { current--; render(); } });
  mount.querySelector('#role-chain-next').addEventListener('click', function () { if (current < stages.length - 1) { current++; render(); } });
  render();
};
