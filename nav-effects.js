// Enhanced Floating Navigation with Scroll Effects
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav-main');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    let scrollTimeout;

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Add scroll effect to navbar
    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Add temporary glow effect during scroll
        nav.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            nav.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 150);
    }

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 120; // Account for floating nav height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll listener with throttling
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => {
                ticking = false;
            }, 10);
        }
    }

    window.addEventListener('scroll', requestTick);

    // Add intersection observer for active nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        rootMargin: '-120px 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current link
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
