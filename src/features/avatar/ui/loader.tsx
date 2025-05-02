"use client";

import { useEffect } from "react";
import type { Object3D } from "three";
import { GLTFLoader } from "three/addons";

import { rotateChild } from "../lib/three";
import { useAvatarStore } from "../store";

const rotateArm = (model: Object3D) => {
  rotateChild(model, "LeftArm", "x", Math.PI / 2.2);
  rotateChild(model, "RightArm", "x", Math.PI / 2.2);
};

export const AvatarLoader = () => {
  useEffect(() => {
    const loader = new GLTFLoader();
    const { setModel } = useAvatarStore.getState();

    loader.load("/avatar-male.glb", (gltf) => {
      const model = gltf.scene.children[0];
      rotateArm(model);
      setModel(model, "male");
    });

    loader.load("/avatar-female.glb", (gltf) => {
      const model = gltf.scene.children[0];
      model.position.y += 0.1;
      rotateArm(model);
      setModel(model, "female");
    });
  }, []);

  return null;
};
