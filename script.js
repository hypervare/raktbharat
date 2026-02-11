/*********************************
 * Cached selectors
 *********************************/
const navMenu = document.querySelector(".nav-menu");
const toggleBtn = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const scrollBtn = document.getElementById("scrollToTopBtn");
const contactForm = document.getElementById("contactForm");
const ctaButton = document.querySelector(".cta-button");

/*********************************
 * Smooth scrolling for nav links
 *********************************/
navMenu?.querySelectorAll("a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href.startsWith("#")) return;

    e.preventDefault();
    const targetSection = document.querySelector(href);
    targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Close mobile menu
    navMenu.classList.remove("open");
    toggleBtn?.setAttribute("aria-expanded", "false");
  });
});

/*********************************
 * Contact Form
 *********************************/
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    console.log("Form submitted:", { name, email, message });
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });
}

/*********************************
 * Active nav link on scroll
 *********************************/
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = navMenu?.querySelectorAll("a") || [];
  let current = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

/*********************************
 * Buttons
 *********************************/
document.querySelectorAll(".btn-donate, .donate-button").forEach((btn) =>
  btn.addEventListener("click", () =>
    alert("Download started!  Check your downloads folder for RaktBharat.apk")
  )
);

// document.querySelector(".btn-donate-red")?.addEventListener("click", () =>
//   alert("Sign in functionality coming soon!")
// );

ctaButton?.addEventListener("click", () => {
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
});

/*********************************
 * Mobile nav toggle & auto-close
 *********************************/
// if (toggleBtn && navMenu) {
//   toggleBtn.addEventListener("click", () => {
//     const isOpen = navMenu.classList.toggle("open");
//     toggleBtn.setAttribute("aria-expanded", isOpen);
//   });

//   window.addEventListener("keydown", (e) => {
//     if (e.key === "Escape") {
//       navMenu.classList.remove("open");
//       toggleBtn.setAttribute("aria-expanded", "false");
//     }
//   });

//   document.addEventListener("click", (e) => {
//     if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
//       navMenu.classList.remove("open");
//       toggleBtn.setAttribute("aria-expanded", "false");
//     }
//   });
// }
// const navMenu = document.querySelector(".nav-menu");
// const toggleBtn = document.querySelector(".menu-toggle");

toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("open");
});

document.addEventListener("click", () => {
  navMenu.classList.remove("open");
});

navMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

/*********************************
 * Scroll To Top Button + Progress Ring
 *********************************/
const circle = scrollBtn?.querySelector(".progress-ring__circle");

if (scrollBtn && circle) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  const setProgress = (percent) => {
    circle.style.strokeDashoffset =
      circumference - (percent / 100) * circumference;
  };

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setProgress(docHeight ? (scrollTop / docHeight) * 100 : 0);
    scrollBtn.classList.toggle("show", scrollTop > 200);
  });

  scrollBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

/*********************************
 * Navbar glass effect
 *********************************/
const updateNavbarGlass = () => {
  if (!navbar) return;
  navbar.classList.toggle("glass", window.scrollY > 40);
};
window.addEventListener("scroll", updateNavbarGlass);

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".hero-section",
    start: "bottom top",
    toggleClass: { targets: ".navbar", className: "glass" },
  });
}

/*********************************
 * Scroll Animations (merged)
 *********************************/
const allSections = document.querySelectorAll("section");

if (window.AOS) {
  // Add AOS attributes to sections dynamically
  allSections.forEach((section) => {
    section.setAttribute("data-aos", "fade-up");
    section.setAttribute("data-aos-once", "true");
    section.setAttribute("data-aos-duration", "900");
  });

  AOS.init({
    easing: "ease-out-cubic",
    once: true,
  });
} else {
  // Fallback IntersectionObserver if AOS not available
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  allSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
}