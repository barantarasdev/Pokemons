const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const pokemonsService = require('../services/pokemonsService');

const pokemonsRouter = express.Router();

pokemonsRouter.get('/pokemons', verifyToken, pokemonsService.pokemons);

module.exports = pokemonsRouter;
