import { useCallback, useEffect, useRef, useState } from 'react';
import Pokemon from './Pokemon';
import styles from './styles.module.css';
import Spinner from './Spinner';
import { getPokemons } from '../libs/http/pokemons';
import { MAX_POKEMON_LIMIT, SCROLL_TRASHLOAD } from '../constants';

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const scrollRef = useRef(null);
  const initialized = useRef(false);
  const debounceRef = useRef(null);
  const spinnerRef = useRef(null);

  const handleChangeSkip = () => {
    setSkip((curr) => curr + MAX_POKEMON_LIMIT);
  };

  const handleScroll = useCallback(() => {
    const listCurrentRef = scrollRef?.current;

    if (
      listCurrentRef.scrollHeight - SCROLL_TRASHLOAD <=
        listCurrentRef.scrollTop + listCurrentRef.clientHeight &&
      hasNext
    ) {
      setIsLoading(true);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        handleChangeSkip();
      }, 500);
    }
  }, [handleChangeSkip, hasNext]);

  const fetchPokemons = useCallback(async () => {
    initialized.current = true;
    setIsLoading(true);

    try {
      const { data } = await getPokemons({
        skip,
        limit: MAX_POKEMON_LIMIT,
      });
      setPokemons((curr) => [...curr, ...data.pokemons]);

      if (!data.hasNext) {
        setHasNext(false);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, [skip]);

  useEffect(() => {
    if (!hasNext) {
      return;
    }

    if (!initialized.current || skip) {
      fetchPokemons();
    }
  }, [skip, hasNext, fetchPokemons]);

  useEffect(() => {
    const listCurrentRef = scrollRef.current;

    if (!listCurrentRef || !hasNext) {
      if (listCurrentRef) {
        listCurrentRef.removeEventListener('scroll', handleScroll);
      }

      return;
    }

    listCurrentRef.addEventListener('scroll', handleScroll);

    return () => {
      if (listCurrentRef) {
        listCurrentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasNext, handleScroll]);

  useEffect(() => {
    if (isLoading) {
      spinnerRef?.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading]);

  return (
    <div ref={scrollRef} className={`${styles.pokemons} ${styles.container}`}>
      <ul className={styles.pokemonsList}>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} className={styles.pokemonsItem}>
            <Pokemon item={pokemon} />
          </li>
        ))}
      </ul>

      {isLoading ? (
        <div ref={spinnerRef}>
          <Spinner />
        </div>
      ) : null}
    </div>
  );
}

export default Pokemons;
