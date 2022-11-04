const API_KEY = "d97deb5c802bd7af64dd6da1a2ded70f";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      weather.innerText = `${data.weather[0].main}/${data.main.temp}`;
      city.innerText = data.name;
    });
}

function onGeoError() {
  alert("Cant' find you. no weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
