export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  readTime: number;
  featured: boolean;
  imageUrl?: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-vue-3',
    title: 'Getting Started with Vue 3: A Modern Developer\'s Guide',
    excerpt: 'Explore the latest features and improvements in Vue 3, including the Composition API, better TypeScript support, and performance enhancements.',
    content: `
# Getting Started with Vue 3: A Modern Developer's Guide

Vue 3 has revolutionized the way we build modern web applications. With its improved performance, better TypeScript support, and the powerful Composition API, it's never been a better time to dive into Vue development.

## What's New in Vue 3?

### Composition API
The Composition API provides a more flexible way to organize component logic. Instead of scattering related logic across different options, you can group it together:

\`\`\`javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubledCount = computed(() => count.value * 2)
    
    onMounted(() => {
      console.log('Component mounted!')
    })
    
    return {
      count,
      doubledCount
    }
  }
}
\`\`\`

### Better Performance
Vue 3 is significantly faster than Vue 2, with improvements in:
- Bundle size (tree-shakable)
- Runtime performance
- Memory usage

### Enhanced TypeScript Support
Vue 3 was written in TypeScript from the ground up, providing excellent IDE support and type safety.

## Getting Started

To create a new Vue 3 project:

\`\`\`bash
npm create vue@latest my-project
cd my-project
npm install
npm run dev
\`\`\`

## Conclusion

Vue 3 represents a significant step forward for the Vue ecosystem. Whether you're building a simple website or a complex application, Vue 3 provides the tools and performance you need to succeed.
    `,
    author: 'Francis Gbohunmi',
    publishedAt: '2024-01-15',
    tags: ['Vue', 'JavaScript', 'Frontend', 'Development'],
    category: 'Frontend Development',
    readTime: 5,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80'
  },
  {
    id: '2',
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Scale Applications',
    excerpt: 'Learn essential TypeScript patterns and practices that will help you build maintainable and scalable applications.',
    content: `
# TypeScript Best Practices for Large Scale Applications

TypeScript has become an essential tool for building robust JavaScript applications. Here are some best practices I've learned while working on large-scale projects.

## Type Safety First

Always prefer strict type checking:

\`\`\`typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true
  }
}
\`\`\`

## Use Interfaces and Types Effectively

Create clear interfaces for your data structures:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

type UserStatus = 'active' | 'inactive' | 'pending';
\`\`\`

## Generic Types for Reusability

Leverage generics for flexible, reusable code:

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  // Implementation
}
\`\`\`

## Conclusion

Following these practices will lead to more maintainable and bug-free TypeScript applications. The initial investment in proper typing pays dividends in the long run.
    `,
    author: 'Francis Gbohunmi',
    publishedAt: '2024-02-10',
    tags: ['TypeScript', 'JavaScript', 'Best Practices', 'Development'],
    category: 'Programming',
    readTime: 8,
    featured: true
  },
  {
    id: '3',
    slug: 'modern-css-techniques',
    title: 'Modern CSS Techniques Every Developer Should Know',
    excerpt: 'Discover advanced CSS techniques including Grid, Flexbox, Custom Properties, and modern layout methods.',
    content: `
# Modern CSS Techniques Every Developer Should Know

CSS has evolved tremendously in recent years. Let's explore some modern techniques that can transform your web development workflow.

## CSS Grid: The Layout Revolution

CSS Grid provides a powerful way to create complex layouts:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## Custom Properties (CSS Variables)

Create maintainable stylesheets with custom properties:

\`\`\`css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
}
\`\`\`

## Container Queries

Responsive design based on container size:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
\`\`\`

## Conclusion

These modern CSS techniques can significantly improve your development efficiency and create better user experiences. Start incorporating them into your projects today!
    `,
    author: 'Francis Gbohunmi',
    publishedAt: '2024-03-05',
    tags: ['CSS', 'Frontend', 'Web Development', 'Layout'],
    category: 'Frontend Development',
    readTime: 6,
    featured: false
  },
  {
    id: '4',
    slug: 'full-stack-development-journey',
    title: 'My Journey as a Full-Stack Developer: Lessons Learned',
    excerpt: 'Reflections on my path from frontend to full-stack development, including challenges, victories, and key insights.',
    content: `
# My Journey as a Full-Stack Developer: Lessons Learned

Starting as a frontend developer and evolving into full-stack development has been an incredible journey. Here are the key lessons I've learned along the way.

## The Frontend Foundation

My journey began with HTML, CSS, and JavaScript. These fundamentals remain crucial:

- **HTML**: Semantic markup matters
- **CSS**: Understanding the cascade and specificity
- **JavaScript**: ES6+ features and async programming

## Expanding to Backend

Learning backend development opened new possibilities:

### Node.js and Express
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api/users', async (req, res) => {
  const users = await getUsersFromDatabase();
  res.json(users);
});
\`\`\`

### Database Management
Understanding both SQL and NoSQL databases:
- PostgreSQL for relational data
- MongoDB for flexible schemas

## DevOps and Deployment

Learning deployment and server management:
- Docker for containerization
- CI/CD pipelines
- Cloud services (AWS, Vercel, Netlify)

## Key Lessons

1. **Start with fundamentals** - Don't rush to frameworks
2. **Build projects** - Theory only goes so far
3. **Learn continuously** - Technology evolves rapidly
4. **Focus on problem-solving** - Tools are just means to an end

## Conclusion

The full-stack journey is challenging but rewarding. Each technology you learn makes you a more versatile developer. Keep building, keep learning, and don't be afraid to step out of your comfort zone.
    `,
    author: 'Francis Gbohunmi',
    publishedAt: '2024-04-12',
    tags: ['Career', 'Full-Stack', 'Web Development', 'Personal'],
    category: 'Career',
    readTime: 7,
    featured: false
  }
];

export const blogCategories = [
  'All',
  'Frontend Development',
  'Programming', 
  'Career',
  'Backend Development',
  'DevOps'
];

export const getAllPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'All') return getAllPosts();
  return blogPosts.filter(post => post.category === category);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery)
  );
};