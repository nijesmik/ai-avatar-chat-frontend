interface Viseme {
  animation: string;
  audio_offset: number;
  viseme_id: StandardVisemeId | EndVisemeId;
}

interface VisemeStrict extends Viseme {
  viseme_id: StandardVisemeId;
}

type NonStandardVisemeId<T> = T extends StandardVisemeId ? never : T;

type EndVisemeId = NonStandardVisemeId<-1>;

type StandardVisemeId =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21;
