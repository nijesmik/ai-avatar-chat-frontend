import { AudioPlayer } from "@/features/audio";
import { AvatarLoader } from "@/features/avatar";

import Chat from "./chat";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <Chat />
      <AudioPlayer />
      <AvatarLoader />
    </main>
  );
}
