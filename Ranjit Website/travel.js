// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.getElementById('navLinks');
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    // Function to open mobile menu
    function openMobileMenu() {
        navLinks.classList.add('active');
        if (window.innerWidth <= 768) {
            openMenu.style.display = 'none';
            closeMenu.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        }
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        if (window.innerWidth <= 768) {
            openMenu.style.display = 'block';
            closeMenu.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    }
    
    // Toggle menu on hamburger icon click
    if (openMenu) {
        openMenu.addEventListener('click', openMobileMenu);
    }
    
    // Close menu on X icon click
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking support in sidebar
    const sidebarSupportBtn = document.querySelector('.sidebar-support button');
    if (sidebarSupportBtn) {
        sidebarSupportBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768) {
            // Reset styles for desktop
            openMenu.style.display = 'none';
            closeMenu.style.display = 'none';
            navLinks.classList.remove('active'); // Ensure menu is closed on desktop
            document.body.style.overflow = ''; // Enable scrolling
        } else {
            // Reset styles for mobile
            if (navLinks.classList.contains('active')) {
                openMenu.style.display = 'none';
                closeMenu.style.display = 'block';
            } else {
                openMenu.style.display = 'block';
                closeMenu.style.display = 'none';
            }
        }
    }
    
    // Initial call to set correct state
    handleResize();
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Initialize the globe
    initGlobe();
});

