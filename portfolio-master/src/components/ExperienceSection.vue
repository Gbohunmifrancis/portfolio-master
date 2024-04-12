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
            <p class="text-brand-600">Remote</p>
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
    company: ['GFAMS CONSULTING'],
    type: 'Contract',
    role: 'Backend Developer',
    duration: 'January 2024 - Present',
    description:
      'I collaborated with cross-platform team to push a Sales Management System. It is a web-based application designed to streamline sales processes, manage customer inquiries, and generate quotations for potential customers. The system facilitates efficient communication between sales agents and customers, tracks interactions, and provides insights to drive sales performance.',
  },
  {
    company: ['Cardinal Health Inc'],
    type: 'Freelance',
    role: 'dotnet developer',
    duration: 'May 2023 - December 2023',
    description:
      'As a Back-end Developer at Cardinal Health, I was responsible for managing and ensuring the secure storage, retrieval, and management of sensitive patient information as part of the Electronic Health Record (EHR) system integration project. The project aimed to develop and integrate EHR systems to facilitate comprehensive patient care and improve communication among medical professionals.',
  },
  // {
  //   company: ['Swifia Technology Limited'],
  //   type: 'Freelance',
  //   role: 'Frontend Developer',
  //   duration: 'April 2023 - June 2023',
  //   description:
  //     'Swifia is a financial services company that offers businesses and individuals access to global banking services, including virtual accounts in multiple currencies, global transfer services, and forex services.',
  // },
  // {
  //   company: ['Convexity Humanitarian Aid Transfer Solution'],
  //   type: 'Freelance',
  //   role: 'Frontend Developer',
  //   duration: 'October 2022 - November 2022',
  //   description:
  //     'Convexity CHATS is a company that possesses a team of highly experienced individuals who specialize in the Humanitarian and Financial sectors. They developed a specialized solution that tackles the distinct challenge of Cash Voucher Assistance (CVA) distribution in Africa by making use of Ethereum Blockchain Programmable tokens.',
  // },
  // {
  //   company: ['Google Africa Developers Scholarship Program'],
  //   type: 'Bootcamp',
  //   role: 'Frontend Developement Bootcamp',
  //   duration: 'November 2020 - May 2021',
  //   description:
  //     'As a participant in the Google Africa Developers Scholarship Program, I specialized in Front-End Development (FE). The program empowered African developers through comprehensive learning in web and mobile development, focusing on HTML, CSS, JavaScript, and other front-end technologies. With the support of industry experts and mentors, I gained confidence and valuable skills to pursue a successful career in the tech industry.',
  // },
  // {
  //   company: [
  //     'United Nations Sustainable Development Solutions Network - Youth',
  //   ],
  //   role: 'Campus Coordinator',
  //   duration: 'August 2020 - December 2022',
  //   type: 'Voluntary',
  //   website: 'https://www.sdgstudents.org',
  //   description:
  //     'SDSN Youth stands as a global network that unites passionate young professionals and students in their unwavering commitment to sustainable development. With a key emphasis on fostering youth empowerment, promoting innovation, and facilitating knowledge exchange, SDSN Youth takes an active role in engaging and mobilizing young leaders to tackle pressing global challenges.',
  // },
  // {
  //   company: ['United Nations Education and Cultural Organization'],
  //   role: 'SDG4Youth Network Member',
  //   duration: 'November 2021 - Present',
  //   type: 'Voluntary',
  //   Website: 'https://www.sdgstudents.org',
  //   description:
  //     "The SDG4Youth Network is a global platform that initiated by UNESCO in collaboration with the Office of the Secretary-General's Envoy on Youth, the Global Partnership for Education (GPE), Generation Unlimited, and other esteemed partners. Its primary objective is to empower young individuals and students, enabling them to spearhead initiatives and efforts aimed at attaining Sustainable Development Goal 4 (SDG 4) - ensuring quality education for all.",
  // },
  // {
  //   role: 'Student Ambassador',
  //   type: 'Voluntary',
  //   company: ['Flutterwave', 'Trove Finance', 'MyStash Technologies'],
  //   duration: 'January 2021 - June 2022',
  //   description:
  //     'As an ambassador for prominent Tech companies in Nigeria, they entrust me with the responsibility of attracting and acquiring new customers. Additionally, I actively engage with like-minded individuals, fostering connections and networking opportunities within the industry. Through my role, I have gained valuable experience and insights into the Nigerian Fintech sector, enhancing my understanding of its intricacies and advancements.',
  //},
]);
</script>

<style scoped lang="scss"></style>
