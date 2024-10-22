// src/types/global.d.ts

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  profilePicture?: string;
  isActive: boolean;
}

export type BlogContentType = 'text' | 'code' | 'image' | 'link';

export interface BlogContent {
  type: BlogContentType;
  content: string;
  language?: string; // for code blocks
  alt?: string;     // for images and links
}

export interface BlogPost {
  id: string;
  title: string;
  content: BlogContent[];
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedBlogPosts {
  blogPosts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

export interface SiteSettings {
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