import { create } from "zustand";

interface MessageState {
  messages: Message[];
}

interface MessageAction {
  addMessage: (...messages: Message[]) => void;
  addMessageChunk: (chunk: Chunk) => void;
}

type MessageStore = MessageState & MessageAction;

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],

  addMessage: (...newMessages) =>
    set((prev) => ({
      messages: [...prev.messages, ...newMessages],
    })),

  addMessageChunk: (chunk) =>
    set((prev) => {
      const messages = [...prev.messages];
      const lastIndex = messages.length - 1;
      const last = messages[lastIndex];
      last.content.chunks?.push(chunk);
      messages[lastIndex] = {
        ...last,
        time: chunk.time,
      }
      return { messages };
    }),
}));
