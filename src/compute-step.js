let config, nextConfig, width, height, state, numOfStates, r, time;

onmessage = function computeStep(e) {
  if(e.data.init) {
    config = e.data.config;
    nextConfig = e.data.nextConfig;
    width = e.data.width;
    height = e.data.height;
    state = e.data.state;
    numOfStates = e.data.numOfStates;
    r = e.data.r;
    time = e.data.time;
  }

  let data = e.data;
  // worker does computation
  for(let x=0; x<width; x++) {
    for(let y=0; y<height; y++) {
      state = config[y][x];
      let counts = new Array(numOfStates).fill(0);
      for(let dx=-r; dx<r+1; dx++) {
        for(let dy=-r; dy<r+1; dy++) {
          let col = (y+dy) % height;
          let row = (x+dx) % width;
          if(Math.sign(col) === -1) {
            col = height + col;
          }
          if(Math.sign(row) === -1) {
            row = width + col;
          }
          let s = config[col][row];
          counts[s] += 1;
        }
      }
      let maxCount = Math.max(...counts);
      let maxStates = [];

      for(let i=0; i<numOfStates; i++) {
        if(counts[i] === maxCount) {
          maxStates.push(i);
        }
      }
      state = maxStates[Math.floor(Math.random() * maxStates.length)];
      nextConfig[y][x] = state;
    }
  }

  let temp = config;
  config = nextConfig;
  nextConfig = temp;
  time++;

  postMessage({
    config,
    time
  });
}
