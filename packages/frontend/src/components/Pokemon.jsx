import styles from './styles.module.css';
import { MAX_POKEMON_TYPES } from '../constants/index.js';
import { useMemo } from 'react';

function Pokemon({
  item: {
    id,
    name: { english: name },
    type,
    base,
    image: { thumbnail: image },
  },
}) {
  const isTypesMax = type.length > MAX_POKEMON_TYPES;

  const theLastTypes = useMemo(() => {
    return isTypesMax ? type.slice(MAX_POKEMON_TYPES).join(',') : null;
  }, [type]);

  return (
    <a href={`/${id}`} className={styles.pokemon}>
      <figure className={styles.pokemonWrapper}>
        <img className={styles.pokemonImage} src={image} alt={name} />

        <figcaption className={styles.pokemonContent}>
          <ul className={styles.pokemonTypes}>
            {type.slice(0, MAX_POKEMON_TYPES).map((value) => (
              <li className={styles.pokemonType} key={value}>
                {value}
              </li>
            ))}

            {isTypesMax ? (
              <li
                className={`${styles.pokemonType} ${styles.pokemonTypeTooltip}`}
              >
                ...
                <span className={styles.pokemonTypeTooltipText}>
                  {theLastTypes}
                </span>
              </li>
            ) : null}
          </ul>

          <div className={styles.pokemonInfo}>
            <p className={styles.pokemonInfoName}>Name:</p>
            <p>{name || '-'}</p>
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
    </a>
  );
}

export default Pokemon;
