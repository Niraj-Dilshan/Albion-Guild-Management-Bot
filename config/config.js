require("dotenv").config();
const owner = process.env.OWNERS;
const mongodb = process.env.MongoURI;
const token = process.env.BotToken;
const id = process.env.BotID;
const raidleaders = process.env.RaidLeaders.split(",");
const admins = process.env.Admins.split(",");

module.exports = {
  Prefix: ">", // YOUR BOT PREFIX.

  Users: {
    OWNERS: owner, // THE BOT OWNERS ID.
    RAIDLEADERS: raidleaders, // THE RAID LEADERS ID.
    ADMINS: admins, // THE ADMINS ID.
  },

  Roles: {
    // Optional: set this to a role ID in your .env to auto-assign when a user registers
    REGISTERED_ROLE: process.env.RegisteredRole || null,
  },

  Handlers: {
    MONGO: mongodb, // YOUR MONGO URI. (USE THIS ONLY IN VSCODE)
  },

  Client: {
    TOKEN: token, // YOUR BOT TOKEN. (USE THIS ONLY IN VSCODE)
    ID: id, // YOUR BOT ID.
  },
};
