'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-apidoc-history';

module.exports = function (options) {
    options = options || {};

    return through.obj(function (file, encode, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            throw new PluginError(PLUGIN_NAME, 'Does not support stream file');
        }

        if (file.isBuffer()) {
            var content = file.contents.toString().match(/\/\*\*(.|\n|\r|\r\n)*?@api(.|\n|\r|\r\n)*?\*\//gm) || [];
            file.contents = new Buffer(content.join("\n\n"));
        }

        cb(null, file);
    });
};