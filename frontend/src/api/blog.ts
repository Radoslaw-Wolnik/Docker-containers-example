import api from '../utils/api';
import { BlogPost, PaginatedBlogPosts } from '../types/global';

export const getAllBlogPosts = async (page: number = 1): Promise<PaginatedBlogPosts> => {
  const response = await api.get<PaginatedBlogPosts>('/blog', { params: { page } });
  return response.data;
};

export const getBlogPostById = async (id: string): Promise<BlogPost> => {
  const response = await api.get<BlogPost>(`/blog/${id}`);
  return response.data;
};

export const createBlogPost = async (formData: FormData): Promise<BlogPost> => {
  const response = await api.post<BlogPost>('/blog', formData);
  return response.data;
};

export const updateBlogPost = async (id: string, formData: FormData): Promise<BlogPost> => {
  const response = await api.put<BlogPost>(`/blog/${id}`, formData);
  return response.data;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  await api.delete(`/blog/${id}`);
};