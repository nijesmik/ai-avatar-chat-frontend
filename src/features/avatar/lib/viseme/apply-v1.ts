import gsap from "gsap";

import { END_VISEME_ID, VISEME_MAP } from "@/entities/viseme";

import { DEFAULT_DURATION } from "../../config";

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
};

const calculateRise = (current: VisemeStrict, previous?: VisemeStrict) => {
  if (!previous) {
    return DEFAULT_DURATION.rise;
  }

  const gap = current.audio_offset - previous.audio_offset;
  return calculateDuration(gap, DEFAULT_DURATION.rise);
};

const calculateFall = (current: VisemeStrict, next?: Viseme) => {
  if (!next || next.viseme_id === END_VISEME_ID) {
    return DEFAULT_DURATION.fall;
  }

  const gap = next.audio_offset - current.audio_offset;
  return calculateDuration(gap, DEFAULT_DURATION.fall);
};

const calculateHold = (
  current: VisemeStrict,
  next: Viseme | undefined,
  fall: number,
) => {
  if (!next || next.viseme_id === END_VISEME_ID) {
    return DEFAULT_DURATION.hold;
  }

  const gap = next.audio_offset - current.audio_offset;
  const hold = Math.max(0, gap - fall);
  return Math.min(hold, DEFAULT_DURATION.hold);
};

export const applyViseme = ({
  avatar,
  previous,
  current,
  next,
  audioStartTime,
}: {
  avatar: SkinnedMesh;
  previous?: VisemeStrict;
  current: VisemeStrict;
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

export const shouldApplyViseme = (v: Viseme): v is VisemeStrict => {
  return v.viseme_id !== END_VISEME_ID;
};
