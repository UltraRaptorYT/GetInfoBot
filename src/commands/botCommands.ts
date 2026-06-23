import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

import { getStickerId } from "./getStickerId";
import { menu } from "./menu";
import { sendSticker } from "./sendSticker";
import { start } from "./start";

const botCommands = [
  {
    command: "start",
    description: "Start the bot",
    handler: start(),
  },
  {
    command: "menu",
    description: "Open the example menu",
    handler: menu(),
  },
  {
    command: "get_sticker_id",
    description: "Get a sticker file ID",
    handler: getStickerId(),
  },
  {
    command: "send_sticker",
    description: "Send a sticker by file ID",
    handler: sendSticker(),
  },
];

const registerBotCommands = (bot: Telegraf<Context<Update>>) => {
  for (const command of botCommands) {
    bot.command(command.command, command.handler);
  }
};

const registerBotCommandMenu = async (bot: Telegraf<Context<Update>>) => {
  await bot.telegram.setMyCommands(
    botCommands.map(({ command, description }) => ({
      command,
      description,
    })),
  );
};

export { registerBotCommandMenu, registerBotCommands };
