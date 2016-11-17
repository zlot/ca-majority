import utils from './utils';
import Color from 'color-js';

export default class CaMajority {

  constructor(width=8, height=8, numOfStates=12, cellSize=1, r=2) {
    this.width = width;
    this.height = height;
    this.numOfStates = numOfStates;
    this.r = r; // todo:: what is r?
    this.cellSize = cellSize;
    this.state = 0;
    this.time = 0;

    console.time('compute');
    console.log('%cStarted timer', 'font-size: 12px; text-decoration: underline; color: green');

    this.initConfig();

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
    })

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
  }

  initConfig() {
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
    this.worker.onmessage = function workerMessage(e) {
      this.time = e.data.time;
      this.config = e.data.config;
      this.render();
      if(this.time < 8) {
        console.log('time: ', this.time);
        window.requestAnimationFrame(this.step.bind(this));
      } else {
        console.log('%cSTOPPED', 'font-size: 24px; text-decoration: underline; color: blue');
        console.timeEnd('compute');
      }
    }.bind(this);
  }

  step() {
    this.worker.postMessage({});
  }


  render() {
    for(let y=0; y<this.height; y++) {
      for(let x=0; x<this.width; x++) {
        let fillStyle = Color('#ff0000').shiftHue(this.config[y][x] * Math.floor(360/this.numOfStates));
        this.ctx.fillStyle = fillStyle;
        this.ctx.fillRect(x*this.cellSize, y*this.cellSize, this.cellSize, this.cellSize);
      }
    }
  }
}
