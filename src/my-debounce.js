import { setTimeout } from "timers";

let i = 1;

function add() {
  i++;
}

function myDebounce(func, duration) {
  let timer = null;
  return function() {
    if (!timer) {
      timer = setTimeout(func, duration);
    } else {
      clearTimeout(timer);
      timer = setTimeout(func, duration);
    }
  };
}

const task = setInterval(myDebounce(add, 400), 300);

setTimeout(() => {
  clearInterval(task);
  setTimeout(() => {
    console.assert(i === 2, "Unexpected");
  }, 500);
}, 2000);
