let enabled = true;

const gameRoot = (() => {
  let root = undefined;
  ["view-splash", "view-scold", "view-result"].forEach(s => {
    if (root === undefined) {
      root = document.getElementsByClassName(s)[0];
    }
  });
  return root;
})();

const event = new Event("mousedown", { bubbles: true });

function sendClick() {
  gameRoot.dispatchEvent(event);
}

const gameObs = new MutationObserver(() => {
  if (gameRoot.classList.contains("view-go")) {
    sendClick();
  } else if (enabled && gameRoot.classList.contains("view-result")) {
    sendClick();
  }
});

window.addEventListener("keydown", e => {
  if (e.keyCode != 27) {
    return;
  }
  enabled = !enabled;
  if (enabled) {
    sendClick();
  }
});

gameObs.observe(gameRoot, { childList: true, subtree: true });
