var gulp = require('gulp');
var path = require("path")
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var glob = require("glob")
var del = require("del")
var webpack = require("webpack")
var cnf = require("./webpack.config.js")
var dest = './public/javascripts/build'

gulp.task('clean', function() {
  del(dest)
})

gulp.task('webpack', function(done) {
  webpack(cnf, function(err, stats){
    if(err) throw new gutil.PluginError("webpack", err);
    // gutil.log("[webpack]", stats.toString({
    //   // output options
    // }));
    done();
  })
})

gulp.task('browserify-lib', function() {
  browserify()
    .require("react")
    .require("jquery")
    .bundle()
    .pipe(source("lib.js"))
    .pipe(gulp.dest(dest))
})

gulp.task('browserify-client', function() {
  var base = "./js/entries"
  glob.sync('**/*.js', {cwd: base}).forEach(function(file){
    browserify({
      entries: path.join(base, file),
      extensions: ['jsx']
    })
    .transform("babelify") // こっちだけにしたい
    .external("react")
    .external("jquery")
    .bundle()
    .pipe(source(file))
    .pipe(gulp.dest(path.join(dest, "client")))
  })
});

gulp.task('watch', function() {
  gulp.watch('js/**/*', ['browserify'])
});

gulp.task('browserify', ['clean', 'browserify-lib', 'browserify-client']);
gulp.task('default', ['browserify', 'watch']);