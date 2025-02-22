const { Schema, model } = require('mongoose');

const pokemonSchema = new Schema({
  name: {
    english: { type: String, required: true },
    japanese: { type: String, required: true },
    chinese: { type: String, required: true },
    french: { type: String, required: true },
  },
  type: [{ type: String, required: true }],
  base: {
    HP: { type: Number, required: true },
    Attack: { type: Number, required: true },
    Defense: { type: Number, required: true },
    Sp_Attack: { type: Number, required: true },
    Sp_Defense: { type: Number, required: true },
    Speed: { type: Number, required: true },
  },
  species: { type: String, required: true },
  description: { type: String, required: true },
  profile: {
    height: { type: String, required: true },
    weight: { type: String, required: true },
  },
  egg: [{ type: String, required: true }],
  ability: [{ type: String, required: true }],
  gender: { type: String, required: true },
  image: {
    sprite: { type: String, required: true },
    thumbnail: { type: String, required: true },
    hires: { type: String, required: true },
  },
});
const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon;
