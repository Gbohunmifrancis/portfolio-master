const mongoose = require('mongoose');

// MongoDB Connection
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

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

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);