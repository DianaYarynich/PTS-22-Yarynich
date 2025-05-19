function scrollItems(index, section, sectionRow, cards, card) {
  const categorySection = document.querySelectorAll(section)[index]; 
  const rows = categorySection.querySelectorAll(sectionRow);

  rows.forEach((productsRow) => {
    const prevButton = categorySection.querySelector('.control-button.prev');
    const nextButton = categorySection.querySelector('.control-button.next');

    const cardWidth = productsRow.querySelector(card).offsetWidth + 20;
    const containerWidth = categorySection.querySelector(cards).offsetWidth;
    const visibleCards = Math.floor(containerWidth / cardWidth);
    const totalCards = productsRow.querySelectorAll(card).length;

    let position = 0;

    prevButton.disabled = true;
    prevButton.style.opacity = 0.5;

    prevButton.addEventListener('click', function () {
      if (position > 0) {
        position--;
        updateCarousel();
      }
    });

    nextButton.addEventListener('click', function () {
      if (position < totalCards - visibleCards) {
        position++;
        updateCarousel();
      }
    });

    function updateCarousel() {
      const translateX = -position * cardWidth;
      productsRow.style.transform = `translateX(${translateX}px)`;

      prevButton.disabled = position === 0;
      prevButton.style.opacity = position === 0 ? 0.5 : 1;

      nextButton.disabled = position >= totalCards - visibleCards;
      nextButton.style.opacity = position >= totalCards - visibleCards ? 0.5 : 1;
    }
  });
}


document.addEventListener('DOMContentLoaded', scrollItems(0, '.flash-sales', '.products-row', '.products-container', '.product-card'));
document.addEventListener('DOMContentLoaded', scrollItems(1, '.flash-sales', '.categories-row', '.categories-container', '.category-card'));
document.addEventListener('DOMContentLoaded', scrollItems(4, '.flash-sales', '.products-row', '.products-container', '.product-card'));


function animateSlide(el, newValue) {
  const formatted = String(newValue).padStart(2, '0');

  if (el.textContent !== formatted) {
    el.classList.add('slide');

    setTimeout(() => {
      el.textContent = formatted;
      el.classList.remove('slide');
    }, 300);
  }
}

function timerCountdown(index) {
  const daysEl = document.querySelectorAll('.dd')[index];
  const hoursEl = document.querySelectorAll('.hh')[index];
  const minutesEl = document.querySelectorAll('.mm')[index];
  const secondsEl = document.querySelectorAll('.ss')[index];

  let days = parseInt(daysEl.textContent);
  let hours = parseInt(hoursEl.textContent);
  let minutes = parseInt(minutesEl.textContent);
  let seconds = parseInt(secondsEl.textContent);

  function updateDisplay() {
    animateSlide(secondsEl, seconds);
    animateSlide(minutesEl, minutes);
    animateSlide(hoursEl, hours);
    animateSlide(daysEl, days);
  }

  function countdown() {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timer);
      return;
    }

    if (seconds > 0) {
      seconds--;
    } else {
      seconds = 59;
      if (minutes > 0) {
        minutes--;
      } else {
        minutes = 59;
        if (hours > 0) {
          hours--;
        } else {
          hours = 23;
          if (days > 0) {
            days--;
          }
        }
      }
    }

    updateDisplay();
  }

  const timer = setInterval(countdown, 1000);
  updateDisplay();
}

document.addEventListener('DOMContentLoaded', timerCountdown(0));
document.addEventListener('DOMContentLoaded', timerCountdown(1));



window.onload = function() {
  let myButton = document.getElementById("backToTopBtn");
  
  window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      myButton.style.display = "block";
    } else {
      myButton.style.display = "none";
    }
  };
  
  myButton.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const categories = document.querySelector(".categories");

  hamburger.addEventListener("click", function () {
    categories.classList.toggle("show");
  });
});

document.querySelectorAll('.wishlist-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    icon.classList.toggle('active');
  });
});