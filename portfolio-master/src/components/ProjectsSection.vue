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
    name: 'Carepulse Healthcare Management System',
    website: 'https://github.com/Gbohunmifrancis/Carepulse',
    github: '',
    description:
      'Carepulse Backend is a RESTful API built with ASP.NET Core, designed to support a healthcare management application. This backend service provides authentication, appointment scheduling, and management of patients, doctors, and admins. The project includes role-based authentication for admin, doctors, and patients, with JWT tokens for secure access.',
    tools: [
      'C#',
      'SQL SERVER',
      'Entity Framework',
      '.Net Web API',
      'MVC architecture',
      'Swagger',
      'Identity'
    ],
    is_public: true,
  },
  {
    name: 'My Portfolio',
    website: 'https://francisgbohunmi.tech',
    github: 'https://github.com/Gbohunmifrancis/portfolio-master/',
    description:
      'I built my own portfolio to showcase my expertise in web development, emphasizing my skills in creating interactive and visually appealing user interfaces. It displays my frontend technologies proficiency, design principles, and user experience capabilities, along with previous projects and accomplishments.',
    tools: ['Vue', 'TypeScript', 'TailwindCSS'],
    is_public: true,
  },
  {
    name: 'ThriveBookstore',
    website: 'https://github.com/Gbohunmifrancis/ThriveBookstore',
    github: 'https://github.com/Gbohunmifrancis/ThriveBookstore',
    description:
      'ThriveBookstore is an online platform designed to provide book enthusiasts with a convenient and immersive shopping experience. The platform offers a vast selection of books across various genres, allowing users to explore, purchase, and interact with their favorite titles from the comfort of their homes. With a user-friendly interface, secure payment options, and personalized recommendations, ThriveBookstore aims to foster a thriving community of readers and authors alike.',
    tools: [
      'C#',
      'SQL SERVER',
      'Entity Framework',
      '.Net Web API',
      'MVC architecture',
      'Swagger',
      'Identity',
    ],
    is_public: false,
  },
  {
    name: 'Inmates Management System',
    website: 'https://fox-river.vercel.app/',
    github: 'https://github.com/Gbohunmifrancis/Fox-River',
    description:
      'The Correctional Facility Management System is a comprehensive software solution designed to streamline the management of inmates within correctional facilities. The system provides a centralized platform for correctional staff to efficiently track inmate information, monitor activities, and ensure the safety and security of the facility. By automating manual processes and integrating key functionalities, the system enhances operational efficiency, improves inmate supervision, and facilitates effective communication among staff members.',
    tools: [
      'Blazor Web Assembly',
      'Entity Framework',
      'SQL SERVER',
      'C#',
      '.Net Web API'
    ],
    is_public: false,
  },
  {
    name: 'MVC Movie App',
    website: 'https://github.com/Gbohunmifrancis/Movie-App',
    github: 'https://github.com/Gbohunmifrancis/Movie-App',
    description:
      'I built my first Vue application—a simple app to check available movies from the IMDB website. Users can easily browse and explore a wide range of films with this user-friendly app.',
    tools: ['Vue', 'Javascript', 'APIs', 'SCSS'],
    is_public: true,
  },
]);
</script>

<style scoped></style>

