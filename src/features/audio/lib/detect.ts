import { processViseme } from "@/features/avatar";

import { useAudioStore } from "../store";

const THRESHOLD = 1;

export const detectAudioStart = () => {
  const { analyser, detectRef } = useAudioStore.getState();
  if (!analyser || !detectRef) {
    return;
  }

  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  const detect = () => {
    analyser.getByteTimeDomainData(dataArray);

    const rootMeanSquare = Math.sqrt(
      dataArray.reduce((sum, v) => sum + (v - 128) ** 2, 0) / dataArray.length,
    );

    if (rootMeanSquare > THRESHOLD) {
      processViseme();
      detectRef.current = -1;
      return;
    }

    detectRef.current = requestAnimationFrame(detect);
  };

  detect();
};
