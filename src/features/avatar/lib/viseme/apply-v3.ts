import gsap from "gsap";

import { VISEME_MAP } from "@/entities/viseme";
import { detectAudioStart } from "@/features/audio";

import { DEFAULT_DURATION } from "../../config";

const calculateDuration = (
  previous: VisemeStrict | undefined,
  current: VisemeStrict,
) => {
  if (!previous || previous.audio_offset < DEFAULT_DURATION.fall) {
    return [current.audio_offset, 0];
  }
  const gap = current.audio_offset - previous.audio_offset;
  const hold = gap - DEFAULT_DURATION.fall;
  if (hold > DEFAULT_DURATION.hold) {
    return [DEFAULT_DURATION.fall, 1];
  }
  return [DEFAULT_DURATION.fall, 0];
};

const applyVisemeFadeOut = (
  { viseme_id }: VisemeStrict,
  avatar: SkinnedMesh,
  delay: number,
  duration: number,
) => {
  const dict = avatar.morphTargetDictionary;
  const influences = avatar.morphTargetInfluences;

  for (const [key, value] of VISEME_MAP[viseme_id]) {
    const index = dict[key];

    gsap.to(influences, {
      [index]: 0,
      duration: duration / 1000,
      ease: "sine.inOut",
      delay: delay / 1000,
      overwrite: "auto",
    });
  }
};

const calculateAdjustment = (delay: number) => {
  if (delay < 8500) {
    return Math.floor(delay * 0.06) + 275;
  }
  return Math.floor(delay * 0.05) + 360;
  //   if (delay < 30000) {
  //     return Math.floor(delay * 0.03);
  //   }
  //   if (delay < 40000) {
  //     return Math.floor(delay * 0.025) + 150;
  //   }
  //   return Math.floor(delay * 0.02) + 350;
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

  const [duration, isSeperated] = calculateDuration(previous, current);
  const timeToStart = audioStartTime + current.audio_offset - duration;

  const delayToStart = timeToStart - performance.now();
  const adjustment = calculateAdjustment(delayToStart);
  const adjustedDelay = delayToStart - adjustment;

  for (const [key, value] of VISEME_MAP[current.viseme_id]) {
    const index = dict[key];

    gsap.to(influences, {
      [index]: value,
      duration: duration / 1000,
      ease: "sine.out",
      delay: adjustedDelay / 1000,
      overwrite: "auto",
    });
  }

  if (previous) {
    const timeToFadeOut = isSeperated
      ? audioStartTime + previous.audio_offset + DEFAULT_DURATION.hold
      : timeToStart;
    const delayToFade = timeToFadeOut - performance.now() - adjustment;
    applyVisemeFadeOut(previous, avatar, delayToFade, duration);
  }

  return () => {
    const delay = audioStartTime + current.audio_offset - performance.now();

    applyVisemeFadeOut(current, avatar, delay, DEFAULT_DURATION.fall);

    setTimeout(() => {
      detectAudioStart();
      console.debug("ℹ🔎 Detect audio start");
      for (let i = 0; i < influences.length; i++) {
        influences[i] = 0;
      }
    }, delay);
  };
};
