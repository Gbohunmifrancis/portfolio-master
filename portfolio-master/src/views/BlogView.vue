<template>
  <div class="journal-page">
    <div class="journal-page-inner">
      <header class="journal-page-header">
        <div><p class="eyebrow">Journal / technical notes</p><h1>Notes from the build.</h1></div>
        <p>Detailed, project-specific case studies on architecture, failure modes, tradeoffs, and the fixes that made each system more dependable.</p>
      </header>
      <div class="journal-filters">
        <div class="journal-filter-list"><button v-for="category in categories" :key="category" class="journal-filter" :class="{ active: selectedCategory === category }" @click="selectedCategory = category">{{ category }}</button></div>
        <input v-model="searchQuery" class="journal-search" type="search" placeholder="Search the notes" aria-label="Search the notes" />
      </div>
      <div class="journal-grid">
        <article v-for="post in filteredPosts" :key="post.id" class="journal-card">
          <div class="journal-card-meta"><span>{{ post.category }}</span><span>{{ post.readTime }} min</span></div>
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
          <div class="journal-card-footer"><div class="journal-card-tags"><span v-for="tag in post.tags.slice(0, 3)" :key="tag">#{{ tag }}</span></div><router-link class="journal-card-link" :to="`/blog/${post.slug}`">Read note ↗</router-link></div>
        </article>
      </div>
      <p v-if="filteredPosts.length === 0" class="journal-empty">No notes match that search yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { getBlogPosts } from '@/data/blog-posts';

const posts = getBlogPosts();
const selectedCategory = ref('All');
const searchQuery = ref('');
const categories = ['All', ...new Set(posts.map(post => post.category))];
const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return posts.filter(post => {
    const matchesCategory = selectedCategory.value === 'All' || post.category === selectedCategory.value;
    const matchesQuery = !query || `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
});
</script>
