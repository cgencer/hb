
(function() {

	var gulp = require('gulp'),
 browserSync = require('browser-sync').create();
		  fs = require('fs'),
	   clean = require('gulp-clean'),
	 replace = require('gulp-replace'),
       swig  = require('swig'),
	  inject = require('gulp-inject'),
	  uglify = require('gulp-uglify'),
	uglifyjs = require('gulp-uglifyjs'),
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
			.pipe($.inject( gulp.src([ files.cssSrc ], {read: false}), {relative: true}) )
			.pipe($.inject( gulp.src([ files.jsSrc ], {read: false}), {relative: true}) ) 
			.pipe( wiredep({
				cwd: files.htmlDstPath,
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

		browserSync.init({
			baseDir: 'dist',
			index: 'index.html',
			browser: ['firefox'],
			files: ['src/index.html', 'dist/index.html', 'js/*.js', 'styles/*.css', 'src/js/*.js', 'src/styles/*.css'],
			server: {
				baseDir: 'dist'
			}
/*
			middleware:function (req, res, next) {
				var path = req.url.slice(-1) === '/' ? req.url + 'index.html' : req.url;
				fs.exists('www' + path,function(exists) {
					if (exists) {
						var html = swig.renderFile('dist/index.html', {});
						html = html.replace(/<\/body>/, '<script async src="file://js/vendor/browser-sync-client/dist/index.min.js"></script></body>');
						res.end(html);
					} else {
						next();
					}
				});
			}
*/
		});
		gulp.watch(['index.html','js/*.js']).on('change', browserSync.reload);

			// inject the CSS files manually
		gulp.src(files.htmlSrc)
			.pipe( inject(gulp.src(files.cssSrc, {read: false}), {relative: true}) ) 
			.pipe( inject(gulp.src(files.jsSrc, {read: false}), {relative: true}) ) 
			.pipe( gulpif('*.css', minCss().on('error', gutil.log)) )
			.pipe( gulpif('*.js', uglify().on('error', gutil.log)) )
			.pipe( replace('../dist/', ''))
			.pipe( gulp.dest(files.htmlDstPath) );

		gulp.src(files.jsSrc)
			.pipe( uglify().on('error', gutil.log) )
			.pipe( gulp.dest(files.jsDstPath) );

		gulp.src(files.cssSrc)
			.pipe( minCss().on('error', gutil.log) )
			.pipe( gulp.dest(files.cssDstPath) );

			// squeeze the babes... #http://stackoverflow.com/questions/24591854/using-gulp-to-concatenate-and-uglify-files
		gulp.src(files.jsSrc)
			.pipe( uglifyjs('compiled.js', {
				output: {
					beautify: false
				},
				outSourceMap: true,
				basePath: './',
				sourceRoot: '/'
			}) )
			.pipe( gulp.dest(files.jsDstPath) );


/*
		// funnily prints the copyright twice!
		gulp.src(files.jsDst)
			.pipe( header(fs.readFileSync(files.copyright, 'utf8'), {version: fs.readFileSync(files.version)}) )
			.pipe( gulp.dest(files.jsDstPath) );
*/


	});

	gulp.task('watch', function() {
		gulp.watch('index.html', ['default']);
		gulp.watch('js/*.js', ['default']);
		gulp.watch('css/*.css', ['default']);
	});

}());