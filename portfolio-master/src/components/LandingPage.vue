<template>
  <section id="home" class="hero-section section-shell">
    <div class="hero-copy">
      <p class="eyebrow typing-line">{{ typedEyebrow }}<span v-if="typingStage === 'eyebrow'" class="typing-caret" aria-hidden="true"></span></p>
      <h1 aria-label="Building useful software for real life."><span>{{ typedTitle }}</span><span class="hero-title-accent">{{ typedAccent }}</span><span v-if="typingStage === 'title'" class="typing-caret" aria-hidden="true"></span></h1>
      <p class="hero-lede">{{ typedLede }}<span v-if="typingStage === 'lede'" class="typing-caret" aria-hidden="true"></span></p>
      <div class="hero-actions" :class="{ 'hero-content-ready': typingStage === 'done' }">
        <a class="button button-primary" href="#projects">Explore the work <span>↗</span></a>
        <a class="button button-ghost" href="/CV.pdf" download="francis-gbohunmi-resume.pdf">Download resume <span>↓</span></a>
      </div>
      <div class="hero-meta" :class="{ 'hero-content-ready': typingStage === 'done' }"><span><i></i> Available for thoughtful collaborations</span><span>Backend · APIs · Product systems</span></div>
    </div>
    <div class="hero-art hero-art-system" aria-label="Animated backend request flow from client to API, jobs, and data">
      <div class="system-grid" aria-hidden="true"></div>
      <div class="architecture-status"><i aria-hidden="true"></i> Request trace / live</div>
      <div class="architecture-flow">
        <div class="architecture-node node-client"><small>01 / entry</small><strong>Client</strong><span>Web + mobile</span></div>
        <div class="architecture-link link-one" aria-hidden="true"><i></i><i></i></div>
        <div class="architecture-node node-api"><small>02 / boundary</small><strong>API</strong><span>Auth + contracts</span></div>
        <div class="architecture-link link-two" aria-hidden="true"><i></i><i></i></div>
        <div class="architecture-node node-data"><small>03 / durable</small><strong>Data</strong><span>Postgres + cache</span></div>
      </div>
      <div class="architecture-support">
        <div class="architecture-node node-jobs"><small>Async</small><strong>Jobs</strong><span>Queue + retry</span></div>
        <div class="architecture-node node-observe"><small>Feedback</small><strong>Observe</strong><span>Logs + metrics</span></div>
      </div>
      <p class="architecture-caption">Clear boundaries, durable state, visible failure modes.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const typedEyebrow = ref('');
const typedTitle = ref('');
const typedAccent = ref('');
const typedLede = ref('');
const typingStage = ref<'eyebrow' | 'title' | 'lede' | 'done'>('eyebrow');
let cancelled = false;

const pause = (milliseconds: number) => new Promise(resolve => window.setTimeout(resolve, milliseconds));

const typeText = async (text: string, output: typeof typedEyebrow, speed: number) => {
  for (const character of text) {
    if (cancelled) return;
    output.value += character;
    await pause(speed);
  }
};

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedEyebrow.value = 'Software engineer · Lagos, Nigeria';
    typedTitle.value = 'Building useful software for ';
    typedAccent.value = 'real life.';
    typedLede.value = 'I’m Francis Gbohunmi. I build reliable backend systems for products people use in real life.';
    typingStage.value = 'done';
    return;
  }
  await typeText('Software engineer · Lagos, Nigeria', typedEyebrow, 22);
  await pause(180);
  typingStage.value = 'title';
  await typeText('Building useful software for ', typedTitle, 28);
  await typeText('real life.', typedAccent, 42);
  await pause(160);
  typingStage.value = 'lede';
  await typeText('I’m Francis Gbohunmi. I build reliable backend systems for products people use in real life.', typedLede, 13);
  typingStage.value = 'done';
});

onUnmounted(() => { cancelled = true; });
</script>
