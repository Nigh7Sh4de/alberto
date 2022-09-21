import {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";
import Village from "../components/Village";

type Village = JSX.Element;

export class VillagesController {
  static villages: Village[];
  static setVillages: any;

  static generateVillageKey(x: number, y: number): string {
    return `village(${x},${y})`;
  }

  static settleVillage(x: number, y: number): void {
    const name = this.generateVillageKey(x, y);
    const newVillage = <Village top={y} left={x} name={name} key={name} />;
    VillagesController.setVillages([
      ...VillagesController.villages,
      newVillage,
    ]);
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
