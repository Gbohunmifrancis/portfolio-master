import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Animates a number from 0 to `target` once `el` scrolls into view. */
export const useCountUp = (el: Ref<HTMLElement | null>, target: number, duration = 1400) => {
  const value = ref(prefersReducedMotion() ? target : 0);
  let observer: IntersectionObserver | null = null;
  let frame = 0;

  const run = () => {
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      value.value = Math.round(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  };

  onMounted(() => {
    if (prefersReducedMotion() || !el.value) return;
    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer?.disconnect();
      run();
    }, { threshold: 0.4 });
    observer.observe(el.value);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    cancelAnimationFrame(frame);
  });

  return value;
};

/**
 * Pointer spotlight: tracks the cursor over any element matching `selector`
 * and exposes its position as `--mx` / `--my` custom properties so CSS can
 * draw a soft highlight that follows the mouse.
 */
export const useSpotlight = (selector: string) => {
  const onMove = (event: PointerEvent) => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(selector);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    target.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  onMounted(() => {
    if (!canHover() || prefersReducedMotion()) return;
    document.addEventListener('pointermove', onMove, { passive: true });
  });

  onBeforeUnmount(() => document.removeEventListener('pointermove', onMove));
};

/** Magnetic pull: the element leans gently toward the cursor while hovered. */
export const useMagnetic = (el: Ref<HTMLElement | null>, strength = 0.18) => {
  const move = (event: PointerEvent) => {
    const node = el.value;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    node.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };
  const reset = () => { if (el.value) el.value.style.transform = ''; };

  onMounted(() => {
    if (!canHover() || prefersReducedMotion() || !el.value) return;
    el.value.addEventListener('pointermove', move, { passive: true });
    el.value.addEventListener('pointerleave', reset);
  });

  onBeforeUnmount(() => {
    el.value?.removeEventListener('pointermove', move);
    el.value?.removeEventListener('pointerleave', reset);
  });
};
