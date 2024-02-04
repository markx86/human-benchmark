const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;

const gameRoot = document.getElementsByClassName("number-memory-test")[0];

let enabled = true;

const gameObs = new MutationObserver(e => {
  const removed = e[0].removedNodes[0];
  const added = e[1].addedNodes[0];
  if (gameRoot.classList.contains("prompt")) {
    const number = removed.getElementsByClassName("big-number")[0].firstChild.textContent;
    const input = added.getElementsByTagName("input")[0];
    const button = added.getElementsByTagName("button")[0];
    nativeInputValueSetter.call(input, number);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    if (enabled) {
      button.click();
    }
  } else if (enabled && gameRoot.classList.contains("anim-correct")) {
    added.getElementsByTagName("button")[0].click();
  }
});

window.addEventListener("keydown", e => {
  if (e.keyCode != 27) {
    return;
  }
  enabled = !enabled;
  if (enabled) {
    let button = gameRoot.getElementsByTagName("button")[0];
    if (button.textContent === "NEXT") {
      button.click();
    }
  }
});

gameObs.observe(gameRoot, { childList: true, subtree: true });
