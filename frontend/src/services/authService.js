import authApi from './authApi';

export const login = (email, password) =>
  authApi.post('/login', { email, password });

export const register = (email, password) =>
  authApi.post('/register', { email, password });
