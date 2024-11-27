import { Cell } from 'lib/types';

import { letters, constState } from 'store/game/state';
import getRandomNumber from 'lib/getRandimNumber';


const getX = (x:number) => -(x * constState.offsetX);

export function getLetter(lang:string): string  {
  
  function getter(letters:Array<string>): string {
    return letters[getRandomNumber(0, letters.length-1)];
  }

  switch(lang) {
    case "rus": return getter(letters[lang].flat());
    case "eng": return getter(letters[lang].flat());
    default: return "";
  }
}


export function getCells (amount:number, lang:string): Cell[] {
  
  const positions = getStartedPositions(constState.rangeOfRandomCells);
  const centerOfCell = constState.sizeCell - constState.sizeCell / 4; // 80 -> 60
  
  let prevPos = 0;
  return Array.from( new Array(amount) ).map((_, cellIndex) => {
    prevPos = positions.getPosition(prevPos);

    return {
      x: getX(prevPos), 
      y: centerOfCell  + constState.offsetY * (cellIndex % 3),
      index:cellIndex, 
      letter:getLetter(lang), 
      frequencyData:0
    }
  }) 
}

export function resetCell (
  cells: Cell[],
  cell:Cell, 
  lang: string
): Cell {
  let minX = Infinity;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].x < minX) {
      minX = cells[i].x;
    }
  }
  cell.x = minX  - constState.offsetX;

  cells.forEach((c) => {
    if(c.x > 0 && collides(c, cell)) {
      c.x = cell.x - constState.offsetX;
    }
  })
 
  cell.letter = getLetter(lang);
  return cell;
}

function collides(cell1: Cell, cell2: Cell): boolean {
  return (cell1.x <= cell2.x + constState.sizeCell &&
          cell1.x + constState.sizeCell >= cell2.x &&
          cell1.y <= cell2.y + constState.sizeCell &&
          cell1.y + constState.sizeCell >= cell2.y);
}

function getStartedPositions (range: number): {getPosition:Function} {

  return {
    getPosition: (prevPos:number): number  => {
      const indItem = getRandomNumber(range-1, prevPos);
      range -= -1;
      return indItem;
    }
  }
}