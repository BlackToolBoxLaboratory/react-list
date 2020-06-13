var gulp = require('gulp')

const path_backup = '../codebase/vue-list'

gulp.task('backup', function(done){
  /* module */
  gulp.src(['module/**/*'])
    .pipe(gulp.dest(path_backup + '/module/'))
  /* others */
  gulp.src([
    '.eslintrc.js',
    '.gitignore',
    'LICENSE',
    'CHANGELOGS.md',
    'README.md',
    'package.json',
    'package-lock.json',
    'rollup.config.js',
    'gulpfile.js'
  ])
    .pipe(gulp.dest(path_backup))
  done();
})

gulp.task('default', gulp.series(['backup']))