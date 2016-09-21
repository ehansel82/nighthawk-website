/* File: gulpfile.js */

var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css');

gulp.task('copyjs', function() {
   gulp.src(['node_modules/jquery/dist/jquery.js',
             'node_modules/angular/angular.js',
             'node_modules/bootstrap/dist/js/bootstrap.js',
             'node_modules/angular-route/angular-route.js',
             'node_modules/angular-animate/angular-animate.js',
             'node_modules/moment/moment.js'])
        .pipe(gulp.dest('source'));
});

gulp.task('copycss', function() {
   gulp.src(['node_modules/font-awesome/css/font-awesome.css'])
        .pipe(gulp.dest('styles'));
});

gulp.task('copyfonts', function() {
   gulp.src(['node_modules/bootstrap/fonts/*.*'])
        .pipe(gulp.dest('fonts'));
});

gulp.task('concatjs', function() {
  return gulp.src(['source/jquery.js',
                   'source/bootstrap.js',
                   'source/moment.js',
                   'source/angular.js',
                   'source/angular-route.js',
                   'source/angular-animate.js', 
                   'app/app.module.js', 
                   'app/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('source'));
});

gulp.task('concatcss', function() {
  return gulp.src(['styles/font-awesome.css',
                   'styles/bootstrap-slate.css',
                   'styles/animate.css',
                   'styles/site.css'])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('source'));
});

gulp.task('cleancss', function() {
  return gulp.src(['source/bundle.css'])
    .pipe(cleanCSS())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('compressjs', function (cb) {
  pump([
        gulp.src('source/bundle.js'),
        uglify(),
        rename('bundle.min.js'),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('compress', ['cleancss', 
                      'compressjs'] , function() {
});

gulp.task('default', ['copyjs', 
                      'copycss',
                      'concatjs',
                      'concatcss',
                      'compress'] , function() {
});

gulp.task('watch', function() {
  gulp.watch(['styles/**/*.css','app/**/*.,js'], ['concatjs',
                                                  'concatcss']);
});
