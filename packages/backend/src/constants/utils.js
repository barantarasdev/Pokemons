const { randomBytes } = require('crypto');

const getNonce = () => {
  // Generate random value
  const hex = randomBytes(16).toString('hex');

  return `Please sign this message for authentication: ${hex}`;
};

module.exports = { getNonce };
