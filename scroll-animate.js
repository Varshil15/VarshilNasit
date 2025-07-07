// Custom Scroll Animation (AOS-like, re-triggerable)
document.addEventListener('DOMContentLoaded', function () {
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        
        // Special handling for skills section - stagger skill cards
        if (entry.target.classList.contains('skills-modern-section')) {
          const skillCards = entry.target.querySelectorAll('.skill-modern-card');
          skillCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-skill-card');
            }, index * 100); // 100ms delay between each card
          });
        }
      } else {
        entry.target.classList.remove('fade-in-up');
        
        // Remove stagger animation when section leaves viewport
        if (entry.target.classList.contains('skills-modern-section')) {
          const skillCards = entry.target.querySelectorAll('.skill-modern-card');
          skillCards.forEach(card => {
            card.classList.remove('animate-skill-card');
          });
        }
      }
    });
  }, { threshold: 0.18 });
  animatedEls.forEach(el => observer.observe(el));
});
