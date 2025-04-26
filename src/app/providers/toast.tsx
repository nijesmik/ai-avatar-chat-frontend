"use client";

import { ToastProvider as HeroUIToastProvider } from "@heroui/react";

const ToastProvider = () => {
  return <HeroUIToastProvider placement="top-center" toastOffset={24} />;
};

export default ToastProvider;
