var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var src = ['./js/**/*.jsx', './js/**/*.js']
gulp.task('browserify', function() {
  browserify(src, { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('watch', function() {
  gulp.watch(src, ['browserify'])
});

gulp.task('default', ['browserify', 'watch']);