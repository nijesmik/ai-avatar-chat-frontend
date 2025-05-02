import type { Object3D } from "three";
import { create } from "zustand";

import { getAvatar } from "./lib/avatar";

interface AvatarState {
  defaultModelMale: Object3D | null;
  defaultModelFemale: Object3D | null;
  gender: Gender;

  avatar: SkinnedMesh | null;
  visemeAnimationRef: RefObject<number> | null;
}

interface AvatarAction {
  setModel: (avatar: Object3D, gender: Gender) => void;
  setGender: (gender: Gender) => boolean;
  setVisemeAnimationRef: (ref: RefObject<number>) => void;
  setAvatar: (avatar: SkinnedMesh) => void;
}

type AvatarStore = AvatarState & AvatarAction;

export const useAvatarStore = create<AvatarStore>((set, get) => ({
  defaultModelMale: null,
  defaultModelFemale: null,
  gender: "male",

  avatar: null,
  visemeAnimationRef: null,

  setModel: (model, gender) => {
    if (gender === "male") {
      return set({ defaultModelMale: model });
    }
    if (gender === "female") {
      return set({ defaultModelFemale: model });
    }
  },

  setGender: (gender) => {
    const { defaultModelMale, defaultModelFemale } = get();
    if (!defaultModelMale || !defaultModelFemale) {
      return false;
    }
    defaultModelMale.visible = gender === "male";
    defaultModelFemale.visible = gender === "female";
    const model = gender === "male" ? defaultModelMale : defaultModelFemale;
    const avatar = getAvatar(model);
    set({ gender, avatar });
    return true;
  },

  setVisemeAnimationRef: (visemeAnimationRef) => set({ visemeAnimationRef }),
  setAvatar: (avatar) => set({ avatar }),
}));
