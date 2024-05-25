import { showMessage } from "./core.js";
import { renderPost } from "./render-post.js";

async function init() {
  try {
    await renderPost();
  } catch (error) {
    showMessage("Failed to load the data", "error");
  }
}

init();
