import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { authApi } from '../services/authApi';

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
      path: '/blog/admin',
      name: 'blog-admin',
      component: () => import('../components/blog/BlogAdmin.vue'),
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
    
    if (!isAuthenticated) {
      next('/admin/login');
      return;
    }

    try {
      // Verify token is still valid
      await authApi.verify();
      next();
    } catch (error) {
      // Token is invalid, redirect to login
      authApi.logout();
      next('/admin/login');
    }
  } else {
    next();
  }
});

export default router;
