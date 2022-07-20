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

const disqusColorReload = () => {
  var d = document,
    s = d.createElement("script");
  s.src = "https://SITE_URL.disqus.com/embed.js"; // Replace SITE_URL with your site's URL
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);
};

const localStorageSetting = (key, removeType, setType) => {
  localStorage.removeItem(key, removeType);
  localStorage.setItem(key, setType);
};
const switchTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorageSetting("theme", "light", "dark");
    disqusColorReload();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorageSetting("theme", "dark", "light");
    disqusColorReload();
  }
};

toggleSwitch.addEventListener("change", switchTheme, false);

window.addEventListener("load", function () {
  const setMode = dateValidDarkMode() ? "light" : "dark";
  const removeMode = setMode === "light" ? "dark" : "light";
  localStorageSetting("theme", removeMode, setMode);
  document.documentElement.setAttribute("data-theme", setMode);
  console.log(50, localStorage.getItem("theme"), removeMode, setMode);
});
