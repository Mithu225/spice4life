import {
  getParam,
  getUserInfo,
  showMessage,
  fetchAPI,
  navigate,
  fullURL,
  copyToClipboard,
} from "./core.js";

function shareLink(data) {
  const phone = "+471234567890";
  const body = `${fullURL()}`;
  navigate(`sms: ${phone}&body=${body}`);
  copyToClipboard(body);
}

async function init() {
  const recipesTitleElm = document.querySelector(".recipes-title");
  const recipeImg = document.querySelector(".recipe-img");
  const recipeTextInfo = document.querySelector(".recipe-text-info");
  const recipeInfo = document.querySelector(".recipe-info");

  const postId = getParam("postId");
  const userInfo = getUserInfo();
  try {
    const { data } = await fetchAPI(
      `/blog/posts/${userInfo.name}/${postId}`,
      "GET"
    );

    recipesTitleElm.innerHTML = data.title;
    recipeInfo.innerHTML = data.body;
    recipeTextInfo.innerHTML = `
        <p><strong>Recipe</strong>: ${data.title}</p>
        <p><strong>Author</strong>: ${data.author.name}</p>
        <p><strong>Date</strong>: ${new Date(data.created).toDateString()}</p>
    `;
    recipeImg.innerHTML = `<img src="${data.media.url}" alt="${data.media.alt}" />`;

    const shareBtnElm = document.querySelector(".button-share");
    shareBtnElm.addEventListener("click", () => shareLink(data));
  } catch (error) {
    recipeInfo.innerHTML = "Not found";
    showMessage("Failed to load the data", "error");
  }
}

init();
