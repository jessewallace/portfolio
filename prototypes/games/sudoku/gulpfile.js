var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

// Global Config Values
var config = require('./scss/gulp.json');

// Browser Sync Task
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// SASS Task
gulp.task('sass', function () {
    gulp.src([config.sass_path + '/**/*.scss'])
        .pipe(plugins.rubySass(config.sassOptions))
        .pipe(plugins.autoprefixer(config.browsers))
        .pipe(gulp.dest(config.css_path))
        .pipe(plugins.filter('**/*.css'))
        .pipe(browserSync.reload({stream: true}));
});

// SCSS Lint Task
gulp.task('lint', function() {
    gulp.src(config.sass_path + '/**/*.scss')
        .pipe(plugins.scssLint(config.lintOptions))
});

// Default gulp task with Browser Sync
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch('**/*.scss', ['sass']);
});