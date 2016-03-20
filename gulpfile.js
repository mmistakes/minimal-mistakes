/* ==========================================================================
   MINIMAL MISTAKES JEKYLL THEME - Gulpfile
   ========================================================================== */

/**
*
* Packages used
*
**/
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var prefix          = require('gulp-autoprefixer');
var plumber         = require('gulp-plumber');
var uglify          = require('gulp-uglifyjs');
var jshint          = require('gulp-jshint');
var rename          = require('gulp-rename');
var imagemin        = require('gulp-imagemin');
var imageminMozjpeg = require('imagemin-mozjpeg');

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
  return gulp.src('assets/_scss/**/*.scss')
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
  return gulp.src(['assets/js/vendor/jquery/*.js', 'assets/js/plugins/**/*.js', 'assets/js/_main*.js'])
    .pipe(uglify())
    .pipe(rename({
      basename: 'main',
      suffix: '.min',
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
  return gulp.src('assets/js/_*.js')
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
      // optimizationLevel: 7,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: true}],
      // use: [imageminMozjpeg()]
    }))
    .pipe(gulp.dest('images'));
});


/**
*
* Default task
* - Runs scss, scripts, and image tasks
* - Watches for scss and script changes
*
**/
gulp.task('default', ['css', 'jslint', 'images', 'scripts'], function () {
  gulp.watch('assets/_scss/**/*.scss', ['css']);
  gulp.watch('assets/js/_*.js', ['jslint']);
  gulp.watch(['!assets/js/**/*_.js', 'assets/js/plugins/**/*.js', 'assets/js/vendor/**/*.js'], ['scripts']);
});