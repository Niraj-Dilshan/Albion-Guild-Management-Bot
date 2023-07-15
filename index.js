const { Client, Events, Partials, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config/config');
const colors = require("colors");
const { fetchReactions } = require('./commands/slash/General/avatemplate');
const initializeDatabase = require('./database/database');
const mongoose = initializeDatabase();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,

  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent
  ],
  presence: {
    activities: [{
      name: "Thinking About Albion Online",
      type: 0
    }],
    status: 'dnd'
  }
});

// Host the bot:
require('http').createServer((req, res) => res.end('Ready.')).listen(3000);

// Getting the bot token:
const AuthenticationToken = process.env.BotToken || config.Client.TOKEN;
if (!AuthenticationToken) {
  console.warn("[CRASH] Authentication Token for Discord bot is required! Use Envrionment Secrets or config.js.".red)
  return process.exit();
};

// Handler:
client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.user_commands = new Collection();
client.message_commands = new Collection();
client.modals = new Collection();
client.events = new Collection();

module.exports = client;

["prefix", "application_commands", "modals", "events", "mongoose"].forEach((file) => {
  require(`./handlers/${file}`)(client, config);
});

// Login to the bot:
client.login(AuthenticationToken)
  .catch((err) => {
    console.error("[CRASH] Something went wrong while connecting to your bot...");
    console.error("[CRASH] Error from Discord API:" + err);
    return process.exit();
  });

// Handle errors:
process.on('unhandledRejection', async (err, promise) => {
  console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
  console.error(promise);
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;
  console.log("Index.js triggered");
  // mongodb 
  const db = mongoose.connection.useDb("AvaRaids");
  const collectionmassage = db.collection("avaraids");
  const messages = collectionmassage.find();
    // For each message, check if it's still valid, and if so, continue to fetch reactions.
    messages.forEach(async (messageData) => {
      const now = new Date();
      if (now < messageData.selectedDate) {
          const channel = client.channels.cache.get(messageData.channelId); // replace with your channel ID
          if (channel) {
              const message = await channel.messages.fetch(messageData.messageId);
              if (message) {
                  // Continue to fetch reactions and process them as you did before
                  fetchReactions(message);
              }
          }
      } else {
          // If the message is no longer valid, delete it from the database.
          collectionmassage.deleteOne({ messageId: messageData.messageId }, function(err, res) {
            if (err) throw err;
          });
      }
  });
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (user.bot) return;
  // mongodb 
  const db = mongoose.connection.useDb("AvaRaids");
  const collectionmassage = db.collection("avaraids");
  const messages = collectionmassage.find();
    // For each message, check if it's still valid, and if so, continue to fetch reactions.
    messages.forEach(async (messageData) => {
      const now = new Date();
      if (now < messageData.selectedDate) {
          const channel = client.channels.cache.get(messageData.channelId); // replace with your channel ID
          if (channel) {
              const message = await channel.messages.fetch(messageData.messageId);
              if (message) {
                  // Continue to fetch reactions and process them as you did before
                  fetchReactions(message);
              }
          }
      } else {
          // If the message is no longer valid, delete it from the database.
          collectionmassage.deleteOne({ messageId: messageData.messageId }, function(err, res) {
            if (err) throw err;
          });
      }
  });
});
