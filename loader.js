// loader.js
// Handles the loading screen logic and page animations
window.addEventListener('load', function() {
  // Get loader element
  const loader = document.getElementById('loader');
  
  // Elements to animate
  const nav = document.querySelector('.nav-main');
  const heroImg = document.querySelector('.hero-img');
  const heroTitle = document.querySelector('.hero-title');
  const typingText = document.querySelector('#typing-text');
  const heroSocials = document.querySelector('.hero-socials');
  
  // Apply initial state (hidden)
  if (nav) nav.style.opacity = '0';
  if (heroImg) heroImg.style.opacity = '0';
  if (heroTitle) heroTitle.style.opacity = '0';
  if (typingText) typingText.style.opacity = '0';
  if (heroSocials) heroSocials.style.opacity = '0';
  
  // Handle loader fade out
  if(loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      
      // Start animations after loader disappears
      animateElements();
    }, 500);
  } else {
    // If no loader, animate immediately
    animateElements();
  }
  
  // Function to animate elements in sequence
  function animateElements() {
    // Animate navbar with fade in
    if (nav) {
      nav.classList.add('animate-fade-in');
      nav.style.opacity = '1';
    }
    
    // Animate hero image with scale in
    setTimeout(() => {
      if (heroImg) {
        heroImg.classList.add('animate-scale-in');
        heroImg.style.opacity = '1';
      }
    }, 200);
    
    // Animate hero title with slide from left
    setTimeout(() => {
      if (heroTitle) {
        heroTitle.classList.add('animate-slide-left');
        heroTitle.style.opacity = '1';
      }
    }, 500);
    
    // Animate typing text
    setTimeout(() => {
      if (typingText) {
        typingText.classList.add('animate-fade-in');
        typingText.style.opacity = '1';
        
        // Trigger the existing typing animation from script.js
        if (typeof startTypingEffect === 'function') {
          startTypingEffect();
        }
      }
    }, 800);
    
    // Animate social links with bounce
    setTimeout(() => {
      if (heroSocials) {
        heroSocials.classList.add('animate-bounce-in');
        heroSocials.style.opacity = '1';
      }
    }, 1200);
  }
});
