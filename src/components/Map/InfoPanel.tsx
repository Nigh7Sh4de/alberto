import { useMemo } from 'react';
import styles from 'src/components/Map/Map.module.css';
import useVillagesContext from 'src/hooks/Villages';

const IDOL_COST = 50;

export type InfoPanelProps = {
  name: string;
  villagers: number;
  idols: number;
  villagerPool?: number;
  buildIdols: () => void;
  cancelBuildIdols: () => void;
  buildingIdol: boolean;
  expand: () => void;
};

export const InfoPanel = (props: InfoPanelProps) => {
  const {
    name,
    villagers,
    idols,
    villagerPool,
    buildIdols,
    cancelBuildIdols,
    buildingIdol,
    expand,
  } = props;

  const expandButton = useMemo(
    () => (
      <div>
        <button onClick={expand}>Expand</button>
      </div>
    ),
    [expand],
  );
  return (
    <>
      <div>{props.name}</div>
      <div>Villagers: {props.villagers}</div>
      <div>
        <span>Idols: {props.idols}</span>
        <button
          onClick={
            props.buildingIdol ? props.cancelBuildIdols : props.buildIdols
          }
        >
          {props.buildingIdol ? `${props.villagerPool}/${IDOL_COST}` : '+'}
        </button>
      </div>
      {villagers > 100 && idols > 0 ? expandButton : null}
    </>
  );
};
