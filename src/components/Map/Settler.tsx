import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from 'src/components/Map/Map.module.css';
import { useTurnContext } from 'src/hooks/Turn';
import useVillagesContext from 'src/hooks/Villages';

export type SettlerProps = {
  name: string;
  top: number;
  left: number;
  villagers: number;
  idols: number;
};

const VILLAGER_LOSS_PER_TURN = 10;

const Settler = ({ name, ...props }: SettlerProps) => {
  const [_, { settleVillage, setMapCallback }] = useVillagesContext();
  const [villagers, setVillagers] = useState<number>(props.villagers || 0);
  const [idols, setIdols] = useState<number>(props.idols || 0);
  const [top, setTop] = useState<number>(props.top);
  const [left, setLeft] = useState<number>(props.left);

  const [{ turn }] = useTurnContext();
  const prevTurnRef = useRef<number>(turn);

  useEffect(() => {
    const dt = turn - prevTurnRef.current;
    let _villagers = villagers;
    let _idols = idols;

    _villagers = _villagers - dt * VILLAGER_LOSS_PER_TURN;
    if (_villagers < 0) {
      if (_idols > 0) {
        _idols = _idols - 1;
        _villagers = _villagers + 50;
      } else {
        // DEATH
      }
    }

    if (_villagers !== villagers) setVillagers(_villagers);
    if (_idols !== idols) setIdols(_idols);

    prevTurnRef.current = turn;
  }, [turn, idols, villagers]);

  const settle = useCallback(() => {
    settleVillage({ settlerKey: name, top, left, idols, villagers });
  }, [settleVillage, idols, villagers, top, left]);

  const [moving, setMoving] = useState(false);
  const cancelMove = useCallback(() => {
    setMoving(false);
    setMapCallback();
  }, [setMapCallback]);
  const updateLocation = useCallback<MouseEventHandler>(
    (e) => {
      setLeft(e.nativeEvent.offsetX);
      setTop(e.nativeEvent.offsetY);
      cancelMove();
    },
    [setTop, setLeft, cancelMove],
  );
  const move = useCallback(() => {
    setMoving(true);
    setMapCallback(updateLocation);
  }, [setMapCallback, updateLocation]);

  const infoPanel = useMemo(
    () => (
      <InfoPanel
        name={name}
        villagers={villagers}
        idols={idols}
        settle={settle}
        move={move}
        moving={moving}
        cancelMove={cancelMove}
      />
    ),
    [name, villagers, idols, settle, moving, move, cancelMove],
  );

  return (
    <div
      className={styles.villageContainer}
      style={{
        top,
        left,
      }}
    >
      <div className={styles.village}></div>
      {infoPanel}
    </div>
  );
};

export default Settler;

const InfoPanel = ({
  name,
  villagers,
  idols,
  move,
  moving,
  cancelMove,
  settle,
}: {
  name: string;
  villagers: number;
  idols: number;
  move: () => void;
  moving: boolean;
  cancelMove: () => void;
  settle: () => void;
}) => {
  const moveButton = useMemo(
    () =>
      moving ? (
        <button onClick={cancelMove}>Cancel Move</button>
      ) : (
        <button onClick={move}>Move</button>
      ),
    [move, cancelMove, moving],
  );
  const settleButton = useMemo(
    () => <button onClick={settle}>Settle</button>,
    [settle],
  );

  return (
    <>
      <div>{name}</div>
      <div>Villagers: {villagers}</div>
      <div>Idols: {idols}</div>
      {moveButton}
      {settleButton}
    </>
  );
};
