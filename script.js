// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Navigation highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  // Function to highlight the active navigation link
  function highlightNavLink() {
    let currentSectionId = "";
    let scrollPosition = window.scrollY;

    // Find the current section
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.id;
      }
    });

    // Highlight the corresponding nav link
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  // Add scroll event listener
  window.addEventListener("scroll", highlightNavLink);

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    });
  });

  // Add a class to the navigation when scrolled
  function toggleStickyNav() {
    const nav = document.querySelector("nav");
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", toggleStickyNav);

  // Animate elements when they come into view
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate
  const animateElements = document.querySelectorAll(
    ".about-block, .timeline-item, .project-card"
  );
  animateElements.forEach((element) => {
    element.classList.add("fade-in");
    observer.observe(element);
  });

  // Add animation classes to CSS
  const style = document.createElement("style");
  style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        nav.scrolled {
            background-color: rgba(95, 113, 97, 0.95);
            padding: 0.7rem 0;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        nav a.active {
            color: var(--sage-accent);
            font-weight: 700;
        }

    `;
  document.head.appendChild(style);
});
