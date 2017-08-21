var fs           = require('fs')
var gulp         = require('gulp')
var path         = require('path')
var sass         = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps   = require('gulp-sourcemaps')
var cleanCSS     = require('gulp-clean-css')
var rename       = require('gulp-rename')
var concat       = require('gulp-concat')
var uglify       = require('gulp-uglify')
var connect      = require('gulp-connect')
var open         = require('gulp-open')
var babel        = require('gulp-babel')
var replace      = require('gulp-replace')
var wrapper      = require('gulp-wrapper')
var runSequence  = require('run-sequence')
var del          = require('del')
var gulpIgnore   = require('gulp-ignore')

var Paths = {
  HERE                 : './',
  SCSS_TOOLKIT_SOURCES : 'vendor/bootstrap_theme/scss/active_admin_gulp*',
  SCSS                 : 'vendor/bootstrap_theme/scss/**/**',
  JS                   : [
    "vendor/bootstrap_theme/js/bootstrap/util.js",
    "vendor/bootstrap_theme/js/bootstrap/alert.js",
    "vendor/bootstrap_theme/js/bootstrap/button.js",
    "vendor/bootstrap_theme/js/bootstrap/carousel.js",
    "vendor/bootstrap_theme/js/bootstrap/collapse.js",
    "vendor/bootstrap_theme/js/bootstrap/dropdown.js",
    "vendor/bootstrap_theme/js/bootstrap/modal.js",
    "vendor/bootstrap_theme/js/bootstrap/tooltip.js",
    "vendor/bootstrap_theme/js/bootstrap/popover.js",
    "vendor/bootstrap_theme/js/bootstrap/scrollspy.js",
    "vendor/bootstrap_theme/js/bootstrap/tab.js",
    'vendor/bootstrap_theme/js/custom/*'
  ],
  JS_TOOLKIT_SOURCES   : 'app/assets/javascripts/active_admin_gulp*',
  DIST                 : 'app/assets/stylesheets',
  DIST_TOOLKIT_JS      : 'app/assets/javascripts'
}

var banner  = '/*!\n' +
  ' * Bootstrap\n' +
  ' * Copyright 2011-2016\n' +
  ' * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n' +
  ' */\n'
var jqueryCheck = 'if (typeof jQuery === \'undefined\') {\n' +
   '  throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\\\'s JavaScript.\')\n' +
   '}\n'
var jqueryVersionCheck = '+function ($) {\n' +
  '  var version = $.fn.jquery.split(\' \')[0].split(\'.\')\n' +
  '  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {\n' +
  '    throw new Error(\'Bootstrap\\\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0\')\n' +
  '  }\n' +
  '}(jQuery);\n\n'

gulp.task('default', ['scss-min', 'js-min'])

gulp.task('watch', function () {
  gulp.watch(Paths.SCSS, ['scss']);
  gulp.watch(Paths.JS,   ['js']);
  gulp.watch(Paths.SCSS);
  gulp.watch(Paths.JS);
})

gulp.task('production', function(callback){
  runSequence('delete-gulped-css', 'delete-gulped-js', 'scss-min', 'js-min', callback);
});

// gulp.task('delete-gulped-css', function(){
//   return gulp.src("./app/assets/stylesheets/*.css", { read: false }) // much faster
//     .pipe(rimraf({ force: true }));
// });

gulp.task('delete-gulped-css', function () {
  return del([
    Paths.DIST + '/active_admin_gulp*',
  ]);
});

gulp.task('delete-gulped-js', function () {
  return del([
    Paths.DIST_TOOLKIT_JS + '/active_admin_gulp*',
  ]);
});

gulp.task('docs', ['server'], function () {
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:9001/docs/'}))
})

gulp.task('server', function () {
  connect.server({
    root: 'docs',
    port: 9001,
    livereload: true
  })
})

gulp.task('scss', function () {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(Paths.DIST))
})

gulp.task('scss-min', ['scss'], function () {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(Paths.DIST))
})

gulp.task('js', function () {
  return gulp.src(Paths.JS)
    .pipe(concat('active_admin_gulp.js'))
    .pipe(replace(/^(export|import).*/gm, ''))
    .pipe(babel({
        "compact" : false,
        "presets": [
          [
            "es2015",
            {
              "modules": false,
              "loose": true
            }
          ]
        ],
        "plugins": [
          "transform-es2015-modules-strip"
        ]
      }
    ))
    .pipe(wrapper({
       header: banner +
               "\n" +
               jqueryCheck +
               "\n" +
               jqueryVersionCheck +
               "\n+function () {\n",
       footer: '\n}();\n'
    }))
    .pipe(gulp.dest(Paths.DIST_TOOLKIT_JS))
})

gulp.task('js-min', ['js'], function () {
  return gulp.src(Paths.JS_TOOLKIT_SOURCES)
    .pipe(uglify())
    .pipe(gulp.dest(Paths.DIST_TOOLKIT_JS))
})
