/**
 * Implementation process:
 * ************** style ****************
 * 1. convert less to css
 * 2. concat css files
 * 3. minify css
 * 4. rename minified css with MD5
 * ************** script ****************
 * 1. convert es6 to es5
 * 2. concat js files
 * 3. minify js
 * 4. rename mnified js with MD5
 * ************** html ****************
 * 1. replace resource path with bundled file by using `gulp-html-replace`
 * 2. replace gundled file path with MD5 file by using `gulp-rev-collector`
 * 3. minify html
 */

// common
const config = require('./gulp.config.js');
const gulp = require('gulp');
const concat = require('gulp-concat');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const runSequence = require('run-sequence');
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const plumber = require('gulp-plumber');  // Prevent pipe breaking caused by errors from gulp plugins
const changed = require('gulp-changed');

// style
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const cleanCss = require('gulp-clean-css');

// script
const babel = require('gulp-babel');
const uglifyJs = require('gulp-uglify');

// html
const htmlReplace = require('gulp-html-replace');
const minifyHTML = require('gulp-htmlmin');

// image
const imagemin = require('gulp-imagemin');

/* convert less to css with autoprefix, concat, MD5 */
gulp.task('style', () => {
  return gulp.src(config.src.less)
    .pipe(plumber(err => console.log(err))) // handle error to prevent process unexpected stop
    .pipe(changed(config.dist.css))
    .pipe(less({ plugins: [autoprefix] }))
    .pipe(concat('index.css'))
    .pipe(cleanCss())
    .pipe(rev())
    .pipe(gulp.dest(config.dist.css))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.temp.revCss));
});

/* convert es6 to es5, concat, uglify, MD5 */
gulp.task('script', () => {
  return gulp.src(config.src.js)
    .pipe(plumber(err => console.log(err)))
    .pipe(changed(config.dist.js))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('index.js')) 
    .pipe(uglifyJs())
    .pipe(rev())
    .pipe(gulp.dest(config.dist.js))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.temp.revJs))
});

/* replace resource path with bundled file */
gulp.task('replaceHTML', () => {
  return gulp.src(config.src.html)
    .pipe(htmlReplace({
      css: './css/index.css',
      js: './js/index.js'
    }))
    .pipe(gulp.dest(config.temp.middleHTML.path));
});

/* replace bundled file path with MD5 file, minify html */
gulp.task('rev', ['replaceHTML'], () => {
  gulp.src(['temp/rev/**/*.json', config.temp.middleHTML.filePath])
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        './css': function (manifest_value) {
          // return config.dist.cdn + '/css/' + manifest_value;
          return './css/' + manifest_value;
        },
        './js': function (manifest_value) {
          // return config.dist.cdn + '/js/' + manifest_value;
          return './js/' + manifest_value;
        },
      }
    }))
    .pipe(minifyHTML({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));  // reload page when builded html has changed
});

// copy vendor
gulp.task('vendor', () => {
  return gulp.src(config.src.extraAssets.path, { base: config.src.extraAssets.base })
    .pipe(gulp.dest(config.dist.extraAssets.path));
});

// minify image
gulp.task('image', () => {
  return gulp.src(config.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(config.dist.img));
});

// clean:dist
gulp.task('clean:dist', () => {
  del(config.dist.path);
});

// clean:temp
gulp.task('clean:temp', () => {
  del(config.temp.path);
});

// task:build 
gulp.task('build', cb => {
  runSequence('style', 'script', 'replaceHTML', 'rev', 'vendor', 'image', cb);
});

gulp.task('serve', ['build'], function () {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('dev/less/*.less', cb => {
    del(config.dist.css).then(() => {
      runSequence('style', 'rev')
    });
  });

  gulp.watch('dev/js/*.js', cb => {
    del(config.dist.js).then(() => {
      runSequence('script', 'rev')
    });
  });
});

// task:default
gulp.task('default', ['build'], () => {
  del(['temp']); // Delete temporaty directory when build completed.
});