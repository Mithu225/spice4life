import {
  fetchAPI,
  showMessage,
  getUserInfo,
  setValueToStore,
  getValueFromStore,
  deleteValueFromStore,
  sortBy,
  sortByDateTime,
  debounce,
} from "./core.js";
import {
  FILTERED_POSTS_ITEMS,
  SORTED_POSTS_ITEMS,
  FILTERED_BY,
} from "./constants.js";

import { renderFilter } from "./filter.js";

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

async function renderPostData(data) {
  const listPostElm = document.querySelector(".recipe-row");
  listPostElm.innerHTML = renderPostList(data).join("");
}

async function getAndRenderPostDataWithFilter(filter) {
  const userInfo = getUserInfo();
  const param = filter ? `?_tag=${filter}` : "";
  const data = await fetchAPI(`/blog/posts/${userInfo.name}${param}`, "GET");
  await renderPostData(sortBy(data.data, "title"));
  await setValueToStore(FILTERED_POSTS_ITEMS, data.data);
  return data.data;
}

export async function renderPost() {
  await renderFilter();
  try {
    const dataWithAllCountry = await getAndRenderPostDataWithFilter();

    document
      .getElementById("filter-country")
      .addEventListener("change", async function () {
        if (this.value !== "") {
          await setValueToStore(FILTERED_BY, this.value);
        } else {
          await deleteValueFromStore(FILTERED_BY);
        }
        const dataWithCountry = await getAndRenderPostDataWithFilter(
          this.value
        );
        await setValueToStore(FILTERED_POSTS_ITEMS, dataWithCountry);
      });

    document
      .getElementById("sortBy")
      .addEventListener("change", async function () {
        let dataTmp = dataWithAllCountry;
        const filterBy = await getValueFromStore(FILTERED_BY);
        if (filterBy) {
          dataTmp = await getValueFromStore(FILTERED_POSTS_ITEMS);
        }
        if (this.value === "az") {
          const _data = sortBy(dataTmp, "title");
          await setValueToStore(SORTED_POSTS_ITEMS, _data);
          renderPostData(_data);
        }
        if (this.value === "za") {
          const _data = sortBy(dataTmp, "title", true);
          await setValueToStore(SORTED_POSTS_ITEMS, _data);
          renderPostData(_data);
        }
        if (this.value === "latest") {
          const _data = sortByDateTime(dataTmp, "created", true);
          await setValueToStore(SORTED_POSTS_ITEMS, _data);
          renderPostData(_data);
        }
        if (this.value === "oldest") {
          const _data = sortByDateTime(dataTmp, "created");
          await setValueToStore(SORTED_POSTS_ITEMS, _data);
          renderPostData(_data);
        }
      });

    document.getElementById("search-keyword").addEventListener(
      "input",
      debounce(async function (event) {
        let dataTmp = dataWithAllCountry;
        const filterBy = await getValueFromStore(FILTERED_BY);
        if (filterBy) {
          dataTmp = await getValueFromStore(FILTERED_POSTS_ITEMS);
        }

        const searchValue = event.target.value;

        if (searchValue != "") {
          const searchResult = dataTmp.filter((item) =>
            item.title.toLowerCase().includes(searchValue)
          );
          await renderPostData(searchResult);
        } else {
          await renderPostData(dataTmp);
        }
      })
    );
  } catch (error) {
    showMessage(`${error.message}`, "error");
  }
}
