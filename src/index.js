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

let colors = [];

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
        cellSize: this.cellSize
      });
      x.run();
    },
    destroy: function() {
      x.destroy();
    },
    chooseColors: function() {
      removeFolders();
      for(let i=0; i<this.numOfStates; i++) {
        colors.push(colorFolder.addColor(this, 'color'));
      }
    },
    color: [0, 200, 200], // RGB array
};
gui.remember(obj);
gui.add(obj, 'width').min(0);
gui.add(obj, 'height').min(0);
gui.add(obj, 'numOfStates').min(2);
gui.add(obj, 'cellSize').min(1);
gui.add(obj, 'restart');
gui.add(obj, 'destroy');
gui.add(obj, 'chooseColors');
let colorFolder = gui.addFolder('colors');

let removeFolders = function() {
  colors.forEach(color => {
    colorFolder.remove(color);
  });
  colors = [];
}
