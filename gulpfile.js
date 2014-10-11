var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass')
 
gulp.task('jshint', function() {
	gulp.src(['./src/scripts/*.js', './src/scripts/app/**/*.js', './src/scripts/lib/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
    gulp.src('./src/styles/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/styles/css'));
});

gulp.task('watch', function() {
	gulp.watch(['./src/scripts/**/*.js'], ['jshint']);
	gulp.watch(['./src/styles/scss/**/*.scss'], ['sass']);
});

gulp.task('default', ['watch', 'jshint', 'sass']);