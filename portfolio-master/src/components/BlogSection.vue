<template>
  <div class="mt-[10rem] flex flex-col" id="blog">
    <SectionTitle>Latest Blog Posts</SectionTitle>
    
    <!-- Featured Posts Section -->
    <div class="mb-medium" v-if="featuredPosts.length > 0">
      <h2 class="mb-small text-small text-brand-400">Featured Posts</h2>
      <div class="grid gap-small md:grid-cols-2">
        <BlogCard
          v-for="post in featuredPosts.slice(0, 2)"
          :key="post._id"
          :post="post"
          :featured="true"
          @click="navigateToPost(post.slug)"
        />
      </div>
    </div>

    <!-- Filter and Search -->
    <div class="mb-small flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'rounded-lg border px-4 py-2 text-sm transition-colors',
            selectedCategory === category
              ? 'border-brand bg-brand text-dark-900'
              : 'border-dark-600 text-brand-700 hover:border-brand-700 hover:text-brand'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Search -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search posts..."
          class="w-full rounded-lg border border-dark-600 bg-dark-800 px-4 py-2 pl-10 text-white placeholder-dark-300 focus:border-brand focus:outline-none md:w-64"
        />
        <BsSearch class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-300" />
      </div>
    </div>

    <!-- Blog Posts Grid -->
    <div class="grid gap-small md:grid-cols-2 lg:grid-cols-3">
      <BlogCard
        v-for="post in filteredPosts"
        :key="post._id"
        :post="post"
        @click="navigateToPost(post.slug)"
      />
    </div>

    <!-- No Posts Message -->
    <div v-if="filteredPosts.length === 0" class="py-medium text-center">
      <p class="text-dark-300">No posts found matching your criteria.</p>
      <button
        @click="clearFilters"
        class="mt-4 text-brand hover:text-brand-400"
      >
        Clear filters
      </button>
    </div>

    <!-- View All Posts Button -->
    <div class="mt-medium text-center">
      <ButtonComponent 
        @click="navigateToBlog"
        custom-class="text-normal-lite px-8 py-3"
      >
        View All Posts
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SectionTitle from './reusables/SectionTitle.vue';
import ButtonComponent from './reusables/ButtonComponent.vue';
import BlogCard from './blog/BlogCard.vue';
import { BsSearch } from '@kalimahapps/vue-icons/bs';
import { blogApi, type BlogPost, handleApiError } from '@/services/blogApi';

const router = useRouter();

const posts = ref<BlogPost[]>([]);
const featuredPosts = ref<BlogPost[]>([]);
const categories = ref<string[]>(['All', 'Technology', 'Web Development', 'Programming', 'Tutorial', 'Personal']);
const selectedCategory = ref('All');
const searchQuery = ref('');

const filteredPosts = computed(() => {
  let filtered = posts.value;

  // Apply category filter
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(post => post.category === selectedCategory.value);
  }

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Show only first 6 posts in the section preview
  return filtered.slice(0, 6);
});

const loadPosts = async () => {
  try {
    const response = await blogApi.getPosts({ limit: 6 });
    posts.value = response.posts;
    
    // Get featured posts
    const featuredResponse = await blogApi.getFeaturedPosts();
    featuredPosts.value = featuredResponse;
  } catch (err) {
    console.error('Error loading posts:', err);
  }
};

const navigateToPost = (slug: string) => {
  router.push(`/blog/${slug}`);
};

const navigateToBlog = () => {
  router.push('/blog');
};

const clearFilters = () => {
  selectedCategory.value = 'All';
  searchQuery.value = '';
};

onMounted(() => {
  loadPosts();
});
</script>

<style scoped></style>