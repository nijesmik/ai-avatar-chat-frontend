import { create } from "zustand";

interface ModelState {
  model: Model;
}

interface ModelAction {
  setModel: (model: Model) => void;
}

type ModelStore = ModelState & ModelAction;

export const useModelStore = create<ModelStore>((set) => ({
  model: "gemma2-9b-it",
  setModel: (model) => set({ model }),
}));
