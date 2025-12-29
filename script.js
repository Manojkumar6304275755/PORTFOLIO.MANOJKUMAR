document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const nav = document.querySelector('nav');
  const scrollBtn = document.querySelector('.scroll-button a');
  const body = document.body;
  const navBar = document.querySelector('.navbar');
  const cancelBtn = document.querySelector('.cancel-btn');
  const navLinks = document.querySelectorAll('.menu li a');
  const themeToggle = document.getElementById('theme-toggle');
  const yearElement = document.getElementById('year');
  const contactForm = document.getElementById('contact-form');
  const skillBars = document.querySelectorAll('.skill-bar');
  const menuBtn = document.querySelector('.menu-btn');

  // Set current year in footer
  yearElement.textContent = new Date().getFullYear();

  // ===== Dark Mode Toggle =====
  function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDarkMode = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDarkMode);

    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  }

  // Check for saved theme preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  themeToggle.addEventListener('click', toggleDarkMode);

  // ===== Sticky Navigation =====
  function handleScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 20) {
      nav.classList.add('sticky');
      scrollBtn.classList.add('active');
    } else {
      nav.classList.remove('sticky');
      scrollBtn.classList.remove('active');
    }

    // Animate skill bars when they come into view
    if (isElementInViewport(document.querySelector('.skills'))) {
      animateSkillBars();
    }
  }

  // Throttle scroll event for better performance
  let isScrolling;
  window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(handleScroll, 50);
  }, false);

  // Initial check
  handleScroll();

  // ===== Mobile Navigation =====
  function toggleNavMenu(show) {
    if (show) {
      navBar.classList.add('active');
      menuBtn.style.opacity = '0';
      menuBtn.style.pointerEvents = 'none';
      body.style.overflow = 'hidden';
      scrollBtn.style.pointerEvents = 'none';
    } else {
      navBar.classList.remove('active');
      menuBtn.style.opacity = '1';
      menuBtn.style.pointerEvents = 'auto';
      body.style.overflow = 'auto';
      scrollBtn.style.pointerEvents = 'auto';
    }
  }

  // Event Listeners
  menuBtn.addEventListener('click', () => toggleNavMenu(true));
  cancelBtn.addEventListener('click', () => toggleNavMenu(false));

  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleNavMenu(false));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navBar.classList.contains('active') && 
        !e.target.closest('.navbar') && 
        !e.target.closest('.menu-btn')) {
      toggleNavMenu(false);
    }
  });

  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = nav.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Scroll to Top Button =====
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== Animate Skill Bars =====
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      bar.style.width = level;
    });
  }

  // Check if skills are in view on load
  if (isElementInViewport(document.querySelector('.skills'))) {
    animateSkillBars();
  }

  // ===== Contact Form Handling =====
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Here you would typically send the data to a server
      console.log('Form submitted:', data);

      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // ===== Helper Functions =====
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // ===== Accessibility Improvements =====
  // Add keyboard navigation for menu
  menuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleNavMenu(true);
    }
  });

  cancelBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleNavMenu(false);
    }
  });
});

