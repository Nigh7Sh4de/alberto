import { createContext, useContext, useEffect, useState } from "react";

export class TurnController {
  static turn: number;

  static nextTurn: () => void;
  static skipTenTurns: () => void;
}

export type TurnContextValue = {
  turn: number;
};
const defaultTurnValue = 0;

export const TurnContext = createContext<
  [TurnContextValue, typeof TurnController]
>([{ turn: defaultTurnValue }, TurnController]);

export const TurnContextProvider = ({ children }: any) => {
  const [turn, setTurn] = useState<number>(defaultTurnValue);

  TurnController.turn = turn;
  TurnController.nextTurn = () => setTurn(turn + 1);

  return (
    <TurnContext.Provider value={[{ turn }, TurnController]}>
      {children}
    </TurnContext.Provider>
  );
};

export function useTurnContext() {
  return useContext(TurnContext);
}
