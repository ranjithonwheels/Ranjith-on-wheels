/**
 * Page Loader Animation
 * A beautiful loading screen that displays while the page content loads
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create loader elements if they don't exist
    if (!document.querySelector('.page-loader')) {
        createLoaderElements();
    }
    
    // Initialize the loader
    initLoader();
});

/**
 * Create loader elements
 */
function createLoaderElements() {
    // Create main loader container
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    
    // Create logo element
    const logoContainer = document.createElement('div');
    logoContainer.className = 'loader-logo';
    
    const logo = document.createElement('img');
    logo.src = 'https://ranjithonwheels.in/website/images/logo.png';
    logo.alt = 'Ranjit on Wheels Logo';
    
    logoContainer.appendChild(logo);
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.className = 'loader-spinner';
    
    // Create text
    const text = document.createElement('div');
    text.className = 'loader-text';
    text.textContent = 'Loading';
    
    // Create progress bar
    const progress = document.createElement('div');
    progress.className = 'loader-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'loader-progress-bar';
    progressBar.id = 'loaderProgressBar';
    
    progress.appendChild(progressBar);
    
    // Assemble loader
    loader.appendChild(logoContainer);
    loader.appendChild(spinner);
    loader.appendChild(text);
    loader.appendChild(progress);
    
    // Add to document
    document.body.prepend(loader);
}

/**
 * Initialize the loader
 */
function initLoader() {
    const loader = document.querySelector('.page-loader');
    const progressBar = document.getElementById('loaderProgressBar');
    
    if (!loader || !progressBar) return;
    
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';
    
    // Simulate loading progress
    let progress = 0;
    const totalDuration = 2000; // Total loading time in ms
    const interval = 20; // Update interval in ms
    const increment = (interval / totalDuration) * 100;
    
    const progressInterval = setInterval(() => {
        progress += increment;
        
        // Slow down progress as it approaches 100%
        if (progress > 80) {
            progress += increment * 0.5;
        }
        
        // Cap at 90% - the final 10% will complete when page is fully loaded
        if (progress >= 90) {
            progress = 90;
            clearInterval(progressInterval);
            
            // Wait for window load to complete to 100%
            window.addEventListener('load', completeLoading);
            
            // Fallback in case window load doesn't trigger
            setTimeout(completeLoading, 1000);
        }
        
        progressBar.style.width = `${progress}%`;
    }, interval);
    
    // Function to complete the loading animation
    function completeLoading() {
        // Only run once
        if (progress >= 100) return;
        window.removeEventListener('load', completeLoading);
        
        // Complete the progress bar
        progress = 100;
        progressBar.style.width = '100%';
        
        // Hide loader after a short delay
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            document.body.style.overflow = '';
            
            // Remove loader from DOM after transition
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500);
    }
    
    // Ensure loader is removed if page load takes too long
    setTimeout(() => {
        if (document.querySelector('.page-loader')) {
            completeLoading();
        }
    }, 5000);
}

// Export function for external use
window.showPageLoader = function() {
    // Remove existing loader if present
    const existingLoader = document.querySelector('.page-loader');
    if (existingLoader) {
        existingLoader.remove();
    }
    
    // Create and initialize new loader
    createLoaderElements();
    initLoader();
};/**
 * Page Loader Animation
 * A beautiful loading screen that displays while the page content loads
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create loader elements if they don't exist
    if (!document.querySelector('.page-loader')) {
        createLoaderElements();
    }
    
    // Initialize the loader
    initLoader();
});

/**
 * Create loader elements
 */
function createLoaderElements() {
    // Create main loader container
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    
    // Create logo element
    const logoContainer = document.createElement('div');
    logoContainer.className = 'loader-logo';
    
    const logo = document.createElement('img');
    logo.src = 'https://ranjithonwheels.in/website/images/logo.png';
    logo.alt = 'Ranjit on Wheels Logo';
    
    logoContainer.appendChild(logo);
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.className = 'loader-spinner';
    
    // Create text
    const text = document.createElement('div');
    text.className = 'loader-text';
    text.textContent = 'Loading';
    
    // Create progress bar
    const progress = document.createElement('div');
    progress.className = 'loader-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'loader-progress-bar';
    progressBar.id = 'loaderProgressBar';
    
    progress.appendChild(progressBar);
    
    // Assemble loader
    loader.appendChild(logoContainer);
    loader.appendChild(spinner);
    loader.appendChild(text);
    loader.appendChild(progress);
    
    // Add to document
    document.body.prepend(loader);
}

/**
 * Initialize the loader
 */
function initLoader() {
    const loader = document.querySelector('.page-loader');
    const progressBar = document.getElementById('loaderProgressBar');
    
    if (!loader || !progressBar) return;
    
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';
    
    // Simulate loading progress
    let progress = 0;
    const totalDuration = 2000; // Total loading time in ms
    const interval = 20; // Update interval in ms
    const increment = (interval / totalDuration) * 100;
    
    const progressInterval = setInterval(() => {
        progress += increment;
        
        // Slow down progress as it approaches 100%
        if (progress > 80) {
            progress += increment * 0.5;
        }
        
        // Cap at 90% - the final 10% will complete when page is fully loaded
        if (progress >= 90) {
            progress = 90;
            clearInterval(progressInterval);
            
            // Wait for window load to complete to 100%
            window.addEventListener('load', completeLoading);
            
            // Fallback in case window load doesn't trigger
            setTimeout(completeLoading, 1000);
        }
        
        progressBar.style.width = `${progress}%`;
    }, interval);
    
    // Function to complete the loading animation
    function completeLoading() {
        // Only run once
        if (progress >= 100) return;
        window.removeEventListener('load', completeLoading);
        
        // Complete the progress bar
        progress = 100;
        progressBar.style.width = '100%';
        
        // Hide loader after a short delay
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            document.body.style.overflow = '';
            
            // Remove loader from DOM after transition
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500);
    }
    
    // Ensure loader is removed if page load takes too long
    setTimeout(() => {
        if (document.querySelector('.page-loader')) {
            completeLoading();
        }
    }, 5000);
}

// Export function for external use
window.showPageLoader = function() {
    // Remove existing loader if present
    const existingLoader = document.querySelector('.page-loader');
    if (existingLoader) {
        existingLoader.remove();
    }
    
    // Create and initialize new loader
    createLoaderElements();
    initLoader();
};