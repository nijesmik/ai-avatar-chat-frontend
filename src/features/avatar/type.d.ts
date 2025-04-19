type SkinnedMesh = import("three").SkinnedMesh & {
  morphTargetDictionary: Record<MorphTarget, number>;
  morphTargetInfluences: number[];
};
