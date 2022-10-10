import useVillagesContext from "../../../hooks/Villages";
import styles from "./Map.module.css";

const IDOL_COST = 50;

export type InfoPanelProps = {
  name: string;
  villagers: number;
  idols: number;
  villagerPool?: number;
  buildIdols: () => void;
  cancelBuildIdols: () => void;
  buildingIdol: boolean;
};

export const InfoPanel = (props: InfoPanelProps) => {
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
          {props.buildingIdol ? `${props.villagerPool}/${IDOL_COST}` : "+"}
        </button>
      </div>
    </>
  );
};
