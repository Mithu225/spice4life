import { fetchAPI, showMessage, getUserInfo } from "./core.js";

function renderPostItem(post) {
  return `
  <div class="recipe-line">
    <a href="/recipes/detail.html?postId=${post.id}">
        <div class="recipe-line-container">
        <img src="${post.media.url}" alt="${post.media.alt}" />

        <p>${post.title}</p>
        </div>
    </a>
    </div>`;
}

function renderPostList(posts) {
  return posts.map(renderPostItem);
}

async function init() {
  const userInfo = getUserInfo();
  try {
    const data = await fetchAPI(`/blog/posts/${userInfo.name}`, "GET");
    const listPostElm = document.querySelector(".recipe-row");

    listPostElm.innerHTML = renderPostList(data.data).join("");
  } catch (error) {
    showMessage("Failed to load the data", "error");
  }
}

init();
