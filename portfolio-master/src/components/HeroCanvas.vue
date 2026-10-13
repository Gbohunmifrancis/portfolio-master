<template>
  <div class="hero-scene" aria-hidden="true">
    <canvas ref="canvas" class="hero-canvas"></canvas>
    <div class="hero-grid"></div>
    <div class="hero-veil"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

/**
 * A soft, slow "aurora" of blurred colour orbs drifting behind the hero.
 * Drawn on a low-resolution canvas and blurred with CSS so it stays cheap.
 * It pauses when off screen, when the tab is hidden, and never runs when
 * the visitor prefers reduced motion.
 */
const canvas = ref<HTMLCanvasElement | null>(null);

interface Orb { x: number; y: number; r: number; hue: number; sat: number; dx: number; dy: number; phase: number; }

let frame = 0;
let running = false;
let visible = true;
let observer: IntersectionObserver | null = null;
let orbs: Orb[] = [];
let width = 0;
let height = 0;
const SCALE = 0.2;

const palette = [
  { hue: 36, sat: 70 },
  { hue: 222, sat: 22 },
  { hue: 20, sat: 48 },
];

const isDark = () => document.documentElement.dataset.theme === 'dark';

const resize = () => {
  const el = canvas.value;
  if (!el) return;
  const rect = el.parentElement!.getBoundingClientRect();
  width = Math.max(1, Math.round(rect.width * SCALE));
  height = Math.max(1, Math.round(rect.height * SCALE));
  el.width = width;
  el.height = height;
  if (orbs.length === 0) {
    orbs = palette.map((p, i) => ({
      x: width * (0.15 + 0.7 * ((i * 0.37) % 1)),
      y: height * (0.1 + 0.6 * ((i * 0.61) % 1)),
      r: Math.max(width, height) * (0.32 + 0.14 * ((i * 0.53) % 1)),
      hue: p.hue,
      sat: p.sat,
      dx: (0.08 + 0.06 * ((i * 0.29) % 1)) * (i % 2 ? 1 : -1),
      dy: (0.05 + 0.05 * ((i * 0.71) % 1)) * (i % 3 ? -1 : 1),
      phase: i * 1.3,
    }));
  }
};

const draw = (time: number) => {
  const el = canvas.value;
  if (!el || !running) return;
  const ctx = el.getContext('2d');
  if (!ctx) return;
  const dark = isDark();
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = dark ? 'screen' : 'multiply';
  const t = time * 0.001;

  for (const orb of orbs) {
    orb.x += orb.dx * 0.6 + Math.sin(t * 0.25 + orb.phase) * 0.12;
    orb.y += orb.dy * 0.6 + Math.cos(t * 0.21 + orb.phase) * 0.1;
    if (orb.x < -orb.r * 0.4) orb.x = width + orb.r * 0.4;
    if (orb.x > width + orb.r * 0.4) orb.x = -orb.r * 0.4;
    if (orb.y < -orb.r * 0.4) orb.y = height + orb.r * 0.4;
    if (orb.y > height + orb.r * 0.4) orb.y = -orb.r * 0.4;

    const pulse = 0.85 + 0.15 * Math.sin(t * 0.5 + orb.phase);
    const r = orb.r * pulse;
    const light = dark ? 42 : 80;
    const alpha = dark ? 0.6 : 0.65;
    const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
    gradient.addColorStop(0, `hsla(${orb.hue}, ${orb.sat}%, ${light}%, ${alpha})`);
    gradient.addColorStop(1, `hsla(${orb.hue}, ${orb.sat}%, ${light}%, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  frame = requestAnimationFrame(draw);
};

const start = () => {
  if (running || !visible || document.hidden) return;
  running = true;
  frame = requestAnimationFrame(draw);
};

const stop = () => {
  running = false;
  cancelAnimationFrame(frame);
};

const onVisibility = () => (document.hidden ? stop() : start());

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Paint a single static frame so the hero still has colour.
    resize();
    running = true;
    draw(0);
    running = false;
    cancelAnimationFrame(frame);
    return;
  }
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibility);
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  });
  if (canvas.value) observer.observe(canvas.value);
  start();
});

onBeforeUnmount(() => {
  stop();
  observer?.disconnect();
  window.removeEventListener('resize', resize);
  document.removeEventListener('visibilitychange', onVisibility);
});
</script>
