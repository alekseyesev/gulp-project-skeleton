class Watcher {

    constructor() {

        const browserSync                              = require('browser-sync').create();
        const { watch, series }                        = require('gulp');
        const Task                                     = require('./gulptask');
        const task                                     = new Task();
        const { clean, html, css, javascript, images } = task;

        browserSync.init({
            injectChanges: true,
            server: {
                baseDir: './dist'
            }
        });

        return function(cb) {

            watch(['./src/ejs/**/*.ejs'], {events: ['add', 'change', 'unlink']}, series(clean(['html']), html, function reload(cb) { browserSync.reload(); cb() }));
            watch(['./src/scss/**/*.scss'], {events: ['add', 'change', 'unlink']}, series(clean(['css']), css, function reload(cb) { browserSync.reload(); cb() }));
            watch(['./src/ts/**/*.ts'], {events: ['add', 'change', 'unlink']}, series(clean(['javascript']), javascript, function reload(cb) { browserSync.reload(); cb() }));
            watch(['./src/images/**/*.{jpg, jpeg, png, svg}'], {events: ['add', 'change', 'unlink']}, series(clean(['images']), images, function reload(cb) { browserSync.reload(); cb() }));

            cb();

        }

    }

}

module.exports = Watcher;
