var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  path = require('path'),
  debug = require('gulp-debug');

gulp.task('webserver', function() {
  return gulp.src('dist')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      directoryListing: false,
      open: true
    }));
});


gulp.task('copy', function () {
      gulp.watch(['src/app/*.html',
                    'src/app/*.js',
                     'src/stylesheets/*.css',
                    'src/stylesheets/**'], function() {
        gulp.src(['src/app/*.html',
                    'src/app/*.js',
                     'src/stylesheets/*.css',
                    'src/stylesheets/**'])
        .pipe(debug())
        .pipe(gulp.dest('dist'));
      });
});


gulp.task('default', ['copy', 'webserver']);
