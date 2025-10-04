// main.js
document.addEventListener('DOMContentLoaded', () => {
  // AOS init (AOS script must be loaded before this file in HTML)
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1200, once: true });
  }

  // Theme toggle (same id used across pages: #theme-toggle)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // set initial icon based on current class
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        themeToggle.classList.add('light');
      } else {
        themeToggle.textContent = '🌙';
        themeToggle.classList.remove('light');
      }
    });
  }

  // Contact form handling (if page has it)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const contactScriptURL = "https://script.google.com/macros/s/AKfycbxE13s4y8k58hkFQMp842WnGIS5rLPdLBzt_Xj8Aa0xYoaziztGcSJXajGIZ7FrwcbD/exec";
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('cname').value,
        email: document.getElementById('cemail').value,
        phone: document.getElementById('cphone').value,
        subject: document.getElementById('csubject').value,
        message: document.getElementById('cmessage').value
      };
      try {
        await fetch(contactScriptURL, { method: "POST", body: JSON.stringify(data) });
        contactForm.reset();
        const success = document.getElementById('csuccess');
        if (success) success.style.display = 'block';
      } catch (err) {
        alert('حصل خطأ، حاول مرة أخرى.');
      }
    });
  }
});
