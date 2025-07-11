// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');
const nav = document.getElementById('nav');
const navContainer = document.querySelector('.nav-container');
const backToTopBtn = document.getElementById('back-to-top');
const readMoreBtn = document.getElementById('read-more-btn');
const moreAbout = document.getElementById('more-about');
const contactForm = document.getElementById('contact-form');
const downloadCvBtn = document.getElementById('download-cv');
const yearElement = document.getElementById('year');
const visitorCount = document.getElementById('visitor-count');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const sections = document.querySelectorAll('.section');
const privacyLink = document.getElementById('privacy-link');

// Dark/Light Mode Toggle
function toggleDarkLightMode(isDark) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleIcon.children[0].classList.replace('fa-sun', 'fa-moon');
        themeToggle.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleIcon.children[0].classList.replace('fa-moon', 'fa-sun');
        themeToggle.checked = false;
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

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
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
    
    // Highlight active nav link
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
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
    console.log({ name, email, subject, message });
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p></p>
            This feature is currently unavailable.<br>
            Please reach out via email or social media.<br>
            Thanks!
        </p>
    `;
    contactForm.parentNode.insertBefore(successMessage, contactForm);
    contactForm.style.display = 'none';
    
    // Reset form after 5 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        successMessage.remove();
    }, 5000);
});

// Download CV button
downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Replace with actual CV file path when ready
    // window.open('assets/files/cv.pdf', '_blank');
    
    // Temporary message
    const tempMessage = document.createElement('div');
    tempMessage.className = 'temp-message';
    tempMessage.textContent = 'CV will be available soon!';
    downloadCvBtn.parentNode.appendChild(tempMessage);
    
    setTimeout(() => {
        tempMessage.remove();
    }, 3000);
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
    visitorCount.textContent = count.toLocaleString();
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
privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Replace with actual privacy policy page when ready
    alert('Privacy policy page will be added soon.');
});

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Add loading animation for images
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = () => {
            img.classList.add('loaded');
        };
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});