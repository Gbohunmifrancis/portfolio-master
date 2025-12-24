<template>
  <div class="w-full px-4 py-8" v-if="post">
    <!-- Back Button -->
    <div class="mb-small max-w-4xl mx-auto">
      <button
        @click="goBack"
        class="flex items-center gap-2 text-brand-700 hover:text-brand"
      >
        <BsArrowLeft class="h-4 w-4" />
        Back to Blog
      </button>
    </div>

    <!-- Article Header -->
    <article class="mx-auto max-w-4xl">
      <!-- Featured Image -->
      <div 
        v-if="post.image" 
        class="mb-medium h-64 w-full overflow-hidden rounded-lg md:h-96"
      >
        <img 
          :src="post.image" 
          :alt="post.title"
          class="h-full w-full object-cover"
        />
      </div>

      <!-- Article Meta -->
      <div class="mb-8">
        <div class="mb-4 flex flex-wrap items-center gap-3">
          <span class="rounded-md bg-dark-800 px-3 py-1.5 text-xs font-medium text-brand uppercase tracking-wider">
            {{ post.category }}
          </span>
          <div class="flex items-center gap-3 text-sm text-gray-400">
            <div class="flex items-center gap-1.5">
              <BsCalendar class="h-3.5 w-3.5" />
              <span>{{ formattedDate }}</span>
            </div>
            <span class="text-gray-600">•</span>
            <div class="flex items-center gap-1.5">
              <BsClock class="h-3.5 w-3.5" />
              <span>{{ post.readTime }} min read</span>
            </div>
          </div>
        </div>
        
        <h1 class="mb-0 text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
          {{ post.title }}
        </h1>
      </div>

      <!-- Author Info -->
      <div class="mb-8 pb-8 border-b border-dark-700">
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <div class="flex items-center gap-2">
            <BsPerson class="h-4 w-4" />
            <span>{{ post.authorUsername || 'Admin' }}</span>
          </div>
        </div>
      </div>

      <!-- Article Content -->
      <div 
        class="blog-content prose prose-lg max-w-none prose-invert"
        v-html="formattedContent"
      ></div>

      <!-- Tags -->
      <div class="mt-medium border-t border-dark-700 pt-small">
        <h3 class="mb-4 text-normal text-white">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in post.tags"
            :key="tag"
            @click="searchByTag(tag)"
            class="rounded-lg border border-dark-600 px-3 py-2 text-sm text-brand-700 hover:border-brand-700 hover:text-brand"
          >
            # {{ tag }}
          </button>
        </div>
      </div>

      <!-- Share Section -->
      <div class="mt-medium border-t border-dark-700 pt-small">
        <h3 class="mb-4 text-normal text-white">Share this post</h3>
        <div class="flex gap-4">
          <button
            @click="shareOnTwitter"
            class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <BsTwitter class="h-4 w-4" />
            Twitter
          </button>
          <button
            @click="shareOnLinkedIn"
            class="flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2 text-white hover:bg-blue-900"
          >
            <BsLinkedin class="h-4 w-4" />
            LinkedIn
          </button>
          <button
            @click="copyLink"
            class="flex items-center gap-2 rounded-lg bg-dark-700 px-4 py-2 text-white hover:bg-dark-600"
          >
            <BsLink class="h-4 w-4" />
            Copy Link
          </button>
        </div>
        <div v-if="linkCopied" class="mt-2 text-sm text-brand">
          Link copied to clipboard!
        </div>
      </div>

      <!-- Related Posts -->
      <div v-if="relatedPosts.length > 0" class="mt-medium border-t border-dark-700 pt-small">
        <h3 class="mb-small text-normal text-white">Related Posts</h3>
        <div class="grid gap-small md:grid-cols-2">
          <BlogCard
            v-for="relatedPost in relatedPosts"
            :key="relatedPost.id"
            :post="relatedPost"
            @click="navigateToPost(relatedPost.slug)"
          />
        </div>
      </div>
    </article>
  </div>

  <!-- Loading State -->
  <div v-else-if="loading" class="flex items-center justify-center py-medium">
    <div class="text-center">
      <div class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent"></div>
      <p class="text-dark-300">Loading post...</p>
    </div>
  </div>

  <!-- Not Found State -->
  <div v-else class="flex items-center justify-center py-medium">
    <div class="text-center">
      <h2 class="mb-4 text-normal text-white">Post not found</h2>
      <p class="mb-4 text-dark-300">The blog post you're looking for doesn't exist.</p>
      <button
        @click="goBack"
        class="rounded-lg bg-brand px-6 py-2 text-dark-900 hover:bg-brand-400"
      >
        Back to Blog
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { marked } from 'marked';
import BlogCard from '@/components/blog/BlogCard.vue';
import { 
  BsArrowLeft, 
  BsPerson, 
  BsCalendar, 
  BsClock, 
  BsTwitter, 
  BsLinkedin, 
  BsLink 
} from '@kalimahapps/vue-icons/bs';
import { blogApi, type BlogPost, handleApiError } from '@/services/blogApi';

