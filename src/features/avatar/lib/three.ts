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

interface Material extends THREE.Material {
  map?: THREE.Texture;
  normalMap?: THREE.Texture;
  roughnessMap?: THREE.Texture;
  metalnessMap?: THREE.Texture;
  alphaMap?: THREE.Texture;
  emissiveMap?: THREE.Texture;
  envMap?: THREE.Texture;
}

const disposeMaterial = (m: Material) => {
  m.map?.dispose?.();
  m.normalMap?.dispose?.();
  m.roughnessMap?.dispose?.();
  m.metalnessMap?.dispose?.();
  m.alphaMap?.dispose?.();
  m.emissiveMap?.dispose?.();
  m.envMap?.dispose?.();
  m.dispose?.();
};

export const clearScene = (scene: THREE.Scene) => {
  scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;

      mesh.geometry?.dispose();

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(disposeMaterial);
      } else {
        disposeMaterial(mesh.material);
      }

      mesh.parent?.remove(mesh);
    }
  });
  scene.clear();
};
