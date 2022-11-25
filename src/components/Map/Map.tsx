import React from 'react';
import useVillagesContext from 'src/hooks/Villages';

import styles from './Map.module.css';

const Map = () => {
  const [{ villages, settlers }, VillagesController] = useVillagesContext();
  console.log('Map', { villages, settlers });

  const onClick = (e: any) => {
    if (e.target !== e.currentTarget) return;
    if (VillagesController.mapCallback) {
      VillagesController.mapCallback(e);
    }
  };

  return (
    <div onClick={onClick} className={styles.container}>
      {villages}
      {settlers.size > 0 && [...settlers.values()]}
    </div>
  );
};

export default Map;
