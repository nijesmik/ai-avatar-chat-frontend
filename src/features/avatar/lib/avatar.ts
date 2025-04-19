import { MORPH_TARGET } from "@/entities/morph-target";

const DURATION_CLOSING = 80;
const DURATION_OPENING = 120;

export const blinkEyes = (mesh: SkinnedMesh, ref: RefObject<number>) => {
  const index = mesh.morphTargetDictionary[MORPH_TARGET.eyesClosed];
  const influences = mesh.morphTargetInfluences;

  let startTime = performance.now();
  let phase: "closing" | "opening" = "closing";

  const animate = (now: number) => {
    const elapsed = now - startTime;

    if (phase === "closing") {
      const progress = Math.min(elapsed / DURATION_CLOSING, 1);
      influences[index] = progress;
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      } else {
        phase = "opening";
        startTime = now;
        ref.current = requestAnimationFrame(animate);
      }
    } else {
      const progress = Math.max(1 - elapsed / DURATION_OPENING, 0);
      influences[index] = progress;
      if (progress > 0) {
        ref.current = requestAnimationFrame(animate);
      } else {
        const delay = 3000 + Math.random() * 2000;
        setTimeout(() => blinkEyes(mesh, ref), delay);
      }
    }
  };

  ref.current = requestAnimationFrame(animate);
};
