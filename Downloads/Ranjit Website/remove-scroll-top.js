/**
 * Remove scroll-to-top button if it exists
 */
document.addEventListener('DOMContentLoaded', function() {
    // Find and remove scroll-to-top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.remove();
    }
    
    // Also remove any elements with the scroll-top-btn class
    const scrollTopBtns = document.querySelectorAll('.scroll-top-btn');
    scrollTopBtns.forEach(btn => {
        btn.remove();
    });
});