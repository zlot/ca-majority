const budo = require('budo')
const babelify = require('babelify')

budo('./main.js', {
  live: true,
  port: 8000,
  browserify: {
    transform: babelify // es6
  }
}).on('connect', e => {
  console.log(`budo server running on ${e.uri}`)
}).on('update', buffer => {
  console.log(`bundle: ${buffer.length} bytes`)
})
