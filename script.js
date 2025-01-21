// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Testimonial Slider
const testimonialTrack = document.querySelector('.testimonial-track');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
let currentSlide = 0;

const testimonials = [
    {
        image: 'https://via.placeholder.com/100',
        text: 'Outstanding service and results! Highly recommended!',
        name: 'John Doe',
        position: 'CEO, Tech Corp'
    },
    {
        image: 'https://via.placeholder.com/100',
        text: 'Professional team that delivers exceptional quality.',
        name: 'Jane Smith',
        position: 'Marketing Director'
    },
    {
        image: 'https://via.placeholder.com/100',
        text: 'Transformed our business with innovative solutions.',
        name: 'Mike Johnson',
        position: 'Founder, StartUp Inc'
    }
];

// Create testimonial slides
testimonials.forEach(testimonial => {
    const slide = document.createElement('div');
    slide.className = 'testimonial-card';
    slide.innerHTML = `
        <div class="client-image">
            <img src="${testimonial.image}" alt="${testimonial.name}">
        </div>
        <p>${testimonial.text}</p>
        <h4>${testimonial.name}</h4>
        <p class="client-position">${testimonial.position}</p>
    `;
    testimonialTrack.appendChild(slide);
});

// Slider Navigation
function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    updateSlider();
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    updateSlider();
});

// Auto slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    updateSlider();
}, 5000);

// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    // Add loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Navbar Scroll Effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Function to show/hide items with animation
    function filterItems(filterValue) {
        portfolioItems.forEach(item => {
            // Reset any inline styles
            item.style.display = '';
            item.style.opacity = '';
            item.style.transform = '';
            
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.classList.remove('hidden');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hidden');
            }
        });
    }

    // Add click event to all filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');

            // Get the filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter the items
            filterItems(filterValue);
        });
    });

    // Initialize with "all" filter
    filterItems('all');
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Blog Search and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Blog category filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Blog search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();

            blogPosts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const content = post.querySelector('p').textContent.toLowerCase();
                const category = post.dataset.category.toLowerCase();

                if (title.includes(searchTerm) || 
                    content.includes(searchTerm) || 
                    category.includes(searchTerm)) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            // Here you would typically send this to your backend
            console.log('Newsletter subscription for:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Three.js Background Effect
let scene, camera, renderer, particles;

function init3DBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    
    const container = document.getElementById('hero-background');
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 5000; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x0088ff,
        size: 2,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 500;
}

function animate3DBackground() {
    requestAnimationFrame(animate3DBackground);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add 3D hover effects to service cards
function add3DCardEffects() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });
    
    // Initialize 3D background
    init3DBackground();
    animate3DBackground();
    add3DCardEffects();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
});

// Theme Switcher
function setTheme(theme) {
    const root = document.documentElement;
    
    // Reset all colors to default first
    if (theme === 'blue') {
        root.style.setProperty('--primary-color', '#2563eb');
        root.style.setProperty('--secondary-color', '#1e40af');
        root.style.setProperty('--text-color', '#1f2937');
        root.style.setProperty('--light-bg', '#f3f4f6');
        root.style.setProperty('--accent-color', '#60a5fa');
    } else if (theme === 'earth') {
        root.style.setProperty('--primary-color', '#8B4513');
        root.style.setProperty('--secondary-color', '#A0522D');
        root.style.setProperty('--text-color', '#3E2723');
        root.style.setProperty('--light-bg', '#FFF3E0');
        root.style.setProperty('--accent-color', '#D2691E');
    } else if (theme === 'green') {
        root.style.setProperty('--primary-color', '#166534');
        root.style.setProperty('--secondary-color', '#15803d');
        root.style.setProperty('--text-color', '#14532d');
        root.style.setProperty('--light-bg', '#f0fdf4');
        root.style.setProperty('--accent-color', '#22c55e');
    }
    
    // Save theme preference
    localStorage.setItem('preferred-theme', theme);
}

// Add theme switcher to the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create theme switcher container
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = `
        <div class="theme-buttons">
            <button onclick="setTheme('blue')" class="theme-btn blue-theme">Blue</button>
            <button onclick="setTheme('earth')" class="theme-btn earth-theme">Earth</button>
            <button onclick="setTheme('green')" class="theme-btn green-theme">Green</button>
        </div>
    `;
    
    // Add theme switcher to the page
    document.body.appendChild(themeSwitcher);
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
});
