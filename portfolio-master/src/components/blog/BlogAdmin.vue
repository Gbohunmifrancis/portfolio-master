<template>
  <div class="min-h-screen bg-dark-900 text-white p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-brand">Blog Administration</h1>
        <button
          @click="showCreateModal = true"
          class="bg-brand hover:bg-brand-600 text-dark-900 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Create New Post
        </button>
      </div>

      <!-- Posts List -->
      <div class="bg-dark-800 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Manage Posts</h2>
        <div class="space-y-4">
          <div 
            v-for="post in blogPosts" 
            :key="post.id"
            class="bg-dark-700 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 class="font-semibold text-lg">{{ post.title }}</h3>
              <p class="text-dark-200 text-sm">{{ post.excerpt }}</p>
              <p class="text-brand text-xs mt-1">{{ formatDate(post.createdAt || '') }}</p>
            </div>
            <div class="flex gap-2">
              <button
                @click="editPost(post)"
                class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm transition-colors"
              >
                Edit
              </button>
              <button
                @click="deletePost(post.id)"
                class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <div 
        v-if="showCreateModal || showEditModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div class="bg-dark-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">
                {{ showCreateModal ? 'Create New Post' : 'Edit Post' }}
              </h2>
              <button @click="closeModal" class="text-dark-200 hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form @submit.prevent="savePost" class="space-y-6">
              <!-- Title -->
              <div>
                <label class="block text-sm font-medium mb-2">Title</label>
                <input
                  v-model="currentPost.title"
                  type="text"
                  required
                  class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:border-brand focus:outline-none"
                  placeholder="Enter post title"
                />
              </div>

              <!-- Slug -->
              <div>
                <label class="block text-sm font-medium mb-2">Slug</label>
                <input
                  v-model="currentPost.slug"
                  type="text"
                  required
                  class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:border-brand focus:outline-none"
                  placeholder="post-slug"
                />
              </div>

              <!-- Excerpt -->
              <div>
                <label class="block text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  v-model="currentPost.excerpt"
                  rows="3"
                  class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:border-brand focus:outline-none resize-none"
                  placeholder="Brief description of the post"
                ></textarea>
              </div>

              <!-- Category -->
              <div>
                <label class="block text-sm font-medium mb-2">Category</label>
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

              <!-- Tags -->
              <div>
                <label class="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  v-model="tagsInput"
                  type="text"
                  class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:border-brand focus:outline-none"
                  placeholder="vue, javascript, tutorial"
                />
              </div>

              <!-- Rich Text Editor -->
              <div>
                <label class="block text-sm font-medium mb-2">Content</label>
                <div class="border border-dark-600 rounded-lg overflow-hidden">
                  <!-- Editor Toolbar -->
                  <div class="bg-dark-700 p-3 border-b border-dark-600 flex flex-wrap gap-2">
                    <button
                      type="button"
                      @click="editor.chain().focus().toggleBold().run()"
                      :class="{ 'bg-brand text-dark-900': editor.isActive('bold') }"
                      class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors"
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      @click="editor.chain().focus().toggleItalic().run()"
                      :class="{ 'bg-brand text-dark-900': editor.isActive('italic') }"
                      class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors"
                    >
                      <em>I</em>
                    </button>
                    <button
                      type="button"
                      @click="editor.chain().focus().toggleStrike().run()"
                      :class="{ 'bg-brand text-dark-900': editor.isActive('strike') }"
                      class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors"
                    >
                      <s>S</s>
                    </button>
                    <button
                      type="button"
                      @click="editor.chain().focus().toggleCode().run()"
                      :class="{ 'bg-brand text-dark-900': editor.isActive('code') }"
                      class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors font-mono"
                    >
                      Code
                    </button>
                    <button
                      type="button"
                      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                      :class="{ 'bg-brand text-dark-900': editor.isActive('heading', { level: 1 }) }"
                      class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors"
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                      :class="{ 'bg-brand text-dark-900': editor.isActive('heading', { level: 2 }) }"
                      class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      @click="editor.chain().focus().toggleBulletList().run()"
                      :class="{ 'bg-brand text-dark-900': editor.isActive('bulletList') }"
                      class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors"
                    >
                      • List
                    </button>
                    <button
                      type="button"
                      @click="editor.chain().focus().toggleOrderedList().run()"
                      :class="{ 'bg-brand text-dark-900': editor.isActive('orderedList') }"
                      class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors"
                    >
                      1. List
                    </button>
                    <button
                      type="button"
                      @click="editor.chain().focus().toggleCodeBlock().run()"
                      :class="{ 'bg-brand text-dark-900': editor.isActive('codeBlock') }"
                      class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors"
                    >
                      Code Block
                    </button>
                    <button
                      type="button"
                      @click="editor.chain().focus().toggleBlockquote().run()"
                      :class="{ 'bg-brand text-dark-900': editor.isActive('blockquote') }"
                      class="px-3 py-1 rounded text-sm hover:bg-dark-600 transition-colors"
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
                <label class="block text-sm font-medium mb-2">Featured Image URL</label>
                <input
                  v-model="currentPost.image"
                  type="url"
                  class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:border-brand focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <!-- Actions -->
              <div class="flex gap-4 pt-4">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { TextAlign } from '@tiptap/extension-text-align'
import { blogApi, type BlogPost as ApiBlogPost, handleApiError } from '@/services/blogApi'

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
const blogPosts = ref<ApiBlogPost[]>([])
const loading = ref(true)
const error = ref('')
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

const deletePost = async (id: string) => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await blogApi.deletePost(id)
      blogPosts.value = blogPosts.value.filter(post => post.id !== id)
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error deleting post:', err)
    }
  }
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
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Lifecycle
onMounted(() => {
  loadPosts()
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