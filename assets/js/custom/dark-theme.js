// /* assets/js/custom/dark-theme.js */
// const defaultTheme = [...document.styleSheets].find((style) =>
//   /(main.css)$/.(style.href)
// );
// const darkTheme = [...document.styleSheets].find((style) =>
//   /(main_dark.css)$/.(style.href)
// );

// let setDarkMode = (isDark) => {
//   darkTheme.disabled = isDark !== true;
//   defaultTheme.disabled = isDark === true;
//   localStorage.setItem("theme", isDark ? "dark" : "default");
// };

// if (darkTheme) {
//   let currentTheme = localStorage.getItem("theme");
//   let isDarkMode = false;
//   if (currentTheme) {
//     isDarkMode = currentTheme === "dark";
//   } else {
//     isDarkMode = matchMedia("(prefers-color-scheme: dark)").matches;
//   }

//   setDarkMode(isDarkMode);

//   let toggleThemeBtn = document.querySelector("#toggle_dark_theme");
//   console.log(toggleThemeBtn);
//   if (toggleThemeBtn) {
//     toggleThemeBtn.checked = isDarkMode;
//   }

//   let changeTheme = (e) => {
//     console.log(32, e);
//     setDarkMode(e.target.checked);
//   };

//   toggleThemeBtn.addEventListener("click", changeTheme);
// }
/* _includes/masthead.html */
const toggleSwitch = document.querySelector("#toggle_dark_theme");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function disqusColorReload() {
  var d = document,
    s = d.createElement("script");
  s.src = "https://SITE_URL.disqus.com/embed.js"; // Replace SITE_URL with your site's URL
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);
}

function localStorageSetting(key, value) {
  localStorage.removeItem(key, value);
  localStorage.setItem(key, value);
}
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorageSetting("theme", "dark");
    disqusColorReload();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorageSetting("theme", "light");
    disqusColorReload();
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
