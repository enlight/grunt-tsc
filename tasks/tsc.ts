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

interface ITaskOptions {
  tscPath?: string;
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
      cmd = 'tsc';
      grunt.log.writeln(`Using global tsc`);
    }

    if (options.project) {
      args.push('-p', options.project);
    }

    const runCompiler = new Promise((resolve, reject) => {
      grunt.util.spawn(
        { cmd, args },
        (error: Error, result: grunt.util.ISpawnResult, code: number) => {
          resolve({ error, result, code });
        }
      )
    });
    runCompiler.then(({ error, result, code }: ICompilerOutput) => {
      grunt.log.writeln(result.stdout);
      done();
    })
    .catch((error) => {
      done(error);
    });
  })
}

export = activatePlugin;
