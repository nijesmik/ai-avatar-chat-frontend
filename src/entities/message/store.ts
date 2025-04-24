import { create } from "zustand";

interface MessageState {
  messages: Message[];
}

type MessageStore = MessageState;

export const useMessageStore = create<MessageStore>()((set) => ({
  messages: [],
}));
