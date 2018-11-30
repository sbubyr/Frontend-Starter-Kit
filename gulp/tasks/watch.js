var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    syntax      = 'sass';

gulp.task('watch', ['styles', 'server'], function () {
  gulp.watch('app/' + syntax + '/**/*.' + syntax + '', ['styles']);
  gulp.watch('app/*.html', browserSync.reload)
});