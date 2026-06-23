import { Context } from "telegraf";
import createDebug from "debug";

const debug = createDebug("bot:start_command");

const start = () => async (ctx: Context) => {
  const message = `Hello, this is a bot template!`;
  debug(`Triggered "start" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: "Markdown" });
};

export { start };
