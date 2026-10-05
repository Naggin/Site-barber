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
  return typeof window !== 'undefined'
    && typeof window.Element?.prototype.animate === 'function'
    && Boolean(window.matchMedia?.(motionQuery).matches);
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
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const restingOffsetRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!viewport || !track || !group) return;

    if (!motionAllowed) {
      viewport.scrollLeft = 0;
      track.style.transform = '';
      restingOffsetRef.current = 0;
      return;
    }
    if (paused || hover) return;

    let animation;
    let cycleWidth = 0;
    let disposed = false;
    let imagesReady = false;
    let imagePreparation;
    const initialBounds = viewport.getBoundingClientRect();
    let visible = initialBounds.bottom > 0 && initialBounds.top < window.innerHeight;

    const readPosition = () => {
      const offset = animation
        ? ((Number(animation.currentTime ?? 0) / 1000) * pixelsPerSecond) % cycleWidth
        : restingOffsetRef.current;
      return viewport.scrollLeft + offset;
    };

    const prepareImages = () => {
      if (imagePreparation) return;
      const images = Array.from(track.querySelectorAll('img'));
      images.forEach((image) => { image.loading = 'eager'; });
      imagePreparation = Promise.all(images.map((image) => image.decode().catch(() => {})))
        .then(() => {
          if (disposed) return;
          imagesReady = true;
          updatePlayback();
        });
    };

    const updatePlayback = () => {
      if (disposed || !animation) return;
      if (!visible || document.hidden || !imagesReady) {
        animation.pause();
        if (visible && !document.hidden && !imagesReady) prepareImages();
        return;
      }
      animation.play();
    };

    const measure = () => {
      const copy = group.nextElementSibling;
      const firstBounds = group.getBoundingClientRect();
      const nextWidth = copy ? copy.getBoundingClientRect().left - firstBounds.left : 0;
      if (nextWidth <= 0) {
        animation?.pause();
        return;
      }
      if (animation && Math.abs(nextWidth - cycleWidth) < 0.01) return;

      const position = readPosition();
      const phase = animation
        ? (((position / cycleWidth) % 1) + 1) % 1 * nextWidth
        : ((position % nextWidth) + nextWidth) % nextWidth;
      animation?.cancel();
      cycleWidth = nextWidth;

      // Transform animations retain subpixel positions and run on the browser's
      // compositor; slow scrollLeft updates were rounded to whole pixels.
      animation = track.animate([
        { transform: 'translate3d(0, 0, 0)' },
        { transform: `translate3d(${-cycleWidth}px, 0, 0)` },
      ], {
        duration: (cycleWidth / pixelsPerSecond) * 1000,
        iterations: Infinity,
        easing: 'linear',
      });
      animation.pause();
      animation.currentTime = (phase / pixelsPerSecond) * 1000;
      viewport.scrollLeft = 0;
      restingOffsetRef.current = 0;
      track.style.transform = '';
      updatePlayback();
    };

    const updateIntersection = () => {
      const bounds = viewport.getBoundingClientRect();
      visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      updatePlayback();
    };

    const updateLayout = () => {
      measure();
      updateIntersection();
    };

    let intersectionObserver;
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updatePlayback();
      });
      intersectionObserver.observe(viewport);
    } else {
      window.addEventListener('scroll', updateIntersection, { passive: true });
    }

    let resizeObserver;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(updateLayout);
      resizeObserver.observe(group);
      resizeObserver.observe(viewport);
    }
    window.addEventListener('resize', updateLayout);
    document.addEventListener('visibilitychange', updatePlayback);
    updateLayout();

    return () => {
      disposed = true;
      const position = readPosition();
      animation?.cancel();
      // Hand the same position to native scrolling for touch/keyboard browsing.
      // Keep its fractional remainder so pausing and resuming do not snap.
      track.style.transform = '';
      viewport.scrollLeft = position;
      restingOffsetRef.current = position - viewport.scrollLeft;
      track.style.transform = `translate3d(${-restingOffsetRef.current}px, 0, 0)`;
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('scroll', updateIntersection);
      document.removeEventListener('visibilitychange', updatePlayback);
    };
  }, [motionAllowed, paused, hover]);

  return {
    motionAllowed,
    paused,
    hover,
    viewportRef,
    trackRef,
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
