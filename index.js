require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({
  rest: {
    rejectOnRateLimit: ["/channels/:id/messages/:id/crosspost"],
  },
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

const waitEmoji = "🕐";
const hornEmoji = "📣";
const queue = [];

client.on("ready", () => {
  console.log("Bot is online!");
});

client.on("messageCreate", async (message) => {
  if (message.channel.id === process.env.CHANNEL_ID) {
    // Replace with the channel ID you want to monitor
    console.log(`Message received: ${message.id}`);
    try {
      await message.crosspost();
      await message.react(hornEmoji); // React with horn emoji
      console.log(`Message Crossposted: ${message.id}`);
    } catch (error) {
      console.error(`Error crossposting message: ${error}`);
      if (
        error.name === "RateLimitError[/channels/:id/messages/:id/crosspost]"
      ) {
        // Rate limit error
        console.error(`Rate limited! Adding message to queue: ${message.id}`);
        queue.push({ message: message, timestamp: Date.now() });
        await message.react(waitEmoji); // React with clock emoji
      } else {
      }
    }
  }
});

setInterval(async () => {
  const now = Date.now();
  for (let i = 0; i < queue.length; i++) {
    const queuedMessage = queue[i];

    if (!queuedMessage.crossposted) {
      try {
        await queuedMessage.message.crosspost();
        console.log(
          `Message Crossposted (recovered from queue): ${queuedMessage.message.id}`
        );
        await queuedMessage.message.reactions.cache.get(waitEmoji).remove(); // Remove clock emoji reaction
        await queuedMessage.message.react(hornEmoji); // React with horn emoji
        queue.splice(i, 1);
        queuedMessage.crossposted = true;
      } catch (error) {
        console.error(`Error crossposting queued message: ${error}`);
      }
    }
  }
}, 60000); // Check queue every 1 minute

client.login(process.env.DISCORD_TOKEN);
