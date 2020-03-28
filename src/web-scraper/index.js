module.exports = function(config, log) {
  "use strict";
  const debug = log("scraper:web-scraper");
  const puppeteer = require("puppeteer");

  function findMatch(regex, searchString) {
    const result = searchString.match(regex);

    if (!result) return [];
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
    return page.evaluate((element) => element.innerText, searchElement);
  }

  async function getHandleString(handle, tag) {
    return handle.$eval(tag, (element) => element.innerText);
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
    const terms = idString.split("/");
    const id = terms[terms.length - 1];
    return (/^[\d]+$/.test(id)) ? id : "";
  }

  function processBeds(bedString) {
    return parseInt(findMatch(/([\d]+)\sbed/, bedString)[0]);
  }

  function processBaths(bathString) {
    return parseInt(findMatch(/([\d]+)\sbath/, bathString)[0]);
  }

  function processArea(areaString) {
    return Number(findMatch(/([\d]+\.[\d]+)|([\d]+).*m\\n2/, areaString)[0]);
  }

  async function getPropertyInfoTerms({handle, tag, tagTerm}) {
    const info = {};
    const terms = await handle.$(tag);
    const termsStrings = await terms.$$eval(tagTerm, (nodes) => nodes.map((n) => n.innerText));
    info.beds = processBeds(termsStrings[0] || "") || 0;
    info.baths = processBaths(termsStrings[1] || "") || 0;
    info.area = processArea(termsStrings[2] || "") || 0;
    return info;
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

      if (!property.id) {
        throw Error(`Unknown property id/href=${property.href}`);
      }

      const info = await getPropertyInfoTerms({
        handle,
        tag: config.scraperTags.info,
        tagTerm: config.scraperTags.infoTerm,
      });

      properties.push({...property, ...info});
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
