const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
  address: { type: String, unique: true, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});
playerSchema.index({ address: 1 });
const Player = model('Player', playerSchema);

module.exports = Player;
