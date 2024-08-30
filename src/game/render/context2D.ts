import { Cell } from "lib/types";
import { constState } from 'store/game/state';
import getCSSProperty from "lib/getCSSProperty";

export function roundRect  (
  ctx:CanvasRenderingContext2D, 
  x:number, y:number, 
  w:number, h:number, 
  r:number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;

  ctx.beginPath();

  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y,   x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x,   y+h, r);
  ctx.arcTo(x,   y+h, x,   y,   r);
  ctx.arcTo(x,   y,   x+w, y,   r);

  ctx.closePath();
}


export  function createCell(
  ctx: CanvasRenderingContext2D, 
  cell: Cell, 
) {

  const letter =  cell.letter;
  const metrics = ctx.measureText(letter);
  const textWidth = metrics.width;
  const textHeight = (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent)/ 2;
  
  const colorCell = getCSSProperty('--c_light900');
  const colorBorder = getCSSProperty('--c_dark800');
  const colorText = getCSSProperty('--c_dark900');
  

  ctx.font = `600 ${constState.fontSize}px sans-serif`;
  const frequencyData = cell.frequencyData * 0.4;
  
  const cellSize = constState.sizeCell  + frequencyData; 
  roundRect(
    ctx, 
    cell.x, cell.y-(frequencyData/2),
    cellSize ,
    cellSize , 5
  )

  ctx.fillStyle = colorCell;
  ctx.fill();

  for (let i = 1; i < 3; i++) 
  {
    ctx.beginPath()
    ctx.strokeStyle = colorBorder;
    ctx.moveTo(0, i*constState.offsetY);
    ctx.lineTo(constState.widthCanvas, i*constState.offsetY);
    ctx.stroke();
    ctx.closePath();
  }


  ctx.fillStyle = colorText;
  ctx.fillText(
    letter, 
    cell.x + (cellSize  / 2 - (textWidth / 2)), 
    cell.y-(frequencyData/2)  + (cellSize / 2 + textHeight)
  );
}







