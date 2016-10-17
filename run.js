var beefy = require('beefy');
var http = require('http');

const PORT = 9966;

console.info(`Running live server at localhost:${PORT}`)

http.createServer(beefy({
    entries: ['main.js']
  , cwd: __dirname
  , live: true
  , quiet: false
})).listen(PORT);

