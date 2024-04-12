<template>
  <!-- Add customClass Prop -->
  <button
    class="m-0 flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] border-inherit bg-inherit ring-inherit"
    :type="type"
    :style="style"
    :class="customClass"
    :disabled="disabled"
  >
    <div
      v-if="disabled === false"
      @click="$emit('click')"
      class="block p-[inherit] px-[inherit] py-[inherit]"
    >
      <slot>Button text</slot>
    </div>
    
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
type ButtonType = 'button' | 'submit' | 'reset' | undefined;

defineProps({
  type: {
    type: String as PropType<ButtonType>,
    validator: (value: ButtonType) =>
      !value || ['button', 'submit', 'reset'].includes(value),
      
    default: 'button',
  },
  text: {
    type: String,
    default: 'Log In',
  },
  loadingClass: {
    type: String,
    default: 'bg-brand-200',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: 'font-normal',
  },
  style: {
    type: Object,
  },
});
</script>

<style scoped></style>
