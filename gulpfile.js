'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var rollup = require('gulp-better-rollup');
var babelrollap = require('rollup-plugin-babel');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%'], { cascade: false }))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());

});

gulp.task('prepare', function () {
    gulp.src('./fonts/*.*').pipe(gulp.dest('./build/fonts'));
    gulp.src('./images/**/*').pipe(gulp.dest('./build/images'));
    gulp.src('./media/*').pipe(gulp.dest('./build/media'));
    gulp.src('./php/*').pipe(gulp.dest('./build/php'));
    gulp.src('./js/*').pipe(gulp.dest('./build/js'));
    gulp.src('./js/**').pipe(gulp.dest('./build/js'));
    gulp.src('./favicon.png').pipe(gulp.dest('./build'));
    gulp.src('./google*.html').pipe(gulp.dest('./build'));
    gulp.src('./robots.txt').pipe(gulp.dest('./build'));
    gulp.src('./sitemap.xml').pipe(gulp.dest('./build'));
});

gulp.task('image:min', function () {
  gulp.src('images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./build/images/'));
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./templates/**/**/*.jade')
    .pipe(jade({
        locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./build/'), function () {
      gulp.src('./build/_components', {read: false})
        .pipe(clean());
    });
});

gulp.task('js', function() {
        gulp.src('./js/*.js')
            .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gulp.dest('build/js'))
    }
);

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('watch', ['sass', 'jade', 'js'], function() {
  browserSync.init({
      server: "./build/"
  });

  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch("./templates/**/*.jade", ['jade']).on('change', browserSync.reload);
  gulp.watch("./js/*.js", ["js"]).on('change', browserSync.reload);
  gulp.watch("./build/img/**/*", ['image:min']).on('change', browserSync.reload);
});

gulp.task('build', ['sass', 'jade', 'js', 'prepare']);

gulp.task('default', ['watch']);
