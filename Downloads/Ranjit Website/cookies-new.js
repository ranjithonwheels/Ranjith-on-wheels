/**
 * Cookie Consent Manager
 * A beautiful, customizable cookie consent solution with settings modal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create cookie consent elements
    createCookieElements();
    
    // Initialize cookie consent
    initCookieConsent();
});

/**
 * Create all cookie consent UI elements
 */
function createCookieElements() {
    // Create cookie container
    const cookieContainer = document.createElement('div');
    cookieContainer.className = 'cookie-container';
    
    // Add loading animation
    const loadingBar = document.createElement('div');
    loadingBar.className = 'cookie-loading';
    cookieContainer.appendChild(loadingBar);
    
    // Create cookie content
    const cookieContent = document.createElement('div');
    cookieContent.className = 'cookie-content';
    
    // Create cookie header
    const cookieHeader = document.createElement('div');
    cookieHeader.className = 'cookie-header';
    
    const cookieIcon = document.createElement('div');
    cookieIcon.className = 'cookie-icon';
    cookieIcon.innerHTML = '<i class="fas fa-cookie-bite"></i>';
    
    const cookieTitle = document.createElement('h3');
    cookieTitle.className = 'cookie-title';
    cookieTitle.textContent = 'Cookie Consent';
    
    cookieHeader.appendChild(cookieIcon);
    cookieHeader.appendChild(cookieTitle);
    
    // Create cookie text
    const cookieText = document.createElement('p');
    cookieText.className = 'cookie-text';
    cookieText.textContent = 'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.';
    
    // Create cookie buttons
    const cookieButtons = document.createElement('div');
    cookieButtons.className = 'cookie-buttons';
    
    const acceptButton = document.createElement('button');
    acceptButton.className = 'cookie-btn cookie-btn-accept pulse';
    acceptButton.textContent = 'Accept All';
    acceptButton.id = 'cookie-accept';
    
    const settingsButton = document.createElement('button');
    settingsButton.className = 'cookie-btn cookie-btn-settings';
    settingsButton.textContent = 'Settings';
    settingsButton.id = 'cookie-settings';
    
    const declineButton = document.createElement('button');
    declineButton.className = 'cookie-btn cookie-btn-decline';
    declineButton.textContent = 'Decline';
    declineButton.id = 'cookie-decline';
    
    cookieButtons.appendChild(acceptButton);
    cookieButtons.appendChild(settingsButton);
    cookieButtons.appendChild(declineButton);
    
    // Assemble cookie content
    cookieContent.appendChild(cookieHeader);
    cookieContent.appendChild(cookieText);
    cookieContent.appendChild(cookieButtons);
    
    // Add content to container
    cookieContainer.appendChild(cookieContent);
    
    // Create settings modal
    const settingsModal = document.createElement('div');
    settingsModal.className = 'cookie-settings-modal';
    
    const settingsContent = document.createElement('div');
    settingsContent.className = 'cookie-settings-content';
    
    // Settings header
    const settingsHeader = document.createElement('div');
    settingsHeader.className = 'cookie-settings-header';
    
    const settingsTitle = document.createElement('h3');
    settingsTitle.className = 'cookie-settings-title';
    settingsTitle.textContent = 'Cookie Preferences';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'cookie-settings-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.id = 'settings-close';
    
    settingsHeader.appendChild(settingsTitle);
    settingsHeader.appendChild(closeButton);
    
    // Settings options
    const settingsOptions = document.createElement('div');
    settingsOptions.className = 'cookie-settings-options';
    
    // Necessary cookies option
    const necessaryOption = createCookieOption(
        'necessary',
        'Necessary Cookies',
        'These cookies are required for the website to function properly and cannot be disabled.',
        true,
        true
    );
    
    // Preferences cookies option
    const preferencesOption = createCookieOption(
        'preferences',
        'Preferences Cookies',
        'These cookies allow the website to remember choices you make and provide enhanced, personalized features.',
        false,
        false
    );
    
    // Analytics cookies option
    const analyticsOption = createCookieOption(
        'analytics',
        'Analytics Cookies',
        'These cookies help us understand how visitors interact with the website, helping us improve our website and services.',
        false,
        false
    );
    
    // Marketing cookies option
    const marketingOption = createCookieOption(
        'marketing',
        'Marketing Cookies',
        'These cookies are used to track visitors across websites to display relevant advertisements.',
        false,
        false
    );
    
    settingsOptions.appendChild(necessaryOption);
    settingsOptions.appendChild(preferencesOption);
    settingsOptions.appendChild(analyticsOption);
    settingsOptions.appendChild(marketingOption);
    
    // Settings buttons
    const settingsButtons = document.createElement('div');
    settingsButtons.className = 'cookie-settings-buttons';
    
    const saveButton = document.createElement('button');
    saveButton.className = 'cookie-btn cookie-btn-accept';
    saveButton.textContent = 'Save Preferences';
    saveButton.id = 'save-preferences';
    
    settingsButtons.appendChild(saveButton);
    
    // Assemble settings content
    settingsContent.appendChild(settingsHeader);
    settingsContent.appendChild(settingsOptions);
    settingsContent.appendChild(settingsButtons);
    
    // Add content to modal
    settingsModal.appendChild(settingsContent);
    
    // Add elements to body
    document.body.appendChild(cookieContainer);
    document.body.appendChild(settingsModal);
}

