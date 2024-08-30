const hero = document.getElementById("hero");
const titleShadow = document.getElementById("titleShadow");
const gameCarousel = document.querySelector(".gameCarousel");
const glasses = document.querySelectorAll(".glass");
const iframes = document.querySelectorAll("iframe");

var mouseX = 0;
var mouseY = 0;
var panX = 0;
var panY = 0;
var rate = 0;

window.onmousemove = e => {
  getMousePosition(e);
  animateHero(e);
  carouselMove(e);
}

gameCarousel.onmousedown = e => {
  gameCarousel.dataset.mouseDownAt = e.clientX;
  iframes.forEach((g) => {
    g.pause();
  })
}

window.onmouseup = e => {
  gameCarousel.dataset.mouseDownAt = "0";
  gameCarousel.dataset.prevPercentage = gameCarousel.dataset.percentage;
}

window.addEventListener("scroll", e => {
  heroParallax();
})

function getMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function animateHero(e) {
  const xDecimal = mouseX / window.innerWidth;
  const yDecimal = mouseY / window.innerHeight;
  
  const maxX = hero.offsetWidth - window.innerWidth;
  const maxY = hero.offsetHeight - window.innerHeight;
  
  panX = maxX * xDecimal * -.1;
  panY = maxY * yDecimal * -.1;
  
  hero.animate({
    transform: `translate(${panX}px, ${panY + rate}px)`
  }, {
    duration: 1000,
    fill: "forwards",
  })
}

function heroParallax() {
  var scrolled = window.scrollY;
  rate = scrolled * .33;


  hero.animate({
    transform: `translate(${panX}px, ${panY + rate}px)`
  }, {
    fill: "forwards",
    easing: "ease-in-out"
  });
}

function carouselMove(e) {
  if(gameCarousel.dataset.mouseDownAt === "0") return;
  const mouseDelta = parseFloat(gameCarousel.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 1;

  var percentage = (mouseDelta / maxDelta) * -100;
  var nextPercentage = parseFloat(gameCarousel.dataset.prevPercentage) + percentage;

  nextPercentage = Math.min(nextPercentage, 33);
  nextPercentage = Math.max(nextPercentage, -33);

  gameCarousel.dataset.percentage = nextPercentage;

  // gameCarousel.style.transform = `translate(${nextPercentage}%)`;

  gameCarousel.animate({
    transform: `translate(${nextPercentage}%)`
  }, {
    duration: 1200,
    fill: "both"
  })
}

function revealGame(glassId, frameId) {
  hideAllGames()
  document.getElementById(String(glassId)).dataset.activeStatus = 'active';
  document.getElementById(String(frameId)).muted = true;
}

function hideAllGames() {

  glasses.forEach((g) => {
    g.dataset.activeStatus = "inactive";
  });

  iframes.forEach((i) => {
    i.muted = true;
  })
}
