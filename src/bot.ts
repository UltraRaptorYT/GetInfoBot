import { Telegraf } from "telegraf";

import { config } from "./config";

export const bot = new Telegraf(config.botToken);

bot.start(async (ctx) => {
  await ctx.reply("Welcome!");
});

bot.command("help", async (ctx) => {
  await ctx.reply("Available commands:\n/start\n/help\n/about");
});

bot.command("about", async (ctx) => {
  await ctx.reply("This is my Telegram bot.");
});

// Respond to ordinary text
bot.on("text", async (ctx) => {
  const message = ctx.message.text;

  if (message.toLowerCase() === "hello") {
    await ctx.reply("Hello!");
  }
});

bot.command("menu", async (ctx) => {
  await ctx.reply("Choose an option:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "About", callback_data: "show_about" }],
        [{ text: "Help", callback_data: "show_help" }],
      ],
    },
  });
});

bot.action("show_about", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("About this bot");
});

export async function registerBotCommands(): Promise<void> {
  await bot.telegram.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Show help" },
    { command: "about", description: "About the bot" },
    { command: "menu", description: "Show menu" },
  ]);
}

bot.catch((error) => {
  console.error("Telegram bot error:", error);
});
