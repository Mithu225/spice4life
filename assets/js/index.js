import { fetchAPI, showMessage, getUserInfo } from "./core.js";
import { renderPost } from "./render-post.js";

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

function renderPostCarouselList(posts) {
  return posts.map(renderPostCarousel);
}

async function getAndRenderPopularData() {
  const userInfo = getUserInfo();
  const data = await fetchAPI(
    `/blog/posts/${userInfo.name}?_tag=popular`,
    "GET"
  );
  const listPostCarouselElm = document.querySelector(".carousel-slides");
  listPostCarouselElm.innerHTML = renderPostCarouselList(data.data).join("");
}

async function init() {
  const prevSlideElm = document.querySelector("#prevSlide");
  const nextSlideElm = document.querySelector("#nextSlide");

  prevSlideElm.addEventListener("click", prevSlide);
  nextSlideElm.addEventListener("click", nextSlide);

  try {
    await getAndRenderPopularData();

    await renderPost();
  } catch (error) {
    showMessage(`${error.message}`, "error");
  }
}

init();
