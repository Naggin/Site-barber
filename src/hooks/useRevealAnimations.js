import { useEffect } from 'react';

export function useRevealAnimations(scopeRef) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || !('IntersectionObserver' in window)) return;

    const elements = Array.from(scope.querySelectorAll('[data-reveal]'));
    const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let observer;
    let disposed = false;

    const reveal = (element) => {
      element.classList.remove('reveal-pending');
      element.classList.add('is-revealed');
    };

    const applyMotionPreference = () => {
      observer?.disconnect();

      if (motionPreference?.matches) {
        elements.forEach(reveal);
        return;
      }

      observer = new IntersectionObserver((entries, currentObserver) => {
        if (disposed) return;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          currentObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });

      elements.forEach((element) => {
        if (element.classList.contains('is-revealed')) return;
        element.classList.add('reveal-pending');
        observer.observe(element);
      });
    };

    applyMotionPreference();

    if (motionPreference?.addEventListener) {
      motionPreference.addEventListener('change', applyMotionPreference);
    } else {
      motionPreference?.addListener?.(applyMotionPreference);
    }

    return () => {
      disposed = true;
      observer?.disconnect();
      elements.forEach((element) => element.classList.remove('reveal-pending'));

      if (motionPreference?.removeEventListener) {
        motionPreference.removeEventListener('change', applyMotionPreference);
      } else {
        motionPreference?.removeListener?.(applyMotionPreference);
      }
    };
  }, [scopeRef]);
}
