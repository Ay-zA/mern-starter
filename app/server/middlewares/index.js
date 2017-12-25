import helmet from 'helmet';
import favicon from 'serve-favicon';
import compression from 'compression';
import bodyParser from 'body-parser';
import passport from 'passport';
import { app as config, pathes } from '~/configs';
import morgan from '@/utils/morgan';
import webpack from './webpack.middleware';

const configMiddlewares = (app) => {
  if (config.isDev) {
    app.use(morgan);
    app.use(webpack.devMiddleware);
    app.use(webpack.hotMiddleware);
  }

  if (app.isProd) {
    app.use(helmet());
    app.use(compression());
  }

  app.use(favicon(pathes.favicon));
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(passport.initialize());
};

export { default as webpack } from './webpack.middleware';
export default configMiddlewares;
