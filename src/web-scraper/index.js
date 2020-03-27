module.exports = function(config, log) {
  "use strict";
  const debug = log("scraper:web-scraper");
  const puppeteer = require("puppeteer");

  async function start() {
    const browser = await puppeteer.launch({headless: config.headless});
    const page = await browser.newPage();
    await page.goto(config.scrapeUrl);

    return {browser, page};
  }

  function stop(browser) {
    browser.close();
  }

  return {
    start,
    stop,
  };
};
