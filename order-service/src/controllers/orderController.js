const Order = require('../models/Order');
const axios = require('axios');

// Service URLs (internal Docker network)
const CART_SERVICE_URL = 'http://cart-service:6001';
const PRODUCT_SERVICE_URL = 'http://product-service:5000';

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. Fetch cart
    const cartRes = await axios.get(`${CART_SERVICE_URL}/cart`, {
      headers: { Authorization: req.headers.authorization }
    });

    const cart = cartRes.data;

    if (!cart.items || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    // 2. Fetch product details & build snapshot
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const productRes = await axios.get(
        `${PRODUCT_SERVICE_URL}/products/${item.productId}`
      );

      const product = productRes.data;

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    // 3. Create order
    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      status: 'CREATED'
    });

    // 4. Clear cart
    await axios.delete(`${CART_SERVICE_URL}/cart/remove/all`, {
      headers: { Authorization: req.headers.authorization }
    }).catch(() => {
      // Cart cleanup failure should NOT break order creation
      console.warn('Cart cleanup failed');
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Order creation failed' });
  }
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.userId }).sort({
    createdAt: -1
  });
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    userId: req.user.userId
  });

  if (!order)
    return res.status(404).json({ message: 'Order not found' });

  res.json(order);
};
