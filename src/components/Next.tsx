import React, { useEffect, useState } from "react";
import {} from "src/";
import { useTurnContext } from "../../hooks/Turn";

import styles from "./Map.module.css";

export const Next = () => {
  const [{ turn }, TurnController] = useTurnContext();
  const [targetTurn, setTargetTurn] = useState(turn);

  const nextTurn = (x: number) => () => {
    setTargetTurn(turn + x);
    TurnController.nextTurn();
  };

  useEffect(() => {
    if (turn < targetTurn) TurnController.nextTurn();
  }, [turn]);

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
