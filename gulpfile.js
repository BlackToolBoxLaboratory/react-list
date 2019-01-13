const gulp = require("gulp");
const less = require('gulp-less');
const less2scss = require('gulp-less-to-scss');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css'); 

const path_backup = "../codebase/list-react/";

gulp.task("copy2codebase", function(done) {
  gulp.src(["module/*"])
    .pipe(gulp.dest(path_backup + "module/"));
  gulp.src(["css/*.less"])
    .pipe(gulp.dest(path_backup + "css/"));
  gulp.src(["script/*"])
    .pipe(gulp.dest(path_backup + "script/"));
  gulp.src(["__tests__/*"])
    .pipe(gulp.dest(path_backup + "__tests__/"));
  gulp.src([
      "LICENSE",
      "README.md",  
      "CHANGELOGS.md",
      "rollup.config.js",
      "package.json",
      "package-lock.json",
      "gulpfile.js",
      ".eslintrc.js",
      ".babelrc",
      "jest.config.js"
    ])
    .pipe(gulp.dest(path_backup));
  done();
});

gulp.task("lessTranslation", function(done){
  gulp.src(["css/*.less"])
    .pipe(autoprefixer())
    .pipe(less())
    .pipe(gulp.dest("./css/")) // index.css
    .pipe(concat('index.min.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest("./css/")); // index.css
  gulp.src(["css/*.less"])
    .pipe(autoprefixer())
    .pipe(less2scss())
    .pipe(gulp.dest("./css/")); // index.scss
  done();
});

gulp.task("backup", gulp.series("copy2codebase"));
gulp.task("cssBuildup", gulp.series("lessTranslation"));
