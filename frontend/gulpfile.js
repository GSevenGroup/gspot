var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');

//var app = require('gulp-express');
//
//var path = require('path');
//gulp.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

var packageJSON = require('./package.json');

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
 * copying all the fonts to dist
 */
gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
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
});

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

/* ---------------------------------------------- */
/* THIS IS SOME COPYING STUFF FOR THE DEV TO WORK */
/* ---------------------------------------------- */

function copyCSSDev() {
	return gulp.src([
		'node_modules/angular-material/angular-material.css',
		'node_modules/angular-material-icons/angular-material-icons.css'
	], {base: '.'})
		.pipe(gulp.dest(packageJSON.config.devDir));
}
gulp.task('copy::css:dev', copyCSSDev);

function copyThirdPartyDev() {
	return gulp.src([
		'node_modules/angular/angular.min.js',
		'node_modules/angular-ui-router/release/angular-ui-router.min.js',
		'node_modules/angular-animate/angular-animate.min.js',
		'node_modules/angular-aria/angular-aria.min.js',
		'node_modules/angular-material/angular-material.min.js',
		'node_modules/angular-material-icons/angular-material-icons.min.js',
		'node_modules/angular-messages/angular-messages.min.js'

	], {base: '.'})
		.pipe(gulp.dest(packageJSON.config.devDir));
}
gulp.task('copy::thirdparty:dev', copyThirdPartyDev);


/**
 * COPYING -----------------------------------------------------------------
 */

function copyHtml() {
	return gulp.src('./app/js/index.html')
		.pipe(gulp.dest(packageJSON.config.destDir));
}
gulp.task('copy::html', copyHtml);

function copyCSS() {
	return gulp.src([
		'./app/css/myapp.css',
		'node_modules/angular-material/angular-material.css',
		'node_modules/angular-material-icons/angular-material-icons.css'
	])
		.pipe(gulp.dest(packageJSON.config.destDir+'/css'));
}
gulp.task('copy::css', copyCSS);

function copyThirdParty() {
	return gulp.src([
		'node_modules/angular/angular.min.js',
		'node_modules/angular-ui-router/release/angular-ui-router.min.js',
		'node_modules/angular-animate/angular-animate.min.js',
		'node_modules/angular-aria/angular-aria.min.js',
		'node_modules/angular-material/angular-material.min.js',
		'node_modules/angular-material-icons/angular-material-icons.min.js',
		'node_modules/angular-messages/angular-messages.min.js'

	])
		.pipe(gulp.dest(packageJSON.config.destdir+'/lib'));
}
gulp.task('copy::thirdparty', copyThirdParty);


function copyTemplates() {
	return gulp.src('./app/js/**/*.tpl')
		.pipe(gulp.dest(packageJSON.config.destdir+'/templates'));
}
gulp.task('copy::templates', copyTemplates);

/**
 * grouping of all watch tasks
 */
gulp.task('watch', ['browserSync', 'sass'], function () {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

/**
 * build task
 */
gulp.task('build', function (callback) {
	runSequence('clean:dist', 'copy::thirdparty', 'copy::html', 'copy::templates', 'copy::css',
		['sass', 'useref', 'images', 'fonts'],
		callback
	)
});

gulp.task('startdev', function (callback) {
	runSequence('clean:dist', 'copy::thirdparty:dev', 'copy::css:dev', ['sass','browserSync', 'watch'],
		callback
	)
});