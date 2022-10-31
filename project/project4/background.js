const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

const chooseImages = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chooseImages}`;

document.body.appendChild(bgImage);
