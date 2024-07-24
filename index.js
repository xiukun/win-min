#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const utils = require('./lib/utils');

const argv = yargs
  .usage('Usage: $0 --rootpath or -r [目录路径，stirng] --mode or -m [模式默认all,可选all,css,js,gzip] --backups or -b [备份默认fasle,true|false]')
  .alias('r', 'rootpath')
  .alias('m', 'mode')
  .alias('b', 'backups')
  .demand(['rootpath']).argv;

const opts = {
  // @ts-ignore
  rootpath: argv.rootpath || 'docroot',
  // @ts-ignore
  mode: argv.mode || 'all',
  // @ts-ignore
  backups: argv.backups || false,
};

utils.process(opts);
