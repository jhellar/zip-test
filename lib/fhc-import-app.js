const fh = require('fh-fhc');

module.exports = function fhcImportApp(params) {
  return new Promise(function(resolve, reject) {
    fh.import({_: [params.projectId, params.title, params.type,
      params.source, '--env=' + params.env]}, function(err, importRes) {
      if (err) {
        return reject(err);
      }

      return resolve(importRes);
    });
  });
};
