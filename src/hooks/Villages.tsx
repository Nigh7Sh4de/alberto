import {
  MouseEventHandler,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Settler from 'src/components/Map/Settler';
import Village from 'src/components/Map/Village';

import { useTurnContext } from './Turn';

type Village = JSX.Element;
type Settler = JSX.Element;

export class VillagesController {
  static villages: Village[];
  static setVillages: any;
  static settlers: Map<string, Settler>;
  static setSettlers: any;
  static nextSettlerKey = 0;
  static mapCallback?: MouseEventHandler;
  static setMapCallback: (mapCallback?: MouseEventHandler) => void;

  static generateVillageKey(x: number, y: number): string {
    return `village(${x},${y})`;
  }

  static generateSettlerKey(): string {
    return `settler(${VillagesController.nextSettlerKey++})`;
  }

  static createVillage(villageProps: {
    top: number;
    left: number;
    name?: string;
    villagers: number;
    idols: number;
  }): void {
    const name =
      villageProps.name ||
      this.generateVillageKey(villageProps.left, villageProps.top);
    const newVillage = <Village key={name} name={name} {...villageProps} />;
    VillagesController.setVillages([
      ...VillagesController.villages,
      newVillage,
    ]);
  }

  static settleVillage({
    settlerKey,
    ...villageOptions
  }: {
    settlerKey: string;
    top: number;
    left: number;
    name?: string;
    villagers: number;
    idols: number;
  }) {
    VillagesController.createVillage(villageOptions);
    VillagesController.settlers.delete(settlerKey);
    VillagesController.setSettlers(VillagesController.settlers);
  }

  static beginGame(): void {
    const left = Math.floor(Math.random() * 500);
    const top = Math.floor(Math.random() * 500);
    VillagesController.createSettler({ villagers: 50, idols: 1, top, left });
  }

  static createSettler(settler: {
    idols: number;
    villagers: number;
    top: number;
    left: number;
  }) {
    console.log('DP', 'createSettler');
    const settlerKey = VillagesController.generateSettlerKey();
    const newSettler = (
      <Settler key={settlerKey} name={settlerKey} {...settler} />
    );
    VillagesController.settlers.set(settlerKey, newSettler);
    VillagesController.setSettlers(VillagesController.settlers);
  }
}

export type VillagesContextValue = {
  villages: Village[];
  settlers: Map<string, Settler>;
};
const defaultVillagesValue: Village[] = [];
const defaultSettlersValue = new Map<string, Settler>();

export const VillagesContext = createContext<
  [VillagesContextValue, typeof VillagesController]
>([
  { villages: defaultVillagesValue, settlers: defaultSettlersValue },
  VillagesController,
]);

export const VillagesContextProvider = ({ children }: any) => {
  const [mapCallback, setMapCallback] = useState<MouseEventHandler>();
  const [villages, setVillages] = useState<Village[]>(defaultVillagesValue);
  const [settlers, setSettlers] =
    useState<Map<string, Settler>>(defaultSettlersValue);
  const [{ turn }] = useTurnContext();
  const turnRef = useRef<number>(0);

  useEffect(() => {
    if (turn === 1 && turn !== turnRef.current) {
      VillagesController.beginGame();
    }
  }, [turn]);

  VillagesController.villages = villages;
  VillagesController.setVillages = setVillages;
  VillagesController.settlers = settlers;
  VillagesController.setSettlers = setSettlers;
  VillagesController.mapCallback = mapCallback;
  VillagesController.setMapCallback = (mapCallback?: MouseEventHandler) =>
    setMapCallback(() => mapCallback);

  return (
    <VillagesContext.Provider
      value={[{ villages, settlers }, VillagesController]}
    >
      {children}
    </VillagesContext.Provider>
  );
};

export default function useVillagesContext() {
  return useContext(VillagesContext);
}
