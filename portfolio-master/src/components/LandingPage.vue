<template>
  <div class="flex h-screen flex-col justify-center" id="home">
    <h1 class="">
      <span class="text-small text-brand-100">Hi, I'm</span>
      <span class="block text-medium font-bold text-brand-300 md:text-[7rem]">
        Francis Gbohunmi
      </span>
    </h1>
    <h2
      class="-mt-thin bg-gradient-to-r from-brand-600 to-brand-900 bg-clip-text text-small font-black text-transparent"
    >
      Fullstack Developer
    </h2>
    <p class="my-medium font-thin md:w-4/5">
      As a skilled software engineer, I specialize in building frontend and
      backend applications. With a strong commitment to excellence, I prioritize
      speed, accessibility, and responsiveness in the applications I deliver.
    </p>

    <div class="grid grid-cols-2 gap-x-thin text-small-lite md:w-1/2">
      <a
        href="/CV.pdf"
        download="francis gbohunmi"
        class="h-medium rounded-md bg-brand-700 text-brand-50 hover:bg-brand-100 hover:text-dark-900"
      >
        <ButtonComponent>Resume</ButtonComponent>
      </a>
      <a
        href="#contact"
        class="h-medium rounded-md border border-brand-800 text-brand-50 hover:border-brand hover:text-brand-300"
      >
        <ButtonComponent>Hire&nbsp;Me</ButtonComponent>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from './reusables/ButtonComponent.vue';
</script>

<style scoped></style>
