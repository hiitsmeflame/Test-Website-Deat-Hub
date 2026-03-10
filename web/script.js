document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initParticles();
  initTypingEffect();
  initScrollAnimations();
  initCountUp();
  initTiltEffect();
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initFormHandler();
});

function initCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let posX = 0, posY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top = mouseY - 4 + 'px';
  });

  const updateFollower = () => {
    posX += (mouseX - 20 - posX) * 0.15;
    posY += (mouseY - 20 - posY) * 0.15;
    follower.style.left = posX + 'px';
    follower.style.top = posY + 'px';
    requestAnimationFrame(updateFollower);
  };
  updateFollower();

  const interactiveElements = document.querySelectorAll('a, button, .feature-card, .pricing-card, .cmd-item, .stat-box');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      follower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      follower.classList.remove('active');
    });
  });
}

function initParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (5 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

function initTypingEffect() {
  const text = "The most powerful Discord nuke bot. Destroy servers with style.";
  const typingElement = document.querySelector('.typing-text');
  let index = 0;

  const type = () => {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50 + Math.random() * 50);
    }
  };

  setTimeout(type, 1000);
}

function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .feature-card, .stat-box, .cmd-item, .pricing-card');

  const revealOnScroll = () => {
    revealElements.forEach((el, index) => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 100);
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
}

function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-num, .h-stat-num');
  let animated = false;

  const animateCounters = () => {
    if (animated) return;

    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      animated = true;

      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count').replace(/,/g, ''));
        const duration = 2500;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;

          if (current < target) {
            stat.textContent = formatNumber(Math.floor(current));
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = formatNumber(target);
          }
        };

        updateCounter();
      });
    }
  };

  window.addEventListener('scroll', animateCounters);
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + 'M+';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K+';
  }
  return num.toString();
}

function initTiltEffect() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initFormHandler() {
  const form = document.querySelector('.contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span>SENT! ✓</span>';
    btn.style.background = '#ffffff';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
