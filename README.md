# grunt-tsc

> Just executes the TypeScript compiler, optionally passing in a project path.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tsc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

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
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.project
Type: `String`
Default value: `undefined`

Path to a directory containing a tsconfig.json

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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
