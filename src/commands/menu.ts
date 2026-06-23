import { Context, Markup, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

const menu = () => async (ctx: Context) => {
  await ctx.reply(
    "Choose an option:",
    Markup.inlineKeyboard([
      [Markup.button.callback("About", "menu_about")],
      [Markup.button.callback("Help", "menu_help")],
    ]),
  );
};

const registerMenuActions = (bot: Telegraf<Context<Update>>) => {
  bot.action("menu_about", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("This is a Telegram bot template.");
  });

  bot.action("menu_help", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("Use /start to begin or /menu to open this menu.");
  });
};

export { menu, registerMenuActions };
