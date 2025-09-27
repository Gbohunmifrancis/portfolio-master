import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// Create axios instance for auth API
const authApiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
authApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor to handle auth errors
authApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      // Redirect to login page if not already there
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  admin: {
    id: string
    username: string
    email: string
  }
}

export interface AdminUser {
  id: string
  username: string
  email: string
}

export const authApi = {
  // Admin login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await authApiClient.post('/login', credentials)
    return response.data
  },

  // Verify admin token
  verify: async (): Promise<{ valid: boolean; admin: AdminUser }> => {
    const response = await authApiClient.get('/verify')
    return response.data
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin/login'
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('adminToken')
  },

  // Get current admin user from localStorage
  getCurrentAdmin: (): AdminUser | null => {
    const adminData = localStorage.getItem('adminUser')
    return adminData ? JSON.parse(adminData) : null
  }
}