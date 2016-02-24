
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
	 srcMaps = require('gulp-sourcemaps')
	 wiredep = require('wiredep').stream;

	var files = {
		npm: 			'./package.json',
		bower: 			'./bower.json',
		copyright: 		'./copyright.txt',
		version: 		'./version.txt',
		vendor: 		'dist/js/vendor',
		toClean: 		['dist/css/*', 'dist/js/*.js', 'dist/*.html'],
		jsSrc: 			['src/js/*.js'],
		jsDst: 			['dist/js/*.js'],
		cssSrc: 		['src/styles/*.css'],
		cssDstPath: 	'dist/css',
		jsSrcPath: 		'src/js',
		jsDstPath: 		'dist/js',
		htmlSrc: 		['src/*.html'],
		htmlDstPath: 	'dist',
		jsSrcCombined: 	'dest/js/combined.js',
		jsDstCombined: 	'dest/js/combined-min.js',
	};

	gulp.task('wiredep',function(){

		gulp.src(files.htmlSrc)
			.pipe( wiredep({
				directory: files.vendor,
				bowerJson: require(files.bower),
			}) )
			.pipe( useref() )
			.pipe( gulpif('*.css', minCss()) )
			.pipe( gulpif('*.js', uglify()) )
			.pipe( gulp.dest(files.htmlDstPath) );
	});

	gulp.task('default', function() {

		var pkg = require(files.npm);

		gulp.src(files.toClean)
			.pipe(clean(), {read: false, force: true})

		gulp.src(files.jsSrc)
			.pipe( uglify().on('error', gutil.log) )
			.pipe( gulp.dest(files.jsDstPath) );

			// inject the CSS files manually
		gulp.src(files.cssSrc)
			.pipe( inject(gulp.src(files.cssSrc, {read: false}), {relative: true}) ) 
			.pipe( gulpif('*.css', minCss()) )
			.pipe( gulp.dest(files.cssDstPath) );

		gulp.src(files.jsSrc)
			.pipe( srcMaps.init() )
			.pipe( wiredep({
				directory: files.vendor,
				bowerJson: require(files.bower),
			}) )
			.pipe( srcMaps.write() )
			.pipe( useref() )
			.pipe( gulpif('*.css', minCss()) )
			.pipe( gulpif('*.js', uglify()) )
			.pipe( gulp.dest(files.jsDstPath) );

		// funnily prints the copyright twice!
		gulp.src(files.jsDst)
			.pipe( header(fs.readFileSync(files.copyright, 'utf8'), {version: fs.readFileSync(files.version)}) )
			.pipe( gulp.dest(files.jsDstPath) );

	});

}());