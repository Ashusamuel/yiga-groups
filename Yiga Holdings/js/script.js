document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Header Scroll & Active State
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.main-nav a');
  
  const handleScroll = () => {
    // Header background change
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active navigation state
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(currentSection)) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Init on load

  /* ==========================================================================
     Smooth Scrolling
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (mainNav.classList.contains('open')) {
          toggleMenu();
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80, // offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     Mobile Navigation Toggle
     ========================================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  const toggleMenu = () => {
    menuToggle.classList.toggle('open');
    mainNav.classList.toggle('open');
    document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  /* ==========================================================================
     Scroll Reveal Animations
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target); 
      }
    });
  };

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ==========================================================================
     Contact Form Validation
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        formMessage.textContent = 'Please fill out all required fields.';
        formMessage.className = 'form-message error';
        return;
      }
      
      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.className = 'form-message error';
        return;
      }
      
      // Simulate successful submission
      formMessage.textContent = 'Thank you. Your message has been received.';
      formMessage.className = 'form-message success';
      contactForm.reset();
      
      setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
      }, 5000);
    });
  }
});
