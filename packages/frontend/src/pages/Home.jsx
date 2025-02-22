import React, { createContext, useState } from 'react';
import Pokemons from '../components/Pokemons';

export const Context = createContext({
  pokemons: [],
});

function Home() {
  const [pokemons, setPokemons] = useState([]);

  const handleAddPokemons = (newPokemons) => {
    setPokemons((curr) => [...curr, ...newPokemons]);
  };

  return (
    <Context.Provider value={{ pokemons, handleAddPokemons }}>
      <Pokemons />
    </Context.Provider>
  );
}

export default Home;
