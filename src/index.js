module.exports = function(config, log) {
  "use strict";
  const delay = require("delay");
  const debug = log("scraper:src");
  const webScraper = require("./web-scraper")(config, log);
  const databaseUtils = require("./database-utils")(config, log);
  const {getRandomIntInclusive} = require("./utils");

  async function crawl(page, numPages = 0) {
    let propertyList = [];

    await webScraper.waitPageLoad(page);
    const totalProperties = await webScraper.getTotalProperties(page);

    const pageCount = (numPages) ? numPages : await webScraper.getPageCount(page);

    debug(`Total ${totalProperties} properties and ${pageCount} pages`);

    let currentPageNumber = await webScraper.getCurrentPageNumber(page);
    while (currentPageNumber <= pageCount && propertyList.length <= totalProperties) {
      const properties = await webScraper.getPageProperties(page);
      propertyList = propertyList.concat(properties);

      if (currentPageNumber === pageCount) {
        break;
      } else {
        const delayMs = getRandomIntInclusive.apply(null, config.pageDelayInterval);
        await delay(delayMs);
        await webScraper.clickNextPage(page);
        await webScraper.waitPageLoad(page);
        currentPageNumber = await webScraper.getCurrentPageNumber(page);
      }
    }
    return {propertyList, totalProperties};
  }

  async function start() {
    const {browser, page} = await webScraper.start();
    debug("Scraper started.");

    const {propertyList} = await crawl(page, config.numPages);

    debug("Saving data to database-utils.");
    await databaseUtils.save(propertyList);

    await webScraper.stop(browser);
    debug("Scraper stopped.");
  }

  return {
    start,
  };
};
