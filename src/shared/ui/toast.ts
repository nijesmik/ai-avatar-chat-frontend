import { addToast } from "@heroui/react";

export const toast = {
  error: (message: string) =>
    addToast({
      description: message,
      color: "danger",
    }),
};
