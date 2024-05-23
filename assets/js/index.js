import { fetchAPI, showMessage, getUserInfo } from "./core.js";

let slideIndex = 0;
showSlides(slideIndex);

function nextSlide() {
  showSlides((slideIndex += 1));
}

function prevSlide() {
  showSlides((slideIndex -= 1));
}

function showSlides(n) {
  const slides = document.querySelectorAll(".carousel-slide");
  if (n >= slides.length - 2) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 3;
  }
  const offset = -slideIndex * (100 / 3);
  document.querySelector(
    ".carousel"
  ).style.transform = `translateX(${offset}%)`;
}

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

function renderPostCarousel(post) {
  return `
    <div class="carousel-slide">
        <a href="/recipes/detail.html?postId=${post.id}">
            <div class="carousel-slide-container">
                <img src="${post.media.url}" alt="${post.media.alt}" />
                <p>${post.title}</p>
            </div>
        </a>
    </div>
    `;
}

function renderPostList(posts) {
  return posts.map(renderPostItem);
}

function renderPostCarouselList(posts) {
  return posts.map(renderPostCarousel);
}

async function init() {
  const prevSlideElm = document.querySelector("#prevSlide");
  const nextSlideElm = document.querySelector("#nextSlide");

  prevSlideElm.addEventListener("click", prevSlide);
  nextSlideElm.addEventListener("click", nextSlide);

  const userInfo = getUserInfo();
  try {
    const data = await fetchAPI(`/blog/posts/${userInfo.name}`, "GET");
    const listPostElm = document.querySelector(".recipe-row");
    const listPostCarouselElm = document.querySelector(".carousel-slides");

    listPostElm.innerHTML = renderPostList(data.data).join("");
    listPostCarouselElm.innerHTML = renderPostCarouselList(data.data).join("");
  } catch (error) {
    console.error(error);
    showMessage(`${error.message}`, "error");
  }
}

init();
