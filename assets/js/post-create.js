import { checkAuth } from "./auth.js";
import {
  fetchAPI,
  showMessage,
  hideMessage,
  getUserInfo,
  navigate,
  handleTag,
} from "./core.js";

function init() {
  checkAuth();
  const createPostSubmitButton = document.querySelector(
    "#create-post-submit-button"
  );

  const cancelPostSubmitButton = document.querySelector(
    "#cancel-post-submit-button"
  );

  cancelPostSubmitButton.addEventListener("click", () => {
    navigate("/post");
  });

  createPostSubmitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    hideMessage();

    const postTitleValue = document.querySelector("#post-title").value;
    const postMessageValue = document.querySelector("#message").value;
    const postKeywordsValue = document.querySelector("#keywords").value;
    const postImageValue = document.querySelector("#post-image").value;
    const postImageAltValue = document.querySelector("#post-image-alt").value;

    if (
      [
        postTitleValue,
        postMessageValue,
        postImageValue,
        postImageAltValue,
      ].some((item) => item == null)
    ) {
      showMessage("Please check your info", "error");
    } else {
      const userInfo = getUserInfo();
      try {
        const data = await fetchAPI(`/blog/posts/${userInfo.name}`, "POST", {
          body: JSON.stringify({
            title: postTitleValue,
            body: postMessageValue,
            tags: handleTag(postKeywordsValue),
            media: {
              url: postImageValue,
              alt: postImageAltValue,
            },
          }),
        });
        showMessage("Your post is created");
        setTimeout(() => {
          navigate("/post");
        }, 1000);
      } catch (error) {
        showMessage(error.data.errors[0].message, "error");
      }
    }
  });
}

init();
