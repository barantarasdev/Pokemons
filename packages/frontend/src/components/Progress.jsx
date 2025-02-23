import { useMemo } from 'react';
import styles from './styles.module.css';

function Progress({ count, maxCount }) {
  const width = useMemo(
    () => `${(count / maxCount) * 100}%`,
    [count, maxCount],
  );

  return (
    <div className={styles.progress}>
      <div
        className={styles.progressContent}
        style={{
          width,
        }}
      ></div>
    </div>
  );
}

export default Progress;
