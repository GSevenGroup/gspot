var packageJSON = require('./package.json');
var elixir = require('laravel-elixir');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var cache = require('gulp-cache');
var imagemin = require('imagemin');
var debug = require('gulp-debug');


var FEapp = "frontend/app";
var publicjs = "public/js";
var publiccss = "public/css";
var publiclib = "public/lib";
var publictpl = "public/tpl";
var publiclangs = "public/langs";
var publicimg = "public/img";
var publicfonts = "public/fonts";

elixir(function(mix) {
  mix.less('app.less');
  mix.sass('app.sass');
});

/**
 *  compile sass task
 */
gulp.task('sass', function () {
  return gulp.src(FEapp + '/scss/*.scss')
    .pipe(sass())
    .pipe(concat('gApp.css'))
    // .pipe(ngAnnotate({add: true}))
    .pipe(gulp.dest(FEapp + '/css/'));
});

gulp.task('start', function(callback){
  runSequence(['build:js', 'copy:thirdparty', 'copy:langs', 'copy:templates', 'copy:fonts', 'copy:img', 'sass'], 'copy:css', callback)
});
gulp.task('startdev', function(callback){
  runSequence(['builddev:js', 'copy:thirdpartydev', 'copy:langs', 'copy:fonts', 'copy:img', 'copy:templates', 'sass'], 'copy:css', callback)
});
gulp.task('designing', function(callback){
  runSequence(['sass', 'copy:templates'], 'copy:css', callback);
});

gulp.task('build', [ 'build:js', 'copy:thirdparty', 'copy:templates']);

gulp.task('copy:img', function(){
  return gulp.src(FEapp + '/img/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    /*.pipe(cache(imagemin({
      interlaced: true,
      pngquant: true,
      progressive: true
    })))*/
    .pipe(gulp.dest(publicimg));
});

function copyLangs(){
  return gulp.src(FEapp + '/langs/*.json')
    .pipe(gulp.dest(publiclangs));
}
gulp.task('copy:langs', copyLangs);

function copyFonts(){
  return gulp.src([FEapp + '/fonts/*.otf',
    FEapp + '/fonts/*.ttf'])
    .pipe(gulp.dest(publicfonts));
}
gulp.task('copy:fonts', copyFonts);

function resetDist() {
  return gulp.src([publiclib, publicjs, publiccss, publictpl], {read: false})
    .pipe(clean());
}
gulp.task('resetdist', resetDist);

function buildScripts() {
  return gulp.src([
    FEapp + 'requests.js',
    FEapp + 'scheme.js',
    FEapp + '/controllers/*.js',
    FEapp + '/service/*.js',
    FEapp + '/factory/*.js',
    FEapp + '/config/*.js',
    FEapp + '/directive/*.js',
    FEapp + 'index.js'
  ])
    .pipe(concat('gApp.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(uglify({mangle: true }))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(publicjs));
}
gulp.task('build:js', buildScripts);

function buildScripts() {
  return gulp.src([
    FEapp + '/js/requests.js',
    FEapp + '/js/scheme.js',
    FEapp + '/js/index.js',
    FEapp + '/js/controllers/*.js',
    FEapp + '/js/service/*.js',
    FEapp + '/js/factory/*.js',
    FEapp + '/js/config/*.js',
    FEapp + '/js/directive/*.js'
  ])
    .pipe(concat('gApp.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(debug({title: 'unicorn:'}))
    .pipe(gulp.dest(publicjs));
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
    'node_modules/angular-messages/angular-messages.min.js',
    'node_modules/angular-material/angular-material.css',
    'node_modules/angular-material-icons/angular-material-icons.css',
    'node_modules/angular-translate/dist/angular-translate.min.js',
    'otherThirdParty/angular-translate-loader-static-files.min.js'
  ])
    .pipe(gulp.dest(publiclib));
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
    'node_modules/angular-messages/angular-messages.js',
    'node_modules/angular-material/angular-material.css',
    'node_modules/angular-material-icons/angular-material-icons.css',
    'node_modules/angular-translate/dist/angular-translate.min.js',
    'otherThirdParty/angular-translate-loader-static-files.min.js'
  ])
    .pipe(gulp.dest(publiclib));
}
gulp.task('copy:thirdpartydev', copyThirdPartyDev);


function copyTemplates() {
  return gulp.src(FEapp +'/tpl/*.tpl')
    .pipe(gulp.dest(publictpl));
}
gulp.task('copy:templates', copyTemplates);

function copyCSS() {
  return gulp.src(FEapp + '/css/*.css')
    .pipe(gulp.dest(publiccss));
}
gulp.task('copy:css', copyCSS);

/*function copyImg() {
 return gulp.src(FEapp + '/img/*.png')
 .pipe(gulp.dest(publicimg));
 }
 gulp.task('copy:img', copyImg);*/