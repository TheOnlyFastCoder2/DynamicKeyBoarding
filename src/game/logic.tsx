import { Cell } from 'lib/types';

import { letters, constState } from 'store/game/state';
import getRandomNumber from 'lib/getRandimNumber';

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

  return Array.from( new Array(amount) ).map((_, cellIndex) => {
    return {
      x: -(positions.getPosition() * constState.offsetX), 
      y: centerOfCell  + constState.offsetY * (cellIndex % 3),
      index:cellIndex, 
      letter:getLetter(lang), 
      frequencyData:0
    }
  }) 
}

export function resetCell (
  cell:Cell, 
  lang: string
): Cell {

  cell.x = -constState.offsetX*constState.rangeOfRandomCells;
  cell.letter = getLetter(lang);
  return cell;
}

function getStartedPositions (range: number): {getPosition:Function} {
  return {
    getPosition: (): number  => {
      const indItem = getRandomNumber(0, range-1);
      range -= -1;
      return indItem;
    }
  }
}