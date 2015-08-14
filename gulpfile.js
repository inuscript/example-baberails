var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var glob = require("glob")

gulp.task('browserify', function() {
  return browserify({
    entries: glob.sync('./js/entries/*.js'),
    extensions: ['jsx']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'))
});

gulp.task('watch', function() {
  gulp.watch('js/**/*', ['browserify'])
});

gulp.task('default', ['browserify', 'watch']);