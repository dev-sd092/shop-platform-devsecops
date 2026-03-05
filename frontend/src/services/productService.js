import productApi from './productApi';
import axios from 'axios';

export const fetchCategories = () =>
  axios.get('/api/categories');

export const fetchProducts = (category) => {
  if (category) {
    return productApi.get(`/?category=${category}`);
  }
  return productApi.get('/');
};
