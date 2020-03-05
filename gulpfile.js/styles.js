class Styles {

    constructor() {

        const { src, dest } = require('gulp');
        const sass          = require('gulp-sass');
        const sourcemaps    = require('gulp-sourcemaps');
        const concat        = require('gulp-concat');
        const minify        = require('gulp-csso');
        const gcmq          = require('gulp-group-css-media-queries');
        const smq           = require('gulp-split-media-queries');
        const dir           = {
            src: './src/**/*.scss',
            dist: './dist/assets/css'
        };

        Object.assign(this, { src, dest, sass, sourcemaps, concat, minify, gcmq, smq, dir });

    }

    source() {

        return this.scss = this
            .src(this.dir.src)
            .pipe(this.sourcemaps.init())
            .pipe(this.sass({outputStyle: 'expanded'}));

    }

    raw() {

        return this.scss
            .pipe(this.concat('style.css'))
            .pipe(this.gcmq())
            .pipe(this.sourcemaps.write('./'))
            .pipe(this.dest(this.dir.dist));

    }

    minified() {

        return this.scss
            .pipe(this.concat('style.min.css'))
            .pipe(this.gcmq())
            .pipe(this.smq())
            .pipe(this.minify())
            .pipe(this.sourcemaps.write('./'))
            .pipe(this.dest(this.dir.dist));

    }

}

module.exports = Styles;
