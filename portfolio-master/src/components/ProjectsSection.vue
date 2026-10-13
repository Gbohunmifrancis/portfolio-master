<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-head">
        <div><p class="mono">( 01 ) Selected work</p><h2>Products with a point of view.</h2></div>
        <p class="section-note">Four systems I designed and built end to end, from the data model to the screen people touch.</p>
      </div>

      <div class="showcase-list">
        <article v-for="(project, index) in projects" :key="project.name" class="glass showcase" :class="{ flip: index % 2 === 1 }" :style="{ '--tint': project.tint }">
          <div class="showcase-bg"></div>
          <div class="showcase-copy">
            <p class="mono showcase-index"><b>0{{ index + 1 }}</b> {{ project.category }} · {{ project.year }}</p>
            <h3>{{ project.name }}</h3>
            <p class="desktop-copy">{{ project.description }}</p>
            <p class="mobile-copy">{{ project.mobileDescription }}</p>
            <div class="tag-row"><span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span></div>
            <div class="showcase-links">
              <a v-if="project.live" class="button button-primary" :href="project.live" target="_blank" rel="noreferrer">Visit {{ project.name }} <span>↗</span></a>
              <a class="button button-ghost" :href="project.code" target="_blank" rel="noreferrer">Source <span>↗</span></a>
            </div>
          </div>

          <div class="showcase-visual" :class="project.visual">
            <template v-if="project.visual === 'visual-phones'">
              <div class="device device-phone back"><img src="/brand/notefusion-splash.png" alt="NoteFusion splash screen" loading="lazy" /></div>
              <div class="device device-phone front"><img src="/projects/notefusion-solfa.png" alt="NoteFusion transcription result" loading="lazy" /></div>
            </template>
            <template v-else-if="project.visual === 'visual-window-card'">
              <div class="device device-window"><img :src="project.image" :alt="`${project.name} interface`" loading="lazy" /></div>
            </template>
            <div v-else class="visual-badge" :class="{ wide: project.visual === 'visual-badge-wide' }">
              <span class="orbit-dot"></span>
              <div class="badge-core"><img :src="project.image" :alt="`${project.name} mark`" loading="lazy" /></div>
            </div>
          </div>
        </article>
      </div>
      <p class="showcase-note">Some repositories are private. Access is available for review on request.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Project {
  name: string;
  category: string;
  year: string;
  tint: string;
  image: string;
  visual: 'visual-phones' | 'visual-window-card' | 'visual-badge' | 'visual-badge-wide';
  description: string;
  mobileDescription: string;
  tags: string[];
  live: string;
  code: string;
}

const projects: Project[] = [
  { name: 'NoteFusion', category: 'Music intelligence', year: '2026', tint: '#6d8dff', image: '/projects/notefusion-logo.png', visual: 'visual-phones', description: 'A music transcription product that listens to a melody and turns it into movable-do Tonic Solfa and standard staff notation. The pipeline is built for honest, useful output.', mobileDescription: 'Turns recorded melodies into Tonic Solfa and staff notation.', tags: ['.NET 10', 'Python ML', 'Expo', 'Postgres'], live: 'https://notefusion.studio/', code: 'https://github.com/Gbohunmifrancis/Notefusion.git' },
  { name: 'Recchx', category: 'Personal safety', year: '2026', tint: '#ff8a5b', image: '/projects/recchx-icon.png', visual: 'visual-badge', description: 'A safety network for the people you love. Circles, live location, safe-arrival check-ins, emergency contacts, and covert SOS alerts work together when it matters.', mobileDescription: 'Offline-aware location, safe-arrival, and covert SOS tools for trusted circles.', tags: ['.NET 8', 'React Native', 'SignalR', 'JWT'], live: '', code: 'https://github.com/GbohunmiFrancis/Recchx.git' },
  { name: '2gether', category: 'Private connection', year: '2026', tint: '#b48cff', image: '/projects/2gether.png', visual: 'visual-window-card', description: 'A private, invite-only space for one couple. It combines cycle tracking, lightweight messaging, live location, and synchronous games in one gentle dashboard.', mobileDescription: 'A private couple space for messaging, cycle tracking, location, and games.', tags: ['Next.js', '.NET 10', 'SignalR', 'Postgres'], live: '', code: 'https://github.com/Gbohunmifrancis/2gether.git' },
  { name: 'SBZ Farms', category: 'Operations platform', year: '2026', tint: '#5ee2c9', image: '/projects/sbz-logo.png', visual: 'visual-badge-wide', description: 'A poultry farm inventory and monitoring system that brings birds, eggs, feed, sales, payroll, alerts, and audit trails into one operational source of truth.', mobileDescription: 'One operational system for farm inventory, production, sales, payroll, and audits.', tags: ['.NET 10', 'CQRS', 'Postgres', 'RBAC'], live: 'https://sbz-fms-web.vercel.app', code: 'https://github.com/GbohunmiFrancis/sbz-.git' },
];
</script>
