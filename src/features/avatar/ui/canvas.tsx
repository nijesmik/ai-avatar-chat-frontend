"use client";

import { memo, useEffect } from "react";

import { useAvatarBlink } from "../hook/avatar-blink";
import { useAvatarCanvas } from "../hook/avatar-canvas";
import { useVisemeAnimation } from "../hook/viseme-animation";
import { getAvatar } from "../lib/avatar";
import { useAvatarStore } from "../store";

const AvatarCanvas = () => {
  useVisemeAnimation();
  useAvatarBlink();
  const { canvasRef, sceneRef } = useAvatarCanvas();
  const modelMale = useAvatarStore((state) => state.defaultModelMale);
  const modelFemale = useAvatarStore((state) => state.defaultModelFemale);

  useEffect(() => {
    if (modelMale) {
      sceneRef.current.add(modelMale);
      const avatar = getAvatar(modelMale);
      useAvatarStore.getState().setAvatar(avatar);
    }
  }, [modelMale]);

  useEffect(() => {
    if (modelFemale) {
      modelFemale.visible = false;
      sceneRef.current.add(modelFemale);
    }
  }, [modelFemale]);

  return (
    <div className="flex aspect-square w-fit items-center justify-center overflow-hidden rounded-full border">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default memo(AvatarCanvas);
