const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
  address: { type: String, unique: true, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});
const Player = model('Player', playerSchema);

module.exports = Player;
