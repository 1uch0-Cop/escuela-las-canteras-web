document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MENÚ DESPLEGABLE
  ========================= */
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");

    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();

      dropdowns.forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove("open");
          const otherToggle = item.querySelector(".dropdown-toggle");
          if (otherToggle) {
            otherToggle.setAttribute("aria-expanded", "false");
          }
        }
      });

      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  document.addEventListener("click", () => {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
      const toggle = dropdown.querySelector(".dropdown-toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* =========================
     MENÚ MÓVIL
  ========================= */
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    document.addEventListener("click", (e) => {
      if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
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
    galleryItems.forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      lightboxImage.src = "";
      lightboxImage.alt = "";
      document.body.style.overflow = "";
    };

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
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

  let current = 0;
  let intervalId = null;

  if (slides.length > 0 && dotsContainer) {
    slides.forEach((slide, index) => {
      if (index === 0) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }

      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir a la imagen ${index + 1}`);

      if (index === 0) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        showSlide(index);
        restartInterval();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("button");

    function showSlide(index) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");

      current = index;

      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }

    function nextSlide() {
      const next = (current + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      const prev = (current - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    function restartInterval() {
      clearInterval(intervalId);
      intervalId = setInterval(nextSlide, 5000);
    }

    intervalId = setInterval(nextSlide, 5000);

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

    if (slider) {
      slider.addEventListener("mouseenter", () => {
        clearInterval(intervalId);
      });

      slider.addEventListener("mouseleave", () => {
        restartInterval();
      });
    }
  }

  /* =========================
     FECHA ACTUAL
  ========================= */
  const fechaActual = document.getElementById("fecha-actual");

  if (fechaActual) {
    const hoy = new Date();
    const texto = hoy.toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    fechaActual.textContent = texto;
  }
});