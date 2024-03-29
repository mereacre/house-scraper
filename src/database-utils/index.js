module.exports = function(config, log) {
  "use strict";
  const path = require("path");
  const debug = log("scraper:database-utils");
  const sqliteUtils = require("nqm-iot-database-utils");

  async function openDataset(path, schema) {
    const db = await sqliteUtils.openDatabase(path, "file", "w+");
    await sqliteUtils.createDataset(db, schema);
    return db;
  }

  async function save(data) {
    const currentTime = Date.now();
    const pricesMap = {};
    data.forEach((value) => {
      pricesMap[value.id] = {
        id: value.id,
        timestamp: currentTime,
        price: value.price,
      };
    });

    const pricesList = Object.keys(pricesMap).map((key) => (pricesMap[key]));

    const homemetaList = data.map((value) => ({
      id: value.id,
      href: value.href,
      address: value.address,
      beds: value.beds,
      baths: value.baths,
      area: value.area,
    }));

    const pricesDbPath = path.join(config.houseScraperHomePath, config.db.prices.id);
    const housemetaDbPath = path.join(config.houseScraperHomePath, config.db.housemeta.id);

    const pricesDb = await openDataset(pricesDbPath, config.db.prices);
    const housemetaDb = await openDataset(housemetaDbPath, config.db.housemeta);
    const countPrices = await sqliteUtils.addData(pricesDb, pricesList);
    await sqliteUtils.updateData(housemetaDb, homemetaList, true);

    debug(`Added ${countPrices.count} prices.`);

    await sqliteUtils.closeDatabase(pricesDb);
    await sqliteUtils.closeDatabase(housemetaDb);
  }

  return {
    save,
  };
};
