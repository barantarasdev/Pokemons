import styles from './styles.module.css';
import { MAX_POKEMON_TYPES } from '../constants/index.js';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function Pokemon({ item, isTypes = true, isAttacked }) {
  const { id, name, type = [], base, image } = item;
  const navigate = useNavigate();

  const types = useMemo(() => {
    return type.slice(0, MAX_POKEMON_TYPES);
  }, [type]);

  // Tooltip for the rest types
  const restTypes = useMemo(() => {
    const isTypesLengthMax = type?.length > MAX_POKEMON_TYPES;

    return isTypesLengthMax ? type.slice(MAX_POKEMON_TYPES).join(',') : null;
  }, [type]);

  const handleClick = useCallback(() => {
    navigate(`/${id}`, {
      state: {
        currentPokemon: item,
      },
    });
  }, [item, id]);

  return (
    <article
      role="link"
      className={`${styles.pokemon} ${isAttacked ? styles.pokemonFlash : ''}`}
      onClick={handleClick}
    >
      <figure className={styles.pokemonWrapper}>
        <img
          className={styles.pokemonImage}
          src={image?.thumbnail}
          alt={name?.english || '-'}
        />

        <figcaption className={styles.pokemonContent}>
          {isTypes ? (
            <ul className={styles.pokemonTypes}>
              {types.map((value) => (
                <li className={styles.pokemonType} key={value}>
                  {value}
                </li>
              ))}

              {!!restTypes?.length ? (
                <li
                  className={`${styles.pokemonType} ${styles.pokemonTypeTooltip}`}
                >
                  ...
                  <span className={styles.pokemonTypeTooltipText}>
                    {restTypes}
                  </span>
                </li>
              ) : null}
            </ul>
          ) : null}

          <div className={styles.pokemonInfo}>
            <p className={styles.pokemonInfoName}>Name:</p>
            <p>{name?.english || '-'}</p>
          </div>

          <div className={styles.pokemonInfo}>
            <p className={styles.pokemonInfoName}>HP:</p>
            <p>{base?.HP || '-'}</p>
          </div>

          <div className={styles.pokemonInfo}>
            <p className={styles.pokemonInfoName}>Attack:</p>
            <p>{base?.Attack || '-'}</p>
          </div>

          <div className={styles.pokemonInfo}>
            <p className={styles.pokemonInfoName}>Defense:</p>
            <p>{base?.Defense || '-'}</p>
          </div>

          <div className={styles.pokemonInfo}>
            <p className={styles.pokemonInfoName}>Speed:</p>
            <p>{base?.Speed || '-'}</p>
          </div>
        </figcaption>
      </figure>
    </article>
  );
}

export default Pokemon;
