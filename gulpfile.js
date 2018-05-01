let gulp = require('gulp'),
      sass = require('gulp-sass');

gulp.task("sass", function () {
    gulp.src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe( gulp.dest("./dist"));
})

gulp.task("build", function () {
    gulp.src("node_modules/bootstrap/dist/css/*.css")
    .pipe( gulp.dest("./dist/components/bootstrap"));
        gulp.src("node_modules/font-awesome/**/*.*")
    .pipe( gulp.dest("./dist/components/font-awesome"));        gulp.src("src/index.html")
    .pipe( gulp.dest("./dist"));
})

gulp.task("watch", function() {
    gulp.watch("./src/scss/**/*.scss", ["sass"])
})

gulp.task("default", ["build","sass"]);