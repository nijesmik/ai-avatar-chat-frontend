import * as THREE from "three";

type Axis = "x" | "y" | "z";

export const rotateChild = (
  parent: THREE.Object3D,
  childName: string,
  axis: Axis,
  value: number,
) => {
  const child = parent.getObjectByName(childName);
  if (child) {
    child.rotation[axis] = value;
  }
};

export const addLight = (
  scene: THREE.Scene,
  position: number[],
  intensity: number,
  color: THREE.ColorRepresentation = 0xffffff,
) => {
  const [x, y, z] = position;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(x, y, z).normalize();
  scene.add(light);
};
