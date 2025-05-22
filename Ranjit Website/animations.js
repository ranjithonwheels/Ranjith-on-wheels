// Enhanced Animation Observer for All Sections
document.addEventListener('DOMContentLoaded', function() {
    // Create an Intersection Observer with options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add both 'animate' and 'active' classes for compatibility
                entry.target.classList.add('animate', 'active');
                // Add staggered animation for child elements if present
                const animatedChildren = entry.target.querySelectorAll('.animate-child');
                animatedChildren.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('active');
                    }, index * 200); // 200ms delay between each child
                });
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const animatedElements = document.querySelectorAll(
        '.about-section, .current-trip, .experience-section, .news-section, .news-card, .subscriber-count'
    );

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Enhanced hover effects
    const hoverElements = document.querySelectorAll('.about-image, .news-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // Cleanup function for better performance
    function cleanup() {
        hoverElements.forEach(element => {
            element.removeEventListener('mouseenter', () => {});
            element.removeEventListener('mouseleave', () => {});
        });
        observer.disconnect();
    }

    // Cleanup on page unload
    window.addEventListener('unload', cleanup);

    // Scroll Animation Observer
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        scrollObserver.observe(el);
    });

    // Observe all scroll-left elements
    document.querySelectorAll('.scroll-left').forEach(el => {
        scrollObserver.observe(el);
    });

    // Observe all scroll-right elements
    document.querySelectorAll('.scroll-right').forEach(el => {
        scrollObserver.observe(el);
    });

    // Observe all scroll-scale elements
    document.querySelectorAll('.scroll-scale').forEach(el => {
        scrollObserver.observe(el);
    });
});