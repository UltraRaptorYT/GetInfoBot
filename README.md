# BW Monastery Bot

Mid Autumn Festival Puzzle Hunt

## Before you start

First rename `.env.example` file to `.env` and fill in all necessary values.

```
BOT_TOKEN="<YOUR_BOT_API_TOKEN>"
WEBHOOK_URL="https://your-project.vercel.app"
```

## Start your local server

1. Install Node Packages

```bash
npm i
```

2. Start Node Packages

```bash
npm start
```

## Production

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Login to Vercel using Vercel CLI
```bash
vercel login
```

3. Deploy using Vercel CLI
```bash
vercel
```

4. To ensure deployment works, Turn off `Vercel Authentication`, Settings => Deployment Protection

## Template Examples

- `/start` demonstrates a basic command.
- `/menu` demonstrates inline buttons and callback actions.
- `/get_sticker_id` waits for a sticker and returns its Telegram file ID.
- `/send_sticker <file_id>` sends a sticker using a Telegram file ID.
- The Telegram slash-command menu is registered automatically when the bot
  starts locally or receives a production request.

Add new command files under `src/commands`, then add one entry to
`src/commands/botCommands.ts`. The command handler and Telegram slash-command
menu are registered automatically in both development and production.

## Demo

You can see a working version of the bot at [@bwmonastery_bot](https://t.me/bwmonastery_bot)
