(async function() {
  require("dotenv").config();
  const log = require("debug");
  const debug = log("scraper:main");

  function loadConfig(configFilename) {
    const defaultConfig = {
      "headless": false,
      "numPages": 0,
      "scrapeUrl": "",
      "selectorTimeout": 5000,
      "infoTable": "",
      "pricesTable": "",
      "pageDelayInterval": [1000, 5000],
      "scraperTags": {},
      "scraperRegex": {},
    };

    const config = require(configFilename);
    return {...defaultConfig, ...config};
  }

  const config = loadConfig(process.argv[2] || "./config.json");
  config.databaseUrl = process.env.DATABASE_URL;

  const scraper = require("./src")(config, log);
  debug("Starting scraper...");
  try {
    await scraper.start();
  } catch (error) {
    debug(error);
    process.exit(-1);
  }
}());
