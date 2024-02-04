function typeWords() {
  const gameRoot = document.getElementsByClassName("letters")[0];
  const event = new Event("keydown", { bubbles: true })
  gameRoot.children.forEach(c => {
    setTimeout(() => {
      event.key = c.textContent;
      gameRoot.dispatchEvent(event);
    }, 0);
  });
}

window.addEventListener("keydown", e => {
  if (e.keyCode != 13) {
    return;
  }
  typeWords();
});
