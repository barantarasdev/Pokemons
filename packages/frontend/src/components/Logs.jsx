import styles from './styles.module.css';

function Logs({ list }) {
  return (
    <ul className={styles.logsList}>
      {list.map(({ value, isAttack }) => (
        <li
          key={value}
          className={`${styles.log} ${isAttack ? styles.logAttack : ''}`}
        >
          {value}
        </li>
      ))}
    </ul>
  );
}

export default Logs;
