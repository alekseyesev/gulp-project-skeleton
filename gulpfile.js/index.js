const { series, parallel }                     = require('gulp');
const Watcher                                  = require('./watcher');
const Task                                     = require('./gulptask');
const task                                     = new Task();
const { clean, html, css, javascript, images } = task;

module.exports.watch   = new Watcher();
module.exports.default = series(clean(), parallel(html, css, javascript, images));