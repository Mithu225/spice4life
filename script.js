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

/*setInterval(() => {
  nextSlide();
}, 3000);
