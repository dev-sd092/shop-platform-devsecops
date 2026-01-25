const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'Product service healthy' });
});

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

module.exports = app;
