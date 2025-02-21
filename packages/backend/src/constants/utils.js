const { randomBytes } = require('crypto');

const getNonce = () => {
  // Generate random value
  return randomBytes(16).toString('hex');
};

module.exports = { getNonce };
