<template>
  <section id="about" class="section">
    <div class="container">
      <div class="about-grid">
        <div class="section-head-stack">
          <p class="mono">( 02 ) About</p>
          <h2>The quiet machinery behind useful products.</h2>
          <p class="about-statement">I turn complicated product ideas into <span class="gradient-text">clear APIs, durable data,</span> and calm experiences. Most of my work is the part nobody sees, done carefully enough that nobody has to.</p>
        </div>
        <div class="bento-grid">
          <div v-for="(principle, index) in principles" :key="principle.title" class="glass bento-card">
            <span class="bento-num">0{{ index + 1 }}</span>
            <div>
              <h3>{{ principle.title }}</h3>
              <p>{{ principle.body }}</p>
            </div>
          </div>
        </div>
      </div>
      <div ref="statsRow" class="stats-row">
        <div class="stat"><strong class="gradient-text">{{ shipped }}</strong><span>Products shipped</span></div>
        <div class="stat"><strong class="gradient-text">{{ teams }}</strong><span>Teams worked with</span></div>
        <div class="stat"><strong>.NET</strong><span>Primary backend stack</span></div>
        <div class="stat"><strong>Lagos</strong><span>Based in Nigeria, remote friendly</span></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCountUp } from '@/composables/useMotion';

const principles = [
  { title: 'Make the rules explicit.', body: 'Invariants belong in the model and the schema, not in someone’s memory.' },
  { title: 'Design for failure.', body: 'Retries, idempotency, and visible failure modes are part of the feature.' },
  { title: 'Ship what matters.', body: 'Small, well-bounded releases that move a real product forward.' },
];

const statsRow = ref<HTMLElement | null>(null);
const shipped = useCountUp(statsRow, 4);
const teams = useCountUp(statsRow, 3);
</script>
