<template>
  <div class="border border-none border-r-brand-50 bg-dark-900">
    <div class="flex h-full items-center justify-center gap-medium md:flex-col">
      <a
        :href="link.link"
        class="link flex h-medium w-medium items-center justify-center rounded-full text-brand hover:bg-brand-50 hover:text-brand-900"
        v-for="(link, index) in socialMediaLinks"
        :key="index"
        target="_blank"
      >
        <component :is="link.icon" class="text-medium-lite"></component>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AkTwitterFill,
  AkGithubFill,
  AkLinkedInFill,
  AkInstagramFill,
} from '@kalimahapps/vue-icons';
import XIcon from '../components/icons/XIcon.vue';
import { shallowRef } from 'vue';

const socialMediaLinks = shallowRef([
  {
    icon: AkGithubFill,
    link: 'https://github.com/Gbohunmifrancis/',
  },
  {
    icon: XIcon,
    link: 'https://x.com/MiscYaw',
  },
  {
    icon: AkLinkedInFill,
    link: 'https://www.linkedin.com/in/francis-gbohunmi-57059a294/',
  },
  {
    icon: AkInstagramFill,
    link: 'https://www.instagram.com/franc.yaw',
  },
]);
</script>

<style scoped></style>
