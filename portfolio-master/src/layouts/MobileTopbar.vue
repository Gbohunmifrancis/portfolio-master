<template>
  <div class="fixed top-0 z-[100] h-fit w-full bg-dark-900">
    <div
      v-if="!showModal"
      class="z-50 flex h-[9.6rem] w-full items-center justify-between overflow-hidden px-thin py-small duration-[1500ms]"
    >
      <LogoPlain />
      <CgMenuRight
        class="h-[4rem] w-[4rem] text-brand"
        @click="showModal = !showModal"
      />
    </div>

    <div
      class="fixed top-0 z-[100] flex h-screen w-full justify-end overflow-hidden bg-dark-900 px-thin"
      v-else
    >
      <div class="w-full overflow-x-hidden duration-500">
        <div
          class="mb-[4rem] flex h-[9.6rem] w-full items-center justify-between"
        >
          <LogoPlain class="block" />
          <IcCancel
            class="h-[5rem] w-[5rem] text-brand duration-500"
            @click="showModal = false"
          />
        </div>
        <div
          class="my-medium flex flex-col gap-y-small-lite px-thin text-small text-brand"
        >
          <template v-for="(route, index) in NavActions" :key="index">
            <router-link
              v-if="route.title === 'Blog'"
              :to="route.route"
              @click="showModal = false"
              class="links hover:font-bold hover:text-brand"
            >
              {{ route.title }}
            </router-link>
            <a
              v-else
              @click="showModal = false"
              class="links hover:font-bold hover:text-brand"
              :href="route.route"
            >
              {{ route.title }}
            </a>
          </template>
        </div>
        <div class="flex items-center justify-center gap-medium md:flex-col">
          <a
            :href="link.link"
            class="flex h-medium w-medium items-center justify-center rounded-full text-brand hover:bg-brand-50 hover:text-brand-900"
            v-for="(link, index) in socialMediaLinks"
            :key="index"
            target="_blank"
          >
            <component :is="link.icon" class="text-medium-lite"></component>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoPlain from '@/components/icons/LogoIcon.vue';
import { CgMenuRight, IcCancel } from '@kalimahapps/vue-icons';
import {
  AkTwitterFill,
  AkGithubFill,
  AkLinkedInFill,
  AkInstagramFill,
} from '@kalimahapps/vue-icons';
import XIcon from '../components/icons/XIcon.vue';
import { shallowRef, ref, watchEffect } from 'vue';

const showModal = ref(false);
const NavActions = ref([
  { title: 'About', route: '/#about' },
  { title: 'Experience', route: '/#experience' },
  { title: 'Projects', route: '/#projects' },
  { title: 'Blog', route: '/blog' },
  { title: 'Contact', route: '/#contact' },
]);
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
watchEffect(() => {
  if (showModal.value === true) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'auto';
});
</script>

<style scoped lang="scss"></style>
