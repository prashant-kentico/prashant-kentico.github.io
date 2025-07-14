$(document).ready(function () {

  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if (window.scrollY > 60) {
      document.querySelector('#scroll-top').classList.add('active');
    } else {
      document.querySelector('#scroll-top').classList.remove('active');
    }

    // scroll spy
    $('section').each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr('id');

      if (top > offset && top < offset + height) {
        $('.navbar ul li a').removeClass('active');
        $('.navbar').find(`[href="#${id}"]`).addClass('active');
      }
    });
  });

  // Select the progress bar fill element
  const progressBar = document.querySelector('.filled');

  window.addEventListener('scroll', () => {
    // Calculate the scroll progress
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Update the width of the progress bar
    progressBar.style.width = scrollPercentage + '%';
  });


  // smooth scrolling
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top,
    }, 500, 'linear')
  });
});

document.addEventListener('visibilitychange',
  function () {
    if (document.visibilityState === "visible") {
      document.title = "Portfolio | Prashant Verma";
      $("#favicon").attr("href", "assets/images/favicon.png");
    }
    else {
      document.title = "Come Back To Portfolio";
      $("#favicon").attr("href", "assets/images/favicon.png");
    }
  });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
  strings: ["Software Development Lead","Microsoft Certified .NET Developer", ".NET FullStack Developer", "Certified Kentico Developer", "Kentico Enthusiast"],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 300,
});
// <!-- typed js effect ends -->

// <!-- awards section starts -->
// Awards section 
const awardContainer = document.querySelector(".award-container");
const awardDots = document.querySelectorAll(".doti");
const awardPrevBtn = document.querySelector(".lt-arrow");
const awardNextBtn = document.querySelector(".rt-arrow");

let awardIsDragging = false;
let awardStartX, awardScrollLeft;
let awardWidth = awardContainer.children[0].offsetWidth + 20; // Award width + gap
let awardCurrentIndex = 0;

// Move to a specific slide
function moveAwardSlide(index) {
  awardCurrentIndex = index;
  awardContainer.scrollLeft = index * awardWidth;
  updateAwardDots();
}

// Update active dot
function updateAwardDots() {
  awardDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === awardCurrentIndex);
  });
}

// Arrow button navigation
awardPrevBtn.addEventListener("click", () => {
  if (awardCurrentIndex > 0) {
    moveAwardSlide(awardCurrentIndex - 1);
  }
});

awardNextBtn.addEventListener("click", () => {
  if (awardCurrentIndex < awardDots.length - 1) {
    moveAwardSlide(awardCurrentIndex + 1);
  }
});

// Mouse drag scrolling
awardContainer.addEventListener("mousedown", (e) => {
  awardIsDragging = true;
  awardStartX = e.pageX - awardContainer.offsetLeft;
  awardScrollLeft = awardContainer.scrollLeft;
});

awardContainer.addEventListener("mouseleave", () => (awardIsDragging = false));
awardContainer.addEventListener("mouseup", () => (awardIsDragging = false));
awardContainer.addEventListener("mousemove", (e) => {
  if (!awardIsDragging) return;
  e.preventDefault();
  const x = e.pageX - awardContainer.offsetLeft;
  const walk = (x - awardStartX) * 2; // Drag speed
  awardContainer.scrollLeft = awardScrollLeft - walk;
});

// Click event for dots
awardDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    moveAwardSlide(index);
  });
});

// Sync dots with scroll event
awardContainer.addEventListener("scroll", () => {
  let newIndex = Math.round(awardContainer.scrollLeft / awardWidth);
  if (newIndex !== awardCurrentIndex) {
    awardCurrentIndex = newIndex;
    updateAwardDots();
  }
});

// Initialize the first dot as active
updateAwardDots();

// <!-- Awards section ends -->

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});
// <!-- tilt js effect ends -->

// <!-- particles.js starts -->
// Function to set Particle.js color based on theme
function setParticleColor() {
  const isDarkMode = document.body.classList.contains("dark-mode");
  const particleColor = isDarkMode ? "#FFD700" : "#000000"; // Gold for dark mode, black for light mode

  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": { "enable": true, "value_area": 800 }
      },
      "color": { "value": particleColor },
      "shape": {
        "type": "triangle",
        "stroke": { "width": 0, "color": particleColor }
      },
      "opacity": { "value": 0.75 },
      "size": { "value": 5, "random": true },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": particleColor,
        "opacity": 0.4,
        "width": 1
      },
      "move": { "enable": true, "speed": 6 }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "repulse" },
        "onclick": { "enable": true, "mode": "push" }
      }
    },
    "retina_detect": true
  });
}

// Theme Toggle Logic
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check saved theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  document.getElementById('primary-image').src = './assets/images/pverma-dark.jpg';
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
} else {
  body.classList.remove("dark-mode");
  document.getElementById('primary-image').src = './assets/images/pverma.jpg';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
}

// Theme Toggle Click Event
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Change icon and save preference
  if (body.classList.contains("dark-mode")) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    document.getElementById('primary-image').src = './assets/images/pverma-dark.jpg';
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.getElementById('primary-image').src = './assets/images/pverma.jpg';
    localStorage.setItem("theme", "light");
  }

  // Delay to apply particle color change smoothly
  setTimeout(setParticleColor, 300);
});

// Detect System Dark Mode Change
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  if (event.matches) {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    document.getElementById('primary-image').src = './assets/images/pverma-dark.jpg';
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.getElementById('primary-image').src = './assets/images/pverma.jpg';
    localStorage.setItem("theme", "light");
  }
  setParticleColor();
});

// Initialize Particles.js on Load
document.addEventListener("DOMContentLoaded", setParticleColor);


// Run on load
setParticleColor();

// Detect theme change
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setParticleColor);

// disable developer mode


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 1000,
  reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .dev', { interval: 1000 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 100 });
srtop.reveal('.skills .container .bar', { delay: 100 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 200 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL AWARDS *

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });


// Prevent copying without credit
/* document.addEventListener("copy", (event) => {
    const selectedData = window.getSelection().toString();
    const customMessage = `Sorry! 🫵You can't copy any content from my personal portfolio 😎😀😎\n[CopyRight © Prashant Verma] Thank you!🤣\nFollow me on Linkedin👇 \nhttps://www.linkedin.com/in/er-prashant-verma/`;
    event.clipboardData.setData("text/plain", customMessage);
    event.preventDefault();
}); */
