const Player = require('./schema/player');
const Pokemon = require('./schema/pokemon');

const createPlayer = async ({ address }) => {
  return Player.create({ address });
};

const isExistPlayer = async (address) => {
  return await Player.exists({ address });
};

const getBasePokemons = async ({ skip, limit }) => {
  return await Pokemon.find(
    {},
    {
      id: 1,
      'name.english': 1,
      type: 1,
      'base.HP': 1,
      'base.Attack': 1,
      'base.Defense': 1,
      'base.Speed': 1,
      'image.thumbnail': 1,
    },
    { skip, limit },
  );
};

module.exports = {
  createPlayer,
  isExistPlayer,
  getBasePokemons,
};
