<template>
  <div class="flex flex-col justify-evenly">
    <a
      class="text-[1.6rem] hover:font-bold hover:text-brand md:rotate-90"
      v-for="(route, index) in NavActions"
      :href="`#${route.route}`"
      :key="index"
      :class="
        route.route === activeId ? 'font-bold text-brand' : 'text-dark-200'
      "
      :style="
        route.route === 'home' ? { display: 'none' } : { display: 'block' }
      "
    >
      {{ route.title }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useActive } from 'vue-use-active-scroll';
const NavActions = ref([
  { title: 'Home', route: 'home' },
  { title: 'About', route: 'about' },
  { title: 'Experience', route: 'experience' },
  { title: 'Projects', route: 'projects' },
  { title: 'Contact', route: 'contact' },
]);

const targets = computed(() => NavActions.value.map(({ route }) => route));
const { activeId } = useActive(targets);
</script>

<style scoped></style>
