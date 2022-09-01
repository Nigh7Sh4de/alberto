import * as pc from "playcanvas";

export default function () {
  let entity: pc.Entity;
  let app: pc.AppBase;

  const RaycastScript = pc.createScript("raycast")!;

  RaycastScript.prototype.initialize = function () {
    console.log("raycast initialized");
    entity = this.entity;
    app = this.app;

    // Add a mousedown event handler
    app.mouse.on(pc.EVENT_MOUSEDOWN, mouseDown);

    // Add touch event only if touch is available
    if (app.touch) {
      app.touch.on(pc.EVENT_TOUCHSTART, touchStart);
    }

    this.on("destroy", destroy);
  };

  function mouseDown(e: pc.MouseEvent) {
    doRaycast(e);
  }

  function touchStart(e: pc.TouchEvent) {
    // Only perform the raycast if there is one finger on the screen
    if (e.touches.length == 1) {
      doRaycast(e.touches[0]);
    }
    e.event.preventDefault();
  }

  function doRaycast(screenPosition: pc.Touch | pc.MouseEvent) {
    // The pc.Vec3 to raycast from
    var from = entity.getPosition();
    // The pc.Vec3 to raycast to
    var to = entity.camera!.screenToWorld(
      screenPosition.x,
      screenPosition.y,
      entity.camera!.farClip
    );

    // Raycast between the two points
    var result = app.systems.rigidbody!.raycastFirst(from, to);

    // If there was a hit, store the entity
    if (result) {
      var hitEntity = result.entity;
      console.log("hitEntity");
    }
  }

  function destroy() {
    app.mouse.off(pc.EVENT_MOUSEDOWN, mouseDown);

    // Add touch event only if touch is available
    if (app.touch) {
      app.touch.off(pc.EVENT_TOUCHSTART, touchStart);
    }
  }

  RaycastScript.prototype.update = function () {
    console.log("updating");
  };

  return RaycastScript;
}
