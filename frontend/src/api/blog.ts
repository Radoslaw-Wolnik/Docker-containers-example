// src/api/blog.ts
import api from '../utils/api';
import { BlogPost, PaginatedBlogPosts, BlogContent } from '../types/global';

interface BlogPostData {
  title: string;
  content: BlogContent[];
}

export const getAllBlogPosts = async (page: number = 1, limit: number = 10): Promise<PaginatedBlogPosts> => {
  const response = await api.get<PaginatedBlogPosts>('/blog', { 
    params: { page, limit } 
  });
  return response.data;
};

export const getBlogPostById = async (id: string): Promise<BlogPost> => {
  const response = await api.get<BlogPost>(`/blog/${id}`);
  return response.data;
};

export const createBlogPost = async (data: BlogPostData): Promise<BlogPost> => {
  // Convert the data to FormData
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', JSON.stringify(data.content));

  const response = await api.post<BlogPost>('/blog', formData);
  return response.data;
};

export const updateBlogPost = async (id: string, data: BlogPostData): Promise<BlogPost> => {
  // Convert the data to FormData
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', JSON.stringify(data.content));

  const response = await api.put<BlogPost>(`/blog/${id}`, formData);
  return response.data;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  await api.delete(`/blog/${id}`);
};

export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  const response = await api.get<BlogPost[]>('/blog/blog-posts/search', {
    params: { query }
  });
  return response.data;
};