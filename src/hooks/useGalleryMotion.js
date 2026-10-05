import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const motionQuery = '(prefers-reduced-motion: no-preference)';
const pixelsPerSecond = 24;

function subscribeToMotionPreference(listener) {
  const preference = window.matchMedia?.(motionQuery);
  if (!preference) return () => {};

  if (preference.addEventListener) {
    preference.addEventListener('change', listener);
    return () => preference.removeEventListener('change', listener);
  }

  preference.addListener(listener);
  return () => preference.removeListener(listener);
}

function getMotionPreference() {
  return typeof window !== 'undefined' && Boolean(window.matchMedia?.(motionQuery).matches);
}

function getServerMotionPreference() {
  return false;
}

export function useGalleryMotion() {
  const motionAllowed = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  );
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const viewportRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    if (!motionAllowed) {
      viewport.scrollLeft = 0;
      return;
    }
    if (paused || hover) return;

    let frameId = 0;
    let previousTime = null;
    let position = viewport.scrollLeft;
    let cycleWidth = 0;
    let disposed = false;
    const initialBounds = viewport.getBoundingClientRect();
    let visible = initialBounds.bottom > 0 && initialBounds.top < window.innerHeight;

    const stop = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = null;
    };

    const animate = (time) => {
      frameId = 0;
      if (disposed || !visible || document.hidden || cycleWidth <= 0) return;

      if (previousTime !== null) {
        const elapsed = Math.min((time - previousTime) / 1000, 0.1);
        position = (position + elapsed * pixelsPerSecond) % cycleWidth;
        viewport.scrollLeft = position;
      }
      previousTime = time;
      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (disposed || frameId || !visible || document.hidden || cycleWidth <= 0) return;
      position = viewport.scrollLeft % cycleWidth;
      previousTime = null;
      frameId = window.requestAnimationFrame(animate);
    };

    const measure = () => {
      const copy = group.nextElementSibling;
      const firstBounds = group.getBoundingClientRect();
      cycleWidth = copy ? copy.getBoundingClientRect().left - firstBounds.left : 0;
      if (cycleWidth > 0) {
        position = viewport.scrollLeft % cycleWidth;
        viewport.scrollLeft = position;
        start();
      } else {
        stop();
      }
    };

    const updateVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const updateIntersection = () => {
      const bounds = viewport.getBoundingClientRect();
      visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      if (visible) start();
      else stop();
    };

    let intersectionObserver;
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      });
      intersectionObserver.observe(viewport);
    } else {
      window.addEventListener('scroll', updateIntersection, { passive: true });
    }

    let resizeObserver;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(group);
      resizeObserver.observe(viewport);
    }
    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', updateVisibility);
    measure();

    return () => {
      disposed = true;
      stop();
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', updateIntersection);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [motionAllowed, paused, hover]);

  return {
    motionAllowed,
    paused,
    hover,
    viewportRef,
    groupRef,
    togglePaused: () => setPaused((current) => !current),
    pause: () => setPaused(true),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onWheel: (event) => {
      if (event.deltaX !== 0 || event.shiftKey) setPaused(true);
    },
  };
}
