var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    exec = require('gulp-exec'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare');

application = {
    less: {
        src: ['./app/less/**/*.less'],
        dest: "./build/css"
    },
    js: {
        src: ['./app/js/**/*.js'],
        dest: "./build/js/"
    },
    template: {
        src: ['./app/js/plugins/**/*.html'],
        dest: "./build/js/",
        name: "templates.js"
    }
};


/**
 * Default task
 */
gulp.task("default", ["watch"]);

/**
 * Build all project source.
 */
gulp.task("build", ["clean", "less", "js"]);

/**
 * JS Hint task.
 */
gulp.task('jshint', function () {
    gulp.src(application.js.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * LESS compilation.
 */
gulp.task('less', function () {
    gulp.src('./app/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(application.less.dest));
});

/**
 * Concat & minify JS application files.
 */
gulp.task('js', function () {
    gulp.src(application.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(application.js.dest));
});

gulp.task('template', function () {
    var templateName = function (file) {
        var name = file.path.split("/")[file.path.split("/").length - 1]
        return name.replace(".html", "");
    }
    gulp.src(application.template.src)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat(application.template.name))
        .pipe(gulp.dest(application.template.dest));
});

/**
 * Clean task
 */
gulp.task('clean', function () {
    gulp.src('./build', {read: false}).pipe(clean());
});


/**
 * Gulp watch : on each change file.
 */
gulp.task('watch', function () {

    // JS watch
    gulp.src(application.js.src, { read: false})
        .pipe(watch({ emit: 'all' }, function (files) {
            gulp.run("js");
            gulp.run("jshint");
            files
                .pipe(jshint())
                .pipe(connect.reload());
        }));

    // Less watch
    gulp.src(application.less.src, { read: false})
        .pipe(watch({ emit: 'all' }, function (files) {
            gulp.run("less");
            files.pipe(connect.reload());
        }));

    // Template watch
    gulp.src(application.template.src, { read: false})
        .pipe(watch({ emit: 'all' }, function (files) {
            gulp.run("template");
            files.pipe(connect.reload());
        }));

    // Html watch
    gulp.src("./app/**/*.html", { read: false})
        .pipe(watch({ emit: 'all' }, function (files) {
            files.pipe(connect.reload());
        }));
});

/**
 * Server task
 */
gulp.task('webserver', function () {
    connect.server({
        port: 8001,
        livereload: true
    });
});

gulp.task('default', ['clean', 'webserver', 'watch']);