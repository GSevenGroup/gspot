var gulp = require('gulp');
var sass = require('sass');
var browserSync = require('browser-sync');
var useref = require('gulp-require');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');

/**
 *  compile sass task
 */
gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/**
 * optimalizes all the img files and copies them to dev
 */
gulp.task('images', function(){
	return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
		// Caching images that ran through imagemin
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/img'))
});

/**
 * cleans dist dir
 */
gulp.task('clean:dist', function() {
	return del.sync('dist');
})

/**
 * builds all the js,css etc provided to one file
 */
gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

/**
 * creates the live reload function
 */
gulp.task('browserSync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
});

/**
 * grouping of all watch tasks
*/
gulp.task('watch', ['browseSync', 'sass'], function () {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

/**
 * build task
 */
gulp.task('build', function (callback) {
	runSequence('clean:dist',
		['sass', 'useref', 'images', 'fonts'],
		callback
	)
});

gulp.task('startdev', function (callback) {
	runSequence(['sass','browserSync', 'watch'],
		callbacks
	)
});