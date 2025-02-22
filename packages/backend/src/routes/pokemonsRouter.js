const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { pokemons } = require('../services/pokemonsService');

const pokemonsRouter = express.Router();

pokemonsRouter.get('/pokemons', verifyToken, pokemons);

module.exports = pokemonsRouter;
