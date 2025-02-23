import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { getNonce, login } from '../libs/http/auth';
import { useCallback, useEffect, useState } from 'react';
import { PATH } from '../constants/index.js';
import metamaskIcon from '../assets/images/metamask.svg';
import Spinner from '../components/Spinner.jsx';
import metamaskProvider from '../libs/metamaskProvider.js';

function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    try {
      setIsLoading(true);

      // Get random nonce
      const {
        data: { nonce },
      } = await getNonce();

      // Sign with the waller
      const { signature, address } = await metamaskProvider.getSignature(nonce);

      // Login with an user
      await login({
        nonce,
        signature,
        address,
      });

      // Store the flag of login
      sessionStorage.setItem('logged', true);

      navigate(PATH.HOME);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Network changing
  useEffect(() => {
    const handleNetworkChange = () => {
      window.location.reload();
    };

    window.ethereum.on('chainChanged', handleNetworkChange);

    return () => {
      window.ethereum.removeListener('chainChanged', handleNetworkChange);
    };
  }, []);

  return (
    <section className={styles.auth}>
      <h1 className={styles.authTitle}>Let's get started</h1>

      <img src={metamaskIcon} alt="MetaMask icon" />

      <button
        className={styles.authButton}
        onClick={handleLogin}
        disabled={isLoading}
      >
        Connect wallet
        {isLoading ? (
          <div className={styles.authSpinnerWrapper}>
            <Spinner />
          </div>
        ) : null}
      </button>
    </section>
  );
}

export default Auth;
