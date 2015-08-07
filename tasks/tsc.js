/*
 * grunt-tsc
 * https://github.com/enlight/grunt-tsc
 *
 * Copyright (c) 2015 Vadim Macagon
 * Licensed under the MIT license.
 */
'use strict';
var fs = require('fs');
function activatePlugin(grunt) {
    grunt.registerMultiTask('tsc', 'Execute TypeScript Compiler', function () {
        var task = this;
        var done = task.async();
        var options = task.options({});
        var cmd = process.execPath;
        var args = [];
        if (options.tscPath) {
            if (fs.existsSync(options.tscPath)) {
                args.push(options.tscPath);
                grunt.log.writeln("Using " + options.tscPath);
            }
            else {
                grunt.log.error("Invalid tscPath: " + options.tscPath);
                done(false);
                return;
            }
        }
        else {
            // if a path to the compiler is not provided use the one from the global typescript package
            cmd = 'tsc';
            grunt.log.writeln("Using global tsc");
        }
        if (options.project) {
            args.push('-p', options.project);
        }
        var runCompiler = new Promise(function (resolve, reject) {
            grunt.util.spawn({ cmd: cmd, args: args }, function (error, result, code) {
                resolve({ error: error, result: result, code: code });
            });
        });
        runCompiler.then(function (_a) {
            var error = _a.error, result = _a.result, code = _a.code;
            grunt.log.writeln(result.stdout);
            done();
        })
            .catch(function (error) {
            done(error);
        });
    });
}
module.exports = activatePlugin;
