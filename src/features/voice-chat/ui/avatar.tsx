"use client";

import { Spinner } from "@heroui/react";
import { twMerge } from "tailwind-merge";

import AvatarCanvas from "@/features/avatar";

import { useVoiceChatStore } from "../store";

const Avatar = () => {
  const isConnected = useVoiceChatStore((state) => state.isConnected);

  return (
    <div className="relative">
      <div
        className={twMerge(
          "bg-background transition-background absolute size-full opacity-50 duration-500",
          isConnected && "bg-transparent",
        )}
      />
      {!isConnected && (
        <Spinner
          className="absolute top-1/2 left-1/2 -translate-1/2"
          color="primary"
          size="lg"
          variant="spinner"
        />
      )}
      <AvatarCanvas />
    </div>
  );
};

export default Avatar;
