import { create } from "zustand";

import { Queue } from "./lib/queue";

interface VisemeState {
  queue: Queue<Viseme>;
}

interface VisemeAction {
  clear: () => void;
}

type VisemeStore = VisemeState & VisemeAction;

export const useVisemeStore = create<VisemeStore>((set) => ({
  queue: new Queue<Viseme>(),

  clear: () => set({ queue: new Queue<Viseme>() }),
}));
