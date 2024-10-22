# Audio Sample Project API Documentation

## Table of Contents
1. [Authentication](#authentication)
2. [Admin Routes](#admin-routes)
3. [Auth Routes](#auth-routes)
4. [Blog Post Routes](#blog-post-routes)
5. [Health Routes](#health-routes)
6. [Job Routes](#job-routes)
7. [Site Settings Routes](#site-settings-routes)
8. [User Routes](#user-routes)

## Authentication
Most endpoints require authentication. Authentication is handled using HTTP-only cookies. When a user logs in successfully, the server will set a secure, HTTP-only cookie containing a JWT token. This cookie will be automatically included in subsequent requests to authenticated endpoints.

Authentication requirement indicators:
- 🔓 No authentication required
- 🔒 User authentication required
- 🔑 Admin authentication required

## Admin Routes

#### Get All Users
```
🔑 GET /api/admin/users
Response: User[]
```

#### Delete User
```
🔑 DELETE /api/admin/user/:id
Response: { message: "User deleted successfully" }
```

#### Update User Role
```
🔑 PUT /api/admin/user/:id
Body: { role: 'user' | 'admin' }
Response: User
```

## Auth Routes

#### Register
```
🔓 POST /api/auth/register
Body: { username: string, email: string, password: string }
Response: { message: "User registered successfully" }
```

#### Login
```
🔓 POST /api/auth/login
Body: { email: string, password: string }
Response: { message: "Login successful", user: { id: string, role: string } }
```

#### Logout
```
🔒 POST /api/auth/logout
Response: { message: "Logout successful" }
```

#### Update Profile
```
🔒 PUT /api/auth/profile
Body: { username: string, email: string }
Response: User
```

#### Change Password
```
🔒 PUT /api/auth/change-password
Body: { currentPassword: string, newPassword: string }
Response: { message: "Password changed successfully" }
```

#### Deactivate Account
```
🔒 POST /api/auth/deactivate
Response: { message: "Account deactivated successfully" }
```

## Blog Post Routes

#### Get All Blog Posts
```
🔓 GET /api/blog
Query Parameters: 
  - page: number (default: 1)
  - limit: number (default: 10)
Response: {
  blogPosts: BlogPost[],
  currentPage: number,
  totalPages: number,
  totalPosts: number
}
```

#### Get Blog Post by ID
```
🔓 GET /api/blog/:id
Response: BlogPost
```

#### Create Blog Post
```
🔒 POST /api/blog
Body: FormData {
  title: string,
  content: string (JSON stringified BlogContent[]),
  blogImage?: File
}
Response: BlogPost
```

#### Update Blog Post
```
🔒 PUT /api/blog/:id
Body: FormData {
  title: string,
  content: string (JSON stringified BlogContent[]),
  blogImage?: File
}
Response: BlogPost
```

#### Delete Blog Post
```
🔒 DELETE /api/blog/:id
Response: { message: "Blog post deleted successfully" }
```

#### Search Blog Posts
```
🔓 GET /api/blog/blog-posts/search
Query Parameters:
  - query: string
Response: BlogPost[]
```

## Health Routes

#### Basic Health Check
```
🔓 GET /api/health/basic
Response: { status: "OK" }
```

#### Detailed Health Check
```
🔓 GET /api/health/details
Response: {
  uptime: number,
  message: string,
  timestamp: number,
  database: string
}
```

## Job Routes

#### Run Job
```
🔑 POST /api/jobs/:jobName
Response: { message: string }
```

#### Get Job Status
```
🔑 GET /api/jobs/:jobName/status
Response: any // Job-specific status information
```

## Site Settings Routes

#### Get Site Settings
```
🔓 GET /api/site-settings
Response: SiteSettings
```

#### Update Site Settings
```
🔑 PUT /api/site-settings
Body: {
  siteName: string,
  siteDescription: string,
  siteKeywords: string[],
  socialMediaLinks: {
    facebook?: string,
    twitter?: string,
    instagram?: string
  },
  logoUrl: string
}
Response: SiteSettings
```

#### Update SEO Settings
```
🔑 PUT /api/site-settings/seo
Body: {
  siteName: string,
  siteDescription: string,
  siteKeywords: string[]
}
Response: SiteSettings
```

#### Update Social Media Links
```
🔑 PUT /api/site-settings/social
Body: { socialMediaLinks: { facebook?: string, twitter?: string, instagram?: string } }
Response: SiteSettings
```

#### Update Logo
```
🔑 PUT /api/site-settings/logo
Body: { logoUrl: string }
Response: SiteSettings
```

## User Routes

#### Get User's Own Profile
```
🔒 GET /api/users/me
Response: User
```

#### Get Other User's Profile
```
🔒 GET /api/users/:id
Response: User
```

#### Update Profile
```
🔒 PUT /api/users/profile
Body: { username: string, email: string }
Response: User
```

#### Update Profile Picture
```
🔒 PUT /api/users/profile-picture
Body: FormData with profile picture file
Response: { message: string, profilePicture: string }
```

#### Deactivate Account
```
🔒 POST /api/users/deactivate
Response: { message: "Account deactivated successfully" }
```

## Models

### BlogPost
```typescript
interface BlogContent {
  type: 'text' | 'code' | 'photo';
  content: string;
  language?: string;  // for code blocks
  alt?: string;       // for images
}

interface BlogPost {
  title: string;
  content: BlogContent[];
  author: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}
```

### User
```typescript
interface User {
  username: string;
  email: string;
  password: string; // Hashed
  role: 'user' | 'admin';
  profilePicture?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### SiteSettings
```typescript
interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteKeywords: string[];
  socialMediaLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  logoUrl: string;
}
```