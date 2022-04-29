var gulp        = require('gulp'),
    less        = require('gulp-less'),
    watch       = require('gulp-watch'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    plumber     = require('gulp-plumber'),
    browserSync = require('browser-sync');


// less -> css
gulp.task('less', function () {
    return gulp.src('./less/icono.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./build'));
});


// .css -> .min.css
gulp.task('cssmin', function () {
    gulp.src('./build/icono.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});


// live realod the browser
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './',
            index: 'index.html',
            reloadDelay: 2000
        }
    });
});


gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['./less/**/*.less', './index.html'], ['less', 'cssmin', browserSync.reload]);
});
