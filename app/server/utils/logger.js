import winston from 'winston';
import { chError, chSuccess, chWarning, chProcessing } from './chalk';

winston.cli();

class logger {
  static log = (message) => {
    winston.log(message);
  };

  static info = (message) => {
    winston.info(message);
  };

  static success = (title, message) => {
    winston.info(chSuccess(title), message);
  };

  static warn = (title, message) => {
    winston.warn(chWarning(title), message);
  };

  static error = (title, message) => {
    winston.error(chError(title), message);
  };

  static update = (path) => {
    winston.info(chProcessing('Updating: '), path);
  }
}

export default logger;
