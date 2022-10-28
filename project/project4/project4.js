const loginForm = document.querySelector("#login-form")
const loginInput= document.querySelector("#login-form input")
const greeting = document.querySelector("#greeting")
const HIDDEN_CLASSNAME = "hideen";


function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  greeting.innerText = "hello" + username;
  greeting.classList.remove(HIDDEN_CLASSNAME)
}

loginForm.addEventListener("submit", onLoginSubmit);
