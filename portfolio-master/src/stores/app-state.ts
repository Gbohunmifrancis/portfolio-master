import { defineStore } from 'pinia';
import { ref } from 'vue';

export const AppStore = defineStore('counter', () => {
  const active_tab = ref('');

  return { active_tab };
});
