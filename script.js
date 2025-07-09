// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');
const nav = document.getElementById('nav');
const backToTopBtn = document.getElementById('back-to-top');
const readMoreBtn = document.getElementById('read-more-btn');
const moreAbout = document.getElementById('more-about');
const contactForm = document.getElementById('contact-form');
const downloadCvBtn = document.getElementById('download-cv');
const yearElement = document.getElementById('year');
const visitorCount = document.getElementById('visitor-count');
const navLinks = document.querySelectorAll('.nav-link');

// Dark/Light Mode Toggle
function toggleDarkLightMode(isDark) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleIcon.children[0].classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleIcon.children[0].classList.replace('fa-moon', 'fa-sun');
    }
}

// Check for saved user preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
toggleDarkLightMode(currentTheme === 'dark');

// Theme toggle event listener
themeToggle.addEventListener('change', (e) => {
    toggleDarkLightMode(e.target.checked);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Back to top button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Read more button
readMoreBtn.addEventListener('click', () => {
    moreAbout.classList.toggle('hidden');
    readMoreBtn.textContent = moreAbout.classList.contains('hidden') ? 'Read More' : 'Read Less';
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For this example, we'll just log it and show an alert
    console.log({ name, email, subject, message });
    
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Download CV button
downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('CV download functionality will be added when you have a CV ready!');
    // In a real implementation, you would link to your actual CV file
    // window.open('path/to/your/cv.pdf', '_blank');
});

// Set current year in footer
yearElement.textContent = new Date().getFullYear();

// Visitor counter (using localStorage)
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount');
    
    if (count) {
        count = parseInt(count) + 1;
    } else {
        count = 1;
    }
    
    localStorage.setItem('visitorCount', count);
    visitorCount.textContent = count;
}

updateVisitorCount();

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-title, .about-content, .timeline-item, .skills-column, .passion-card, .achievement-card, .goal-item, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Privacy policy link
document.getElementById('privacy-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Privacy policy page will be added later.');
});