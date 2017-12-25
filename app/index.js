const clear = require('console-clear');
require('babel-register');
require('babel-polyfill');

clear();
require('./server/server.js');
