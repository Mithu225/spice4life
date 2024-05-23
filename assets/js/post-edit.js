import {
  fetchAPI,
  showMessage,
  hideMessage,
  getUserInfo,
  navigate,
  getParam,
} from "./core.js";
const postTitleElm = document.querySelector("#post-title");
const postMessageElm = document.querySelector("#message");
const postKeywordsElm = document.querySelector("#keywords");
const postImageElm = document.querySelector("#post-image");
const postImageAltElm = document.querySelector("#post-image-alt");
const editPostSubmitButton = document.querySelector("#edit-post-submit-button");
const postId = getParam("id");

const cancelPostEditButton = document.querySelector("#cancel-post-edit-button");

cancelPostEditButton.addEventListener("click", () => {
  navigate("/post");
});

editPostSubmitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  hideMessage();
  const postTitleValue = postTitleElm.value;
  const postMessageValue = postMessageElm.value;
  const postKeywordsValue = postKeywordsElm.value;
  const postImageValue = postImageElm.value;
  const postImageAltValue = postImageAltElm.value;

  if (
    [postTitleValue, postMessageValue, postImageValue, postImageAltValue].some(
      (item) => item == null
    )
  ) {
    showMessage("Please check your info", "error");
  } else {
    const userInfo = getUserInfo();
    try {
      const data = await fetchAPI(
        `/blog/posts/${userInfo.name}/${postId}`,
        "PUT",
        {
          body: JSON.stringify({
            title: postTitleValue,
            body: postMessageValue,
            tags: postKeywordsValue.split(","),
            media: {
              url: postImageValue,
              alt: postImageAltValue,
            },
          }),
        }
      );
      showMessage("Your post is edited");
      setTimeout(() => {
        navigate("/post");
      }, 1000);
    } catch (error) {
      showMessage(error.data.errors[0].message, "error");
    }
  }
});

async function init() {
  const userInfo = getUserInfo();
  try {
    const { data } = await fetchAPI(
      `/blog/posts/${userInfo.name}/${postId}`,
      "GET"
    );

    postTitleElm.value = data.title;
    postMessageElm.value = data.body;
    postKeywordsElm.value = data.tags.join(",");
    postImageElm.value = data.media.url;
    postImageAltElm.value = data.media.alt;
  } catch (error) {
    showMessage("Failed to load the data", "error");
  }
}

init();
