const title = document.querySelector("div.hello h1");

function handleTitleClick() {
  console.log("title was clicked!");
}

title.addEventListener("click", handleTitleClick);
