/*
 * grunt-tsc
 * https://github.com/enlight/grunt-tsc
 *
 * Copyright (c) 2015 Vadim Macagon
 * Licensed under the MIT license.
 */
'use strict';
var fs = require('fs');
var child_process = require('child_process');
var which = require('which');
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
            cmd = which.sync('tsc');
            grunt.log.writeln("Using " + cmd);
        }
        if (options.project) {
            args.push('-p', options.project);
        }
        if (options.tscOptions) {
            args = args.concat(options.tscOptions);
        }
        var child = child_process.spawn(cmd, args);
        child.stdout.on('data', function (data) {
            grunt.log.write(data);
        });
        child.stderr.on('data', function (data) {
            grunt.log.error(data);
        });
        child.on('close', function (code, signal) {
            if (code === 0) {
                grunt.log.writeln(cmd + ' exited normally.');
                done();
            }
            else {
                grunt.log.writeln(cmd + ' terminated.');
                done(false);
            }
        });
    });
}
module.exports = activatePlugin;
