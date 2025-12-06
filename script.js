// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (!mobileMenu.classList.contains('hidden')) {
        anime({
            targets: '#mobile-menu a',
            opacity: [0, 1],
            translateY: [-20, 0],
            delay: anime.stagger(100),
            easing: 'easeOutQuad'
        });
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Hero Section Animation
document.addEventListener('DOMContentLoaded', () => {
    // Wrap every letter in a span
    const textWrapper = document.querySelector('#home h2');
    if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter inline-block'>$&</span>");
    }

    const heroTimeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    });

    heroTimeline
        .add({
            targets: '#home h2 .letter',
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70 * i
        })
        .add({
            targets: '#home h1',
            opacity: [0, 1],
            translateY: [30, 0],
        }, '-=600')
        .add({
            targets: '#home p',
            opacity: [0, 1],
            translateY: [30, 0],
        }, '-=800')
        .add({
            targets: '#home .flex a',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(200)
        }, '-=800')
        .add({
            targets: '#home .mt-16 a',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100)
        }, '-=800');
});

// Scroll Animations using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;

            // Animate Section Headers
            anime({
                targets: `#${sectionId} h2, #${sectionId} .w-20`,
                opacity: [0, 1],
                translateY: [30, 0],
                delay: anime.stagger(200),
                easing: 'easeOutQuad'
            });

            // Specific animations per section
            if (sectionId === 'about') {
                anime({
                    targets: '#about .grid > div',
                    opacity: [0, 1],
                    translateY: [50, 0],
                    delay: anime.stagger(200),
                    easing: 'easeOutQuad'
                });
            } else if (sectionId === 'skills') {
                anime({
                    targets: '#skills-track > div',
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    delay: anime.stagger(100),
                    easing: 'easeOutElastic(1, .6)'
                });
            } else if (sectionId === 'projects') {
                anime({
                    targets: '#projects .grid > div',
                    opacity: [0, 1],
                    translateY: [50, 0],
                    delay: anime.stagger(200),
                    easing: 'easeOutQuad'
                });
            } else if (sectionId === 'contact') {
                anime({
                    targets: '#contact form',
                    opacity: [0, 1],
                    translateY: [30, 0],
                    easing: 'easeOutQuad'
                });
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    if (section.id !== 'home') { // Skip home as it triggers on load
        observer.observe(section);
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Horizontal scroll for skills section
// Skills Marquee Duplication
const skillsTrack = document.getElementById('skills-track');
if (skillsTrack) {
    const skills = Array.from(skillsTrack.children);
    skills.forEach(skill => {
        const clone = skill.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        skillsTrack.appendChild(clone);
    });
}

// Projects Marquee Duplication
const projectsTrack = document.getElementById('projects-track');
if (projectsTrack) {
    const projects = Array.from(projectsTrack.children);
    projects.forEach(project => {
        const clone = project.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        projectsTrack.appendChild(clone);
    });
}

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows cursor exactly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with delay (using animate for smoothness)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });
}
// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
const htmlElement = document.documentElement;

// Check for saved theme or system preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

function toggleTheme() {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        htmlElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
}
