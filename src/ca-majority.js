import utils from './utils';

export default class CaMajority {

  constructor({
    width = 8,
    height = 8,
    numOfStates = 12,
    cellSize = 1,
    r = 2,
    frameRate = 12,
    colors = undefined
  } = {}) {
    this.width = width;
    this.height = height;
    this.numOfStates = numOfStates;
    this.cellSize = cellSize;
    this.r = r; // todo:: what is r?
    this.frameRate = frameRate;
    this.colors = colors;
    this.state = 0;
    this.time = 0;
    if(typeof this.colors === 'undefined') {
      throw new Error('An array of hex colors must be provided that has a length equal to numOfStates!');
    }

    console.time('compute');
    console.log('%cStarted timer', 'font-size: 12px; text-decoration: underline; color: green');

    this._initConfig();

    this.worker = new Worker('src/compute-step.js');
    this.worker.postMessage({
      init: true,
      config: this.config,
      nextConfig: this.nextConfig,
      width: this.width,
      height: this.height,
      state: this.state,
      numOfStates: this.numOfStates,
      r: this.r,
      time: this.time
    });

    this.worker.onmessage = function workerMessage(e) {
      this.time = e.data.time;
      this.config = e.data.config;
      this.render();
    }.bind(this);

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
  }

  _initConfig() {
    this.config = utils.createMatrix(this.height, this.width, 0);
    this.nextConfig = utils.createMatrix(this.height, this.width, 0);
    this.time = 0;

    for(let y=0; y<this.height; y++) {
      for(let x=0; x<this.width; x++) {
        this.state = utils.getRandomIntInclusive(0, this.numOfStates-1);
        this.config[y][x] = this.state;
      }
    }
  }

  run() {
    this.intervalId = window.setInterval(() => {
        window.requestAnimationFrame(this.step.bind(this));
    }, 1000/this.frameRate);
  }

  stop() {
    window.clearInterval(this.intervalId);
  }

  step() {
    this.worker.postMessage({});
  }

  render() {
    for(let y=0; y<this.height; y++) {
      for(let x=0; x<this.width; x++) {
        let fillStyle = this.colors[this.config[y][x]];
        this.ctx.fillStyle = fillStyle;
        this.ctx.fillRect(x*this.cellSize, y*this.cellSize, this.cellSize, this.cellSize);
      }
    }
  }

  destroy() {
    this.stop();
    try {
        document.body.removeChild(this.canvas);
    } catch(ex) {
      // continue
    }
  }
}
