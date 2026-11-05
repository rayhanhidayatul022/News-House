import { initLanding } from "./landing.js";
import { initOnboarding } from "./onboarding.js?v=20261102-1";
import { initReadingDesk } from "./reading-desk.js?v=20261101-2";
import { initObservationDesk } from "./observation-desk.js?v=20261105-2";
import { initListeningDesk } from "./listening-desk.js?v=20261105-1";
import { initListeningDissection } from "./listening-dissection.js?v=20261105-1";
import { initAudioManager } from "./components/audio-manager.js?v=20261102-1";
import { initExpressionRoom } from "./expression-room.js?v=20261101-2";
import { initRevisionRoom } from "./revision-room.js?v=20261105-2";

const app = document.querySelector("#app");
const pageMarkup = await Promise.all([
  fetch("pages/landing.html").then((response) => response.text()),
  fetch("pages/onboarding.html").then((response) => response.text()),
  fetch("pages/editorial-room.html").then((response) => response.text()),
  fetch("pages/reading-desk.html").then((response) => response.text()),
  fetch("pages/observation-desk.html?v=20261105-5").then((response) => response.text()),
  fetch("pages/listening-desk.html?v=20261105-1").then((response) => response.text()),
  fetch("pages/dissection-room.html").then((response) => response.text()),
  fetch("pages/observation-dissection.html?v=20261105-3").then((response) => response.text()),
  fetch("pages/listening-dissection.html?v=20261105-1").then((response) => response.text()),
  fetch("pages/expression-room.html?v=20261101-2").then((response) => response.text()),
  fetch("pages/observation-expression.html?v=20261105-1").then((response) => response.text()),
  fetch("pages/listening-expression.html?v=20261105-1").then((response) => response.text()),
  fetch("pages/revision-room.html?v=20261101-4").then((response) => response.text()),
  fetch("pages/observation-revision.html?v=20261105-1").then((response) => response.text()),
  fetch("pages/listening-revision.html?v=20261105-1").then((response) => response.text()),
  fetch("pages/answer-room.html?v=20261101-2").then((response) => response.text()),
  fetch("pages/mission-room.html?v=20261102-2").then((response) => response.text()),
  fetch("pages/reading-mission.html?v=20261102-2").then((response) => response.text()),
  fetch("pages/observation-mission.html?v=20261105-2").then((response) => response.text()),
  fetch("pages/listening-mission.html?v=20261105-1").then((response) => response.text())
]);
app.innerHTML = pageMarkup.join("");

