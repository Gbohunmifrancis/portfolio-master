<template>
  <div class="w-full">
    <!-- Header Section -->
    <div class="mb-medium">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-medium text-brand mb-2">Blog</h1>
          <p class="text-dark-200 text-normal font-[300]">
            Thoughts, tutorials, and insights about web development and technology
          </p>
        </div>
        <router-link 
          to="/blog/admin" 
          class="bg-brand hover:bg-brand-600 text-dark-900 px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
        >
          Admin Panel
        </router-link>
      </div>
    </div>

    <!-- Search and Filter Section -->
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
          {{ category }} ({{ getPostCount(category) }})
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

    <!-- Error Message -->
    <div v-if="error" class="mb-small bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-200">
      <p class="font-semibold">Error loading posts:</p>
      <p>{{ error }}</p>
      <button 
        @click="loadPosts" 
        class="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm"
      >
        Retry
      </button>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="py-medium text-center">
      <div class="animate-spin mx-auto h-12 w-12 border-4 border-brand border-t-transparent rounded-full mb-4"></div>
      <p class="text-dark-300">Loading posts...</p>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Results Info -->
      <div class="mb-small text-sm text-dark-300">
        Showing {{ filteredPosts.length }} posts
        <span v-if="searchQuery">for "{{ searchQuery }}"</span>
        <span v-if="selectedCategory !== 'All'">in {{ selectedCategory }}</span>
      </div>

      <!-- Blog Posts Grid -->
      <div class="grid gap-small md:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          v-for="post in paginatedPosts"
          :key="post._id || post.slug"
          :post="post"
          @click="navigateToPost(post.slug)"
        />
      </div>
    </template>

    <!-- No Posts Message -->
    <div v-if="filteredPosts.length === 0" class="py-medium text-center">
      <div class="mx-auto max-w-md">
        <BsSearch class="mx-auto mb-4 h-16 w-16 text-dark-600" />
        <h3 class="mb-2 text-normal text-white">No posts found</h3>
        <p class="mb-4 text-dark-300">
          No posts match your current search criteria. Try adjusting your filters or search terms.
        </p>
        <button
          @click="clearFilters"
          class="rounded-lg bg-brand px-6 py-2 text-dark-900 hover:bg-brand-400"
        >
          Clear filters
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div 
      v-if="totalPages > 1" 
      class="mt-medium flex items-center justify-center gap-2"
    >
      <button
        @click="currentPage = currentPage - 1"
        :disabled="currentPage <= 1"
        :class="[
          'rounded-lg border px-4 py-2 transition-colors',
          currentPage <= 1
            ? 'border-dark-700 text-dark-500 cursor-not-allowed'
            : 'border-dark-600 text-brand-700 hover:border-brand-700 hover:text-brand'
        ]"
      >
        Previous
      </button>

      <div class="flex gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'rounded-lg border px-3 py-2 transition-colors',
            currentPage === page
              ? 'border-brand bg-brand text-dark-900'
              : 'border-dark-600 text-brand-700 hover:border-brand-700 hover:text-brand'
          ]"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="currentPage = currentPage + 1"
        :disabled="currentPage >= totalPages"
        :class="[
          'rounded-lg border px-4 py-2 transition-colors',
          currentPage >= totalPages
            ? 'border-dark-700 text-dark-500 cursor-not-allowed'
            : 'border-dark-600 text-brand-700 hover:border-brand-700 hover:text-brand'
        ]"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import BlogCard from '@/components/blog/BlogCard.vue';
import { BsSearch } from '@kalimahapps/vue-icons/bs';
import { blogApi, type BlogPost, handleApiError } from '@/services/blogApi';

const router = useRouter();

const allPosts = ref<BlogPost[]>([]);
const categories = ref<string[]>(['All']);
const selectedCategory = ref('All');
const searchQuery = ref('');
const currentPage = ref(1);
const postsPerPage = 9;
const loading = ref(true);
const error = ref('');

const loadPosts = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    const response = await blogApi.getPosts({
      category: selectedCategory.value === 'All' ? undefined : selectedCategory.value,
      search: searchQuery.value || undefined,
      page: currentPage.value,
      limit: postsPerPage
    });
    
    allPosts.value = response.posts;
    
    // Load categories
    const categoriesData = await blogApi.getCategories();
    categories.value = categoriesData;
    
  } catch (err) {
    error.value = handleApiError(err);
    console.error('Error loading posts:', err);
  } finally {
    loading.value = false;
  }
};

const filteredPosts = computed(() => {
  // Since we're using server-side filtering, just return all posts
  return allPosts.value;
});

const totalPages = computed(() => {
  return Math.ceil(allPosts.value.length / postsPerPage);
});

const paginatedPosts = computed(() => {
  // Server-side pagination, so just return all posts
  return allPosts.value;
});

const visiblePages = computed(() => {
  const pages = [];
  const totalPagesCount = totalPages.value;
  const current = currentPage.value;
  
  // Show up to 5 pages at a time
  let start = Math.max(1, current - 2);
  let end = Math.min(totalPagesCount, start + 4);
  
  // Adjust start if we're near the end
  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const getPostCount = (category: string): number => {
  if (category === 'All') return allPosts.value.length;
  return allPosts.value.filter(post => post.category === category).length;
};

const navigateToPost = (slug: string) => {
  router.push(`/blog/${slug}`);
};

const clearFilters = () => {
  selectedCategory.value = 'All';
  searchQuery.value = '';
  currentPage.value = 1;
};

// Reset page when filters change and reload posts
watch([selectedCategory, searchQuery], () => {
  currentPage.value = 1;
  loadPosts();
});

// Watch page changes
watch(currentPage, () => {
  loadPosts();
});

onMounted(() => {
  loadPosts();
});
</script>

<style scoped></style>