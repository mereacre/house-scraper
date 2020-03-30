module.exports = function(config, log) {
  "use strict";
  const debug = log("scraper:postgres");
  const {Pool} = require("pg");

  async function saveInfoData(client, data) {
    let queryText = "INSERT INTO info(id, href, address, beds, baths, area) VALUES ($1, $2, $3, $4, $5, $6) ";
    queryText += "ON CONFLICT (id) DO UPDATE SET href=$2, address=$3, beds=$4, baths=$5, area=$6";
    for await (const row of data) {
      await client.query(queryText, row);
    }
  }

  async function savePriceData(client, data) {
    const queryText = "INSERT INTO prices(id, timestamp, price) VALUES($1, $2, $3)";
    for await (const row of data) {
      await client.query(queryText, row);
    }
  }

  async function save(data) {
    const pool = new Pool({
      connectionString: config.databaseUrl,
      ssl: true,
    });

    const client = await pool.connect();
    const currentTime = new Date().toISOString();
    const priceList = data.map((value) => ([value.id, currentTime, value.price]));
    const infoList = data.map((value) => ([value.id, value.href, value.address, value.beds, value.baths, value.area]));

    try {
      await client.query("BEGIN");
      await savePriceData(client, priceList);
      await saveInfoData(client, infoList);
      await client.query("SELECT * FROM prices");
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  return {
    save,
  };
};
