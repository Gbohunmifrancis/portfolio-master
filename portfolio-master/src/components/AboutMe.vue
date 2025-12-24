<template>
  <div class="flex flex-col md:mt-[10rem]" id="about">
    <SectionTitle>About</SectionTitle>
    <p class="w-full text-normal font-[300] md:w-11/12">
I’m a dedicated Backend Developer specializing in .NET technologies, with a strong passion for creating robust, scalable, and user-focused digital solutions. With a solid foundation in software engineering and a pursuit of a degree in Statistics, I bring a unique combination of analytical thinking and technical expertise to every project.
      <br />
      <br />
     Beyond development, I value meaningful connections, continuous learning, and personal growth. Whether I’m exploring the depths of data analytics, composing melodies on the piano, or delving into thought-provoking books, I approach each endeavor with curiosity and a drive for excellence.
I thrive in collaborative environments where innovative ideas are transformed into impactful solutions. Let's build technology that empowers individuals and creates lasting change.
      <br />
      <br />
      Let's join forces and create something truly amazing together!
    </p>
  </div>
  <div class="grid items-start justify-start pt-medium md:grid-cols-2">
    <div class="flex h-full w-full items-start justify-start">
      <img
        src="../assets/icons/programming-animate.svg"
        alt=""
        class="block w-full"
      />
    </div>
    <div class="my-small grid w-full grid-cols-4 flex-wrap gap-thin md:flex">
      <button
        v-for="(skill, index) in skills"
        :key="index"
        class="flex w-[8rem] flex-col items-center justify-center gap-thin rounded-lg bg-dark-800 p-thin md:w-[10rem]"
      >
        <component
          ref="skillIcons"
          :is="skill.icon"
          :class="skill.skill === 'Laravel' ? 'text-red-600' : 'text-white'"
          class="h-normal w-normal md:h-small md:w-small"
        />
        <p class="text-thin text-dark-300">{{ skill.skill }}</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref } from 'vue';
import {
  DeJavascriptOriginal,
  DeMongodbOriginal,
  DeDockerOriginal,
  DePythonOriginal,
  DeCsharpOriginal,
  AkGithubFill,
  DeGitOriginal,
  DeDotnetcoreOriginal,
  SiMicrosoftsqlserver,
  SiAmazonaws,
  SiVisualstudiocode,
} from '@kalimahapps/vue-icons';

import SectionTitle from './reusables/SectionTitle.vue';
import gsap from 'gsap';

const skillIcons = ref([])
const stagger = (el: HTMLElement) =>
  gsap.from(el, {
    y: -100,
  });
const skills = shallowRef([
  {
    skill: 'C#',
    icon: DeCsharpOriginal,
  },
  {
    skill: '.NET Core',
    icon: DeDotnetcoreOriginal,
  },
  {
    skill: 'Python',
    icon: DePythonOriginal,
  },
  {
    skill: 'SQL Server',
    icon: SiMicrosoftsqlserver,
  },
  {
    skill: 'AWS',
    icon: SiAmazonaws,
  },
  {
    skill: 'Docker',
    icon: DeDockerOriginal,
  },
  {
    skill: 'MongoDB',
    icon: DeMongodbOriginal,
  },
  {
    skill: 'Javascript',
    icon: DeJavascriptOriginal,
  },
  {
    skill: 'Git',
    icon: DeGitOriginal,
  },
  {
    skill: 'Github',
    icon: AkGithubFill,
  },
  {
    skill: 'VS Code',
    icon: SiVisualstudiocode,
  },
]);
</script>

<style scoped></style>
