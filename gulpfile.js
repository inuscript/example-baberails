var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');

var src = ['js/**/*.jsx', 'js/**/*.js']
gulp.task('browserify', function() {
  return browserify({
    entries: ['js/entry.js'],
    extensions: ['jsx']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'))
});

gulp.task('watch', function() {
  gulp.watch(src, ['browserify'])
});

gulp.task('default', ['browserify', 'watch']);