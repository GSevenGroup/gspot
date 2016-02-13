var packageJSON = require('./package.json'); 
var elixir = require('laravel-elixir');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var sass = require('gulp-sass');

var appdist = "./frontend/app/js";

elixir(function(mix) {
    mix.less('app.less');
});

/**
 *  compile sass task
 */
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
      .pipe(sass())
});

gulp.task('start', [ 'build:js', 'copy:thirdparty', 'copy:html', 'copy:templates', 'copy:css']);
gulp.task('startdev', [ 'builddev:js', 'copy:thirdpartydev', 'copy:html', 'copy:templates', 'copy:css']);

gulp.task('build', [ 'build:js', 'copy:thirdparty', 'copy:html', 'copy:templates']);



function resetDist() {
	return gulp.src('./public/dist', {read: false})
		.pipe(clean());
}
gulp.task('resetdist', resetDist);

function buildScripts() {
    gulp.src([
        appdist+'/**/*controller.js',
        appdist+'/**/*filter.js',
        appdist+'/**/*service.js',
        appdist+'/**/*factory.js',
        appdist+'/**/*config.js',
        appdist+'/**/*directive.js',
        appdist+'/**/*run.js',
        appdist+'/**/*module.js',
        appdist+'/index.js'
    ])
    .pipe(concat('myapp.js'))        
    .pipe(ngAnnotate({add: true}))
    .pipe(uglify({mangle: true }))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(packageJSON.config.destdir));
}
gulp.task('build:js', buildScripts);

function buildScripts() {
    gulp.src([
         appdist+'/**/*controller.js',
         appdist+'/**/*filter.js',
         appdist+'/**/*service.js',
         appdist+'/**/*factory.js',
         appdist+'/**/*config.js',
         appdist+'/**/*directive.js',
         appdist+'/**/*run.js',
         appdist+'/**/*module.js',
         appdist+'/index.js'
    ])
    .pipe(concat('myapp.js'))        
    .pipe(ngAnnotate({add: true}))
    .pipe(gulp.dest(packageJSON.config.destdir));
}
gulp.task('builddev:js', buildScripts);

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
gulp.task('copy:thirdparty', copyThirdParty);

function copyThirdPartyDev() {
    return gulp.src([
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/angular-material/angular-material.js',
        'node_modules/angular-material-icons/angular-material-icons.js',
        'node_modules/angular-messages/angular-messages.js'
    ])
    .pipe(gulp.dest(packageJSON.config.destdir+'/lib'));
}
gulp.task('copy:thirdpartydev', copyThirdPartyDev);


function copyHtml() {
    return gulp.src(appdist+'/index.php')
    .pipe(gulp.dest("./resources/views"));
}
gulp.task('copy:html', copyHtml);


function copyTemplates() {
    return gulp.src(appdist+'/**/*.tpl')
    .pipe(gulp.dest(packageJSON.config.destdir+'/templates'));
}
gulp.task('copy:templates', copyTemplates);

function copyCSS() {
    return gulp.src([
         './frontend/app//css/myapp.css',
        'node_modules/angular-material/angular-material.css',
        'node_modules/angular-material-icons/angular-material-icons.css'
    ])
    .pipe(gulp.dest(packageJSON.config.destdir+'/css'));
}
gulp.task('copy:css', copyCSS);