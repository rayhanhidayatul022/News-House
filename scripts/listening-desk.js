export function initListeningDesk({ onOpenDissection } = {}) {
  const root = document.querySelector("#listening-desk");
  const status = root.querySelector(".listening-desk__status");
  const tracks = {
    material: { label: "materi", audio: root.querySelector("#listening-material-audio"), button: root.querySelector('[data-listening-track="material"]') },
    example: { label: "contoh", audio: root.querySelector("#listening-example-audio"), button: root.querySelector('[data-listening-track="example"]') }
  };

  function syncControls() {
    Object.values(tracks).forEach(({ audio, button, label }) => {
      const isPlaying = !audio.paused && !audio.ended;
      button.classList.toggle("is-playing", isPlaying);
      button.setAttribute("aria-pressed", String(isPlaying));
      button.setAttribute("aria-label", `${isPlaying ? "Pause" : "Putar"} audio ${label}`);
    });
  }

  function pause(exceptKey) {
    Object.entries(tracks).forEach(([key, track]) => {
      if (key !== exceptKey) track.audio.pause();
    });
    syncControls();
  }

  async function toggle(key) {
    const track = tracks[key];
    if (!track) return;
    if (!track.audio.paused && !track.audio.ended) {
      track.audio.pause();
      status.textContent = `Audio ${track.label} dipause.`;
      syncControls();
      return;
    }
    pause(key);
    try {
      await track.audio.play();
      status.textContent = `Audio ${track.label} sedang diputar.`;
    } catch {
      status.textContent = `Audio ${track.label} belum dapat diputar. Coba tekan lagi.`;
    }
    syncControls();
  }

  Object.entries(tracks).forEach(([key, track]) => {
    track.button.addEventListener("click", () => toggle(key));
    track.audio.addEventListener("play", () => { pause(key); syncControls(); });
    track.audio.addEventListener("pause", syncControls);
    track.audio.addEventListener("ended", () => {
      status.textContent = `Audio ${track.label} selesai diputar.`;
      syncControls();
    });
  });

  root.querySelector("#listening-dissection-button").addEventListener("click", () => {
    pause();
    onOpenDissection?.();
  });

  return { pause: () => pause() };
}
