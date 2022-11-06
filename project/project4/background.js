const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

const chosenImages = images[Math.floor(Math.random() * images.length)];

// const backgroundImage = document.createElement("img");

// backgroundImage.src = `img/${chooseImages}`;
// document.body.appendChild(backgroundImage);
// document.body.backgroundImage.url =

const body = document.querySelector("body");

body.style.backgroundImage = `url(img/${chosenImages})`;
