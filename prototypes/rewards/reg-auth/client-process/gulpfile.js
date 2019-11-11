var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

// Global Config Values
var config = require('./bower_components/css/gulp.json');

// Browser Sync Task
gulp.task('browser-sync', function () {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });
});

// SASS Task
gulp.task('sass', function () {
    gulp.src(['scss/*.scss'])
        .pipe(plugins.rubySass(config.sassOptions))
        .pipe(gulp.dest(config.css_path))
        .pipe(plugins.filter('**/*.css'))
        .pipe(browserSync.reload({stream: true}));
});

// SCSS Lint Task
gulp.task('lint', function() {
    gulp.src('scss/**/*.scss')
        .pipe(plugins.scssLint(config.lintOptions));
});

// Default gulp task with Browser Sync
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch('**/*.scss', ['sass']);
});