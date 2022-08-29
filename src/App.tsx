import React, { MouseEvent, useState } from "react";
import "./App.css";

enum Team {
  BLUE,
  RED,
}

function App() {
  const [villages, setVillages] = useState({} as any);
  const onMouseDown = (e: MouseEvent) => {
    console.log("onMouseDown", e);
    const mX = Math.floor(e.clientX / 80);
    const mY = Math.floor(e.clientY / 80);
    if (villages[_.position(x,y)]))
    setVillages({
      ...villages,
      [`${mX},${mY}`]: <Village pop={1} team={Team.BLUE} position={[mX, mY]} />,
    });
  };
  return (
    <div onMouseDown={onMouseDown} className="game-container">
      {Object.values(villages)}
    </div>
  );
}

type VillageProps = {
  position: [number, number];
  pop: number;
  team: Team;
};
function Village(props: VillageProps) {
  const style = {
    background: _.teamColor(props.team),
    position: "absolute",
    left: props.position[0] * 80,
    top: props.position[1] * 80,
    width: props.pop * 10,
    height: props.pop * 10,
  } as React.CSSProperties;
  console.log("Village", style);
  return <div style={style}></div>;
}

class _ {
  static teamColor(t: Team) {
    switch (t) {
      case Team.BLUE:
        return "#0000ff";
      case Team.RED:
        return "#ff0000";
      default:
        return "#ffffff";
    }
  }
  static position(x: number, y: number) {
    return `${x},${y}`;
  }
}

export default App;
