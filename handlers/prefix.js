const { glob } = require("glob");
const path = require("path");
const colors = require("colors");

module.exports = async (client, config) => {
  console.log("0------------------| Prefix Handler:".blue);

  const prefixCommands = await glob(
    path.join(__dirname, "../commands/prefix/**/*.js")
  );

  for (const file of prefixCommands) {
    try {
      const pull = require(file);
      if (pull.config?.name) {
        client.prefix_commands.set(pull.config.name, pull);
        console.log(
          `[HANDLER - PREFIX] Loaded a file: ${pull.config.name} (#${client.prefix_commands.size})`
            .brightGreen
        );
      } else {
        console.log(
          `[HANDLER - PREFIX] Couldn't load the file ${file}, missing module name value.`
            .red
        );
      }
    } catch (error) {
      console.error(`[HANDLER - PREFIX] Error loading file ${file}: ${error}`.red);
    }
  }
};
