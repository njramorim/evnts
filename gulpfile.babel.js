import gulp from 'gulp'
import axios from 'axios'
import fs from 'fs'
import gutil from 'gulp-util'
import source from 'vinyl-source-stream'
import babelify from 'babelify'
import watchify from 'watchify'
import exorcist from 'exorcist'
import browserify from 'browserify'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import clean from 'gulp-clean'

//javascript bundler
const bundler = watchify(browserify('./src/js/app.js', {debug: true}))

bundler.transform(babelify.configure({
  sourceMapRelative: 'src/js',
  presets: ['es2015', 'react', 'stage-2'] 
})).on('update', bundle);

function bundle() {
  return bundler.bundle()
	  .on('error', (error) => {
      gutil.log(error.message);
      browserSync.notify('Browserify Error!');
      this.emit('end');
	  })
	  .pipe(exorcist('src/bundle/js/app.bundle.js.map'))
	  .pipe(source('app.bundle.js'))
	  .pipe(gulp.dest('./src/bundle/js'))
	  .pipe(browserSync.stream({once: true}));
}

gulp.task('bundle', () => {
  return bundle()
})

//gulp start dev
gulp.task('default', ['bundle', 'sass', 'getData'], () => {
  browserSync.init({
    server: './src'
  })
  gulp.watch('src/scss/**/*.scss', ['sass'])
  gulp.watch('src/*.html').on('change', browserSync.reload)
})

//gulp build prod
gulp.task('build', ['clean-build', 'bundle', 'sass'],  () => {
  let paths = ['bundle', 'data', 'static']
  gulp.src('./src/*.*').pipe(gulp.dest('./build/'))
  paths.forEach((name, index) => {
    gulp.src('./src/'+name+'/**/*.*').pipe(gulp.dest('./build/'+name))
  })
})
 
//gulp clean prod
gulp.task('clean-build', () => {
	return gulp.src('build/', {read: false}).pipe(clean())
})

//gulp clean bundle
gulp.task('clean-bundle', () => {
  return gulp.src('src/bundle', {read: false}).pipe(clean())
})

// transform scss into css
gulp.task('sass', () => {  
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/bundle/css'))
    .pipe(browserSync.stream());
})

//get data if offline / cors
gulp.task('getData', () => {
	var url = 'http://eng.evnts.rocks/'
	var suffix = ['events', 'hotels']
	gulp.src('./src/data/*.json', {read: false}).pipe(clean())
	suffix.forEach((name, index) => {
    getData(url, name)
  })	
})

function getData (url, suffix) {
	return axios.get(url + suffix)
	  .then((response) => {
      var data = JSON.stringify(response.data)
	  	fs.writeFileSync('./src/data/'+suffix+'.json', data)
	  })
	  .catch((error) => {
	    gutil.log.log(error)
	  })
}
