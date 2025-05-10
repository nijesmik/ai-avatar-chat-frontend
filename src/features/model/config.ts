export const MODELS = [
  {
    key: "gemma2-9b-it",
    label: "Gemma 2 9B 8k",
    speed: 70,
    accuracy: 30,
  },
  {
    key: "gemini-2.0-flash",
    label: "Gemini 2.0 Flash",
    speed: 40,
    accuracy: 60,
  },
  {
    key: "gemini-2.0-flash-lite",
    label: "Gemini 2.0 Flash-Lite",
    speed: 50,
    accuracy: 50,
  },
] satisfies {
  key: Model;
  label: string;
  speed: number;
  accuracy: number;
}[];
