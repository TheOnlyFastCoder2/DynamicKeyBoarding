import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../index';

import initialState from './state';
import * as reducers from './reducers';
import { InitialState } from "lib/types";


const Slice = createSlice({
  name: "Game",
  initialState,
  reducers,
})

export const {actions} = Slice;
export const getState = (state: RootState) => state.gameReducer as InitialState;

export default Slice.reducer ;