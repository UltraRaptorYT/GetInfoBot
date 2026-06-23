import type { IncomingMessage, ServerResponse } from "node:http";
import type { Update } from "telegraf/types";

import { bot, registerBotCommands } from "../src/bot";
import { config } from "../src/config";

type WebhookRequest = IncomingMessage & {
  body?: unknown;
};

const commandRegistration = registerBotCommands();

export default async function webhook(
  request: WebhookRequest,
  response: ServerResponse,
): Promise<void> {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (
    config.webhookSecret &&
    request.headers["x-telegram-bot-api-secret-token"] !==
      config.webhookSecret
  ) {
    sendJson(response, 401, { error: "Invalid webhook secret" });
    return;
  }

  try {
    await commandRegistration;
    await bot.handleUpdate(request.body as Update);
    sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error("Failed to process Telegram update:", error);
    sendJson(response, 500, { ok: false });
  }
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  body: object,
): void {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
}
