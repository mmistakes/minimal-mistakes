// /* assets/js/custom/dark-theme.js */
// const defaultTheme = [...document.styleSheets].find((style) =>
//   /(main.css)$/.test(style.href)
// );
// const darkTheme = [...document.styleSheets].find((style) =>
//   /(main_dark.css)$/.test(style.href)
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

function switchTheme(e) {
  console.log(51, e.target.checked);
  if (e.target.checked) {
    console.log(53, e.target.checked);
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    console.log(54, e.target.checked);
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
  console.log(62, currentTheme);
}

toggleSwitch.addEventListener("change", switchTheme, false);
