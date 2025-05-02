import gsap from "gsap";
import { useEffect, useRef } from "react";

import { MORPH_TARGET } from "@/entities/morph-target";

import { useAvatarStore } from "../store";

const DURATION_CLOSING = 80;
const DURATION_OPENING = 120;

export const setBlink = (
  avatar: SkinnedMesh,
  ref: RefObject<SetTimeoutId | null>,
) => {
  const index = avatar.morphTargetDictionary[MORPH_TARGET.eyesClosed];
  const influences = avatar.morphTargetInfluences;

  gsap.to(influences, {
    [index]: 1,
    duration: DURATION_CLOSING / 1000,
    ease: "sine.inOut",
    delay: 0,
    overwrite: "auto",
  });

  gsap.to(influences, {
    [index]: 0,
    duration: DURATION_OPENING / 1000,
    ease: "sine.inOut",
    delay: DURATION_CLOSING / 1000,
    overwrite: "auto",
  });

  const delay = 3000 + Math.random() * 2000;
  ref.current = setTimeout(() => setBlink(avatar, ref), delay);
};

const cancelBlink = (ref: RefObject<SetTimeoutId | null>) => {
  if (ref.current) {
    clearTimeout(ref.current);
    ref.current = null;
  }
};

export const useAvatarBlink = () => {
  const blinkTimerRef = useRef<SetTimeoutId>(null);
  const avatar = useAvatarStore((state) => state.avatar);

  useEffect(() => {
    if (avatar) {
      cancelBlink(blinkTimerRef);
      setBlink(avatar, blinkTimerRef);
    }

    return () => {
      cancelBlink(blinkTimerRef);
    };
  }, [avatar]);
};
