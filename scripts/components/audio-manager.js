export function initAudioManager() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audioContext = AudioContextClass ? new AudioContextClass() : null;
  const music = new Audio("assets/audio/background-music.mp3");
  const fallbackClick = new Audio("assets/audio/button-click.mp3");
  const effects = { keyboard: new Audio("assets/audio/keyboard-typing.mp3"), success: new Audio("assets/audio/success.mp3") };
  let isEnabled = true;

  music.loop = true;
  music.preload = "auto";
  music.volume = .1;
  fallbackClick.preload = "auto";
  fallbackClick.volume = 1;
  effects.keyboard.preload = "auto";
  effects.keyboard.loop = true;
  effects.keyboard.volume = .45;
  effects.success.preload = "auto";
  effects.success.volume = .85;

  const clickBuffer = audioContext
    ? fetch("assets/audio/button-click.mp3")
      .then((response) => response.arrayBuffer())
      .then((data) => audioContext.decodeAudioData(data))
      .catch(() => null)
    : Promise.resolve(null);

  const control = document.createElement("button");
  const controlImage = document.createElement("img");
  control.className = "audio-toggle";
  control.type = "button";
  control.append(controlImage);
  document.body.append(control);

  function updateControl() {
    control.setAttribute("aria-pressed", String(isEnabled));
    control.setAttribute("aria-label", isEnabled ? "Matikan audio" : "Nyalakan audio");
    control.title = isEnabled ? "Matikan audio" : "Nyalakan audio";
    controlImage.src = isEnabled ? "assets/images/button/sound-on.png" : "assets/images/button/sound-off.png";
    controlImage.alt = "";
  }

  function startMusic() {
    if (!isEnabled) return;
    music.play().catch(() => {});
  }

  async function playClick() {
    if (!isEnabled) return;

    if (!audioContext) {
      const sound = fallbackClick.cloneNode();
      sound.volume = 1;
      sound.play().catch(() => {});
      return;
    }

    await audioContext.resume().catch(() => {});
    const buffer = await clickBuffer;
    if (!buffer) return;

    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    source.buffer = buffer;
    gain.gain.value = 2;
    source.connect(gain).connect(audioContext.destination);
    source.start();
  }

  function stopEffect(name) {
    const effect = effects[name];
    if (!effect) return;
    effect.pause();
    effect.currentTime = 0;
  }

  function playEffect(name) {
    const effect = effects[name];
    if (!isEnabled || !effect) return;
    stopEffect(name);
    effect.play().catch(() => {});
  }

  function stopAllEffects() {
    Object.keys(effects).forEach(stopEffect);
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button, .button-link");
    if (button && !button.disabled) playClick();
  }, true);

  control.addEventListener("click", () => {
    isEnabled = !isEnabled;
    if (isEnabled) {
      startMusic();
      playClick();
    } else {
      music.pause();
      stopAllEffects();
    }
    updateControl();
  });

  const unlockAudio = () => {
    if (audioContext) audioContext.resume().catch(() => {});
    startMusic();
    document.removeEventListener("pointerdown", unlockAudio, true);
    document.removeEventListener("keydown", unlockAudio, true);
  };

  document.addEventListener("pointerdown", unlockAudio, true);
  document.addEventListener("keydown", unlockAudio, true);
  updateControl();
  startMusic();
  return { playEffect, stopEffect };
}
