import axios from 'axios';

const cartApi = axios.create({
  baseURL: '/api/cart',
});

cartApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default cartApi;
