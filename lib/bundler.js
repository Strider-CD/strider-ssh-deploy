'use strict';

var fs = require('fs');
var spawn = require('child_process').spawn;

module.exports = {
  // This is how you would bundle a NODE.JS project...
  // A generic solution would be to use git-archive;
  // See https://github.com/Strider-CD/strider-ssh-deploy/issues/2
  bundleProject: function (dataDir, name, progress, done) {
    var bundlePath = `/tmp/${name}.tar.gz`;
    spawn(
      './node_modules/.bin/yarn', ['pack', '--filename', bundlePath],
      { cwd: dataDir, stdio: ['ignore', 'ignore', process.stderr] }
    ).on('close', function (code) {
      if (code !== 0) {
        done(new Error('Failed to create project bundle'));
      } else {
        fs.exists(bundlePath, function (yes) {
          if (yes)
            done(null, bundlePath);
          else
            done(new Error('Failed to create project bundle'));
        });
      }
    });
  },
  untarCmd: function (bundlePath, extractDir) {
    return `tar -zxf ${bundlePath} -C ${extractDir} --strip-components=1`;
  }
};
