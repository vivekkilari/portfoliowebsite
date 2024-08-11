const hero = document.getElementById("hero");

var panX;
var panY;
var rate;

function revealGame(id) {
    document.getElementById(String(id)).style.display = 'none';
}

window.onmousemove = e => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const xDecimal = mouseX / window.innerWidth;
  const yDecimal = mouseY / window.innerHeight;

  const maxX = hero.offsetWidth - window.innerWidth;
  const maxY = hero.offsetHeight - window.innerHeight;

  panX = maxX * xDecimal * -.1;
  panY = maxY * yDecimal * -.1;

  hero.animate({
    transform: `translate(${panX}px, ${panY + rate}px)`
  }, {
    duration: 500,
    fill: "forwards",
    easing: "ease"
  })
}

window.addEventListener('scroll', e => {
  const target = document.getElementById("hero");

  var scrolled = window.scrollY;
  rate = scrolled * 0.5;
  

  hero.animate({
    transform: `translate(${panX}px ,${panY + rate}px)`
  }, {
    duration: 1,
    fill: "forwards",
    easing: "ease"
  })
  
})