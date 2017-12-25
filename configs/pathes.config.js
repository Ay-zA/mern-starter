import path from 'path';
import fs from 'fs';

const app = require('~/app.config');

const rootDirectory = fs.realpathSync(process.cwd());
const resolveRoot = relativePath => path.resolve(rootDirectory, relativePath);

const appDirectory = resolveRoot(app.root);
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const clientDirectory = resolveApp(app.client.dir);
const resolveClient = relativePath => path.resolve(clientDirectory, relativePath);

const serverDirectory = resolveApp(app.server.dir);
const resolveServer = relativePath => path.resolve(serverDirectory, relativePath);

const publicDirectory = resolveApp(app.publicDir);
const resolvePublic = relativePath => path.resolve(publicDirectory, relativePath);

const buildDirectory = resolveRoot(app.outDir);

const pathes = {
  appNodeModules: resolveRoot('node_modules'),
  resolveBuild: relativePath => path.resolve(buildDirectory, relativePath),
  resolvePublic,
  app: appDirectory,
  build: buildDirectory,
  public: publicDirectory,
  index: resolvePublic('index.html'),
  favicon: resolvePublic('favicon.ico'),
  // assets: resolvePublic('assets'),
  sassIncludePath: resolvePublic('scss'),
  server: serverDirectory,
  serverMain: resolveServer(app.server.main),
  client: clientDirectory,
  clientMain: resolveClient(app.client.main)
};

export default pathes;