const landing = document.querySelector("#landing");
const onboardingRoot = document.querySelector("#onboarding");
const editorialRoom = document.querySelector("#editorial-room");
const deskPages = [...document.querySelectorAll(".desk-page")];
const dissectionRoom = document.querySelector("#dissection-room");
const observationDissectionRoom = document.querySelector("#observation-dissection");
const listeningDissectionRoom = document.querySelector("#listening-dissection");
const expressionRoom = document.querySelector("#expression-room");
const observationExpressionRoom = document.querySelector("#observation-expression-room");
const listeningExpressionRoom = document.querySelector("#listening-expression-room");
const revisionRoom = document.querySelector("#revision-room");
const observationRevisionRoom = document.querySelector("#observation-revision-room");
const listeningRevisionRoom = document.querySelector("#listening-revision-room");
const answerRoom = document.querySelector("#answer-room");
const missionRoom = document.querySelector("#mission-room");
const missionDetailPages = [...document.querySelectorAll(".mission-detail")];
const missionCards = [...missionRoom.querySelectorAll(".mission-card")];
const revisionLock = revisionRoom.querySelector("#revision-lock");
const revisionLockForm = revisionRoom.querySelector("#revision-lock-form");
const revisionLockInput = revisionRoom.querySelector("#revision-lock-password");
const revisionLockError = revisionRoom.querySelector("#revision-lock-error");
const observationRevisionLock = observationRevisionRoom.querySelector("#observation-revision-lock");
const observationRevisionLockForm = observationRevisionRoom.querySelector("#observation-revision-lock-form");
const observationRevisionLockInput = observationRevisionRoom.querySelector("#observation-revision-lock-password");
const observationRevisionLockError = observationRevisionRoom.querySelector("#observation-revision-lock-error");
const listeningRevisionLock = listeningRevisionRoom.querySelector("#listening-revision-lock");
const listeningRevisionLockForm = listeningRevisionRoom.querySelector("#listening-revision-lock-form");
const listeningRevisionLockInput = listeningRevisionRoom.querySelector("#listening-revision-lock-password");
const listeningRevisionLockError = listeningRevisionRoom.querySelector("#listening-revision-lock-error");
const readingDesk = initReadingDesk({
  onOpenDissection: () => changeScene(() => showDissectionRoom("reading-desk"))
});
const observationDesk = initObservationDesk({
  onOpenExample: () => changeScene(() => showDeskPage("observation-example")),
  onOpenDissection: () => changeScene(() => showObservationDissection("observation-desk")),
  onOpenExampleDissection: () => changeScene(() => showObservationDissection("observation-example"))
});
const listeningDesk = initListeningDesk({
  onOpenDissection: () => changeScene(showListeningDissection)
});
const listeningDissection = initListeningDissection({
  onOpenExpression: () => changeScene(showListeningExpressionRoom)
});
const expressionState = initExpressionRoom();
const observationExpressionState = initExpressionRoom({
  root: observationExpressionRoom,
  storageKey: "news-house.observation-expression-answers.v1"
});
const listeningExpressionState = initExpressionRoom({
  root: listeningExpressionRoom,
  storageKey: "news-house.listening-expression-answers.v1"
});
const revisionState = initRevisionRoom();
const observationRevisionState = initRevisionRoom({
  root: observationRevisionRoom,
  storageKey: "news-house.observation-expression-answers.v1"
});
const listeningRevisionState = initRevisionRoom({
  root: listeningRevisionRoom,
  storageKey: "news-house.listening-expression-answers.v1"
});
const audioManager = initAudioManager();
const readingMission = document.querySelector("#reading-mission");
const observationMissionVideo = document.querySelector("#observation-mission-video");
const readingSuccess = readingMission.querySelector("#reading-success");
const completeReadingMission = readingMission.querySelector("#complete-reading-mission");
const continueReadingMission = readingSuccess.querySelector(".reading-success__continue");
const observationMission = document.querySelector("#observation-mission");
const observationSuccess = observationMission.querySelector("#observation-success");
const completeObservationMission = observationMission.querySelector("#complete-observation-mission");
const continueObservationMission = observationSuccess.querySelector(".observation-success__continue");
const listeningMission = document.querySelector("#listening-mission");
const listeningMissionAudio = listeningMission.querySelector("#listening-mission-audio");
const listeningMissionAudioControl = listeningMission.querySelector("#listening-mission-audio-control");
const listeningSuccess = listeningMission.querySelector("#listening-success");
const completeListeningMission = listeningMission.querySelector("#complete-listening-mission");
const continueListeningMission = listeningSuccess.querySelector(".listening-success__continue");

const transitionOverlay = document.createElement("div");
transitionOverlay.className = "scene-transition";
transitionOverlay.setAttribute("aria-hidden", "true");
document.body.append(transitionOverlay);

let isTransitioning = false;
let pendingScene = null;
const MISSION_PROGRESS_KEY = "newsHouseVisitedDesks";
const visitedDesksMemory = new Set();
let lastDissectionDesk = "reading-desk";
let lastObservationDissectionDesk = "observation-desk";
let lastRevisionType = "reading";
const observationDissectionVideo = observationDissectionRoom.querySelector("#observation-dissection-video");

function readVisitedDesks() {
  try {
    const value = JSON.parse(window.localStorage.getItem(MISSION_PROGRESS_KEY) ?? "[]");
    return new Set([...(Array.isArray(value) ? value : []), ...visitedDesksMemory]);
  } catch {
    return new Set(visitedDesksMemory);
  }
}

function markDeskVisited(pageId) {
  const visited = readVisitedDesks();
  visited.add(pageId);
  visitedDesksMemory.add(pageId);
  try {
    window.localStorage.setItem(MISSION_PROGRESS_KEY, JSON.stringify([...visited]));
  } catch {
    // Desk navigation must still work when browser storage is unavailable.
  }
}

function refreshMissionCards() {
  const visited = readVisitedDesks();
  missionCards.forEach((card) => {
    const unlocked = visited.has(card.dataset.missionDesk);
    const image = card.querySelector("img");
    card.dataset.unlocked = String(unlocked);
    card.setAttribute("aria-disabled", String(!unlocked));
    card.classList.toggle("is-unlocked", unlocked);
    image.src = unlocked ? image.dataset.activeSrc : image.dataset.lockedSrc;
    card.setAttribute("aria-label", `${unlocked ? "Buka" : "Terkunci:"} ${image.alt}`);
  });
}

