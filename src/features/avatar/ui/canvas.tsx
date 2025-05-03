"use client";

import { memo, useEffect } from "react";
import type { Object3D, Scene } from "three";

import { useAvatarBlink } from "../hook/avatar-blink";
import { useAvatarCanvas } from "../hook/avatar-canvas";
import { useVisemeAnimation } from "../hook/viseme-animation";
import { getAvatar } from "../lib/avatar";
import { useAvatarStore } from "../store";

const useAvatar = (scene: Scene, model: Object3D | null, gender: Gender) => {
  useEffect(() => {
    const { gender: selected, setAvatar } = useAvatarStore.getState();

    if (model) {
      scene.add(model);
      model.visible = selected === gender;
      if (model.visible) {
        const avatar = getAvatar(model);
        setAvatar(avatar);
      }
    }

    return () => {
      if (model) {
        scene.remove(model);
      }
    };
  }, [model]);
};

const AvatarCanvas = () => {
  useVisemeAnimation();
  useAvatarBlink();
  const { canvasRef, sceneRef } = useAvatarCanvas();
  const modelMale = useAvatarStore((state) => state.defaultModelMale);
  const modelFemale = useAvatarStore((state) => state.defaultModelFemale);
  useAvatar(sceneRef.current, modelMale, "male");
  useAvatar(sceneRef.current, modelFemale, "female");

  return (
    <div className="flex aspect-square w-fit items-center justify-center overflow-hidden rounded-full border">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default memo(AvatarCanvas);
