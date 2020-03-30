require("dotenv").config();
const os = require("os");
const path = require("path");
const log = require("debug");
const debug = log("scraper:scraper");
const {mkdir} = require("./src/utils");

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
    "scraperFolder": ".house-scraper",
    "db": {},
  };

  const config = require(configFilename);
  return {...defaultConfig, ...config};
}

async function run(configFilename) {
  const config = loadConfig(configFilename);
  config.databaseUrl = process.env.DATABASE_URL;

  // Create the scraper home directory
  const homePath = os.homedir();
  config.houseScraperHomePath = path.join(homePath, config.scraperFolder);
  await mkdir(config.houseScraperHomePath);

  const scraper = require("./src")(config, log);
  debug("Starting scraper...");
  await scraper.start();
}

module.exports = {
  run,
};
