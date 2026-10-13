<template>
  <section id="home" class="hero">
    <HeroCanvas />
    <div class="hero-orbit" aria-hidden="true"></div>
    <div class="container">
      <div class="hero-layout">
        <div class="hero-copy">
          <p class="mono hero-kicker">Software engineer · Lagos, Nigeria</p>
          <h1 aria-label="Software engineer building products for real life.">
            <span v-for="(line, lineIndex) in lines" :key="lineIndex" class="line">
              <span v-for="(word, wordIndex) in line" :key="`${lineIndex}-${wordIndex}`" class="word" :style="{ '--i': offsets[lineIndex] + wordIndex }">
                <component :is="word.serif ? 'em' : 'span'" :class="{ 'serif gradient-text': word.serif }">{{ word.text }}</component>
              </span>
            </span>
          </h1>
        </div>

        <div class="hero-side">
          <p class="hero-lede">I’m Francis Gbohunmi, a software engineer who takes products from idea to production: architecture, backend, web and mobile, and the operations that keep them running.</p>
          <div class="hero-actions">
            <a ref="primaryButton" class="button button-primary button-lg magnetic" href="#projects">See the work <span>↓</span></a>
            <a ref="secondaryButton" class="button button-ghost button-lg magnetic" href="/CV.pdf" download="francis-gbohunmi-resume.pdf">Resume <span>↓</span></a>
          </div>
          <div class="hero-facts">
            <div><strong>4</strong><span>Products shipped</span></div>
            <div><strong>Full-stack</strong><span>Backend, web, mobile, ops</span></div>
          </div>
        </div>
      </div>

      <div class="hero-foot">
        <span class="mono">Currently open to new projects</span>
        <a class="mono scroll-hint" href="#projects"><i aria-hidden="true"></i> Scroll to selected work</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeroCanvas from '@/components/HeroCanvas.vue';
import { useMagnetic } from '@/composables/useMotion';

type Word = { text: string; serif?: boolean };
const lines: Word[][] = [
  [{ text: 'Software' }, { text: 'engineer' }],
  [{ text: 'building' }, { text: 'products' }],
  [{ text: 'for' }, { text: 'real', serif: true }, { text: 'life.', serif: true }],
];
const offsets = lines.reduce<number[]>((acc, line, index) => { acc.push(index === 0 ? 0 : acc[index - 1] + lines[index - 1].length); return acc; }, []);

const primaryButton = ref<HTMLElement | null>(null);
const secondaryButton = ref<HTMLElement | null>(null);
useMagnetic(primaryButton);
useMagnetic(secondaryButton, 0.14);
</script>
