import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import VillageComponent, { VillageProps } from 'src/components/Map/Village';
import { useTurnContext } from 'src/hooks/Turn';

const Village = (props: SettleVillageOptions) => {
  const name = useMemo(
    () =>
      props.name ||
      VillagesController.generateVillageKey(props.left, props.top),
    [props.name, props.left, props.top],
  );

  const reactComponent = useMemo(
    () => <VillageComponent key={props.name} name={name} {...props} />,
    [, name, props],
  );
};

interface SettleVillageOptions {
  top: number;
  left: number;
  name?: string;
  villagers?: number;
  scholars?: number;
  idols?: number;
}

export class VillagesController {
  static villages: Village[];
  static setVillages: any;

  static generateVillageKey(x: number, y: number): string {
    return `village(${x},${y})`;
  }

  static settleVillage(villageProps: SettleVillageOptions): void {
    VillagesController.setVillages([
      ...VillagesController.villages,
      new Village(villageProps),
    ]);
  }

  static beginGame(): void {
    const left = Math.floor(Math.random() * 500);
    const top = Math.floor(Math.random() * 500);
    VillagesController.settleVillage({ left, top, villagers: 50, idols: 1 });
  }
}

export type VillagesContextValue = {
  villages: Village[];
};
const defaultVillagesValue: Village[] = [];

export const VillagesContext = createContext<
  [VillagesContextValue, typeof VillagesController]
>([{ villages: defaultVillagesValue }, VillagesController]);

export const VillagesContextProvider = ({ children }: any) => {
  const [villages, setVillages] = useState<Village[]>(defaultVillagesValue);
  const [{ turn }] = useTurnContext();
  const turnRef = useRef<number>(0);

  useEffect(() => {
    if (turn === 1 && turn !== turnRef.current) {
      VillagesController.beginGame();
    }
  }, [turn]);

  VillagesController.villages = villages;
  VillagesController.setVillages = setVillages;

  return (
    <VillagesContext.Provider value={[{ villages }, VillagesController]}>
      {children}
    </VillagesContext.Provider>
  );
};

export default function useVillagesContext() {
  return useContext(VillagesContext);
}
