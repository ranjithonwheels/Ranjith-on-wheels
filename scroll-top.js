/**
 * Scroll to Top Button
 * A beautiful animated button that appears when scrolling down and takes users back to the top
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-top-btn')) {
        createScrollTopButton();
    }
    
    // Initialize scroll to top functionality
    initScrollTop();
});

/**
 * Create scroll to top button
 */
function createScrollTopButton() {
    // Create button element
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    // Add to document
    document.body.appendChild(scrollTopBtn);
}

/**
 * Initialize scroll to top functionality
 */
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        // Show button when scrolled down 300px
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
            scrollTopBtn.classList.remove('animate');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        // Add animation class
        this.classList.add('animate');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Remove animation class when animation ends
    scrollTopBtn.addEventListener('animationend', function() {
        this.classList.remove('animate');
    });
}/**
 * Scroll to Top Button
 * A beautiful animated button that appears when scrolling down and takes users back to the top
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-top-btn')) {
        createScrollTopButton();
    }
    
    // Initialize scroll to top functionality
    initScrollTop();
});

/**
 * Create scroll to top button
 */
function createScrollTopButton() {
    // Create button element
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    // Add to document
    document.body.appendChild(scrollTopBtn);
}

/**
 * Initialize scroll to top functionality
 */
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        // Show button when scrolled down 300px
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
            scrollTopBtn.classList.remove('animate');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        // Add animation class
        this.classList.add('animate');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Remove animation class when animation ends
    scrollTopBtn.addEventListener('animationend', function() {
        this.classList.remove('animate');
    });
}