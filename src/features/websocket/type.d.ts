interface WebsocketResponse {
  status: "ok" | string;
  code: number;
  message: string;
  time: number;
}
