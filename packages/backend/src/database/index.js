const Player = require('./schema/player');

const createPlayer = async ({ address }) => {
  return Player.create({ address });
};

const isExistPlayer = async (address) => {
  return await Player.exists({ address });
};

module.exports = { createPlayer, isExistPlayer };
