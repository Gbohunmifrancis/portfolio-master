<template>
  <section class="torn teams-band" aria-label="Teams I have worked with">
    <div class="container teams-inner">
      <h2><span class="underline-title">Teams I’ve Worked With</span></h2>
      <div class="teams-logos">
        <div v-for="team in teams" :key="team.name" class="team-logo" :class="{ dark: team.dark }" :style="{ '--r': team.r }" :title="team.name">
          <img :src="team.logo" :alt="`${team.name} logo`" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const teams = [
  { name: 'Model Carbon Ltd', logo: '/brand/model-carbon.png', dark: true, r: '-2deg' },
  { name: 'KUDA MFB', logo: '/brand/kuda.png', dark: false, r: '1.5deg' },
  { name: 'X3 Lab', logo: '/brand/x3-lab.png', dark: false, r: '-1deg' },
];
</script>
