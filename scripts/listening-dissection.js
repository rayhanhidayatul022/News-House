export function initListeningDissection({ onOpenExpression }) {
  const root = document.querySelector("#listening-dissection");
  const audio = root.querySelector("#listening-dissection-audio");
  const playButton = root.querySelector(".listening-dissection__play");
  const expressionButton = root.querySelector(".listening-dissection__expression");
  const status = root.querySelector(".listening-dissection__status");

  function sync() {
    const playing = !audio.paused && !audio.ended;
    playButton.classList.toggle("is-playing", playing);
    playButton.setAttribute("aria-pressed", String(playing));
    playButton.setAttribute("aria-label", playing ? "Pause audio bedah" : "Putar audio bedah");
  }

  playButton.addEventListener("click", async () => {
    if (!audio.paused && !audio.ended) {
      audio.pause();
      status.textContent = "Audio bedah dipause.";
      return;
    }
    try {
      await audio.play();
      status.textContent = "Audio bedah sedang diputar.";
    } catch {
      status.textContent = "Audio belum dapat diputar. Coba tekan lagi.";
    }
  });
  audio.addEventListener("play", sync);
  audio.addEventListener("pause", sync);
  audio.addEventListener("ended", sync);
  expressionButton.addEventListener("click", () => { audio.pause(); onOpenExpression(); });
  return { pause: () => audio.pause() };
}
