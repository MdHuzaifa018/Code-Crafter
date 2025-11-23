const CodeCrafterApp = {
  init() {
    this.setupLoadingScreen();
    this.setupThemeToggle();
    this.setupNavigation();
    this.setupSearch();
    this.setupScrollAnimations();
    this.setupBackToTop();
    this.setupFormHandling();
    this.setupCardAnimations();
  },

  // Loading Screen - बिना delay के
  setupLoadingScreen() {
    window.addEventListener("load", () => {
      const loadingScreen = document.getElementById("loading-screen");
      if (loadingScreen) {
        loadingScreen.classList.add("hidden");
        // timeout remove किया
        loadingScreen.style.display = "none";
      }
    });
  },

  // Theme Toggle - improved
  setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", themeToggle.checked ? "dark" : "light");
    });
  },

  // Navigation - Event Delegation (बहुत efficient)
  setupNavigation() {
    const navLinks = document.getElementById("nav-links");
    if (!navLinks) return;

    // Event Delegation - एक listener सभी links के लिए
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A" && e.target.href.includes("#")) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href");
        const target = document.querySelector(targetId);
        
        if (target) {
          const headerHeight = 100; // hardcode करके calculation बचाई
          window.scrollTo({
            top: target.offsetTop - headerHeight,
            behavior: "smooth",
          });

          // Mobile menu close करो
          const menuToggle = document.getElementById("responsive_menu");
          if (menuToggle) menuToggle.checked = false;
        }
      }
    });
  },

  // Search - optimized
  setupSearch() {
    const searchInput = document.getElementById("search");
    const searchBtn = document.querySelector(".search-btn");

    if (!searchInput || !searchBtn) return;

    const performSearch = () => {
      const query = searchInput.value.trim();
      if (query.length > 0) {
        const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
          query + " programming tutorial"
        )}`;
        window.open(url, "_blank");
      }
    };

    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performSearch();
    });
  },

  // Scroll Animations - Optimized IntersectionObserver
  setupScrollAnimations() {
    // Threshold कम किया
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Unobserve करके memory बचाई
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05, // पहले 0.1 था
        rootMargin: "0px 0px -5% 0px", // पहले -10% था
      }
    );

    // सभी elements को observe करो
    document.querySelectorAll("section, .note-card").forEach((el) => {
      observer.observe(el);
    });
  },

  // Back to Top - throttled
  setupBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    let ticking = false;
    let isVisible = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.pageYOffset > 300;
          
          if (shouldShow && !isVisible) {
            btn.classList.add("show");
            isVisible = true;
          } else if (!shouldShow && isVisible) {
            btn.classList.remove("show");
            isVisible = false;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  },

  // Form Handling
  setupFormHandling() {
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        const btn = contactForm.querySelector(".submit-btn");
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
      });
    }

    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        const btn = newsletterForm.querySelector("button");
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        btn.disabled = true;
      });
    }
  },

  // Card Animations - Event Delegation
  setupCardAnimations() {
    // Card hover animations को remove किया - CSS से ही होगा
    // JavaScript से animations बहुत heavy होते हैं
  },
};

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    CodeCrafterApp.init();
  });
} else {
  CodeCrafterApp.init();
}