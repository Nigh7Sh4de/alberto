import { useState } from "react";

import styles from "./Map.module.css";

type VillageProps = {
  col: number;
  row: number;
};

const Village = ({ row, col }: VillageProps) => {
  const [team, setTeam] = useState("#a6a6a6");

  const onClick = () => setTeam("#ff00ff");

  return (
    <div
      className={styles.village}
      style={{
        top: `${row}rem`,
        left: `${col}rem`,
        background: team,
      }}
      onClick={onClick}
    ></div>
  );
};

export default Village;
