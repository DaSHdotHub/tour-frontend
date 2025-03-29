import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000 // 15 seconds timeout
  
  // If you're running into CORS issues during development, you might want to add:
  // withCredentials: true
});

// Request interceptor for handling auth tokens, etc.
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle global error scenarios
    if (error.response && error.response.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      // router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;