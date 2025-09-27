<template>
  <div
    :class="[
      'flex cursor-pointer flex-col rounded-lg bg-dark-800 p-small shadow-sm shadow-dark-700 transition-all hover:scale-[1.025] hover:bg-zinc-900',
      props.featured ? 'min-h-[35rem]' : 'min-h-[30rem]'
    ]"
  >
    <!-- Featured Image -->
    <div 
      v-if="props.post.image" 
      class="mb-4 h-48 w-full overflow-hidden rounded-lg"
    >
      <img 
        :src="props.post.image" 
        :alt="props.post.title"
        class="h-full w-full object-cover transition-transform hover:scale-105"
      />
    </div>

    <!-- Post Meta -->
    <div class="flex items-center justify-between text-sm text-dark-300">
      <div class="flex items-center gap-2">
        <BsCalendar class="h-4 w-4" />
        <span>{{ formattedDate }}</span>
      </div>
      <div class="flex items-center gap-2">
        <BsClock class="h-4 w-4" />
        <span>{{ props.post.readTime }} min read</span>
      </div>
    </div>

    <!-- Category Badge -->
    <div class="my-2">
      <span class="rounded-full bg-brand-900 px-3 py-1 text-xs text-brand-300">
        {{ props.post.category }}
      </span>
    </div>

    <!-- Title -->
    <h3 
      :class="[
        'mb-2 font-semibold text-white transition-colors hover:text-brand-400',
        props.featured ? 'text-normal' : 'text-normal-lite'
      ]"
    >
      {{ props.post.title }}
    </h3>

    <!-- Excerpt -->
    <p class="mb-4 text-sm text-dark-200 line-clamp-3">
      {{ props.post.excerpt }}
    </p>

    <!-- Tags -->
    <div class="mt-auto flex flex-wrap gap-2">
      <span
        v-for="tag in props.post.tags.slice(0, 3)"
        :key="tag"
        class="rounded-lg border border-dark-600 px-2 py-1 text-xs text-brand-700"
      >
        {{ tag }}
      </span>
      <span
        v-if="props.post.tags.length > 3"
        class="rounded-lg border border-dark-600 px-2 py-1 text-xs text-dark-400"
      >
        +{{ props.post.tags.length - 3 }}
      </span>
    </div>

    <!-- Featured Badge -->
    <div v-if="props.featured" class="absolute right-2 top-2">
      <div class="flex items-center gap-1 rounded-full bg-brand px-2 py-1">
        <BsStar class="h-3 w-3 text-dark-900" />
        <span class="text-xs font-medium text-dark-900">Featured</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BsCalendar, BsClock, BsStar } from '@kalimahapps/vue-icons/bs';

// Define the BlogPost interface locally
interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: string;
  createdAt?: string;
  readTime: number;
}

interface Props {
  post: BlogPost;
  featured?: boolean;
}

// Define props
const props = withDefaults(defineProps<Props>(), {
  featured: false
});

const formattedDate = computed(() => {
  if (!props.post.createdAt) return '';
  return new Date(props.post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>