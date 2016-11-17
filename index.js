'use strict';

import utils from './utils';
const Color = require('color-js');

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
// ctx.fillStyle = '#0066cc';
// ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

var width = 80*2;
var height = 80*2;
var numOfStates = 12;
var r = 2;

var time;
var config = utils.createMatrix(height, width, 0);
var nextConfig = utils.createMatrix(height, width, 0);

var state;

init();
step();

function init() {
  time = 0;

  for(let y=0; y<height; y++) {
    for(let x=0; x<width; x++) {
      state = utils.getRandomIntInclusive(0, numOfStates-1);
      config[y][x] = state;
    }
  }
}

function draw() {
  let step = 2;
  let cellSize = 2;
  for(let y=0; y<height; y++) {
    for(let x=0; x<width; x++) {
      let fillStyle = Color('#ff0000').shiftHue(config[y][x] * Math.floor(360/numOfStates));
      ctx.fillStyle = fillStyle;
      ctx.fillRect(x*step, y*step, cellSize, cellSize);
    }
  }
}

function step() {
  time++;
  console.log('time: ', time);

  for(let x=0; x<width; x++) {
    for(let y=0; y<height; y++) {
      state = config[y][x];
      let counts = new Array(numOfStates).fill(0);
      for(let dx=-r; dx<r+1; dx++) {
        for(let dy=-r; dy<r+1; dy++) {
          let col = (y+dy) % height;
          let row = (x+dx) % width;
          if(Math.sign(col) === -1) {
            col = height+col;
          }
          if(Math.sign(row) === -1) {
            row = width+col;
          }
          let s = config[col][row];
          counts[s] += 1;
        }
      }
      var maxCount = Math.max(...counts);

      var maxStates = [];

      for(var i=0; i<numOfStates; i++) {
        if(counts[i] === maxCount) {
          maxStates.push(i);
        }
      }
      console.log(maxStates);
      state = maxStates[Math.floor(Math.random()*maxStates.length)];

      nextConfig[y][x] = state;
    }
  }
  var temp = config;
  config = nextConfig;
  nextConfig = temp;
  draw();
  if(time < 15) {
    setTimeout(() => {
      window.requestAnimationFrame(step);
    }, 100);
  } else {
    console.log('%cSTOPPED', 'font-size: 24px; text-decoration: underline; color: blue');
  }

}

document.body.appendChild(canvas);
