export function initReadingDesk({ onOpenDissection }) {
  const material = document.querySelector("#reading-material");
  const example = document.querySelector("#reading-example");
  const toggle = document.querySelector("#reading-toggle");
  const toggleImage = document.querySelector("#reading-toggle-image");
  const dissectionButton = document.querySelector("#dissection-room-button");
  let isExampleVisible = false;

  function animate(view) {
    view.classList.remove("is-appearing");
    void view.offsetWidth;
    view.classList.add("is-appearing");
  }

  function render() {
    material.hidden = isExampleVisible;
    example.hidden = !isExampleVisible;
    toggle.setAttribute("aria-pressed", String(isExampleVisible));
    toggle.setAttribute("aria-label", isExampleVisible ? "Kembali ke materi ADIKSIMBA" : "Buka contoh berita");
    toggleImage.src = isExampleVisible ? "assets/images/button/materi.png" : "assets/images/reading-desk/example-button.png";
    animate(isExampleVisible ? example : material);
  }

  toggle.addEventListener("click", () => {
    isExampleVisible = !isExampleVisible;
    render();
  });

  dissectionButton.addEventListener("click", onOpenDissection);

  function reset() {
    isExampleVisible = false;
    render();
  }

  return { reset };
}
