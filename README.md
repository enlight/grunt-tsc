# grunt-tsc

> Just executes the TypeScript compiler, passing through any options you wish to provide.

Gah, another TypeScript plugin for Grunt? But, WHY?! Because I wanted to set up `tsconfig.json`
based builds using the nightly TypeScript builds, and none of the existing TypeScript plugins fit
the job at the time. These days I prefer using this plugin because it's dead simple, and it lets
me use any TypeScript compiler and compiler options I want. If you need something more fully
featured I recommend using [grunt-ts](https://github.com/TypeStrong/grunt-ts).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a
[Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tsc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line:

```js
grunt.loadNpmTasks('grunt-tsc');
```

## The "grunt-tsc" task

### Overview
In your project's `Gruntfile.js`, add a section named `tsc` to the data object passed into
`grunt.initConfig()`.

```js
grunt.initConfig({
  tsc: {
    options: {
      // Default options for all targets.
    },
    your_target: {
      options: {
        // Target-specific options that override default options.
      }
    },
    your_other_target: {
      options: {
        // Target-specific options that override default options.
      }
    }
  }
});
```

### Options

#### options.tscPath
Type: `string`
Default value: `undefined`

Path to the TypeScript compiler `grunt-tsc` should use, when this is left undefined the
globally installed TypeScript package will be used. If you'd like to use a nightly build of
TypeScript install `typescript@next` as a dev dependency of your package and then set `tscPath`
to `path.resolve('node_modules', 'typescript', 'bin', 'tsc')`.

#### options.tscOptions
Type: `Array<string>`
Default value: `undefined`

Additional command line options to pass to the TypeScript compiler, these aren't checked by
`grunt-tsc` in any way. The full list of available options is available on the
[TypeScript Wiki](https://github.com/Microsoft/TypeScript/wiki/Compiler-Options).

#### options.project
Type: `string`
Default value: `undefined`

Path to a directory containing a `tsconfig.json`. In TypeScript 1.8+ this can be a path to
any [TypeScript config file](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json)
(e.g. `path/to/my-es5-tsconfig.json`). Alternatively you could simply specify the
`--project` or `-p` option in `tscOptions`.

### Usage Examples

#### Default Options
If a `project` path is not specified for a target then the TypeScript compiler will look for a
`tsconfig.json` in the same directory as `Gruntfile.js`.

```js
grunt.initConfig({
  tsc: {
    default: {}
  }
});
```

#### Custom Options

```js
grunt.initConfig({
  tsc: {
    options: {
      tscPath: path.resolve('node_modules', 'typescript', 'bin', 'tsc')
    },
    production: {
      options: {
        project: './tsconfig/production'
      }
    },
    testing: {
      options: {
        project: './tsconfig/testing'
      }
    },
    watchTesting: {
      options: {
        project: './tsconfig/testing',
        tscOptions: ['--watch']
      }
    },
    subproject1: {
      options: {
        project: './path-to-subproject1'
      }
    },
    subproject2: {
      options: {
        project: './path-to-subproject2'
      }
    }
  }
});
```
