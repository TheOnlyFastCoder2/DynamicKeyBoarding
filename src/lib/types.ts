import Analyzer from "./Analyzer";

export interface Cell {
  x: number,
  y: number,
  index: number,
  letter: string,
  frequencyData: number
}


export interface ConstState {
  readonly widthCanvas: number,
  readonly heightCanvas: number,

  readonly fontSize: number,

  readonly stepCell: number,
  readonly sizeCell: number,

  readonly offsetX: number
  readonly offsetY: number,
  readonly stepHealth: number,

  readonly analyzer: Analyzer,

  readonly rangeOfRandomCells: number
}

export type LettersType = "rus" | "eng";

export interface Letters {
  rus: Array<Array<string>>,
  eng: Array<Array<string>>,
}

export interface InitialState {
  isGameOver: boolean,
  isRunning: boolean,
  levels: Array<number>,
  mainLevel: number,
  health: number,
  scores: number,
  currLang: LettersType,
  stepCell: number,
  cells: Cell[]
}
