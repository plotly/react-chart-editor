const DEBOUNCE_DELAY = 250;
let timeout;

function clearTimeout() {
  window.clearTimeout(timeout);
  timeout = null;
}

export default function debounce(fn, args) {
  if (timeout) {
    clearTimeout();
  }

  timeout = window.setTimeout(() => {
    fn.apply(null, args);
    timeout = null;
  }, DEBOUNCE_DELAY);
}
