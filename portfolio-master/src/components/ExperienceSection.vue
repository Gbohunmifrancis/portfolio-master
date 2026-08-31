<template>
  <section id="experience" class="section-shell experience-section">
    <div class="section-intro"><p class="eyebrow">02 / Experience</p><h2>Recent chapters.</h2></div>
    <div class="timeline"><article v-for="item in experiences" :key="item.company" class="timeline-item"><div class="timeline-date">{{ item.date }}</div><div class="timeline-main"><div class="timeline-company"><img v-if="item.logo" :src="item.logo" :alt="`${item.company} logo`" /><div><p class="timeline-role">{{ item.role }}</p><h3>{{ item.company }}</h3></div></div><p class="timeline-description desktop-copy">{{ item.description }}<a v-if="item.linkText" :href="item.linkUrl" target="_blank" rel="noreferrer">{{ item.linkText }}</a>{{ item.descriptionSuffix }}</p><p class="timeline-description mobile-copy">{{ item.mobileDescription }}<a v-if="item.linkText" :href="item.linkUrl" target="_blank" rel="noreferrer">{{ item.linkText }}</a>{{ item.mobileDescriptionSuffix }}</p><div class="timeline-stack"><span v-for="tech in item.stack" :key="tech">{{ tech }}</span></div></div></article></div>
  </section>
</template>
<script setup lang="ts">
interface ExperienceItem {
  date: string;
  role: string;
  company: string;
  logo: string;
  description: string;
  mobileDescription: string;
  linkText?: string;
  linkUrl?: string;
  descriptionSuffix?: string;
  mobileDescriptionSuffix?: string;
  stack: string[];
}

const experiences: ExperienceItem[] = [
  { date: '2025 to June 2026', role: 'Backend Developer / QA Tester', company: 'Model Carbon Ltd', logo: '/brand/model-carbon.png', description: 'Built and validated backend services for the Converge ERP System developed for ', mobileDescription: 'Built and tested Converge ERP backend services for ', linkText: 'Heirs Technologies', linkUrl: 'https://heirstechnologies.com/', descriptionSuffix: ' under the UBA Group: integration contracts, debugging workflows, regression coverage, and release confidence across a modular .NET platform.', mobileDescriptionSuffix: ' under the UBA Group.', stack: ['.NET', 'REST APIs', 'QA', 'PostgreSQL'] },
  { date: '2025', role: 'Backend Developer', company: 'KUDA MFB', logo: '/brand/kuda.png', description: 'Helped ship premium subscriptions, referral rewards, and a loyalty system with ASP.NET Core and SQL Server, focusing on transactional rules, idempotent rewards, and reliable account state.', mobileDescription: 'Shipped subscription, referral, and loyalty backend services with reliable transaction rules.', stack: ['ASP.NET Core', 'SQL Server', 'Payments', 'Testing'] },
  { date: '2025', role: '.NET Developer', company: 'X3 Lab', logo: '/brand/x3-lab.png', description: 'Engineered core API endpoints for a university edutech platform serving course registration, results, and progress tracking, with validation and role-aware access around student records.', mobileDescription: 'Built role-aware APIs for course registration, results, and student progress.', stack: ['.NET', 'Web APIs', 'Auth', 'EdTech'] },
]
</script>
