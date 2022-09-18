import styles from "./Map.module.css";
import Village from "./Village";

function generateVillageKey(row: number, col: number) {
  return `village(${row},${col})`;
}

const Map = () => {
  const blank_tiles = Array.from(Array(50).keys()).map((row) =>
    Array.from(Array(50).keys()).map((col) => (
      <Village key={generateVillageKey(row, col)} row={row} col={col} />
    ))
  );
  return <div className={styles.container}>{blank_tiles}</div>;
};

export default Map;
