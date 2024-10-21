# Audio Sample Project API Documentation

## Table of Contents
1. [Authentication](#authentication)
2. [Admin Routes](#admin-routes)
3. [Audio Routes](#audio-routes)
4. [Auth Routes](#auth-routes)
5. [Blog Post Routes](#blog-post-routes)
6. [Health Routes](#health-routes)
7. [Job Routes](#job-routes)
8. [Site Settings Routes](#site-settings-routes)
9. [User Routes](#user-routes)

## Authentication

Most endpoints require authentication. Authentication is handled using HTTP-only cookies. When a user logs in successfully, the server will set a secure, HTTP-only cookie containing a JWT token. This cookie will be automatically included in subsequent requests to authenticated endpoints. Authentication requirement is indicated for each endpoint as follows:
 
 - 🔓 No authentication required
 - 🔒 User authentication required
 - 🔑 Admin authentication required

## Admin Routes

#### Get All Users
```
🔑 GET /api/admin/users
Response: [User]
```

#### Delete User
```
🔑 DELETE /api/admin/:id
Response: { message: "User deleted successfully" }
```

#### Update User Role
```
🔑 PUT /api/admin/:id
Body: { role: 'user' | 'admin' }
Response: User
```

## Audio Routes

(Note: The original project didn't have specific audio routes. I'll include blog post routes here as they might be similar in structure.)

#### Get All Blog Posts
```
🔓 GET /api/blog
Response: { blogPosts: [BlogPost], currentPage: number, totalPages: number, totalPosts: number }
```

#### Get Blog Post by ID
```
🔓 GET /api/blog/:id
Response: BlogPost
```

#### Create Blog Post
```
🔒 POST /api/blog
Body: FormData (title: string, content: string, file?: File)
Response: BlogPost
```

#### Update Blog Post
```
🔒 PUT /api/blog/:id
Body: FormData (title: string, content: string, file?: File)
Response: BlogPost
```

#### Delete Blog Post
```
🔒 DELETE /api/blog/:id
Response: { message: "Blog post deleted successfully" }
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

#### Change Password
```
🔒 PUT /api/auth/change-password
Body: { currentPassword: string, newPassword: string }
Response: { message: "Password changed successfully" }
```

## Health Routes

#### Basic Health Check
```
🔓 GET /api/health
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
Response: { message: "Job completed successfully" }
```

#### Get Job Status
```
🔑 GET /api/jobs/:jobName/status
Response: { /* Job status details */ }
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
Body: { siteName: string, siteDescription: string, siteKeywords: string[], socialMediaLinks: object, logoUrl: string }
Response: SiteSettings
```

#### Update SEO Settings
```
🔑 PUT /api/site-settings/seo
Body: { siteName: string, siteDescription: string, siteKeywords: string[] }
Response: SiteSettings
```

#### Update Social Media Links
```
🔑 PUT /api/site-settings/social
Body: { socialMediaLinks: object }
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

#### Update Profile
```
🔒 PUT /api/users/profile
Body: { username: string, email: string }
Response: User
```

#### Upload Profile Picture
```
🔒 PUT /api/users/profile-picture
Body: FormData
Response: { message: "Profile picture updated successfully", profilePicture: string }
```

#### Deactivate Account
```
🔒 POST /api/users/deactivate
Response: { message: "Account deactivated successfully" }
```