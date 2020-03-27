module.exports = function(config, log) {
  "use strict";
  const debug = log("scraper:src");
  const webScraper = require("./web-scraper")(config, log);

  async function crawl(page) {}

  async function save(data) {}

  async function start() {
    const {browser, page} = await webScraper.start();
    debug("Scraper started.");

    const data = await crawl(page);
    await save(data);

    await webScraper.stop(browser);
    debug("Scraper stopped.");
  }

  return {
    start,
  };
};
