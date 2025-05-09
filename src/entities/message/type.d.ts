type Role = "user" | "model" | "system";

interface Content {
  text: string;
  type: "speech" | "text" | "error";
  chunks?: Chunk[];
}

interface Message {
  role: Role;
  content: Content;
  time: number;
}

interface Chunk {
  text: string;
  time: number;
}
