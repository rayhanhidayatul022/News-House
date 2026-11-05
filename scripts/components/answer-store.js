export const ANSWER_FIELDS = ["apa", "diMana", "kapan", "siapa", "mengapa", "bagaimana"];
export const ANSWER_LABELS = {
  apa: "Apa",
  diMana: "Di mana",
  kapan: "Kapan",
  siapa: "Siapa",
  mengapa: "Mengapa",
  bagaimana: "Bagaimana"
};

export const DEFAULT_STORAGE_KEY = "news-house.expression-answers.v1";

export function readAnswers(storageKey = DEFAULT_STORAGE_KEY) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey)) ?? {};
    return Object.fromEntries(ANSWER_FIELDS.map((field) => [field, typeof saved[field] === "string" ? saved[field] : ""]));
  } catch {
    return Object.fromEntries(ANSWER_FIELDS.map((field) => [field, ""]));
  }
}

export function writeAnswers(answers, storageKey = DEFAULT_STORAGE_KEY) {
  localStorage.setItem(storageKey, JSON.stringify(answers));
}
