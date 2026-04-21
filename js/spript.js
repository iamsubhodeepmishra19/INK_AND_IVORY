document.addEventListener("DOMContentLoaded", () => {
  let menu = document.querySelector(".menu");

  let navCollapsed = document.querySelector(".navbar-collapse");

  let body = document.body;

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1280) {
      menu.classList.remove("show");
      navCollapsed.style.right = "";
      body.style.overflow = "";
      body.style.height = "";
    }
  });

  let open = false;
  menu.addEventListener("click", () => {
    menu.classList.toggle("show");
    if (open) {
      navCollapsed.style.right = "-100%";
      body.style.overflow = "";
      body.style.height = "";
      open = false;
    } else {
      navCollapsed.style.right = "0";
      body.style.overflow = "hidden";
      body.style.height = "height: 100vh";
      open = true;
    }
  });

  document.querySelectorAll(".ripple-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      circle.classList.add("ripple");

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      circle.style.width = circle.style.height = size + "px";
      circle.style.left = e.clientX - rect.left - size / 2 + "px";
      circle.style.top = e.clientY - rect.top - size / 2 + "px";

      const oldRipple = btn.querySelector(".ripple");
      if (oldRipple) oldRipple.remove();

      btn.appendChild(circle);
    });
  });

  const isTouch = window.matchMedia("(hover: none)").matches;
  const cards = document.querySelectorAll(".collection-card");

  if (isTouch) {
    // Toggle card on tap (mobile/tablet)
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent document click

        // close others
        cards.forEach((c) => {
          if (c !== card) c.classList.remove("active");
        });

        // toggle current
        card.classList.toggle("active");
      });
    });

    // Click outside → close all
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".collection-card")) {
        cards.forEach((c) => c.classList.remove("active"));
      }
    });
  }

  const slider = document.getElementById("range");
  const priceValue = document.getElementById("priceValue");

  if (slider && priceValue) {
    function updateSlider() {
      const min = +slider.min;
      const max = +slider.max;
      const val = +slider.value;

      const percent = ((val - min) / (max - min)) * 100;

      slider.style.background = `linear-gradient(
      to right,
      rgba(255, 167, 14, 0.66) 0%,
      rgba(255, 167, 14, 0.66) ${percent}%,
      #ffffff ${percent}%,
      #ffffff 100%
    )`;

      priceValue.textContent = `₹ ${min} - ₹ ${val}`;
    }

    slider.addEventListener("input", updateSlider);
    updateSlider();
  }
});
