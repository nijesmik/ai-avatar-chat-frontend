import gsap from "gsap";

import { END_VISEME_ID, VISEME_MAP } from "@/entities/viseme";

import { DEFAULT_DURATION, MAX_DURATION } from "../../config";

const RATIO =
  DEFAULT_DURATION.fall / (MAX_DURATION.hold + DEFAULT_DURATION.fall);

const calculateDuration = (current: VisemeStrict | undefined, next: Viseme) => {
  if (!current) {
    return [next.audio_offset, 0];
  }
  if (next.viseme_id === END_VISEME_ID) {
    return [DEFAULT_DURATION.fall, DEFAULT_DURATION.hold];
  }

  const gap = next.audio_offset - current.audio_offset;
  const hold = gap - DEFAULT_DURATION.fall;

  if (hold > MAX_DURATION.hold) {
    const fall = Math.floor(gap * RATIO);
    return [fall, gap - fall];
  }
  return [DEFAULT_DURATION.fall, hold];
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
  next: Viseme;
  audioStartTime: number;
}) => {
  const dict = avatar.morphTargetDictionary;
  const influences = avatar.morphTargetInfluences;

  const [rise] = calculateDuration(previous, current);
  const timeToStart = audioStartTime + current.audio_offset - rise;

  const [fall, hold] = calculateDuration(current, next);
  const timeToFadeOut = audioStartTime + current.audio_offset + hold;

  const now = performance.now();
  const delayToStart = timeToStart - now;
  const delayToFade = timeToFadeOut - now;

  for (const [key, value] of VISEME_MAP[current.viseme_id]) {
    const index = dict[key];

    gsap.to(influences, {
      [index]: value,
      duration: rise / 1000,
      ease: "sine.out",
      delay: delayToStart / 1000,
      overwrite: "auto",
    });

    gsap.to(influences, {
      [index]: 0,
      duration: fall / 1000,
      ease: "sine.inOut",
      delay: delayToFade / 1000,
      overwrite: "auto",
    });
  }
};
