import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../index';

import initialState from './state';
import * as reducers from './reducers';


const Slice = createSlice({
  name: "Game",
  initialState,
  reducers,
})

export const {actions} = Slice;
export const getState = (state: RootState) => state.gameReducer;

export default Slice.reducer;