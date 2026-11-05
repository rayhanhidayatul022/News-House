import { readAnswers, writeAnswers } from "./components/answer-store.js";

export function initExpressionRoom({ root = document.querySelector("#expression-room"), storageKey } = {}) {
  const inputs = [...root.querySelectorAll(".expression-room__answers input")];
  const status = root.querySelector(".expression-room__save-status");
  let statusTimer;

  function getAnswers() {
    return Object.fromEntries(inputs.map((input) => [input.name, input.value]));
  }

  function showSavedStatus() {
    window.clearTimeout(statusTimer);
    status.classList.add("is-visible");
    statusTimer = window.setTimeout(() => status.classList.remove("is-visible"), 1200);
  }

  function save() {
    writeAnswers(getAnswers(), storageKey);
    showSavedStatus();
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      save();
    });
  });

  function refresh() {
    const savedAnswers = readAnswers(storageKey);
    inputs.forEach((input) => { input.value = savedAnswers[input.name] ?? ""; });
  }
  refresh();

  return { getAnswers, refresh };
}
