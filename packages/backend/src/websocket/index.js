const { Server } = require('socket.io');
const { start, attack } = require('../services/arena');
const arena = require('../services/arena');

const initWebSocket = (app) => {
  const io = new Server(app, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('🚀 Client is connected!');

    socket.on('disconnect', () => {
      console.log('Client is disconnected!');
    });

    socket.on('start', async (event) => {
      const { id } = JSON.parse(event);
      const response = await arena.start(id);

      socket.emit('start', response);
    });

    socket.on('attack', async (event) => {
      const { opponent, me } = event;
      const response = arena.startAttack({ me, opponent });

      socket.emit('attack', response);
    });
  });
};

module.exports = initWebSocket;
