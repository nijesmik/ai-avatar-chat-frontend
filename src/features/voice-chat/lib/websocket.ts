import { useMessageStore } from "@/entities/message";
import { useVisemeStore } from "@/entities/viseme";

import { answer, icecandidate, renegotiate } from "./signaling";

const viseme = (socket: Socket) => {
  const { queue } = useVisemeStore.getState();

  socket.off("viseme");
  socket.on("viseme", (viseme: Viseme) => {
    queue.enqueue(viseme);
  });
};

const message = (socket: Socket) => {
  socket.off("message");
  socket.on("message", (message: Message) => {
    const { addMessage } = useMessageStore.getState();
    addMessage(message);
  });
};

export const addEventHandler = {
  answer,
  icecandidate,
  renegotiate,
  viseme,
  message,
};

export const removeEventHandler = (socket: Socket) => {
  socket.off("answer");
  socket.off("ice-candidate");
  socket.off("renegotiate");
  socket.off("viseme");
  socket.off("message");
};
