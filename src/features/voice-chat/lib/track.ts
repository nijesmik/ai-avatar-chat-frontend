import { detectAudioStart, useAudioStore } from "@/features/audio";

const getRemoteStream = (event: RTCTrackEvent) => {
  return event.streams[0] || new MediaStream([event.track]);
};

export const ontrack = (event: RTCTrackEvent) => {
  console.debug("ontrack:", event);
  const { audioRef, createAudioContext } = useAudioStore.getState();
  if (!audioRef?.current) {
    console.error("❌ Audio is not set");
    return;
  }

  const remoteStream = getRemoteStream(event);
  const audioContext = createAudioContext(remoteStream);

  if (audioContext.state === "suspended") {
    audioContext.resume().then(() => {
      console.debug("✅ Audio context resumed");
    });
  }

  const audioElement = audioRef.current;
  audioElement.srcObject = remoteStream;
  audioElement.play().then(() => {
    console.debug("✅ Audio element playing");
    detectAudioStart();
  });

  event.track.onended = () => {
    audioElement.srcObject = null;
    console.debug("❌ Audio track ended");
  };
};
