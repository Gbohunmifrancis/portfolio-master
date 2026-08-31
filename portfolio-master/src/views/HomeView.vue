<template>
  <div class="w-full">
    <LandingPage />
    <AboutMe />
    <ExperienceSection />
    <ProjectsSection />
    <BlogSection />
    <EducationSection />
    <ContactMe />
  </div>
</template>

<script setup lang="ts">
import AboutMe from '@/components/AboutMe.vue';
import ContactMe from '@/components/ContactMe.vue';
import EducationSection from '@/components/EducationSection.vue';
import ExperienceSection from '@/components/ExperienceSection.vue';
import LandingPage from '@/components/LandingPage.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';
import BlogSection from '@/components/BlogSection.vue';
</script>

<style scoped></style>
