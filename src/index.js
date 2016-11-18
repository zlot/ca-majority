'use strict';

import dat from 'dat-gui';

import CaMajority from './ca-majority';

let x = new CaMajority({
  width: 256,
  height: 128,
  numOfStates: 12,
  cellSize: 2
});
x.run();

const gui = new dat.gui.GUI();
var obj = {
    width: 256,
    height: 128,
    numOfStates: 12,
    cellSize: 2,
    restart: function () {
      x.destroy();
      x = new CaMajority({
        width: this.width,
        height: this.height,
        numOfStates: this.numOfStates,
        cellSize: this.cellSize
      });
      x.run();
    },
    color0: "#ffae23", // CSS string
    color1: [ 0, 128, 255 ], // RGB array
    color2: [ 0, 128, 255, 0.3 ], // RGB with alpha
    color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
};
gui.remember(obj);
gui.add(obj, 'width');
gui.add(obj, 'height');
gui.add(obj, 'numOfStates');
gui.add(obj, 'cellSize');
gui.add(obj, 'restart');
let colorFolder = gui.addFolder('colors');
colorFolder.addColor(obj, 'color0');
colorFolder.addColor(obj, 'color1');
colorFolder.addColor(obj, 'color2');
colorFolder.addColor(obj, 'color3');
