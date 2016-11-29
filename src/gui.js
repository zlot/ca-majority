import dat from 'dat-gui';
import Color from 'color-js';
import CaMajority from './ca-majority';

export default class CaMajorityGUI {

  constructor({
    width = 8,
    height = 8,
    numOfStates = 12,
    cellSize = 1,
    r = 2,
    frameRate = 12
  } = {}) {
    this.width = width;
    this.height = height;
    this.numOfStates = numOfStates;
    this.cellSize = cellSize;
    this.r = r;
    this.frameRate = frameRate;
    this.getColors = this.getColors.bind(this);

    setupGUI.call(this);
    function setupGUI() {
      this.gui = new dat.gui.GUI();
      this.gui.remember(this);

      this.gui.add(this, 'width').min(0);
      this.gui.add(this, 'height').min(0);
      this.gui.add(this, 'numOfStates').min(2).onFinishChange(this.reloadColorSelection.bind(this));
      this.gui.add(this, 'cellSize').min(1);
      this.gui.add(this, 'r').min(1).step(1);
      this.gui.add(this, 'frameRate').min(1).max(60).step(1);
      this.gui.add(this, 'restart');
      this.gui.add(this, 'stop');
      this.gui.add(this, 'destroy');
      this.gui.add(this, 'reloadColorSelection');

      this.colorFolder = this.gui.addFolder('colors');
      this.colorFolder.open();

      this.colorControllers = [];
      this.reloadColorSelection();
      this.restart();
    }
  }

  restart() {
    if(this.caMajority) {
      this.destroy();
    }
    this.caMajority = new CaMajority({
      width: this.width,
      height: this.height,
      numOfStates: this.numOfStates,
      cellSize: this.cellSize,
      r: this.r,
      frameRate: this.frameRate,
      colors: this.getColors()
    });
    this.caMajority.run();
  }

  stop() {
    this.caMajority.stop();
  }

  destroy() {
    this.caMajority.destroy();
  };

  reloadColorSelection() {
    this.colorControllers.forEach(color => {
      this.colorFolder.remove(color);
    });
    this.colorControllers = [];
    this._removeColors();
    for(let i=0; i<this.numOfStates; i++) {
      this[`color${i}`] = getEquallySpacedColor.call(this, i);
      this.colorControllers.push(this.colorFolder.addColor(this, `color${i}`));
    }
    function getEquallySpacedColor(i=0) {
      return Color('#ff0000').shiftHue(i * Math.floor(360/this.numOfStates)).toCSS();
    }
  }

  getColors() {
    let colorsArray = [];
    for(let key in this) {
      if(key.match(/color\d+/)) {
        colorsArray.push(this[key]);
      }
    }
    return colorsArray;
  }

  _removeColors() {
    this.getColors().forEach(key => {
      delete this[key];
    });
  }
}
