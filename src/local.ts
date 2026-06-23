import dotenv from "dotenv";
import type { Telegraf } from "telegraf";

dotenv.config({ path: ".env.local" });
dotenv.config();

let runningBot: Telegraf | undefined;

async function start(): Promise<void> {
  const { bot, registerBotCommands } = await import("./bot");
  runningBot = bot;

  await bot.telegram.deleteWebhook();
  await registerBotCommands();
  await bot.launch();

  console.log("Bot started locally using long polling.");
}

void start();

process.once("SIGINT", () => runningBot?.stop("SIGINT"));
process.once("SIGTERM", () => runningBot?.stop("SIGTERM"));
