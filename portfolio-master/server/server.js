const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio Blog API',
      version: '1.0.0',
      description: 'API for managing blog posts in the portfolio website',
      contact: {
        name: 'Francis Gbohunmi',
        email: 'francisgbohunmi@gmail.com'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-api-domain.com' 
          : `http://localhost:${PORT}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      schemas: {
        BlogPost: {
          type: 'object',
          required: ['title', 'slug', 'excerpt', 'content', 'category'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ObjectId'
            },
            title: {
              type: 'string',
              description: 'Title of the blog post'
            },
            slug: {
              type: 'string',
              description: 'URL-friendly version of the title'
            },
            excerpt: {
              type: 'string',
              description: 'Brief summary of the post'
            },
            content: {
              type: 'string',
              description: 'Full HTML content of the post'
            },
            category: {
              type: 'string',
              description: 'Category of the blog post'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Array of tags associated with the post'
            },
            image: {
              type: 'string',
              description: 'URL of the featured image'
            },
            readTime: {
              type: 'number',
              description: 'Estimated reading time in minutes'
            },
            published: {
              type: 'boolean',
              description: 'Whether the post is published'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        BlogPostsResponse: {
          type: 'object',
          properties: {
            posts: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/BlogPost'
              }
            },
            totalPages: {
              type: 'number'
            },
            currentPage: {
              type: 'number'
            },
            total: {
              type: 'number'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token for admin authentication'
        }
      }
    }
  },
  apis: ['./server.js'] // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Portfolio Blog API Documentation'
}));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_blog';

console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI (masked):', MONGODB_URI.replace(/:[^:@]*@/, ':****@'));

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    console.log('📊 Database:', mongoose.connection.name);
    // Seed admin user
    seedAdmin();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    
    if (err.message.includes('authentication failed')) {
      console.log('💡 Please check your MongoDB Atlas username and password');
    }
    
    if (err.message.includes('network')) {
      console.log('💡 Please check your internet connection and MongoDB Atlas network access');
    }
    
    process.exit(1);
  });

// Blog Post Schema
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

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

// Middleware for JWT authentication
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Seed admin user on server start
const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({});
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123!', 10);
      const admin = new Admin({
        username: 'admin',
        email: 'admin@portfolio.com',
        password: hashedPassword
      });
      await admin.save();
      console.log('✅ Seeded admin user: admin / admin123!');
    }
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
  }
};

// Routes

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all blog posts with pagination and search
 *     tags: [Blog Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of posts per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter posts by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query for post titles, excerpts, and tags
 *     responses:
 *       200:
 *         description: List of blog posts with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPostsResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/posts', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    let query = { published: true };

    // Add category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Add search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await BlogPost.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/posts/{slug}:
 *   get:
 *     summary: Get a single blog post by slug
 *     tags: [Blog Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The post slug
 *     responses:
 *       200:
 *         description: Blog post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPost'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - excerpt
 *               - content
 *               - category
 *               - readTime
 *             properties:
 *               title:
 *                 type: string
 *                 description: The post title
 *               slug:
 *                 type: string
 *                 description: The post slug (auto-generated from title if not provided)
 *               excerpt:
 *                 type: string
 *                 description: Short excerpt of the post
 *               content:
 *                 type: string
 *                 description: The full post content (HTML)
 *               category:
 *                 type: string
 *                 description: Post category
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Post tags
 *               image:
 *                 type: string
 *                 description: Post featured image URL
 *               readTime:
 *                 type: number
 *                 minimum: 1
 *                 description: Estimated read time in minutes
 *               published:
 *                 type: boolean
 *                 default: true
 *                 description: Whether the post is published
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPost'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/posts', async (req, res) => {
  try {
    // Generate slug from title if not provided
    if (!req.body.slug) {
      req.body.slug = req.body.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }

    // Calculate read time if not provided
    if (!req.body.readTime) {
      const wordCount = req.body.content.replace(/<[^>]*>/g, '').split(' ').length;
      req.body.readTime = Math.max(1, Math.ceil(wordCount / 200));
    }

    const post = new BlogPost(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'A post with this slug already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags: [Blog Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *               readTime:
 *                 type: number
 *                 minimum: 1
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPost'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags: [Blog Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all blog post categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["All", "Technology", "Design", "Programming"]
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category', { published: true });
    res.json(['All', ...categories]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/posts/featured/list:
 *   get:
 *     summary: Get featured blog posts (latest 3)
 *     tags: [Blog Posts]
 *     responses:
 *       200:
 *         description: List of featured posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogPost'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/posts/featured/list', async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Authentication Routes

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Admin username
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Admin password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verify admin token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/auth/verify', authenticateAdmin, async (req, res) => {
  res.json({
    valid: true,
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email
    }
  });
});

// Protected Admin Routes (require authentication)

/**
 * @swagger
 * /api/admin/posts:
 *   get:
 *     summary: Get all posts for admin (including unpublished)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of all posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPostsResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/admin/posts', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const posts = await BlogPost.find({})
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await BlogPost.countDocuments({});

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});