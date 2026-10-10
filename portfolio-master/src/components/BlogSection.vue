<template>
  <section id="journal" class="section section-soft">
    <div class="container">
      <div class="section-head">
        <div><p class="eyebrow">Journal</p><h2>Notes from the build.</h2></div>
        <router-link class="text-link" to="/blog">All notes <span>↗</span></router-link>
      </div>
      <div class="post-grid">
        <article v-for="post in posts" :key="post.id" class="card post-card">
          <div class="post-card-meta"><span class="tag">{{ post.category }}</span><span>{{ post.readTime }} min read</span></div>
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt }}</p>
          <router-link class="text-link" :to="`/blog/${post.slug}`">Read note <span>↗</span></router-link>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getBlogPosts } from '@/data/blog-posts';

const posts = getBlogPosts().slice(0, 3);
</script>
