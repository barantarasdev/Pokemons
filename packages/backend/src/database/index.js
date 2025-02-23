const Player = require('./schema/player');
const Pokemon = require('./schema/pokemon');

const createPlayer = async ({ address }) => {
  return Player.create({ address });
};

const isExistPlayer = async (address) => {
  return await Player.exists({ address });
};

const getPokemons = async ({ skip, limit }) => {
  return await Pokemon.find(
    {
      'name.english': { $ne: null },
      type: { $ne: null },
      'base.HP': { $ne: null },
      'base.Attack': { $ne: null },
      'base.Defense': { $ne: null },
      'base.Speed': { $ne: null },
      'image.thumbnail': { $ne: null },
    },
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

const getPokemonById = async (id) => {
  return await Pokemon.findOne(
    { id: Number(id) },
    {
      type: 1,
      'base.HP': 1,
      'base.Attack': 1,
      'base.Defense': 1,
      'base.Speed': 1,
    },
  );
};

const getRandomPokemon = async (type) => {
  const result = await Pokemon.aggregate([
    {
      $match: {
        type: {
          $not: {
            $all: type,
          },
        },
        'name.english': { $ne: null },
        'base.HP': { $ne: null },
        'base.Attack': { $ne: null },
        'base.Defense': { $ne: null },
        'base.Speed': { $ne: null },
        'image.thumbnail': { $ne: null },
      },
    },
    { $sample: { size: 1 } },
    {
      $project: {
        id: 1,
        'name.english': 1,
        'base.HP': 1,
        'base.Attack': 1,
        'base.Defense': 1,
        'base.Speed': 1,
        'image.thumbnail': 1,
      },
    },
  ]);

  return result?.[0] || null;
};

module.exports = {
  getPokemonById,
  getRandomPokemon,
  createPlayer,
  isExistPlayer,
  getPokemons,
};
