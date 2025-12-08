<template>
  <div class="min-h-screen bg-dark-900">
    <!-- Header -->
    <header class="border-b border-dark-700 bg-dark-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-2xl font-bold text-brand">Admin Panel</h1>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-dark-200">Welcome, {{ adminUser?.username }}</span>
            <button
              @click="handleLogout"
              class="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-white mb-4">Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Stats Cards -->
          <div class="bg-dark-800 overflow-hidden border border-dark-700 rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-dark-300 truncate">Total Posts</dt>
                    <dd class="text-lg font-medium text-white">{{ stats.totalPosts }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-dark-800 overflow-hidden border border-dark-700 rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-dark-300 truncate">Published</dt>
                    <dd class="text-lg font-medium text-white">{{ stats.publishedPosts }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-dark-800 overflow-hidden border border-dark-700 rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-dark-300 truncate">Drafts</dt>
                    <dd class="text-lg font-medium text-white">{{ stats.draftPosts }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Management -->
      <div class="bg-dark-800 border border-dark-700 rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-white mb-4">Blog Management</h3>
          
          <!-- Blog Admin Component -->
          <BlogAdmin />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '../services/authApi'
import { blogApi } from '../services/blogApi'
import BlogAdmin from '@/components/blog/BlogAdmin.vue'

const router = useRouter()
const adminUser = ref(authApi.getCurrentAdmin())

const stats = ref({
  totalPosts: 0,
  publishedPosts: 0,
  draftPosts: 0
})

const loadStats = async () => {
  try {
    // Use the admin endpoint to get all posts including drafts
    const response = await blogApi.getAdminPosts({ limit: 1000 })
    const allPosts = response.posts
    
    stats.value.totalPosts = allPosts.length
    stats.value.publishedPosts = allPosts.filter((post: any) => post.published).length
    stats.value.draftPosts = allPosts.filter((post: any) => !post.published).length
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}

const handleLogout = () => {
  authApi.logout()
}

onMounted(async () => {
  // Verify authentication
  try {
    await authApi.verify()
    await loadStats()
  } catch (error) {
    console.error('Authentication failed:', error)
    router.push('/admin/login')
  }
})
</script>