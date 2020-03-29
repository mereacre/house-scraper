module.exports = function(config, log) {
  "use strict";
  const debug = log("scraper:src");
  const webScraper = require("./web-scraper")(config, log);

  async function crawl(page) {
    const {count, pageNumber} = await webScraper.getPageInfo(page);
    const pageCount = await webScraper.getPageCount(page);
    debug(`Found ${count} properties and total ${pageCount} pages.`);
    const properties = await webScraper.getPageProperties(page);
    await webScraper.clickNextPage(page);
    // debug(properties);
  }

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
