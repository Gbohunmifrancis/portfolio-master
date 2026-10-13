<template>
  <section id="home" class="hero">
    <HeroCanvas />
    <div class="container">
      <div class="hero-inner">
        <a class="pill" href="#contact"><i aria-hidden="true"></i> Available for new projects</a>
        <h1 aria-label="Building useful software for real life.">
          <span class="line"><span v-for="(word, index) in lineOne" :key="`a-${index}`" class="word" :style="{ '--i': index }"><span>{{ word }}</span></span></span>
          <span class="line quiet"><span v-for="(word, index) in lineTwo" :key="`b-${index}`" class="word" :style="{ '--i': lineOne.length + index }"><span>{{ word }}</span></span></span>
        </h1>
        <p class="hero-lede">I’m Francis Gbohunmi, a backend-focused software engineer in Lagos. I design clear APIs, durable data models, and the quiet systems behind products people actually use.</p>
        <div class="hero-actions">
          <a ref="primaryButton" class="button button-primary button-lg magnetic" href="#projects">Explore the work <span>↓</span></a>
          <a ref="secondaryButton" class="button button-ghost button-lg magnetic" href="/CV.pdf" download="francis-gbohunmi-resume.pdf">Download resume <span>↓</span></a>
        </div>
        <div class="hero-facts">
          <span><strong>4</strong> products shipped</span>
          <span><strong>3</strong> teams</span>
          <span>Backend · APIs · Product systems</span>
        </div>
      </div>
      <TechRail />
    </div>
    <a class="scroll-cue" href="#projects" aria-label="Scroll to selected work"><span></span></a>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeroCanvas from '@/components/HeroCanvas.vue';
import TechRail from '@/components/TechRail.vue';
import { useMagnetic } from '@/composables/useMotion';

const lineOne = ['Building', 'useful', 'software'];
const lineTwo = ['for', 'real', 'life.'];

const primaryButton = ref<HTMLElement | null>(null);
const secondaryButton = ref<HTMLElement | null>(null);
useMagnetic(primaryButton);
useMagnetic(secondaryButton, 0.14);
</script>
