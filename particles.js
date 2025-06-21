// particles.js
const particlesContainer = document.querySelector('.particles');
const PARTICLE_COUNT = 32;
const colors = ['#fff', '#a259ff', '#38bdf8', '#fff'];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = random(6, 18);
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${random(0, 100)}vw`;
  p.style.top = `${random(80, 100)}vh`;
  p.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random()*colors.length)]} 0%, #24243e 100%)`;
  p.style.opacity = random(0.18, 0.7);
  p.style.animationDuration = `${random(8, 18)}s`;
  p.style.animationDelay = `${random(0, 10)}s`;
  particlesContainer.appendChild(p);
}
