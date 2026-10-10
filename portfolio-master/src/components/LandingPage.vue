<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-inner">
        <a class="pill" href="#contact"><i aria-hidden="true"></i> Available for new projects</a>
        <h1>Building useful software <span class="quiet">for real life.</span></h1>
        <p class="hero-lede">I’m Francis Gbohunmi, a backend-focused software engineer in Lagos. I design clear APIs, durable data models, and the quiet systems behind products people actually use.</p>
        <div class="hero-actions">
          <a class="button button-primary button-lg" href="#projects">Explore the work <span>↓</span></a>
          <a class="button button-ghost button-lg" href="/CV.pdf" download="francis-gbohunmi-resume.pdf">Download resume <span>↓</span></a>
        </div>
        <div class="hero-facts">
          <span><strong>4</strong> products shipped</span>
          <span><strong>3</strong> teams</span>
          <span>Backend · APIs · Product systems</span>
        </div>
      </div>
      <TechRail />
    </div>
  </section>
</template>

<script setup lang="ts">
import TechRail from '@/components/TechRail.vue';
</script>
