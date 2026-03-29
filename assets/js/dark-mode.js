document.addEventListener('DOMContentLoaded', function () {
  var btn = document.createElement('button');
  btn.id = 'dark-mode-toggle';
  btn.className = 'dark-mode-toggle';

  var isDark = document.documentElement.classList.contains('dark-mode');
  btn.textContent = isDark ? '☀ Light Mode' : '☾ Dark Mode';

  btn.addEventListener('click', function () {
    var nowDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', nowDark);
    btn.textContent = nowDark ? '☀ Light Mode' : '☾ Dark Mode';
  });

  var anchor = document.querySelector('.author__urls-wrapper');
  if (anchor) {
    anchor.insertAdjacentElement('afterend', btn);
  }
});
