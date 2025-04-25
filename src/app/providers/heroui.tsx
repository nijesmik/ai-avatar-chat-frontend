"use client";

import { HeroUIProvider } from "@heroui/react";
import dynamic from "next/dynamic";

const ToastProvider = dynamic(() => import("./toast"), {
  ssr: false,
});

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
};

export default Provider;
