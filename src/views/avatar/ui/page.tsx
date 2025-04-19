"use client";

import AvatarCanvas from "@/features/avatar";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="flex h-full w-full items-center justify-center">
        <AvatarCanvas />
      </div>
    </main>
  );
}
