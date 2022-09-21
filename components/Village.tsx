import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { useTurnContext } from "../hooks/Turn";

import { InfoPanel } from "./InfoPanel";

import styles from "./Map.module.css";

export type VillageProps = {
  top: number;
  left: number;
  name: string;
  villagers?: number;
  scholars?: number;
  idols?: number;
};

const VILLAGER_GROWTH = 10;

const Village = (props: VillageProps) => {
  const [villagers, setVillagers] = useState<number>(props.villagers || 0);
  const [scholars, setScholars] = useState<number>(props.scholars || 0);
  const [idols, setIdols] = useState<number>(props.idols || 0);
  const [{ turn }] = useTurnContext();
  const prevTurnRef = useRef<number>(1);
  useEffect(() => {
    setVillagers(villagers + (turn - prevTurnRef.current) * VILLAGER_GROWTH);
    prevTurnRef.current = turn;
  }, [turn]);

  const infoPanel = useMemo(
    () => (
      <InfoPanel
        name={props.name}
        villagers={villagers}
        scholars={scholars}
        idols={idols}
      />
    ),
    [props.name, villagers, scholars, idols]
  );

  return (
    <div
      className={styles.villageContainer}
      style={{
        top: props.top,
        left: props.left,
      }}
    >
      <div className={styles.village}></div>
      {infoPanel}
    </div>
  );
};

export default Village;
