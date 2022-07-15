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
const commentBody = document.querySelector(".sans-serif");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    commentBody.classList.remove("light");
    commentBody.classList.add("darkBox");
    const dark = document.querySelector(".darkBox");
    dark.style.color = "#fafafa";
    console.log(59, dark);
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    commentBody.classList.remove("darkBox");
    commentBody.classList.add("lightBox");
    const light = document.querySelector(".lightBox");
    light.style.color = "#252a34";
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
