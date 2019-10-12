let i = 0;
function console1() {
  i++;
  console.warn(1);
}

function myThrottle(func, duration) {
  let ready = true;
  return () => {
    if (ready) {
      func();
      ready = false;
      setTimeout(() => {
        ready = true;
      }, duration);
    }
  };
}

const task = setInterval(myThrottle(console1, 1000), 200);

setTimeout(() => {
  clearInterval(task);
  console.assert(i === 3, "Unexpected");
}, 2400);
