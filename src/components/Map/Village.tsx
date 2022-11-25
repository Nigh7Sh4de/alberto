import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from 'src/components/Map/Map.module.css';
import { useTurnContext } from 'src/hooks/Turn';
import useVillagesContext from 'src/hooks/Villages';

export type VillageProps = {
  top: number;
  left: number;
  name: string;
  villagers?: number;
  scholars?: number;
  idols?: number;
};

const VILLAGER_GROWTH_PER_TURN = 10;
const IDOL_COST = 50;
const IDOL_COST_PER_TURN = 5;

const Village = (props: VillageProps) => {
  const [_, { createSettler }] = useVillagesContext();
  const [villagers, setVillagers] = useState<number>(props.villagers || 0);
  const [idols, setIdols] = useState<number>(props.idols || 0);
  const [buildingIdol, setBuildingIdol] = useState<boolean>(false);
  const [villagerPool, setVillagerPool] = useState(0);

  const [{ turn }] = useTurnContext();
  const prevTurnRef = useRef<number>(turn);
  useEffect(() => {
    const dt = turn - prevTurnRef.current;
    let _villagers = villagers;
    let _villagerPool = villagerPool;
    let _buildingIdol = buildingIdol;
    let _idols = idols;

    _villagers = _villagers + dt * VILLAGER_GROWTH_PER_TURN;

    if (_buildingIdol) {
      _villagers -= dt * IDOL_COST_PER_TURN;
      _villagerPool += dt * IDOL_COST_PER_TURN;

      if (_villagerPool >= IDOL_COST) {
        _buildingIdol = false;
        _villagerPool = 0;
        _idols += 1;
      }
    }

    if (_villagers !== villagers) setVillagers(_villagers);
    if (_villagerPool !== villagerPool) setVillagerPool(_villagerPool);
    if (_buildingIdol !== buildingIdol) setBuildingIdol(_buildingIdol);
    if (_idols !== idols) setIdols(_idols);

    prevTurnRef.current = turn;
  }, [turn, buildingIdol, idols, villagerPool, villagers]);

  const expand = useCallback(() => {
    const _villagers = Math.floor(villagers / 2);
    const _idols = idols - 1;
    const _expandingVillagers = villagers - _villagers;

    setVillagers(_villagers);
    setIdols(_idols);
    createSettler({
      villagers: _expandingVillagers,
      idols: 1,
      top: props.top,
      left: props.left,
    });
  }, [createSettler, idols, villagers]);

  const buildIdols = useCallback(() => {
    setBuildingIdol(true);
  }, [setBuildingIdol]);

  const cancelBuildIdols = useCallback(() => {
    setVillagerPool(0);
    setVillagers(villagers + villagerPool);
    setBuildingIdol(false);
  }, [setVillagerPool, setVillagers, setBuildingIdol, villagers, villagerPool]);

  const infoPanel = useMemo(
    () => (
      <InfoPanel
        name={props.name}
        villagers={villagers}
        idols={idols}
        buildIdols={buildIdols}
        cancelBuildIdols={cancelBuildIdols}
        villagerPool={villagerPool}
        buildingIdol={buildingIdol}
        expand={expand}
      />
    ),
    [
      props.name,
      villagers,
      idols,
      buildingIdol,
      villagerPool,
      cancelBuildIdols,
      buildIdols,
      expand,
    ],
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

const InfoPanel = ({
  name,
  villagers,
  idols,
  villagerPool,
  buildIdols,
  cancelBuildIdols,
  buildingIdol,
  expand,
}: {
  name: string;
  villagers: number;
  idols: number;
  villagerPool?: number;
  buildIdols: () => void;
  cancelBuildIdols: () => void;
  buildingIdol: boolean;
  expand: () => void;
}) => {
  const expandButton = useMemo(
    () => <button onClick={expand}>Expand</button>,
    [expand],
  );
  const readyToExpand = villagers > 100 && idols > 0;

  return (
    <>
      <div>{name}</div>
      <div>Villagers: {villagers}</div>
      <div>
        <span>Idols: {idols}</span>
        <button onClick={buildingIdol ? cancelBuildIdols : buildIdols}>
          {buildingIdol ? `${villagerPool}/${IDOL_COST}` : '+'}
        </button>
      </div>
      {readyToExpand ? expandButton : null}
    </>
  );
};
