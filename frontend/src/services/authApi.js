import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:4000',
});

export default authApi;
