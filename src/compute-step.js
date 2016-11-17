onmessage = function(e) {
  let data = e.data;
  // worker does computation
  for(let x=0; x<data.width; x++) {
    for(let y=0; y<data.height; y++) {
      data.state = data.config[y][x];
      let counts = new Array(data.numOfStates).fill(0);
      for(let dx=-data.r; dx<data.r+1; dx++) {
        for(let dy=-data.r; dy<data.r+1; dy++) {
          let col = (y+dy) % data.height;
          let row = (x+dx) % data.width;
          if(Math.sign(col) === -1) {
            col = data.height + col;
          }
          if(Math.sign(row) === -1) {
            row = data.width + col;
          }
          let s = data.config[col][row];
          counts[s] += 1;
        }
      }
      let maxCount = Math.max(...counts);
      let maxStates = [];

      for(let i=0; i<data.numOfStates; i++) {
        if(counts[i] === maxCount) {
          maxStates.push(i);
        }
      }
      data.state = maxStates[Math.floor(Math.random() * maxStates.length)];
      data.nextConfig[y][x] = data.state;
    }
  }

  // worker returns message
  console.log('Message received from main script', e.data);
  postMessage(workerResult);
}
