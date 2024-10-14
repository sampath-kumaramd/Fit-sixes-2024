import axios, { AxiosError, isAxiosError } from 'axios';
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';

import { env } from '../lib/env';

// Create a base Axios configuration
const baseAxiosConfig: CreateAxiosDefaults = {
  baseURL: env.API_BASE_URL,
  timeout: 10000, // 10 seconds
};

// Create instances for unauthorized and authorized requests
export const axiosUnauthorized: AxiosInstance = axios.create(baseAxiosConfig);
export const axiosAuthorized: AxiosInstance = axios.create(baseAxiosConfig);

// Add an interceptor to include the authorization token
axiosAuthorized.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Error handling interceptor
const errorInterceptor = (error: AxiosError) => {
  // Handle errors (e.g., refresh token, logout, etc.)
  return Promise.reject(error);
};

// Apply error interceptor to both instances
axiosUnauthorized.interceptors.response.use(
  (response) => response,
  errorInterceptor
);

axiosAuthorized.interceptors.response.use(
  (response) => response,
  errorInterceptor
);

export { isAxiosError };
