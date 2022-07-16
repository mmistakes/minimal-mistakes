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
const commentBody = document.querySelector(".sans-serif");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function commentDarkMode(removeType, addType, colorType) {
  console.log(52, commentBody);
  if (commentBody) {
    commentBody.classList.remove(removeType);
    commentBody.classList.add(addType);
    const styleType = document.querySelector(`.${addType}`);
    console.log(56, styleType);
    styleType.style.color = colorType;
  }
}

function localStorageSetting(key, value) {
  localStorage.removeItem(key, value);
  localStorage.setItem(key, value);
}
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    commentDarkMode("lightBox", "darkBox", "#fafafa");
    localStorageSetting("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    commentDarkMode("darkBox", "lightBox", "#252a34");
    localStorageSetting("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
