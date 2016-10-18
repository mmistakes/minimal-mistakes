var gulp = require('gulp');
browserSync = require('browser-sync');
sass = require('gulp-sass');
cp = require('child_process');

var base_path = './',
  src = base_path + '_sass',
  dist = base_path + 'assets',
  paths = {
    js: src + '/js/*.js',
    scss: [
      src + '/*.scss',
      src + '/**/* .scss',
      src + '/**/**/*.scss',
      src + '/**/**/**/*.scss',
      src + '/**/**/**/**/*.scss',
      src + '/**/**/**/**/**/*.scss'
    ],
    jekyll: [
      'index.html',
      '_posts/*',
      '_layouts/*',
      '_includes/*',
      'assets/*',
      'assets/**/*'
    ]
  };
// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

  browserSync.init({server: "_site/", https: true});
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
  return gulp.src(paths.scss).pipe(sass()).pipe(gulp.dest("css")).pipe(browserSync.reload({stream: true}));
});

// build Jekyll
gulp.task('build-jekyll', function(done) {
  return cp.spawn('C:\\Ruby23-x64\\bin\\bundle.bat', [
    'exec', 'jekyll', 'build'
  ], {stdio: 'inherit'}).on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['build-jekyll'], function() {
  browserSync.reload();
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});

gulp.task('default', ['serve', 'watch']);
