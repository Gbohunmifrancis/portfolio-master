<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="brand-lockup" href="/#home" aria-label="Francis Gbohunmi home"><span class="brand-mark">FG</span><span class="brand-name">Francis Gbohunmi</span></a>
      <nav class="site-nav" aria-label="Primary navigation"><a href="/#about">About</a><a href="/#experience">Experience</a><a href="/#projects">Work</a><a href="/#contact">Contact</a><router-link to="/blog">Journal</router-link></nav>
      <button class="theme-toggle" type="button" :aria-label="themeLabel" :title="themeLabel" @click="toggleTheme">
        <svg v-if="theme === 'light'" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42m0-12.72-1.42 1.42M7.06 16.94l-1.42 1.42"/><circle cx="12" cy="12" r="4"/></svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.2A8 8 0 0 1 8.8 4 8 8 0 1 0 20 15.2Z"/></svg>
      </button>
      <a class="header-availability" href="mailto:francisgbohunmi@gmail.com"><i></i> Let’s talk</a>
    </header>
    <main><RouterView /></main>
    <ContactDock />
    <TechRail />
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
import ContactDock from '@/components/ContactDock.vue';
import TechRail from '@/components/TechRail.vue';

type Theme = 'light' | 'dark';
const theme = ref<Theme>('light');
const route = useRoute();
const themeLabel = computed(() => `Switch to ${theme.value === 'light' ? 'dark' : 'light'} theme`);
let revealObserver: IntersectionObserver | null = null;

const applyTheme = (value: Theme, persist = true) => {
  theme.value = value;
  document.documentElement.dataset.theme = value;
  if (persist) localStorage.setItem('portfolio-theme-manual', value);
};

const toggleTheme = () => applyTheme(theme.value === 'light' ? 'dark' : 'light');

const saved = localStorage.getItem('portfolio-theme-manual') as Theme | null;
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localHour = Number(new Intl.DateTimeFormat('en-US', { hour: '2-digit', hourCycle: 'h23', timeZone: timezone }).format(new Date()));
const timezoneTheme: Theme = localHour >= 19 || localHour < 7 ? 'dark' : 'light';
applyTheme(saved === 'dark' || saved === 'light' ? saved : timezoneTheme, false);

const revealSelectors = [
  '.section-intro',
  '.about-content',
  '.timeline-item',
  '.project-card',
  '.journal-row',
  '.education-content',
  '.contact-section > *',
  '.journal-page-header',
  '.journal-filters',
  '.journal-card',
  '.blog-post-inner > *',
].join(',');

const prepareReveals = async () => {
  await nextTick();
  revealObserver?.disconnect();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.documentElement.classList.add('motion-ready');
  revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  document.querySelectorAll<HTMLElement>(revealSelectors).forEach((element, index) => {
    element.classList.add('reveal-item');
    element.style.setProperty('--reveal-delay', `${(index % 4) * 55}ms`);
    revealObserver?.observe(element);
  });
};

onMounted(prepareReveals);
watch(() => route.fullPath, prepareReveals);
onBeforeUnmount(() => revealObserver?.disconnect());
</script>
