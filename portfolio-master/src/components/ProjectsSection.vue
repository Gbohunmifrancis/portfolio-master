<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-head">
        <div><p class="eyebrow">Selected work</p><h2>Products with a point of view.</h2></div>
        <p class="section-note">A small selection of systems I designed, built, and helped bring to life, end to end.</p>
      </div>

      <div class="filter-bar">
        <div class="filter-list" role="tablist" aria-label="Filter projects by type">
          <button v-for="category in categories" :key="category" class="chip" :class="{ active: selected === category }" type="button" role="tab" :aria-selected="selected === category" @click="selected = category">{{ category }}</button>
        </div>
        <p class="filter-note">Some repositories are private. Access is available for review on request.</p>
      </div>

      <div class="work-grid">
        <article v-for="project in visibleProjects" :key="project.name" class="work-card">
          <a class="work-visual" :class="[project.visualClass, project.visualType]" :href="project.live || project.code" target="_blank" rel="noreferrer" :aria-label="`Open ${project.name}`">
            <span class="work-visual-badge">{{ project.year }}</span>
            <img :src="project.visual" :alt="`${project.name} preview`" loading="lazy" />
            <span class="work-visual-cta">{{ project.live ? 'View project' : 'View source' }} ↗</span>
          </a>
          <div class="work-meta">
            <img class="work-icon" :class="{ contain: project.iconContain }" :src="project.icon" alt="" />
            <div class="work-title">
              <h3>{{ project.name }}</h3>
              <span>{{ project.category }} · {{ project.kicker }}</span>
            </div>
            <div class="work-links">
              <a v-if="project.live" :href="project.live" target="_blank" rel="noreferrer" :aria-label="`${project.name} live site`" title="Live site">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
              </a>
              <a :href="project.code" target="_blank" rel="noreferrer" :aria-label="`${project.name} source code`" title="Source code">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-10-4 12"/></svg>
              </a>
            </div>
          </div>
          <p class="work-desc desktop-copy">{{ project.description }}</p>
          <p class="work-desc mobile-copy">{{ project.mobileDescription }}</p>
          <div class="tag-row"><span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span></div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Project {
  name: string;
  category: string;
  kicker: string;
  year: string;
  icon: string;
  iconContain?: boolean;
  visual: string;
  visualType: 'visual-phone' | 'visual-window' | 'visual-icon' | 'visual-logo';
  visualClass: string;
  description: string;
  mobileDescription: string;
  tags: string[];
  live: string;
  code: string;
}

const projects: Project[] = [
  { name: 'NoteFusion', category: 'Mobile app', kicker: 'Music intelligence', year: '2026', icon: '/projects/notefusion-logo.png', iconContain: true, visual: '/projects/notefusion-solfa.png', visualType: 'visual-phone', visualClass: 'visual-notefusion', description: 'A music transcription product that listens to a melody and turns it into movable-do Tonic Solfa and standard staff notation. The pipeline is built for honest, useful output.', mobileDescription: 'Turns recorded melodies into Tonic Solfa and staff notation.', tags: ['.NET 10', 'Python ML', 'Expo', 'Postgres'], live: 'https://notefusion.studio/', code: 'https://github.com/Gbohunmifrancis/Notefusion.git' },
  { name: 'Recchx', category: 'Mobile app', kicker: 'Personal safety', year: '2026', icon: '/projects/recchx-icon.png', visual: '/projects/recchx-icon.png', visualType: 'visual-icon', visualClass: 'visual-recchx', description: 'A safety network for the people you love. Circles, live location, safe-arrival check-ins, emergency contacts, and covert SOS alerts work together when it matters.', mobileDescription: 'Offline-aware location, safe-arrival, and covert SOS tools for trusted circles.', tags: ['.NET 8', 'React Native', 'SignalR', 'JWT'], live: '', code: 'https://github.com/GbohunmiFrancis/Recchx.git' },
  { name: '2gether', category: 'Web app', kicker: 'Private connection', year: '2026', icon: '/projects/2gether.png', visual: '/projects/2gether.png', visualType: 'visual-window', visualClass: 'visual-twogether', description: 'A private, invite-only space for one couple. It combines cycle tracking, lightweight messaging, live location, and synchronous games in one gentle dashboard.', mobileDescription: 'A private couple space for messaging, cycle tracking, location, and games.', tags: ['Next.js', '.NET 10', 'SignalR', 'Postgres'], live: '', code: 'https://github.com/Gbohunmifrancis/2gether.git' },
  { name: 'SBZ Farms', category: 'Platform', kicker: 'Operations', year: '2026', icon: '/projects/sbz-logo.png', iconContain: true, visual: '/projects/sbz-logo.png', visualType: 'visual-logo', visualClass: 'visual-sbz', description: 'A poultry farm inventory and monitoring system that brings birds, eggs, feed, sales, payroll, alerts, and audit trails into one operational source of truth.', mobileDescription: 'One operational system for farm inventory, production, sales, payroll, and audits.', tags: ['.NET 10', 'CQRS', 'Postgres', 'RBAC'], live: 'https://sbz-fms-web.vercel.app', code: 'https://github.com/GbohunmiFrancis/sbz-.git' },
];

const categories = ['All', ...new Set(projects.map(project => project.category))];
const selected = ref('All');
const visibleProjects = computed(() => selected.value === 'All' ? projects : projects.filter(project => project.category === selected.value));
</script>
