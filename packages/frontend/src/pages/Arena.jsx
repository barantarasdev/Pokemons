import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Pokemon from '../components/Pokemon';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import Logs from '../components/Logs';
import Progress from '../components/Progress';
import fallbackImg from '../assets/images/ai.jpg';
import { ARENA_TIMEOUT_DURATION, PATH } from '../constants';
import Spinner from '../components/Spinner';
import { socket } from '../libs/socket/index.js';

function Arena() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPokemon = location.state?.currentPokemon;

  const logsEndRef = useRef(null);

  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [loadingStates, setLoadingStates] = useState({
    isLoading: false,
    isMeAttackLoading: false,
    isOpponentAttackLoading: false,
  });
  const [hps, setHps] = useState({
    hpMe: currentPokemon.base.HP,
    hpOpponent: 0,
  });
  const [logs, setLogs] = useState([]);
  const [isRound, setIsRound] = useState(false);
  const [isAttackButtonDisabled, setIsAttackButtonDisabled] = useState(true);

  const handleStart = () => {
    setLoadingStates((curr) => ({ ...curr, isLoading: true }));
    socket.emit(
      'start',
      JSON.stringify({
        id,
      }),
    );
  };

  const handleAttack = () => {
    setIsAttackButtonDisabled(true);
    setLoadingStates((curr) => ({
      ...curr,
      isMeAttackLoading: true,
    }));
    socket.emit('attack', {
      me: {
        defense: currentPokemon.base.Defense,
        attack: currentPokemon.base.Attack,
        hp: hps.hpMe,
      },
      opponent: {
        defense: opponentPokemon.base.Defense,
        attack: opponentPokemon.base.Attack,
        name: opponentPokemon.name.english,
        hp: hps.hpOpponent,
      },
    });
  };

  const handleClear = () => {
    setHps({ hpOpponent: 0, hpMe: 0 });
    setIsRound(false);
    setLogs([]);
    navigate(PATH.HOME);
  };

  const handleDamageMe = useCallback(({ isLoss, opponent }) => {
    setLoadingStates((curr) => ({ ...curr, isOpponentAttackLoading: true }));

    setTimeout(() => {
      setLoadingStates((curr) => ({
        ...curr,
        isOpponentAttackLoading: false,
      }));

      if (isLoss) {
        alert('You lose!');
        return handleClear();
      }

      setHps((curr) => ({
        ...curr,
        hpMe: curr.hpMe - opponent.damage,
      }));
      setLogs((curr) => [...curr, { value: opponent.log, isAttack: true }]);
      setIsAttackButtonDisabled(false);
    }, ARENA_TIMEOUT_DURATION);
  }, []);

  const handleStartResult = useCallback(
    ({ opponent, randomPokemon, isOpponentAttacker, isLoss }) => {
      setIsRound(true);
      setLoadingStates((curr) => ({ ...curr, isLoading: false }));
      setOpponentPokemon(randomPokemon);
      setHps((curr) => ({ ...curr, hpOpponent: randomPokemon.base.HP }));

      if (isOpponentAttacker) {
        handleDamageMe({ isLoss, opponent });
      } else {
        setIsAttackButtonDisabled(false);
      }
    },
    [handleDamageMe],
  );

  const handleAttackResult = useCallback(
    ({ me, opponent, isLoss, isWin }) => {
      setTimeout(() => {
        setLoadingStates((curr) => ({
          ...curr,
          isMeAttackLoading: false,
        }));

        if (isWin) {
          alert('You won!');
          return handleClear();
        }

        setHps((curr) => ({
          ...curr,
          hpOpponent: curr.hpOpponent - me.damage,
        }));
        setLogs((curr) => [...curr, { value: me.log }]);
        handleDamageMe({ opponent, isLoss });
      }, ARENA_TIMEOUT_DURATION);
    },
    [handleDamageMe],
  );

  useEffect(() => {
    socket.on('attack', handleAttackResult);
    socket.on('start', handleStartResult);

    return () => {
      socket.off('attack', handleAttackResult);
      socket.off('start', handleStartResult);
    };
  }, [handleAttackResult, handleStartResult]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <section className={styles.arena}>
      <h1 className={styles.arenaTitle}>{isRound ? 'Round' : `Let's Fight`}</h1>

      <div className={styles.arenaPokemons}>
        <div className={styles.arenaPokemon}>
          {isRound ? (
            <Progress count={hps.hpMe} maxCount={currentPokemon.base.HP} />
          ) : null}
          <Pokemon
            isTypes={false}
            item={currentPokemon}
            isAttacked={loadingStates.isOpponentAttackLoading}
          />
        </div>

        <p className={styles.arenaPokemonTitle}>VS</p>

        <div className={styles.arenaPokemon}>
          {isRound && opponentPokemon ? (
            <>
              <Progress
                count={hps.hpOpponent}
                maxCount={opponentPokemon.base.HP}
              />
              <Pokemon
                isTypes={false}
                item={opponentPokemon}
                isAttacked={loadingStates.isMeAttackLoading}
              />
            </>
          ) : (
            <>
              <img
                className={styles.arenaRobotImg}
                src={fallbackImg}
                alt="AI icon"
              />

              {loadingStates.isLoading ? (
                <div className={styles.arenaSpinnerWrapper}>
                  <Spinner />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      <div className={styles.arenaFooter}>
        {isRound ? (
          <button
            className={`${styles.arenaAttackButton} ${isAttackButtonDisabled ? styles.arenaAttackButtonDis : ''}`}
            onClick={handleAttack}
          >
            Attack
          </button>
        ) : (
          <button className={styles.arenaAttackButton} onClick={handleStart}>
            Start
          </button>
        )}

        <div className={styles.arenaLogsWrapper}>
          <Logs list={logs} />
          <div ref={logsEndRef} />
        </div>
      </div>
    </section>
  );
}

export default Arena;
