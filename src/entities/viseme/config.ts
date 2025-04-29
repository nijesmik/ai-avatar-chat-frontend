export const END_VISEME_ID: EndVisemeId = -1 as const;

export const VISEME_MAP: Record<StandardVisemeId, [MorphTarget, number][]> = {
  0: [["viseme_sil", 1.0]],
  1: [
    ["viseme_aa", 0.5],
    ["mouthOpen", 0.4],
  ],
  2: [
    ["viseme_aa", 0.7],
    ["mouthOpen", 0.5],
  ],
  3: [
    ["viseme_O", 0.7],
    ["mouthOpen", 0.3],
  ],
  4: [
    ["viseme_E", 0.7],
    ["mouthOpen", 0.4],
  ],
  5: [
    ["viseme_RR", 0.6],
    ["mouthOpen", 0.3],
  ],
  6: [
    ["viseme_I", 0.6],
    ["mouthOpen", 0.3],
  ],
  7: [
    ["viseme_U", 0.7],
    ["mouthOpen", 0.2],
  ],
  8: [
    ["viseme_O", 0.7],
    ["mouthOpen", 0.3],
  ],
  9: [
    ["viseme_aa", 0.6],
    ["viseme_U", 0.3],
    ["mouthOpen", 0.3],
  ],
  10: [
    ["viseme_O", 0.6],
    ["viseme_I", 0.4],
    ["mouthOpen", 0.3],
  ],
  11: [
    ["viseme_aa", 0.6],
    ["viseme_I", 0.4],
    ["mouthOpen", 0.3],
  ],
  12: [["viseme_CH", 0.3]],
  13: [
    ["viseme_RR", 0.6],
    ["mouthOpen", 0.3],
  ],
  14: [
    ["viseme_nn", 0.6],
    ["mouthOpen", 0.2],
  ],
  15: [
    ["viseme_SS", 0.7],
    ["mouthOpen", 0.2],
  ],
  16: [
    ["viseme_CH", 0.6],
    ["mouthOpen", 0.3],
  ],
  17: [
    ["viseme_TH", 0.6],
    ["mouthOpen", 0.3],
  ],
  18: [
    ["viseme_FF", 0.7],
    ["mouthOpen", 0.2],
  ],
  19: [
    ["viseme_DD", 0.6],
    ["mouthOpen", 0.2],
  ],
  20: [
    ["viseme_kk", 0.7],
    ["mouthOpen", 0.2],
  ],
  21: [
    ["viseme_PP", 0.7],
    ["mouthOpen", 0.1],
  ],
} as const;
