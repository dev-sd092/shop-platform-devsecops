import authApi from './authApi';

export const login = (email, password) =>
  authApi.post('/auth/login', { email, password });

export const register = (email, password) =>
  authApi.post('/auth/register', { email, password });
