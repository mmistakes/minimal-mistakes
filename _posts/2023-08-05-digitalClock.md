---
layout: single
title: "Digital Clock Project Process"
categories: project
tags: [html, css, javaScript]
author_profile: false
search: true
---

### Frame

#### Build frame

Build frame for digital clock

```html
<h1 id="monthAndYear">month and year</h1>
<h1 id="date">date</h1>
<div class="time">
  <div id="hour12Box">
    <h1 id="hoursFor12">12</h1>
    <p>hours</p>
  </div>
  <div id="hour24Box">
    <h1 id="hoursFor24">12</h1>
    <p>hours</p>
  </div>
  <div id="minute">
    <h1 id="minutes">00</h1>
    <p>minutes</p>
  </div>
  <div id="second">
    <h1 id="seconds">00</h1>
    <p>seconds</p>
  </div>
  <h1 id="ampm">am</h1>
</div>
<div id="toggleButton"></div>
```

### Code

#### Variables

for date format

```javascript
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daylist = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
```

get today's day

```javascript
var today = new Date();
var year = today.getFullYear();
var months = month[today.getMonth()];
var date = today.getDate();
var day = daylist[today.getDay()];
var hoursFor24 = today.getHours();
```

for 12 hour clock

```javascript
var hoursFor12 = today.getHours();
var amPm = hoursFor12 >= 12 ? "PM" : "AM";
hoursFor12 = hoursFor12 >= 12 ? hoursFor12 - 12 : hoursFor12;
if (hoursFor12 === 0) {
  hoursFor12 = "00";
} else if (hoursFor12 < 10) {
  hoursFor12 = "0" + hoursFor12;
}

var minutes = today.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

var seconds = today.getSeconds();
if (seconds < 10) {
  seconds = "0" + seconds;
}
```

#### Assign

assign today's day to the frame

```javascript
document.getElementById("monthAndYear").innerHTML =
  months + " " + date + ", " + year;
document.getElementById("date").innerHTML = day;
document.getElementById("hoursFor12").innerHTML = hoursFor12;
document.getElementById("hoursFor24").innerHTML = hoursFor24;
document.getElementById("minutes").innerHTML = minutes;
document.getElementById("seconds").innerHTML = seconds;
document.getElementById("ampm").innerHTML = amPm;
```

#### Toggle

Add toggle button

```javascript
const toggle = document.createElement("button");
document.getElementById("toggleButton").appendChild(toggle);
toggle.textContent = "24-hr";
let isToggled = false;

toggle.addEventListener("click", function () {
  isToggled = !isToggled;
  if (isToggled) {
    toggle.innerHTML = "12-hr";
    document.getElementById("ampm").style.display = "none";
    document.getElementById("hour12Box").style.display = "none";
    document.getElementById("hour24Box").style.display = "";
  } else {
    toggle.innerHTML = "24-hr";
    document.getElementById("ampm").style.display = "";
    document.getElementById("hour12Box").style.display = "";
    document.getElementById("hour24Box").style.display = "none";
  }
});
```

and need to wrap

```javascript
var x = setInterval(function() {
.
.
.

})
```
