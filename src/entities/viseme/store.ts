import { create } from "zustand";

import { Queue } from "./lib/queue";

interface VisemeState {
  queue: Queue<Viseme>;
}

type VisemeStore = VisemeState;

export const useVisemeStore = create<VisemeStore>(() => ({
  queue: new Queue<Viseme>(),
}));
