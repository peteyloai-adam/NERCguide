/* ============================================================================
   INTERACTIVE: Anatomy of the grid  —  NERC.interactives.gridMap
   A labeled one-line of the whole chain, generator -> step-up transformer ->
   transmission line -> substation -> step-down transformer -> load. Tapping any
   component highlights it and explains it in plain language, using the same
   words the glossary defines. Orientation visual for a from-scratch learner.
   Static (no controls), so it is accessible and cannot hang verification.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.gridMap = function (mount) {
  var C = { void: "#0B0F14", grid: "#2A3648", read: "#C9D6E4", dim: "#7E8DA0",
            phos: "#56C2E6", normal: "#3FB98C", amber: "#E0A83E" };

  // key -> { hit box, plain-language caption }
  var parts = [
    { k: "generator", x: 14,  w: 58,  cap: "Generator \u2014 converts an energy source (steam, water, wind, gas, sunlight) into electrical power and feeds it onto the grid." },
    { k: "gsu",       x: 86,  w: 62,  cap: "Step-up transformer \u2014 raises the generator\u2019s voltage to high transmission voltage so power can travel far with little loss." },
    { k: "line",      x: 160, w: 200, cap: "Transmission line \u2014 high-voltage conductors on towers that carry bulk power between substations. This is the Transmission Operator\u2019s domain." },
    { k: "sub",       x: 366, w: 104, cap: "Substation \u2014 where lines meet and switching happens. Inside, elements tie to a bus and are switched by breakers and disconnects." },
    { k: "stepdown",  x: 478, w: 58,  cap: "Step-down transformer \u2014 lowers voltage near the load so power can be safely distributed to homes and businesses." },
    { k: "load",      x: 544, w: 62,  cap: "Load / distribution \u2014 the local network and the demand it serves. Generation must be matched to load moment by moment." }
  ];

  function hlRects() {
    return parts.map(function (p) {
      return '<rect data-hl="' + p.k + '" x="' + p.x + '" y="16" width="' + p.w + '" height="120" rx="6" fill="' + C.phos + '" opacity="0"/>';
    }).join("");
  }
  function hitRects() {
    return parts.map(function (p) {
      return '<rect data-key="' + p.k + '" x="' + p.x + '" y="16" width="' + p.w + '" height="120" fill="transparent" style="cursor:pointer"/>';
    }).join("");
  }
  function label(cx, l1, l2) {
    return '<text x="' + cx + '" y="124" text-anchor="middle" fill="' + C.dim + '" font-family="monospace" font-size="9">' + l1 + '</text>' +
      (l2 ? '<text x="' + cx + '" y="135" text-anchor="middle" fill="' + C.dim + '" font-family="monospace" font-size="9">' + l2 + '</text>' : '');
  }

  mount.innerHTML =
    '<div class="c-int">' +
      '<div class="c-int__title">Interactive \u00b7 Anatomy of the grid</div>' +
      '<svg viewBox="0 0 620 150" width="100%" role="img" aria-label="The path of power from generator through transmission to load">' +
        hlRects() +
        // main conductor
        '<line x1="60" y1="80" x2="566" y2="80" stroke="' + C.dim + '" stroke-width="2"/>' +
        '<text x="260" y="30" text-anchor="middle" fill="' + C.dim + '" font-family="monospace" font-size="8">\u2014 high-voltage transmission \u2014</text>' +
        // generator
        '<circle cx="43" cy="80" r="19" fill="' + C.void + '" stroke="' + C.normal + '" stroke-width="2"/>' +
        '<text x="43" y="85" text-anchor="middle" fill="' + C.normal + '" font-family="monospace" font-size="14">G</text>' +
        // step-up transformer (two coupled circles on the wire)
        '<circle cx="111" cy="80" r="11" fill="' + C.void + '" stroke="' + C.phos + '" stroke-width="1.6"/>' +
        '<circle cx="123" cy="80" r="11" fill="' + C.void + '" stroke="' + C.phos + '" stroke-width="1.6"/>' +
        // transmission tower
        '<line x1="260" y1="80" x2="260" y2="46" stroke="' + C.dim + '" stroke-width="2"/>' +
        '<line x1="243" y1="54" x2="277" y2="54" stroke="' + C.dim + '" stroke-width="2"/>' +
        '<line x1="249" y1="46" x2="271" y2="46" stroke="' + C.dim + '" stroke-width="2"/>' +
        '<line x1="160" y1="80" x2="360" y2="80" stroke="' + C.phos + '" stroke-width="2"/>' +
        // substation: box + bus + breaker
        '<rect x="372" y="58" width="92" height="44" rx="4" fill="none" stroke="' + C.grid + '" stroke-width="1.5"/>' +
        '<line x1="380" y1="80" x2="456" y2="80" stroke="' + C.read + '" stroke-width="3"/>' +
        '<rect x="412" y="74" width="12" height="12" fill="' + C.void + '" stroke="' + C.amber + '" stroke-width="1.6"/>' +
        // step-down transformer
        '<circle cx="501" cy="80" r="11" fill="' + C.void + '" stroke="' + C.phos + '" stroke-width="1.6"/>' +
        '<circle cx="513" cy="80" r="11" fill="' + C.void + '" stroke="' + C.phos + '" stroke-width="1.6"/>' +
        // load (house)
        '<rect x="563" y="72" width="24" height="18" fill="none" stroke="' + C.normal + '" stroke-width="1.6"/>' +
        '<path d="M560,72 L575,60 L590,72" fill="none" stroke="' + C.normal + '" stroke-width="1.6"/>' +
        // labels
        label(43, "Generator", "") +
        label(117, "Step-up", "transformer") +
        label(260, "Transmission line", "") +
        label(418, "Substation", "(bus + breaker)") +
        label(507, "Step-down", "transformer") +
        label(575, "Load", "") +
        hitRects() +
      '</svg>' +
      '<div id="gm-cap" style="margin-top:10px;min-height:2.8em;font-family:monospace;font-size:.82rem;line-height:1.4;color:' + C.read + '">Tap any labeled part \u2014 generator, transformer, line, substation, load \u2014 to see what it is.</div>' +
    '</div>';

  var cap = mount.querySelector("#gm-cap");
  var hls = mount.querySelectorAll("rect[data-hl]");
  function select(key) {
    hls.forEach(function (r) { r.setAttribute("opacity", r.getAttribute("data-hl") === key ? "0.12" : "0"); });
    for (var i = 0; i < parts.length; i++) { if (parts[i].k === key) { cap.textContent = parts[i].cap; break; } }
  }
  mount.querySelectorAll("rect[data-key]").forEach(function (r) {
    r.addEventListener("click", function () { select(this.getAttribute("data-key")); });
  });
};
