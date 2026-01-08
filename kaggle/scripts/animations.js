(() => {
  const animatedSections = document.querySelectorAll('.animate-block');
  if (!animatedSections.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const assignDelay = (element, index) => {
    const customDelay = element.dataset.animateDelay;
    const parsed = customDelay ? parseInt(customDelay, 10) : undefined;
    const delay = Number.isFinite(parsed) ? parsed : Math.min(index * 80, 400);
    element.style.transitionDelay = `${delay}ms`;
  };

  animatedSections.forEach(assignDelay);

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    animatedSections.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -5% 0px'
  });

  animatedSections.forEach((element) => observer.observe(element));
})();
