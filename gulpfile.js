// load the plugins
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var nodemon = require('gulp-nodemon');

// defining the main gulp task
gulp.task('default', ['nodemon']);

// the nodemon task
gulp.task('nodemon', function() {
	nodemon({
		script: 'server.js',
		ext: 'js styl html'
	})
		.on('start', ['watch'])
		.on('change', ['watch'])
		.on('restart', function() {
			console.log('Restarted!');
		});
});

// define a task called css
gulp.task('css', function() {

	// grab the stylus file, process the styl, save to style.css
	return gulp.src('public/assets/css/style.styl')
		.pipe(stylus())
		.pipe(minifyCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('public/assets/css'));
});

// task for js files
gulp.task('js', function() {

	return gulp.src(['server.js', 'config/*.js', 'app/**/*.js', 'public/app/*.js', 'public/app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('angular', function() {
	return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(ngAnnotate())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));
});

gulp.task('watch', function() {
	// watch the stylus file and run the css task
	gulp.watch('public/assets/css/style.styl', ['css']);

	// watch js files and run lint and run js and angular tasks
	gulp.watch(['server.js', 'config/*.js', 'app/**/*.js',
				'public/app/*.js', 'public/app/**/*.js'],
			 	['js', 'angular']);
});
