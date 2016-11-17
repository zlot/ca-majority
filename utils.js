export default {
  // Returns a random integer between min (included) and max (included)
  // Using Math.round() will give you a non-uniform distribution!
  getRandomIntInclusive(min, max) {
    if(typeof min !== 'number' || typeof max !== 'number') {
      throw new Error('min and max have to be numbers!');
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  createMatrix(numrows, numcols, initial) {
      let arr = [];
      for(let i=0; i<numrows; ++i) {
          let columns = [];
          for(let j=0; j<numcols; ++j) {
              columns[j] = initial;
          }
          arr[i] = columns;
      }
      return arr;
  }
};
