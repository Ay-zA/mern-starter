import { app } from '~/configs';
import logger from '@/utils/logger';

export function logServerConfig(err) {
  if (err) logger.error(err);

  logger.success('Server listening at: ', app.uri);
  logger.warn('Environment:', app.ENV);
  logger.info('---');
}

export function logChange(path) {
  logger.info(`${path} has been changed.`);
}