function hideMissionDetailPages() {
  missionDetailPages.forEach((page) => { page.hidden = true; });
  observationDissectionVideo.pause();
  listeningDissection.pause();
  observationMissionVideo.pause();
  listeningMissionAudio.pause();
  observationDissectionRoom.hidden = true;
  observationExpressionRoom.hidden = true;
  observationRevisionRoom.hidden = true;
  listeningDissectionRoom.hidden = true;
  listeningExpressionRoom.hidden = true;
  listeningRevisionRoom.hidden = true;
}

function playSceneEntry(scene) {
  scene.classList.remove("scene-entering");
  void scene.offsetWidth;
  scene.classList.add("scene-entering");
  window.setTimeout(() => scene.classList.remove("scene-entering"), 700);
}

function changeScene(render) {
  if (isTransitioning) {
    pendingScene = render;
    return;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    render();
    return;
  }

  isTransitioning = true;
  transitionOverlay.className = "scene-transition is-covering";
  window.setTimeout(() => {
    render();
    transitionOverlay.className = "scene-transition is-revealing";
    window.setTimeout(() => {
      transitionOverlay.className = "scene-transition";
      isTransitioning = false;
      if (pendingScene) {
        const nextScene = pendingScene;
        pendingScene = null;
        changeScene(nextScene);
      }
    }, 580);
  }, 390);
}

function showLanding() {
  hideMissionDetailPages();
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  landing.hidden = false;
  playSceneEntry(landing);
}

function showEditorialRoom() {
  hideMissionDetailPages();
  onboardingRoot.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  editorialRoom.hidden = false;
  playSceneEntry(editorialRoom);
}

function showDeskPage(pageId) {
  const targetPage = document.querySelector(`#${pageId}`);
  if (!targetPage) return;
  if (pageId === "reading-desk") readingDesk.reset();
  if (pageId === "observation-desk") observationDesk.reset();
  if (pageId === "observation-example") observationDesk.resetExample();
  if (pageId !== "observation-example") markDeskVisited(pageId);
  hideMissionDetailPages();
  editorialRoom.hidden = true;
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = page !== targetPage; });
  targetPage.hidden = false;
  playSceneEntry(targetPage);
  targetPage.querySelector(".desk-page__back").focus();
}

function showDissectionRoom(sourceDesk = lastDissectionDesk) {
  lastDissectionDesk = sourceDesk;
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  dissectionRoom.hidden = false;
  playSceneEntry(dissectionRoom);
  dissectionRoom.querySelector(".dissection-room__back").focus();
}

function showObservationDissection(sourceDesk = lastObservationDissectionDesk) {
  lastObservationDissectionDesk = sourceDesk;
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  observationDissectionRoom.hidden = false;
  playSceneEntry(observationDissectionRoom);
  observationDissectionRoom.querySelector(".observation-dissection__back").focus();
}

function showListeningDissection() {
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  listeningDissectionRoom.hidden = false;
  playSceneEntry(listeningDissectionRoom);
  listeningDissectionRoom.querySelector(".listening-dissection__back").focus();
}

function showExpressionRoom() {
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  expressionRoom.hidden = false;
  expressionState.refresh();
  playSceneEntry(expressionRoom);
  expressionRoom.querySelector("input").focus();
}

function showObservationExpressionRoom() {
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  observationExpressionRoom.hidden = false;
  observationExpressionState.refresh();
  playSceneEntry(observationExpressionRoom);
  observationExpressionRoom.querySelector("input").focus();
}

function showListeningExpressionRoom() {
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  listeningExpressionRoom.hidden = false;
  listeningExpressionState.refresh();
  playSceneEntry(listeningExpressionRoom);
  listeningExpressionRoom.querySelector("input").focus();
}

function showRevisionRoom() {
  lastRevisionType = "reading";
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  closeRevisionLock();
  revisionState.refresh();
  revisionRoom.hidden = false;
  playSceneEntry(revisionRoom);
  revisionRoom.querySelector(".revision-room__back").focus();
}

function showObservationRevisionRoom() {
  lastRevisionType = "observation";
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  closeObservationRevisionLock();
  observationRevisionState.refresh();
  observationRevisionRoom.hidden = false;
  playSceneEntry(observationRevisionRoom);
  observationRevisionRoom.querySelector(".revision-room__back").focus();
}

function showListeningRevisionRoom() {
  lastRevisionType = "listening";
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  closeListeningRevisionLock();
  listeningRevisionState.refresh();
  listeningRevisionRoom.hidden = false;
  playSceneEntry(listeningRevisionRoom);
  listeningRevisionRoom.querySelector(".revision-room__back").focus();
}

