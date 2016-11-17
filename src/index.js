'use strict';

import dat from 'dat-gui';

import CaMajority from './ca-majority';

let x = new CaMajority(512,128,12,2);
x.run();

const gui = new dat.gui.GUI();
var obj = {
    message: 'Hello World',
    displayOutline: false,
    maxSize: 6.0,
    speed: 5,
    height: 10,
    noiseStrength: 10.2,
    growthSpeed: 0.2,
    type: 'three',
    restart: function () {
      alert('restart!');
    },
    color0: "#ffae23", // CSS string
    color1: [ 0, 128, 255 ], // RGB array
    color2: [ 0, 128, 255, 0.3 ], // RGB with alpha
    color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
};
gui.remember(obj);
gui.add(obj, 'message');
gui.add(obj, 'displayOutline');
gui.add(obj, 'restart');
let colorFolder = gui.addFolder('colors');
colorFolder.addColor(obj, 'color0');
colorFolder.addColor(obj, 'color1');
colorFolder.addColor(obj, 'color2');
colorFolder.addColor(obj, 'color3');
