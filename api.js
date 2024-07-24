const utils = require('./lib/utils');

exports.process = function (params) {
  const opts = {
    rootpath: params.rootpath || 'docroot',
    mode: params.mode || 'all',
    backups: params.backups || false,
  };

  utils.process(opts);
};
