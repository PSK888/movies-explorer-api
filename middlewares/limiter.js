const expressRateLimit = require('express-rate-limit');

const limiter = expressRateLimit({ windowMs: 10 * 60 * 1000, max: 1000 });

module.exports = {
  limiter,
};
