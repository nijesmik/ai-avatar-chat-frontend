import { Object3D } from "three";

export const getAvatar = (model: Object3D) => {
  return model.getObjectByName("Wolf3D_Avatar") as SkinnedMesh;
};
