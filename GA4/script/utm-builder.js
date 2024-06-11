window.addEventListener('DOMContentLoaded', eventHandler)

function eventHandler() {
  clickGA4CookieRemoveBtn();
  submitUtmForm();
}

function submitUtmForm() {
  document.querySelector("#utm_creat_form").addEventListener("submit", createUtmBtn);
}

function getUtmFormValue() {
  const basicURL = encodeURI("https://cherrylime69.github.io/");
  let finalURL = '';
  const formValues = Array
    .from(document.querySelectorAll("#utm_creat_form input"))
    .filter(ele => !ele.id.includes("btn") && ele.value != '')
    .map(ele => ele.id + "=" + ele.value)
    .join("&");
  finalURL = formValues ? "?" + formValues : '';

  return basicURL + finalURL;
}

function createUtmBtn(event) {
  event.preventDefault();
  document.querySelector("#created_utm_btn").setAttribute("href", getUtmFormValue());
}

function deleteCookie(name) {
  var domainParts = window.location.hostname.split('.');
  var pathArray = window.location.pathname.split('/');
  var date = new Date(0).toUTCString();

  // 시도할 도메인과 경로 조합 배열
  var domainCombinations = domainParts.map((part, index) => domainParts.slice(index).join('.'));
  var pathCombinations = pathArray.map((part, index) => pathArray.slice(0, index + 1).join('/'));

  // 빈 경로 추가
  pathCombinations.push('');

  // 모든 조합 시도
  domainCombinations.forEach(domain => {
    pathCombinations.forEach(path => {
      document.cookie = `${name}=; path=${path}; domain=${domain}; expires=${date};`;
    });
  });

  // 현재 도메인에 대한 최종 삭제 시도
  document.cookie = `${name}=; expires=${date}; path=/;`;
}

function getGA4Cookie() {
  const cookies = document.cookie.split(";")
    .filter(name => name.includes("_ga") || name.includes("_gl") || name.includes("_gcl"))
    .map(ele => ele.split("=")[0]);
  return cookies;
}

function deleteGA4Cookie() {
  const GA4Cookie = getGA4Cookie();
  GA4Cookie.forEach(cookie => deleteCookie(cookie))
}

function clickGA4CookieRemoveBtn() {
  document.querySelector("#cookie_remover_btn").addEventListener("click", deleteGA4Cookie)
}