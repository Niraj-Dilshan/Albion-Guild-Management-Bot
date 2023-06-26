require('dotenv').config();
const owner = process.env.OWNERS;
const mongodb = process.env.MongoURI;
const token = process.env.BotToken;
const id = process.env.BotID;

module.exports = {

  Prefix: ">", // YOUR BOT PREFIX.

  Users: {
    OWNERS: [owner] // THE BOT OWNERS ID.
  },

  Handlers: {
    MONGO: mongodb // YOUR MONGO URI. (USE THIS ONLY IN VSCODE)
  },

  Client: {
    TOKEN: token, // YOUR BOT TOKEN. (USE THIS ONLY IN VSCODE)
    ID: id // YOUR BOT ID.
  }

}
