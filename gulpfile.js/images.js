class Images {

    constructor() {

        const { src, dest } = require('gulp');
        const webp          = require('gulp-webp');
        const dir           = {
            srcRaster: './src/images/**/*.{jpg,jpeg,png}',
            srcVector: './src/images/**/*.svg',
            dist: './dist/assets/images'
        };
        

        Object.assign(this, { src, dest, webp, dir });

    }

    convertToWebP() {

        return this.src(this.dir.srcRaster)
            .pipe(this.webp({quality: 80, method: 6}))
            .pipe(this.dest(this.dir.dist));

    }

    processVector() {

        return this.src(this.dir.srcVector)
            .pipe(this.dest(this.dir.dist));

    }

}

module.exports = Images;
