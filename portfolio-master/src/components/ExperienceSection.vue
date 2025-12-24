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
    company: ['Model Carbon Ltd'],
    type: 'Contract',
    role: 'Backend Developer / QA Tester',
    duration: 'December 2025 - Present',
    description:
      'Building, testing, and maintaining backend services, APIs, and microservices for the Converge ERP System. Following agreed architecture standards, participating in code reviews, debugging, and performance optimization. Performing manual testing and validation of features before release, reporting bugs, and working with developers to ensure smooth integration.',
  },
  {
    company: ['KUDA MFB, Lagos'],
    type: 'Internship',
    role: 'Backend Developer',
    duration: 'June 2025 - September 2025',
    description:
      'Collaborated with a cross-functional team of senior experts to define, develop, and launch a major feature suite aimed at increasing user value and engagement. Played a key role in implementing three user engagement features (premium subscription, referral rewards, and a loyalty system) using ASP.NET Core and SQL Server. Assisted in gathering user requirements and translating business objectives into technical specifications.',
  },
  {
    company: ['X3 Lab, Akure'],
    type: 'Contract',
    role: '.NET Developer',
    duration: 'January 2025 - June 2025',
    description:
      'Contributed to the development of a scalable backend system for a university-focused edutech platform using the .NET framework. Engineered 20+ key API endpoints and core business logic using ASP.NET Core Web API to power critical student features, including course registration, result management, and academic progress tracking for over 5,000 users.',
  },
  {
    company: ['Akure Tech Hub, Akure'],
    type: 'Bootcamp',
    role: 'AWS Solutions Architect',
    duration: 'June 2024 - July 2024',
    description:
      'Gained intensive, hands-on experience in core AWS services, including provisioning EC2 instances, deploying static websites with S3, and managing Relational Database Services (RDS). Developed and deployed a serverless web application as a capstone project, utilizing AWS Lambda to trigger a function that identified the nearest hospital based on a client\'s IP address.',
  },
]);
</script>

<style scoped lang="scss"></style>
