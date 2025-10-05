const client = require("../index");
const { PermissionsBitField, Routes, REST } = require("discord.js");
const { glob } = require("glob");
const path = require("path");
const colors = require("colors");

module.exports = async (client, config) => {
  console.log("0------------------| Application commands Handler:".blue);

  const commands = [];

  // Slash commands handler:
  console.log("[!] Started loading slash commands...".yellow);
  const slashCommands = await glob(
    path.join(__dirname, "../commands/slash/**/*.js")
  );

  for (const file of slashCommands) {
    try {
      const pull = require(file);

      if (pull.name && pull.description && pull.type === 1) {
        client.slash_commands.set(pull.name, pull);
        console.log(
          `[HANDLER - SLASH] Loaded a file: ${pull.name} (#${client.slash_commands.size})`
            .brightGreen
        );

        commands.push({
          name: pull.name,
          description: pull.description,
          type: pull.type || 1,
          options: pull.options ? pull.options : null,
          default_permission: pull.permissions?.DEFAULT_PERMISSIONS
            ? pull.permissions.DEFAULT_PERMISSIONS
            : null,
          default_member_permissions: pull.permissions
            ?.DEFAULT_MEMBER_PERMISSIONS
            ? PermissionsBitField.resolve(
                pull.permissions.DEFAULT_MEMBER_PERMISSIONS
              ).toString()
            : null,
        });
      } else {
        console.log(
          `[HANDLER - SLASH] Couldn't load the file ${file}, missing module name value, description, or type isn't 1.`
            .red
        );
      }
    } catch (error) {
      console.error(`[HANDLER - SLASH] Error loading file ${file}: ${error}`.red);
    }
  }

  // User commands handler:
  console.log("[!] Started loading user commands...".yellow);
  const userCommands = await glob(
    path.join(__dirname, "../commands/user/**/*.js")
  );

  for (const file of userCommands) {
    try {
      const pull = require(file);

      if (pull.name && pull.type === 2) {
        client.user_commands.set(pull.name, pull);
        console.log(
          `[HANDLER - USER] Loaded a file: ${pull.name} (#${client.user_commands.size})`
            .brightGreen
        );

        commands.push({
          name: pull.name,
          type: pull.type || 2,
        });
      } else {
        console.log(
          `[HANDLER - USER] Couldn't load the file ${file}, missing module name value or type isn't 2.`
            .red
        );
      }
    } catch (error) {
      console.error(`[HANDLER - USER] Error loading file ${file}: ${error}`.red);
    }
  }

  // Message commands handler:
  console.log("[!] Started loading message commands...".yellow);
  const messageCommands = await glob(
    path.join(__dirname, "../commands/message/**/*.js")
  );

  for (const file of messageCommands) {
    try {
      const pull = require(file);

      if (pull.name && pull.type === 3) {
        client.message_commands.set(pull.name, pull);
        console.log(
          `[HANDLER - MESSAGE] Loaded a file: ${pull.name} (#${client.message_commands.size})`
            .brightGreen
        );

        commands.push({
          name: pull.name,
          type: pull.type || 3,
        });
      } else {
        console.log(
          `[HANDLER - MESSAGE] Couldn't load the file ${file}, missing module name value or type isn't 3.`
            .red
        );
      }
    } catch (error) {
      console.error(
        `[HANDLER - MESSAGE] Error loading file ${file}: ${error}`.red
      );
    }
  }

  const rest = new REST({ version: "10" }).setToken(
    config.Client.TOKEN || process.env.BotToken
  );

  (async () => {
    console.log(
      "[HANDLER] Started registering all the application commands.".yellow
    );

    try {
      await rest.put(Routes.applicationCommands(config.Client.ID), {
        body: commands,
      });

      console.log(
        "[HANDLER] Successfully registered all the application commands."
          .brightGreen
      );
    } catch (err) {
      console.log(err);
    }
  })();
};
