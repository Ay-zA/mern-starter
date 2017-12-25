import mongoose from 'mongoose';
import httpStatus from 'http-status';
import logger from '@/utils/logger';
import APIError from '@/utils/api-error';
import prettyError from '@/utils/pretty-error';
import { app } from '~/configs';

export function handleServerError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      logger.error('Port requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error('Port is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function handleConnectionClose() {
  mongoose.connection.close(() => {
    logger.warn('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
}

export function handleClientErrors(err, req, res, next) {
  const error = new APIError(err.message, err.status, err.isPublic, err);

  const resError = {
    message: error.isPublic || app.isDev ? error.message : httpStatus[error.status],
  };

  if (app.isDev && error.status >= 500) {
    resError.stack = error.parsedStack;
  }

  res.status(error.status).json(resError);

  return next(error.status >= 500 ? err : null);
}

export function prettyErrors(err, req, res, next) {
  logger.error(prettyError.render(err));
  return next();
}
