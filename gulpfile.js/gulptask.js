const Markup  = require('./markup');
const Styles  = require('./styles');
const Scripts = require('./scripts');
const Images = require('./images');
const Cleaner = require('./cleaner');

class Task {

    clean(parts) {

        const cleaner = new Cleaner(); 

        return function clean() { return cleaner.doCleaning.call(cleaner, parts); };

    }
      
    html() {
      
        const markup = new Markup();

        return markup.format({fileExtension: 'html', tabulationLevel: 4});
      
    }

    async css() {

        const styles = new Styles();

        await styles.source();

        return Promise.all([styles.raw(), styles.minified()]);
        
    }

    javascript() {

        const scripts = new Scripts();

        return scripts.compile();
        
    }

    images() {

        const images = new Images();

        return Promise.all([images.convertToWebP(), images.processVector()]);

    }

}

module.exports = Task;