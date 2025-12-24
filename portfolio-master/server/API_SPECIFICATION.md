# ASP.NET Backend API Specification

This document describes the API endpoints required for the Portfolio Blog system.
The Vue.js frontend expects these endpoints to be implemented.

## Base Configuration

- **Base URL**: `http://localhost:5000` (development)
- **Content-Type**: `application/json`
- **Authentication**: JWT Bearer tokens

---

## Data Models

### BlogPost

```csharp
public class BlogPost
{
    public string Id { get; set; }           // GUID as string
    public string Title { get; set; }         // Required
    public string Slug { get; set; }          // Required, URL-friendly, unique
    public string Excerpt { get; set; }       // Brief summary
    public string Content { get; set; }       // HTML content from rich text editor
    public string Category { get; set; }      // Required (e.g., "Technology", "Web Development")
    public List<string> Tags { get; set; }    // Array of tag strings
    public string Image { get; set; }         // Featured image URL
    public int ReadTime { get; set; }         // Estimated reading time in minutes
    public bool Published { get; set; }       // true = visible to public
    public DateTime CreatedAt { get; set; }   // Auto-set on creation
    public DateTime UpdatedAt { get; set; }   // Auto-set on update
}
```

### AdminUser

```csharp
public class AdminUser
{
    public string Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }  // BCrypt hashed
    public int Role { get; set; }             // 0 = SuperAdmin, 1 = Admin
    public DateTime CreatedAt { get; set; }
    public bool IsActive { get; set; }
}
```

---

## Public Endpoints (No Authentication Required)

### GET /api/posts

Get all **published** blog posts with optional filtering and pagination.

**Query Parameters:**
| Parameter | Type   | Description                          |
|-----------|--------|--------------------------------------|
| category  | string | Filter by category name              |
| search    | string | Search in title, excerpt, content    |
| tag       | string | Filter by tag                        |
| page      | int    | Page number (default: 1)             |
| limit     | int    | Posts per page (default: 10)         |

**Response (200 OK):**
```json
{
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with Vue 3",
      "slug": "getting-started-with-vue-3",
      "excerpt": "Learn the basics of Vue 3 Composition API",
      "content": "<p>Full HTML content here...</p>",
      "category": "Web Development",
      "tags": ["vue", "javascript", "frontend"],
      "image": "https://example.com/image.jpg",
      "readTime": 5,
      "published": true,
      "createdAt": "2025-12-01T10:00:00Z",
      "updatedAt": "2025-12-01T10:00:00Z"
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 42
}
```

---

### GET /api/posts/{slug}

Get a single published blog post by its URL slug.

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Getting Started with Vue 3",
  "slug": "getting-started-with-vue-3",
  "excerpt": "Learn the basics of Vue 3 Composition API",
  "content": "<p>Full HTML content here...</p>",
  "category": "Web Development",
  "tags": ["vue", "javascript", "frontend"],
  "image": "https://example.com/image.jpg",
  "readTime": 5,
  "published": true,
  "createdAt": "2025-12-01T10:00:00Z",
  "updatedAt": "2025-12-01T10:00:00Z"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Post not found"
}
```

---

### GET /api/posts/categories

Get list of all unique categories from published posts.

**Response (200 OK):**
```json
["All", "Technology", "Web Development", "Programming", "Tutorial", "Personal"]
```

> Note: Include "All" as the first item for frontend filtering.

---

### GET /api/posts/tags

Get list of all unique tags from published posts.

**Response (200 OK):**
```json
["vue", "javascript", "typescript", "csharp", "dotnet", "api"]
```

---

## Authentication Endpoints

### POST /api/auth/login

Authenticate admin user and receive JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123!"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Invalid username or password"
}
```

---

### GET /api/auth/verify

