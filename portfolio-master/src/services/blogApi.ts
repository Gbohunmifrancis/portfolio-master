import axios from 'axios';

// Use environment variable or fallback to local development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  total: number;
}

// Blog API functions
export const blogApi = {
  // Get all posts with optional filters
  async getPosts(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<BlogPostsResponse> {
    const response = await api.get('/posts', { params });
    return response.data;
  },

  // Get single post by slug
  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await api.get(`/posts/${slug}`);
    return response.data;
  },

  // Create new post
  async createPost(post: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const response = await api.post('/posts', post);
    return response.data;
  },

  // Update post
  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
  },

  // Delete post
  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  },

  // Get categories
  async getCategories(): Promise<string[]> {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get featured posts
  async getFeaturedPosts(): Promise<BlogPost[]> {
    const response = await api.get('/posts/featured/list');
    return response.data;
  },
};

// Error handling helper
export const handleApiError = (error: any) => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  return error.message || 'An unexpected error occurred';
};