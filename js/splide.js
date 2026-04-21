document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll("#customSlider .slide");
  const overlay = document.querySelector("#customSlider .overlay");

  let index = 0;

  function changeSlide() {
    overlay.style.opacity = "1";

    setTimeout(() => {
      slides[index].classList.remove("active");

      index = (index + 1) % slides.length;

      slides[index].classList.add("active");

      overlay.style.opacity = "0";

      // ADD THIS LINE (trigger carousel sync)
      document.dispatchEvent(
        new CustomEvent("bgSlideChanged", {
          detail: { index },
        }),
      );
    }, 300);
  }

  setInterval(changeSlide, 3000);

  // ..............................

  const cards = document.querySelectorAll(".circle-card");

  let current = 2;

  function getLayout() {
    const w = window.innerWidth;

    let spread, yOffset, scaleDown;

    if (w < 360) {
      // very small phones (extra safety)
      spread = 0.18;
      yOffset = 60;
      scaleDown = 0.55;
    } else if (w < 480) {
      // standard small phones
      spread = 0.22;
      yOffset = 70;
      scaleDown = 0.6;
    } else if (w < 768) {
      spread = 0.32;
      yOffset = 110;
      scaleDown = 0.75;
    } else if (w < 1024) {
      spread = 0.36;
      yOffset = 140;
      scaleDown = 0.85;
    } else {
      spread = 0.38;
      yOffset = 160;
      scaleDown = 0.9;
    }

    return {
      [-2]: { x: -w * spread, y: yOffset, rot: -18, scale: 0.78 * scaleDown },
      [-1]: {
        x: -w * (spread * 0.6),
        y: yOffset * 0.5,
        rot: -8,
        scale: 0.9 * scaleDown,
      },
      [0]: { x: 0, y: yOffset * 0.3, rot: 0, scale: 1.05 * scaleDown },
      [1]: {
        x: w * (spread * 0.6),
        y: yOffset * 0.5,
        rot: 8,
        scale: 0.9 * scaleDown,
      },
      [2]: { x: w * spread, y: yOffset, rot: 18, scale: 0.78 * scaleDown },
    };
  }

  const moveDuration = 0.3;

  function update() {
    const layout = getLayout();

    cards.forEach((card, i) => {
      let pos = i - current;

      if (pos < -3) pos += cards.length;
      if (pos > 3) pos -= cards.length;

      if (Math.abs(pos) > 2) {
        card.style.opacity = "0";
        return;
      }

      const d = layout[pos];

      card.style.opacity = "1";

      gsap.to(card, {
        x: d.x,
        y: pos === 0 ? d.y + (window.innerWidth < 480 ? 15 : 25) : d.y,
        rotation: d.rot,
        scale: d.scale,
        zIndex: 100 - Math.abs(pos),
        duration: moveDuration,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }

  function moveNext() {
    current++;
    if (current >= cards.length) current = 0;
    update();
  }

  // INIT
  update();

  // SYNC
  document.addEventListener("bgSlideChanged", moveNext);

  // RESPONSIVE
  window.addEventListener("resize", update);

  // ..............................
  let splide_vertical = new Splide("#vertical-slider", {
    direction: "ttb",
    height: "400px",
    perPage: 1,

    arrows: false,
    pagination: false,
    gap: "1rem",
    type: "loop",

    autoplay: true,
    interval: 2500, // pause time
    speed: 800, // transition speed
  });

  splide_vertical.mount();

  let focus_slide = new Splide("#card-slider", {
    type: "loop",
    perPage: 2,
    focus: 0,
    gap: "20px",
    autoplay: true,
    interval: 2500,
    speed: 800,
    pauseOnHover: true,
    arrows: false,
    pagination: false,
  });
  focus_slide.mount();
});
