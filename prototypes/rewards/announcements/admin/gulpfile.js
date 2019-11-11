var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    sass = require('gulp-sass'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    compass = require('gulp-compass'),
    rename = require("gulp-rename");

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('**/css/**/*.scss')
        .pipe(compass({
          project: path.join(__dirname, '/'),
          css: 'css',
          sass: 'css'
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifyCSS({keepSpecialComments:0}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

// Default task to be run with `gulp`
gulp.task('default', ['sass','browser-sync'], function () {
    gulp.watch("../../../../admin/**/*.scss", ['sass']);
    gulp.watch("**/css/*.scss", ['sass']);
});