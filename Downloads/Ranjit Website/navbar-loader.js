/**
 * Navbar Loading Bar
 * A loading bar that appears at the top of the navbar when scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add navbar loading bar
    addNavbarLoadingBar();
});

/**
 * Add loading bar to navbar
 */
function addNavbarLoadingBar() {
    // Create loading bar element
    const loadingBar = document.createElement('div');
    loadingBar.className = 'navbar-loading';
    loadingBar.id = 'navbarLoading';
    
    // Get navbar element
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Add loading bar to navbar
        navbar.appendChild(loadingBar);
        
        // Initialize loading bar
        initNavbarLoadingBar();
    }
}

/**
 * Initialize navbar loading bar
 */
function initNavbarLoadingBar() {
    const loadingBar = document.getElementById('navbarLoading');
    if (!loadingBar) return;
    
    // Calculate document height
    const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    
    // Calculate viewport height
    const windowHeight = window.innerHeight;
    
    // Calculate maximum scroll position
    const maxScroll = docHeight - windowHeight;
    
    // Update loading bar width on scroll
    window.addEventListener('scroll', function() {
        // Calculate scroll percentage
        const scrollPercentage = (window.scrollY / maxScroll) * 100;
        
        // Update loading bar width
        loadingBar.style.width = scrollPercentage + '%';
    });
}