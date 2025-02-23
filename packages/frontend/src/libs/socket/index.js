import { io } from 'socket.io-client';

const { NODE_ENV, REACT_APP_BASE_URL } = process.env;
const URL = NODE_ENV === 'development' ? REACT_APP_BASE_URL : undefined;

export const socket = io(URL);
