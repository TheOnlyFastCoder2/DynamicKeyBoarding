import {InitialState, ConstState, Letters} from 'lib/types';
import Analyzer from "lib/Analyzer";


export const letters: Letters = {
  eng: [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l"],
    ["z","x","c","v","b","n","m"],
  ],
  rus: [
    ["й","ц","у","к","е","н","г","ш","щ","з","х","ъ"],
    ["ф","ы","в","а","п","р","о","л","д","ж","э"],
    [ "я","ч","с","м","и","т","ь","б","ю"],
  ]
}


export const constState: ConstState  = {
  widthCanvas: 1920,
  heightCanvas: 594,
  stepCell: 5,
  sizeCell: 80,
  fontSize: 48,
  offsetX: 200,
  offsetY: 200,
  stepHealth: 100 * 0.05,
  rangeOfRandomCells: 40,
  analyzer: new Analyzer()
}; 


export const initialState: InitialState  = {

  stepCell: constState.stepCell,
  isRunning: false,
  isGameOver: false,

  levels: [0,0,0],
  mainLevel: 1,
  health: 100,
  scores: 0,

  currLang: "eng",
  cells: [],
}


export default initialState;