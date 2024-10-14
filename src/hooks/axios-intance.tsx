
import axios, { AxiosError, isAxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

import { env } from '../lib/env';
// Create a base Axios instance
const baseAxiosInstance: AxiosInstance = axios.create({
  baseURL: env.API_BASE_URL, // Add this to your env.ts file
  timeout: 10000, // 10 seconds
});
// Create an instance for unauthorized requests
export const axiosUnauthorized: AxiosInstance = baseAxiosInstance;
// Create an instance for authorized requests
export const axiosAuthorized: AxiosInstance = axios.create({
  ...baseAxiosInstance.defaults,
});
// Add an interceptor to include the authorization token
axiosAuthorized.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
// Error handling interceptor for both instances
const errorInterceptor = (error: any) => {
  // Handle errors (e.g., refresh token, logout, etc.)
  return Promise.reject(error);
};
axiosUnauthorized.interceptors.response.use(
  (response) => response,
  errorInterceptor
);
axiosAuthorized.interceptors.response.use(
  (response) => response,
  errorInterceptor
);

export { isAxiosError };
