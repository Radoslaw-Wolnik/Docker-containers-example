// src/api/jobs.ts
import api from '../utils/api';

export const runJob = async (jobName: string): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>(`/jobs/${jobName}`);
  return response.data;
};

export const getJobStatus = async (jobName: string): Promise<any> => {
  const response = await api.get(`/jobs/${jobName}/status`);
  return response.data;
};