/**
 * Create a cookie option element
 */
function createCookieOption(id, title, description, isRequired, isChecked) {
    const option = document.createElement('div');
    option.className = 'cookie-option';
    
    const optionInfo = document.createElement('div');
    optionInfo.className = 'cookie-option-info';
    
    const optionTitle = document.createElement('div');
    optionTitle.className = isRequired ? 'cookie-option-title required' : 'cookie-option-title';
    optionTitle.textContent = title;
    
    const optionDescription = document.createElement('div');
    optionDescription.className = 'cookie-option-description';
    optionDescription.textContent = description;
    
    optionInfo.appendChild(optionTitle);
    optionInfo.appendChild(optionDescription);
    
    const toggle = document.createElement('label');
    toggle.className = 'cookie-toggle';
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'cookie-' + id;
    input.checked = isChecked;
    input.disabled = isRequired;
    
    const slider = document.createElement('span');
    slider.className = 'cookie-toggle-slider';
    
    toggle.appendChild(input);
    toggle.appendChild(slider);
    
    option.appendChild(optionInfo);
    option.appendChild(toggle);
    
    return option;
}

/**
 * Initialize cookie consent functionality
 */
function initCookieConsent() {
    const cookieContainer = document.querySelector('.cookie-container');
    const settingsModal = document.querySelector('.cookie-settings-modal');
    const acceptButton = document.getElementById('cookie-accept');
    const settingsButton = document.getElementById('cookie-settings');
    const declineButton = document.getElementById('cookie-decline');
    const closeButton = document.getElementById('settings-close');
    const saveButton = document.getElementById('save-preferences');
    
    // Check if user has already made a choice
    if (!getCookie('cookie-consent')) {
        // Show cookie banner with a slight delay and animation
        setTimeout(() => {
            cookieContainer.classList.add('active');
            
            // Add entrance animation to elements
            const elements = cookieContainer.querySelectorAll('.cookie-header, .cookie-text, .cookie-buttons');
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.transitionDelay = (0.2 + index * 0.1) + 's';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100);
            });
        }, 1000);
    }
    
    // Accept all cookies
    acceptButton.addEventListener('click', () => {
        setCookieConsent({
            necessary: true,
            preferences: true,
            analytics: true,
            marketing: true
        });
        
        hideCookieBanner();
    });
    
    // Open settings modal
    settingsButton.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });
    
    // Decline non-essential cookies
    declineButton.addEventListener('click', () => {
        setCookieConsent({
            necessary: true,
            preferences: false,
            analytics: false,
            marketing: false
        });
        
        hideCookieBanner();
    });
    
    // Close settings modal
    closeButton.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });
    
    // Save preferences
    saveButton.addEventListener('click', () => {
        const preferences = {
            necessary: true, // Always true
            preferences: document.getElementById('cookie-preferences').checked,
            analytics: document.getElementById('cookie-analytics').checked,
            marketing: document.getElementById('cookie-marketing').checked
        };
        
        setCookieConsent(preferences);
        settingsModal.classList.remove('active');
        hideCookieBanner();
    });
}

/**
 * Hide the cookie banner with animation
 */
function hideCookieBanner() {
    const cookieContainer = document.querySelector('.cookie-container');
    
    // Add exit animation
    cookieContainer.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
    cookieContainer.style.transform = 'translateY(20px)';
    cookieContainer.style.opacity = '0';
    
    // Remove from DOM after animation
    setTimeout(() => {
        cookieContainer.classList.remove('active');
        cookieContainer.style.transform = 'translateY(150%)';
        cookieContainer.style.opacity = '';
    }, 500);
}

/**
 * Set cookie consent preferences
 */
function setCookieConsent(preferences) {
    // Save preferences in a cookie (expires in 365 days)
    setCookie('cookie-consent', JSON.stringify(preferences), 365);
    
    // Trigger a custom event that other scripts can listen for
    const event = new CustomEvent('cookieConsentUpdated', { detail: preferences });
    document.dispatchEvent(event);
}

/**
 * Get a cookie value by name
 */
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

/**
 * Set a cookie with name, value and expiration days
 */
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/;SameSite=Lax';
}

/**
 * Delete a cookie by name
 */
function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax';
}

/**
 * Check if a specific cookie type is allowed
 * Usage: if (isCookieAllowed('analytics')) { // initialize analytics }
 */
function isCookieAllowed(type) {
    const consent = getCookie('cookie-consent');
    if (consent) {
        try {
            const preferences = JSON.parse(consent);
            return preferences[type] === true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

// Export functions for external use
window.cookieConsent = {
    isCookieAllowed,
    showSettings: function() {
        document.querySelector('.cookie-settings-modal').classList.add('active');
    },
    reset: function() {
        deleteCookie('cookie-consent');
        location.reload();
    }
};