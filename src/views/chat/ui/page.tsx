"use client";

import { AudioPlayer } from "@/features/audio";
import { Input } from "@/widgets/input";
import { Messages } from "@/widgets/messages";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="grid size-full grid-cols-1 grid-rows-[1fr_auto]">
        <Messages />
        <Input />
      </div>
      <AudioPlayer />
    </main>
  );
}
