<template>
  <div class="flex flex-col justify-evenly">
    <template v-for="(route, index) in NavActions" :key="index">
      <router-link
        v-if="route.route === 'blog'"
        :to="route.path"
        class="text-[1.6rem] hover:font-bold hover:text-brand md:rotate-90"
        :class="
          $route.name === 'blog' || $route.name === 'blog-post' ? 'font-bold text-brand' : 'text-dark-200'
        "
        :style="{ display: 'block' }"
      >
        {{ route.title }}
      </router-link>
      <a
        v-else
        class="text-[1.6rem] hover:font-bold hover:text-brand md:rotate-90"
        :href="route.path"
        :class="
          route.route === activeId ? 'font-bold text-brand' : 'text-dark-200'
        "
        :style="
          route.route === 'home' || route.route === 'blog' ? { display: 'none' } : { display: 'block' }
        "
      >
        {{ route.title }}
      </a>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useActive } from 'vue-use-active-scroll';
const NavActions = ref([
  { title: 'Home', route: 'home', path: '/' },
  { title: 'About', route: 'about', path: '/#about' },
  { title: 'Experience', route: 'experience', path: '/#experience' },
  { title: 'Projects', route: 'projects', path: '/#projects' },
  { title: 'Blog', route: 'blog', path: '/blog' },
  { title: 'Contact', route: 'contact', path: '/#contact' },
]);

const targets = computed(() => NavActions.value.map(({ route }) => route));
const { activeId } = useActive(targets);
</script>

<style scoped></style>
