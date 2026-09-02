document.addEventListener("DOMContentLoaded", () => {
  const INTRANET_URL = "https://sites.google.com/slepatacama.cl/sala-de-computacin/p%C3%A1gina-principal";
  const CRA_URL = "https://bibliotecadigital.mineduc.cl/";

  /* =========================
     NORMALIZACIÓN GLOBAL
  ========================= */
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = "assets/logos/logo-escuela.png";
    favicon.type = "image/png";
  }

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (href === "https://sites.google.com/" || href === "intranet.html") {
      link.href = INTRANET_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    if (href === "biblioteca-cra.html") {
      link.href = CRA_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    if (href === "assets/pdf/reglamento-interno.pdf") {
      link.href = "assets/pdf/reglamento_interno_2025-2026.pdf";
    }

    if (href === "assets/pdf/reglamento-convivencia.pdf") {
      link.href = "assets/pdf/plan_de_gestion_convivencia_escolar_2025.pdf";
    }

    if (href === "noticia-centro-estudiantes.html") {
      link.href = "noticia-elecciones.html";
    }
  });

  /* =========================
     MENÚ DESPLEGABLE
  ========================= */
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();

      dropdowns.forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove("open");
          const otherToggle = item.querySelector(".dropdown-toggle");
          if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
        }
      });

      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", () => {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
      const toggle = dropdown.querySelector(".dropdown-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* =========================
     MENÚ MÓVIL
  ========================= */
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    document.addEventListener("click", (event) => {
      if (!navList.contains(event.target) && !navToggle.contains(event.target)) {
        navList.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
      }
    });
  }

  /* =========================
     LIGHTBOX GALERÍA
  ========================= */
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  if (galleryItems.length && lightbox && lightboxImage && lightboxClose) {
    const closeLightbox = () => {
      lightbox.classList.remove("active");
      lightboxImage.src = "";
      lightboxImage.alt = "";
      document.body.style.overflow = "";
    };

    galleryItems.forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
        lightboxClose.focus();
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  /* =========================
     SLIDER PRINCIPAL
  ========================= */
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");
  const slider = document.querySelector(".slider");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let current = 0;
  let intervalId = null;

  if (slides.length > 0 && dotsContainer) {
    dotsContainer.innerHTML = "";

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === 0);
      slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");

      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir a la imagen ${index + 1}`);
      dot.classList.toggle("active", index === 0);

      dot.addEventListener("click", () => {
        showSlide(index);
        restartInterval();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("button");

    function showSlide(index) {
      slides[current].classList.remove("active");
      slides[current].setAttribute("aria-hidden", "true");
      dots[current].classList.remove("active");

      current = index;

      slides[current].classList.add("active");
      slides[current].setAttribute("aria-hidden", "false");
      dots[current].classList.add("active");
    }

    function nextSlide() {
      showSlide((current + 1) % slides.length);
    }

    function prevSlide() {
      showSlide((current - 1 + slides.length) % slides.length);
    }

    function restartInterval() {
      clearInterval(intervalId);
      if (!reduceMotion) intervalId = setInterval(nextSlide, 5000);
    }

    restartInterval();

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        restartInterval();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        restartInterval();
      });
    }

    if (slider && !reduceMotion) {
      slider.addEventListener("mouseenter", () => clearInterval(intervalId));
      slider.addEventListener("mouseleave", restartInterval);
      slider.addEventListener("focusin", () => clearInterval(intervalId));
      slider.addEventListener("focusout", restartInterval);
    }
  }

  /* =========================
     FECHA ACTUAL
  ========================= */
  const fechaActual = document.getElementById("fecha-actual");

  if (fechaActual) {
    fechaActual.textContent = new Date().toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
});
