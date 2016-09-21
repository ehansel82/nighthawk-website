/* File: gulpfile.js */

var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    rename = require('gulp-rename');

//Get all externalJS and place it in a source folder
gulp.task('copyjs', function() {
   gulp.src(['node_modules/jquery/dist/jquery.js',
             'node_modules/angular/angular.js',
             'node_modules/bootstrap/dist/js/bootstrap.js',
             'node_modules/angular-route/angular-route.js',
             'node_modules/angular-animate/angular-animate.js',
             'node_modules/moment/moment.js'])
        .pipe(gulp.dest('source'));
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


gulp.task('compress', function (cb) {
  pump([
        gulp.src('source/bundle.js'),
        rename('bundle.min.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['copyjs', 'concatjs']);
});
