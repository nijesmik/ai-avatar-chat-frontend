import { create } from "zustand";

import { useMessageStore } from "@/entities/message";
import { useWebSocketStore } from "@/features/websocket";

interface InputState {
  value: string;
  locked: boolean;
}

interface InputAction {
  setValue: (value: string) => void;
  sendMessage: () => void;
}

type InputStore = InputState & InputAction;

export const useInputStore = create<InputStore>((set, get) => ({
  value: "",
  locked: false,

  setValue: (value) => set({ value }),
  sendMessage: () => {
    const { isConnected, socket } = useWebSocketStore.getState();
    const { value, locked } = get();
    const text = value.trim();
    if (locked || !text || !isConnected) {
      return;
    }
    set({ value: "", locked: true });
    useMessageStore.getState().addMessage(
      {
        role: "user",
        content: {
          text,
          type: "text",
        },
        time: Date.now(),
      },
      {
        role: "model",
        content: {
          text: "",
          type: "text",
          chunks: [],
        },
        time: Date.now() + 1,
      },
    );
    socket.emit("message", { text });
    setTimeout(() => {
      set({ locked: false });
    }, 1000);
  },
}));
