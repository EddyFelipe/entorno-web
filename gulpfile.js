
// API de gulp
const { src, dest, series, watch } = require('gulp')

// Librerias
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const minifycss = require('gulp-minify-css')

const files = {
    scssPath: 'src/scss/**/*.scss',
    cssPath: 'dist/css/**/*.css',
    htmlPath: 'dist/**/*.html',
    jsPath: 'src/js/**/*.js'
}

/*
* Tasks
*/

function scssTask(d) {
    return src(files.scssPath)
        .pipe(sass())
        .pipe(dest('dist/css'))
}

function minifycssTask(d){
    return src(files.cssPath)
            .pipe(concat('style.css'))
            .pipe(minifycss())
            .pipe(dest('build/css/'))
}

function minifyjsTask(d){
    return src(files.jsPath)
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(dest('build/js/'))
}

/*
* Task Web Browser 
*/
function serverTask(d) {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    d();
}

function reloadTask(d) {
    browserSync.reload();
    d();
}

function watchTask() {
    watch(
        [files.scssPath, files.htmlPath, files.jsPath],
        series(scssTask, minifyjsTask,reloadTask)
    )
}

exports.default = series(scssTask,minifycssTask, minifyjsTask, serverTask, watchTask)