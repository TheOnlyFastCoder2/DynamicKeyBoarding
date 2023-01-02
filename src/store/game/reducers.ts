import {current, PayloadAction} from "@reduxjs/toolkit";

import {InitialState, Cell} from 'lib/types';
import { constState, initialState } from 'store/game/state';

import {resetCell, getCells} from 'game/logic';

export function restartStore(state:InitialState) {
  Object.assign(state, initialState);
}

export function setCells(state:InitialState, action: PayloadAction<[number,InitialState["currLang"]]>) {
  const [amount, lang] = action.payload;
  state.cells = getCells(amount, lang); 
}

export function setPosition(state:InitialState, action: PayloadAction<Cell["index"]>) {
  const index = action.payload;

  if(state.cells[index].x >= constState.widthCanvas) {


    if(state.health - (constState.stepHealth) >= 0) {
      state.health -= constState.stepHealth;
      resetCell(
        state.cells[action.payload], 
        state.currLang
      );
    } 
    else state.isGameOver = true;

  }
  else state.cells[action.payload].x += state.stepCell;
}


export function setFrequencyData(state:InitialState, action: PayloadAction<[Cell["index"], Cell["frequencyData"]]>) {
  const [index, freqData] = action.payload;
  state.cells[index].frequencyData = freqData;
}


export function setLang(state:InitialState, action: PayloadAction<InitialState["currLang"]>) {
  state.currLang = action.payload;
}

export function getRun(state:InitialState, action: PayloadAction<boolean>) {
  state.isRunning = action.payload;
}

export function removeLetter(state:InitialState, action: PayloadAction<string>) {
  state.cells.sort((a,b) => b.x - a.x ).every( (cell) => {
    if(cell.letter === action.payload && cell.x > 0) {
      if(state.health + (constState.stepHealth) <= 100) {
          state.health += constState.stepHealth * 0.2;
      }

      state.scores += 1;
      resetCell(cell, state.currLang);
      return false;
    }
    else return true
  })


  if(state.mainLevel % 3 === 0) {
    state.stepCell = constState.stepCell;
  }

  if(state.scores % 2 === 0) {
    state.levels.every((level, ind) => {
      if(level < 1) {
        state.stepCell += 0.5;
        state.levels[ind] += 0.45;
        return false;
      }
      else return true;
    })

    if(state.levels[0] + state.levels[1] + state.levels[2] >= 3) {
      state.mainLevel += 1;
      state.levels[0] = 0;
      state.levels[1] = 0;
      state.levels[2] = 0;
    }
  }
}

// export function speedUp(state:InitialState, action: PayloadAction<number>) {
//   state.stepCell += action.payload;
// }