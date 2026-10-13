<template>
  <section id="home" class="hero">
    <HeroCanvas />
    <div class="container">
      <div class="hero-layout">
        <div class="hero-copy">
          <p class="mono hero-kicker">Software engineer — Lagos, Nigeria</p>
          <h1 aria-label="Building useful software for real life.">
            <span class="line"><span v-for="(word, index) in lineOne" :key="`a-${index}`" class="word" :style="{ '--i': index }"><span>{{ word }}</span></span></span>
            <span class="line"><span v-for="(word, index) in lineTwo" :key="`b-${index}`" class="word" :style="{ '--i': lineOne.length + index }"><component :is="word.serif ? 'em' : 'span'" :class="{ 'serif gradient-text': word.serif }">{{ word.text }}</component></span></span>
          </h1>
          <p class="hero-lede">I’m Francis Gbohunmi. I design clear APIs, durable data models, and the quiet systems behind products people actually use.</p>
          <div class="hero-actions">
            <a ref="primaryButton" class="button button-primary button-lg magnetic" href="#projects">See the work <span>↓</span></a>
            <a ref="secondaryButton" class="button button-ghost button-lg magnetic" href="/CV.pdf" download="francis-gbohunmi-resume.pdf">Download resume <span>↓</span></a>
          </div>
          <div class="hero-facts">
            <div><strong>4</strong><span>Products shipped</span></div>
            <div><strong>3</strong><span>Teams worked with</span></div>
            <div><strong>.NET</strong><span>Primary backend stack</span></div>
          </div>
        </div>

        <div ref="stage" class="hero-stage" aria-hidden="true">
          <div class="stage-glow"></div>
          <div class="stage-ring"></div>
          <div class="stage-ring inner"></div>
          <div class="device device-window device-c"><img src="/projects/2gether.png" alt="" loading="eager" /></div>
          <div class="device device-phone device-a"><img src="/brand/notefusion-splash.png" alt="" loading="eager" /></div>
          <div class="device device-phone device-b"><img src="/projects/notefusion-solfa.png" alt="" loading="eager" /></div>
          <span class="stage-chip one"><i></i> API · 99.9% uptime</span>
          <span class="stage-chip two"><i></i> Live transcription</span>
        </div>
      </div>
      <TechRail />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import HeroCanvas from '@/components/HeroCanvas.vue';
import TechRail from '@/components/TechRail.vue';
import { canHover, prefersReducedMotion, useMagnetic } from '@/composables/useMotion';

const lineOne = ['Building', 'useful', 'software'];
const lineTwo = [{ text: 'for' }, { text: 'real', serif: true }, { text: 'life.', serif: true }];

const primaryButton = ref<HTMLElement | null>(null);
const secondaryButton = ref<HTMLElement | null>(null);
useMagnetic(primaryButton);
useMagnetic(secondaryButton, 0.14);

// Mouse parallax on the floating devices.
const stage = ref<HTMLElement | null>(null);
let frame = 0;
const onMove = (event: PointerEvent) => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const px = (event.clientX / window.innerWidth - 0.5) * 2;
    const py = (event.clientY / window.innerHeight - 0.5) * 2;
    stage.value?.style.setProperty('--px', px.toFixed(3));
    stage.value?.style.setProperty('--py', py.toFixed(3));
  });
};

onMounted(() => {
  if (!canHover() || prefersReducedMotion()) return;
  window.addEventListener('pointermove', onMove, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove);
  cancelAnimationFrame(frame);
});
</script>
