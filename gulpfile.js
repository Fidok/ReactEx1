let gulp = require('gulp'),
      sass = require('gulp-sass');

gulp.task("sass", function () {
    gulp.src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe( gulp.dest("./dist"));
})

gulp.task("watch", function() {
    gulp.watch("./src/scss/**/*.scss", ["sass"])
})