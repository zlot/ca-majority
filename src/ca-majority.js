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

    this.initConfig();
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

  step() {
    this.time += 1;
    console.log('time: ', this.time);

    for(let x=0; x<this.width; x++) {
      for(let y=0; y<this.height; y++) {
        this.state = this.config[y][x];
        let counts = new Array(this.numOfStates).fill(0);
        for(let dx=-this.r; dx<this.r+1; dx++) {
          for(let dy=-this.r; dy<this.r+1; dy++) {
            let col = (y+dy) % this.height;
            let row = (x+dx) % this.width;
            if(Math.sign(col) === -1) {
              col = this.height + col;
            }
            if(Math.sign(row) === -1) {
              row = this.width + col;
            }
            let s = this.config[col][row];
            counts[s] += 1;
          }
        }
        let maxCount = Math.max(...counts);
        let maxStates = [];

        for(let i=0; i<this.numOfStates; i++) {
          if(counts[i] === maxCount) {
            maxStates.push(i);
          }
        }
        this.state = maxStates[Math.floor(Math.random() * maxStates.length)];
        this.nextConfig[y][x] = this.state;
      }
    }

    // how necessary is the following?
    let temp = this.config;
    this.config = this.nextConfig;
    this.nextConfig = temp;

    this.render();

    if(this.time < 15) {
      setTimeout(() => {
        window.requestAnimationFrame(this.step.bind(this));
      }, 100);
    } else {
      console.log('%cSTOPPED', 'font-size: 24px; text-decoration: underline; color: blue');
    }
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
