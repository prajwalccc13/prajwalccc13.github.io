// ── Theme ──
    const root = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');

    (function initTheme() {
      // Default to light mode 
      const saved = localStorage.getItem('pc-theme');
      const defaultTheme = 'light';
      applyTheme(saved || defaultTheme);
    })();

    function applyTheme(t) {
      root.setAttribute('data-theme', t);
      root.setAttribute('data-bs-theme', t);
      document.querySelector('meta[name="theme-color"]')
        .setAttribute('content', t === 'dark' ? '#000000' : '#ffffff');
        
      if(themeIcon) {
        themeIcon.className = t === 'dark' ? 'bi bi-moon-stars' : 'bi bi-sun';
      }
    }

    document.getElementById('themeBtn').addEventListener('click', () => {
      const cur = root.getAttribute('data-theme') || 'light';
      const next = cur === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('pc-theme', next);
    });

    // ── Copy BibTeX ──
    document.querySelectorAll('[data-bibtex]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-bibtex');
        const text = document.getElementById(id).value.trim();
        try {
          await navigator.clipboard.writeText(text);
          const orig = btn.innerHTML;
          btn.innerHTML = '<i class="bi bi-check2"></i> Copied';
          btn.disabled = true;
          setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 1500);
        } catch (_) {}
      });
    });

    // ── Intersection Observer ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -5% 0px' });

    document.querySelectorAll('.io').forEach(el => observer.observe(el));