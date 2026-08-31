<template>
  <section id="projects" class="section-shell projects-section">
    <div class="projects-heading"><div class="section-intro"><p class="eyebrow">03 / Selected work</p><h2>Products with a point of view.</h2></div><div class="projects-note"><p>A small selection of systems I have designed, built, and helped bring to life.</p><small>Some GitHub repositories are private and may not be publicly visible. Access is available for review upon request.</small></div></div>
    <div class="project-list">
      <article v-for="(project, index) in projects" :key="project.name" class="project-card" :class="`project-${index + 1}`" @pointermove="tiltProject" @pointerleave="resetProjectTilt">
        <div class="project-visual" :class="project.visualClass"><img v-if="project.image" :src="project.image" :alt="`${project.name} preview`" /><div v-else class="twogether-preview"><span class="preview-heart">♡</span><span class="preview-orbit"></span><small>private space / 2</small></div><span class="project-index">0{{ index + 1 }}</span></div>
        <div class="project-info"><div class="project-kicker">{{ project.kicker }}</div><h3>{{ project.name }}</h3><p class="desktop-copy">{{ project.description }}</p><p class="mobile-copy">{{ project.mobileDescription }}</p><div class="project-tags"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div><div class="project-links"><a v-if="project.live" :href="project.live" target="_blank" rel="noreferrer">View project <span>↗</span></a><a :href="project.code" target="_blank" rel="noreferrer">Source / details <span>↗</span></a></div></div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
const projects = [
  { name: 'NoteFusion', kicker: 'Music intelligence · 2026', image: '/projects/notefusion-logo.png', visualClass: 'visual-notefusion', description: 'A music transcription product that listens to a melody and turns it into movable-do Tonic Solfa and standard staff notation. The pipeline is built for honest, useful output.', mobileDescription: 'Turns recorded melodies into Tonic Solfa and staff notation.', tags: ['.NET 10', 'Python ML', 'Expo', 'Postgres'], live: 'https://notefusion.studio/', code: 'https://github.com/Gbohunmifrancis/Notefusion.git' },
  { name: 'Recchx', kicker: 'Personal safety · 2026', image: '/projects/recchx-icon.png', visualClass: 'visual-recchx', description: 'A safety network for the people you love. Circles, live location, safe-arrival check-ins, emergency contacts, and covert SOS alerts work together when it matters.', mobileDescription: 'Offline-aware location, safe-arrival, and covert SOS tools for trusted circles.', tags: ['.NET 8', 'React Native', 'SignalR', 'JWT'], live: '', code: 'https://github.com/GbohunmiFrancis/Recchx.git' },
  { name: '2gether', kicker: 'Private connection · 2026', image: '/projects/2gether.png', visualClass: 'visual-twogether', description: 'A private, invite-only space for one couple. It combines cycle tracking, lightweight messaging, live location, and synchronous games in one gentle dashboard.', mobileDescription: 'A private couple space for messaging, cycle tracking, location, and games.', tags: ['Next.js', '.NET 10', 'SignalR', 'Postgres'], live: '', code: 'https://github.com/Gbohunmifrancis/2gether.git' },
  { name: 'SBZ Farms', kicker: 'Operations platform · 2026', image: '/projects/sbz-logo.png', visualClass: 'visual-sbz', description: 'A poultry farm inventory and monitoring system that brings birds, eggs, feed, sales, payroll, alerts, and audit trails into one operational source of truth.', mobileDescription: 'One operational system for farm inventory, production, sales, payroll, and audits.', tags: ['.NET 10', 'CQRS', 'Postgres', 'RBAC'], live: 'https://sbz-fms-web.vercel.app', code: 'https://github.com/GbohunmiFrancis/sbz-.git' },
]

const canTilt = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const tiltProject = (event: PointerEvent) => {
  if (!canTilt()) return;
  const card = event.currentTarget as HTMLElement;
  const visual = card.querySelector<HTMLElement>('.project-visual');
  if (!visual) return;

  const bounds = visual.getBoundingClientRect();
  const horizontal = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
  const vertical = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
  visual.style.setProperty('--tilt-x', `${vertical * -4}deg`);
  visual.style.setProperty('--tilt-y', `${horizontal * 5}deg`);
};

const resetProjectTilt = (event: PointerEvent) => {
  const card = event.currentTarget as HTMLElement;
  const visual = card.querySelector<HTMLElement>('.project-visual');
  visual?.style.setProperty('--tilt-x', '0deg');
  visual?.style.setProperty('--tilt-y', '0deg');
};
</script>
