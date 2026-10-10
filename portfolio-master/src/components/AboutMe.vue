<template>
  <section id="about" class="section section-soft">
    <div class="container">
      <div class="about-grid">
        <div class="section-head-stack">
          <p class="eyebrow">About</p>
          <h2>The quiet machinery behind useful products.</h2>
          <p class="lede">I turn complicated product ideas into clear APIs, durable data, and calm experiences. Most of my work is the part nobody sees, done carefully enough that nobody has to.</p>
        </div>
        <div class="bento-grid">
          <div v-for="(principle, index) in principles" :key="principle.title" class="card bento-card">
            <span class="bento-num">0{{ index + 1 }}</span>
            <h3>{{ principle.title }}</h3>
            <p>{{ principle.body }}</p>
          </div>
        </div>
      </div>
      <div class="stats-row">
        <div v-for="stat in stats" :key="stat.label" class="stat"><strong>{{ stat.value }}</strong><span>{{ stat.label }}</span></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const principles = [
  { title: 'Make the rules explicit.', body: 'Invariants belong in the model and the schema, not in someone’s memory.' },
  { title: 'Design for failure.', body: 'Retries, idempotency, and visible failure modes are part of the feature.' },
  { title: 'Ship what matters.', body: 'Small, well-bounded releases that move a real product forward.' },
];

const stats = [
  { value: '4', label: 'Products shipped' },
  { value: '3', label: 'Teams worked with' },
  { value: '.NET', label: 'Primary backend stack' },
  { value: 'Lagos', label: 'Based in Nigeria, remote friendly' },
];
</script>
