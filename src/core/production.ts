import { VercelRequest, VercelResponse } from '@vercel/node';
import createDebug from 'debug';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { registerBotCommandMenu } from '../commands/botCommands';

const debug = createDebug('bot:dev');

const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;

const getWebhookUrl = () => {
  const domain =
    process.env.WEBHOOK_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!domain) {
    throw new Error(
      'Webhook URL is unavailable. Set WEBHOOK_URL in Vercel.',
    );
  }

  const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;
  return `${baseUrl.replace(/\/$/, '')}/api`;
};

const production = async (
  req: VercelRequest,
  res: VercelResponse,
  bot: Telegraf<Context<Update>>,
) => {
  const webhookUrl = getWebhookUrl();

  debug('Bot runs in production mode');
  debug(`setting webhook: ${webhookUrl}`);

  await registerBotCommandMenu(bot);

  const getWebhookInfo = await bot.telegram.getWebhookInfo();
  if (getWebhookInfo.url !== webhookUrl) {
    debug(`setting webhook: ${webhookUrl}`);
    await bot.telegram.setWebhook(webhookUrl);
  }

  if (req.method === 'POST') {
    await bot.handleUpdate(req.body as unknown as Update, res);
  } else {
    res.status(200).json('Listening to bot events...');
  }
  debug(`starting webhook on port: ${PORT}`);
};
export { production };
