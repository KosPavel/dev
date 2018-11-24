let gulp = require('gulp-v4'); // Ядро Gulp 

function html () {
	console.log("html has been updated");
	return gulp.src('./site/**/*.html')
		.pipe(gulp.dest('../public/site'));
}

function images () {
	console.log("images has been updated");
	return gulp.src('./site/images/**/*.*')
	    .pipe(gulp.dest('../public/site/images'));
}

function css () {
	console.log("css has been updated");
	return gulp.src('./site/css/**/*.css')
		.pipe(gulp.dest('../public/site/css'));
}

function assets () {
	console.log("assets has been updated");
	return gulp.src([
		'./site/**/*.*', 
		'!./site/**/*.js',
		'!./site/**/*.css', 
		'!./site/**/*.png',
		'!./site/**/*.html',
		'!./site/**/*.less',
		'!./site/**/*.jpg',
		'!./site/**/*.jpeg',
		'!./site/**/*.svg'])
		.pipe(gulp.dest('../public/site'));
}

let less = require('gulp-less'); //Less компилятор
let LessAutoprefix = require('less-plugin-autoprefix'); //Автопрефиксер
let autoprefix = new LessAutoprefix({ 
	browsers: ['last 2 versions'] 
	}); //Опции автопрефиксера
let cleanCSS = require('gulp-clean-css'); //Конкатенация CSS

function lessBuild () {
			//Обработка less
	console.log("less has been compiled");
	return gulp.src('./site/css/**/bundle.less')
			//Автопрефиксы
		.pipe(less({
			plugins: [autoprefix]
		}))
		.on('error', handleError) // Отлов ошибок без выхода из приложения
				//Конкатенация
		.pipe(cleanCSS()) 
		.pipe(gulp.dest('../public/site/css'))
		}
// Отлов ошибок без выхода из приложения
function handleError(err) {
	console.log(err.toString());
	this.emit('end');
	}

let browserSync = require('browser-sync').create();
//Наблюдатель
gulp.task('watch', function() {
// Синхронизация с браузером
	browserSync.init({
		     server: {
		     baseDir: "../public/site"
			}
		});
// Наблюдение
gulp.watch('./site/** /*.*', all)
			.on('change', browserSync.reload); //Перезагрузка BS
		})

let del = require('del'); //Удаление
//Удалить public
function clean() {
	console.log("Catalog /public has been cleaned");
	return del(['../public'], {force: true}) 
	// Для удаления файлов во внешних директориях параметр force
	}

gulp.task('clean', clean);

gulp.task('less', lessBuild);
gulp.task('images', images);
gulp.task('html', html);
gulp.task('css', css);
// gulp.task('assets', assets);

let all = gulp.series(images, html, css, assets, lessBuild);

gulp.task('default', all);