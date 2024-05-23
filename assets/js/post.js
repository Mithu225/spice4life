import {
  fetchAPI,
  showMessage,
  hideMessage,
  getUserInfo,
  navigate,
  showModal,
  hideModal,
} from "./core.js";

function renderPostItem(post) {
  return `<div class="post-item"><span class="post-item-name">${post.title}</span>
            <div class="post-item-actions">
                <button data-id="${post.id}" class="post-edit-btn">Edit</button>
                <button data-id="${post.id}" class="post-delete-btn">Delete</button>
            </div></div>`;
}

function renderPostList(posts) {
  return posts.map(renderPostItem).join(",");
}

async function init() {
  const userInfo = getUserInfo();
  try {
    const data = await fetchAPI(`/blog/posts/${userInfo.name}`, "GET");
    const listPostElm = document.querySelector(".admin-container");
    listPostElm.innerHTML = renderPostList(data.data);

    const postEditElm = document.querySelectorAll(".post-edit-btn");
    postEditElm.forEach((elm) => {
      elm.addEventListener("click", (event) => {
        const postId = event.target.getAttribute("data-id");
        navigate(`/post/edit.html?id=${postId}`);
      });
    });

    const postDeleteElm = document.querySelectorAll(".post-delete-btn");
    postDeleteElm.forEach((elm) => {
      elm.addEventListener("click", (event) => {
        const postId = event.target.getAttribute("data-id");
        const confirmation = `
            <div class="modal-confirmation">
                <p>Are you sure to delete this post?</p>
                <div>
                    <button class="modal-confirmation-yes button">YES</<button>
                    <button class="modal-confirmation-no button">NO</<button>
                </div>
            </div>
        `;
        showModal(confirmation);

        const confirmationYes = document.querySelectorAll(
          ".modal-confirmation-yes"
        );

        confirmationYes.forEach((elm) => {
          elm.addEventListener("click", async () => {
            await fetchAPI(`/blog/posts/${userInfo.name}/${postId}`, "DELETE");

            hideModal();
            showMessage("Your post is deleted");
          });
        });

        const confirmationNo = document.querySelectorAll(
          ".modal-confirmation-no"
        );
        confirmationNo.forEach((elm) => {
          elm.addEventListener("click", hideModal);
        });
      });
    });
  } catch (error) {
    showMessage("Failed to load the data", "error");
  }
}

init();
