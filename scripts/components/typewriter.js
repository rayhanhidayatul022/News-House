export function createTypewriter({ delay = 25 } = {}) {
  let timeoutId = null;
  let activeElement = null;
  function clear() {
    if (timeoutId !== null) window.clearTimeout(timeoutId);
    if (activeElement) activeElement.classList.remove("typing");
    timeoutId = null;
    activeElement = null;
  }
  function type(element, text, onComplete = () => {}) {
    clear(); activeElement = element; element.textContent = ""; element.classList.add("typing"); let index = 0;
    const tick = () => { if (index >= text.length) { element.classList.remove("typing"); activeElement = null; onComplete(); return; } element.textContent += text[index++]; timeoutId = window.setTimeout(tick, delay); };
    tick();
  }
  return { type, clear };
}
