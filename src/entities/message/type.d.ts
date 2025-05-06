type Role = "user" | "model";

interface Content {
  text: string;
  type: "speech" | "text";
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
