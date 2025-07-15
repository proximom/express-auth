const chalk = require("chalk");

exports.log = (message) => {
  console.log(chalk.greenBright(`[LOG] ${message}`));
};

exports.error = (message) => {
  console.error(chalk.redBright(`[ERROR] ${message}`));
};

exports.warn = (message) => {
  console.warn(chalk.yellowBright(`[WARN] ${message}`));
};
