'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-apidoc-history';

module.exports = function (options) {
    options = options || {};

    if (!options.apidoc) {
        throw new PluginError(PLUGIN_NAME, 'Need apidoc option');
    }

    if (!options.apidoc.version) {
        throw new PluginError(PLUGIN_NAME, 'Please set version in your apidoc.json');
    }

    return through.obj(function (file, encode, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            throw new PluginError(PLUGIN_NAME, 'Does not support stream file');
        }

        if (file.isBuffer()) {
            var content = file.contents.toString().match(/\/\*\*(.|\n|\r|\r\n)*?@api(.|\n|\r|\r\n)*?\*\//gm) || [];

            for (var i = 0, length = content.length; i < length; i++) {
                var block = content[i];
                content[i] = block.replace(/^\/\*\*/, "/**\n     * @apiVersion " + options.apidoc.version);
            }

            file.contents = new Buffer(content.join("\n\n"));
        }

        cb(null, file);
    });
};