import { useVisemeStore } from "@/entities/viseme";

import { answer, icecandidate, renegotiate } from "./signaling";

const viseme = (socket: Socket) => {
  const { queue } = useVisemeStore.getState();

  socket.off("viseme");
  socket.on("viseme", (viseme: Viseme) => {
    queue.enqueue(viseme);
  });
};

export const addEventHandler = {
  answer,
  icecandidate,
  renegotiate,
  viseme,
};

export const removeEventHandler = (socket: Socket) => {
  socket.off("answer");
  socket.off("ice-candidate");
  socket.off("renegotiate");
  socket.off("viseme");
};