Verify if the current JWT token is valid.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "valid": true,
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Invalid or expired token"
}
```

---

## Protected Endpoints (Require Authentication)

All these endpoints require the `Authorization: Bearer <token>` header.

### POST /api/posts

Create a new blog post.

**Request Body:**
```json
{
  "title": "My New Blog Post",
  "slug": "my-new-blog-post",
  "excerpt": "A brief description of the post",
  "content": "<p>HTML content from TipTap editor</p>",
  "category": "Technology",
  "tags": ["vue", "javascript"],
  "image": "https://example.com/image.jpg",
  "readTime": 5,
  "published": true
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "My New Blog Post",
  "slug": "my-new-blog-post",
  "excerpt": "A brief description of the post",
  "content": "<p>HTML content from TipTap editor</p>",
  "category": "Technology",
  "tags": ["vue", "javascript"],
  "image": "https://example.com/image.jpg",
  "readTime": 5,
  "published": true,
  "createdAt": "2025-12-07T10:00:00Z",
  "updatedAt": "2025-12-07T10:00:00Z"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Validation failed",
  "details": {
    "title": "Title is required",
    "slug": "Slug must be unique"
  }
}
```

---

### PUT /api/posts/{id}

Update an existing blog post.

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "slug": "updated-slug",
  "excerpt": "Updated excerpt",
  "content": "<p>Updated content</p>",
  "category": "Programming",
  "tags": ["updated", "tags"],
  "image": "https://example.com/new-image.jpg",
  "readTime": 7,
  "published": false
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Updated Title",
  "slug": "updated-slug",
  ...
  "updatedAt": "2025-12-07T12:00:00Z"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Post not found"
}
```

---

### DELETE /api/posts/{id}

Delete a blog post.

**Response (204 No Content):** Success, no body

**Response (404 Not Found):**
```json
{
  "error": "Post not found"
}
```

---

### GET /api/admin/posts

Get all posts (including drafts) for admin panel.

**Query Parameters:**
| Parameter | Type | Description              |
|-----------|------|--------------------------|
| page      | int  | Page number (default: 1) |
| limit     | int  | Posts per page           |

**Response (200 OK):**
```json
{
  "posts": [
    {
      "_id": "...",
      "title": "...",
      "published": false,
      ...
    }
  ],
  "totalPages": 3,
  "currentPage": 1,
  "total": 25
}
```

---

## CORS Configuration

Enable CORS for the frontend development server:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

---

## JWT Configuration

- **Algorithm**: HS256
- **Expiration**: Configurable (recommended: 24 hours)
- **Claims**: Include `sub` (user id), `username`, `email`

Example token payload:
```json
{
  "sub": "507f1f77bcf86cd799439011",
  "username": "admin",
  "email": "admin@example.com",
  "exp": 1733616000,
  "iat": 1733529600
}
```

---

## Default Admin User (for seeding)

```json
{
  "username": "admin",
  "password": "admin123!",
  "email": "francisgbohunmi@gmail.com"
}
```

---

## Categories (Predefined)

The frontend uses these categories in the admin panel:
- Technology
- Web Development
- Programming
- Tutorial
- Personal

---

## Error Response Format

All errors should follow this format:

```json
{
  "error": "Error message here",
  "details": {}  // Optional, for validation errors
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `204` - No Content (successful delete)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Internal Server Error

---

## Database Recommendations

### Option 1: MongoDB
- Use MongoDB.Driver NuGet package
- Store ObjectId as string `_id` in JSON responses

### Option 2: SQL Server / PostgreSQL
- Use Entity Framework Core
- Use GUID for Id, serialize as string

### Option 3: SQLite (for development)
- Lightweight, no setup required
- Good for testing

---

## Project Structure Suggestion

```
server/
├── BlogApi/
│   ├── Controllers/
│   │   ├── PostsController.cs
│   │   ├── AuthController.cs
│   │   └── AdminController.cs
│   ├── Models/
│   │   ├── BlogPost.cs
│   │   ├── AdminUser.cs
│   │   └── DTOs/
│   │       ├── LoginRequest.cs
│   │       ├── LoginResponse.cs
│   │       ├── CreatePostRequest.cs
│   │       └── UpdatePostRequest.cs
│   ├── Services/
│   │   ├── IBlogService.cs
│   │   ├── BlogService.cs
│   │   ├── IAuthService.cs
│   │   └── AuthService.cs
│   ├── Data/
│   │   └── BlogDbContext.cs
│   ├── Program.cs
│   └── appsettings.json
├── BlogApi.sln
└── README.md
```

---

## Quick Start Commands

```bash
# Create new Web API project
dotnet new webapi -n BlogApi -o server/BlogApi

# Add required packages
cd server/BlogApi
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package BCrypt.Net-Next
dotnet add package MongoDB.Driver  # if using MongoDB
# OR
dotnet add package Microsoft.EntityFrameworkCore.SqlServer  # if using SQL Server

# Run the API
dotnet run
```
