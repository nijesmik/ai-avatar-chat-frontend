"use client";

import { HeroUIProvider } from "@heroui/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};

export default Provider;
