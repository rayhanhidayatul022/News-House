import { createTypewriter } from "./components/typewriter.js";

const targets = ["Menemukan unsur 5W+1H", "Menganalisis informasi penting dalam berita"];
const steps = [
  { title: "Halo, Detektif Berita!", text: "Selamat datang di News House.\nHari ini kamu akan menjalankan sebuah misi: membongkar sebuah teks berita dan menemukan informasi penting di dalamnya." },
  { title: "Target Kamu", text: "Dalam misi ini, kamu diharapkan mampu:" },
  { title: "Pesan dari Redaksi", text: "Sebuah berita telah masuk ke News House.\nRedaksi membutuhkan bantuanmu untuk menemukan:" }
];
const newsElements = ["Siapa", "Apa", "Kapan", "Di Mana", "Mengapa", "Bagaimana"];

export function initOnboarding({ onHome, onMission, onTypingStart = () => {}, onTypingStop = () => {} }) {
  const root = document.querySelector("#onboarding");
  const paper = document.querySelector("#briefing-paper");
  const title = document.querySelector("#briefing-title");
  const copy = document.querySelector("#briefing-copy");
  const extras = document.querySelector("#briefing-extras");
  const previous = document.querySelector("#previous-button");
  const next = document.querySelector("#next-button");
  const progress = document.querySelector("#progress");
  const dots = [...progress.querySelectorAll("i")];
  const typewriter = createTypewriter();
  let step = 0;
  let isTyping = false;
  let transitionTimer = null;

  function clearTimer() {
    typewriter.clear();
    onTypingStop();
    if (transitionTimer !== null) window.clearTimeout(transitionTimer);
    transitionTimer = null;
    isTyping = false;
  }

  function updateNavigation() {
    previous.disabled = step === 0;
    progress.setAttribute("aria-label", `Langkah ${step + 1} dari 3`);
    dots.forEach((dot, index) => dot.classList.toggle("active", index === step));
    next.classList.toggle("mission-button", step === 2);
    next.innerHTML = step === 2 ? '<span class="sr-only">BUKA MISI</span>' : '<span class="sr-only">Tahap selanjutnya</span>';
    next.setAttribute("aria-label", step === 2 ? "Buka misi" : isTyping ? "Tampilkan seluruh teks" : "Tahap selanjutnya");
  }

  function renderComplete() {
    clearTimer();
    copy.textContent = steps[step].text;
    if (step === 1) extras.innerHTML = `<ol class="targets" aria-label="Target misi">${targets.map((target, index) => `<li><span class="number">${index + 1}</span><span>${target}</span></li>`).join("")}</ol>`;
    else if (step === 2) extras.innerHTML = `<div class="chips" aria-label="Unsur berita">${newsElements.map((item) => `<span>${item}</span>`).join("")}</div>`;
    else extras.innerHTML = "";
    updateNavigation();
  }

  function renderTargets() {
    extras.innerHTML = '<ol class="targets" aria-label="Target misi"></ol>';
    const list = extras.querySelector(".targets");
    const renderItem = (index) => {
      if (index >= targets.length) { onTypingStop(); isTyping = false; updateNavigation(); return; }
      const item = document.createElement("li");
      const badge = document.createElement("span");
      const text = document.createElement("span");
      badge.className = "number";
      badge.textContent = String(index + 1);
      item.append(badge, text);
      list.append(item);
      typewriter.type(text, targets[index], () => {
        transitionTimer = window.setTimeout(() => {
          transitionTimer = null;
          renderItem(index + 1);
        }, 350);
      });
    };
    renderItem(0);
  }

  function renderNewsElements() {
    extras.innerHTML = `<div class="chips" aria-label="Unsur berita">${newsElements.map((item) => `<span>${item}</span>`).join("")}</div>`;
  }

  function showStep() {
    clearTimer();
    title.textContent = steps[step].title;
    copy.textContent = "";
    extras.innerHTML = "";
    paper.dataset.step = String(step);
    isTyping = true;
    updateNavigation();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { renderComplete(); return; }
    onTypingStart();
    typewriter.type(copy, steps[step].text, () => {
      if (step === 1) renderTargets();
      else {
        onTypingStop();
        if (step === 2) renderNewsElements();
        isTyping = false;
        updateNavigation();
      }
    });
  }

  function open() { root.hidden = false; step = 0; showStep(); document.querySelector("#home-button").focus(); }
  function close() { clearTimer(); onHome(); }

  next.addEventListener("click", () => {
    if (isTyping) { renderComplete(); return; }
    if (step === 2) { clearTimer(); onMission(); return; }
    if (step < steps.length - 1) { step += 1; showStep(); }
    else onMission();
  });
  previous.addEventListener("click", () => { if (step > 0) { step -= 1; showStep(); } });
  document.querySelector("#home-button").addEventListener("click", close);
  document.addEventListener("keydown", (event) => { if (!root.hidden && event.key === "Escape") close(); });
  return { open, close };
}
