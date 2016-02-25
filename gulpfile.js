
(function() {

	var gulp = require('gulp'),
		  fs = require("fs"),
	   clean = require('gulp-clean'),
	  inject = require("gulp-inject"),
	  uglify = require("gulp-uglify"),
	 flatten = require('gulp-flatten'),
	  gulpif = require('gulp-if'),
	  concat = require('gulp-concat'),
	  header = require('gulp-header'),
	  useref = require('gulp-useref'),
	   gutil = require('gulp-util'),
	  minCss = require('gulp-minify-css'),
	 srcMaps = require('gulp-sourcemaps'),
	 	   $ = require('gulp-load-plugins')({lazy: true}),
	 wiredep = require('wiredep').stream;

	var files = {
		npm: 			'./package.json',
		bower: 			'./bower.json',
		copyright: 		'./copyright.txt',
		version: 		'./version.txt',
		vendor: 		'dist/js/vendor',
		toClean: 		['dist/styles/*', 'dist/js/*.js', 'dist/*.html'],
		jsSrc: 			'src/js/*.js',
		jsDst: 			'dist/js/*.js',
		cssSrc: 		'src/styles/*.css',
		cssDstPath: 	'dist/styles',
		jsSrcPath: 		'src/js',
		jsDstPath: 		'dist/js',
		htmlSrc: 		'src/index.html',
		htmlDstPath: 	'dist',
		jsSrcCombined: 	'dest/js/combined.js',
		jsDstCombined: 	'dest/js/combined-min.js',
	};

	gulp.task('wiredep',function(){

		// PATH of outputted lines need to be fixed here...
		gulp.src(files.htmlSrc)
			.pipe($.inject( gulp.src([ files.cssSrc ], { read: false, relative: true } ) ))
			.pipe($.inject( gulp.src([ files.jsSrc ], { read: false, relative: true } ) ))
			.pipe( wiredep({
				directory: files.vendor,
				bowerJson: require(files.bower),
			}).on('error', gutil.log) )
			.pipe( useref() )
			.pipe( gulpif('*.css', minCss()) )
			.pipe( gulpif('*.js', uglify()) )
			.pipe( gulp.dest('src') );
	});

	gulp.task('default', function() {

		var pkg = require(files.npm);

			// inject the CSS files manually
		gulp.src(files.htmlSrc)
			.pipe( inject(gulp.src(files.cssSrc, {read: false}), {relative: true}) ) 
			.pipe( inject(gulp.src(files.jsSrc, {read: false}), {relative: true}) ) 
			.pipe( gulpif('*.css', minCss().on('error', gutil.log)) )
			.pipe( gulpif('*.js', uglify().on('error', gutil.log)) )
			.pipe( gulp.dest(files.htmlDstPath) );

		gulp.src(files.jsSrc)
			.pipe( uglify().on('error', gutil.log) )
			.pipe( gulp.dest(files.jsDstPath) );

		gulp.src(files.cssSrc)
			.pipe( minCss().on('error', gutil.log) )
			.pipe( gulp.dest(files.cssDstPath) );

			// squeeze the babes...
/*		gulp.src(files.jsSrc)
			.pipe( uglify() )
			.pipe( gulp.dest(files.jsDstPath) );
*/

/*
		// funnily prints the copyright twice!
		gulp.src(files.jsDst)
			.pipe( header(fs.readFileSync(files.copyright, 'utf8'), {version: fs.readFileSync(files.version)}) )
			.pipe( gulp.dest(files.jsDstPath) );
*/
	});

}());