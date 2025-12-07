<template>
  <div class="mt-[10rem] flex flex-col" id="projects">
    <SectionTitle>Projects</SectionTitle>
    <div class="grid flex-wrap gap-small md:grid-cols-3">
      <div
        class="flex min-h-[30rem] w-full cursor-pointer flex-col rounded-lg bg-dark-800 p-small shadow-sm shadow-dark-700 hover:scale-[1.025] hover:bg-zinc-900"
        v-for="(project, index) in projects"
        :key="index"
      >
        <div class="flex w-full items-center justify-between text-medium-lite">
          <BsBoxes class="text-brand" />
          <div class="flex gap-x-4">
            <a
              :href="project.github"
              v-if="project.is_public"
              target="_blank"
            >
              <PhFillGithubLogo
                class="cursor-pointer text-small hover:scale-[1.2] hover:text-brand-400"
              />
            </a>
            <a :href="project.website" target="_blank">
              <FeExternalLink
                class="cursor-pointer text-small hover:scale-[1.2] hover:text-brand-400"
              />
            </a>
          </div>
        </div>
        <h1 class="my-thin text-small text-brand">
          {{ project.name }}
        </h1>
        <h1 class="mb-4 text-dark-100">
          {{ project.description }}
        </h1>
        <div class="mt-auto flex flex-wrap items-center gap-4 self-start">
          <button
            class="rounded-lg border border-dark px-4 text-brand-700"
            v-for="tool in project.tools"
            :key="tool"
          >
            {{ tool }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  BsBoxes,
  FeExternalLink,
  PhFillGithubLogo,
} from '@kalimahapps/vue-icons';
import SectionTitle from './reusables/SectionTitle.vue';

interface ProjectInterface {
  name: string;
  website: string;
  github?: string;
  description: string;
  tools: string[];
  is_public: boolean;
}

const projects = ref<ProjectInterface[]>([
  {
    name: 'Recchx - Cold Email Outreach Platform',
    website: 'https://recchx-client.vercel.app',
    github: 'https://github.com/Gbohunmifrancis/Recchx',
    description:
      'A comprehensive cold email outreach platform built with .NET 8 following Clean Architecture and CQRS patterns. Features robust user management with JWT authentication, token blacklisting, single session enforcement, refresh token rotation, OAuth-based mailbox integration (Gmail/Outlook), prospect management, campaign automation, and Hangfire background jobs.',
    tools: [
      '.NET 8',
      'PostgreSQL',
      'Entity Framework',
      'MediatR',
      'JWT',
      'Hangfire',
    ],
    is_public: true,
  },
  {
    name: 'GlazionStudio Pottery AI',
    website: 'https://github.com/Gbohunmifrancis/GlazionStudio',
    github: 'https://github.com/Gbohunmifrancis/GlazionStudio',
    description:
      'An advanced AI-powered pottery knowledge API utilizing vector embeddings and RAG architecture, achieving intelligent query processing with 70%+ relevance threshold through OpenAI embeddings and Pinecone vector database integration. Features multi-modal AI combining text-based expertise with image analysis capabilities using OpenAI Vision API and DALL-E integration.',
    tools: [
      '.NET 8',
      'Clean Architecture',
      'OpenAI API',
      'Pinecone',
      'RAG',
      'Cloudinary',
    ],
    is_public: true,
  },
  {
    name: 'Carepulse Healthcare Management System',
    website: 'https://github.com/Gbohunmifrancis/Carepulse',
    github: 'https://github.com/Gbohunmifrancis/Carepulse',
    description:
      'A comprehensive RESTful API using ASP.NET Core for healthcare management. Features a secure, role-based authentication system (Admin, Doctor, Patient) utilizing JWT to protect sensitive endpoints. Implements appointment scheduling, patient record management, and data handling for doctors and administrative staff.',
    tools: [
      'ASP.NET Core',
      'SQL Server',
      'Entity Framework',
      'JWT',
      'RESTful API',
      'Swagger',
    ],
    is_public: true,
  },
  {
    name: 'My Portfolio',
    website: 'https://francisgbohunmi.tech',
    github: 'https://github.com/Gbohunmifrancis/portfolio-master/',
    description:
      'A personal portfolio website showcasing my expertise in backend development and web technologies. Built with modern frontend technologies to create an interactive and visually appealing user interface, featuring a blog system with admin panel.',
    tools: ['Vue 3', 'TypeScript', 'TailwindCSS', 'ASP.NET Core'],
    is_public: true,
  },
  {
    name: 'ThriveBookstore',
    website: 'https://github.com/Gbohunmifrancis/ThriveBookstore',
    github: 'https://github.com/Gbohunmifrancis/ThriveBookstore',
    description:
      'An online bookstore platform providing book enthusiasts with a convenient shopping experience. Features a vast selection of books across various genres, user-friendly interface, secure payment options, and personalized recommendations.',
    tools: [
      'C#',
      'SQL Server',
      'Entity Framework',
      '.NET Web API',
      'Identity',
    ],
    is_public: true,
  },
]);
</script>

<style scoped></style>

