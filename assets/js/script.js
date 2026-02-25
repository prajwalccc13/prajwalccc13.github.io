// Ensure all HTML is loaded before trying to access elements
document.addEventListener("DOMContentLoaded", () => {

  // ── Copy BibTeX to Clipboard ────────────────────────────────
  document.querySelectorAll("[data-bibtex]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const el = document.getElementById(btn.getAttribute("data-bibtex"));
      if (!el) return;
      try {
        await navigator.clipboard.writeText(el.value.trim());
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i> Copied';
        btn.disabled = true;
        
        // Revert back to original text after 1.5s
        setTimeout(() => { 
          btn.innerHTML = orig; 
          btn.disabled = false; 
        }, 1500);
      } catch (_) {
        console.error("Clipboard write failed");
      }
    });
  });

  // ── Intersection Observer (Fade-in Animations) ──────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        observer.unobserve(e.target);
      }
    });
  }, { 
    threshold: 0.10, 
    rootMargin: "0px 0px -5% 0px" 
  });

  // Find all elements with class .io and observe them
  document.querySelectorAll(".io").forEach(el => observer.observe(el));

});
