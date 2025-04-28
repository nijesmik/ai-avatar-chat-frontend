import gsap from "gsap";

import { VISEME_ID_END, VISEME_MAP, useVisemeStore } from "@/entities/viseme";
import { detectAudioStart } from "@/features/audio";

import { useAvatarStore } from "../store";

const DEFAULT_DURATION_FALL = 60;
const DEFAULT_DURATION = {
  rise: DEFAULT_DURATION_FALL - 10,
  hold: 80,
  fall: DEFAULT_DURATION_FALL,
};

interface _Viseme extends Viseme {
  viseme_id: Exclude<VisemeId, VisemeIdEnd>;
}

const calculateDuration = (gap: number, baseDuration: number) => {
  if (gap <= baseDuration - 10) {
    return gap;
  }
  if (gap < 80) {
    return baseDuration - 10;
  }
  if (gap < 150) {
    return baseDuration;
  }
  if (gap < 250) {
    return baseDuration + 10;
  }
  return baseDuration + 20;
}

const calculateRise = (current: Viseme, previous?: Viseme) => {
  if (!previous) {
    return DEFAULT_DURATION.rise;
  }

  const gap = current.audio_offset - previous.audio_offset;
  return calculateDuration(gap, DEFAULT_DURATION.rise);
};

const calculateFall = (current: Viseme, next?: Viseme) => {
  if (!next || next.viseme_id === VISEME_ID_END) {
    return DEFAULT_DURATION.fall;
  }

  const gap = next.audio_offset - current.audio_offset;
  return calculateDuration(gap, DEFAULT_DURATION.fall);
};

const calculateHold = (
  current: Viseme,
  next: Viseme | undefined,
  fall: number,
) => {
  if (!next || next.viseme_id === VISEME_ID_END) {
    return DEFAULT_DURATION.hold;
  }

  const gap = next.audio_offset - current.audio_offset;
  const hold = Math.max(0, gap - fall);
  return Math.min(hold, DEFAULT_DURATION.hold);
};

const applyViseme = ({
  avatar,
  previous,
  current,
  next,
  audioStartTime,
}: {
  avatar: SkinnedMesh;
  previous?: Viseme;
  current: _Viseme;
  next?: Viseme;
  audioStartTime: number;
}) => {
  const dict = avatar.morphTargetDictionary;
  const influences = avatar.morphTargetInfluences;

  const rise = calculateRise(current, previous);
  const timeToStart = audioStartTime + current.audio_offset - rise;
  const fall = calculateFall(current, next);
  const hold = calculateHold(current, next, fall);
  const timeToFadeOut = audioStartTime + current.audio_offset + hold;

  for (const [key, value] of VISEME_MAP[current.viseme_id]) {
    const index = dict[key];

    const now = performance.now();
    const delayToStart = timeToStart - now;
    const delayToFade = timeToFadeOut - now;

    const riseDuration = rise + Math.min(delayToStart, 0);
    const fallDuration = fall + Math.min(delayToFade, 0);

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
        ease: "sine.inOut",
        delay: Math.max(delayToFade, 0) / 1000,
        overwrite: "auto",
      });
    }
  }
};

const shouldApplyViseme = (v: Viseme): v is _Viseme => {
  return v.viseme_id !== VISEME_ID_END;
};

const setDetectAudio = (audioStartTime: number, lastViseme: Viseme) => {
  const time =
    performance.now() -
    audioStartTime +
    lastViseme.audio_offset +
    DEFAULT_DURATION.hold +
    DEFAULT_DURATION.fall;

  setTimeout(() => detectAudioStart(), time);
};

export const processViseme = () => {
  const start = performance.now();
  const { queue } = useVisemeStore.getState();
  const { avatar, visemeAnimationRef } = useAvatarStore.getState();

  if (!avatar || !visemeAnimationRef) {
    return;
  }

  let prevViseme: Viseme;

  const process = () => {
    if (queue.isEmpty()) {
      visemeAnimationRef.current = requestAnimationFrame(process);
    } else {
      const viseme = queue.dequeue();
      if (shouldApplyViseme(viseme)) {
        applyViseme({
          avatar,
          current: viseme,
          previous: prevViseme,
          next: queue.peek(),
          audioStartTime: start,
        });
        prevViseme = viseme;
        visemeAnimationRef.current = requestAnimationFrame(process);
      } else {
        queue.clear();
        visemeAnimationRef.current = -1;
        setDetectAudio(start, prevViseme);
      }
    }
  };

  process();
};
