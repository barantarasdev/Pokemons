const { getPokemons } = require('../database');

class Pokemons {
  constructor() {}

  async pokemons(req, res) {
    try {
      const skip = req.query.skip;
      const limit = Math.min(Math.max(Number(req.query.limit), 1), 20);

      const pokemons = await getPokemons({ skip, limit });
      const hasNext = pokemons.length === limit;

      return res.status(200).send({ pokemons, hasNext });
    } catch (error) {
      res.status(500).send({ error: 'Failed to get pokemons!' });
    }
  }
}

module.exports = new Pokemons();
