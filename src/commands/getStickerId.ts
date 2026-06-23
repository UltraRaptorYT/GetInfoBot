import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

const waitingForSticker = new Set<number>();

const getStickerId = () => async (ctx: Context) => {
  if (!ctx.from) {
    return;
  }

  waitingForSticker.add(ctx.from.id);
  await ctx.reply("Send me a sticker and I will return its file ID.");
};

const registerStickerIdHandler = (bot: Telegraf<Context<Update>>) => {
  bot.on("sticker", async (ctx) => {
    if (!waitingForSticker.delete(ctx.from.id)) {
      return;
    }

    await ctx.reply(`Sticker file ID:\n\n${ctx.message.sticker.file_id}`);
  });
};

export { getStickerId, registerStickerIdHandler };
