const { Server } = require('socket.io');
const arena = require('../services/arena');

const { ORIGIN, METHODS } = process.env;

const initWebSocket = (app) => {
  const io = new Server(app, {
    cors: {
      origin: ORIGIN,
      methods: METHODS.split(','),
      credentials: true,
    },
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
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
