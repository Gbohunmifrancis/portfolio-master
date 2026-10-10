<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="container site-header-inner">
        <a class="brand" href="/#home" aria-label="Francis Gbohunmi home"><span class="brand-mark">FG</span><span class="brand-name">Francis Gbohunmi</span></a>
        <nav id="primary-nav" class="site-nav" :class="{ open: menuOpen }" aria-label="Primary navigation" @click="closeMenu">
          <a href="/#projects">Work</a>
          <a href="/#about">About</a>
          <a href="/#experience">Experience</a>
          <router-link to="/blog">Journal</router-link>
          <a href="/#contact">Contact</a>
        </nav>
        <div class="header-actions">
          <button class="icon-button theme-toggle" type="button" :aria-label="themeLabel" :title="themeLabel" @click="toggleTheme">
            <svg v-if="theme === 'light'" class="sun" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42m0-12.72-1.42 1.42M7.06 16.94l-1.42 1.42"/><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.2A8 8 0 0 1 8.8 4 8 8 0 1 0 20 15.2Z"/></svg>
          </button>
          <a class="button button-primary button-sm" href="mailto:francisgbohunmi@gmail.com">Let’s talk</a>
          <button class="icon-button menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="primary-nav" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" @click="menuOpen = !menuOpen">
            <svg v-if="!menuOpen" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
          </button>
        </div>
      </div>
    </header>

    <main><RouterView /></main>

    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="brand" href="/#home"><span class="brand-mark">FG</span><span class="brand-name">Francis Gbohunmi</span></a>
            <p class="footer-blurb">Backend-focused software engineer in Lagos, Nigeria. I build the APIs, data models, and systems behind products people use every day.</p>
          </div>
          <div class="footer-col">
            <h4>Navigate</h4>
            <a href="/#projects">Work</a>
            <a href="/#about">About</a>
            <a href="/#experience">Experience</a>
            <router-link to="/blog">Journal</router-link>
          </div>
          <div class="footer-col">
            <h4>Connect</h4>
            <a href="mailto:francisgbohunmi@gmail.com">Email</a>
            <a href="https://wa.me/2348124922244?text=Hello%20Francis%2C%20I%20would%20like%20to%20talk%20about%20a%20project." target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://github.com/Gbohunmifrancis" target="_blank" rel="noreferrer">GitHub</a>
            <a href="/CV.pdf" download="francis-gbohunmi-resume.pdf">Resume</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© {{ new Date().getFullYear() }} Francis Gbohunmi</span>
          <span>Built with Vue · Lagos, NG</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';

type Theme = 'light' | 'dark';
const theme = ref<Theme>('light');
const menuOpen = ref(false);
const route = useRoute();
const themeLabel = computed(() => `Switch to ${theme.value === 'light' ? 'dark' : 'light'} theme`);
let revealObserver: IntersectionObserver | null = null;

const applyTheme = (value: Theme, persist = true) => {
  theme.value = value;
  document.documentElement.dataset.theme = value;
  if (persist) localStorage.setItem('portfolio-theme-manual', value);
};

const toggleTheme = () => applyTheme(theme.value === 'light' ? 'dark' : 'light');
const closeMenu = () => { menuOpen.value = false; };

const saved = localStorage.getItem('portfolio-theme-manual') as Theme | null;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved === 'dark' || saved === 'light' ? saved : prefersDark ? 'dark' : 'light', false);

const revealSelectors = [
  '.section-head',
  '.section-head-stack',
  '.work-card',
  '.bento-card',
  '.stat',
  '.xp-item',
  '.post-card',
  '.edu-card',
  '.contact-card',
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
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

  document.querySelectorAll<HTMLElement>(revealSelectors).forEach((element, index) => {
    element.classList.add('reveal-item');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 60}ms`);
    revealObserver?.observe(element);
  });
};

onMounted(prepareReveals);
watch(() => route.fullPath, () => { closeMenu(); prepareReveals(); });
onBeforeUnmount(() => revealObserver?.disconnect());
</script>
