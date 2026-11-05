import { ANSWER_FIELDS, readAnswers, writeAnswers } from "./components/answer-store.js";

export function initRevisionRoom({ root = document.querySelector("#revision-room"), storageKey } = {}) {
  const inputs = [...root.querySelectorAll(".revision-room__answers input")];
  const status = root.querySelector(".revision-room__save-status");
  let statusTimer;

  function getAnswers() {
    return Object.fromEntries(ANSWER_FIELDS.map((field) => {
      const input = inputs.find((item) => item.name === field);
      return [field, input?.value ?? ""];
    }));
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

  function refresh() {
    const answers = readAnswers(storageKey);
    inputs.forEach((input) => { input.value = answers[input.name] ?? ""; });
  }

  inputs.forEach((input) => input.addEventListener("input", save));
  refresh();

  return { getAnswers, refresh };
}
