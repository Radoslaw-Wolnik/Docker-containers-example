// src/api/admin.ts
import api from '../utils/api';
import { User } from '../types/global';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/admin/users');
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete(`/admin/user/${userId}`);
};

export const updateUserRole = async (userId: string, role: 'user' | 'admin'): Promise<User> => {
  const response = await api.put<User>(`/admin/user/${userId}`, { role });
  return response.data;
};