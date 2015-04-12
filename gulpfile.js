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
    declare = require('gulp-declare'),
    inject = require('gulp-inject'),
    batch = require('gulp-batch');

application = {
    name: "tank-browser",
    less: {
        src: ['app/less/**/*.less'],
        dest: "dist/css/"
    },
    js: {
        src: ["app/js/**/*.js"],
        deps: [
            "app/assets/jscolor/jscolor.js",
            "node_modules/underscore/underscore-min.js",
            "node_modules/handlebars/dist/handlebars.min.js",
            // SIGMA
            "node_modules/sigma/src/sigma.core.js",
            "node_modules/sigma/src/conrad.js",
            "node_modules/sigma/src/utils/sigma.utils.js",
            "node_modules/sigma/src/utils/sigma.polyfills.js",
            "node_modules/sigma/src/sigma.settings.js",
            "node_modules/sigma/src/classes/sigma.classes.dispatcher.js",
            "node_modules/sigma/src/classes/sigma.classes.configurable.js",
            "node_modules/sigma/src/classes/sigma.classes.graph.js",
            "node_modules/sigma/src/classes/sigma.classes.camera.js",
            "node_modules/sigma/src/classes/sigma.classes.edgequad.js",
            "node_modules/sigma/src/captors/sigma.captors.mouse.js",
            "node_modules/sigma/src/classes/sigma.classes.quad.js",
            "node_modules/sigma/src/captors/sigma.captors.touch.js",
            "node_modules/sigma/src/renderers/sigma.renderers.canvas.js",
            "node_modules/sigma/src/renderers/sigma.renderers.webgl.js",
            "node_modules/sigma/src/renderers/sigma.renderers.svg.js",
            "node_modules/sigma/src/renderers/sigma.renderers.def.js",
            "node_modules/sigma/src/renderers/webgl/sigma.webgl.nodes.def.js",
            "node_modules/sigma/src/renderers/webgl/sigma.webgl.nodes.fast.js",
            "node_modules/sigma/src/renderers/webgl/sigma.webgl.edges.def.js",
            "node_modules/sigma/src/renderers/webgl/sigma.webgl.edges.fast.js",
            "node_modules/sigma/src/renderers/webgl/sigma.webgl.edges.arrow.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.labels.def.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.hovers.def.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.nodes.def.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.edges.curve.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.edges.arrow.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.edges.curvedArrow.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.edgehovers.def.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.edgehovers.curve.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.edgehovers.arrow.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.edgehovers.curvedArrow.js",
            "node_modules/sigma/src/renderers/canvas/sigma.canvas.extremities.def.js",
            "node_modules/sigma/src/renderers/svg/sigma.svg.utils.js",
            "node_modules/sigma/src/renderers/svg/sigma.svg.nodes.def.js",
            "node_modules/sigma/src/renderers/svg/sigma.svg.edges.def.js",
            "node_modules/sigma/src/renderers/svg/sigma.svg.edges.curve.js",
            "node_modules/sigma/src/renderers/svg/sigma.svg.labels.def.js",
            "node_modules/sigma/src/renderers/svg/sigma.svg.hovers.def.js",
            "node_modules/sigma/src/middlewares/sigma.middlewares.rescale.js",
            "node_modules/sigma/src/middlewares/sigma.middlewares.copy.js",
            "node_modules/sigma/src/misc/sigma.misc.animation.js",
            "node_modules/sigma/src/misc/sigma.misc.bindEvents.js",
            "node_modules/sigma/src/misc/sigma.misc.bindDOMEvents.js",
            "node_modules/sigma/src/misc/sigma.misc.drawHovers.js",
            //SIGMA PLUGINS
            "node_modules/sigma/plugins/sigma.parsers.json/sigma.parsers.json.js",
            "node_modules/sigma/plugins/sigma.parsers.cypher/sigma.parsers.cypher.js",
            "node_modules/sigma/plugins/sigma.layout.forceAtlas2/worker.js",
            "node_modules/sigma/plugins/sigma.layout.forceAtlas2/supervisor.js",
            "node_modules/sigma/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js",
            "node_modules/sigma/plugins/sigma.plugins.relativeSize/sigma.plugins.relativeSize.js",
            "node_modules/sigma/plugins/sigma.renderers.customEdgeShapes/sigma.canvas.edges.dashed.js",
            "node_modules/sigma/plugins/sigma.renderers.customEdgeShapes/sigma.canvas.edges.dotted.js",
            "node_modules/sigma/plugins/sigma.renderers.customEdgeShapes/sigma.canvas.edges.parallel.js",
            "node_modules/sigma/plugins/sigma.renderers.customEdgeShapes/sigma.canvas.edges.tapered.js",
            "node_modules/sigma/plugins/sigma.renderers.customEdgeShapes/sigma.canvas.edgehovers.dashed.js",
            "node_modules/sigma/plugins/sigma.renderers.customEdgeShapes/sigma.canvas.edgehovers.dotted.js",
            "node_modules/sigma/plugins/sigma.renderers.customEdgeShapes/sigma.canvas.edgehovers.parallel.js",
            "node_modules/sigma/plugins/sigma.renderers.customEdgeShapes/sigma.canvas.edgehovers.tapered.js",
            "node_modules/sigma/plugins/sigma.renderers.edgeLabels/settings.js",
            "node_modules/sigma/plugins/sigma.renderers.edgeLabels/sigma.canvas.edges.labels.def.js",
            "node_modules/sigma/plugins/sigma.renderers.edgeLabels/sigma.canvas.edges.labels.curve.js",
            "node_modules/sigma/plugins/sigma.renderers.edgeLabels/sigma.canvas.edges.labels.curvedArrow.js",
            //LINKURIOUS
            "node_modules/linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.nodes.def.js",
            "node_modules/linkurious/plugins/sigma.plugins.image/sigma.plugins.image.js",
            //CODEMIRROR
            "node_modules/codemirror/lib/codemirror.js",
            "node_modules/codemirror/mode/cypher/cypher.js"
        ],
        dest: "dist/js/"
    },
    template: {
        src: ['app/js/plugins/**/*.html'],
        dest: ".tmp/js/",
        name: "templates.js"
    },
    assets: {
        src: [ "app/assets/**/*.*", "node_modules/font-awesome/@(fonts)/*.*" ],
        dest: "dist/assets"
    }
};

