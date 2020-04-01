(async function() {
  const cron = require("node-cron");
  const log = require("debug");
  const debug = log("scraper:cron");
  const {getRandomIntInclusive, exec} = require("./src/utils");
  const delay = require("delay");
  const scraper = require("./scraper");
  const axios = require("axios");

  const MS_IN_HOUR = 3600000;
  const NUM_TRIES = 10;

  function loadConfig(configFilename) {
    const defaultConfig = {
      "startMinute": 0,
      "startHour": 0,
      "hourInterval": [0, 0],
      "task": "",
      "nordvpnApi": "",
    };

    const config = require(configFilename);
    return {...defaultConfig, ...config};
  }

  async function getVpnCountries(apiEntry) {
    const out = await axios.get(apiEntry);
    return out.data.map((v) => (v.code));
  }

  async function runNordvpn(countries) {
    let count = 0;
    while (count < NUM_TRIES) {
      try {
        const idx = getRandomIntInclusive(0, countries.length - 1);
        const randomCountry = countries[idx] || "";
        await exec(`nordvpn connect ${randomCountry}`);
        return randomCountry;
      } catch (error) {
        count++;
      }
    }

    throw Error("nordvpn run count");
  }

  const config = loadConfig(process.argv[2] || "./cron.config.json");

  debug("Waiting to schedule a cron task...");
  cron.schedule(`${config.startMinute} ${config.startHour} * * *`, async() => {
    try {
      const countries = await getVpnCountries(config.nordvpnApi);
      const randomWait = getRandomIntInclusive.apply(null, config.hourInterval);
      debug(`Start minute/hour and waiting for ${randomWait} hours`);

      await delay(randomWait * MS_IN_HOUR);

      // Connect to vpn
      const country = await runNordvpn(countries);
      debug(`Connected to ${country}`);

      // Run the scraper
      await scraper.run(config.task);

      // Disconnect vpn
      await exec("nordvpn disconnect");
    } catch (error) {
      debug(error);
    }
  });
}());
