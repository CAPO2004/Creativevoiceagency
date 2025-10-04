AOS.init({ duration: 1200, once: true });

// Script for theme toggle (index.html, contact.html)
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      themeToggle.textContent = "☀️";
      themeToggle.classList.add("light");
    } else {
      themeToggle.textContent = "🌙";
      themeToggle.classList.remove("light");
    }
  });
}

// Script for theme toggle (clients.html, works.html, manage.html - uses different ID)
const themeToggleAlt = document.getElementById("themeToggle");
if (themeToggleAlt) {
  themeToggleAlt.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggleAlt.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
}

// Script for contact form submission (contact.html)
const contactScriptURL = "https://script.google.com/macros/s/AKfycbxE13s4y8k58hkFQMp842WnGIS5rLPdLBzt_Xj8Aa0xYoaziztGcSJXajGIZ7FrwcbD/exec";

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("contactForm");
  const data = {
    name: document.getElementById("cname").value,
    email: document.getElementById("cemail").value,
    phone: document.getElementById("cphone").value,
    subject: document.getElementById("csubject").value,
    message: document.getElementById("cmessage").value
  };
  try {
    await fetch(contactScriptURL, { method: "POST", body: JSON.stringify(data) });
    form.reset();
    document.getElementById("csuccess").style.display = "block";
  } catch (error) {
    alert("حصل خطأ، حاول مرة أخرى.");
  }
}

// Animations IntersectionObserver (manage.html)
(function(){
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.anim').forEach(el => el.classList.add('inview'));
    return;
  }
  const items = document.querySelectorAll('.anim');
  const options = { root:null, rootMargin:'0px 0px -10% 0px', threshold:0.12 };
  const io = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el=entry.target;
        const delay=el.getAttribute('data-delay'); const dur=el.getAttribute('data-duration');
        if(delay) el.style.transitionDelay=delay;
        if(dur) el.style.transitionDuration=dur;
        el.classList.add('inview');
        observer.unobserve(el);
      }
    });
  },options);
  items.forEach(item=>io.observe(item));
})();

