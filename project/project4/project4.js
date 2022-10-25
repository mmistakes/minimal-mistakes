const title = document.querySelector("div.hello h1")

function handleTitleClick() {
  title.style.color = "blue";
}

title.addEventListener("click", handleTitleClick) 