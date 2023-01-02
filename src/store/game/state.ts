import {InitialState, ConstState, Letters, LettersType} from 'lib/types';
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
  sizeCell: 80,
  fontSize: 48,
  offsetX: 200,
  offsetY: 200,
  rangeOfRandomCells: 40,
  analyzer: new Analyzer()
}; 


export const initialState: InitialState  = {

  stepCell: 5,
  isRunning: false,
  isGameOver: false,

  maxLevel: 15,
  levelHardMode: 1,
  health: 100,
  scores: 0,

  currLang: "eng",
  cells: [],
}


export default initialState;