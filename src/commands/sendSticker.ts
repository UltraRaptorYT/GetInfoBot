import { Context } from "telegraf";

const sendSticker = () => async (ctx: Context) => {
  if (!ctx.message || !("text" in ctx.message)) {
    return;
  }

  const stickerFileId = ctx.message.text.trim().split(/\s+/)[1];

  if (!stickerFileId) {
    await ctx.reply("Usage: /send_sticker <sticker_file_id>");
    return;
  }

  try {
    await ctx.replyWithSticker(stickerFileId);
  } catch {
    await ctx.reply("Unable to send that sticker. Check that the file ID is valid.");
  }
};

export { sendSticker };
