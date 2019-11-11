var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

//must npm install gulp-sass, gulp, and browswer-sync in command line for this to work
//after that run 'gulp' in command line in project folder
//for browser sync set up: http://www.shakyshane.com/javascript/nodejs/2014/01/25/gulpjs-sass-browsersync-ftw/

gulp.task('sass', function () {
    gulp.src('scss/*.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('css/'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "./*.html", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']);
});