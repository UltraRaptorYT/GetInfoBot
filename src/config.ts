function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const config = {
  botToken: requiredEnvironmentVariable("BOT_TOKEN"),
  webhookSecret: process.env.WEBHOOK_SECRET?.trim() || undefined,
};
