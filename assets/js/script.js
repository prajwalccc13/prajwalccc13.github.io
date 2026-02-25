// ── Wait for DOM before running anything ──────────────
document.addEventListener("DOMContentLoaded", () => {

  // ── Theme ─────────────────────────────────────────────
  const root = document.documentElement;
  const themeIcon = document.getElementById("themeIcon");

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    root.setAttribute("data-bs-theme", t);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#000000" : "#ffffff");
    if (themeIcon) themeIcon.className = t === "dark" ? "bi bi-moon-stars" : "bi bi-sun";
  }

  // Default to light unless user previously chose dark
  const saved = localStorage.getItem("pc-theme");
  applyTheme(saved === "dark" ? "dark" : "light");

  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("pc-theme", next);
      applyTheme(next);
    });
  }

  // ── Copy BibTeX ────────────────────────────────────────
  document.querySelectorAll("[data-bibtex]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const el = document.getElementById(btn.getAttribute("data-bibtex"));
      if (!el) return;
      try {
        await navigator.clipboard.writeText(el.value.trim());
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i> Copied';
        btn.disabled = true;
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 1500);
      } catch (_) {}
    });
  });

  // ── Intersection Observer (fade-in) ───────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: "0px 0px -5% 0px" });

  document.querySelectorAll(".io").forEach(el => observer.observe(el));

});
