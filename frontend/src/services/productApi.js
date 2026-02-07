import axios from 'axios';

const productApi = axios.create({
  baseURL: '/api/products',
});

export default productApi;
