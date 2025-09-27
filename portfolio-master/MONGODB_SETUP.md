# Portfolio Blog with MongoDB Setup

This guide will help you set up the portfolio blog with MongoDB backend.

## Prerequisites

1. **Node.js** (v16 or later)
2. **MongoDB** - You can use either:
   - Local MongoDB installation
   - MongoDB Atlas (cloud)

## MongoDB Setup Options

### Option 1: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `.env` file in the server folder with your connection string

## Installation Steps

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Environment Configuration

Create or update the `.env` file in the `server` folder:

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio_blog

# For MongoDB Atlas (replace with your connection string)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_blog?retryWrites=true&w=majority

PORT=5000
```

### 4. Start the Development Servers

#### Terminal 1: Start the API Server
```bash
cd server
npm run dev
```

#### Terminal 2: Start the Vue Frontend
```bash
npm run dev
```

## Usage

1. **Frontend**: http://localhost:5173
2. **API Server**: http://localhost:5000
3. **Blog Admin**: http://localhost:5173/blog/admin

## Features

- ✅ Create, edit, delete blog posts
- ✅ Rich text editor with formatting
- ✅ Category and tag management
- ✅ Search and filtering
- ✅ Responsive design
- ✅ MongoDB data persistence

## API Endpoints

- `GET /api/posts` - Get all posts with filtering
- `GET /api/posts/:slug` - Get single post by slug
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/categories` - Get all categories

## Troubleshooting

### MongoDB Connection Issues

1. **Check MongoDB is running**:
   ```bash
   # Check if MongoDB is running on default port
   mongosh --eval "db.runCommand({ping:1})"
   ```

2. **Check firewall settings** (for Atlas users)
3. **Verify connection string** format
4. **Check network access** (for Atlas users)

### Common Errors

- **ECONNREFUSED**: MongoDB server is not running
- **Authentication failed**: Check username/password in connection string
- **Network timeout**: Check network connectivity to Atlas

## Development

To add new features or modify the blog:

1. **Backend changes**: Edit files in the `server` folder
2. **Frontend changes**: Edit files in the `src` folder
3. **Database schema**: Modify the BlogPost schema in `server/server.js`