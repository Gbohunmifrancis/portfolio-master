<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-small">
    <!-- Header -->
    <div class="mb-medium text-center">
      <h1 class="text-medium font-bold text-brand">Blog Admin</h1>
      <p class="mt-2 text-normal text-dark-200">
        Sign in to manage your blog posts
      </p>
    </div>

    <!-- Login Card -->
    <div class="w-full max-w-md rounded-lg border border-brand-800 bg-dark-800 p-small">
      <form @submit.prevent="handleLogin" class="flex flex-col gap-small">
        <!-- Username Field -->
        <div>
          <label for="username" class="mb-2 block text-normal-lite text-dark-100">
            Username
          </label>
          <input
            id="username"
            v-model="credentials.username"
            type="text"
            required
            :disabled="isLoading"
            class="w-full rounded-md border border-dark-600 bg-dark-700 px-4 py-3 text-white placeholder-dark-300 focus:border-brand focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your username"
          />
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="mb-2 block text-normal-lite text-dark-100">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="credentials.password"
              :type="showPassword ? 'text' : 'password'"
              required
              :disabled="isLoading"
              class="w-full rounded-md border border-dark-600 bg-dark-700 px-4 py-3 pr-12 text-white placeholder-dark-300 focus:border-brand focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-dark-300 hover:text-brand"
            >
              <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <div 
          v-if="errorMessage" 
          class="rounded-md border border-red-500/50 bg-red-900/20 p-3 text-center text-normal-lite text-red-300"
        >
          {{ errorMessage }}
        </div>

        <!-- Submit Button -->
        <div class="h-medium rounded-md bg-brand-700 text-small-lite text-brand-50 hover:bg-brand-100 hover:text-dark-900">
          <button
            type="submit"
            :disabled="isLoading"
            class="flex h-full w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span v-if="isLoading" class="flex items-center gap-2">
              <svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Back to Blog Link -->
    <div class="mt-small">
      <router-link 
        to="/blog" 
        class="flex items-center gap-2 text-normal-lite text-dark-300 hover:text-brand"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Blog
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/services/authApi'

const router = useRouter()

const credentials = ref({
  username: '',
  password: ''
})

const isLoading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  if (!credentials.value.username || !credentials.value.password) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await authApi.login(credentials.value)
    
    // Store token in localStorage using authApi helper
    authApi.storeAuthData(response.token, response.admin)
    
    // Redirect to blog admin panel
    router.push('/blog/admin')
  } catch (error: any) {
    console.error('Login error:', error)
    errorMessage.value = error.response?.data?.error || 'Login failed. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}
</script>

