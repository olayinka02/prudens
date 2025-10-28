import axios from 'axios';
import config from '../../../config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true, // Include cookies in requests for JWT authentication
});

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
