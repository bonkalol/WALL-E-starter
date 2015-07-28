var gulp = require('gulp'),
	watch = require('gulp-watch'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sourcemaps = require('gulp-sourcemaps'),
	colors = require('colors'),
	rename = require('gulp-rename'),
	gutil = require('gulp-util');

var name = 'WALL-E-Starter';

gulp.task('browser-sync', function() {
	browserSync({

		open: false,

		server: {
			baseDir: "."
		}
	});

});

function log(error) {

	console.log(("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
	error.message + "]");

};


gulp.task('concat', function () {

	return gulp.src('app/**/*.js')
		.pipe(plumber({errorHandler: log}))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat(name + '.js'))
		.pipe(sourcemaps.write('maps/'))
		.pipe(gulp.dest('./builded/'));

});

gulp.task('build', function () {

	for (var i = 0; i < 2; i++) {

			gulp.src('app/**/*.js')
			.pipe(plumber({errorHandler: log}))
			.pipe(babel())
			.pipe(concat(name + '.js'))
			.pipe(i === 1 ? rename({suffix: '.min'}) : gutil.noop())
			.pipe(i === 1 ? uglify() : gutil.noop())
			.pipe(gulp.dest('./'));

	}

});

gulp.task('default', function () {

	gulp.start('browser-sync');

	watch('app/**/*.js', function () {

		gulp.start('concat');

	});

});