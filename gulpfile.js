const gulp = require('gulp'),
    concat = require('gulp-concat'),                // concats files
    uglify = require('gulp-uglify'),                // minifies JS
    cleanCss = require('gulp-clean-css'),           // minifies CSS
    sass = require('gulp-sass'),                    // converts SASS to CSS
    rename = require('gulp-rename'),                // renames files
    maps = require('gulp-sourcemaps'),              // creates source maps
    imagemin = require('gulp-imagemin'),            // optimizes images
    del = require('del'),                           // deletes files and folders
    browserSync = require('browser-sync').create(); // reloads the browser, displaying changes

// I should be able to run the gulp scripts command at the command line 
// to concatenate, minify, and copy all of the project’s JavaScript files 
// into an all.min.js file that is then copied to the dist/scripts folder.

gulp.task('scripts', () => {
  return gulp.src('js/**/*.js')
  .pipe(maps.init())  // Generate source maps for Javascript
  .pipe(concat('all.min.js'))
  .pipe(uglify())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/scripts'));
});

// I should be able to run the gulp styles command at the command line 
// to compile the project’s SCSS files into CSS, then concatenate and minify 
// into an all.min.css file that is then copied to the dist/styles folder.

gulp.task('styles', () => {
  return gulp.src('sass/**/*.scss')
  .pipe(maps.init())  // Generate source maps for CSS
  .pipe(sass().on('error', sass.logError))  
  .pipe(cleanCss())
  .pipe(rename('all.min.css'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'))
  .pipe(browserSync.stream());  // reload the browser, displaying any changes. 
});

// I should be able to run the gulp images command at the command line 
// to optimize the size of the project’s JPEG and PNG files, and then copy 
// those optimized images to the dist/content folder.

gulp.task('images', ['icons'], () => {
  return gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/content'));
});

gulp.task('icons', () => {
  return gulp.src('icons/**/*')
  .pipe(gulp.dest('dist/content/icons'));
});

// I should be able to run the gulp clean command at the command line to 
// delete all of the files and folders in the dist folder.

gulp.task('clean', () => {
  return del('dist/**/*');
});

// I should be able to run the gulp build command at the command line to 
// run the clean, scripts, styles, and images tasks with confidence that 
// the clean task completes before the other commands.

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

// Continuously watch for changes to any .scss file in my project. When there 
// is a change to one of the .scss files, the gulp styles command is run and 
// the files are compiled, concatenated, and minified to the dist folder. My project 
// should then reload in the browser, displaying the changes.

gulp.task('watch', () => {
  gulp.watch('sass/**/*.scss', ['styles']);
  console.log("I'm watching you...");
});

// I should be able to run the gulp command at the command line to run 
// the build task and serve my project using a local web server.

gulp.task('default', ['watch', 'serve']);
