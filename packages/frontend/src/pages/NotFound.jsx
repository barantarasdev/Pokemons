import styles from './styles.module.css';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFoundTitle}>
        404
        <br />
        Page Not Found
      </h1>
    </div>
  );
}

export default NotFound;
