const gulp = require('gulp')
const del = require('del')

const path_backup = '../codebase/react-list'

gulp.task('backup', async function(done){
  /* clean files */
  await del([path_backup + '/'], {force: true})

  /* module */
  gulp.src(['module/**/*'])
    .pipe(gulp.dest(path_backup + '/module/'))
  /* others */
  gulp.src([
    '.babelrc',
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