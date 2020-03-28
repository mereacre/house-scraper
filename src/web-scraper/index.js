module.exports = function(config, log) {
  "use strict";
  const debug = log("scraper:web-scraper");
  const puppeteer = require("puppeteer");

  function findMatch(regex, searchString) {
    const result = searchString.match(regex);

    return (result.length > 1) ? result.slice(1) : [];
  }

  function processCount(regexArray, htmlString) {
    const regex = new RegExp(regexArray[0], regexArray[1]);
    const countString = findMatch(regex, htmlString)[0] || "";
    if (!countString) throw Error("Unknown count tag!");

    return parseInt(countString);
  }

  async function getPageString(page, tag) {
    const searchElement = await page.$(tag);
    return page.evaluate((element) => element.innerHTML, searchElement);
  }

  async function getHandleString(handle, tag) {
    return handle.$eval(tag, (element) => element.innerHTML);
  }

  async function getHandleAttribute({handle, tag, property}) {
    return handle.$eval(tag, (element, property) => element[property], property);
  }

  async function getSaleCount(page) {
    await page.waitForSelector(config.scraperTags.housesForSale, {timeout: config.selectorTimeout});
    const htmlString = await getPageString(page, config.scraperTags.housesForSale);
    return processCount(config.scraperRegex.housesForSale, htmlString);
  }

  function processPrice(priceString) {
    const norm = priceString.trim().replace(/€/g, "").replace(/,/g, "");
    return (norm === "POA") ? -1 : parseInt(norm) || 0;
  }

  function processId(idString) {
    return "";
  }

  async function getPageProperties(page) {
    const properties = [];
    const handles = await page.$$(config.scraperTags.listingCard);

    for await (const handle of handles) {
      const property = {};
      let htmlString = await getHandleString(handle, config.scraperTags.price);
      property.price = processPrice(htmlString);

      htmlString = await getHandleString(handle, config.scraperTags.address);
      property.address = htmlString.trim();

      property.href = await getHandleAttribute({handle, tag: config.scraperTags.address, property: "href"});
      property.id = processId(property.href);
      properties.push(property);
    }

    return properties;
  }

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
    getSaleCount,
    getPageProperties,
  };
};
