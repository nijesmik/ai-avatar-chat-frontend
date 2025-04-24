type Role = "user" | "model";

interface Content {
  text: string;
}

interface Message {
  role: Role;
  content: Content;
}
