"use client";

import { Button } from "@heroui/react";
import { AudioLines, Mic, MicOff, X } from "lucide-react";
import { useCallback, useState } from "react";

import { AudioPlayer } from "@/features/audio";
import AvatarCanvas from "@/features/avatar";
import { useVoiceChatConnect, useVoiceChatStore } from "@/features/voice-chat";

const ButtonToggleMute = () => {
  const { isMuted, toggleMute } = useVoiceChatStore();

  return (
    <Button
      onPress={toggleMute}
      color={isMuted ? "danger" : "secondary"}
      isIconOnly
    >
      {isMuted ? <MicOff /> : <Mic />}
    </Button>
  );
};

const ButtonStartConversation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected, connect, disconnect } = useVoiceChatConnect();

  const handleClick = useCallback(() => {
    if (!isConnected) {
      setIsLoading(true);
      connect();
    } else {
      setIsLoading(false);
      disconnect();
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <Button
        onPress={handleClick}
        isLoading={isLoading}
        isIconOnly
        color="primary"
      >
        <AudioLines />
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <ButtonToggleMute />
      <Button onPress={handleClick} isIconOnly color="primary">
        <X />
      </Button>
    </div>
  );
};

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <AvatarCanvas />
        <ButtonStartConversation />
        <AudioPlayer />
      </div>
    </main>
  );
}
