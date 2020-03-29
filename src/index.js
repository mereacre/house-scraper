module.exports = function(config, log) {
  "use strict";
  const delay = require("delay");
  const debug = log("scraper:src");
  const webScraper = require("./web-scraper")(config, log);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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

      debug(`Processing page ${currentPageNumber}`);

      if (currentPageNumber === pageCount) {
        break;
      } else {
        const delayMs = getRandomIntInclusive.apply(null, config.pageDelayInterval);
        debug(`Dealying for ${delayMs} milliseconds`);
        await delay(delayMs);
        await webScraper.clickNextPage(page);
        await webScraper.waitPageLoad(page);
        currentPageNumber = await webScraper.getCurrentPageNumber(page);
      }
    }
    return {propertyList, totalProperties};
  }

  async function save(data) {
    console.log(data);
  }

  async function start() {
    const {browser, page} = await webScraper.start();
    debug("Scraper started.");

    const data = await crawl(page, 2);
    await save(data);

    await webScraper.stop(browser);
    debug("Scraper stopped.");
  }

  return {
    start,
  };
};
