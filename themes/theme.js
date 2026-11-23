/* Mockup theme switch: Light / Dark / Auto (follows the OS). Choice persists per browser.
   Colors themselves live only in themes/default.css. */
(function () {
  var KEY = 'wwTheme';
  var root = document.documentElement;
  function read() { try { return localStorage.getItem(KEY) || 'auto'; } catch (e) { return 'auto'; } }
  function apply(mode) {
    if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode);
    else root.removeAttribute('data-theme');
  }
  apply(read());
  document.addEventListener('DOMContentLoaded', function () {
    var box = document.createElement('div');
    box.className = 'theme-switch';
    ['light', 'dark', 'auto'].forEach(function (m) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = m.charAt(0).toUpperCase() + m.slice(1);
      b.onclick = function () {
        try { localStorage.setItem(KEY, m); } catch (e) {}
        apply(m);
        mark();
      };
      b.dataset.mode = m;
      box.appendChild(b);
    });
    function mark() {
      var cur = read();
      box.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b.dataset.mode === cur); });
    }
    mark();
    document.body.appendChild(box);
  });
})();
