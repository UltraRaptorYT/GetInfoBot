import type { IncomingMessage, ServerResponse } from "node:http";

export default function health(
  _request: IncomingMessage,
  response: ServerResponse,
): void {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ ok: true, service: "telegram-bot" }));
}
