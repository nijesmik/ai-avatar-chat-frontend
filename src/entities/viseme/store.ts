import { create } from "zustand";

import { Queue } from "./lib/queue";
import { TestQueue } from "./lib/queue.test";

interface VisemeState {
  queue: Queue<Viseme>;
}

type VisemeStore = VisemeState;

export const useVisemeStore = create<VisemeStore>(() => ({
  queue: new TestQueue(), // TODO: replace with Queue
}));
