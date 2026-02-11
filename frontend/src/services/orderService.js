import orderApi from './orderApi';

export const placeOrder = () => orderApi.post('/orders');

export const fetchOrders = () => orderApi.get('/orders');

export const fetchOrderById = (orderId) =>
  orderApi.get(`/${orderId}`);
