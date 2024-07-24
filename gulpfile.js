#!/usr/bin/env node

const gulp = require('gulp');
const yargs = require('yargs');

const utils = require('./lib/utils');

// cmd输入参数设置
const argv = yargs.argv;
const opts = {
  // @ts-ignore
  rootpath: argv.rootpath,
  mode: '',
  // @ts-ignore
  backups: argv.backups || false,
};

gulp.task('minify-css', function () {
  opts.mode = 'css';
  utils.process(opts);
});

gulp.task('minify-js', function () {
  opts.mode = 'js';
  utils.process(opts);
});

gulp.task('default', function () {
  opts.mode = 'all';
  utils.process(opts);
});
