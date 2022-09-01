import * as pc from "playcanvas";

import RaycastScript from "./scripts/raycast";

function buildScript(name: string) {
  return {
    name: name,
    url: `scripts/${name}.ts`,
  };
}

// create a PlayCanvas application
const canvas = document.getElementById("application")!;
var app = new pc.fw.Application(canvas, {
  mouse: new pc.input.Mouse(canvas),
  keyboard: new pc.input.Keyboard(canvas),
  touch: new pc.input.TouchDevice(canvas),
});

// fill the available space at full resolution
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// ensure canvas is resized when window changes size
window.addEventListener("resize", () => app.resizeCanvas());

console.log("App start");
app.start();

// create box entity
const box = new pc.Entity("cube");
box.addComponent("model", {
  type: "box",
});
app.mouse.on("click", (...args) => {
  console.log("box click", args);
});
app.root.addChild(box);

// create camera entity
const camera = new pc.Entity("camera");
camera.addComponent("camera", {
  clearColor: new pc.Color(0.1, 0.1, 0.1),
});
console.log("adding raycast");
app.root.addChild(camera);
camera.setPosition(0, 0, 3);
camera.addComponent("script", {
  enabled: true,
  scripts: [RaycastScript()],
});

// create directional light entity
const light = new pc.Entity("light");
light.addComponent("light");
app.root.addChild(light);
light.setEulerAngles(45, 0, 0);

// rotate the box according to the delta time since the last frame
app.on("update", (dt) => box.rotate(10 * dt, 20 * dt, 30 * dt));
