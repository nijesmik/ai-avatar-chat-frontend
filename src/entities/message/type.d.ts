type Role = "user" | "model";

interface Content {
  text: string;
  type: "speech" | "text"
}

interface Message {
  role: Role;
  content: Content;
  time: number;
}
