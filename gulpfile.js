var gulp = require('gulp'),
  uglify = require("gulp-uglify"),
 flatten = require('gulp-flatten'),
  concat = require('gulp-concat'),
  header = require('gulp-header'),
 wiredep = require('wiredep')({

//	directory: 		'.bowerrc'.directory || bower_components,
//	bowerJson: 		require('./bower.json'),
	src: 			['filepaths', 'and/even/globs/*.html', 'to take', 'control of.'],
//	cwd: 			'./',
//	exclude: [ /jquery/, 'bower_components/modernizr/modernizr.js' ],
//	ignorePath: /string or regexp to ignore from the injected filepath/,

	dependencies: true,    // default: true
	devDependencies: true, // default: false

	html: {
      block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
      detect: {
        js: /<script.*src=['"]([^'"]+)/gi,
        css: /<link.*href=['"]([^'"]+)/gi
      },
      replace: {
        js: '<script src="{{filePath}}"></script>',
        css: '<link rel="stylesheet" href="{{filePath}}" />'
      }
    },
    less: {
      block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
      detect: {
        css: /@import\s['"](.+css)['"]/gi,
        less: /@import\s['"](.+less)['"]/gi
      },
      replace: {
        css: '@import "{{filePath}}";',
        less: '@import "{{filePath}}";'
      }
    },
    jade: {
      block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
      detect: {
        js: /script\(.*src=['"]([^'"]+)/gi,
        css: /link\(.*href=['"]([^'"]+)/gi
      },
      replace: {
        js: 'script(src=\'{{filePath}}\')',
        css: 'link(rel=\'stylesheet\', href=\'{{filePath}}\')'
      }
    },
});

gulp.task('default', function() {

	var fs = require('fs');
	var getVersion = function () { return fs.readFileSync('./Version'); };
	var	getCopyright = function () { return fs.readFileSync('./Copyright');};

	gulp.src('src/*.js')
		.pipe(header(fs.readFileSync('Copyright', 'utf8')))
		.pipe(gulp.dest('dist/'));

/*
	gulp.src('./src/index.html')
		.pipe(wiredep())
		.pipe(gulp.dest('./dest'));
*/
});