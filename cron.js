(async function() {
  const cron = require("node-cron");
  const log = require("debug");
  const debug = log("cron:cron");

  function loadConfig(configFilename) {
    const defaultConfig = {
      "startHour": 10,
      "hourInterval": [1, 10],
    };

    const config = require(configFilename);
    return {...defaultConfig, ...config};
  }

  const config = loadConfig(process.argv[2] || "./cron.config.json");
  debug("Starting cron job...");
  cron.schedule(`* ${config.startHour} * * *`, () => {
    debug("running a task every minute");
  });
}());
