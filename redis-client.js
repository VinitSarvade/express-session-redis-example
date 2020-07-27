const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost"
});

module.exports = client;