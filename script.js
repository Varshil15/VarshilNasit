// Text typing effect for the subtitle
const text = "Writing Code. Learning to Hack. Exploring Tech.";
const typingText = document.getElementById("typing-text");
let index = 0;
let typingTimeout;

function type() {
  if (index < text.length) {
    typingText.textContent += text.charAt(index);
    index++;
    typingTimeout = setTimeout(type, 80);
  }
}

function startTypingEffect() {
  clearTimeout(typingTimeout);
  typingText.textContent = "";
  index = 0;
  type();
}

// Start typing effect on page load
window.addEventListener("load", () => {
  // Always scroll to top on page load
  window.scrollTo(0, 0);

  startTypingEffect();

  // Initialize AOS animations
  if (AOS) {
    AOS.init({
      duration: 800,
      once: false,
    });
  }

  // Observe hero section for typing animation, but skip first load
  let firstTime = true;
  const heroSection = document.getElementById("hero");
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (firstTime) {
            firstTime = false;
          } else {
            startTypingEffect();
          }
          // Remove disappear effect if coming back
          heroSection.classList.remove(magicDisappearClass);
          lastHeroVisible = true;
        } else {
          // Only trigger when leaving the hero section
          if (lastHeroVisible) {
            heroSection.classList.add(magicDisappearClass);
            lastHeroVisible = false;
          }
        }
      });
    }, { threshold: 0.7 });
    observer.observe(heroSection);
  }
});

// Smooth scroll and re-trigger AOS animation when navigating with navbar
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      // Re-trigger AOS animation for all children with data-aos
      setTimeout(() => {
        const aosElements = targetSection.querySelectorAll('[data-aos]');
        aosElements.forEach(el => {
          el.classList.remove('aos-animate');
          // Force reflow
          void el.offsetWidth;
          el.classList.add('aos-animate');
        });
      }, 500); // Wait for scroll to finish
    }
  });
});

// Magic disappear animation for hero section when scrolling away
let lastHeroVisible = true;
if (heroSection) {
  const magicDisappearClass = 'magic-disappear';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (firstTime) {
          firstTime = false;
        } else {
          startTypingEffect();
        }
        // Remove disappear effect if coming back
        heroSection.classList.remove(magicDisappearClass);
        lastHeroVisible = true;
      } else {
        // Only trigger when leaving the hero section
        if (lastHeroVisible) {
          heroSection.classList.add(magicDisappearClass);
          lastHeroVisible = false;
        }
      }
    });
  }, { threshold: 0.7 });
  observer.observe(heroSection);
}

// Add magic disappear CSS if not present
(function addMagicDisappearCSS() {
  if (!document.getElementById('magic-disappear-style')) {
    const style = document.createElement('style');
    style.id = 'magic-disappear-style';
    style.innerHTML = `
      .magic-disappear {
        animation: magicFadeOut 0.8s forwards;
      }
      @keyframes magicFadeOut {
        0% { opacity: 1; filter: blur(0px) brightness(1); transform: scale(1) rotate(0deg); }
        60% { opacity: 0.5; filter: blur(4px) brightness(1.2); transform: scale(1.05) rotate(-2deg); }
        100% { opacity: 0; filter: blur(12px) brightness(2); transform: scale(1.1) rotate(3deg); }
      }
    `;
    document.head.appendChild(style);
  }
})();
