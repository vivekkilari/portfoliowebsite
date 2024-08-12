const hero = document.getElementById("hero");
const titleShadow = document.getElementById("titleShadow");
const gameCarousel = document.querySelector(".gameCarousel");
const glasses = document.querySelectorAll(".glass");

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

window.onmousedown = e => {
  gameCarousel.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = e => {
  gameCarousel.dataset.mouseDownAt = "0";
}

gameCarousel.addEventListener("click", e => {

})

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
  
  panX = maxX * xDecimal * -.05;
  panY = maxY * yDecimal * -.05;
  
  hero.animate({
    transform: `translate(${panX}px, ${panY + rate}px)`
  }, {
    duration: 1000,
    fill: "forwards",
    easing: "ease"
  })
}

function carouselMove(e) {
  if(gameCarousel.dataset.mouseDownAt === "0") return;
  const mouseDelta = parseFloat(gameCarousel.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;

  gameCarousel.style.transform = `translate(${percentage}%)`;
}

function revealGame(id) {
  hideAllGames()
  document.getElementById(String(id)).dataset.activeStatus = 'active';
}

function hideAllGames() {

  glasses.forEach((g) => {
    g.dataset.activeStatus = "inactive";
  });
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

