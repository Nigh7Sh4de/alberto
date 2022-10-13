import React from 'react';
import useVillagesContext from 'src/hooks/Villages';

import styles from './Map.module.css';

const Map = () => {
  const [{ villages }, VillagesController] = useVillagesContext();

  const onClick = (e: any) => {
    if (e.target !== e.currentTarget) return;
    VillagesController.settleVillage({
      left: e.nativeEvent.offsetX,
      top: e.nativeEvent.offsetY,
    });
  };

  return (
    <div onClick={onClick} className={styles.container}>
      {villages.map((village) => village.reactComponent)}
    </div>
  );
};

export default Map;
