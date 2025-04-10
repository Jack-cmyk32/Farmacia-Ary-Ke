const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let currentIndex = 0;
let slideInterval = setInterval(nextSlide, 3000);

function showSlide(index) {
  if (index >= slides.length) {
    index = 0;
  }
  else if (index < 0) {
    index = slides.length - 1;
  }

  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
      dots[i].classList.add('active');
    }
  });

  currentIndex = index;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 3000);
}

next.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

prev.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    resetInterval();
  }); 
});

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  });
});