function openRevisionLock() {
  revisionLock.hidden = false;
  revisionLockInput.value = "";
  revisionLockInput.removeAttribute("aria-invalid");
  revisionLockError.textContent = "";
  revisionLockForm.classList.remove("is-wrong");
  revisionLockInput.focus();
}

function closeRevisionLock() {
  revisionLock.hidden = true;
  revisionLockInput.value = "";
  revisionLockInput.removeAttribute("aria-invalid");
  revisionLockError.textContent = "";
  revisionLockForm.classList.remove("is-wrong");
}

function openObservationRevisionLock() {
  observationRevisionLock.hidden = false;
  observationRevisionLockInput.value = "";
  observationRevisionLockInput.removeAttribute("aria-invalid");
  observationRevisionLockError.textContent = "";
  observationRevisionLockForm.classList.remove("is-wrong");
  observationRevisionLockInput.focus();
}

function closeObservationRevisionLock() {
  observationRevisionLock.hidden = true;
  observationRevisionLockInput.value = "";
  observationRevisionLockInput.removeAttribute("aria-invalid");
  observationRevisionLockError.textContent = "";
  observationRevisionLockForm.classList.remove("is-wrong");
}

function openListeningRevisionLock() {
  listeningRevisionLock.hidden = false;
  listeningRevisionLockInput.value = "";
  listeningRevisionLockInput.removeAttribute("aria-invalid");
  listeningRevisionLockError.textContent = "";
  listeningRevisionLockForm.classList.remove("is-wrong");
  listeningRevisionLockInput.focus();
}

function closeListeningRevisionLock() {
  listeningRevisionLock.hidden = true;
  listeningRevisionLockInput.value = "";
  listeningRevisionLockInput.removeAttribute("aria-invalid");
  listeningRevisionLockError.textContent = "";
  listeningRevisionLockForm.classList.remove("is-wrong");
}

function requestAnswerRoom() {
  showRevisionRoom();
  openRevisionLock();
}

function showAnswerRoom() {
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  missionRoom.hidden = true;
  answerRoom.hidden = false;
  playSceneEntry(answerRoom);
  answerRoom.querySelector(".answer-room__back").focus();
}

function showMissionRoom() {
  hideMissionDetailPages();
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = false;
  refreshMissionCards();
  playSceneEntry(missionRoom);
  missionRoom.querySelector(".mission-room__back").focus();
}

function showMissionDetail(pageId) {
  const targetPage = document.querySelector(`#${pageId}`);
  if (!targetPage) return;
  landing.hidden = true;
  onboardingRoot.hidden = true;
  editorialRoom.hidden = true;
  deskPages.forEach((page) => { page.hidden = true; });
  dissectionRoom.hidden = true;
  expressionRoom.hidden = true;
  revisionRoom.hidden = true;
  answerRoom.hidden = true;
  missionRoom.hidden = true;
  missionDetailPages.forEach((page) => { page.hidden = page !== targetPage; });
  targetPage.hidden = false;
  playSceneEntry(targetPage);
  targetPage.querySelector(".mission-detail__back").focus();
}

