import { API_ENDPOINTS } from '../../constants/index.js';
import { api } from '../axios.js';

export const getPokemons = async ({ skip, limit }) => {
  return await api.get(API_ENDPOINTS.POKEMONS, { params: { skip, limit } });
};
