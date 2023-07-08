const h1 = document.querySelector("#LogName");

function makeItPretty(h) {
  let ran = Math.floor(Math.random() * 255);
  let ran2 = Math.floor(Math.random() * 255);
  let ran3 = Math.floor(Math.random() * 255);
  h.style.color = `rgb(${ran}, ${ran2}, ${ran3})`;
}

setInterval(() => {
  makeItPretty(h1);
}, 1000);
