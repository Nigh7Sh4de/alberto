import { useState } from "react";

import styles from "./Map.module.css";

type VillageProps = {
  top: number;
  left: number;
};

const Village = ({ top, left }: VillageProps) => {
  const [team, setTeam] = useState("#a6a6a6");

  const onClick = () => setTeam("#ff00ff");

  return (
    <div
      className={styles.village}
      style={{
        top,
        left,
        background: team,
      }}
      onClick={onClick}
    ></div>
  );
};

export default Village;
