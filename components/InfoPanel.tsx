import useVillagesContext from "../hooks/Villages";
import styles from "./Map.module.css";

export type InfoPanelProps = {
  name: string;
  villagers: number;
  scholars: number;
  idols: number;
};

export const InfoPanel = (props: InfoPanelProps) => {
  return (
    <>
      <div>{props.name}</div>
      <div>Villagers: {props.villagers}</div>
      <div>Scholars: {props.scholars}</div>
      <div>Idols: {props.idols}</div>
    </>
  );
};
