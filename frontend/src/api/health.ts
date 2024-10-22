
// src/api/health.ts
import api from '../utils/api';

interface HealthCheckResponse {
  status: string;
}

interface DetailedHealthCheckResponse extends HealthCheckResponse {
  uptime: number;
  message: string;
  timestamp: number;
  database: string;
}

export const getBasicHealth = async (): Promise<HealthCheckResponse> => {
  const response = await api.get<HealthCheckResponse>('/health/basic');
  return response.data;
};

export const getDetailedHealth = async (): Promise<DetailedHealthCheckResponse> => {
  const response = await api.get<DetailedHealthCheckResponse>('/health/details');
  return response.data;
};
