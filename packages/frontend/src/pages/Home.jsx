import Pokemons from '../components/Pokemons';
import styles from './styles.module.css';

function Home() {
  return (
    <section className={styles.home}>
      <Pokemons />
    </section>
  );
}

export default Home;
