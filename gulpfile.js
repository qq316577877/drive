var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('lsg/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('lsg/css/page/'))
});

//Watch task
gulp.task('default',function(){
    gulp.watch('lsg/sass/**/*.scss',['sass']);
});