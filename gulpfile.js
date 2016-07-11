var gulp = require('gulp');
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var browserSync = require('browser-sync').create();
var plumber = require("gulp-plumber");

var paths = {
  es6: ['src/es6/**/*.js'],
  sass: ['src/sass/**/*.scss']
};

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("babel", function () {
  return gulp.src(paths.es6)
    .pipe(plumber())
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest("public/javascript"));
});

gulp.task('watch', ['browserSync', 'sass', 'babel'], function (){
  gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.es6, ['babel']);
	gulp.watch('public/*.html', browserSync.reload); 
  gulp.watch('public/javascript/**/*.js', browserSync.reload);  
});


