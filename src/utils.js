const util = require("util");
const exec = util.promisify(require("child_process").exec);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  getRandomIntInclusive,
  exec,
};
