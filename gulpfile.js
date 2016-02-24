
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
		npm: './package.json',
		bower: './bower.json',
		copyright: './copyright.txt',
		version: './version.txt',
		toClean: ['dist/js/*.js', 'dist/*.html'],
		jsSrc: ['src/js/*.js'],
		jsDst: ['dist/js/*.js'],
		cssSrc: 'src/styles/*.css',
		cssDstPath: 'dist/css',
		jsDstPath: 'dist/js',
		htmlSrc: 'src/*.html',
		htmlDstPath: 'dist',
	};

	gulp.task('default', function() {

		var pkg = require(files.npm);

		gulp.src(files.toClean)
			.pipe(clean(), {read: false})

		gulp.src(files.jsSrc)
			.pipe( uglify().on('error', gutil.log) )
			.pipe( gulp.dest(files.jsDstPath) );

		// funnily prints the copyright twice!
		gulp.src(files.jsDst)
			.pipe( header(fs.readFileSync(files.copyright, 'utf8'), {version: fs.readFileSync(files.version)}) )
			.pipe( gulp.dest(files.jsDstPath) );

		gulp.src(files.cssSrc, { read: false })
			.pipe( inject(gulp.src(files.cssSrc, {read: false})) )
			.pipe( gulp.dest(files.cssDstPath) );

		gulp.src(files.htmlSrc)
			.pipe(wiredep({
				directory: files.vendor,
				bowerJson: require(files.bower),
			}))
			.pipe( gulp.dest(files.htmlDstPath) );
	});
	/*
		gulp.src('src/index.html')
			.pipe( srcMaps.init() )
			.pipe(wiredep({
				directory: './dist/js/vendor/',
				bowerJson: require('./bower.json'),
			}))
			.pipe( srcMaps.write() )
			.pipe( useref() )
			.pipe( gulpif('*.js', uglify()) )
			.pipe( gulpif('*.css', minCss()) )
			.pipe( gulp.dest('dist') );
	*/
}());