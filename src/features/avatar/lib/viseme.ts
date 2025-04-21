import gsap from "gsap";

import { VISEME_ID_END, VISEME_MAP, useVisemeStore } from "@/entities/viseme";
import { detectAudioStart } from "@/features/audio";

import { useAvatarStore } from "../store";

const DURATION = {
  rise: 40,
  hold: 15,
  fall: 50,
};

interface _Viseme extends Viseme {
  viseme_id: Exclude<VisemeId, VisemeIdEnd>;
}

const applyViseme = (
  avatar: SkinnedMesh,
  { viseme_id, audio_offset }: _Viseme,
  audioStartTime: number,
) => {
  const dict = avatar.morphTargetDictionary;
  const influences = avatar.morphTargetInfluences;

  const timeToStart = audioStartTime + audio_offset - DURATION.rise;
  const timeToFadeOut = audioStartTime + audio_offset + DURATION.hold;

  for (const [key, value] of VISEME_MAP[viseme_id]) {
    const index = dict[key];

    const now = performance.now();
    const delayToStart = timeToStart - now;
    const delayToFade = timeToFadeOut - now;

    const riseDuration = DURATION.rise + Math.min(delayToStart, 0);
    const fallDuration = DURATION.fall + Math.min(delayToFade, 0);

    if (riseDuration > 0) {
      gsap.to(influences, {
        [index]: value,
        duration: riseDuration / 1000,
        ease: "sine.out",
        delay: Math.max(delayToStart, 0) / 1000,
        overwrite: "auto",
      });
    }

    if (fallDuration > 0) {
      gsap.to(influences, {
        [index]: 0,
        duration: fallDuration / 1000,
        ease: "sine.in",
        delay: Math.max(delayToFade, 0) / 1000,
        overwrite: "auto",
      });
    }
  }
};

const shouldApplyViseme = (v: Viseme): v is _Viseme => {
  return v.viseme_id !== VISEME_ID_END;
};

export const processViseme = () => {
  const now = performance.now();
  const { queue } = useVisemeStore.getState();
  const { avatar, visemeAnimationRef } = useAvatarStore.getState();

  if (!avatar || !visemeAnimationRef) {
    return;
  }

  const process = () => {
    if (queue.isEmpty()) {
      visemeAnimationRef.current = requestAnimationFrame(process);
    } else {
      const viseme = queue.dequeue();
      if (shouldApplyViseme(viseme)) {
        applyViseme(avatar, viseme, now);
        visemeAnimationRef.current = requestAnimationFrame(process);
      } else {
        console.debug("🪫 queue is empty");
        queue.clear();
        visemeAnimationRef.current = -1;
        setTimeout(() => detectAudioStart(), 3000); // TODO: remove
      }
    }
  };

  process();
};
