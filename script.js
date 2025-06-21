// Text typing effect for the subtitle
const texts = [
  "Writing Code. Learning to Hack. Exploring Tech.",
  "Creating. Cracking. Continuously Improving."
];
const typingText = document.getElementById("typing-text");
let currentTextIndex = 0;
let index = 0;
let isTyping = true;
let typingTimeout;

function type() {
  const currentText = texts[currentTextIndex];
  
  if (isTyping) {
    // Typing phase
    if (index < currentText.length) {
      typingText.innerHTML += currentText.charAt(index);
      index++;
      typingTimeout = setTimeout(type, 40);
    } else {
      // Pause before erasing
      typingTimeout = setTimeout(() => {
        isTyping = false;
        type();
      }, 2000);
    }
  } else {
    // Erasing phase
    if (index > 0) {
      typingText.innerHTML = currentText.substring(0, index - 1);
      index--;
      typingTimeout = setTimeout(type, 40);
    } else {
      // Move to next text
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      isTyping = true;
      // Pause before typing next text
      typingTimeout = setTimeout(type, 500 );
    }
  }
}

function startTypingEffect() {
  clearTimeout(typingTimeout);
  typingText.innerHTML = "";
  currentTextIndex = 0;
  index = 0;
  isTyping = true;
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

// Add staggered animations to project cards
document.addEventListener('DOMContentLoaded', function() {
  // Get all project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  // Apply staggered animation classes to project cards
  projectCards.forEach((card, index) => {
    // Add a class with animation delay based on index
    card.classList.add('animate-scale-in');
    card.classList.add(`delay-${(index + 1) * 100}`);
    // Make sure it's initially invisible
    card.style.opacity = '0';
  });
});

// Animate skills graph bars on scroll into view
function animateSkillsGraph() {
  const skillsSection = document.querySelector('.skills-section');
  if (!skillsSection) return;
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  let animated = false;

  function handleScroll() {
    const rect = skillsSection.getBoundingClientRect();
    if (!animated && rect.top < window.innerHeight * 0.85) {
      skillBars.forEach(bar => {
        const level = bar.style.getPropertyValue('--skill-level') || '0%';
        bar.style.width = level;
        bar.classList.add('skills-animated');
      });
      animated = true;
      window.removeEventListener('scroll', handleScroll);
    }
  }

  // Set initial width to 0 for animation
  skillBars.forEach(bar => {
    bar.style.width = '0%';
  });

  window.addEventListener('scroll', handleScroll);
  // Also trigger on load in case already in view
  handleScroll();
}

window.addEventListener('DOMContentLoaded', animateSkillsGraph);
