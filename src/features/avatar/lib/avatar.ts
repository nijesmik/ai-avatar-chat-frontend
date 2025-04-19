import { MORPH_TARGET } from "@/entities/morph-target";

const INTERVAL = 16;
const DURATION_CLOSING = 80;
const DURATION_OPENING = 120;

export const blinkEyes = (mesh: SkinnedMesh) => {
  const index = mesh.morphTargetDictionary[MORPH_TARGET.eyesClosed];
  const influences = mesh.morphTargetInfluences;

  let phase: "closing" | "opening" = "closing";
  let time = 0;

  const timer = setInterval(() => {
    if (phase === "closing") {
      time += INTERVAL;
      if (time >= DURATION_CLOSING) {
        phase = "opening";
        influences[index] = 1;
        return;
      }
      influences[index] = time / DURATION_CLOSING;
      return;
    }

    const value = influences[index] - INTERVAL / DURATION_OPENING;
    if (value <= 0) {
      influences[index] = value;
      clearInterval(timer);
      return;
    }
    influences[index] = value;
  }, INTERVAL);

  const delay = 3000 + Math.random() * 2000;
  setTimeout(() => blinkEyes(mesh), delay);
};
