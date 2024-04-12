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
              class=""
              v-if="project.is_public"
              target="_blank"
            >
              <PhFillGithubLogo
                class="cursor-pointer text-small hover:scale-[1.2] hover:text-brand-400"
              />
            </a>
            <a :href="project.website" class="" target="_blank">
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
  //{
  //   name: 'Syntrix',
  //   website: 'https://staging-buzz-chat.vercel.app',
  //   github: 'https://github.com/Realgreat01/chat-application-frontend',
  //   description:
  //     'I created a full-stack social media application that leverages various technologies and frameworks to enable users to establish effortless online connections. It provides a platform for individuals to cultivate relationships with their loved ones and openly share their thoughts and emotions with a broader audience.',
  //   tools: [
  //     'NodeJS',
  //     'Express',
  //     'SocketIO',
  //     'MongoDB',
  //     'Pinia',
  //     'Vue',
  //     'JavaScript',
  //     'TailwindCSS',
  //     'Swagger',
  //   ],
  //   is_public: true,
  // },
  // {
  //   name: 'QuickHire',
  //   website: 'https://quickhire.vercel.app',
  //   github: 'https://github.com/Realgreat01/resume-builder-backend',
  //   description:
  //     'I built a full-stack application that empowers developers to effortlessly create portfolios and apply for jobs with a single click. It streamlines the process by providing a user-friendly interface for showcasing skills, projects, and achievements, while simplifying job search and application.',
  //   tools: [
  //     'NodeJS',
  //     'Express',
  //     'MongoDB',
  //     'JavaScript',
  //     'Vue',
  //     'TailwindCSS',
  //     'Pinia',
  //     'Swagger',
  //   ],
  //   is_public: true,
  // },
  // {
  //   name: 'Divest',
  //   website: 'https://www.usedivest.com',
  //   description:
  //     'I built the landing page for Divest, a cryptocurrency conversion company based in Nigeria. The company assists you in effortlessly converting your cryptocurrencies into fiat currency and instantly crediting it to any bank account of your choice.',
  //   tools: ['Vue', 'Typescript', 'TailwindCSS'],
  //   is_public: false,
  // },
  {
    name: 'My Portfolio',
    website: '/',
    github: 'https://github.com/Realgreat01/portfolio',
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
    website: 'https://github.com/Gbohunmifrancis/Inmates-Management-System',
    github: 'https://github.com/Gbohunmifrancis/Inmates-Management-System',
    description:
      'The Correctional Facility Management System is a comprehensive software solution designed to streamline the management of inmates within correctional facilities. The system provides a centralized platform for correctional staff to efficiently track inmate information, monitor activities, and ensure the safety and security of the facility. By automating manual processes and integrating key functionalities, the system enhances operational efficiency, improves inmate supervision, and facilitates effective communication among staff members. ',
    tools: [
      'Blazor Web Assembly',
      'Entity Framework',
      'SQL SERVER',
      'C#',
      '.Net Web API'
    ],
    is_public: false,
  },
  /*{
    name: 'Crypto Dashboard',
    website: 'https://verix-exchange.vercel.app',
    github: 'https://github.com/Realgreat01/crypto-dashboard',
    description:
      'I created a sleek dashboard for a cryptocurrency exchange based on a captivating design from Figma. It offers a user-friendly interface for monitoring assets and making trades',
    tools: ['Vue', 'Javascript', 'TailwindCSS', 'Chart JS'],
    is_public: true,
  },
  {
    name: 'Verix Shop',
    website: 'https://verix-shop.vercel.app',
    github: 'https://github.com/Realgreat01/verix-shop',
    description:
      'I designed and developed a fully functional e-commerce website using dummy data from fakestoreapi.com. It offers an immersive shopping experience with a captivating design.',
    tools: ['Vue', 'Javascript', 'APIs', 'SCSS'],
    is_public: true,
  },
  {
    name: 'Weather App',
    website: 'https://verix-weather.vercel.app/',
    github: 'https://github.com/Realgreat01/weather-app',
    description:
      'I created a straightforward application that provides real-time weather information for any city worldwide. Users can easily access the current weather conditions for their desired location, offering convenience and up-to-date weather updates at their fingertips.',
    tools: ['Vue', 'Javascript', 'APIs', 'SCSS'],
    is_public: true,
  },
  {
    name: 'Movie App',
    website: 'https://verix-movie.vercel.app/',
    github: 'https://github.com/Realgreat01/movie-app',
    description:
      'I built my first Vue application—a simple app to check available movies from the IMDB website. Users can easily browse and explore a wide range of films with this user-friendly app.',
    tools: ['Vue', 'Javascript', 'APIs', 'SCSS'],
    is_public: true,
  },

  {
    name: 'Job Listing App',
    website: 'https://static-job.vercel.app/',
    github: 'https://github.com/Realgreat01/static-job-listings-master',
    description:
      'I learned data handling by building a front-end application that filters job postings based on companies. This project was a challenge by Frontend Mentor and helped enhance my skills in working with data effectively.',
    tools: ['HTML', 'Javascript', 'JSON', 'SCSS'],
    is_public: true,
  },*/
]);
</script>

<style scoped></style>
