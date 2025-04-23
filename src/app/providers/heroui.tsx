"use client";

import { HeroUIProvider } from "@heroui/react";

import Toaster from "./toast";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <Toaster />
      {children}
    </HeroUIProvider>
  );
};

export default Provider;
