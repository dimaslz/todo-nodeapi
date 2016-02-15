'use strict';

var gulp = require('gulp');
var server = require('gulp-develop-server');
// var paths = require('./paths');
// var runSequence = require('run-sequence');
// var browserSync = require('browser-sync').create();

gulp.task('watch', function() {
    server.listen({ path: './bin/server' });
    gulp.watch('./server/**/*.js', server.restart);
});

// gulp.task('dev', ['build'], function() {
//     server.listen({ path: './bin/server' });
//     // require('./build/watch');
//     // gulp.watch("./app/**/*.scss", ['sass']).on('change', browserSync.reload);
//     // gulp.watch("./app/**/*.html").on('change', browserSync.reload);
//     // gulp.watch("./app/**/*.js").on('change', browserSync.reload);
    
    
//     return runSequence(['server:start', 'watch', 'browser-sync']);
// });
