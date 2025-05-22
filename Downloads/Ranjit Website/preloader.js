/**
 * Preloader Animation
 * A beautiful preloader that displays before the page content loads
 */

// Create preloader as soon as script loads
(function() {
    // Create preloader elements
    createPreloader();
    
    // Initialize preloader
    document.addEventListener('DOMContentLoaded', initPreloader);
})();

/**
 * Create preloader elements
 */
function createPreloader() {
    // Create main preloader container
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.id = 'preloader';
    
    // Create preloader content
    const content = document.createElement('div');
    content.className = 'preloader-content';
    
    // Create logo element
    const logoContainer = document.createElement('div');
    logoContainer.className = 'preloader-logo';
    
    const logo = document.createElement('img');
    logo.src = 'https://ranjithonwheels.in/website/images/logo.png';
    logo.alt = 'Ranjit on Wheels Logo';
    
    logoContainer.appendChild(logo);
    
    // Create text
    const text = document.createElement('div');
    text.className = 'preloader-text';
    text.textContent = 'Ranjit on Wheels';
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.className = 'preloader-spinner';
    
    const circleOuter = document.createElement('div');
    circleOuter.className = 'preloader-circle preloader-circle-outer';
    
    const circleMiddle = document.createElement('div');
    circleMiddle.className = 'preloader-circle preloader-circle-middle';
    
    const circleInner = document.createElement('div');
    circleInner.className = 'preloader-circle preloader-circle-inner';
    
    const globe = document.createElement('div');
    globe.className = 'preloader-globe';
    
    spinner.appendChild(circleOuter);
    spinner.appendChild(circleMiddle);
    spinner.appendChild(circleInner);
    spinner.appendChild(globe);
    
    // Assemble preloader
    content.appendChild(logoContainer);
    content.appendChild(text);
    content.appendChild(spinner);
    preloader.appendChild(content);
    
    // Add to document
    document.body.appendChild(preloader);
    
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';
}

/**
 * Initialize preloader
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Hide preloader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.style.overflow = '';
            
            // Remove preloader from DOM after transition
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1500); // Show preloader for at least 1.5 seconds
    });
    
    // Fallback in case window load doesn't trigger
    setTimeout(() => {
        if (document.getElementById('preloader')) {
            preloader.classList.add('fade-out');
            document.body.style.overflow = '';
            
            // Remove preloader from DOM after transition
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
    }, 5000); // Maximum preloader time: 5 seconds
}/**
 * Preloader Animation
 * A beautiful preloader that displays before the page content loads
 */

// Create preloader as soon as script loads
(function() {
    // Create preloader elements
    createPreloader();
    
    // Initialize preloader
    document.addEventListener('DOMContentLoaded', initPreloader);
})();

/**
 * Create preloader elements
 */
function createPreloader() {
    // Create main preloader container
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.id = 'preloader';
    
    // Create preloader content
    const content = document.createElement('div');
    content.className = 'preloader-content';
    
    // Create logo element
    const logoContainer = document.createElement('div');
    logoContainer.className = 'preloader-logo';
    
    const logo = document.createElement('img');
    logo.src = 'https://ranjithonwheels.in/website/images/logo.png';
    logo.alt = 'Ranjit on Wheels Logo';
    
    logoContainer.appendChild(logo);
    
    // Create text
    const text = document.createElement('div');
    text.className = 'preloader-text';
    text.textContent = 'Ranjit on Wheels';
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.className = 'preloader-spinner';
    
    const circleOuter = document.createElement('div');
    circleOuter.className = 'preloader-circle preloader-circle-outer';
    
    const circleMiddle = document.createElement('div');
    circleMiddle.className = 'preloader-circle preloader-circle-middle';
    
    const circleInner = document.createElement('div');
    circleInner.className = 'preloader-circle preloader-circle-inner';
    
    const globe = document.createElement('div');
    globe.className = 'preloader-globe';
    
    spinner.appendChild(circleOuter);
    spinner.appendChild(circleMiddle);
    spinner.appendChild(circleInner);
    spinner.appendChild(globe);
    
    // Assemble preloader
    content.appendChild(logoContainer);
    content.appendChild(text);
    content.appendChild(spinner);
    preloader.appendChild(content);
    
    // Add to document
    document.body.appendChild(preloader);
    
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';
}

/**
 * Initialize preloader
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Hide preloader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.style.overflow = '';
            
            // Remove preloader from DOM after transition
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1500); // Show preloader for at least 1.5 seconds
    });
    
    // Fallback in case window load doesn't trigger
    setTimeout(() => {
        if (document.getElementById('preloader')) {
            preloader.classList.add('fade-out');
            document.body.style.overflow = '';
            
            // Remove preloader from DOM after transition
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
    }, 5000); // Maximum preloader time: 5 seconds
}