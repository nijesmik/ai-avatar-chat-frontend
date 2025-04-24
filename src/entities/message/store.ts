import { create } from "zustand";

interface MessageState {
  messages: Message[];
}

interface MessageAction {
  addMessage: (message: Message) => void;
}

type MessageStore = MessageState & MessageAction;

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],

  addMessage: (message) =>
    set((prev) => ({
      messages: [...prev.messages, message],
    })),
}));
