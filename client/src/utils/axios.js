import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches your backend URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000,
  withCredentials: true
});

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const removeAuthToken = () => {
  delete instance.defaults.headers.common['Authorization'];
};

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`, // ✅ This is fine
          { refreshToken },
          { skipAuthRefresh: true }
        );

        const { token } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          setAuthToken(token);
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        removeAuthToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject({
      ...error,
      message: error.response?.data?.message || error.message
    });
  }
);

export const http = instance;
export default instance;