const route = useRoute();
const router = useRouter();

const post = ref<BlogPost | null>(null);
const loading = ref(true);
const linkCopied = ref(false);
const error = ref('');

const formattedDate = computed(() => {
  if (!post.value) return '';
  const dateToUse = post.value.createdAt || new Date().toISOString();
  return new Date(dateToUse).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const formattedContent = computed(() => {
  if (!post.value) return '';
  // Return the HTML content directly since TipTap saves as HTML
  return post.value.content;
});

const relatedPosts = ref<BlogPost[]>([]);

const loadRelatedPosts = async () => {
  if (!post.value) return;
  
  try {
    const response = await blogApi.getPosts({
      category: post.value.category,
      limit: 4
    });
    
    // Filter out the current post
    relatedPosts.value = response.posts.filter(p => 
      p.id !== post.value!.id && p.slug !== post.value!.slug
    ).slice(0, 3);
  } catch (err) {
    console.error('Error loading related posts:', err);
  }
};

const goBack = () => {
  router.push('/blog');
};

const navigateToPost = (slug: string) => {
  router.push(`/blog/${slug}`);
};

const searchByTag = (tag: string) => {
  router.push(`/blog?tag=${encodeURIComponent(tag)}`);
};

const shareOnTwitter = () => {
  if (!post.value) return;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Check out this blog post: ${post.value.title}`);
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
};

const shareOnLinkedIn = () => {
  if (!post.value) return;
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    linkCopied.value = true;
    setTimeout(() => {
      linkCopied.value = false;
    }, 3000);
  } catch (err) {
    console.error('Failed to copy link:', err);
  }
};

onMounted(async () => {
  const slug = route.params.slug as string;
  
  try {
    loading.value = true;
    error.value = '';
    
    // Load post from API
    post.value = await blogApi.getPostBySlug(slug);
    
    // Load related posts
    await loadRelatedPosts();
    
    // Update page title
    if (post.value) {
      document.title = `${post.value.title} | Francis Gbohunmi`;
    }
  } catch (err) {
    error.value = handleApiError(err);
    console.error('Error loading post:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Custom prose styles for dark theme */
.blog-content {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

:deep(.prose) {
  color: #d1d5db;
  font-size: 1.0625rem;
  line-height: 1.75;
  font-weight: 400;
}

:deep(.prose p) {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  line-height: 1.75;
  letter-spacing: 0.012em;
  color: #d1d5db;
  font-size: 1.0625rem;
}

:deep(.prose h1),
:deep(.prose h2), 
:deep(.prose h3),
:deep(.prose h4),
:deep(.prose h5),
:deep(.prose h6) {
  color: #ffffff;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.02em;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

:deep(.prose h1) {
  font-size: 2.25rem;
  font-weight: 700;
}

:deep(.prose h2) {
  font-size: 1.875rem;
  font-weight: 700;
  padding-top: 1rem;
  border-top: 1px solid #2d2d2d;
}

:deep(.prose h3) {
  font-size: 1.5rem;
  font-weight: 600;
}

:deep(.prose code) {
  background-color: rgba(110, 118, 129, 0.15);
  color: #e96ba8;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-weight: 400;
}

:deep(.prose pre) {
  background-color: #1a1a1a;
  border: 1px solid #404040;
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin: 1.5rem 0;
  overflow-x: auto;
}

:deep(.prose pre code) {
  background-color: transparent;
  color: #e5e5e5;
  padding: 0;
}

:deep(.prose blockquote) {
  border-left: 4px solid #00e2dc;
  background-color: #1a1a1a;
  margin: 1.5rem 0;
  padding: 1.25rem;
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
}

:deep(.prose a) {
  color: #00e2dc;
  text-decoration: underline;
  text-underline-offset: 2px;
}

:deep(.prose a:hover) {
  color: #04fff7;
}

:deep(.prose ul),
:deep(.prose ol) {
  color: #e5e5e5;
  margin: 1.5rem 0;
  padding-left: 1.75rem;
}

:deep(.prose li) {
  margin: 0.75rem 0;
  line-height: 1.75;
}

:deep(.prose strong) {
  color: #ffffff;
  font-weight: 600;
}

:deep(.prose em) {
  color: #d1d5db;
  font-style: italic;
}

:deep(.prose img) {
  border-radius: 0.5rem;
  margin: 2rem 0;
}

:deep(.prose hr) {
  border-color: #2d2d2d;
  margin: 2.5rem 0;
}

/* First paragraph styling */
:deep(.prose > p:first-of-type) {
  font-size: 1.125rem;
  color: #e5e7eb;
  margin-top: 0;
}
</style>