// Function to initialize the globe
function initGlobe() {
    // Country coordinates with circle marker (latitude, longitude)
    const countries = [
        { name: "India", lat: 20.5937, lng: 78.9629, info: "Starting point", type: "circle" }
    ];

    // Delivery pins with information boxes
    const deliveryPins = [
        { name: "Vietnam", lat: 14.0583, lng: 108.2772, info: "Vietnam" },
        { name: "Thailand", lat: 15.8700, lng: 100.9925, info: "Thailand" },
        { name: "Indonesia", lat: -0.7893, lng: 113.9213, info: "Indonesia" },
        { name: "Singapore", lat: 1.3521, lng: 103.8198, info: "Singapore" },
        { name: "Sri Lanka", lat: 7.8731, lng: 80.7718, info: "Sri Lanka" },
        { name: "Japan", lat: 36.2048, lng: 138.2529, info: "Japan" },
        { name: "China", lat: 35.8617, lng: 104.1954, info: "China" },
        { name: "Malaysia", lat: 4.2105, lng: 101.9758, info: "Malaysia" },
        { name: "Mongolia", lat: 46.8625, lng: 103.8467, info: "Mongolia" },
        { name: "Australia", lat: -25.2744, lng: 133.7751, info: "Australia" },
        { name: "Korea", lat: 35.9078, lng: 127.7669, info: "Korea" },
        // Added countries
        { name: "Cambodia", lat: 12.5657, lng: 104.9910, info: "Cambodia" },
        { name: "Taiwan", lat: 23.6978, lng: 120.9605, info: "Taiwan" }
    ];

    // Three.js variables
    let scene, camera, renderer, globe, raycaster, mouse;
    let autoRotate = true;
    const radius = 5;
    const rotationSpeed = 0.001;
    
    // DOM elements
    const container = document.getElementById('globe-container');
    if (!container) {
        console.error('Globe container not found');
        return;
    }
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 10;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create Earth globe
    const earthGeometry = new THREE.SphereGeometry(radius, 64, 64);
    
    // Simple material as fallback
    const earthMaterial = new THREE.MeshBasicMaterial({
        color: 0x2233ff,
        transparent: true,
        opacity: 0.8
    });
    
    // Create globe
    globe = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(globe);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Load Earth texture if available
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_atmos_2048.jpg',
        function(texture) {
            // Create better material once texture is loaded
            const betterMaterial = new THREE.MeshPhongMaterial({ 
                map: texture,
                shininess: 5
            });
            
            // Update globe material
            globe.material = betterMaterial;
            
            // Add country markers
            addCountryMarkers();
            
            // Add delivery pins
            addDeliveryPins();
        },
        undefined,
        function(err) {
            console.error('Error loading texture:', err);
            // Use fallback and add markers anyway
            addCountryMarkers();
            addDeliveryPins();
        }
    );
    
    // Initialize raycaster for interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    container.addEventListener('mousemove', onMouseMove);
    
    // Add mouse/touch drag controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    container.addEventListener('mousedown', function(e) {
        isDragging = true;
        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    });
    
    container.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };
            
            if (autoRotate) {
                autoRotate = false;
            }
            
            globe.rotation.y += deltaMove.x * 0.005;
            globe.rotation.x += deltaMove.y * 0.005;
            
            previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
        }
    });
    
    container.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Touch events for mobile
    container.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            isDragging = true;
            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
    });
    
    container.addEventListener('touchmove', function(e) {
        if (isDragging && e.touches.length === 1) {
            const deltaMove = {
                x: e.touches[0].clientX - previousMousePosition.x,
                y: e.touches[0].clientY - previousMousePosition.y
            };
            
            if (autoRotate) {
                autoRotate = false;
            }
            
            globe.rotation.y += deltaMove.x * 0.005;
            globe.rotation.x += deltaMove.y * 0.005;
            
            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
    });
    
    container.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Convert latitude and longitude to 3D coordinates
    function latLngToVector3(lat, lng, radius) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        
        return new THREE.Vector3(
            -radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }
    
    // Arrays to hold markers
    const markers = [];
    const pinMarkers = [];
    const infoBoxes = [];
    
    // Add markers for all countries
    function addCountryMarkers() {
        // Create a canvas to draw the circle with border
        const canvas = document.createElement('canvas');
        const size = 64;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Draw a circle with white border
        ctx.clearRect(0, 0, size, size);
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2 - 2, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 6;
        ctx.stroke();
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        
        countries.forEach(country => {
            // Get position for the marker
            const position = latLngToVector3(country.lat, country.lng, radius);
            
            // Create a sprite material with the circle texture
            const pointMaterial = new THREE.SpriteMaterial({
                map: texture,
                transparent: true
            });
            
            // Create a sprite for the point
            const point = new THREE.Sprite(pointMaterial);
            point.scale.set(0.25, 0.25, 1); // Set the size of the point
            
            // Position the point
            point.position.copy(position);
            
            // Push point slightly out from globe surface
            const direction = position.clone().normalize();
            point.position.add(direction.multiplyScalar(0.1));
            
            // Store country data with point
            point.userData = { country: country };
            
            // Add directly to globe
            globe.add(point);
            markers.push(point);
        });
    }
    
    // Add delivery pins with diamond-shaped icons and info boxes
    function addDeliveryPins() {
        // Create diamond-shaped pin icon
        const pinCanvas = document.createElement('canvas');
        const pinSize = 128;
        pinCanvas.width = pinSize;
        pinCanvas.height = pinSize;
        const pinCtx = pinCanvas.getContext('2d');
        
        // Draw diamond shape
        pinCtx.clearRect(0, 0, pinSize, pinSize);
        pinCtx.beginPath();
        pinCtx.moveTo(pinSize/2, pinSize/4);  // Top point
        pinCtx.lineTo(pinSize*3/4, pinSize/2); // Right point
        pinCtx.lineTo(pinSize/2, pinSize*3/4); // Bottom point
        pinCtx.lineTo(pinSize/4, pinSize/2);   // Left point
        pinCtx.closePath();
        
        // Add outer diamond (larger)
        pinCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        pinCtx.lineWidth = 8;
        pinCtx.stroke();
        
        // Add inner diamond (smaller)
        pinCtx.beginPath();
        const offset = pinSize/8;
        pinCtx.moveTo(pinSize/2, pinSize/4 + offset);       // Top point
        pinCtx.lineTo(pinSize*3/4 - offset, pinSize/2);      // Right point
        pinCtx.lineTo(pinSize/2, pinSize*3/4 - offset);      // Bottom point
        pinCtx.lineTo(pinSize/4 + offset, pinSize/2);        // Left point
        pinCtx.closePath();
        pinCtx.strokeStyle = 'white';
        pinCtx.lineWidth = 4;
        pinCtx.stroke();
        
        // Create texture from canvas
        const pinTexture = new THREE.CanvasTexture(pinCanvas);
        
        deliveryPins.forEach(pin => {
            // Get position for the marker
            const position = latLngToVector3(pin.lat, pin.lng, radius);
            
            // Create a sprite material with the diamond texture
            const pinMaterial = new THREE.SpriteMaterial({
                map: pinTexture,
                transparent: true
            });
            
            // Create a sprite for the pin
            const pinSprite = new THREE.Sprite(pinMaterial);
            pinSprite.scale.set(0.6, 0.6, 1); // Smaller size for the pin
            
            // Position the pin
            pinSprite.position.copy(position);
            
            // Push pin slightly out from globe surface
            const direction = position.clone().normalize();
            pinSprite.position.add(direction.multiplyScalar(0.2));
            
            // Store pin data
            pinSprite.userData = { 
                pin: pin,
                isPin: true
            };
            
            // Add directly to globe instead of using an Object3D
            globe.add(pinSprite);
            pinMarkers.push(pinSprite);
            
            // Create info box for delivery information
            const infoBoxElement = document.createElement('div');
            infoBoxElement.className = 'delivery-info-box';
            infoBoxElement.style.position = 'absolute';
            infoBoxElement.style.backgroundColor = 'rgba(255, 255, 255, 0.84)';
            infoBoxElement.style.color = 'black';
            infoBoxElement.style.padding = '8px 12px';
            infoBoxElement.style.borderRadius = '2px';
            infoBoxElement.style.pointerEvents = 'none';
            infoBoxElement.style.display = 'none';
            infoBoxElement.style.zIndex = '1000';
            infoBoxElement.style.border = '1px solid rgba(0, 0, 0, 0.7)';
            infoBoxElement.style.maxWidth = '150px';
            infoBoxElement.style.textAlign = 'center';
            infoBoxElement.style.fontSize = '14px';
            infoBoxElement.style.fontFamily = 'Arial, sans-serif';
            
            // Display delivery info
            infoBoxElement.innerHTML = `${pin.info}`;
            
            container.appendChild(infoBoxElement);
            infoBoxes.push({
                element: infoBoxElement,
                pin: pin,
                position: position
            });
        });
    }
    
    // Window resize handler
    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'country-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = '1000';
    container.appendChild(tooltip);
    
    // Variable to track currently hovered marker
    let hoveredMarker = null;
    
    // Mouse move handler
    function onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Check for intersections with objects in the scene
        raycaster.setFromCamera(mouse, camera);
        
        // Reset the previously hovered marker
        hoveredMarker = null;
        
        // Check intersections with all markers and pins
        const intersects = raycaster.intersectObjects(globe.children);
        
        // Reset all markers and pins to normal size
        markers.forEach(point => {
            point.scale.set(0.25, 0.25, 1);
        });
        
        pinMarkers.forEach(pin => {
            pin.scale.set(0.6, 0.6, 1);
        });
        
        // Hide all info boxes
        infoBoxes.forEach(box => {
            box.element.style.display = 'none';
        });
        
        // Hide tooltip
        tooltip.style.display = 'none';
        
        // Reset cursor
        document.body.style.cursor = 'default';
        
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            
            // If it's a country marker
            if (intersectedObject.userData.country) {
                const country = intersectedObject.userData.country;
                
                // Highlight the selected point by making it slightly larger
                intersectedObject.scale.set(0.35, 0.35, 1);
                
                // Show tooltip
                tooltip.innerHTML = `<strong>${country.name}</strong>`;
                tooltip.style.display = 'block';
                tooltip.style.left = event.clientX + 15 + 'px';
                tooltip.style.top = event.clientY + 'px';
                
                document.body.style.cursor = 'pointer';
            } 
            // If it's a pin marker
            else if (intersectedObject.userData.isPin) {
                const pin = intersectedObject.userData.pin;
                
                // Highlight the selected pin by making it slightly larger
                intersectedObject.scale.set(0.8, 0.8, 1);
                hoveredMarker = intersectedObject;
                
                // Show info box
                const matchingInfoBox = infoBoxes.find(box => box.pin.name === pin.name);
                if (matchingInfoBox) {
                    // Convert 3D position to screen coordinates
                    const screenPos = new THREE.Vector3();
                    intersectedObject.getWorldPosition(screenPos);
                    screenPos.project(camera);
                    
                    const x = (screenPos.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
                    const y = (- screenPos.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
                    
                    // Position the info box
                    matchingInfoBox.element.style.display = 'block';
                    matchingInfoBox.element.style.left = x - (matchingInfoBox.element.offsetWidth / 2) + 'px';
                    matchingInfoBox.element.style.top = y - matchingInfoBox.element.offsetHeight - 15 + 'px';
                }
                
                document.body.style.cursor = 'pointer';
            }
        }
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (autoRotate) {
            globe.rotation.y += rotationSpeed;
        }
        
        // Update marker positions (this is now handled by the globe parenting)
        
        // Render the scene
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
}

// Play button functionality
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            alert('Video playback would start here!');
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});