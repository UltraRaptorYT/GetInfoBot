# Telegram Bot Vercel Template

A blank TypeScript template for running a Telegram bot as a Vercel
serverless webhook.

This project keeps only the general deployment shape inspired by BWMBot. It
does not include BWMBot's branding, puzzle content, images, database code, or
bot behavior.

## Requirements

- Node.js 20 or newer
- A Telegram bot token from [@BotFather](https://t.me/BotFather)
- A Vercel account

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add your bot token:

   ```env
   BOT_TOKEN=your_bot_token
   WEBHOOK_SECRET=
   ```

3. Start the bot with long polling and automatic restarts:

   ```bash
   npm run dev
   ```

The development process watches TypeScript files and restarts after changes.

Telegram allows only one active delivery method per bot. Local development
removes that bot's deployed webhook until you register it again. Using a
separate Telegram bot token for local development avoids interrupting the
production bot.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Add `BOT_TOKEN` in the project's environment variables.
3. Generate a random `WEBHOOK_SECRET` and add it as another environment
   variable.
4. Deploy the project.
5. Register the webhook, replacing all placeholder values:

   ```bash
   curl "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
     --data-urlencode "url=https://<PROJECT>.vercel.app/api/webhook" \
     --data-urlencode "secret_token=<WEBHOOK_SECRET>"
   ```

6. Open `https://<PROJECT>.vercel.app/` to verify the health endpoint.

## Customize

Add commands, actions, and message handlers in `src/bot.ts`. Keep secrets in
Vercel environment variables and never commit a real `.env` file.

## Useful checks

```bash
npm run typecheck
```
