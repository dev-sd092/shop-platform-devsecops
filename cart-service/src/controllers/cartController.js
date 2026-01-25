const { client } = require('../config/redis');

const getCartKey = (userId) => `cart:${userId}`;

exports.getCart = async (req, res) => {
  const key = getCartKey(req.user.userId);

  const cart = await client.get(key);
  res.json(cart ? JSON.parse(cart) : { items: [] });
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity)
    return res.status(400).json({ message: 'productId and quantity required' });

  const key = getCartKey(req.user.userId);
  const cart = JSON.parse((await client.get(key)) || '{"items": []}');

  const existingItem = cart.items.find(i => i.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await client.set(key, JSON.stringify(cart), { EX: 86400 });

  res.json(cart);
};

exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity === undefined)
    return res.status(400).json({ message: 'productId and quantity required' });

  const key = getCartKey(req.user.userId);
  const cart = JSON.parse((await client.get(key)) || '{"items": []}');

  cart.items = cart.items.map(item =>
    item.productId === productId ? { ...item, quantity } : item
  );

  await client.set(key, JSON.stringify(cart), { EX: 86400 });

  res.json(cart);
};

exports.removeCartItem = async (req, res) => {
  const { productId } = req.params;

  const key = getCartKey(req.user.userId);
  const cart = JSON.parse((await client.get(key)) || '{"items": []}');

  cart.items = cart.items.filter(item => item.productId !== productId);

  await client.set(key, JSON.stringify(cart), { EX: 86400 });

  res.json(cart);
};

exports.clearCart = async (req, res) => {
  const key = `cart:${req.user.userId}`;

  await client.del(key);

  res.json({ message: 'Cart cleared' });
};
