import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { useTurnContext } from "../hooks/Turn";

import { InfoPanel } from "./InfoPanel";

import styles from "./Map.module.css";

type VillageProps = {
  top: number;
  left: number;
  name: string;
};

const VILLAGER_GROWTH = 10;

const Village = ({ top, left, name }: VillageProps) => {
  const [villagers, setVillagers] = useState<number>(0);
  const [scholars, setScholars] = useState<number>(0);
  const [idols, setIdols] = useState<number>(0);
  const [{ turn }] = useTurnContext();
  const prevTurnRef = useRef<number>(1);
  useEffect(() => {
    setVillagers(villagers + (turn - prevTurnRef.current) * VILLAGER_GROWTH);
    prevTurnRef.current = turn;
  }, [turn]);

  const infoPanel = useMemo(
    () => (
      <InfoPanel
        name={name}
        villagers={villagers}
        scholars={scholars}
        idols={idols}
      />
    ),
    [name, villagers, scholars, idols]
  );
  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      setVillagers(villagers + 1);
      setScholars(scholars + 1);
      setIdols(idols + 1);
    },
    [infoPanel]
  );

  return (
    <div
      className={styles.villageContainer}
      style={{
        top,
        left,
      }}
    >
      <div className={styles.village} onClick={onClick}></div>
      {infoPanel}
    </div>
  );
};

export default Village;
