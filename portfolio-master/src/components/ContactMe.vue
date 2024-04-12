<template>
  <div
    id="contact"
    class="my-[10rem] flex flex-col items-center gap-small text-center"
  >
    <SectionTitle :has-both-ends="true">Contact&nbsp;Me</SectionTitle>
    <h1 class="text-medium-lite font-bold text-brand">Let's Connect !</h1>
    <p class="w-4/5 text-center text-dark-200">
      Let's connect and collaborate on your next project for a successful
      partnership!
    </p>
    <div
      class="h-medium w-[15rem] rounded-md bg-brand-800 text-small text-brand-50 hover:bg-brand-200 hover:text-brand-900"
      @click="SendMail"
    >
      <ButtonComponent>Say Hello!</ButtonComponent>
    </div>

    <div class="flex flex-wrap items-center justify-center">
      <div
        class="flex items-center gap-x-2"
        v-for="(contact, index) in contactInformation"
        :key="index"
      >
        <component
          :is="contact.icon"
          class="h-small-lite w-small-lite text-brand-600"
        />
        <p
          class="cursor-pointer pr-3 text-normal-lite text-dark-100"
          @click="contact.action"
        >
          {{ contact.contact }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/reusables/ButtonComponent.vue';
import { shallowRef } from 'vue';
import { FlMail, ReWhatsappFill, BsPhone } from '@kalimahapps/vue-icons';
import SectionTitle from './reusables/SectionTitle.vue';

const SendMail = () =>
  (window.location.href = 'mailto:' + 'francisgbohunmi@gmail.com');

const contactInformation = shallowRef([
  {
    icon: FlMail,
    contact: 'francisgbohunmi@gmail.com',
    action: (): void => {
      window.location.href = 'mailto:' + 'francisgbohunmi@gmail.com';
    },
  },

  {
    icon: BsPhone,
    contact: '+234 812 492 2244',
    action: (): void => {
      window.location.href = 'tel:' + '+2348124922244';
    },
  },
  {
    icon: ReWhatsappFill,
    contact: '+234 812 492 2244',
    action: (): void => {
      window.location.href = 'https://wa.me/+2348124922244';
    },
  },
]);
</script>

<style scoped></style>
