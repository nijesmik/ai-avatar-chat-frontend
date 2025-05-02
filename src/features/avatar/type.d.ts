type SkinnedMesh = import("three").SkinnedMesh & {
  morphTargetDictionary: Record<MorphTarget, number>;
  morphTargetInfluences: number[];
};

type Gender = "male" | "female";
