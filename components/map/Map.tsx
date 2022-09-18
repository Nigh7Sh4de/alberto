import { useState } from "react";
import styles from "./Map.module.css";
import Village from "./Village";

function generateVillageKey(row: number, col: number): string {
  return `village(${row},${col})`;
}

const Map = () => {
  const [villages, setVillages] = useState<any[]>([]);

  const onClick = (e: any) => {
    console.log("DP", e);
    setVillages([
      ...villages,
      <Village
        top={e.nativeEvent.offsetY}
        left={e.nativeEvent.offsetX}
        key={generateVillageKey(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      />,
    ]);
  };

  return (
    <div onClick={onClick} className={styles.container}>
      {villages}
    </div>
  );
};

export default Map;
