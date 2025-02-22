import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Pokemon from './Pokemon';
import styles from './styles.module.css';
import Spinner from './Spinner';
import { getPokemons } from '../libs/http/pokemons';
import { Context } from '../pages/Home';
import { MAX_POKEMONS_LIMIT } from '../constants';

function Pokemons() {
  const { pokemons, handleAddPokemons } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const listRef = useRef(null);
  const initialized = useRef(false);
  const [hasNext, setHasNext] = useState(true);
  const debounceRef = useRef(null);

  const handleChangeSkip = () => {
    setSkip((curr) => curr + MAX_POKEMONS_LIMIT);
  };

  const handleScroll = useCallback(() => {
    const currentRef = listRef.current;

    if (
      currentRef.scrollHeight - 10 <=
        currentRef.scrollTop + currentRef.clientHeight &&
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

  useEffect(() => {
    if (!hasNext) {
      return;
    }

    if (!initialized.current || skip) {
      const fetchPokemons = async () => {
        initialized.current = true;
        setIsLoading(true);

        try {
          const { data } = await getPokemons({
            skip,
            limit: MAX_POKEMONS_LIMIT,
          });
          handleAddPokemons(data.pokemons);

          if (!data.hasNext) {
            setHasNext(false);
          }
        } catch (error) {
          alert(`Error: ${error}`);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPokemons();
    }
  }, [skip, hasNext]);

  useEffect(() => {
    const currentRef = listRef.current;

    if (!currentRef || !hasNext) {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }

      return;
    }

    currentRef.addEventListener('scroll', handleScroll);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasNext]);

  return (
    <div className={styles.pokemons}>
      <ul ref={listRef} className={styles.pokemonsList}>
        {pokemons.map((item) => (
          <li key={item.id} className={styles.pokemonsItem}>
            <Pokemon item={item} />
          </li>
        ))}
      </ul>
      {isLoading ? (
        <div className={styles.pokemonSpinnerWrapper}>
          <Spinner />
        </div>
      ) : null}
    </div>
  );
}

export default Pokemons;
