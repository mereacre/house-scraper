(async function() {
  const log = require("debug");
  const debug = log("scraper:main");

  function loadConfig(configFilename) {
    const defaultConfig = {
      "headless": false,
      "scrapeUrl": "",
    };

    const config = require(configFilename);
    return {...defaultConfig, ...config};
  }

  const config = loadConfig(process.argv[2] || "./config.json");
  const scraper = require("./src")(config, log);
  debug("Starting scraper...");
  try {
    scraper.start();
  } catch (error) {
    debug(error);
    process.exit(-1);
  }
}());
