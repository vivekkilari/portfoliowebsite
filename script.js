const hero = document.getElementById("hero");


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

  console.log(maxY);

  const panX = maxX * xDecimal * -.1;
  const panY = maxY * yDecimal * -.1;

  hero.translate = `translate(${panX}px, ${panY}px)`;

  hero.animate({
    transform: `translate(${panX}px, ${panY}px)`
  }, {
    duration: 4000,
    fill: "forwards",
    easing: "ease"
  })
}