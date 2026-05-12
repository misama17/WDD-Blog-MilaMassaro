const container = document.querySelector(".goals-container");
const balls = document.querySelectorAll(".goals-ball");

const threshold = 600;


let mouseX = 0;
let mouseY = 0;


// https://codepen.io/shooft/pen/QwEbeME
let containerBCR = container.getBoundingClientRect();
let containerWidth = container.clientWidth;
let containerHeight = container.clientHeight;




// Zwevende positie (random)
// ChatGPT: geef mij een berekening hoe ik mijn divs vrij kan laten zweven over mijn pagina
balls.forEach(ball => {
  // Bepaalt random positie op basis van de breedte van de container
  ball._x = Math.random() * containerWidth;
  ball._y = Math.random() * containerHeight;
  
  // Bepaalt random de snelheid van elke div
  ball._vx = (Math.random() - 0.5) * 0.5;
  ball._vy = (Math.random() - 0.5) * 0.5;
});



container.addEventListener("mousemove", e => { 
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  container.style.setProperty("--mouse-x", mouseX);
  container.style.setProperty("--mouse-y", mouseY);
  
});


// Gemini: hoe kan ik ervoor zorgen dat mijn divs binnen mijn container blijven, ook als ik mijn scherm resize?
window.addEventListener("resize", () => {
  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;
  
  balls.forEach(ball => {
    // Ervoor zorgen dat de divs binnen de container blijft, ook als je de grootte van je scherm aanpast.
    ball._x = Math.min(ball._x, containerWidth);
    ball._y = Math.min(ball._y, containerHeight);
  });
});




// animatie beweging
function ballsAnimation() {

  balls.forEach(ball => {

    // De divs laten zweven in de container: positie plus de snelheid. >> telkens wordt er een senlheid bij de positie geteld, wat de nieuwe positie bepaalt.
    ball._x = ball._x + ball._vx;
    ball._y = ball._y + ball._vy;

    
    // !! ChatGPT: Hoe zorg ik ervoor dat de divs niet buiten mijn container komen en "botsen" tegen de randen?
    if (ball._x < 0 || ball._x > containerWidth) {
      ball._vx = -ball._vx;
    }

    if (ball._y < 0 || ball._y > containerHeight) {
      ball._vy = -ball._vy;
    }

    
    
    // afstand tot muis
    // https://codepen.io/shooft/pen/QwEbeME
    let deltaX = ball._x - mouseX;
    let deltaY = ball._y - mouseY;
    
    
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    let repelX = 0;
    let repelY = 0;

    if (distance < threshold) {
      let force = (1 - distance / threshold) * 200;

      let angle = Math.atan2(deltaY, deltaX);

      repelX = Math.cos(angle) * force;
      repelY = Math.sin(angle) * force;
    }

    
    ball.style.setProperty("--x", ball._x);
    ball.style.setProperty("--y", ball._y);
    ball.style.setProperty("--repel-x", repelX);
    ball.style.setProperty("--repel-y", repelY);
  });

  requestAnimationFrame(ballsAnimation);
}

ballsAnimation();




