const compressor = require('@node-minify/core');
const cssnano = require('@node-minify/cssnano');
const terserJS = require('@node-minify/terser');
const jsonminify = require('@node-minify/jsonminify');
const htmlMinifier = require('@node-minify/html-minifier');
const find = require('find');
const path = require('path');

const fse = require('fs-extra');
const { handle_gzip } = require('./gzip');

exports.process = function (opts) {
  switch (opts.mode?.trim()) {
    case 'gzip':
      return handle_gzip(opts.rootpath, opts.backups);
    case 'css':
      return handle_css(opts.rootpath, opts.backups);
    case 'js':
      return handle_js(opts.rootpath, opts.backups);
    case 'json':
      return handle_json(opts.rootpath, opts.backups);
    case 'html':
      return handle_html(opts.rootpath, opts.backups);
    default:
      handle_css(opts.rootpath, opts.backups);
      handle_js(opts.rootpath, opts.backups);
      handle_json(opts.rootpath, opts.backups);
      handle_html(opts.rootpath, opts.backups);
      break;
  }
};

const handle_css = function (rootpath, backups) {
  find.eachfile(/\.css$/, rootpath, function (file) {
    if (path.basename(file, '.css').endsWith('bak')) return;
    let filepath = path.join(path.dirname(file), path.basename(file));
    let bakfilename = path.basename(file, '.css') + '-bak.css';
    let bakfilepath = path.join(path.dirname(file), bakfilename);

    if (backups) {
      fse
        .copy(filepath, bakfilepath)
        .then(() => {
          minify_css(filepath);
        })
        .catch(err => {
          console.log('Could not create backup of ' + filepath + ", file won't be minified. Error: " + err);
        });
    } else {
      minify_css(filepath);
    }
  });
};

const handle_js = function (rootpath, backups) {
  find.eachfile(/\.js$/, rootpath, function (file) {
    if (path.basename(file, '.js').endsWith('bak')) return;
    let filepath = path.join(path.dirname(file), path.basename(file));
    let bakfilename = path.basename(file, '.js') + '-bak.js';
    let bakfilepath = path.join(path.dirname(file), bakfilename);

    if (backups) {
      fse
        .copy(filepath, bakfilepath)
        .then(() => {
          minify_js(filepath);
        })
        .catch(err => {
          console.log('Could not create backup of ' + filepath + ", file won't be minified. Error: " + err);
        });
    } else {
      minify_js(filepath);
    }
  });
};

const handle_json = function (rootpath, mode, backups) {
  find.eachfile(/\.json$/, rootpath, function (file) {
    if (path.basename(file, '.json').endsWith('bak')) return;
    let filepath = path.join(path.dirname(file), path.basename(file));
    let bakfilename = path.basename(file, '.json') + '-bak.json';
    let bakfilepath = path.join(path.dirname(file), bakfilename);

    if (backups) {
      fse
        .copy(filepath, bakfilepath)
        .then(() => {
          minify_json(filepath);
        })
        .catch(err => {
          console.log('Could not create backup of ' + filepath + ", file won't be minified. Error: " + err);
        });
    } else {
      minify_json(filepath);
    }
  });
};

const handle_html = function (rootpath, mode, backups) {
  find.eachfile(/\.html$/, rootpath, function (file) {
    if (path.basename(file, '.html').endsWith('bak')) return;
    let filepath = path.join(path.dirname(file), path.basename(file));
    let bakfilename = path.basename(file, '.html') + '-bak.html';
    let bakfilepath = path.join(path.dirname(file), bakfilename);

    if (backups) {
      fse
        .copy(filepath, bakfilepath)
        .then(() => {
          minify_html(filepath);
        })
        .catch(err => {
          console.log('Could not create backup of ' + filepath + ", file won't be minified. Error: " + err);
        });
    } else {
      minify_html(filepath);
    }
  });
};

const minify_css = function (filepath) {
  // @ts-ignore
  compressor({
    compressor: cssnano, // 可以替换不同的压缩工具.
    input: filepath,
    output: filepath,
    options: {
      advanced: true,
      aggressiveMerging: true,
    },
    callback: function (err, min) {
      if (err) {
        console.log('Error while minifying ' + filepath + ', ' + err);
      } else {
        console.log('Minified ' + filepath);
      }
    },
  });
};

const minify_js = function (filepath) {
  // @ts-ignore
  compressor({
    compressor: terserJS, // 可以替换不同的压缩工具.
    input: filepath,
    output: filepath,
    callback: function (err, min) {
      if (err) {
        console.log('Error while minifying ' + filepath + ', ' + err);
      } else {
        console.log('Minified ' + filepath);
      }
    },
  });
};

const minify_json = function (filepath) {
  // @ts-ignore
  compressor({
    compressor: jsonminify, // 可以替换不同的压缩工具.
    input: filepath,
    output: filepath,
    callback: function (err) {
      if (err) {
        console.log('Error while minifying ' + filepath + ', ' + err);
      }
    },
  });
};

const minify_html = function (filepath) {
  // @ts-ignore
  compressor({
    compressor: htmlMinifier, // 可以替换不同的压缩工具.
    input: filepath,
    output: filepath,
    options: {
      removeAttributeQuotes: true,
    },
    callback: function (err) {
      if (err) {
        console.log('Error while minifying ' + filepath + ', ' + err);
      }
    },
  });
};
