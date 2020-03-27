module.exports = function(config, log) {
  "use strict";
  const debug = log("scraper:src");
  const webScraper = require("./web-scraper")(config, log);
  async function start() {
    await webScraper.start();
    debug("Scraper started.");
  }

  return {
    start,
  };
};
