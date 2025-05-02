import { useEffect, useRef } from "react";

import { cancelAnimation } from "@/shared/lib";

import { useAvatarStore } from "../store";

export const useVisemeAnimation = () => {
  const visemeAnimationRef = useRef<number>(-1);

  useEffect(() => {
    useAvatarStore.getState().setVisemeAnimationRef(visemeAnimationRef);
  }, []);

  return () => {
    cancelAnimation(visemeAnimationRef);
  };
};
