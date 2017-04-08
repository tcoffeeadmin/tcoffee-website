var gulp = require('gulp');
var sass = require('gulp-sass');
//var minifyCss = require('gulp-minify-css');
watch = require('gulp-watch');
gulp.task('sass', function () {
  return gulp.src('scss/main.scss')
          .pipe(sass().on('error', sass.logError))
//          .pipe(minifyCss({
//            keepSpecialComments: 1
//          }))
          .pipe(gulp.dest('css/'));
});
gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['sass'] );
    gulp.watch('scss/bootstrap/**/*.scss', ['sass'] );
     gulp.watch('scss/layout/**/*.scss', ['sass'] );
    
});