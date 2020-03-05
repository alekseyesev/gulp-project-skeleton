class Cleaner {

    constructor() {

        const del           = require('del');
        const dir           = {
            images: './dist/assets/images',
            javascript: './dist/assets/js',
            css: './dist/assets/css',
            html: './dist/*.html'
        };
        

        Object.assign(this, { del, dir });

    }

    async doCleaning(parts) { 

        parts = parts || null;

        try {

            if (Array.isArray(parts)) {

                let promises = [];

                parts.forEach((part) => {
                    
                    switch (part) {

                        case 'html':

                            promises.push(this.del(this.dir.html));

                        break;

                        case 'css':

                            promises.push(this.del(this.dir.css));

                        break;

                        case 'javascript':

                            promises.push(this.del(this.dir.javascript));

                        break;

                        case 'images':

                            promises.push(this.del(this.dir.images));

                        break;

                    }

                });

                await Promise.all(promises);
                
            }
            else {

                await Promise.all([this.del(this.dir.images), this.del(this.dir.javascript), this.del(this.dir.css), this.del(this.dir.html)]);

            }

            return Promise.resolve('Directories and files have been deleted.');

        }
        catch (error) {

            throw new Error('Directories and files could not be deleted.');

        }

    }

}

module.exports = Cleaner;
