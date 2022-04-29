/*jshint node: true, strict: false */

var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

// ----- hint ----- //

var jshint = require('gulp-jshint');

gulp.task( 'hint-js', function() {
  return gulp.src('js/*.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'hint-test', function() {
  return gulp.src('test/unit/*.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'hint-task', function() {
  return gulp.src('gulpfile.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

var jsonlint = require('gulp-json-lint');

gulp.task( 'jsonlint', function() {
  return gulp.src( '*.json' )
    .pipe( jsonlint() )
    .pipe( jsonlint.report('verbose') );
});

gulp.task( 'hint', [ 'hint-js', 'hint-test', 'hint-task', 'jsonlint' ]);

// -------------------------- make pkgd -------------------------- //

// regex for banner comment
var reBannerComment = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');

function getBanner() {
  var src = fs.readFileSync( 'js/isotope.js', 'utf8' );
  var matches = src.match( reBannerComment );
  var banner = matches[0].replace( 'Isotope', 'Isotope PACKAGED' );
  return banner;
}

function addBanner( str ) {
  return replace( /^/, str );
}

var rjsOptimize = require('gulp-requirejs-optimize');

gulp.task( 'requirejs', function() {
  var definitionRE = /define\(\s*'isotope\-layout\/\js\/isotope'(.|\n)+\],/;
  var banner = getBanner();
  // HACK src is not needed
  // should refactor rjsOptimize to produce src
  return gulp.src('js/isotope.js')
    .pipe( rjsOptimize({
      baseUrl: 'bower_components',
      optimize: 'none',
      include: [
        'jquery-bridget/jquery-bridget',
        'isotope-layout/js/isotope'
      ],
      paths: {
        'isotope-layout': '../',
        jquery: 'empty:'
      }
    }) )
    // munge AMD definition
    .pipe( replace( definitionRE, function( definition ) {
      // remove named module
      return definition.replace( "'isotope-layout/js/isotope',", '' )
        // use explicit file paths, './item' -> 'isotope-layout/js/item'
        .replace( /'.\//g, "'isotope-layout/js/" );
    }) )
    // add banner
    .pipe( addBanner( banner ) )
    .pipe( rename('isotope.pkgd.js') )
    .pipe( gulp.dest('dist') );
});


// ----- uglify ----- //

var uglify = require('gulp-uglify');

gulp.task( 'uglify', [ 'requirejs' ], function() {
  var banner = getBanner();
  gulp.src('dist/isotope.pkgd.js')
    .pipe( uglify() )
    // add banner
    .pipe( addBanner( banner ) )
    .pipe( rename('isotope.pkgd.min.js') )
    .pipe( gulp.dest('dist') );
});

// ----- version ----- //

// set version in source files

var minimist = require('minimist');
var gutil = require('gulp-util');
var chalk = require('chalk');

// use gulp version -t 1.2.3
gulp.task( 'version', function() {
  var args = minimist( process.argv.slice(3) );
  var version = args.t;
  if ( !version || !/^\d\.\d+\.\d+/.test( version ) ) {
    gutil.log( 'invalid version: ' + chalk.red( version ) );
    return;
  }
  gutil.log( 'ticking version to ' + chalk.green( version ) );

  gulp.src('js/isotope.js')
    .pipe( replace( /Isotope v\d\.\d+\.\d+/, 'Isotope v' + version ) )
    .pipe( gulp.dest('js') );

  gulp.src( [ 'package.json' ] )
    .pipe( replace( /"version": "\d\.\d+\.\d+"/, '"version": "' + version + '"' ) )
    .pipe( gulp.dest('.') );
});

// ----- default ----- //

gulp.task( 'default', [
  'hint',
  'uglify'
]);
