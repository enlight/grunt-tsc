/*
 * grunt-tsc
 * https://github.com/enlight/grunt-tsc
 *
 * Copyright (c) 2015 Vadim Macagon
 * Licensed under the MIT license.
 */

'use strict';

import * as path from 'path';
import * as fs from 'fs';
import * as child_process from 'child_process';
import * as which from 'which';

interface ITaskOptions {
  tscPath?: string;
  tscOptions?: string[];
  project?: string;
}

interface ICompilerOutput {
  error: Error;
  result: grunt.util.ISpawnResult;
  code: number;
}

function activatePlugin(grunt: IGrunt) {
  grunt.registerMultiTask('tsc', 'Execute TypeScript Compiler', function () {
    const task: grunt.task.IMultiTask<void> = this;
    const done = task.async();
    const options = task.options<ITaskOptions>({});

    let cmd = process.execPath;
    let args: string[] = [];
    
    if (options.tscPath) {
      if (fs.existsSync(options.tscPath)) {
        args.push(options.tscPath);
        grunt.log.writeln(`Using ${options.tscPath}`);
      } else {
        grunt.log.error(`Invalid tscPath: ${options.tscPath}`);
        done(false);
        return;
      }
    } else {
      // if a path to the compiler is not provided use the one from the global typescript package
      cmd = which.sync('tsc');
      grunt.log.writeln(`Using ${cmd}`);
    }

    if (options.project) {
      args.push('-p', options.project);
    }
    
    if (options.tscOptions) {
      args = args.concat(options.tscOptions);
    }
    
    const child = child_process.spawn(cmd, args);
    child.stdout.on('data', (data: string) => {
      grunt.log.write(data);
    });
    child.stderr.on('data', (data: string) => {
      grunt.log.error(data);
    });
    child.on('close', (code: number, signal: string) => {
      if (code === 0) {
        grunt.log.writeln(cmd + ' exited normally.');
        done()
      } else {
        grunt.log.writeln(cmd + ' terminated.');
        done(false);
      }
    });
  });
}

export = activatePlugin;
