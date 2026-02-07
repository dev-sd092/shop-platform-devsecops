import axios from 'axios';

const authApi = axios.create({
  baseURL: '/api/auth',
});

export default authApi;
