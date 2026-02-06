import axios from 'axios';

const orderApi = axios.create({
  baseURL: import.meta.env.VITE_ORDER_API,
});

orderApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default orderApi;