const goHome = () => changeScene(showLanding);
const onboarding = initOnboarding({
  onHome: goHome,
  onMission: () => changeScene(showEditorialRoom),
  onTypingStart: () => audioManager.playEffect("keyboard"),
  onTypingStop: () => audioManager.stopEffect("keyboard")
});
document.querySelector("#room-home-button").addEventListener("click", goHome);
document.querySelectorAll("[data-desk-target]").forEach((button) => {
  button.addEventListener("click", () => changeScene(() => showDeskPage(button.dataset.deskTarget)));
});
deskPages.forEach((page) => {
  page.querySelector(".desk-page__home").addEventListener("click", () => {
    if (page.id.startsWith("observation-")) observationDesk.pause();
    if (page.id === "listening-desk") listeningDesk.pause();
    goHome();
  });
  page.querySelector(".desk-page__back").addEventListener("click", () => {
    if (page.id.startsWith("observation-")) observationDesk.pause();
    if (page.id === "listening-desk") listeningDesk.pause();
    changeScene(page.id === "observation-example" ? () => showDeskPage("observation-desk") : showEditorialRoom);
  });
});
dissectionRoom.querySelector(".dissection-room__home").addEventListener("click", goHome);
dissectionRoom.querySelector(".dissection-room__back").addEventListener("click", () => changeScene(() => showDeskPage(lastDissectionDesk)));
dissectionRoom.querySelector("#expression-room-button").addEventListener("click", () => changeScene(showExpressionRoom));
observationDissectionRoom.querySelector(".observation-dissection__home").addEventListener("click", goHome);
observationDissectionRoom.querySelector(".observation-dissection__back").addEventListener("click", () => changeScene(() => showDeskPage(lastObservationDissectionDesk)));
observationDissectionRoom.querySelector("#observation-expression-button").addEventListener("click", () => changeScene(showObservationExpressionRoom));
listeningDissectionRoom.querySelector(".listening-dissection__home").addEventListener("click", goHome);
listeningDissectionRoom.querySelector(".listening-dissection__back").addEventListener("click", () => changeScene(() => showDeskPage("listening-desk")));
expressionRoom.querySelector(".expression-room__home").addEventListener("click", goHome);
expressionRoom.querySelector(".expression-room__back").addEventListener("click", () => changeScene(showDissectionRoom));
expressionRoom.querySelector("#revision-room-button").addEventListener("click", () => changeScene(showRevisionRoom));
observationExpressionRoom.querySelector(".expression-room__home").addEventListener("click", goHome);
observationExpressionRoom.querySelector(".expression-room__back").addEventListener("click", () => changeScene(() => showObservationDissection(lastObservationDissectionDesk)));
observationExpressionRoom.querySelector("#observation-revision-room-button").addEventListener("click", () => changeScene(showObservationRevisionRoom));
listeningExpressionRoom.querySelector(".expression-room__home").addEventListener("click", goHome);
listeningExpressionRoom.querySelector(".expression-room__back").addEventListener("click", () => changeScene(showListeningDissection));
listeningExpressionRoom.querySelector("#listening-revision-room-button").addEventListener("click", () => changeScene(showListeningRevisionRoom));
revisionRoom.querySelector(".revision-room__home").addEventListener("click", goHome);
revisionRoom.querySelector(".revision-room__back").addEventListener("click", () => changeScene(showExpressionRoom));
revisionRoom.querySelector("#show-answer-button").addEventListener("click", openRevisionLock);
observationRevisionRoom.querySelector(".revision-room__home").addEventListener("click", goHome);
observationRevisionRoom.querySelector(".revision-room__back").addEventListener("click", () => changeScene(showObservationExpressionRoom));
observationRevisionRoom.querySelector("#observation-show-answer-button").addEventListener("click", openObservationRevisionLock);
listeningRevisionRoom.querySelector(".revision-room__home").addEventListener("click", goHome);
listeningRevisionRoom.querySelector(".revision-room__back").addEventListener("click", () => changeScene(showListeningExpressionRoom));
listeningRevisionRoom.querySelector("#listening-show-answer-button").addEventListener("click", openListeningRevisionLock);
answerRoom.querySelector(".answer-room__home").addEventListener("click", goHome);
answerRoom.querySelector(".answer-room__back").addEventListener("click", () => {
  const target = lastRevisionType === "listening" ? showListeningRevisionRoom : lastRevisionType === "observation" ? showObservationRevisionRoom : showRevisionRoom;
  changeScene(target);
});
answerRoom.querySelector("#continue-mission-button").addEventListener("click", () => changeScene(showMissionRoom));
missionRoom.querySelector(".mission-room__home").addEventListener("click", goHome);
missionRoom.querySelector(".mission-room__back").addEventListener("click", () => changeScene(showEditorialRoom));
missionCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.dataset.unlocked === "true") {
      changeScene(() => showMissionDetail(card.dataset.missionTarget));
      return;
    }

    card.classList.remove("is-denied");
    void card.offsetWidth;
    card.classList.add("is-denied");
  });
});
missionDetailPages.forEach((page) => {
  page.querySelector(".mission-detail__home").addEventListener("click", goHome);
  page.querySelector(".mission-detail__back").addEventListener("click", () => changeScene(showMissionRoom));
});
completeReadingMission.addEventListener("click", () => {
  readingSuccess.hidden = false;
  audioManager.playEffect("success");
  continueReadingMission.focus();
});
continueReadingMission.addEventListener("click", () => {
  readingSuccess.hidden = true;
  changeScene(showMissionRoom);
});
completeObservationMission.addEventListener("click", () => {
  observationMissionVideo.pause();
  observationSuccess.hidden = false;
  audioManager.playEffect("success");
  continueObservationMission.focus();
});
continueObservationMission.addEventListener("click", () => {
  observationSuccess.hidden = true;
  changeScene(showMissionRoom);
});
function syncListeningMissionAudio() {
  const isPlaying = !listeningMissionAudio.paused && !listeningMissionAudio.ended;
  listeningMissionAudioControl.classList.toggle("is-playing", isPlaying);
  listeningMissionAudioControl.setAttribute("aria-pressed", String(isPlaying));
  listeningMissionAudioControl.setAttribute("aria-label", `${isPlaying ? "Jeda" : "Putar"} audio Misi Meja Simak`);
}
listeningMissionAudioControl.addEventListener("click", async () => {
  if (!listeningMissionAudio.paused) {
    listeningMissionAudio.pause();
    return;
  }
  try {
    await listeningMissionAudio.play();
  } catch {
    syncListeningMissionAudio();
  }
});
listeningMissionAudio.addEventListener("play", syncListeningMissionAudio);
listeningMissionAudio.addEventListener("pause", syncListeningMissionAudio);
listeningMissionAudio.addEventListener("ended", syncListeningMissionAudio);
completeListeningMission.addEventListener("click", () => {
  listeningMissionAudio.pause();
  listeningSuccess.hidden = false;
  audioManager.playEffect("success");
  continueListeningMission.focus();
});
continueListeningMission.addEventListener("click", () => {
  listeningSuccess.hidden = true;
  changeScene(showMissionRoom);
});
revisionLock.querySelector(".revision-lock__backdrop").addEventListener("click", closeRevisionLock);
revisionLock.querySelector(".revision-lock__cancel").addEventListener("click", closeRevisionLock);
revisionLockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (revisionLockInput.value === "BedahSatu") {
    closeRevisionLock();
    changeScene(showAnswerRoom);
    return;
  }

  revisionLockError.textContent = "Salah";
  revisionLockInput.setAttribute("aria-invalid", "true");
  revisionLockForm.classList.remove("is-wrong");
  void revisionLockForm.offsetWidth;
  revisionLockForm.classList.add("is-wrong");
  revisionLockInput.select();
});
observationRevisionLock.querySelector(".revision-lock__backdrop").addEventListener("click", closeObservationRevisionLock);
observationRevisionLock.querySelector(".revision-lock__cancel").addEventListener("click", closeObservationRevisionLock);
observationRevisionLockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (observationRevisionLockInput.value === "BedahSatu") {
    closeObservationRevisionLock();
    changeScene(showAnswerRoom);
    return;
  }

  observationRevisionLockError.textContent = "Salah";
  observationRevisionLockInput.setAttribute("aria-invalid", "true");
  observationRevisionLockForm.classList.remove("is-wrong");
  void observationRevisionLockForm.offsetWidth;
  observationRevisionLockForm.classList.add("is-wrong");
  observationRevisionLockInput.select();
});
listeningRevisionLock.querySelector(".revision-lock__backdrop").addEventListener("click", closeListeningRevisionLock);
listeningRevisionLock.querySelector(".revision-lock__cancel").addEventListener("click", closeListeningRevisionLock);
listeningRevisionLockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (listeningRevisionLockInput.value === "BedahSatu") {
    closeListeningRevisionLock();
    changeScene(showAnswerRoom);
    return;
  }
  listeningRevisionLockError.textContent = "Salah";
  listeningRevisionLockInput.setAttribute("aria-invalid", "true");
  listeningRevisionLockForm.classList.remove("is-wrong");
  void listeningRevisionLockForm.offsetWidth;
  listeningRevisionLockForm.classList.add("is-wrong");
  listeningRevisionLockInput.select();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !revisionLock.hidden) closeRevisionLock();
  if (event.key === "Escape" && !observationRevisionLock.hidden) closeObservationRevisionLock();
  if (event.key === "Escape" && !listeningRevisionLock.hidden) closeListeningRevisionLock();
  if (event.key === "Escape" && !readingSuccess.hidden) {
    readingSuccess.hidden = true;
    completeReadingMission.focus();
  }
  if (event.key === "Escape" && !observationSuccess.hidden) {
    observationSuccess.hidden = true;
    completeObservationMission.focus();
  }
  if (event.key === "Escape" && !listeningSuccess.hidden) {
    listeningSuccess.hidden = true;
    completeListeningMission.focus();
  }
});
initLanding({
  onEnter: () => changeScene(() => {
    landing.hidden = true;
    onboarding.open();
    playSceneEntry(onboardingRoot);
  })
});
