import { API_ENDPOINTS } from '../../constants/index.js';
import api from '../axios.js';

export const getNonce = async () => {
  return await api.get(API_ENDPOINTS.GET_NONCE);
};

export const login = async ({ signature, nonce, address }) => {
  return await api.post(API_ENDPOINTS.LOGIN, { nonce, signature, address });
};

export const logout = async () => {
  return await api.post(API_ENDPOINTS.LOGOUT);
};