/**
 * LESS compilation.
 */
gulp.task('less', function () {
    var stream = gulp.src('./app/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(application.name + '.min.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(application.less.dest));
    return stream;
});

/**
 * Concat & minify JS application files.
 */
gulp.task('js', ['template'], function () {
    // Make only one concat / minify JS file
    var src = application.js.deps;
    src.push(application.template.dest + application.template.name);
    src = src.concat(application.js.src);

    var stream = gulp.src(src)
        //.pipe(sourcemaps.init())
        .pipe(concat(application.name + '.min.js'))
        //.pipe(uglify())
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(application.js.dest));
    return stream;
});

/**
 *  Compile handlerbar template in js file.
 */
gulp.task('template', function () {
    var stream = gulp.src(application.template.src)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true // Avoid duplicate declarations
        }))
        .pipe(concat(application.template.name))
        .pipe(gulp.dest(application.template.dest));
    return stream;
});

/**
 * JS Hint task.
 */
gulp.task('jshint', function () {
    gulp.src(application.js.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 *  Copy assets to dist directory
 */
gulp.task('assets', function () {
    var stream = gulp.src(application.assets.src)
            .pipe(gulp.dest(application.assets.dest))
            .pipe(connect.reload());
    return stream;
});

/**
 * Clean task
 */
gulp.task('clean', function () {
    var stream = gulp.src(['./.tmp', './dist'], {read: false}).pipe(clean());
    return stream;
});

/**
 * Package task.
 */
gulp.task('package', ['less', 'js'], function () {
    // Inject js & css
    var stream = gulp.src('./app/index.html')
        .pipe(inject(gulp.src([application.js.dest + '**/*.js', application.less.dest + '**/*.css'], {read: false}), {ignorePath: 'dist', addRootSlash: false}))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
    return stream;
});

/**
 * Server task
 */
gulp.task('webserver', function () {
    connect.server({
        port: 8001,
        root: 'dist',
        livereload: true
    });
});

/**
 * Gulp watch : on each change file.
 */
gulp.task('watch', function () {
    // JS watch for report
    watch(application.js.src, {read: false}, function () {
        gulp.start("jshint");
    });

    // watching all file for 'rebuild' & reload
    watch("./app/**/*.*",{read: false, verbose:true}, function () {
        gulp.start("build");
    });

});

/**
 * Build the application.
 */
gulp.task('build', ['package', 'assets']);

/**
 * The dev task => run a server with livereload, jshint report, ...
 */
gulp.task('default', ['build', 'webserver', 'watch']);
