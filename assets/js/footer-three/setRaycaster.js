import { Vector2, Raycaster } from "three";

export default function setRaycaster({ scene, camera, eventObject, onClick }) {
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  let isDragging = false;

  eventObject.addEventListener("mousedown", () => (isDragging = false));
  eventObject.addEventListener("mousemove", () => (isDragging = true));
  eventObject.addEventListener("click", (e) => {
    if (isDragging) return;

    const rect = eventObject.getBoundingClientRect();

    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    for (const item of intersects) {
      if (item.object.isMesh) {
        if (onClick) onClick(item.object);
        break;
      }
    }
  });
}
