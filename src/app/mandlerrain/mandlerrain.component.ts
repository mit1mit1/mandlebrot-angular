import { Component, OnInit } from '@angular/core';

const calculatedNumbers = new Map();

const availableColorsMe = [
  '#03fcfc',
  '#03fc5e',
  '#20fc03',
  '#ea00ff',
  '#ff0062',
  '#ff6200',
  '#00ffbb',
  '#000473',
  '#910142',
  '#4d0187',
  '#feb5ff',
  '#fffbb5',
]
const availableColorsPinterest = [
  '#af43be',
  '#fd8090',
  '#c4ffff',
  '#08deea',
  '#1261d1',
]

const calculateMandlenumber = (
  xPosition: number,
  yPosition: number,
  prevResultX: number,
  prevResultY: number,
  iterations: number
): number => {
  const calculatedNumber = calculatedNumbers.get(xPosition.toString() + ':' + yPosition.toString());
  if (calculatedNumber) {
    return calculatedNumber;
  }
  const nextResultX =
    xPosition + prevResultX * prevResultX - prevResultY * prevResultY;
  const nextResultY = yPosition + 2 * prevResultX * prevResultY;

  const magnitude = nextResultX * nextResultX + nextResultY * nextResultY;

  if (magnitude > 50) {
    calculatedNumbers.set(xPosition.toString() + ':' + yPosition.toString(), iterations);
    return iterations;
  } else if (iterations > 63) {
    calculatedNumbers.set(xPosition.toString() + ':' + yPosition.toString(), -1);
    return -1;
  } else {
    return calculateMandlenumber(
      xPosition,
      yPosition,
      nextResultX,
      nextResultY,
      iterations + 1
    );
  }
};

const getColors = (
  xResolution: number,
  yResolution: number,
  xStepDistance: number,
  yStepDistance: number,
  centreX: number,
  centreY: number
) => {
  const colors: Array<Array<string>> = [];

  for (let i = 0; i < xResolution; i++) {
    let xPosition = centreX + (i - 0.5 * xResolution) * xStepDistance;
    colors.push([]);
    for (let j = 0; j < yResolution; j++) {
      let yPosition = Math.abs(centreY + (j - 0.5 * yResolution) * yStepDistance);
      let mandleNumber = calculateMandlenumber(xPosition, yPosition, 0, 0, 0);
      if (mandleNumber == -1) {
        colors[i].push('black');
      } else {
        colors[i].push(availableColorsPinterest[mandleNumber % availableColorsPinterest.length]);
      }
    }
  }
  console.log('finished calculating colors')
  return colors;
};

// const colors = [['red', 'blue', 'green'], ['yellow', 'orange', 'pink']];

@Component({
  selector: 'app-mandlerrain',
  templateUrl: './mandlerrain.component.html',
  styleUrls: ['./mandlerrain.component.scss'],
})
export class MandlerrainComponent implements OnInit {
  xResolution = 648;
  yResolution = 400;
  centreX = -2.001;
  centreY = 0;
  xStepDistance = 0.001;
  yStepDistance = 0.001;
  colors = getColors(
    this.xResolution,
    this.yResolution,
    this.xStepDistance,
    this.yStepDistance,
    this.centreX,
    this.centreY
  );
  recalculateColors = () => {
    this.colors = getColors(
      this.xResolution,
      this.yResolution,
      this.xStepDistance,
      this.yStepDistance,
      this.centreX,
      this.centreY
    );
    var canvas = document.getElementById("mandlerrain-canvas") as any;
    var ctx = canvas?.getContext("2d");
    for (let i = 0; i < this.colors.length; i++) {
      for (let j = 0; j < this.colors[i].length; j++) {
        ctx.fillStyle = this.colors[i][j];
        ctx.fillRect(i, j, 1, 1);
      }
    }
  };
  goUp = () => {
    this.centreY = this.centreY - this.yStepDistance * 32;
    this.recalculateColors();
  };
  goDown = () => {
    this.centreY = this.centreY + this.yStepDistance * 32;
    this.recalculateColors();
  };
  goLeft = () => {
    this.centreX = this.centreX - this.xStepDistance * 32;
    this.recalculateColors();
  };
  goRight = () => {
    this.centreX = this.centreX + this.xStepDistance * 32;
    this.recalculateColors();
  };
  zoomOut = () => {
    this.xStepDistance = this.xStepDistance * 2;
    this.yStepDistance = this.yStepDistance * 2;
    this.recalculateColors();
  };
  zoomIn = () => {
    this.xStepDistance = this.xStepDistance * 0.5;
    this.yStepDistance = this.yStepDistance * 0.5;
    this.recalculateColors();
  };
  handleKeypress = (event: { key: string }) => {
    if (event.key === 'w') {
      this.goUp();
    }
    if (event.key === 'a') {
      this.goLeft();
    }
    if (event.key === 's') {
      this.goDown();
    }
    if (event.key === 'd') {
      this.goRight();
    }
    if (event.key === 'q') {
      this.zoomIn();
    }
    if (event.key === 'e') {
      this.zoomOut();
    }
  };
  constructor() {}
  ngOnInit(): void {}
}
