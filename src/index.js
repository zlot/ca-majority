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
    restart: function() {
      this.destroy();
      x = new CaMajority({
        width: this.width,
        height: this.height,
        numOfStates: this.numOfStates,
        cellSize: this.cellSize,
        automaticColors: this.automaticColors,
        colors: Object.values(colors) // convert to array
      });
      x.run();
    },
    destroy: function() {
      x.destroy();
    },
    automaticColors: false,
};

gui.remember(obj);
gui.add(obj, 'width').min(0);
gui.add(obj, 'height').min(0);
gui.add(obj, 'numOfStates').min(2).onFinishChange(reloadGuiColorSelection);
gui.add(obj, 'cellSize').min(1);
gui.add(obj, 'restart');
gui.add(obj, 'destroy');
gui.add(obj, 'automaticColors');
let colorFolder = gui.addFolder('colors');
colorFolder.open();

let colorControllers = [];
let colors = {};

reloadGuiColorSelection();

let x = new CaMajority({
  width: 256,
  height: 128,
  numOfStates: 12,
  cellSize: 2,
  automaticColors: true,
  colors: Object.values(colors) // convert to array
});
x.run();



function reloadGuiColorSelection() {
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
