import React, { useState } from "react";
import useVillagesContext from "../hooks/Villages";
import styles from "./Map.module.css";

const Map = () => {
  const [{ villages }, VillagesController] = useVillagesContext();

  const onClick = (e: any) => {
    console.log("Map.onClick", e);
    VillagesController.settleVillage(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
  };

  return (
    <div onClick={onClick} className={styles.container}>
      {villages}
    </div>
  );
};

export default Map;