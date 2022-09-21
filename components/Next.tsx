import { useTurnContext, TurnController } from "../hooks/Turn";

import styles from "./Map.module.css";

export const Next = () => {
  const [{ turn }, TurnController] = useTurnContext();
  const onClick = () => TurnController.nextTurn();

  return (
    <button className={styles.nextButton} onClick={onClick}>
      {turn}
    </button>
  );
};
