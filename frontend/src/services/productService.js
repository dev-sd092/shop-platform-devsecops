import productApi from './productApi';

export const fetchCategories = () =>
  productApi.get('/categories');

export const fetchProducts = (category) => {
  if (category) {
    return productApi.get(`/?category=${category}`);
  }
  return productApi.get('/');
};
