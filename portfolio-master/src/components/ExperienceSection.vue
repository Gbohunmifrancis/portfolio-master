<template>
  <div class="mt-[10rem] flex flex-col" id="experience">
    <SectionTitle>My &nbsp; Experience</SectionTitle>
    <div
      class="grid grid-cols-[1px,9fr] items-center gap-x-small md:gap-x-medium"
      v-for="(experience, index) in experiences"
      :key="index"
    >
      <div
        class="relative flex h-full w-[1px] items-center justify-center bg-brand-400"
      >
        <h1
          class="side-index absolute flex h-medium-lite w-medium-lite items-center justify-center rounded-full bg-dark-500 text-brand"
        >
          0{{ index + 1 }}
        </h1>
      </div>
      <div class="my-small min-h-[20rem] flex-1 bg-dark-800 p-small">
        <div class="flex w-full flex-col justify-between md:flex-row">
          <h1 class="text-small-lite uppercase text-brand-400">
            {{ experience.role }}
          </h1>
          <h1 class="text-dark-300">{{ experience.duration }}</h1>
        </div>

        <div class="flex flex-col gap-x-small md:flex-row">
          <div class="flex flex-wrap gap-x-small">
            <h2
              class="text-brand-600"
              v-for="company in experience.company"
              :key="index"
            >
              {{ company }}
            </h2>
          </div>
          <div
            class="flex w-full justify-between md:ml-auto md:w-fit md:justify-start md:gap-x-medium"
          >
            <p class="text-brand-700">{{ experience.type }}</p>
            <p class="text-brand-600"></p>
          </div>
        </div>

        <p class="text-dark-100 md:w-4/5">{{ experience.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ButtonComponent from '@/components/reusables/ButtonComponent.vue';
import SectionTitle from './reusables/SectionTitle.vue';
const experiences = ref([
    
  {
    company: ['X3 Lab, Akure'],
    type: 'Contract',
    role: 'dotnet developer',
    duration: 'January 2025 - Present',
    description:
      'Assisted in researching, developing, and building the backend of an edutech platform targeted at universities, enabling students to choose courses, manage results, and track outstanding courses.',
  },

{
    company: ['Akure Tech Hub, Akure'],
    type: 'Bootcamp',
    role: 'AWS solutions Architect',
    duration: 'June 2024 - August 2024',
    description:
      'I gained Hands-on experience working with Amazon web services, Learnt the intricaces of Elastic cloud computing(EC2),Deployed static sites on S3 buckets and worked with relational Database Services. It was rounded off with a web-based project that triggers a lamda function after detecting the nearest Hospital based on the clients location and IP address.',
  },
  {
    company: ['GFAMS CONSULTING, Lagos'],
    type: 'Contract',
    role: 'Backend Developer',
    duration: 'January 2024 - Present',
    description:
      'I collaborated with cross-platform team to push a B2B Sales Management System. It is a web-based application designed to streamline sales processes, manage customer inquiries, and generate quotations for potential customers. The system facilitates efficient communication between sales agents and customers, tracks interactions, and provides insights to drive sales performance.',
  }

  
]);
</script>

<style scoped lang="scss"></style>
