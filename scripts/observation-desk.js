export function initObservationDesk({ onOpenExample, onOpenDissection, onOpenExampleDissection }) {
  const video = document.querySelector("#observation-video");
  const exampleVideo = document.querySelector("#observation-example-video");
  const exampleButton = document.querySelector("#observation-example-button");
  const dissectionButton = document.querySelector("#observation-dissection-button");
  const exampleDissectionButton = document.querySelector("#observation-example-dissection-button");

  function pause() { video.pause(); exampleVideo.pause(); }
  function reset() { pause(); video.currentTime = 0; }
  function resetExample() { pause(); exampleVideo.currentTime = 0; }

  exampleButton.addEventListener("click", () => { pause(); onOpenExample(); });
  dissectionButton.addEventListener("click", () => { pause(); onOpenDissection(); });
  exampleDissectionButton.addEventListener("click", () => { pause(); onOpenExampleDissection(); });
  return { pause, reset, resetExample };
}
