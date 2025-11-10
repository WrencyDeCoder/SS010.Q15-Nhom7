//  INTERSECTION OBSERVER CHO ANIMATIONS 
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve sau khi đã visible để tối ưu performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe tất cả các phần tử cần animation
document.querySelectorAll('.timeline-item, .table-container, .achievement-card, .lesson-item, .team-member').forEach(el => {
    observer.observe(el);
});

//  SCROLL INDICATOR 
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function handleScroll() {
    const scrollY = window.scrollY;
    
    // Ẩn scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = scrollY > 100 ? '0' : '1';
    }
    
    // Hiện navbar khi scroll xuống
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollY > 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    }
    
    // Hiện/ẩn nút scroll to top
    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollToTop) {
        if (scrollY > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    }
    
    // Active menu item based on scroll position
    updateActiveMenuItem();
}

//  SCROLL TO TOP BUTTON 
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

//  NAVBAR MOBILE TOGGLE 
function toggleMobileMenu() {
    const menu = document.querySelector('.navbar-menu');
    const toggle = document.querySelector('.navbar-toggle');
    
    if (menu && toggle) {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

// Đóng menu khi click vào link
document.querySelectorAll('.navbar-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.navbar-menu');
        const toggle = document.querySelector('.navbar-toggle');
        if (menu && toggle) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
});

//  ACTIVE MENU ITEM 
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

//  SMOOTH SCROLL CHO LINKS 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // 80px cho navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

//  KEYBOARD NAVIGATION 
document.addEventListener('keydown', (e) => {
    // ESC để đóng mobile menu
    if (e.key === 'Escape') {
        const menu = document.querySelector('.navbar-menu');
        const toggle = document.querySelector('.navbar-toggle');
        if (menu && toggle && menu.classList.contains('active')) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        }
    }
    
    // Home key - scroll to top
    if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        scrollToTop();
    }
});

//  LAZY LOAD IMAGES 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

//  PRELOAD CRITICAL RESOURCES 
function preloadCriticalResources() {
    // Preload fonts nếu cần
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);
}

//  TABLE ACCESSIBILITY 
function enhanceTableAccessibility() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        // Thêm tabindex cho scrollable tables
        const container = table.closest('.table-container');
        if (container && container.scrollWidth > container.clientWidth) {
            table.setAttribute('tabindex', '0');
            table.setAttribute('role', 'region');
            table.setAttribute('aria-label', 'Bảng so sánh dữ liệu');
        }
    });
}

//  PERFORMANCE MONITORING 
function logPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page load time: ${pageLoadTime}ms`);
            }, 0);
        });
    }
}

//  INIT 
document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalResources();
    enhanceTableAccessibility();
    logPerformance();
    
    // Initial scroll check
    handleScroll();
    
    console.log('✅ Website initialized successfully');
});

//  EXPORT FUNCTIONS
window.scrollToTop = scrollToTop;
window.toggleMobileMenu = toggleMobileMenu;