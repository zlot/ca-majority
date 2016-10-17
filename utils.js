/* module 'utils.js' */

var utils = {};

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
utils.getRandomIntInclusive = function(min, max) {
  if(typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('min and max have to be numbers!');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

utils.createMatrix = function(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}

module.exports = utils;
