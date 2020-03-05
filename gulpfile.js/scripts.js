class Scripts {

    constructor() {

        const { dest }   = require('gulp');
        const browserify = require('browserify');
        const source     = require('vinyl-source-stream');
        const tsify      = require('tsify');
        const uglify     = require('gulp-uglify');
        const sourcemaps = require('gulp-sourcemaps');
        const buffer     = require('vinyl-buffer');
        const dir        = {
            src: 'src/ts/main.ts',
            dist: 'dist/assets/js'
        };

        Object.assign(this, { dest, browserify, source, tsify, uglify, sourcemaps, buffer, dir });

    }

    compile() {

        return this.browserify({
                basedir: '.',
                debug: true,
                entries: [this.dir.src],
                cache: {},
                packageCache: {}
            })
            .plugin(this.tsify)
            .transform('babelify', {
                presets: ['es2015'],
                extensions: ['.ts']
            })
            .bundle()
            .pipe(this.source('main.js'))
            .pipe(this.buffer())
            .pipe(this.sourcemaps.init({loadMaps: true}))
            .pipe(this.uglify())
            .pipe(this.sourcemaps.write('./'))
            .pipe(this.dest(this.dir.dist));

    }

}

module.exports = Scripts;
