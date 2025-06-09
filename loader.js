// loader.js
// Handles the loading screen logic
window.addEventListener('load', function() {
  const loader = document.getElementById('loader');
  if(loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 400);
  }
});
