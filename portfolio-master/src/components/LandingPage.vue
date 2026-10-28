<template>
  <section id="home" class="hero">
    <div class="container hero-layout">
      <div class="hero-copy">
        <p class="hero-hello">Hi, I’m Francis Gbohunmi</p>
        <h1>Software Engineer Building Products For <span class="highlight">Real Life.</span></h1>
        <p class="hero-lede">I take products from idea to production: the architecture, the backend, the web and mobile apps, and the operations that keep them running for the people who use them.</p>
        <div class="hero-actions">
          <a ref="primaryButton" class="button button-primary magnetic" href="#projects">See My Work <span>↓</span></a>
          <a ref="secondaryButton" class="button button-outline magnetic" href="/CV.pdf" download="francis-gbohunmi-resume.pdf">Download Resume <span>↓</span></a>
        </div>
        <p class="hero-status"><i aria-hidden="true"></i> Currently open to new projects</p>
      </div>

      <div class="hero-side">
        <div class="fact-card taped tape-top">
          <h3>Quick facts</h3>
          <dl>
            <div><dt>Role</dt><dd>Software Engineer</dd></div>
            <div><dt>Based in</dt><dd>Lagos, Nigeria</dd></div>
            <div><dt>I build</dt><dd>Backend · Web · Mobile</dd></div>
            <div><dt>Core stack</dt><dd>.NET · TypeScript · Python</dd></div>
            <div><dt>Status</dt><dd>Available <i aria-hidden="true"></i></dd></div>
          </dl>
        </div>
        <p class="sticky-note">6 products built, and counting!</p>
      </div>
    </div>
  </section>
  <TeamsBand />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TeamsBand from '@/components/TeamsBand.vue';
import { useMagnetic } from '@/composables/useMotion';

const primaryButton = ref<HTMLElement | null>(null);
const secondaryButton = ref<HTMLElement | null>(null);
useMagnetic(primaryButton, 0.12);
useMagnetic(secondaryButton, 0.1);
</script>
