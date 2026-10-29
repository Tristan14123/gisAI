/* ============================================================
   GeoAI Assistant — Navigation manuel (notice LEGO)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const stepCards = document.querySelectorAll(".notice-step");
  const prevBtn = document.getElementById("btn-prev");
  const nextBtn = document.getElementById("btn-next");
  const stepCounter = document.getElementById("step-counter");
  const progressFill = document.getElementById("progress-fill");

  let currentIndex = 0;
  const total = stepCards.length;

  function updateUI() {
    stepCards.forEach((card, idx) => {
      if (idx === currentIndex) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex === total - 1;
      nextBtn.textContent =
        currentIndex === total - 1 ? "Terminer" : "Étape suivante";
    }

    const counterText = `Étape ${currentIndex + 1} sur ${total}`;
    if (stepCounter) {
      stepCounter.textContent = counterText;
    }
    const stepCounterNav = document.getElementById("step-counter-nav");
    if (stepCounterNav) {
      stepCounterNav.textContent = counterText;
    }

    if (progressFill) {
      const percent = total > 1 ? ((currentIndex) / (total - 1)) * 100 : 100;
      progressFill.style.setProperty('--target-width', `${percent}%`);
      progressFill.style.width = `${percent}%`;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateUI();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < total - 1) {
        currentIndex++;
        updateUI();
      } else {
        window.location.href = "index.html";
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
      updateUI();
    } else if (e.key === "ArrowRight" && currentIndex < total - 1) {
      currentIndex++;
      updateUI();
    }
  });

  updateUI();
});
