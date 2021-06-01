var gulp = require('gulp');
var jslint = require('gulp-jslint');
var uglify = require('gulp-uglify');

gulp.task('minify', function() {
          gulp.src('./src/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('dist'))
});

gulp.task('jslint', function() {
          return gulp.src(['./dist/*.js'])
          .pipe(jslint({
                       /** Set JSLint options */
                       browser: true,
                       todo: true,
                       devel: true,
                       white: true,
                       reporter: 'default',
                       errorsOnly: true
                       }))
          .on('error', function (error) {
              console.error(String(error));
              });
          });

/* Required 'default' task with array of tasks. */
gulp.task('default', ['minify', 'jslint'], function() {
          
});