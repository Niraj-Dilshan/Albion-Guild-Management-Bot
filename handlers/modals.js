const { glob } = require("glob");
const path = require("path");
const colors = require("colors");

module.exports = async (client, config) => {
  console.log("0------------------| Modals Handler:".blue);

  const modalFiles = await glob(path.join(__dirname, "../modals/**/*.js"));

  for (const file of modalFiles) {
    try {
      const pull = require(file);
      if (pull.id) {
        client.modals.set(pull.id, pull);
        console.log(`[HANDLER - MODALS] Loaded a file: ${file}`.brightGreen);
      } else {
        console.log(
          `[HANDLER - MODALS] Couldn't load the file ${file}. Missing modal ID.`
            .red
        );
      }
    } catch (error) {
      console.error(`[HANDLER - MODALS] Error loading file ${file}: ${error}`.red);
    }
  }
};
