import axios from 'axios';
import { useRouter } from 'next/navigation';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Clear all tokens and user data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('companyData');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Logged out');

      window.location.href = '/auth/sign-in';
    }
    return Promise.reject(error);
  }
);

export default api;
