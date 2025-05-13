function revealTimelineEntries() {
  const entries = document.querySelectorAll('.timeline-entry');

  const observer = new IntersectionObserver((entriesList) => {
    entriesList.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  entries.forEach(entry => observer.observe(entry));
}

function revealSections() {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entriesList) => {
    entriesList.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => observer.observe(section));
}

function enableSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });
}

function enableProjectAccordion() {
  const headers = document.querySelectorAll('.project-toggle');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.project-card');
      const body = card.querySelector('.project-body');
      const isExpanded = body.classList.contains('expanded');

      // Collapse all others
      document.querySelectorAll('.project-body.expanded').forEach(panel => {
        panel.style.height = panel.scrollHeight + 'px'; // set current height
        requestAnimationFrame(() => {
          panel.style.height = '0px';
        });
        panel.classList.remove('expanded');
        panel.previousElementSibling.classList.remove('active');
      });

      if (!isExpanded) {
        body.classList.add('expanded');
        header.classList.add('active');
        body.style.height = body.scrollHeight + 'px';

        body.addEventListener('transitionend', function handler() {
          body.style.height = 'auto'; // allow responsive content
          body.removeEventListener('transitionend', handler);
        });
      } else {
        body.style.height = body.scrollHeight + 'px';
        requestAnimationFrame(() => {
          body.style.height = '0px';
        });
        body.classList.remove('expanded');
        header.classList.remove('active');
      }
    });
  });
}



document.addEventListener("DOMContentLoaded", () => {
  revealTimelineEntries();
  revealSections();
  enableSmoothScroll();
  enableProjectAccordion();
});

