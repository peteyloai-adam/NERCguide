/* build-embed.js — wrap a self-contained HTML interactive into a console module.
   Renders it in an isolated, auto-sizing <iframe srcdoc> so the original's own
   styles/scripts/listeners/animation stay fully contained (no CSS collisions,
   nothing leaks into the console) while preserving the interactive exactly. */
const fs = require('fs');
const path = require('path');

function esc(s) {
  return s.replace(/\\/g, '\\\\')      // backslashes first (preserves \uXXXX etc.)
          .replace(/`/g, '\\`')        // template-literal delimiters
          .replace(/\$\{/g, () => '\\${'); // template-literal interpolation
}

function build(src, id, title, themeCss) {
  let html = fs.readFileSync(src, 'utf8');
  // offline: drop external font links/preconnects (fallback fonts are already in the stacks)
  html = html.split('\n').filter(l => !/fonts\.(googleapis|gstatic)\.com/.test(l)).join('\n');
  // blend into the section: transparent page background, trim outer top padding.
  // themeCss (optional) is appended AFTER the original stylesheet, so it overrides
  // without editing a single line of the source interactive - fully reversible.
  const inject = '<style>html,body{background:transparent !important;}'
    + '.wrap,.app{padding-top:8px !important;}'
    + (themeCss || '')
    + '</style>\n</head>';
  html = html.replace('</head>', inject);

  const out =
`/* ============================================================================
   INTERACTIVE: ${title}
   Auto-embedded (build-embed.js) from ${path.basename(src)}.

   Rendered in an isolated, auto-sizing <iframe srcdoc>. This preserves the
   original single-file interactive exactly \u2014 its own styles, scripts, event
   listeners, and animation loop all stay contained inside the frame, so nothing
   collides with the console CSS and no listeners leak across navigation. The
   frame height tracks the inner content via ResizeObserver.
   ========================================================================== */
window.NERC = window.NERC || {};
window.NERC.interactives = window.NERC.interactives || {};

window.NERC.interactives.${id} = function (mount) {
  var HTML = \`${esc(html)}\`;
  var f = document.createElement('iframe');
  f.title = ${JSON.stringify(title)};
  f.setAttribute('scrolling', 'no');
  f.loading = 'lazy';
  f.style.cssText = 'width:100%;border:0;display:block;background:transparent;min-height:340px';
  f.srcdoc = HTML;
  mount.appendChild(f);

  function size() {
    try {
      var d = f.contentDocument || (f.contentWindow && f.contentWindow.document);
      if (!d) return;
      var h = Math.max(
        d.documentElement ? d.documentElement.scrollHeight : 0,
        d.body ? d.body.scrollHeight : 0);
      if (h) f.style.height = h + 'px';
    } catch (e) { /* cross-frame guard */ }
  }
  f.addEventListener('load', function () {
    size();
    try {
      var d = f.contentDocument;
      if (window.ResizeObserver && d && d.body) { new ResizeObserver(size).observe(d.body); }
    } catch (e) {}
    setTimeout(size, 250); setTimeout(size, 800);
  });
};
`;
  const dest = path.join(__dirname, 'js', 'interactives', id + '.js');
  fs.writeFileSync(dest, out);
  console.log('wrote', dest, '(' + out.length + ' bytes)');
}

build('/mnt/user-data/uploads/cold-load-pickup.html', 'coldLoadPickup', 'Cold Load Pickup \u2014 guided walkthrough');
build('/mnt/user-data/uploads/synchlab.html', 'synchLab', 'SynchLab \u2014 generator synchronizing simulator');

/* The Ferranti interactive ships in a LIGHT theme, which would read as a bright
   white card inside the dark console. It is written almost entirely against CSS
   custom properties, so remapping :root plus a handful of hardcoded surfaces
   re-themes it completely without touching the source file's markup or logic.
   Delete this block and rebuild to restore the original light appearance. */
var FERRANTI_DARK = [
  ':root{',
  '--ink:#C9D6E4;--muted:#7E8DA0;--hair:#2A3648;--panel:#121821;--field:#1A2230;',
  '--line345:#E0A83E;--line138:#56C2E6;--warn:#E0A83E;--alert:#E5484D;--ok:#3FB98C;',
  '--shadow:0 1px 2px rgba(0,0,0,.45),0 8px 28px rgba(0,0,0,.55);}',
  'body{background:transparent;color:#C9D6E4;}',
  '.seg button[aria-pressed="true"]{background:#212C3D;color:#C9D6E4;box-shadow:none;}',
  '.chip{background:#1A2230;}',
  '.chip.lit{background:#212C3D;}',
  '.pill{background:#16281F;}',
  '.gbtn{background:#1A2230;color:#C9D6E4;}',
  '.gbtn.primary{background:#56C2E6;color:#0B0F14;border-color:#56C2E6;}',
  '.gbtn.primary:hover{background:#2E6E85;color:#C9D6E4;}',
  'input[type=range]::-webkit-slider-thumb{background:#C9D6E4;border-color:#56C2E6;}',
  'input[type=range]::-moz-range-thumb{background:#C9D6E4;border-color:#56C2E6;}',
  'input[type=range]:focus-visible{box-shadow:0 0 0 3px rgba(86,194,230,.35);}',
  '.dot{stroke:#0B0F14;}'
].join('');

build('/mnt/user-data/uploads/ferranti-rise-interactive.html', 'ferrantiRise',
      'Ferranti Rise \u2014 open-end line voltage vs. length', FERRANTI_DARK);
