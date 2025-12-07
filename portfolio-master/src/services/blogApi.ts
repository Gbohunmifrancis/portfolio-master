import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-prod-app-2607870261a7.herokuapp.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('adminUser');
      if (window.location.pathname.startsWith('/admin') && 
          window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============================================================================
// BLOG POST INTERFACES (Matches OpenAPI PostsResponse schema)
// ============================================================================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;        // HTML content from TipTap editor
  category: string;
  tags: string[];
  image: string;          // Featured image URL
  readTime: number;       // Estimated read time in minutes
  published: boolean;
  createdAt: string;      // ISO date string
  updatedAt: string;      // ISO date string
}

// PostsResponse from OpenAPI spec - pagination fields at root level
export interface BlogPostsResponse {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  total: number;
}

// Alias for backwards compatibility
export type LegacyBlogPostsResponse = BlogPostsResponse;

export interface BlogPostCreateRequest {
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

export interface BlogPostUpdateRequest {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string[];
  image?: string;
  readTime?: number;
  published?: boolean;
}

export interface GenerateFromRepoRequest {
  repoName: string;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export interface ApiError {
  error: string;
  details?: string | null;
}

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data as ApiError;
      return data?.error || 
             `Server error: ${error.response.status}`;
    } else if (error.request) {
      return 'Unable to connect to server. Please check if the API is running.';
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// ============================================================================
// HELPER FUNCTION - Normalize API response
// ============================================================================

const normalizePostsResponse = (response: any): BlogPostsResponse => {
  // Handle direct posts array (fallback)
  if (Array.isArray(response)) {
    return {
      posts: response,
      totalPages: 1,
      currentPage: 1,
      total: response.length,
    };
  }
  
  // Standard PostsResponse format from API
  return {
    posts: response.posts || [],
    totalPages: response.totalPages || 1,
    currentPage: response.currentPage || 1,
    total: response.total || response.posts?.length || 0,
  };
};

// ============================================================================
// BLOG API FUNCTIONS
// ============================================================================

export const blogApi = {
  /**
   * Get all published blog posts with optional filtering and pagination
   * 
   * GET /api/posts
   * Query params: category, search, tag, page, limit
   */
  async getPosts(params?: {
    category?: string;
    search?: string;
    tag?: string;
    page?: number;
    limit?: number;
  }): Promise<LegacyBlogPostsResponse> {
    const response = await api.get<BlogPostsResponse>('/api/posts', { params });
    return normalizePostsResponse(response.data);
  },

  /**
   * Get a single blog post by its URL slug
   * 
   * GET /api/posts/{slug}
   */
  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await api.get<BlogPost>(`/api/posts/${slug}`);
    return response.data;
  },

  /**
   * Get list of all unique categories
   * 
   * GET /api/posts/categories
   */
  async getCategories(): Promise<string[]> {
    const response = await api.get<string[]>('/api/posts/categories');
    return response.data;
  },

  /**
   * Get list of all unique tags
   * 
   * GET /api/posts/tags
   */
  async getTags(): Promise<string[]> {
    const response = await api.get<string[]>('/api/posts/tags');
    return response.data;
  },

  // ==========================================================================
  // ADMIN ENDPOINTS (Require Authentication)
  // ==========================================================================

  /**
   * Create a new blog post
   * 
   * POST /api/posts
   * Requires: Bearer token
   */
  async createPost(post: BlogPostCreateRequest): Promise<BlogPost> {
    const response = await api.post<BlogPost>('/api/posts', post);
    return response.data;
  },

  /**
   * Update an existing blog post
   * 
   * PUT /api/posts/{id}
   * Requires: Bearer token
   */
  async updatePost(id: string, post: BlogPostUpdateRequest): Promise<BlogPost> {
    const response = await api.put<BlogPost>(`/api/posts/${id}`, post);
    return response.data;
  },

  /**
   * Delete a blog post
   * 
   * DELETE /api/posts/{id}
   * Requires: Bearer token
   */
  async deletePost(id: string): Promise<void> {
    await api.delete(`/api/posts/${id}`);
  },

  /**
   * Get all posts (including drafts) for admin panel
   * 
   * GET /api/admin/posts
   * Requires: Bearer token
   * Query params: page, limit
   */
  async getAdminPosts(params?: {
    page?: number;
    limit?: number;
  }): Promise<LegacyBlogPostsResponse> {
    const response = await api.get<BlogPostsResponse>('/api/admin/posts', { params });
    return normalizePostsResponse(response.data);
  },

  /**
   * Generate a blog post from a GitHub repository
   * 
   * POST /api/admin/generate-from-repo
   * Requires: Bearer token
   */
  async generatePostFromRepo(repoName: string): Promise<BlogPost> {
    const response = await api.post<BlogPost>('/api/admin/generate-from-repo', { repoName });
    return response.data;
  },

  /**
   * Trigger the automation manually
   * 
   * POST /api/admin/trigger-automation
   * Requires: Bearer token
   */
  async triggerAutomation(): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/api/admin/trigger-automation');
    return response.data;
  },
};

export default blogApi;
