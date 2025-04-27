import { AudioPlayer } from "@/features/audio";

import Chat from "./chat";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <Chat />
      <AudioPlayer />
    </main>
  );
}
