let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let cleanCss = require('gulp-clean-css');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let maps = require('gulp-sourcemaps');
let imagemin = require('gulp-imagemin');
let del = require('del');

gulp.task('scripts', function (){
  return gulp.src('js/**/*.js')
  .pipe(maps.init())
  .pipe(concat('all.min.js'))
  .pipe(uglify())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function (){
  return gulp.src('sass/**/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))  
  .pipe(cleanCss())
  .pipe(rename('all.min.css'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'));
});


gulp.task('images', function(){
  return gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/content'));
});

gulp.task('clean', function(){
  return del('dist/**/*');
});


gulp.task('build',['clean'], function(){
  gulp.start(['scripts', 'styles', 'images']);
});


gulp.task('default', ['build']);

gulp.task('watch', function(){
  gulp.watch('directory/file', [task(script)]);
});




