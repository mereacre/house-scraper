require("dotenv").config();
const log = require("debug");
const debug = log("scraper:scraper");

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

async function run(configFilename) {
  const config = loadConfig(configFilename);
  config.databaseUrl = process.env.DATABASE_URL;

  const scraper = require("./src")(config, log);
  debug("Starting scraper...");
  await scraper.start();
}

module.exports = {
  run,
};
