/* ═══════════════════════════════════════════════════════════════
   Encore AI — Navbar Component
   Single source of truth for the site navigation — buildNavbarHTML()
   is a pure function (no DOM access) so it can run both here in the
   browser and in Node (see scripts/inject-static-chrome.js, which
   requires this file to server-render the same markup into every
   static page's <div id="navbar"></div> for non-JS crawlers).
   Usage: add <div id="navbar"></div> in your HTML where the
   <header> used to be, then load this script.
   ═══════════════════════════════════════════════════════════════ */
function buildNavbarHTML(path) {
  var links = [
    { href: '../index1', label: 'Home' },
    { label: 'Product', children: [
      { href: '../ai-sre', label: 'AI SRE', desc: 'Investigate incidents to a cited root cause' },
      { href: '../ai-finops', label: 'AI FinOps', desc: 'Find and fix cloud and Kubernetes waste' },
      { href: '../kubernetes-operations', label: 'Kubernetes Operations', desc: 'Day-two Kubernetes with an AI                agent' },
      { href: '../cloudops', label: 'CloudOps', desc: 'One console across AWS, Azure and GCP' },
      { href: '../runbook-automation', label: 'Runbook Automation', desc: 'Durable, no-code runbooks with              approval gates' }
    ] },
    { href: '../pricing', label: 'Pricing' },
    // { href: '../calculator', label: 'Calculator' },
    { href: '../resources/blog', label: 'Blog' },
    { href: '../case-studies', label: 'Case Studies' },
    { href: 'https://docs.Encore AI.com/', label: 'Docs', external: true }
  ];

  function isActive(href) {
    var normalized = href.replace(/\.html$/i, '').replace(/\/+$/, '') || '/';
    if (normalized === '/' && path === '/') return true;
    if (normalized !== '/' && path === normalized) return true;
    // Blog link stays active on individual blog post pages (/resources/blog/...)
    if (normalized === '/resources/blog' && path.indexOf('/resources/blog') === 0) return true;
    // Case Studies link stays active on individual case study pages
    if (normalized === '/case-studies' && path.indexOf('/case-studies') === 0) return true;
    return false;
  }

  var navLinks = links.map(function (l) {
    if (l.children) {
      var anyActive = l.children.some(function (c) { return isActive(c.href); });
      var items = l.children.map(function (c) {
        return '<li><a href="' + c.href + '"' + (isActive(c.href) ? ' class="active"' : '') + '>'
          + '<span class="nav-dd-name">' + c.label + '</span>'
          + '<span class="nav-dd-desc">' + c.desc + '</span></a></li>';
      }).join('');
      return '<li class="nav-has-dd">'
        + '<button type="button" class="nav-dd-toggle' + (anyActive ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false">'
        + l.label
        + '<svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>'
        + '</button>'
        + '<ul class="nav-dd-menu" role="menu">' + items + '</ul>'
        + '</li>';
    }
    var ext = l.external ? ' target="_blank" rel="noopener"' : '';
    return '<li><a href="' + l.href + '"' + ext + (isActive(l.href) ? ' class="active"' : '') + '>' + l.label + '</a></li>';
  }).join('\n          ');

  var mobLinks = links.map(function (l) {
    if (l.children) {
      return l.children.map(function (c) {
        return '<a href="' + c.href + '"' + (isActive(c.href) ? ' class="active"' : '') + '>' + c.label + '</a>';
      }).join('\n      ');
    }
    var ext = l.external ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + l.href + '"' + ext + (isActive(l.href) ? ' class="active"' : '') + '>' + l.label + '</a>';
  }).join('\n      ');

  var html = ''
    + '<a href="#main" class="sr-only">Skip to main content</a>'
    + '\n  <header>'
    + '\n    <nav id="nav" role="navigation" aria-label="Main navigation">'
    + '\n      <div class="nav-inner">'
    + '\n        <a href="../index1" class="nav-logo" aria-label="Encore AI home">'
    + '\n          <svg class="nav-logo-img" viewBox="0 0 405 75" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Encore AI">'
    + '\n            <path d="M23.1028 32.4683C23.1028 32.4683 21.9369 52.2891 35.0536 66.8632C35.0536 66.8632 20.8035 70.2525 15.5242 53.455C10.7148 38.1522 23.1028 32.4683 23.1028 32.4683Z" fill="#FACF39"/>'
    + '\n            <path d="M39.3252 29.8549C39.3252 29.8549 38.3095 47.1217 49.7361 59.818C49.7361 59.818 37.3221 62.7706 32.7231 48.1374C28.5334 34.8064 39.3252 29.8549 39.3252 29.8549Z" fill="#FACF39"/>'
    + '\n            <path d="M9.25643 44.9543C9.25643 44.9543 8.46733 58.369 17.3447 68.2327C17.3447 68.2327 8.89167 68.7541 5.28457 58.7708C2.59682 51.332 9.25643 44.9543 9.25643 44.9543Z" fill="#FACF39"/>'
    + '\n            <path d="M53.0582 24.6657C53.0582 24.6657 23.7642 -12.0611 3.6519 4.11621C-16.4604 20.2935 53.0582 24.6657 53.0582 24.6657Z" fill="#FACF39"/>'
    + '\n            <path d="M63.2315 48.019C68.2474 48.019 72.3136 43.9528 72.3136 38.9369C72.3136 33.921 68.2474 29.8549 63.2315 29.8549C58.2156 29.8549 54.1494 33.921 54.1494 38.9369C54.1494 43.9528 58.2156 48.019 63.2315 48.019Z" fill="#FACF39"/>'
    + '\n            <text x="92" y="57" font-family="Arial Rounded MT Bold, Arial, Helvetica, sans-serif" font-size="55" font-weight="700" letter-spacing="-1.5" fill="#000040" stroke="#000040" stroke-width="0.8" paint-order="stroke">Encore</text>'
    + '\n            <text x="279" y="57" font-family="Arial Rounded MT Bold, Arial, Helvetica, sans-serif" font-size="55" font-weight="700" letter-spacing="-1.5" fill="#FACF39" stroke="#FACF39" stroke-width="0.8" paint-order="stroke">ai</text>'
    + '\n          </svg>'
    + '\n        </a>'
    + '\n        <ul class="nav-links" role="list">'
    + '\n          ' + navLinks
    + '\n        </ul>'
    + '\n        <div class="nav-right">'
    // TEMP: briefing CTA hidden until launch — uncomment to restore.
    // + '\n          <a href="../briefing" class="btn-ghost-sm nav-brief" data-briefing-cta>Get my briefing</a>'
    + '\n          <a href="../index" class="btn-nav">'
    + '\n            Sign In <span class="nav-arr"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg></span>'
    + '\n          </a>'
    + '\n          <button class="ham" aria-label="Open menu" onclick="toggleMenu()">'
    + '\n            <span></span><span></span><span></span>'
    + '\n          </button>'
    + '\n        </div>'
    + '\n      </div>'
    + '\n    </nav>'
    + '\n    <nav class="mob-menu" id="mobNav" aria-label="Mobile navigation">'
    + '\n      ' + mobLinks
    // TEMP: briefing CTA hidden until launch — uncomment to restore.
    // + '\n      <a href="../briefing" data-briefing-cta>Get my briefing</a>'
    + '\n      <a href="https://github.com/Encore AI/Encore AI" target="_blank" rel="noopener">GitHub Repo</a>'
    + '\n      <a href="../index" style="background:var(--yellow);color:var(--navy);text-align:center;font-weight:700;">Sign In</a>'
    + '\n    </nav>'
    + '\n  </header>';

  return html;
}

// Browser: render into <div id="navbar"> using the current page's path for
// active-state. Guarded so this file can also be `require()`d from Node
// (see scripts/inject-static-chrome.js) without `document` existing.
if (typeof document !== 'undefined') {
  (function () {
    var el = document.getElementById('navbar');
    if (!el) return;
    var path = window.location.pathname.replace(/\/index1\.html$/i, '/').replace(/\.html$/i, '').replace(/\/+$/, '') || '/';
    el.innerHTML = buildNavbarHTML(path);
  })();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { buildNavbarHTML: buildNavbarHTML };
}
