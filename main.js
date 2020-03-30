(async function() {
  const scraper = require("./scraper");
  const log = require("debug");
  const debug = log("scraper:main");

  try {
    await scraper.run(process.argv[2] || "./config.json");
  } catch (error) {
    debug(error);
    process.exit(-1);
  }
}());
