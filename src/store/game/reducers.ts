import {PayloadAction} from "@reduxjs/toolkit";

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
    const step =  100 * 0.05;

    if(state.health - (step) >= 0) {
      state.health -= step;
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
      state.stepCell += 0.05;
      state.scores += 1;
      resetCell(cell, state.currLang);
      return false;
    }
    return true;
  })
}