document.addEventListener('DOMContentLoaded', () => {
    // --- Page Load Animations ---
    const heroElements = document.querySelectorAll('.animate-on-load');
    // Use a small timeout to ensure the browser has rendered the initial state
    setTimeout(() => {
        heroElements.forEach(el => {
            el.classList.add('loaded');
        });
    }, 100);

    // Smooth scrolling for the primary CTA button
    const primaryCtaButton = document.querySelector('.btn-primary');

    if (primaryCtaButton) {
        primaryCtaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = primaryCtaButton.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
});