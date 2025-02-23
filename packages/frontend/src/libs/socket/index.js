import { io } from 'socket.io-client';

const { REACT_APP_BASE_URL } = process.env;

export const socket = io(REACT_APP_BASE_URL);
