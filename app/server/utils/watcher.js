import chokidar from 'chokidar';
import { logChange } from '@/services/log.service';
import { pathes } from '~/configs';
import logger from './logger';

const watcher = chokidar.watch(['./api'], { cwd: pathes.server });

const watchApi = () => {
  Object.keys(require.cache).forEach((id) => {
    if (/[\\/](server)[\\/](api)[\\/].*(controller|validator|routes)\.js$/.test(id)) {
      delete require.cache[id];
      logger.update(id.split('\\').slice(-2).join('/'));
    }
  });
};

watcher.on('change', logChange);
watcher.on('ready', () => watcher.on('all', watchApi));
