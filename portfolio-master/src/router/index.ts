import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { authApi } from '../services/authApi';

// Extend Vue Router meta type
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    requiresSuperAdmin?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/blog/admin/login',
      name: 'blog-admin-login',
      component: () => import('../views/BlogAdminLoginView.vue'),
    },
    {
      path: '/blog/admin',
      name: 'blog-admin',
      component: () => import('../views/BlogAdminView.vue'),
      meta: { requiresAuth: true, requiresSuperAdmin: true }
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: () => import('../views/BlogPostView.vue'),
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/AdminLoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true }
    },
  ],
});

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = authApi.isAuthenticated();
    
    // Determine the appropriate login redirect based on route
    const loginRedirect = to.path.startsWith('/blog/admin') 
      ? '/blog/admin/login' 
      : '/admin/login';
    
    if (!isAuthenticated) {
      // Clear any existing auth data
      authApi.logout();
      next(loginRedirect);
      return;
    }

    try {
      // Verify token is still valid
      const verifyResponse = await authApi.verify();
      
      // Check if route requires SuperAdmin access
      if (to.meta.requiresSuperAdmin) {
        const currentAdmin = authApi.getCurrentAdmin();
        
        if (!currentAdmin || currentAdmin.role !== 0) {
          // Not a SuperAdmin, logout and redirect
          authApi.logout();
          alert('Access denied. Only SuperAdmins can access this area.');
          next(loginRedirect);
          return;
        }
      }
      
      next();
    } catch (error) {
      // Token is invalid, redirect to login
      authApi.logout();
      next(loginRedirect);
    }
  } else {
    next();
  }
});

export default router;
