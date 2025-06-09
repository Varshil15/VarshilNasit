// Custom Scroll Animation (AOS-like, re-triggerable)
document.addEventListener('DOMContentLoaded', function () {
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      } else {
        entry.target.classList.remove('fade-in-up');
      }
    });
  }, { threshold: 0.15 });
  animatedEls.forEach(el => observer.observe(el));
});
