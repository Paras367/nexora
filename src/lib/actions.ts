import { formatNumber } from './utils';

const reducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ek baar dikhte hi callback chalao, phir observer band
function onceVisible(node: Element, cb: () => void, threshold: number) {
  if (typeof IntersectionObserver === 'undefined') { cb(); return () => {}; }
  const io = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { cb(); io.disconnect(); } },
    { threshold, rootMargin: '0px 0px -40px 0px' }
  );
  io.observe(node);
  return () => io.disconnect();
}

/** use:reveal — viewport mein aate hi `.in` class lagata hai (CSS app.css mein) */
export function reveal(node: HTMLElement, threshold = 0.1) {
  return { destroy: onceVisible(node, () => node.classList.add('in'), threshold) };
}

interface CountOptions { to: number; decimals?: number; prefix?: string; duration?: number }

/** use:countUp — number 0 se target tak chadhta hai. SSR mein final value hi dikhti hai (no-JS safe). */
export function countUp(node: HTMLElement, { to, decimals = 0, prefix = '', duration = 1600 }: CountOptions) {
  if (reducedMotion()) return;
  let raf = 0;
  const stop = onceVisible(node, () => {
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      node.textContent = prefix + formatNumber(to * eased, decimals);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }, 0.4);
  return { destroy() { stop(); cancelAnimationFrame(raf); } };
}
