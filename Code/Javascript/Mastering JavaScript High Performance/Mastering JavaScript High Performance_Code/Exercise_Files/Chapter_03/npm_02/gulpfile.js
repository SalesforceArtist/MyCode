var gulp = require('gulp');
var jslint = require('gulp-jslint');


gulp.task('jslint', function() {
          return gulp.src(['./src/*.js'])
          .pipe(jslint({
                       /** Set JSLint options */
                       browser: true,
                       todo: true,
                       devel: true,
                       white: true,
                       reporter: 'default',
                       errorsOnly: false
                       }))
          .on('error', function (error) {
              console.error(String(error));
              });
          });

/* Required 'default' task with array of tasks. */
gulp.task('default', ['jslint'], function() {
          
});