import { create } from "zustand";

interface AvatarState {
  avatar: SkinnedMesh;
  visemeAnimationRef: RefObject<number>;
}

interface AvatarAction {
  initialize: (state: AvatarState) => void;
}

type AvatarStore = {
  [K in keyof AvatarState]: AvatarState[K] | null;
} & AvatarAction;

export const useAvatarStore = create<AvatarStore>((set) => ({
  avatar: null,
  visemeAnimationRef: null,

  initialize: ({ avatar, visemeAnimationRef }) =>
    set({ avatar, visemeAnimationRef }),
}));
