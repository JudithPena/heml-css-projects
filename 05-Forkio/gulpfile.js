const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer'); // Префикс CSS с помощью Autoprefixer
const concat = require('gulp-concat'); // Объединяет файлы
const uglify = require('gulp-uglify');  // Minify JavaScript
const htmlmin = require('gulp-htmlmin');  // gulp плагин для минимизации HTML.
const sass = require('gulp-sass')(require('sass')); // Плагин Sass для Gulp.
const imagemin = require('gulp-imagemin');  // Сократите изображения PNG, JPEG, GIF и SVG с помощью imagemin
const cssmin = require('gulp-cssmin'); // Minify Css
const rename = require('gulp-rename');
const del = require('delete');
//////////////
const watch = require('gulp-watch'); //расширение возможностей watch
const connect = require('gulp-connect'); //livereload

/////////// no
const jsMinify = require('gulp-js-minify');  // Использовала др. плагин
const gulpClean = require('gulp-clean');   // Использовала др. плагин
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const scss = require('gulp-scss');  // Плагин Scss для Gulp.

// +
function buildCSS() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))

        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
}

// +
function buildHTML() {
    return gulp.src('*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
}

// +
function buildJS() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
}

// +
function buildImages() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
}
////////////////
function buildFonts() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
}

// + 
function clean() {
    return del('dist/**', { force: true });
}

function build() {
    return gulp.series([
        clean,
        gulp.parallel([
            buildImages,
            buildCSS,
            buildHTML,
            buildJS,
            buildFonts
        ])
    ])
}


//////////////////////////////////
function browserSyncDev() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        },
        port: 8080,
        notify: false
    });
    gulp.watch('src/scss/*.scss', buildCSS).on('change', browserSync.reload);
    gulp.watch('*.html', buildHTML).on('change', browserSync.reload);
    gulp.watch('src/js/*.js', buildJS).on('change', browserSync.reload);
    gulp.watch('src/img/*', buildImages).on('change', browserSync.reload);
    gulp.watch('src/fonts/*', buildFonts).on('change', browserSync.reload);
}

function dev() {
    return gulp.series([
        clean,
        buildImages,
        buildCSS,
        buildHTML,
        buildJS,
        buildFonts,
        browserSyncDev
    ])
}

////////////////////////////////////
exports.buildHTML = buildHTML;
exports.buildCSS = buildCSS;
exports.buildJS = buildJS;
exports.buildFonts = buildFonts;
exports.buildImages = buildImages;
exports.clean = clean;
exports.dev = dev();
exports.build = build();
exports.default = build();

