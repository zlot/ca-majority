'use strict';

import dat from 'dat-gui';
import Color from 'color-js';
import CaMajority from './ca-majority';

const gui = new dat.gui.GUI();

var obj = {
    width: 256,
    height: 128,
    numOfStates: 12,
    cellSize: 2,
    r: 2,
    restart: function() {
      this.destroy();
      x = new CaMajority({
        width: this.width,
        height: this.height,
        numOfStates: this.numOfStates,
        cellSize: this.cellSize,
        r: this.r,
        automaticColors: this.automaticColors,
        colors: Object.values(colors) // convert to array
      });
      x.run();
    },
    destroy: function() {
      x.destroy();
    },
    automaticColors: false,
    reloadColorSelection
};

gui.remember(obj);
gui.add(obj, 'width').min(0);
gui.add(obj, 'height').min(0);
gui.add(obj, 'numOfStates').min(2).onFinishChange(reloadColorSelection);
gui.add(obj, 'cellSize').min(1);
gui.add(obj, 'r').min(1).step(1);
gui.add(obj, 'restart');
gui.add(obj, 'destroy');
gui.add(obj, 'reloadColorSelection');
let colorFolder = gui.addFolder('colors');
colorFolder.open();

let colorControllers = [];
let colors = {};

reloadColorSelection();

let x = new CaMajority({
  width: 256,
  height: 128,
  numOfStates: 12,
  cellSize: 2,
  colors: Object.values(colors) // convert to array
});
x.run();


function reloadColorSelection() {
  colorControllers.forEach(color => {
    colorFolder.remove(color);
  });
  colorControllers = [];
  for(let i=0; i<obj.numOfStates; i++) {
    colors[`color${i}`] = getEquallySpacedColor(i);
    colorControllers.push(colorFolder.addColor(colors, `color${i}`));
  }

  function getEquallySpacedColor(i=0) {
    return Color('#ff0000').shiftHue(i * Math.floor(360/obj.numOfStates)).toCSS();
  }
}
