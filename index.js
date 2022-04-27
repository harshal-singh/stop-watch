"use strict";

const btn_start = document.getElementById("btn_start");
const btn_pause = document.getElementById("btn_pause");
const btn_reset = document.getElementById("btn_reset");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const miliSeconds = document.getElementById("miliSeconds");
const colons = document.querySelectorAll(".colon");

let m = 0;
let s = 0;
let ms = 0;
// let started = false;
let reseted = false;
let paused = false;
let updateTimerInterval;

function updateTimer() {
  ms++;
  if (ms === 100) {
    s++;
    ms = 0;
  }
  if (s === 60) {
    m++;
    s = 0;
  }

  minutes.innerText = m > 9 ? m : `0${m}`;
  seconds.innerText = s > 9 ? s : `0${s}`;
  miliSeconds.innerText = ms > 9 ? ms : `0${ms}`;

  reseted = false;
}

function blink(blink = true) {
  if (blink) {
    colons.forEach((colon) => {
      colon.classList.add("blink");
    });
  } else {
    colons.forEach((colon) => {
      colon.classList.remove("blink");
    });
  }
}

btn_start.onclick = () => {
  // start
  btn_start.classList.add("disabled");
  btn_start.classList.remove("enabled");
  btn_start.setAttribute("disabled", true);
  // pause
  btn_pause.classList.add("enabled");
  btn_pause.classList.remove("disabled");
  btn_pause.removeAttribute("disabled");
  // reset
  btn_reset.classList.add("enabled");
  btn_reset.classList.remove("disabled");
  btn_reset.removeAttribute("disabled");

  updateTimerInterval = setInterval(updateTimer, 10);

  blink();
};

btn_pause.onclick = () => {
  clearInterval(updateTimerInterval);

  if (!paused) {
    btn_pause.innerText = "resume";
    paused = true;
  } else {
    updateTimerInterval = setInterval(updateTimer, 10);
    btn_pause.innerText = "pause";
    paused = false;
  }

  blink(!paused);
};

btn_reset.onclick = () => {
  // start
  btn_start.classList.add("enabled");
  btn_start.classList.remove("disabled");
  btn_start.removeAttribute("disabled");
  // pause
  btn_pause.classList.add("disabled");
  btn_pause.classList.remove("enabled");
  btn_pause.setAttribute("disabled", true);
  // reset
  btn_reset.classList.add("disabled");
  btn_reset.classList.remove("enabled");
  btn_reset.setAttribute("disabled", true);

  m = 0;
  s = 0;
  ms = 0;
  if (!reseted) {
    minutes.innerText = `00`;
    seconds.innerText = `00`;
    miliSeconds.innerText = `00`;
    btn_pause.innerText = "pause";
    clearInterval(updateTimerInterval);
  }

  blink(reseted);

  paused = false;
  reseted = true;
};

const timeInterval = window.setInterval(function () {
  var date = new Date();
  if (date.getHours() === 15 && date.getMinutes() === 0) {
    btn_start.click();
    clearInterval(timeInterval);
    btn_start.textContent = "start";
  } else {
    btn_start.textContent = "checking";
  }
}, 1000);
