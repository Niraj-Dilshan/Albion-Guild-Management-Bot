require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const clientId = process.env.ClientID;
const guildId = process.env.GuildID;
const token = process.env.BotToken;

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    // Get all the registered commands in the guild
    const existingCommands = await rest.get(Routes.applicationGuildCommands(clientId, guildId));

    // Delete all the existing commands
    for (const command of existingCommands) {
      await rest.delete(Routes.applicationGuildCommand(clientId, guildId, command.id));
    }

    // Deploy the new set of commands
    const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log(`Successfully deployed ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();