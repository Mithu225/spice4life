import { getParam, getUserInfo, showMessage, fetchAPI } from "./core.js";

console.log("ok");
async function init() {
  const postId = getParam("postId");
  const userInfo = getUserInfo();
  try {
    const { data } = await fetchAPI(
      `/blog/posts/${userInfo.name}/${postId}`,
      "GET"
    );

    console.log(data);

    const recipesTitleElm = document.querySelector(".recipes-title");
    const recipeImg = document.querySelector(".recipe-img > img");
    const recipeTextInfo = document.querySelector(".recipe-text-info");
    const recipeInfo = document.querySelector(".recipe-info");

    recipesTitleElm.innerHTML = data.title;
    recipeInfo.innerHTML = data.body;
    recipeTextInfo.innerHTML = `
        <p>Recipe: ${data.title}</p>
        <p>Author: ${data.author.name}</p>
        <p>Date : ${new Date(data.created).toDateString()}</p>
    `;
    recipeImg.src = data.media.url;
    recipeImg.alt = data.media.alt;
  } catch (error) {
    showMessage("Failed to load the data", "error");
  }
}

init();
