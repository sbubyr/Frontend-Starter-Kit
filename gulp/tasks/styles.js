var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    rename       = require('gulp-rename'),
    notify       = require('gulp-notify'),
    postcss      = require('gulp-postcss'),
    sass         = require('gulp-sass'),
    cleancss     = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    mqpacker     = require('css-mqpacker'),
    csso         = require('postcss-csso'),
    syntax       = 'sass';
    
var processors = [
  mqpacker({
    sort: sortMediaQueries
  }),
  csso
];

gulp.task('styles', function () {
  return gulp.src('app/' + syntax + '/**/*.' + syntax + '')
    .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(postcss(processors))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }
  return 1;
}