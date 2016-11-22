import dat from 'dat-gui';
import Color from 'color-js';
import CaMajority from './ca-majority';

export default class CaMajorityGUI {

  constructor({
    width = 8,
    height = 8,
    numOfStates = 12,
    cellSize = 1,
    r = 2
  } = {}) {
    this.width = width;
    this.height = height;
    this.numOfStates = numOfStates;
    this.cellSize = cellSize;
    this.r = r;

    this.restart = function() {
      if(this.caMajority) {
        this.destroy();
      }
      this.caMajority = new CaMajority({
        width,
        height,
        numOfStates,
        cellSize,
        r,
        colors: Object.values(this.colors) // convert to array
      });
      this.caMajority.run();
    };
    this.destroy = function() {
      this.caMajority.destroy();
    };

    this.gui = new dat.gui.GUI();
    this.gui.remember(this);
    this.gui.add(this, 'width').min(0);
    this.gui.add(this, 'height').min(0);
    this.gui.add(this, 'numOfStates').min(2).onFinishChange(this.reloadColorSelection.bind(this));
    this.gui.add(this, 'cellSize').min(1);
    this.gui.add(this, 'r').min(1).step(1);
    this.gui.add(this, 'restart');
    this.gui.add(this, 'destroy');
    this.gui.add(this, 'reloadColorSelection');

    this.colorFolder = this.gui.addFolder('colors');
    this.colorFolder.open();

    this.colorControllers = [];
    this.colors = {};
    this.reloadColorSelection();
    this.restart();
  }

  reloadColorSelection() {
    this.colorControllers.forEach(color => {
      this.colorFolder.remove(color);
    });
    this.colorControllers = [];
    for(let i=0; i<this.numOfStates; i++) {
      this.colors[`color${i}`] = getEquallySpacedColor.call(this, i);
      this.colorControllers.push(this.colorFolder.addColor(this.colors, `color${i}`));
    }

    function getEquallySpacedColor(i=0) {
      return Color('#ff0000').shiftHue(i * Math.floor(360/this.numOfStates)).toCSS();
    }
  }
}
