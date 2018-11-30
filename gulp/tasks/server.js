var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  });
});