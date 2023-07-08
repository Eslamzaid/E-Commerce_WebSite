const h1 = document.querySelector("#LogName");
const cr = document.querySelector(".crazy");

let counter = 1;
function makeItPretty(h) {
  let ran = Math.floor(Math.random() * 255);
  let ran2 = Math.floor(Math.random() * 255);
  let ran3 = Math.floor(Math.random() * 255);

  if (parseInt(cr.style.left, 10) == 800) {
    cr.style.left = "200px";
    counter = 0;
  }

  cr.style.left = `${counter}00px`;
  counter++;
  h.style.color = `rgb(${ran}, ${ran2}, ${ran3})`;
}

setInterval(() => {
  makeItPretty(h1);
}, 1000);
