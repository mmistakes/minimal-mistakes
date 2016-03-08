/* ==========================================================================
   MINIMAL MISTAKES JEKYLL THEME - Gulpfile
   ========================================================================== */

/**
*
* Packages used
*
**/
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var prefix       = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglifyjs');
var jshint       = require('gulp-jshint');
var rename       = require("gulp-rename");
var imagemin     = require("gulp-imagemin");
var pngquant     = require('imagemin-pngquant');

/**
*
* Styles
* - Compile
* - Compress/Minify
* - Catch errors (gulp-plumber)
* - Run through Autoprefixer
*
**/
gulp.task('css', function() {
  gulp.src('_assets/css/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix('last 2 versions', '> 5%', 'ie 9'))
  .pipe(plumber())
  .pipe(gulp.dest('assets/css'));
});

/**
*
* Javascript
* - Concatenate main script with plugins
* - Uglify
* - Rename
*
**/
gulp.task('scripts', function() {
  gulp.src(['_assets/js/*.js', '_assets/js/plugins/*.js'])
    .pipe(uglify())
    .pipe(rename({
      basename: "main",
      suffix: ".min",
    }))
    .pipe(gulp.dest('assets/js'))
});

/**
*
* Javascript
* - Lint for errors
*
**/
gulp.task('jslint', function() {
  return gulp.src('_assets/js/_*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
});

/**
*
* Images
* - Optimize image assets
*
**/
gulp.task('images', function () {
  return gulp.src('images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('images'));
});


/**
*
* Default task
* - Runs scss, scripts and image tasks
* - Watches for scss, script, and image changes
*
**/
gulp.task('default', ['css', 'jslint', 'scripts', 'images'], function () {
  gulp.watch('_assets/**/*.scss', ['css']);
  gulp.watch('_assets/js/_*.js', ['jslint']);
  gulp.watch('_assets/js/**/*.js', ['scripts']);
  gulp.watch('images/*', ['images']);
});