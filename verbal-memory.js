const gameRoot = document.getElementsByClassName("verbal-memory-test")[0];
const words = [];
let enabled = true;
let newBtn = undefined, seenBtn = undefined, word = undefined;

function answer(word) {  
  const isNew = words.find(w => w === word) === undefined;
  if (isNew) {
    words.push(word);
  }
  if (!enabled) {
    return;
  }
  if (isNew && newBtn) {
    newBtn.click();
  } else if (!isNew && seenBtn) {
    seenBtn.click();
  }
}

const initObs = new MutationObserver(e => {
  const added = e[1].addedNodes[0];
  if (gameRoot.classList.contains("prompt")) {
    word = added.getElementsByClassName("word")[0];
    const button = added
      .getElementsByTagName("button")
      .forEach(btn => {
        if (btn.textContent === "NEW") {
          newBtn = btn;
        } else if (btn.textContent === "SEEN") {
          seenBtn = btn;
        }
      });
    setInterval(() => answer(word.textContent), 0);
  }
});

window.addEventListener("keydown", e => {
  if (e.keyCode != 27) {
    return;
  }
  enabled = !enabled;
  if (enabled && word) {
    answer(word.textContent);
  }
});

initObs.observe(gameRoot, { childList: true, subtree: true });
