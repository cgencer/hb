var gulp = require('gulp');
var gulpCopy = require('gulp-copy');
require('wiredep')({

//	directory: 		'.bowerrc'.directory || bower_components,
//	bowerJson: 		require('./bower.json'),
	src: 			['filepaths', 'and/even/globs/*.html', 'to take', 'control of.'],
//	cwd: 			'./',
//	exclude: [ /jquery/, 'bower_components/modernizr/modernizr.js' ],
//	ignorePath: /string or regexp to ignore from the injected filepath/,

	dependencies: true,    // default: true
	devDependencies: true, // default: false


gulp.task('default', function() {

	gulp.src('./src/*.js')
		.pipe(gulpCopy('./dist'));

	gulp.src('./src/footer.html')
		.pipe(wiredep({
//			optional: 'configuration',
		}))
		.pipe(gulp.dest('./dest'));

});