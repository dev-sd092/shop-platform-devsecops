require('dotenv').config();
const app = require('./app');
const { connectRedis } = require('./config/redis');

const PORT = process.env.PORT || 6001;

connectRedis().catch((err) => {
  console.error('Redis connection failed', err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Cart service running on port ${PORT}`);
});
