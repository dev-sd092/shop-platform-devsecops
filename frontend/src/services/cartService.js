import cartApi from './cartApi';

export const getCart = () => cartApi.get('/cart');

export const addToCart = (productId, quantity = 1) =>
  cartApi.post('/add', { productId, quantity });

export const updateCartItem = (productId, quantity) =>
  cartApi.put('/update', { productId, quantity });

export const removeCartItem = (productId) =>
  cartApi.delete(`/remove/${productId}`);
