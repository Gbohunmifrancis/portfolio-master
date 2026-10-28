<template>
  <section class="torn proof-band" aria-label="By the numbers">
    <div class="container proof-inner">
      <div>
        <h2>Proof Beyond <span class="underline-title">The Pitch.</span></h2>
        <p class="lead">A few things I can point to, not just talk about.</p>
      </div>
      <div ref="statsRow" class="proof-items">
        <div class="proof-item"><strong>{{ built }}</strong><span>Products built from idea to production</span></div>
        <div class="proof-item"><strong>{{ teams }}</strong><span>Teams shipped with in fintech, ERP and edtech</span></div>
        <div class="proof-item"><strong>.NET</strong><span>Core stack, with TypeScript and Python</span></div>
        <div class="proof-item"><strong>B.Tech</strong><span>Statistics, Federal University of Technology, Akure</span></div>
      </div>
    </div>
  </section>

  <section id="how-i-work" class="section">
    <div class="container work-layout">
      <div class="section-head">
        <h2 class="underline-title">How I Work</h2>
        <p>An engineer for the whole product. I design the system, build the backend, the interfaces and the data behind it, and stay until it runs reliably in production.</p>
        <span class="annotation">the part nobody sees,<br />done properly</span>
      </div>
      <div class="principles">
        <article v-for="(item, index) in principles" :key="item.title" class="principle">
          <span class="num">0{{ index + 1 }}</span>
          <span class="sep" aria-hidden="true"></span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </div>
          <span class="doodle" aria-hidden="true" v-html="item.icon"></span>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCountUp } from '@/composables/useMotion';

const principles = [
  { title: 'Understand The Problem First.', body: 'Good engineering starts with the real constraint and the people who have it, not the first framework that comes to mind.', icon: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>' },
  { title: 'Make The Rules Explicit.', body: 'Invariants live in the domain model and the schema, so the system enforces them instead of someone’s memory.', icon: '<svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z"/><path d="M8 10h8M8 14h8M8 18h5"/></svg>' },
  { title: 'Design For Failure.', body: 'Retries, idempotency, offline queues and visible errors are part of the feature, not cleanup after launch.', icon: '<svg viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>' },
  { title: 'Ship, Then Keep Shipping.', body: 'Small, well-bounded releases with tests and logs, so the next change is as calm as the first one.', icon: '<svg viewBox="0 0 24 24"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 15 7 13c2-6 6-9 13-10-1 7-4 11-10 13z"/><circle cx="14.5" cy="9.5" r="1.5"/></svg>' },
];

const statsRow = ref<HTMLElement | null>(null);
const built = useCountUp(statsRow, 6);
const teams = useCountUp(statsRow, 3);
</script>
