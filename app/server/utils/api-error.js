import httpStatus from 'http-status';
import parseStack from 'parse-stack';
import { sep } from 'path';

const jsonStack = (err) => parseStack(err).filter(stack => !stack.filepath.includes('node_modules')).map(stack => ({
  name: stack.name,
  filepath: `${stack.filepath.split(sep).join('/')} | ${stack.lineNumber}`
}));

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, isPublic, orginalError) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This i  s required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name);

    this.parsedStack = jsonStack(orginalError || this);
  }

}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false, orginalError) {
    super(message, status, isPublic, orginalError);
  }
}

export default APIError;
