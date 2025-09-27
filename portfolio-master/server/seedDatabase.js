const mongoose = require('mongoose');
require('dotenv').config();

// Blog Post Schema (copy from server.js)
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    trim: true
  },
  readTime: {
    type: Number,
    required: true,
    min: 1
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Sample blog posts
const samplePosts = [
  {
    title: 'Getting Started with Vue 3 and TypeScript',
    slug: 'getting-started-vue3-typescript',
    excerpt: 'Learn how to set up a modern Vue 3 application with TypeScript, Vite, and best practices for scalable development.',
    content: `
      <h2>Introduction</h2>
      <p>Vue 3 with TypeScript provides excellent developer experience and type safety for building modern web applications.</p>
      
      <h3>Setting Up the Project</h3>
      <p>Start by creating a new Vue 3 project with Vite:</p>
      <pre><code>npm create vue@latest my-project -- --typescript</code></pre>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Better IDE support with autocomplete</li>
        <li>Compile-time error checking</li>
        <li>Improved code maintainability</li>
        <li>Enhanced refactoring capabilities</li>
      </ul>
      
      <p>This combination gives you a solid foundation for building scalable applications.</p>
    `,
    category: 'Web Development',
    tags: ['Vue', 'TypeScript', 'Vite', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    readTime: 8,
    published: true
  },
  {
    title: 'Building Responsive Layouts with Tailwind CSS',
    slug: 'responsive-layouts-tailwindcss',
    excerpt: 'Master the art of creating beautiful, responsive web layouts using Tailwind CSS utility classes and modern CSS techniques.',
    content: `
      <h2>Why Tailwind CSS?</h2>
      <p>Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup.</p>
      
      <h3>Responsive Design Made Easy</h3>
      <p>Tailwind's responsive prefixes make it simple to create mobile-first designs:</p>
      <pre><code>&lt;div class="w-full md:w-1/2 lg:w-1/3"&gt;
  Responsive content
&lt;/div&gt;</code></pre>
      
      <h3>Key Features</h3>
      <ul>
        <li>Utility-first approach</li>
        <li>Mobile-first responsive design</li>
        <li>Customizable design system</li>
        <li>Small production builds</li>
      </ul>
      
      <blockquote>
        <p>Tailwind CSS helps you build modern websites without leaving your HTML.</p>
      </blockquote>
    `,
    category: 'CSS',
    tags: ['Tailwind CSS', 'CSS', 'Responsive Design', 'Web Design'],
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop',
    readTime: 6,
    published: true
  },
  {
    title: 'Modern JavaScript ES6+ Features You Should Know',
    slug: 'modern-javascript-es6-features',
    excerpt: 'Explore the essential ES6+ features that every modern JavaScript developer should master, from arrow functions to async/await.',
    content: `
      <h2>Essential ES6+ Features</h2>
      <p>Modern JavaScript has evolved significantly. Here are the features you need to know:</p>
      
      <h3>1. Arrow Functions</h3>
      <pre><code>// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;</code></pre>
      
      <h3>2. Destructuring</h3>
      <pre><code>// Array destructuring
const [first, second] = array;

// Object destructuring
const { name, age } = person;</code></pre>
      
      <h3>3. Template Literals</h3>
      <pre><code>const message = \`Hello, \${name}! You are \${age} years old.\`;</code></pre>
      
      <h3>4. Async/Await</h3>
      <pre><code>async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}</code></pre>
      
      <p>These features make JavaScript more readable and maintainable.</p>
    `,
    category: 'JavaScript',
    tags: ['JavaScript', 'ES6', 'Programming', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
    readTime: 10,
    published: true
  },
  {
    title: 'State Management with Pinia in Vue 3',
    slug: 'state-management-pinia-vue3',
    excerpt: 'Learn how to effectively manage application state using Pinia, the official state management library for Vue 3.',
    content: `
      <h2>Introduction to Pinia</h2>
      <p>Pinia is the official state management library for Vue 3, designed to be simple, type-safe, and modular.</p>
      
      <h3>Creating a Store</h3>
      <pre><code>import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    isLoggedIn: false
  }),
  
  getters: {
    displayName: (state) => state.name || 'Guest'
  },
  
  actions: {
    login(email, password) {
      // Login logic
      this.isLoggedIn = true
    },
    
    logout() {
      this.isLoggedIn = false
      this.name = ''
      this.email = ''
    }
  }
})</code></pre>
      
      <h3>Using the Store in Components</h3>
      <pre><code>&lt;script setup&gt;
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

function handleLogin() {
  userStore.login(email.value, password.value)
}
&lt;/script&gt;</code></pre>
      
      <h3>Benefits of Pinia</h3>
      <ul>
        <li>TypeScript support out of the box</li>
        <li>Devtools integration</li>
        <li>Hot module replacement</li>
        <li>Server-side rendering support</li>
      </ul>
    `,
    category: 'Vue',
    tags: ['Vue', 'Pinia', 'State Management', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
    readTime: 12,
    published: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing posts (optional - remove if you want to keep existing data)
    console.log('Clearing existing blog posts...');
    await BlogPost.deleteMany({});

    // Insert sample posts
    console.log('Inserting sample blog posts...');
    const insertedPosts = await BlogPost.insertMany(samplePosts);
    console.log(`✅ Successfully inserted ${insertedPosts.length} blog posts!`);

    // Display inserted posts
    console.log('\n📝 Inserted Posts:');
    insertedPosts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}" (${post.category})`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Check your MongoDB Atlas credentials in the .env file');
    }
    
    if (error.message.includes('network')) {
      console.log('\n💡 Check your internet connection and MongoDB Atlas network access');
    }
    
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit();
  }
}

// Run the seeder
seedDatabase();