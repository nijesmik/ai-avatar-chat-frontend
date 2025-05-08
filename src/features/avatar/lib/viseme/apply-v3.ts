import gsap from "gsap";

import { END_VISEME_ID, VISEME_MAP } from "@/entities/viseme";

import { DEFAULT_DURATION } from "../../config";

const calculateDuration = (
  previous: VisemeStrict | undefined,
  current: VisemeStrict,
) => {
  if (!previous) {
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

  const [duration, isSeperated] = calculateDuration(previous, current);
  const timeToStart = audioStartTime + current.audio_offset - duration;

  const delayToStart = timeToStart - performance.now();
  const adjustment = Math.floor(delayToStart * 0.02);

  for (const [key, value] of VISEME_MAP[current.viseme_id]) {
    const index = dict[key];

    gsap.to(influences, {
      [index]: value,
      duration: duration / 1000,
      ease: "sine.out",
      delay: (delayToStart - adjustment) / 1000,
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

  if (next.viseme_id === END_VISEME_ID) {
    applyVisemeFadeOut(
      current,
      avatar,
      audioStartTime + current.audio_offset - performance.now(),
      DEFAULT_DURATION.fall,
    );
  }
};
