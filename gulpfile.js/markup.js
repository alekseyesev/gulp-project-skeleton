class Markup {

    constructor() {

        const { src, dest }    = require('gulp');
        const ejs              = require('gulp-ejs');;
        const rename           = require('gulp-rename');
        const beautify         = require('gulp-beautify');
        const removeEmptyLines = require('gulp-remove-empty-lines');
        const dir              = {
            src: './src/ejs/*.ejs',
            dist: './dist'
        };

        Object.assign(this, { src, dest, ejs, rename, beautify, removeEmptyLines, dir });

    }

    format({fileExtension, tabulationLevel}) {

        return this.src(this.dir.src)
            .pipe(this.ejs())
            .pipe(this.removeEmptyLines())
            .pipe(this.beautify.html({indent_size: tabulationLevel}))
            .pipe(this.rename({extname: `.${fileExtension}`}))
            .pipe(this.dest(this.dir.dist));
        
    }

}

module.exports = Markup;
