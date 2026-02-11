import orderApi from './orderApi';

export const placeOrder = () => orderApi.post('/');

export const fetchOrders = () => orderApi.get('/');

export const fetchOrderById = (orderId) =>
  orderApi.get(`/${orderId}`);
