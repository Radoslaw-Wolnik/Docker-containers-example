import api from '../utils/api';
import { User } from '../types/global';

export const getUserProfile = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await api.put<User>('/users/profile', userData);
  return response.data;
};

export const uploadProfilePicture = async (formData: FormData): Promise<string> => {
  const response = await api.put<{ message: string; profilePicture: string }>('/users/profile-picture', formData);
  return response.data.profilePicture;
};

export const deactivateAccount = async (): Promise<void> => {
  await api.post('/users/deactivate');
};