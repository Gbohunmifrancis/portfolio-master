<template>
  <section id="experience" class="section">
    <div class="container">
      <div class="section-head">
        <div><p class="mono">( 03 ) Experience</p><h2>Recent chapters.</h2></div>
        <p class="section-note">Backend and platform work across fintech, ERP, and education products.</p>
      </div>
      <div class="xp-list">
        <article v-for="item in experiences" :key="item.company" class="xp-item">
          <div class="mono xp-date">{{ item.date }}</div>
          <div class="xp-logo" :class="{ dark: item.darkLogo }"><img :src="item.logo" :alt="`${item.company} logo`" loading="lazy" /></div>
          <div>
            <p class="xp-role">{{ item.role }}</p>
            <h3>{{ item.company }}</h3>
            <p class="xp-desc desktop-copy">{{ item.description }}<a v-if="item.linkText" :href="item.linkUrl" target="_blank" rel="noreferrer">{{ item.linkText }}</a>{{ item.descriptionSuffix }}</p>
            <p class="xp-desc mobile-copy">{{ item.mobileDescription }}<a v-if="item.linkText" :href="item.linkUrl" target="_blank" rel="noreferrer">{{ item.linkText }}</a>{{ item.mobileDescriptionSuffix }}</p>
            <div class="tag-row"><span v-for="tech in item.stack" :key="tech" class="tag">{{ tech }}</span></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ExperienceItem {
  date: string;
  role: string;
  company: string;
  logo: string;
  darkLogo?: boolean;
  description: string;
  mobileDescription: string;
  linkText?: string;
  linkUrl?: string;
  descriptionSuffix?: string;
  mobileDescriptionSuffix?: string;
  stack: string[];
}

const experiences: ExperienceItem[] = [
  { date: '2025 — 2026', role: 'Backend Developer / QA Tester', company: 'Model Carbon Ltd', logo: '/brand/model-carbon.png', darkLogo: true, description: 'Built and validated backend services for the Converge ERP System developed for ', mobileDescription: 'Built and tested Converge ERP backend services for ', linkText: 'Heirs Technologies', linkUrl: 'https://heirstechnologies.com/', descriptionSuffix: ' under the UBA Group: integration contracts, debugging workflows, regression coverage, and release confidence across a modular .NET platform.', mobileDescriptionSuffix: ' under the UBA Group.', stack: ['.NET', 'REST APIs', 'QA', 'PostgreSQL'] },
  { date: '2025', role: 'Backend Developer', company: 'KUDA MFB', logo: '/brand/kuda.png', description: 'Helped ship premium subscriptions, referral rewards, and a loyalty system with ASP.NET Core and SQL Server, focusing on transactional rules, idempotent rewards, and reliable account state.', mobileDescription: 'Shipped subscription, referral, and loyalty backend services with reliable transaction rules.', stack: ['ASP.NET Core', 'SQL Server', 'Payments', 'Testing'] },
  { date: '2025', role: '.NET Developer', company: 'X3 Lab', logo: '/brand/x3-lab.png', description: 'Engineered core API endpoints for a university edutech platform serving course registration, results, and progress tracking, with validation and role-aware access around student records.', mobileDescription: 'Built role-aware APIs for course registration, results, and student progress.', stack: ['.NET', 'Web APIs', 'Auth', 'EdTech'] },
];
</script>
