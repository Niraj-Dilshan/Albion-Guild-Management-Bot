const { glob } = require("glob");
const path = require("path");
const colors = require("colors");

module.exports = async (client) => {
  console.log("0------------------| Events Handler:".blue);

  const eventFiles = await glob(path.join(__dirname, "../events/**/*.js"));

  for (const file of eventFiles) {
    try {
      const pull = require(file);
      if (pull.name) {
        client.events.set(pull.name, pull);
        console.log(
          `[HANDLER - EVENTS] Loaded a file: ${pull.name}`.brightGreen
        );
      } else {
        console.log(
          `[HANDLER - EVENTS] Couldn't load the file ${file}. missing name.`
            .red
        );
      }
    } catch (error) {
      console.error(`[HANDLER - EVENTS] Error loading file ${file}: ${error}`.red);
    }
  }
};
