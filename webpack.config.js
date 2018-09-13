const path = require('path')

let dmode = process.env.NODE_ENV === 'production' ? "production":'development'

module.exports = {
    entry: "./assets/js/app.js",
    output: {
        path: path.resolve('./dist/'),
        filename: 'colorjs-min.js'
    },
    mode: dmode
}