var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');



gulp.task('build', function () {
    return browserify({entries: './src/index.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react'],
                                plugins: ["transform-decorators", "transform-object-rest-spread", "transform-class-properties"]})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function(){

    gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('dist/assets'));

});

gulp.task('watch', ['build'], function () {
    //gulp.watch('*.jsx', ['build']);
    gulp.watch('*.js', ['build']);
});

//gulp.task('default', []);
//gulp.task('default', ['watch']);
gulp.task('default', ['build', 'copy']);

