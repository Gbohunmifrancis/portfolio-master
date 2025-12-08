import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-prod-app-2607870261a7.herokuapp.com';

const authApiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin management client
const adminManagementClient = axios.create({
  baseURL: `${API_BASE_URL}/api/admin-management`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
const addAuthToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

authApiClient.interceptors.request.use(addAuthToken);
adminManagementClient.interceptors.request.use(addAuthToken);

// Handle auth errors globally
const handleAuthError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    // Redirect to appropriate login page based on current path
    const isBlogAdmin = window.location.pathname.startsWith('/blog/admin');
    const loginPath = isBlogAdmin ? '/blog/admin/login' : '/admin/login';
    if (window.location.pathname !== loginPath) {
      window.location.href = loginPath;
    }
  }
  return Promise.reject(error);
};

authApiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  handleAuthError
);

adminManagementClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  handleAuthError
);

// ============================================================================
// AUTH INTERFACES
// ============================================================================

export interface LoginCredentials {
  username: string;  // Can be username or email
  password: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: number;      // 0 = SuperAdmin, 1 = Admin
  createdAt: string;
  isActive: boolean;
}

export interface LoginResponse {
  token: string;
  admin: AdminUser;
}

export interface VerifyResponse {
  valid: boolean;
  admin?: AdminUser;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface CreateAdminRequest {
  username: string;
  email: string;
  password: string;
}

export interface RevokeAdminRequest {
  adminId: string;
}

export interface AdminListResponse {
  admins: AdminUser[];
  total: number;
}

// ============================================================================
// AUTH API FUNCTIONS
// ============================================================================

export const authApi = {
  /**
   * Admin login
   * 
   * POST /api/auth/login
   * Body: { username: string, password: string }
   * Response: { token: string, admin: AdminUser }
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await authApiClient.post<LoginResponse>('/login', credentials);
    return response.data;
  },

  /**
   * Verify current token is valid
   * 
   * GET /api/auth/verify
   * Requires: Bearer token
   * Response: { valid: boolean, admin: AdminUser }
   */
  verify: async (): Promise<VerifyResponse> => {
    const response = await authApiClient.get<VerifyResponse>('/verify');
    return response.data;
  },

  /**
   * Logout (client-side only - clears local storage)
   */
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
  },

  /**
   * Logout and redirect to specific login page
   */
  logoutAndRedirect: (loginPath: string = '/admin/login'): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    window.location.href = loginPath;
  },

  /**
   * Check if user has a token stored (doesn't verify validity)
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get current admin user from localStorage
   */
  getCurrentAdmin: (): AdminUser | null => {
    const adminData = localStorage.getItem('adminUser');
    return adminData ? JSON.parse(adminData) : null;
  },

  /**
   * Store auth data after successful login
   */
  storeAuthData: (token: string, admin: AdminUser): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('adminUser', JSON.stringify(admin));
  },
};

// ============================================================================
// ADMIN MANAGEMENT API FUNCTIONS
// ============================================================================

export const adminManagementApi = {
  /**
   * Get admin profile
   * 
   * GET /api/admin-management/profile
   * Requires: Bearer token
   */
  getProfile: async (): Promise<AdminUser> => {
    const response = await adminManagementClient.get<AdminUser>('/profile');
    return response.data;
  },

  /**
   * Change password
   * 
   * POST /api/admin-management/change-password
   * Requires: Bearer token
   */
  changePassword: async (request: ChangePasswordRequest): Promise<{ message: string }> => {
    const response = await adminManagementClient.post<{ message: string }>('/change-password', request);
    return response.data;
  },

  /**
   * Create new admin (SuperAdmin only)
   * 
   * POST /api/admin-management/create-admin
   * Requires: Bearer token (SuperAdmin)
   */
  createAdmin: async (request: CreateAdminRequest): Promise<AdminUser> => {
    const response = await adminManagementClient.post<AdminUser>('/create-admin', request);
    return response.data;
  },

  /**
   * List all admins (SuperAdmin only)
   * 
   * GET /api/admin-management/admins
   * Requires: Bearer token (SuperAdmin)
   */
  getAllAdmins: async (): Promise<AdminListResponse> => {
    const response = await adminManagementClient.get<AdminListResponse>('/admins');
    return response.data;
  },

  /**
   * Revoke admin access (SuperAdmin only)
   * 
   * POST /api/admin-management/revoke-access
   * Requires: Bearer token (SuperAdmin)
   */
  revokeAdminAccess: async (adminId: string): Promise<{ message: string }> => {
    const response = await adminManagementClient.post<{ message: string }>('/revoke-access', { adminId });
    return response.data;
  },
};

export default authApi;
