import React, { useEffect, useState } from 'react';
import styles from 'src/components/Map/Map.module.css';
import { useTurnContext } from 'src/hooks/Turn';

export const Next = () => {
  const [{ turn }, TurnController] = useTurnContext();
  const [targetTurn, setTargetTurn] = useState(turn);

  const nextTurn = (x: number) => () => {
    setTargetTurn(turn + x);
    TurnController.nextTurn();
  };

  useEffect(() => {
    if (turn < targetTurn) TurnController.nextTurn();
  }, [turn, TurnController, targetTurn]);

  return (
    <div className={styles.nextButtonContainer}>
      <span>{turn}</span>&nbsp;
      <button className={styles.nextButton} onClick={nextTurn(1)}>
        +1
      </button>
      <button className={styles.nextButton} onClick={nextTurn(10)}>
        +10
      </button>
    </div>
  );
};
