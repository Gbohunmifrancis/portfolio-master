<template>
  <div v-if="post" class="blog-post-page">
    <article class="blog-post-inner">
      <router-link class="blog-back" to="/blog">← Back to journal</router-link>
      <header class="blog-post-header"><p class="eyebrow">{{ post.category }}</p><h1>{{ post.title }}</h1><p class="blog-post-dek">{{ post.excerpt }}</p><div class="blog-post-meta"><span>{{ post.author }}</span><span>{{ formattedDate }}</span><span>{{ post.readTime }} min read</span></div></header>
      <div class="blog-post-content" v-html="post.content"></div>
      <div class="blog-post-tags"><span v-for="tag in post.tags" :key="tag">#{{ tag }}</span></div>
    </article>
  </div>
  <div v-else class="blog-post-page"><div class="blog-post-inner"><router-link class="blog-back" to="/blog">← Back to journal</router-link><h1>Note not found.</h1></div></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { getBlogPost } from '@/data/blog-posts';

const route = useRoute();
const post = computed(() => getBlogPost(route.params.slug as string));
const formattedDate = computed(() => post.value ? new Date(post.value.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '');
</script>
