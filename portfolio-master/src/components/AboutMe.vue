<template>
  <section id="about" class="section">
    <div class="container">
      <div class="about-grid">
        <div class="section-head-stack">
          <p class="mono">( 02 ) About</p>
          <h2>An engineer for the whole product.</h2>
          <p class="about-statement">I design the system, build the <span class="gradient-text">backend, the interfaces, and the data</span> behind it, and stay until it runs reliably in production. Most of my work is the part nobody sees, done carefully enough that nobody has to.</p>
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
        <div class="stat"><strong class="gradient-text">{{ shipped }}</strong><span>Products shipped end to end</span></div>
        <div class="stat"><strong class="gradient-text">{{ teams }}</strong><span>Teams worked with</span></div>
        <div class="stat"><strong>.NET</strong><span>Core stack, with TypeScript and Python</span></div>
        <div class="stat"><strong>Lagos</strong><span>Based in Nigeria, remote friendly</span></div>
      </div>
      <TechRail />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TechRail from '@/components/TechRail.vue';
import { useCountUp } from '@/composables/useMotion';

const principles = [
  { title: 'Understand the problem first.', body: 'Good engineering starts with the real constraint, not the first framework that comes to mind.' },
  { title: 'Design for failure.', body: 'Retries, idempotency, and visible failure modes are part of the feature, not an afterthought.' },
  { title: 'Ship what matters.', body: 'Small, well-bounded releases that move a real product forward for real people.' },
];

const statsRow = ref<HTMLElement | null>(null);
const shipped = useCountUp(statsRow, 4);
const teams = useCountUp(statsRow, 3);
</script>
