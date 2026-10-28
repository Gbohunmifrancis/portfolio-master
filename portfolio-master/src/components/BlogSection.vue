<template>
  <section id="journal" class="section">
    <div class="container">
      <div class="section-head section-head-row">
        <div>
          <h2 class="underline-title">Notes From The Build</h2>
          <p>Case studies on the failures, fixes and tradeoffs behind each product.</p>
        </div>
        <router-link class="text-link" to="/blog">Read all notes <span>→</span></router-link>
      </div>
      <div class="notes-board">
        <div class="notes-grid">
          <article v-for="post in posts" :key="post.id" class="note">
            <div class="note-meta"><span>{{ post.category }}</span><span>{{ post.readTime }} min</span></div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
            <router-link class="text-link" :to="`/blog/${post.slug}`">Read note <span>→</span></router-link>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getBlogPosts } from '@/data/blog-posts';

const posts = getBlogPosts().slice(0, 3);
</script>
