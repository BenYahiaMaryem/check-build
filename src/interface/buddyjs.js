'use strict';

// quick and dirty integration of buddy
var _ = require('lodash');
var grunt = require('grunt');
var exec = require('child_process').exec;

module.exports = function (debug) {
  // Expose buddyjs
  return function (options, f) {
    options = options || {};

    var buddy = require.resolve('buddy.js/bin/buddy');

    var params = {
      '--ignore': options.ignore || []
    };

    var args = grunt.file.expand(options.args).join(' ');
    var cmd = [
      buddy,
      _.reduce(params, function (m, v, k) {
        m += ' ' + k + ' ' + v;
        return m;
      }, ''),
      args
    ].join(' ');

    debug('running buddyjs with %s', cmd);

    exec(cmd, function (error, stdout, stderr) {
      console.log(stdout);

      if (stderr) {
        console.error(stderr);
      }

      f(error !== null);
    });
  };

};
