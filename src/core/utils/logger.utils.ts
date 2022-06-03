import chalk from "chalk";

const MESSAGE = "[app:logger]";

const success = (message?: any, ...optionalParams: any[]) => {
  console.log(chalk.bgGreen(MESSAGE), chalk.green(message), ...optionalParams);
};

const error = (message?: any, ...optionalParams: any[]) => {
  console.log(chalk.bgRed(MESSAGE), chalk.red(message), ...optionalParams);
};

const info = (message?: any, ...optionalParams: any[]) => {
  console.log(chalk.bgBlue(MESSAGE), chalk.blue(message), ...optionalParams);
};

const warning = (message?: any, ...optionalParams: any[]) => {
  console.log(
    chalk.bgYellow(MESSAGE),
    chalk.yellow(message),
    ...optionalParams
  );
};

export default {
  e: error,
  i: info,
  w: warning,
  s: success,
  l: console.log,
};
