/* _includes/masthead.html */
const toggleSwitch = document.querySelector("#toggle_dark_theme");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

const dateValidDarkMode = () => {
  const today = new Date();
  const hours = today.getHours(); // 시

  return 6 < hours < 22;
};

const localStorageSetting = (key, removeType, setType) => {
  localStorage.removeItem(key, removeType);
  localStorage.setItem(key, setType);
};
const switchTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorageSetting("theme", "light", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorageSetting("theme", "dark", "light");
  }
};

toggleSwitch.addEventListener("change", switchTheme, false);

window.addEventListener("DOMContentLoaded", function () {
  const mode = localStorage.getItem("theme");
  if (mode) {
    toggleSwitch.checked = mode === "dark";
  } else {
    toggleSwitch.checked = true;
    document.documentElement.setAttribute("data-theme", "dark");
  }
});
