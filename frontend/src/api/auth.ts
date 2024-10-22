import api from '../utils/api';
import { User } from '../types/global';

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post<{ message: string; user: User }>('/auth/login', { email, password });
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const register = async (username: string, email: string, password: string): Promise<void> => {
  await api.post('/auth/register', { username, email, password });
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  await api.put('/auth/change-password', { currentPassword, newPassword });
};