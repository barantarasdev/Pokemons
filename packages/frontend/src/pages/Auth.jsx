import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { getSignature } from '../libs/web3';
import { getNonce, login } from '../libs/http/auth';
import { useCallback, useState } from 'react';
import { PATH } from '../constants/index.js';
import metamaskIcon from '../assets/images/metamask.svg';
import Spinner from '../components/Spinner.jsx';

function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    try {
      setIsLoading(true);

      const {
        data: { nonce },
      } = await getNonce();
      const { signature, address } = await getSignature(nonce);
      await login({ nonce, signature, address });
      sessionStorage.setItem('logged', true);

      navigate(PATH.HOME);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return (
    <div className={styles.auth}>
      <div className={styles.authWrapper}>
        <h2 className={styles.authTitle}>Let's get started</h2>
        <img src={metamaskIcon} alt="MetaMask icon" />
        <button
          className={styles.authButton}
          onClick={handleLogin}
          disabled={isLoading}
        >
          Connect wallet
          {isLoading ? (
            <div className={styles.authSpinner}>
              <Spinner />
            </div>
          ) : null}
        </button>
      </div>
    </div>
  );
}

export default Auth;
