<template>
  <div class="min-h-screen bg-dark-900">
    <!-- Header -->
    <header class="bg-dark-800 border-b border-dark-700 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo/Title -->
          <div class="flex items-center gap-4">
            <router-link to="/blog" class="flex items-center gap-2 text-dark-300 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span class="text-sm">Back to Blog</span>
            </router-link>
            <div class="h-6 w-px bg-dark-600"></div>
            <h1 class="text-xl font-bold text-brand">Blog Admin</h1>
          </div>

          <!-- User Info & Actions -->
          <div class="flex items-center gap-4">
            <!-- Automation Quick Action -->
            <button
              @click="showAutomationModal = true"
              class="hidden md:flex items-center gap-2 px-3 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-lg transition-colors text-sm"
              title="Trigger Automation"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span class="hidden lg:block">Automation</span>
            </button>
            
            <!-- User Menu -->
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
              >
                <div class="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                  <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <span class="text-sm hidden sm:block">{{ currentAdmin?.username || 'Admin' }}</span>
                <svg class="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-64 bg-dark-800 border border-dark-700 rounded-lg shadow-xl z-50"
                @click.stop
              >
                <div class="p-4 border-b border-dark-700">
                  <p class="text-white font-medium">{{ currentAdmin?.username }}</p>
                  <p class="text-dark-400 text-sm">{{ currentAdmin?.email }}</p>
                  <p class="text-brand text-xs mt-1">{{ currentAdmin?.role === 0 ? 'Super Admin' : 'Admin' }}</p>
                </div>
                <div class="p-2">
                  <button
                    @click="showUserMenu = false; showAutomationModal = true"
                    class="w-full flex items-center gap-2 px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-700 rounded transition-colors text-sm md:hidden"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Trigger Automation
                  </button>
                  <button
                    @click="showUserMenu = false; handleLogout()"
                    class="w-full flex items-center gap-2 px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-700 rounded transition-colors text-sm"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-dark-800 border border-dark-700 rounded-xl p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-dark-400 text-sm">Total Posts</p>
              <p class="text-2xl font-bold text-white mt-1">{{ blogPosts.length }}</p>
            </div>
            <div class="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center">
              <svg class="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-dark-800 border border-dark-700 rounded-xl p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-dark-400 text-sm">Published</p>
              <p class="text-2xl font-bold text-white mt-1">{{ publishedCount }}</p>
            </div>
            <div class="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-dark-800 border border-dark-700 rounded-xl p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-dark-400 text-sm">Drafts</p>
              <p class="text-2xl font-bold text-white mt-1">{{ draftCount }}</p>
            </div>
            <div class="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-dark-800 border border-dark-700 rounded-xl p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-dark-400 text-sm">Categories</p>
              <p class="text-2xl font-bold text-white mt-1">{{ uniqueCategories.length }}</p>
            </div>
            <div class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="mb-8">
        <div class="border-b border-dark-700">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="activeTab = 'posts'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'posts'
                  ? 'border-brand text-brand'
                  : 'border-transparent text-dark-400 hover:text-white hover:border-dark-600'
              ]"
            >
              Blog Posts
              <span class="ml-2 px-2 py-0.5 rounded-full text-xs" :class="activeTab === 'posts' ? 'bg-brand/10 text-brand' : 'bg-dark-700 text-dark-300'">
                {{ blogPosts.length }}
              </span>
            </button>
            <button
              v-if="isSuperAdmin"
              @click="activeTab = 'admin'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'admin'
                  ? 'border-brand text-brand'
                  : 'border-transparent text-dark-400 hover:text-white hover:border-dark-600'
              ]"
            >
              Admin Management
              <span class="ml-2 px-2 py-0.5 rounded-full text-xs bg-purple-500/10 text-purple-400">
                SuperAdmin
              </span>
            </button>
            <button
              @click="activeTab = 'profile'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'profile'
                  ? 'border-brand text-brand'
                  : 'border-transparent text-dark-400 hover:text-white hover:border-dark-600'
              ]"
            >
              My Profile
            </button>
          </nav>
        </div>
      </div>

      <!-- Blog Posts Tab -->
      <div v-show="activeTab === 'posts'">
        <!-- Action Bar -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-semibold text-white">Manage Posts</h2>
            <span class="text-dark-400 text-sm">({{ filteredPosts.length }} posts)</span>
          </div>
        <div class="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <!-- Search -->
          <div class="relative flex-1 sm:flex-initial">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search posts..."
              class="w-full sm:w-64 bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-dark-400 focus:border-brand focus:outline-none text-sm"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <!-- AI Generate Button -->
          <button
            @click="showGenerateModal = true"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            AI Generate
          </button>
          <!-- Create Button -->
          <button
            @click="showCreateModal = true"
            class="bg-brand hover:bg-brand-600 text-dark-900 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Post
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-6 bg-red-900/30 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
        <svg class="h-5 w-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-red-200">{{ error }}</span>
        <button @click="loadPosts" class="ml-auto text-red-400 hover:text-red-300 text-sm">Retry</button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="animate-spin h-12 w-12 border-4 border-brand border-t-transparent rounded-full mx-auto mb-4"></div>
          <p class="text-dark-400">Loading posts...</p>
        </div>
      </div>

      <!-- Posts Table -->
      <div v-else class="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-dark-700/50">
              <tr>
                <th class="text-left text-dark-300 text-sm font-medium px-6 py-4">Title</th>
                <th class="text-left text-dark-300 text-sm font-medium px-6 py-4 hidden md:table-cell">Category</th>
                <th class="text-left text-dark-300 text-sm font-medium px-6 py-4 hidden lg:table-cell">Date</th>
                <th class="text-left text-dark-300 text-sm font-medium px-6 py-4">Status</th>
                <th class="text-right text-dark-300 text-sm font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-dark-700">
              <tr 
                v-for="post in filteredPosts" 
                :key="post.id"
                class="hover:bg-dark-700/30 transition-colors"
              >
                <td class="px-6 py-4">
                  <div>
                    <p class="text-white font-medium line-clamp-1">{{ post.title }}</p>
                    <p class="text-dark-400 text-sm line-clamp-1 mt-1">{{ post.excerpt }}</p>
                  </div>
                </td>
                <td class="px-6 py-4 hidden md:table-cell">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-600 text-dark-200">
                    {{ post.category }}
                  </span>
                </td>
                <td class="px-6 py-4 hidden lg:table-cell">
                  <span class="text-dark-300 text-sm">{{ formatDate(post.createdAt || '') }}</span>
                </td>
                <td class="px-6 py-4">
                  <span 
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      post.published 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-yellow-500/10 text-yellow-400'
                    ]"
                  >
                    {{ post.published ? 'Published' : 'Draft' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="viewPost(post.slug)"
                      class="p-2 text-dark-400 hover:text-white hover:bg-dark-600 rounded-lg transition-colors"
                      title="View"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    <button
                      @click="editPost(post)"
                      class="p-2 text-dark-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      @click="deletePost(post.id)"
                      class="p-2 text-dark-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPosts.length === 0" class="text-center py-16">
          <svg class="w-16 h-16 mx-auto text-dark-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 class="text-white font-medium mb-2">No posts found</h3>
          <p class="text-dark-400 text-sm mb-4">
            {{ searchQuery ? 'Try adjusting your search terms' : 'Create your first blog post to get started' }}
          </p>
          <button
            v-if="!searchQuery"
            @click="showCreateModal = true"
            class="bg-brand hover:bg-brand-600 text-dark-900 px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
          >
            Create Post
          </button>
        </div>
      </div>
      </div> <!-- End Blog Posts Tab -->

      <!-- Admin Management Tab (SuperAdmin Only) -->
      <div v-show="activeTab === 'admin' && isSuperAdmin" class="space-y-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-white">Admin Management</h2>
          <button
            @click="showCreateAdminModal = true"
            class="bg-brand hover:bg-brand-600 text-dark-900 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create Admin
          </button>
        </div>

        <!-- Admin List -->
        <div class="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-dark-700/50">
                <tr>
                  <th class="text-left text-dark-300 text-sm font-medium px-6 py-4">Username</th>
                  <th class="text-left text-dark-300 text-sm font-medium px-6 py-4 hidden md:table-cell">Email</th>
                  <th class="text-left text-dark-300 text-sm font-medium px-6 py-4">Role</th>
                  <th class="text-left text-dark-300 text-sm font-medium px-6 py-4 hidden lg:table-cell">Status</th>
                  <th class="text-left text-dark-300 text-sm font-medium px-6 py-4 hidden lg:table-cell">Created</th>
                  <th class="text-right text-dark-300 text-sm font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-dark-700">
                <tr 
                  v-for="admin in adminList" 
                  :key="admin.id"
                  class="hover:bg-dark-700/30 transition-colors"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
                        <svg class="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <span class="text-white font-medium">{{ admin.username }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 hidden md:table-cell">
                    <span class="text-dark-300">{{ admin.email }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <span 
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        admin.role === 0
                          ? 'bg-purple-500/10 text-purple-400'
                          : 'bg-blue-500/10 text-blue-400'
                      ]"
                    >
                      {{ admin.role === 0 ? 'SuperAdmin' : 'Admin' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 hidden lg:table-cell">
                    <span 
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        admin.isActive
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-red-500/10 text-red-400'
                      ]"
                    >
                      {{ admin.isActive ? 'Active' : 'Revoked' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 hidden lg:table-cell">
                    <span class="text-dark-300 text-sm">{{ formatDate(admin.createdAt) }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        v-if="admin.role !== 0 && admin.isActive && admin.id !== currentAdmin?.id"
                        @click="handleRevokeAdmin(admin)"
                        class="p-2 text-dark-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Revoke Access"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                        </svg>
                      </button>
                      <span v-else class="text-dark-600 text-xs">
                        {{ admin.role === 0 ? 'SuperAdmin' : admin.id === currentAdmin?.id ? 'You' : 'Revoked' }}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Empty State -->
          <div v-if="adminList.length === 0" class="text-center py-16">
            <svg class="w-16 h-16 mx-auto text-dark-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <h3 class="text-white font-medium mb-2">No admins found</h3>
            <p class="text-dark-400 text-sm">Create admin users to manage the blog</p>
          </div>
        </div>
      </div>

      <!-- My Profile Tab -->
      <div v-show="activeTab === 'profile'" class="space-y-6">
        <h2 class="text-xl font-semibold text-white mb-6">My Profile</h2>
        
        <!-- Profile Info Card -->
        <div class="bg-dark-800 border border-dark-700 rounded-xl p-6">
          <div class="flex items-start gap-6">
            <div class="w-20 h-20 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-10 h-10 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-white mb-2">{{ currentAdmin?.username }}</h3>
              <p class="text-dark-300 mb-4">{{ currentAdmin?.email }}</p>
              <div class="flex flex-wrap gap-3">
                <span 
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                    currentAdmin?.role === 0
                      ? 'bg-purple-500/10 text-purple-400'
                      : 'bg-blue-500/10 text-blue-400'
                  ]"
                >
                  {{ currentAdmin?.role === 0 ? 'SuperAdmin' : 'Admin' }}
                </span>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-400">
                  Active
                </span>
              </div>
              <p class="text-dark-400 text-sm mt-4">
                Member since {{ formatDate(currentAdmin?.createdAt || '') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Change Password Card -->
        <div class="bg-dark-800 border border-dark-700 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Change Password</h3>
          <form @submit.prevent="handleChangePassword" class="space-y-4 max-w-md">
            <div>
              <label class="block text-dark-300 text-sm font-medium mb-2">Current Password</label>
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                required
                class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:border-brand focus:outline-none"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label class="block text-dark-300 text-sm font-medium mb-2">New Password</label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                required
                minlength="8"
                class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:border-brand focus:outline-none"
                placeholder="Enter new password (min 8 characters)"
              />
            </div>
            <div>
              <label class="block text-dark-300 text-sm font-medium mb-2">Confirm New Password</label>
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                required
                minlength="8"
                class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:border-brand focus:outline-none"
                placeholder="Confirm new password"
              />
            </div>
            <div v-if="passwordError" class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-center gap-2">
              <svg class="h-5 w-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-red-200 text-sm">{{ passwordError }}</span>
            </div>
            <div v-if="passwordSuccess" class="bg-green-900/30 border border-green-500/50 rounded-lg p-3 flex items-center gap-2">
              <svg class="h-5 w-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-green-200 text-sm">{{ passwordSuccess }}</span>
            </div>
            <button
              type="submit"
              :disabled="passwordLoading"
              class="bg-brand hover:bg-brand-600 text-dark-900 px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ passwordLoading ? 'Changing...' : 'Change Password' }}
            </button>
          </form>
        </div>
      </div>
    </main>

    <!-- Create Admin Modal (SuperAdmin Only) -->
    <div
      v-if="showCreateAdminModal"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      @click.self="showCreateAdminModal = false"
    >
      <div class="bg-dark-800 border border-dark-700 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-white">Create New Admin</h3>
          <button
            @click="showCreateAdminModal = false"
            class="text-dark-400 hover:text-white transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleCreateAdmin" class="p-6 space-y-4">
          <div>
            <label class="block text-dark-300 text-sm font-medium mb-2">Username</label>
            <input
              v-model="newAdminForm.username"
              type="text"
              required
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:border-brand focus:outline-none"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label class="block text-dark-300 text-sm font-medium mb-2">Email</label>
            <input
              v-model="newAdminForm.email"
              type="email"
              required
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:border-brand focus:outline-none"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label class="block text-dark-300 text-sm font-medium mb-2">Password</label>
            <input
              v-model="newAdminForm.password"
              type="password"
              required
              minlength="8"
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:border-brand focus:outline-none"
              placeholder="Enter password (min 8 characters)"
            />
          </div>
          
          <div v-if="createAdminError" class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-center gap-2">
            <svg class="h-5 w-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-red-200 text-sm">{{ createAdminError }}</span>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showCreateAdminModal = false"
              class="flex-1 bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="createAdminLoading"
              class="flex-1 bg-brand hover:bg-brand-600 text-dark-900 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ createAdminLoading ? 'Creating...' : 'Create Admin' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div 
      v-if="showCreateModal || showEditModal"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-dark-800 border border-dark-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">
            {{ showCreateModal ? 'Create New Post' : 'Edit Post' }}
          </h2>
          <button @click="closeModal" class="text-dark-400 hover:text-white transition-colors p-2 hover:bg-dark-700 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="savePost" class="p-6 space-y-6">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-dark-200 mb-2">Title</label>
            <input
              v-model="currentPost.title"
              type="text"
              required
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:border-brand focus:outline-none"
              placeholder="Enter post title"
            />
          </div>

          <!-- Slug -->
          <div>
            <label class="block text-sm font-medium text-dark-200 mb-2">Slug</label>
            <input
              v-model="currentPost.slug"
              type="text"
              required
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:border-brand focus:outline-none"
              placeholder="post-slug"
            />
          </div>

          <!-- Excerpt -->
          <div>
            <label class="block text-sm font-medium text-dark-200 mb-2">Excerpt</label>
            <textarea
              v-model="currentPost.excerpt"
              rows="3"
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:border-brand focus:outline-none resize-none"
              placeholder="Brief description of the post"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Category</label>
              <select
                v-model="currentPost.category"
                class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:border-brand focus:outline-none"
              >
                <option value="Technology">Technology</option>
                <option value="Web Development">Web Development</option>
                <option value="Programming">Programming</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Personal">Personal</option>
              </select>
            </div>

            <!-- Published Status -->
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Status</label>
              <select
                v-model="currentPost.published"
                class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:border-brand focus:outline-none"
              >
                <option :value="true">Published</option>
                <option :value="false">Draft</option>
              </select>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-sm font-medium text-dark-200 mb-2">Tags (comma separated)</label>
            <input
              v-model="tagsInput"
              type="text"
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:border-brand focus:outline-none"
              placeholder="vue, javascript, tutorial"
            />
          </div>

          <!-- Rich Text Editor -->
          <div>
            <label class="block text-sm font-medium text-dark-200 mb-2">Content</label>
            <div class="border border-dark-600 rounded-lg overflow-hidden">
              <!-- Editor Toolbar -->
              <div class="bg-dark-700 p-3 border-b border-dark-600 flex flex-wrap gap-2">
                <button
                  type="button"
                  @click="editor?.chain().focus().toggleBold().run()"
                  :class="{ 'bg-brand text-dark-900': editor?.isActive('bold') }"
                  class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors text-white"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  @click="editor?.chain().focus().toggleItalic().run()"
                  :class="{ 'bg-brand text-dark-900': editor?.isActive('italic') }"
                  class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors text-white"
                >
                  <em>I</em>
                </button>
                <button
                  type="button"
                  @click="editor?.chain().focus().toggleStrike().run()"
                  :class="{ 'bg-brand text-dark-900': editor?.isActive('strike') }"
                  class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors text-white"
                >
                  <s>S</s>
                </button>
                <button
                  type="button"
                  @click="editor?.chain().focus().toggleCode().run()"
                  :class="{ 'bg-brand text-dark-900': editor?.isActive('code') }"
                  class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors font-mono text-white"
                >
                  Code
                </button>
                <button
                  type="button"
                  @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
                  :class="{ 'bg-brand text-dark-900': editor?.isActive('heading', { level: 1 }) }"
                  class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors text-white"
                >
                  H1
                </button>
                <button
                  type="button"
                  @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
                  :class="{ 'bg-brand text-dark-900': editor?.isActive('heading', { level: 2 }) }"
                  class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors text-white"
                >
                  H2
                </button>
                <button
                  type="button"
                  @click="editor?.chain().focus().toggleBulletList().run()"
                  :class="{ 'bg-brand text-dark-900': editor?.isActive('bulletList') }"
                  class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors text-white"
                >
                  • List
                </button>
                <button
                  type="button"
                  @click="editor?.chain().focus().toggleOrderedList().run()"
                  :class="{ 'bg-brand text-dark-900': editor?.isActive('orderedList') }"
                  class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors text-white"
                >
                  1. List
                </button>
                <button
                  type="button"
                  @click="editor?.chain().focus().toggleCodeBlock().run()"
                  :class="{ 'bg-brand text-dark-900': editor?.isActive('codeBlock') }"
                  class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors text-white"
                >
                  Code Block
                </button>
                <button
                  type="button"
                  @click="editor?.chain().focus().toggleBlockquote().run()"
                  :class="{ 'bg-brand text-dark-900': editor?.isActive('blockquote') }"
                  class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors text-white"
                >
                  Quote
                </button>
              </div>
              
              <!-- Editor Content -->
              <EditorContent 
                :editor="editor" 
                class="prose prose-invert max-w-none p-4 min-h-[300px] bg-dark-800 text-white focus:outline-none"
              />
            </div>
          </div>

          <!-- Image URL -->
          <div>
            <label class="block text-sm font-medium text-dark-200 mb-2">Featured Image URL</label>
            <input
              v-model="currentPost.image"
              type="url"
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:border-brand focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4 border-t border-dark-700">
            <button
              type="submit"
              class="bg-brand hover:bg-brand-600 text-dark-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {{ showCreateModal ? 'Create Post' : 'Update Post' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="bg-dark-600 hover:bg-dark-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showDeleteModal = false"
    >
      <div class="bg-dark-800 border border-dark-700 rounded-2xl w-full max-w-md p-6">
        <div class="text-center">
          <div class="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Delete Post</h3>
          <p class="text-dark-300 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
          <div class="flex gap-3">
            <button
              @click="showDeleteModal = false"
              class="flex-1 bg-dark-600 hover:bg-dark-500 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Generate from Repo Modal -->
    <div 
      v-if="showGenerateModal"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showGenerateModal = false"
    >
      <div class="bg-dark-800 border border-dark-700 rounded-2xl w-full max-w-md p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white">Generate Post from GitHub</h3>
          <button @click="showGenerateModal = false" class="text-dark-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleGenerateFromRepo" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-dark-200 mb-2">
              Repository Name
            </label>
            <input
              v-model="repoName"
              type="text"
              required
              :disabled="isGenerating"
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:border-brand focus:outline-none disabled:opacity-50"
              placeholder="owner/repository"
            />
            <p class="text-dark-400 text-xs mt-2">
              Enter the GitHub repository in the format: owner/repo-name
            </p>
          </div>

          <div v-if="generateError" class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
            {{ generateError }}
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              @click="showGenerateModal = false"
              class="flex-1 bg-dark-600 hover:bg-dark-500 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isGenerating"
              class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg 
                v-if="isGenerating" 
                class="animate-spin h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isGenerating ? 'Generating...' : 'Generate' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Trigger Automation Modal -->
    <div 
      v-if="showAutomationModal"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showAutomationModal = false"
    >
      <div class="bg-dark-800 border border-dark-700 rounded-2xl w-full max-w-md p-6">
        <div class="text-center">
          <div class="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Trigger Automation</h3>
          <p class="text-dark-300 mb-6">This will manually trigger the blog automation process. Continue?</p>
          
          <div v-if="automationError" class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm mb-4">
            {{ automationError }}
          </div>
          
          <div v-if="automationSuccess" class="bg-green-900/30 border border-green-500/50 rounded-lg p-3 text-green-200 text-sm mb-4">
            {{ automationSuccess }}
          </div>

          <div class="flex gap-3">
            <button
              @click="showAutomationModal = false"
              class="flex-1 bg-dark-600 hover:bg-dark-500 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleTriggerAutomation"
              :disabled="isTriggering"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg 
                v-if="isTriggering" 
                class="animate-spin h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isTriggering ? 'Triggering...' : 'Trigger' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { TextAlign } from '@tiptap/extension-text-align'
import { blogApi, type BlogPost as ApiBlogPost, handleApiError } from '@/services/blogApi'
import { authApi, adminManagementApi, type AdminUser } from '@/services/authApi'

const router = useRouter()

// Local interface for form data
interface BlogPostForm {
  id?: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
  published: boolean;
}

// Reactive data
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showGenerateModal = ref(false)
const showAutomationModal = ref(false)
const showUserMenu = ref(false)
const postToDelete = ref<string | null>(null)
const blogPosts = ref<ApiBlogPost[]>([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const currentAdmin = ref<AdminUser | null>(null)

// Admin Management
const activeTab = ref('posts')
const adminList = ref<AdminUser[]>([])
const showCreateAdminModal = ref(false)
const createAdminLoading = ref(false)
const createAdminError = ref('')
const newAdminForm = reactive({
  username: '',
  email: '',
  password: ''
})

// Password Change
const passwordLoading = ref(false)
const passwordError = ref('')
const passwordSuccess = ref('')
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isSuperAdmin = computed(() => currentAdmin.value?.role === 0)

// Generate from repo
const repoName = ref('')
const isGenerating = ref(false)
const generateError = ref('')

// Automation trigger
const isTriggering = ref(false)
const automationError = ref('')
const automationSuccess = ref('')

const currentPost = reactive<BlogPostForm>({
  id: null,
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Technology',
  tags: [],
  image: '',
  readTime: 5,
  published: true
})

const tagsInput = ref('')

// Computed
const filteredPosts = computed(() => {
  if (!searchQuery.value) return blogPosts.value
  const query = searchQuery.value.toLowerCase()
  return blogPosts.value.filter(post => 
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query) ||
    post.category.toLowerCase().includes(query)
  )
})

const publishedCount = computed(() => 
  blogPosts.value.filter(post => post.published).length
)

const draftCount = computed(() => 
  blogPosts.value.filter(post => !post.published).length
)

const uniqueCategories = computed(() => 
  [...new Set(blogPosts.value.map(post => post.category))]
)

// Rich text editor
const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    TextStyle,
    Color,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
})

// Methods
const loadPosts = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await blogApi.getPosts({ limit: 100 })
    blogPosts.value = response.posts
  } catch (err) {
    error.value = handleApiError(err)
    console.error('Error loading posts:', err)
  } finally {
    loading.value = false
  }
}

const generateSlug = (title: string) => {
  return title.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

const savePost = async () => {
  try {
    // Get content from editor
    currentPost.content = editor.value?.getHTML() || ''
    
    // Process tags
    currentPost.tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
    
    // Generate slug if empty
    if (!currentPost.slug) {
      currentPost.slug = generateSlug(currentPost.title)
    }
    
    // Calculate read time (rough estimate)
    const wordCount = currentPost.content.replace(/<[^>]*>/g, '').split(' ').length
    currentPost.readTime = Math.max(1, Math.ceil(wordCount / 200))

    if (showCreateModal.value) {
      // Create new post
      const newPost = await blogApi.createPost({
        title: currentPost.title,
        slug: currentPost.slug,
        excerpt: currentPost.excerpt,
        content: currentPost.content,
        category: currentPost.category,
        tags: currentPost.tags,
        image: currentPost.image,
        readTime: currentPost.readTime,
        published: currentPost.published
      })
      blogPosts.value.unshift(newPost)
    } else if (currentPost.id) {
      // Update existing post
      const updatedPost = await blogApi.updatePost(currentPost.id, {
        title: currentPost.title,
        slug: currentPost.slug,
        excerpt: currentPost.excerpt,
        content: currentPost.content,
        category: currentPost.category,
        tags: currentPost.tags,
        image: currentPost.image,
        readTime: currentPost.readTime,
        published: currentPost.published
      })
      
      const index = blogPosts.value.findIndex(post => post.id === currentPost.id)
      if (index !== -1) {
        blogPosts.value[index] = updatedPost
      }
    }
    
    closeModal()
  } catch (err) {
    error.value = handleApiError(err)
    console.error('Error saving post:', err)
  }
}

const editPost = (post: ApiBlogPost) => {
  Object.assign(currentPost, {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: post.tags,
    image: post.image,
    readTime: post.readTime,
    published: post.published
  })
  tagsInput.value = post.tags.join(', ')
  editor.value?.commands.setContent(post.content)
  showEditModal.value = true
}

const deletePost = (id: string) => {
  postToDelete.value = id
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!postToDelete.value) return
  
  try {
    await blogApi.deletePost(postToDelete.value)
    blogPosts.value = blogPosts.value.filter(post => post.id !== postToDelete.value)
    showDeleteModal.value = false
    postToDelete.value = null
  } catch (err) {
    error.value = handleApiError(err)
    console.error('Error deleting post:', err)
  }
}

const viewPost = (slug: string) => {
  router.push(`/blog/${slug}`)
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  
  // Reset form
  Object.assign(currentPost, {
    id: null,
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    tags: [] as string[],
    image: '',
    readTime: 5,
    published: true
  })
  tagsInput.value = ''
  editor.value?.commands.setContent('')
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('adminUser')
  router.push('/blog/admin/login')
}

const handleGenerateFromRepo = async () => {
  if (!repoName.value.trim()) {
    generateError.value = 'Please enter a repository name'
    return
  }

  isGenerating.value = true
  generateError.value = ''

  try {
    const newPost = await blogApi.generatePostFromRepo(repoName.value.trim())
    blogPosts.value.unshift(newPost)
    showGenerateModal.value = false
    repoName.value = ''
    
    // Optionally open the edit modal for the generated post
    editPost(newPost)
  } catch (err) {
    generateError.value = handleApiError(err)
    console.error('Error generating post:', err)
  } finally {
    isGenerating.value = false
  }
}

const handleTriggerAutomation = async () => {
  isTriggering.value = true
  automationError.value = ''
  automationSuccess.value = ''

  try {
    const result = await blogApi.triggerAutomation()
    automationSuccess.value = result.message || 'Automation triggered successfully'
    
    // Reload posts after a delay
    setTimeout(() => {
      loadPosts()
      showAutomationModal.value = false
      automationSuccess.value = ''
    }, 2000)
  } catch (err) {
    automationError.value = handleApiError(err)
    console.error('Error triggering automation:', err)
  } finally {
    isTriggering.value = false
  }
}

// Admin Management Methods
const loadAdmins = async () => {
  if (!isSuperAdmin.value) return
  
  try {
    const response = await adminManagementApi.getAllAdmins()
    adminList.value = response.admins
  } catch (err) {
    console.error('Error loading admins:', err)
    error.value = handleApiError(err)
  }
}

const handleCreateAdmin = async () => {
  createAdminLoading.value = true
  createAdminError.value = ''
  
  try {
    await adminManagementApi.createAdmin({
      username: newAdminForm.username,
      email: newAdminForm.email,
      password: newAdminForm.password
    })
    
    showCreateAdminModal.value = false
    newAdminForm.username = ''
    newAdminForm.email = ''
    newAdminForm.password = ''
    
    // Reload admin list
    await loadAdmins()
  } catch (err) {
    createAdminError.value = handleApiError(err)
    console.error('Error creating admin:', err)
  } finally {
    createAdminLoading.value = false
  }
}

const handleRevokeAdmin = async (admin: AdminUser) => {
  if (!confirm(`Are you sure you want to revoke access for ${admin.username}?`)) {
    return
  }
  
  try {
    await adminManagementApi.revokeAdminAccess(admin.id)
    await loadAdmins()
  } catch (err) {
    error.value = handleApiError(err)
    console.error('Error revoking admin access:', err)
  }
}

const handleChangePassword = async () => {
  passwordError.value = ''
  passwordSuccess.value = ''
  
  // Validate passwords match
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordError.value = 'New passwords do not match'
    return
  }
  
  // Validate password length
  if (passwordForm.newPassword.length < 8) {
    passwordError.value = 'New password must be at least 8 characters long'
    return
  }
  
  passwordLoading.value = true
  
  try {
    await adminManagementApi.changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    })
    
    passwordSuccess.value = 'Password changed successfully! Please log in again.'
    
    // Reset form
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    
    // Log out after 2 seconds
    setTimeout(() => {
      handleLogout()
    }, 2000)
  } catch (err) {
    passwordError.value = handleApiError(err)
    console.error('Error changing password:', err)
  } finally {
    passwordLoading.value = false
  }
}

const loadAdminProfile = async () => {
  try {
    currentAdmin.value = authApi.getCurrentAdmin()
    if (isSuperAdmin.value) {
      await loadAdmins()
    }
  } catch (err) {
    console.error('Error loading admin profile:', err)
  }
}

// Lifecycle
onMounted(() => {
  loadPosts()
  loadAdminProfile()
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style>
.ProseMirror {
  outline: none;
  color: white;
}

.ProseMirror h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #10b981;
}

.ProseMirror h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: #10b981;
}

.ProseMirror p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.ProseMirror code {
  background-color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-family: 'Courier New', monospace;
}

.ProseMirror pre {
  background-color: #1f2937;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.ProseMirror pre code {
  background-color: transparent;
  padding: 0;
}

.ProseMirror blockquote {
  border-left: 4px solid #10b981;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
}

.ProseMirror ul, .ProseMirror ol {
  padding-left: 2rem;
  margin-bottom: 1rem;
}

.ProseMirror li {
  margin-bottom: 0.5rem;
}
</style>
