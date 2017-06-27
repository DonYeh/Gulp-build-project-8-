let gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCss = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    maps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    browserSync = require('browser-sync').create();

gulp.task('scripts', () => {
  return gulp.src('js/**/*.js')
  .pipe(maps.init())
  .pipe(concat('all.min.js'))
  .pipe(uglify())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', () => {
  return gulp.src('sass/**/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))  
  .pipe(cleanCss())
  .pipe(rename('all.min.css'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'))
  .pipe(browserSync.stream());
});


gulp.task('images', ['icons'], () => {
  return gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/content'));
});

gulp.task('icons', () => {
  return gulp.src('icons/**/*')
  .pipe(gulp.dest('dist/content/icons'));
});

gulp.task('clean', () => {
  return del('dist/**/*');
});


gulp.task('build',['clean'], () => {
  gulp.start(['scripts', 'styles', 'images']);
});

// run build task and serve project using a local web server
gulp.task('serve', ['build'], () => {
  console.log('You got served!');
  return browserSync.init({
        server: {
            baseDir: "./"
        }
    });
  
});

gulp.task('watch', () => {
  gulp.watch('sass/**/*.scss', ['styles']);
  console.log("I'm watching you...");
});

gulp.task('default', ['watch', 'serve']);



