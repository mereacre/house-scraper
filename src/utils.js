const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const mkdirAsync = util.promisify(fs.mkdir);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function mkdir(path) {
  try {
    await mkdirAsync(path);
  } catch (error) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }
}

module.exports = {
  getRandomIntInclusive,
  exec,
  mkdir,
};
